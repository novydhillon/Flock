/** Persisted tiers are numeric (1–3); old boolean unlocks migrate to tier 1. */
const catalog = [
  { id: 'speed', name: 'Turbo paws', icon: 'paw', costs: [80, 120, 200], unlockLevels: [2, 6, 11],
    description: 'Circle a roaming flock faster with upgraded paw motors.',
    tierNames: ['Quick paws', 'Trail runner', 'Meadow racer'],
    tierDescriptions: ['+1.8 m/s running speed', '+2.7 m/s running speed', '+3.5 m/s running speed'] },
  { id: 'flock', name: 'Friendly signal', icon: 'signal', costs: [120, 180, 260], unlockLevels: [7, 10, 15],
    description: 'Reach more robots with a wider herding signal.',
    tierNames: ['Clear signal', 'Pasture beacon', 'Far-field beacon'],
    tierDescriptions: ['+2 m herding range', '+3 m herding range', '+4 m herding range'] },
  { id: 'drone', name: 'Scout drone', icon: 'drone', costs: [200, 360, 540], unlockLevels: [10, 14, 18],
    description: 'A hovering helper keeps the main herd together while you lead the way.',
    tierNames: ['Scout', 'Shepherd scout', 'Flock captain'],
    tierDescriptions: ['Keeps the main herd together; holds when you leave', '33% stronger drone support', '67% stronger drone support'] },
  { id: 'helper', name: 'Buddy dog', icon: 'dog', costs: [600, 850, 1200], unlockLevels: [20, 24, 28],
    description: 'Herds from the rear, supports split flocks, and learns to retrieve strays.',
    tierNames: ['Farm friend', 'Trail partner', 'Senior shepherd'],
    tierDescriptions: ['Herds from behind in the flock’s direction of travel', 'Guides the smaller flock and passages; barks autonomously', 'Also retrieves wanderers and bolters to the nearest flock'] },
  { id: 'bark', name: 'Happy bark', icon: 'bark', costs: [100, 160, 240], unlockLevels: [4, 8, 13],
    description: 'A stronger bark gives wandering robots a cheerful nudge.',
    tierNames: ['Bright bark', 'Resonant bark', 'Meadow chorus'],
    tierDescriptions: ['+0.25 bark strength', '+0.45 bark strength', '+0.65 bark strength'] },
  { id: 'cohesion', name: 'Flock harmony', icon: 'harmony', costs: [160, 220, 320], unlockLevels: [12, 14, 15],
    description: 'Robots regroup more readily when the flock stretches across a meadow.',
    tierNames: ['Stay together', 'Close companions', 'Perfect formation'],
    tierDescriptions: ['12% stronger regrouping', '23% stronger regrouping', '35% stronger regrouping'] },
];

export const UPGRADE_CATALOG = Object.freeze(catalog.map(item => Object.freeze({
  ...item,
  cost: item.costs[0],
  maxLevel: item.costs.length,
  costs: Object.freeze(item.costs),
  unlockLevels: Object.freeze(item.unlockLevels),
  tierNames: Object.freeze(item.tierNames),
  tierDescriptions: Object.freeze(item.tierDescriptions),
})));

const findUpgrade = id => UPGRADE_CATALOG.find(item => item.id === id);

/** Unknown, malformed and fractional levels confer no benefit. */
export function upgradeLevel(upgrades, id) {
  const upgrade = findUpgrade(id);
  if (!upgrade || !upgrades || typeof upgrades !== 'object') return 0;
  const value = Object.hasOwn(upgrades, id) ? upgrades[id] : undefined;
  if (value === true) return 1;
  return Number.isInteger(value) && value > 0 ? Math.min(value, upgrade.maxLevel) : 0;
}

/** Null means the item is unknown or already fully upgraded. */
export function upgradeCost(upgrades, id) {
  const upgrade = findUpgrade(id);
  if (!upgrade) return null;
  return upgrade.costs[upgradeLevel(upgrades, id)] ?? null;
}

/** Copies only valid catalog entries, dropping unrecognized profile data. */
export function validateUpgrades(raw) {
  const result = {};
  for (const upgrade of UPGRADE_CATALOG) {
    const level = upgradeLevel(raw, upgrade.id);
    if (level) result[upgrade.id] = level;
  }
  return result;
}

/** The next owned tier's level gate; null means unknown or fully upgraded. */
export function nextUnlockLevel(upgrades, id) {
  const upgrade = findUpgrade(id);
  return upgrade?.unlockLevels[upgradeLevel(upgrades, id)] ?? null;
}

/** Saved level indexes are zero-based; public level numbers are one-based. */
function progressionLevel(profileOrLevelNumber) {
  if (typeof profileOrLevelNumber === 'number') {
    return Number.isInteger(profileOrLevelNumber) ? Math.max(1, Math.min(100, profileOrLevelNumber)) : 1;
  }
  const profile = profileOrLevelNumber;
  if (!profile || typeof profile !== 'object') return 1;
  const highest = Number.isInteger(profile.highestLevel) && profile.highestLevel >= 0
    ? Math.min(99, profile.highestLevel) : 0;
  const completed = Array.isArray(profile.completedLevels) ? profile.completedLevels : [];
  const completedLevel = completed.reduce((highestNumber, index) =>
    Number.isInteger(index) && index >= 0 && index <= 99 ? Math.max(highestNumber, Math.min(100, index + 2)) : highestNumber, 1);
  return Math.max(highest + 1, completedLevel);
}

/** Availability includes unlock pacing and affordability; QA can supply its tested public level. */
export function upgradeAvailability(profileOrLevelNumber, id, levelNumber = profileOrLevelNumber) {
  const profile = typeof profileOrLevelNumber === 'object' ? profileOrLevelNumber : null;
  const upgrade = findUpgrade(id);
  const currentLevelNumber = progressionLevel(levelNumber);
  const level = upgradeLevel(profile?.upgrades, id);
  const cost = upgradeCost(profile?.upgrades, id);
  const unlockLevel = nextUnlockLevel(profile?.upgrades, id);
  const reason = !upgrade ? 'unknown' : cost === null ? 'owned'
    : currentLevelNumber < unlockLevel ? 'locked'
    : profile && (!Number.isFinite(profile.points) || profile.points < cost) ? 'points' : null;
  return { available: reason === null, reason, level, nextLevel: cost === null ? null : level + 1,
    cost, unlockLevel, currentLevelNumber };
}

/** Legacy purchases stay saved; only tiers unlocked in the current meadow apply. */
export function activeUpgrades(upgrades, levelNumber = 1) {
  const currentLevelNumber = progressionLevel(levelNumber);
  const result = {};
  for (const upgrade of UPGRADE_CATALOG) {
    const owned = upgradeLevel(upgrades, upgrade.id);
    const unlocked = upgrade.unlockLevels.filter(level => level <= currentLevelNumber).length;
    const tier = Math.min(owned, unlocked);
    if (tier) result[upgrade.id] = tier;
  }
  return result;
}

/** Purchasing one tier is atomic; an explicit public level uses the same gate as availability. */
export function purchaseUpgrade(profile, id, levelNumber = profile) {
  const upgrade = findUpgrade(id);
  if (!upgrade) return { ok: false, reason: 'unknown' };
  if (!profile || typeof profile !== 'object') return { ok: false, reason: 'points' };
  const level = upgradeLevel(profile.upgrades, id);
  const cost = upgradeCost(profile.upgrades, id);
  if (cost === null) return { ok: false, reason: 'owned' };
  const unlockLevel = nextUnlockLevel(profile.upgrades, id);
  if (progressionLevel(levelNumber) < unlockLevel) return { ok: false, reason: 'locked', unlockLevel };
  if (!Number.isFinite(profile.points) || profile.points < cost) return { ok: false, reason: 'points' };
  profile.points -= cost;
  profile.upgrades = { ...validateUpgrades(profile.upgrades), [id]: level + 1 };
  return { ok: true, upgrade, level: level + 1, cost };
}

/** Add boosts to base dog stats; use helper strengths as absolute values. */
export function upgradeEffects(upgrades, levelNumber = 1) {
  const active = activeUpgrades(upgrades, levelNumber);
  const tier = id => upgradeLevel(active, id);
  const effects = {
    speedBoost: [0, 1.8, 2.7, 3.5][tier('speed')],
    signalBoost: [0, 2, 3, 4][tier('flock')],
    barkBoost: [0, 0.25, 0.45, 0.65][tier('bark')],
    cohesionBoost: [0, 0.12, 0.23, 0.35][tier('cohesion')],
    droneStrength: [0, 0.7, 0.93, 1.17][tier('drone')],
    helperStrength: [0, 1, 1.3, 1.58][tier('helper')],
    drone: tier('drone') > 0,
    helper: tier('helper') > 0,
    helperTier: tier('helper'),
  };
  return effects;
}
