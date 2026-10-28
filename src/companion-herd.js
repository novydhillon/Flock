import { CONFIG_CONTRACTS } from './config/contracts.js';
import { animalRadius } from './animal-size.js';
import { flockGroups } from './buddy.js';
import { canOccupy, hasClearGroundPath } from './world.js';
import settings from './config/gameplay.json' with { type: 'json' };
import { resolveConfig } from './config/resolve.js';
const GAMEPLAY = resolveConfig(settings, 'gameplay', CONFIG_CONTRACTS.gameplay);

if (GAMEPLAY.companions.resumeRadius > GAMEPLAY.companions.initialRadius || GAMEPLAY.companions.initialRadius > GAMEPLAY.companions.attendanceRadius) throw new RangeError('gameplay.companions: attendance hysteresis radii are out of order');
const clamp = (value, min, max) => Math.max(min, Math.min(max, value));
const distance = (a, b) => Math.hypot(a.x - b.x, a.z - b.z);
const normal = (x, z) => {
  const length = Math.hypot(x, z);
  return length > 0.0001 ? { x: x / length, z: z / length } : { x: 0, z: 0 };
};
const centerOf = group => group.reduce((sum, a) => ({ x: sum.x + a.x / group.length, z: sum.z + a.z / group.length }), { x: 0, z: 0 });


// A flying helper must not apply a signal through a solid bank, rail or tree.
function clearSignal(level, a, b, radius = 0.15) {
  return hasClearGroundPath(level, a, b, radius);
}

/** Connected flock components, with a stable tie-break by animal ID. */
function largestHerd(level, active, previousIds = []) {
  const groups = flockGroups(level, active);
  groups.sort((a, b) => b.length - a.length ||
    b.filter(v => previousIds.includes(v.id)).length - a.filter(v => previousIds.includes(v.id)).length ||
    Math.min(...a.map(v => v.id)) - Math.min(...b.map(v => v.id)));
  return groups[0] || [];
}

export function companionState(level, active, effects, dt) {
  const kinds = [effects.drone && 'drone'].filter(Boolean);
  level.helpers ||= [];
  level.helpers = level.helpers.filter(h => kinds.includes(h.type) || (effects.helper && h.type === 'helper'));
  if (!kinds.length || !active.length) return { helpers: [], group: [], memberIds: new Set(), hold: false };
  const state = level.companionHerd ||= {};
  const activeSignature = active.map(a => a.id).join(',');
  if (!state.group || state.activeSignature !== activeSignature || level.time - state.clusterTime > GAMEPLAY.companions.clusterSeconds) {
    state.group = largestHerd(level, active, state.clusterIds);
    state.activeSignature = activeSignature; state.clusterTime = level.time;
  }
  const group = state.group;
  if (group.length < 2) {
    state.mode = 'standby'; state.clusterIds = []; state.positions = {};
    for (const kind of kinds) {
      let helper = level.helpers.find(h => h.type === kind);
      if (!helper) { helper = { type: kind, x: level.dog.x, z: level.dog.z }; level.helpers.push(helper); }
      helper.mode = 'standby'; helper.clusterIds = []; helper.anchor = { x: helper.x, z: helper.z };
    }
    return { helpers: level.helpers, group: [], memberIds: new Set(), hold: false, state };
  }
  const centroid = centerOf(group);
  const ids = group.map(a => a.id), memberIds = new Set(ids);
  let playerDistance = Infinity;
  for (const animal of group) {
    const d = distance(level.dog, animal);
    if (d <= GAMEPLAY.companions.attendanceRadius && d < playerDistance && clearSignal(level, level.dog, animal)) playerDistance = d;
  }
  // Hysteresis stops companions switching modes while Pip circles a large herd.
  const hold = state.mode && state.mode !== 'standby' ? (state.mode === 'hold' ? playerDistance >= GAMEPLAY.companions.resumeRadius : playerDistance > GAMEPLAY.companions.attendanceRadius) : playerDistance > GAMEPLAY.companions.initialRadius;
  const overlap = (state.clusterIds || []).filter(id => memberIds.has(id)).length;
  const changedHerd = !state.clusterIds || overlap < Math.min(state.clusterIds.length, ids.length) / 2;
  if (hold && (state.mode !== 'hold' || changedHerd)) {
    state.anchor = { ...centroid };
    state.positions = Object.fromEntries(group.map(a => [a.id, { x: a.x, z: a.z }]));
  }
  if (!hold) { state.anchor = { ...centroid }; state.positions = {}; }
  if (hold) for (const animal of group) state.positions[animal.id] ||= { x: animal.x, z: animal.z };
  state.mode = hold ? 'hold' : 'assist'; state.clusterIds = ids;
  for (const kind of kinds) {
    let helper = level.helpers.find(h => h.type === kind);
    if (!helper) {
      helper = { type: kind, x: kind === 'drone' ? centroid.x : level.dog.x, z: kind === 'drone' ? centroid.z : level.dog.z };
      level.helpers.push(helper);
    }
    helper.mode = state.mode; helper.clusterIds = [...ids]; helper.anchor = { ...state.anchor };
    // The drone remains airborne over the main herd. Ground Buddy has its
    // own tiered state and navigation in buddy.js.
    const direction = normal(centroid.x - helper.x, centroid.z - helper.z);
    const travel = Math.min(distance(helper, centroid), dt * GAMEPLAY.companions.droneSpeed);
    helper.x += direction.x * travel; helper.z += direction.z * travel;
  }
  return { helpers: level.helpers, group, centroid, memberIds, hold, state };
}

export function companionAssist(level, companions, dog, effects) {
  const forces = new Map();
  if (!companions.group.length || companions.hold) return forces;
  const { group, centroid } = companions;
  const forward = normal(centroid.x - dog.x, centroid.z - dog.z);
  const lateral = { x: -forward.z, z: forward.x };
  const strength = Math.min(1.2, effects.droneStrength * 0.35);
  const comfortable = Math.max(2.1, Math.sqrt(group.length) * 0.66);
  for (const animal of group) {
    const offset = (centroid.x - animal.x) * lateral.x + (centroid.z - animal.z) * lateral.z;
    // Only tidy the flanks. Longitudinal drive belongs to the player alone.
    const force = clamp(Math.sign(offset) * Math.max(0, Math.abs(offset) - comfortable) * strength, -0.75, 0.75);
    const vector = { x: lateral.x * force, z: lateral.z * force };
    const radius = animalRadius(animal);
    if (force && !clearSignal(level, animal, { x: animal.x + vector.x, z: animal.z + vector.z }, radius)) continue;
    if (!canOccupy(level, animal.x + vector.x * 0.7, animal.z + vector.z * 0.7, radius)) continue;
    forces.set(animal.id, vector);
  }
  // Balanced lateral support has zero net propulsion, even on an uneven flank.
  const total = [...forces.values()].reduce((sum, f) => ({ x: sum.x + f.x, z: sum.z + f.z }), { x: 0, z: 0 });
  for (const vector of forces.values()) {
    vector.x -= total.x / forces.size; vector.z -= total.z / forces.size;
  }
  return forces;
}

