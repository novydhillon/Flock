import { canOccupy, hasClearGroundPath } from '../world/world.js';
import { dogTrainingEffects } from './dog-training.js';
import { KENNEL_CATALOG, validateKennel } from './kennel.js';

function helperStart(level, lead, helpers, slot) {
  for (const radius of [2.4, 3.6, 5]) {
    for (let step = 0; step < 16; step++) {
      const angle = lead.heading + Math.PI + ((slot - 2) * 2 * Math.PI) / 3 + (step * Math.PI) / 8;
      const point = { x: lead.x + radius * Math.sin(angle), z: lead.z + radius * Math.cos(angle) };
      if (
        canOccupy(level, point.x, point.z, 0.68) &&
        hasClearGroundPath(level, lead, point, 0.6) &&
        helpers.every((other) => Math.hypot(point.x - other.x, point.z - other.z) > 1.5)
      )
        return point;
    }
  }
  return { x: lead.x, z: lead.z };
}

/** Snapshot the saved lineup for this run. A later kennel edit takes effect on re-entry. */
export function prepareMeadowLineup(level, dog, profile) {
  const kennel = validateKennel(profile?.kennel);
  const owned = new Map(kennel.dogs.map((item) => [item.id, item]));
  level.dog = dog;
  dog.heading ??= 0;
  level.helpers = [];
  kennel.lineup.forEach((id, index) => {
    if (!id) return;
    const item = owned.get(id);
    const { model } = KENNEL_CATALOG.find((entry) => entry.id === item.catalogId);
    const actor = { ...item, slot: index + 1, model, trainingEffects: dogTrainingEffects(item) };
    if (index === 0) Object.assign(dog, actor);
    else
      level.helpers.push({
        ...actor,
        type: 'helper',
        ...helperStart(level, dog, level.helpers, actor.slot),
        heading: dog.heading,
        herd: {},
      });
  });
}
