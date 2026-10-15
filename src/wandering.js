/** Deterministic, coarse behavior opportunities for unsaved stragglers.
 * Probabilities are evaluated every five simulation seconds, never per frame. */
function unitHash(value) {
  let x = value >>> 0;
  x ^= x >>> 16; x = Math.imul(x, 0x7feb352d);
  x ^= x >>> 15; x = Math.imul(x, 0x846ca68b);
  x ^= x >>> 16;
  return (x >>> 0) / 4294967296;
}

function roll(seed, animalId, opportunity, salt = 0) {
  return unitHash((seed ^ Math.imul(animalId + 1, 0x9e3779b1) ^ Math.imul(opportunity + 1, 0x85ebca6b) ^ salt) >>> 0);
}

export const WANDER_OPPORTUNITY_SECONDS = 5;
export const wanderCohortSize = count => Math.floor(Math.max(0, count) * 0.15);

function cohortFor(level) {
  if (level.wanderCohort) return level.wanderCohort;
  const ids = new Set(level.animals.map(a => ({ id: a.id, rank: roll(level.seed, a.id, 0, 0x51f15e) }))
    .sort((a, b) => a.rank - b.rank || a.id - b.id)
    .slice(0, wanderCohortSize(level.animals.length)).map(a => a.id));
  level.wanderCohort = ids;
  return level.wanderCohort;
}

/** Apply one fixed-time opportunity. Tests can exercise seeded rolls directly. */
export function evaluateWanderOpportunity(level, animal, opportunity, flockCenter, activelyHerded = false) {
  const cohortSize = wanderCohortSize(level.animals.length);
  if (level.index < 7 || animal.saved || activelyHerded || cohortSize === 0) return null;
  if (!cohortFor(level).has(animal.id) || roll(level.seed, animal.id, opportunity, 0x17a11) >= 0.33) return null;
  const dx = animal.x - flockCenter.x, dz = animal.z - flockCenter.z, length = Math.hypot(dx, dz);
  const direction = length > 0.01 ? { x: dx / length, z: dz / length } : { x: 0, z: 1 };
  const bolt = level.index >= 16 && roll(level.seed, animal.id, opportunity, 0xb017) < 0.10;
  const duration = bolt ? 1 + roll(level.seed, animal.id, opportunity, 0x3ec) * 2 : 2.5;
  // Keep the destination beyond the greatest possible travel during the bolt.
  // Otherwise a fast animal can reach its 4–7m wander target and end the bolt
  // well before the separately rolled 1–3 second duration expires.
  const distance = bolt ? 6 * duration + 1 : 4 + roll(level.seed, animal.id, opportunity, 0x10c4) * 3;
  return {
    x: animal.x + direction.x * distance,
    z: animal.z + direction.z * distance,
    until: level.time + duration,
    bolting: bolt,
  };
}

export function advanceWanderClock(level, dt) {
  const before = Math.floor(((level.wanderClock ?? 0) + 1e-8) / WANDER_OPPORTUNITY_SECONDS);
  level.wanderClock = (level.wanderClock ?? 0) + dt;
  return { before, after: Math.floor((level.wanderClock + 1e-8) / WANDER_OPPORTUNITY_SECONDS) };
}

