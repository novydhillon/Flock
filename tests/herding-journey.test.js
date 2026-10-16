import test from 'node:test';
import assert from 'node:assert/strict';
import {
  createLevel, routeProgress, nextNavigationPoint, navigationTarget,
  destinationApproach, canOccupy, hasClearGroundPath, hasClearPlayerSignal, distance,
} from '../src/world.js';
import { stepSimulation } from '../src/simulation.js';
import { upgradeEffects } from '../src/progression.js';

const unit = (x, z) => {
  const length = Math.hypot(x, z) || 1;
  return { x: x / length, z: z / length };
};

// A player can circle the pen rather than pushing through its side walls.
// This small visibility graph plans only Pip's next movement, using the same
// ground-clearance checks as normal play. It never changes an animal's state.
function aroundDestination(level, desired) {
  const target = level.target, extent = target.radius + 1.4;
  const forward = { x: Math.sin(target.heading), z: Math.cos(target.heading) };
  const outside = extent + 2;
  const point = (u, v) => ({
    x: target.x + u * forward.x + v * forward.z,
    z: target.z + u * forward.z - v * forward.x,
  });
  const nodes = [level.dog, desired, ...[
    [-outside, -outside], [-outside, outside],
    [outside, -outside], [outside, outside],
    [-outside, 0], [-extent + 2, 0], [0, 0],
  ].map(([u, v]) => point(u, v))];
  const costs = nodes.map(() => Infinity), previous = [], visited = new Set();
  costs[0] = 0;
  for (let step = 0; step < nodes.length; step++) {
    let nearest = -1;
    for (let i = 0; i < nodes.length; i++) {
      if (!visited.has(i) && (nearest < 0 || costs[i] < costs[nearest])) nearest = i;
    }
    if (nearest < 0 || !Number.isFinite(costs[nearest]) || nearest === 1) break;
    visited.add(nearest);
    for (let i = 0; i < nodes.length; i++) {
      if (visited.has(i) || !hasClearGroundPath(level, nodes[nearest], nodes[i], .62)) continue;
      const cost = costs[nearest] + distance(nodes[nearest], nodes[i]);
      if (cost < costs[i]) { costs[i] = cost; previous[i] = nearest; }
    }
  }
  if (!Number.isFinite(costs[1])) return navigationTarget(level, level.dog, desired);
  let first = 1;
  while (previous[first] !== 0 && previous[first] !== undefined) first = previous[first];
  return nodes[first];
}

// Lead the furthest upstream animal, including distance off the chosen trail
// so that scattered animals at the destination are collected before admission.
// All herding occurs through legitimate dog inputs; companion tiers are gated
// by the level inside stepSimulation. This is a bounded representative policy,
// not a claim that this policy solves every campaign seed or every route.
function herdThroughLevel(level, seconds = 400) {
  const routeId = 'route-0', upgrades = { speed: 3, flock: 3, drone: 3 };
  const speed = 7.8 + upgradeEffects(upgrades, level.index + 1).speedBoost;
  const fineMovementDivisor = speed * .1 > 1 ? 1.3 : 1;
  let desired;
  for (let frame = 0; frame < seconds * 10 && !level.completed; frame++) {
    if (frame % 3 === 0) {
      const ranked = level.animals.filter(a => !a.saved)
        .map(animal => ({ animal, info: routeProgress(level, animal, routeId) }))
        .sort((a, b) => (a.info.progress - a.info.distance) - (b.info.progress - b.info.distance));
      const { animal, info } = ranked[0];
      const nearDestination = info.progress > info.length - 20;
      const radius = animal.type === 'cow' ? .78 : .55;
      const awaitingAttendance = distance(animal, level.target) < level.target.radius - radius * .5;
      const aim = nearDestination ? destinationApproach(level, animal) : navigationTarget(level, animal, nextNavigationPoint(level, animal, routeId), radius);
      const forward = unit(aim.x - animal.x, aim.z - animal.z);
      desired = { x: animal.x - forward.x * 3.3, z: animal.z - forward.z * 3.3 };
      if (!canOccupy(level, desired.x, desired.z, .62) || !hasClearPlayerSignal(level, animal, desired)) {
        // If the wall prevents a straight rear approach, pressure the flank
        // and let physical movement slide the animal along the wall.
        let found = false;
        for (const angle of [0, Math.PI / 6, -Math.PI / 6, Math.PI / 3, -Math.PI / 3, Math.PI / 2, -Math.PI / 2]) {
          const direction = {
            x: forward.x * Math.cos(angle) - forward.z * Math.sin(angle),
            z: forward.x * Math.sin(angle) + forward.z * Math.cos(angle),
          };
          for (const offset of [2, 1, .5, .15]) {
            const candidate = { x: animal.x - direction.x * offset, z: animal.z - direction.z * offset };
            if (canOccupy(level, candidate.x, candidate.z, .62) && hasClearPlayerSignal(level, animal, candidate)) {
              desired = candidate; found = true; break;
            }
          }
          if (found) break;
        }
      }
      // Enter the enclosure to provide visible attendance for an animal
      // already within its admission circle.
      if (awaitingAttendance) desired = { x: level.target.x, z: level.target.z };
      desired = nearDestination ? aroundDestination(level, desired) : navigationTarget(level, level.dog, desired);
    }
    const x = desired.x - level.dog.x, z = desired.z - level.dog.z;
    // Fine positioning must not overshoot a short rear offset: upgraded
    // paws can otherwise move 1.13 times the remaining distance at 10Hz.
    const divisor = Math.max(fineMovementDivisor, Math.hypot(x, z));
    stepSimulation(level, level.dog, { x: x / divisor, z: z / divisor }, .1, upgrades);
  }
  return level.animals.filter(a => !a.saved).map(a => ({ id: a.id, x: a.x, z: a.z }));
}

for (const { index, seed, direction } of [
  { index: 1, direction: 'west' },
  { index: 2, direction: 'east' },
  { index: 5, seed: 201, direction: 'north' },
  { index: 9, seed: 203, direction: 'south' },
  { index: 15, seed: 202, direction: 'west' },
]) {
  test(`Pip delivers the entire ${direction}-bound flock through winding crossings in level ${index + 1}`, () => {
    const level = createLevel(index, seed);
    const remaining = herdThroughLevel(level);
    assert.equal(level.completed, true, `undelivered robots after ${level.time.toFixed(1)}s: ${JSON.stringify(remaining)}`);
    assert.equal(level.animals.filter(a => a.saved).length, level.animals.length);
    assert.ok(level.animals.every(a => canOccupy(level, a.x, a.z, a.type === 'cow' ? .78 : .55)));
    assert.ok(canOccupy(level, level.dog.x, level.dog.z, .62));
  });
}
