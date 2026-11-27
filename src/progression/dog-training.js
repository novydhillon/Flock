import settings from '../config/kennel.json' with { type: 'json' };
import { MAX_LEVEL_NUMBER } from '../simulation/delivery.js';
import { UPGRADE_CATALOG, progressionLevel, upgradeEffects } from './progression.js';

const tuning = settings.training;
const policies = new Map(UPGRADE_CATALOG.map((item) => [item.id, item]));
function attribute(id, name, policy, tierDescriptions) {
  return Object.freeze({
    id,
    name,
    costs: Object.freeze(policy.costs),
    unlockLevels: Object.freeze(policy.unlockLevels),
    tierDescriptions: Object.freeze(tierDescriptions),
  });
}

export const DOG_TRAINING_CATALOG = Object.freeze([
  attribute('speed', 'Speed', policies.get('speed'), ['Fast jog', 'Light run', 'All-out run']),
  attribute(
    'agility',
    'Agility',
    tuning.agility,
    tuning.turnMultiplier
      .slice(1)
      .map((multiplier) => `Turns ${Math.round((multiplier - 1) * 100)}% faster while moving`),
  ),
  attribute('influence', 'Influence', policies.get('flock'), policies.get('flock').tierDescriptions),
  attribute('bark', 'Bark intensity', policies.get('bark'), policies.get('bark').tierDescriptions),
]);

function trainingTier(raw, id) {
  const value = raw && Object.hasOwn(raw, id) ? raw[id] : 0;
  return Number.isInteger(value) ? Math.min(3, Math.max(0, value)) : 0;
}

export function validateTraining(raw) {
  return Object.fromEntries(DOG_TRAINING_CATALOG.map(({ id }) => [id, trainingTier(raw, id)]));
}

export function trainingAvailability(profile, dogId, skillId) {
  const skill = DOG_TRAINING_CATALOG.find(({ id }) => id === skillId);
  const dog = profile?.kennel?.dogs?.find((entry) => entry.id === dogId);
  const level = skill ? trainingTier(dog?.training, skillId) : 0;
  const cost = skill?.costs[level] ?? null;
  const meadow = skill?.unlockLevels[level] ?? null;
  let reason = null;
  if (!skill) reason = 'unknown';
  else if (!dog) reason = 'dog';
  else if (cost === null) reason = 'max';
  else if (progressionLevel(profile) < meadow) reason = 'locked';
  else if (!Number.isSafeInteger(profile.points) || profile.points < cost) reason = 'points';
  return { available: reason === null, reason, level, meadow, cost };
}

export function buyDogTraining(profile, dogId, skillId, expectedLevel) {
  const status = trainingAvailability(profile, dogId, skillId);
  if (!status.available) return { ok: false, reason: status.reason };
  if (expectedLevel !== undefined && expectedLevel !== status.level) return { ok: false, reason: 'stale' };
  const dog = profile.kennel.dogs.find((entry) => entry.id === dogId);
  dog.training = { ...validateTraining(dog.training), [skillId]: status.level + 1 };
  profile.points -= status.cost;
  return { ok: true, level: status.level + 1, cost: status.cost };
}

// Purchases follow campaign gates. Their effects follow the dog into any replay.
const tierEffects = tuning.maxSpeed.map((_, tier) => upgradeEffects({ flock: tier, bark: tier }, MAX_LEVEL_NUMBER));
export function dogTrainingEffects(dog) {
  const { speed, agility, influence, bark } = validateTraining(dog?.training);
  const { barkBoost, barkMultiplier, barkCharges } = tierEffects[bark];
  return {
    maxSpeed: tuning.maxSpeed[speed],
    turnMultiplier: tuning.turnMultiplier[agility],
    signalBoost: tierEffects[influence].signalBoost,
    barkBoost,
    barkMultiplier,
    barkCharges,
  };
}
