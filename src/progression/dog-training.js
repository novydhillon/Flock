import settings from '../config/kennel.json' with { type: 'json' };
import { MAX_LEVEL_NUMBER } from '../simulation/delivery.js';
import { UPGRADE_CATALOG, progressionLevel, upgradeEffects } from './progression.js';

const tuning = settings.training;
const policies = new Map(UPGRADE_CATALOG.map((item) => [item.id, item]));
const legacyEffects = Array.from({ length: 4 }, (_, tier) =>
  upgradeEffects({ flock: tier, bark: tier }, MAX_LEVEL_NUMBER),
);
const signalBoosts = [...legacyEffects.map((effect) => effect.signalBoost), ...tuning.advancedSignalBoost];
const maxLegacyBark = legacyEffects.at(-1);
const barkEffects = [
  ...legacyEffects,
  ...tuning.advancedBarkBonus.map((bonus) => ({
    barkBoost: maxLegacyBark.barkBoost + bonus,
    barkMultiplier: maxLegacyBark.barkMultiplier + bonus,
    barkCharges: maxLegacyBark.barkCharges,
  })),
];

function attribute(id, name, policy, describe) {
  return Object.freeze({
    id,
    name,
    costs: Object.freeze([...policy.costs, ...tuning.advanced.costs]),
    unlockLevels: Object.freeze([...policy.unlockLevels, ...tuning.advanced.unlockLevels]),
    describe,
  });
}

export const DOG_TRAINING_CATALOG = Object.freeze([
  attribute('speed', 'Speed', policies.get('speed'), (tier) => `Up to ${tuning.maxSpeed[tier]} m/s`),
  attribute(
    'agility',
    'Agility',
    tuning.agility,
    (tier) => `Turns ${Math.round((tuning.turnMultiplier[tier] - 1) * 100)}% faster while moving`,
  ),
  attribute('influence', 'Influence', policies.get('flock'), (tier) => `+${signalBoosts[tier]} m herding range`),
  attribute('bark', 'Bark intensity', policies.get('bark'), (tier) => {
    const { barkMultiplier, barkCharges } = barkEffects[tier];
    return `×${Number(barkMultiplier.toFixed(2))} bark strength · ${barkCharges} ${barkCharges === 1 ? 'charge' : 'charges'}`;
  }),
]);

const statRanges = new Map(
  Object.entries(tuning.dogs).map(([catalogId, ranges]) => [
    catalogId,
    Object.fromEntries(DOG_TRAINING_CATALOG.map(({ id }, index) => [id, ranges[index]])),
  ]),
);

function trainingRange(catalogId, skillId) {
  return (statRanges.get(catalogId) ?? statRanges.get('buddy'))[skillId];
}

export function dogStatRange(catalogId, skillId) {
  const [base, upgrades] = trainingRange(catalogId, skillId);
  return { base, upgrades };
}

function trainingTier(raw, id, upgrades) {
  const value = raw && Object.hasOwn(raw, id) ? raw[id] : 0;
  return Number.isInteger(value) ? Math.min(upgrades, Math.max(0, value)) : 0;
}

export function validateTraining(raw, catalogId) {
  return Object.fromEntries(
    DOG_TRAINING_CATALOG.map(({ id }) => [id, trainingTier(raw, id, trainingRange(catalogId, id)[1])]),
  );
}

export function trainingAvailability(profile, dogId, skillId) {
  const skill = DOG_TRAINING_CATALOG.find(({ id }) => id === skillId);
  const dog = profile?.kennel?.dogs?.find((entry) => entry.id === dogId);
  const [base, upgrades] = skill ? trainingRange(dog?.catalogId, skillId) : [0, 0];
  const level = trainingTier(dog?.training, skillId, upgrades);
  const cost = level < upgrades ? skill.costs[level] : null;
  const meadow = level < upgrades ? skill.unlockLevels[level] : null;
  let reason = null;
  if (!skill) reason = 'unknown';
  else if (!dog) reason = 'dog';
  else if (cost === null) reason = 'max';
  else if (progressionLevel(profile) < meadow) reason = 'locked';
  else if (!Number.isSafeInteger(profile.points) || profile.points < cost) reason = 'points';
  return { available: reason === null, reason, level, meadow, cost, base, upgrades };
}

export function buyDogTraining(profile, dogId, skillId, expectedLevel) {
  const status = trainingAvailability(profile, dogId, skillId);
  if (!status.available) return { ok: false, reason: status.reason };
  if (expectedLevel !== undefined && expectedLevel !== status.level) return { ok: false, reason: 'stale' };
  const dog = profile.kennel.dogs.find((entry) => entry.id === dogId);
  dog.training = { ...validateTraining(dog.training, dog.catalogId), [skillId]: status.level + 1 };
  profile.points -= status.cost;
  return { ok: true, level: status.level + 1, cost: status.cost };
}

// A single base paw is the original untrained baseline. Base and purchased
// paws contribute to the same effect curve, including in earlier replays.
export function dogTrainingEffects(dog) {
  const training = validateTraining(dog?.training, dog?.catalogId);
  const tier = (id) => trainingRange(dog?.catalogId, id)[0] - 1 + training[id];
  const { barkBoost, barkMultiplier, barkCharges } = barkEffects[tier('bark')];
  return {
    maxSpeed: tuning.maxSpeed[tier('speed')],
    turnMultiplier: tuning.turnMultiplier[tier('agility')],
    signalBoost: signalBoosts[tier('influence')],
    barkBoost,
    barkMultiplier,
    barkCharges,
  };
}
