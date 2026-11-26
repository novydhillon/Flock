import { canOccupy, closestOnSegment, distance, hasClearGroundPath } from '../world/world.js';
import { GATE_BUTTON_RADIUS, gateSwitchPanels } from './gates.js';

const pace = 0.8;
const strollRadius = 3;
const restBetweenStrolls = 28;

export function idleDogInput(level, dog, input, dt, tuning, effects) {
  if (!input.allowIdleWander || input.bark || input.x || (input.z ?? input.y)) {
    if (level.dogIdleWalk) delete level.dogIdleWalk;
    return null;
  }

  const state = (level.dogIdleWalk ??= {
    actor: dog,
    anchor: { x: dog.x, z: dog.z },
    time: 0,
    rest: 0,
    direction: ((level.seed || 0) * 0.61803398875) % 1,
    target: null,
  });
  if (state.actor !== dog) {
    delete level.dogIdleWalk;
    return null;
  }
  state.time += dt;
  if (state.time <= tuning.dogIdleWanderSeconds + 1e-8) return null;
  if (state.rest > 0) {
    state.rest -= dt;
    return null;
  }

  // Search within the original resting area so repeated walks never carry
  // Pip across the meadow. Leave room for the entire ground path and herd.
  const separation = tuning.signalRadius + effects.signalBoost + strollRadius;
  const awayFromLivestock = (point) =>
    level.animals.every((animal) => Math.hypot(animal.x - point.x, animal.z - point.z) > separation);
  const clearStroll = (point) =>
    hasClearGroundPath(level, dog, point, tuning.dogRadius) &&
    (level.gates || []).every(
      (gate) =>
        !gate.operable ||
        gateSwitchPanels(gate).every(
          (panel) => distance(panel, closestOnSegment(panel, dog, point)) > GATE_BUTTON_RADIUS + tuning.dogRadius + 0.2,
        ),
    );
  if (!state.target) {
    for (let attempt = 0; attempt < 8; attempt++) {
      state.direction = (state.direction + 0.61803398875) % 1;
      const angle = state.direction * Math.PI * 2;
      const point = {
        x: state.anchor.x + Math.sin(angle) * strollRadius,
        z: state.anchor.z + Math.cos(angle) * strollRadius,
      };
      if (awayFromLivestock(point) && canOccupy(level, point.x, point.z, tuning.dogRadius) && clearStroll(point)) {
        state.target = point;
        break;
      }
    }
  }
  if (state.target && awayFromLivestock(dog)) {
    const x = state.target.x - dog.x;
    const z = state.target.z - dog.z;
    const distance = Math.hypot(x, z);
    if (distance > 0.15 && clearStroll(state.target)) {
      const speed = Math.min(pace, distance / dt) / (tuning.dogSpeed + effects.speedBoost);
      return { x: (x / distance) * speed, z: (z / distance) * speed };
    }
  }
  state.target = null;
  state.rest = restBetweenStrolls;
  return null;
}
