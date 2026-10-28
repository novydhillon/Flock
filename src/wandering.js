import { CONFIG_CONTRACTS } from './config/contracts.js';
import settings from './config/gameplay.json' with { type: 'json' };
import { resolveConfig } from './config/resolve.js';
const GAMEPLAY = resolveConfig(settings, 'gameplay', CONFIG_CONTRACTS.gameplay);
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

for (const key of ['checkRange', 'boltDurationEarly', 'boltDurationMiddle', 'boltDurationLate', 'ordinaryDistance']) {
  const [minimum, maximum] = GAMEPLAY.wander[key];
  if (minimum > maximum) throw new RangeError(`gameplay.wander.${key}: minimum exceeds maximum`);
}
if (GAMEPLAY.wander.middleLevel > GAMEPLAY.wander.lateLevel) throw new RangeError('gameplay.wander: campaign boundaries are out of order');
export const WANDER_CHECK_RANGE = GAMEPLAY.wander.checkRange;
export const wanderCohortSize = count => Math.floor(Math.max(0, count) * GAMEPLAY.wander.cohortFraction);
export function wanderTuning(index) {
  const number = index + 1;
  return {wanderChance:number>GAMEPLAY.wander.lateLevel?GAMEPLAY.wander.wanderChance[2]:number>GAMEPLAY.wander.middleLevel?GAMEPLAY.wander.wanderChance[1]:GAMEPLAY.wander.wanderChance[0], boltChance:number>GAMEPLAY.wander.middleLevel?GAMEPLAY.wander.boltChance[1]:GAMEPLAY.wander.boltChance[0],
    duration:number>=GAMEPLAY.wander.lateLevel?GAMEPLAY.wander.boltDurationLate:number>=GAMEPLAY.wander.middleLevel?GAMEPLAY.wander.boltDurationMiddle:GAMEPLAY.wander.boltDurationEarly};
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
  if (level.index < GAMEPLAY.wander.unlockIndex || animal.saved || activelyHerded || animal.wander || animal.wanderHome) return null;
  const tuning=wanderTuning(level.index);
  if (!prepareWanderCohort(level).has(animal.id) || roll(level.seed, animal.id, opportunity, 0x17a11) >= tuning.wanderChance) return null;
  const dx = animal.x - flockCenter.x, dz = animal.z - flockCenter.z, length = Math.hypot(dx, dz);
  const direction = length > 0.01 ? { x: dx / length, z: dz / length } : { x: 0, z: 1 };
  const bolt = level.index >= GAMEPLAY.wander.boltUnlockIndex && roll(level.seed, animal.id, opportunity, 0xb017) < tuning.boltChance;
  const duration = bolt ? tuning.duration[0] + roll(level.seed, animal.id, opportunity, 0x3ec) * (tuning.duration[1]-tuning.duration[0]) : GAMEPLAY.wander.ordinarySeconds;
  // Keep the destination beyond the greatest possible travel during the bolt.
  // Otherwise a fast animal can reach its 4–7m wander target and end the bolt
  // well before the separately rolled duration expires.
  const distance = bolt ? GAMEPLAY.simulation.boltSpeed * duration + 1 : GAMEPLAY.wander.ordinaryDistance[0] + roll(level.seed, animal.id, opportunity, 0x10c4) * (GAMEPLAY.wander.ordinaryDistance[1] - GAMEPLAY.wander.ordinaryDistance[0]);
  return {
    x: animal.x + direction.x * distance,
    z: animal.z + direction.z * distance,
    until: level.time + duration,
    bolting: bolt,
  };
}

function interval(level, animal, opportunity) {
  return WANDER_CHECK_RANGE[0]+(WANDER_CHECK_RANGE[1]-WANDER_CHECK_RANGE[0])*roll(level.seed ^ Math.imul(level.index+1,7919),animal.id,opportunity,0xc10c);
}
/** Independent random 5-8s checks, with no catch-up bursts. */
export function nextWanderOpportunity(level, animal, dt) {
  if (!(dt>0) || level.index<GAMEPLAY.wander.unlockIndex || animal.saved) return null;
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

