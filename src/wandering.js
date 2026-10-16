/** Seeded, per-level straggler behavior. */
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

export const WANDER_CHECK_RANGE = [5, 8];
export const wanderCohortSize = count => Math.floor(Math.max(0, count) * .20);
export function wanderTuning(index) {
  const number = index + 1;
  return {wanderChance:number>70?.25:number>40?.20:.33, boltChance:number>40?.20:.10,
    duration:number>=70?[5,10]:number>=40?[4,6]:[3,5]};
}

export function prepareWanderCohort(level) {
  const active=level.animals.filter(a=>!a.saved),signature=active.map(a=>a.id).join(',');
  if (level.wanderCohort && level.wanderCohortSignature===signature) return level.wanderCohort;
  const ids = new Set(active.map(a => ({ id: a.id, rank: roll(level.seed ^ Math.imul(level.index+1,7919), a.id, 0, 0x51f15e) }))
    .sort((a, b) => a.rank - b.rank || a.id - b.id)
    .slice(0, wanderCohortSize(active.length)).map(a => a.id));
  level.wanderCohort = ids;
  level.wanderCohortSignature=signature;
  return level.wanderCohort;
}

/** Apply one fixed-time opportunity. Tests can exercise seeded rolls directly. */
export function evaluateWanderOpportunity(level, animal, opportunity, flockCenter, activelyHerded = false) {
  if (level.index < 7 || animal.saved || activelyHerded || animal.wander || animal.wanderHome) return null;
  const tuning=wanderTuning(level.index);
  if (!prepareWanderCohort(level).has(animal.id) || roll(level.seed, animal.id, opportunity, 0x17a11) >= tuning.wanderChance) return null;
  const dx = animal.x - flockCenter.x, dz = animal.z - flockCenter.z, length = Math.hypot(dx, dz);
  const direction = length > 0.01 ? { x: dx / length, z: dz / length } : { x: 0, z: 1 };
  const bolt = level.index >= 16 && roll(level.seed, animal.id, opportunity, 0xb017) < tuning.boltChance;
  const duration = bolt ? tuning.duration[0] + roll(level.seed, animal.id, opportunity, 0x3ec) * (tuning.duration[1]-tuning.duration[0]) : 2.5;
  // Keep the destination beyond the greatest possible travel during the bolt.
  // Otherwise a fast animal can reach its 4–7m wander target and end the bolt
  // well before the separately rolled duration expires.
  const distance = bolt ? 6 * duration + 1 : 4 + roll(level.seed, animal.id, opportunity, 0x10c4) * 3;
  return {
    x: animal.x + direction.x * distance,
    z: animal.z + direction.z * distance,
    until: level.time + duration,
    bolting: bolt,
  };
}

function interval(level, animal, opportunity) {
  return 5+3*roll(level.seed ^ Math.imul(level.index+1,7919),animal.id,opportunity,0xc10c);
}
/** Independent random 5-8s checks, with no catch-up bursts. */
export function nextWanderOpportunity(level, animal, dt) {
  if (!(dt>0) || level.index<7 || animal.saved) return null;
  if (!Number.isFinite(animal.nextWanderCheck)) {
    animal.wanderOpportunity=0;
    animal.nextWanderCheck=level.time-dt+interval(level,animal,0);
  }
  if (level.time+1e-8<animal.nextWanderCheck) return null;
  const opportunity=animal.wanderOpportunity++;
  animal.nextWanderCheck+=interval(level,animal,animal.wanderOpportunity);
  if(animal.nextWanderCheck<=level.time)animal.nextWanderCheck=level.time+interval(level,animal,animal.wanderOpportunity);
  return opportunity;
}

