/** Persisted tiers are numeric (1–3); old boolean unlocks migrate to tier 1. */
const catalog = [
  { id: 'speed', name: 'Turbo paws', icon: 'paw', costs: [80, 120, 200],
    description: 'Circle a roaming flock faster with upgraded paw motors.',
    tierNames: ['Quick paws', 'Trail runner', 'Meadow racer'],
    tierDescriptions: ['+1.8 m/s running speed', '+2.7 m/s running speed', '+3.5 m/s running speed'] },
  { id: 'flock', name: 'Friendly signal', icon: 'signal', costs: [120, 180, 260],
    description: 'Reach more robots with a wider herding signal.',
    tierNames: ['Clear signal', 'Pasture beacon', 'Far-field beacon'],
    tierDescriptions: ['+2 m herding range', '+3 m herding range', '+4 m herding range'] },
  { id: 'drone', name: 'Scout drone', icon: 'drone', costs: [200, 280, 400],
    description: 'A hovering helper gathers stragglers across rivers and fences.',
    tierNames: ['Scout', 'Shepherd scout', 'Flock captain'],
    tierDescriptions: ['Unlock an autonomous scout drone', '33% stronger drone herding', '67% stronger drone herding'] },
  { id: 'helper', name: 'Buddy dog', icon: 'dog', costs: [320, 420, 560],
    description: 'An autonomous friend drives the tail of the flock through crossings.',
    tierNames: ['Farm friend', 'Trail partner', 'Senior shepherd'],
    tierDescriptions: ['Unlock an autonomous buddy dog', '30% stronger buddy herding', '58% stronger buddy herding'] },
  { id: 'bark', name: 'Happy bark', icon: 'bark', costs: [100, 160, 240],
    description: 'A stronger bark gives wandering robots a cheerful nudge.',
    tierNames: ['Bright bark', 'Resonant bark', 'Meadow chorus'],
    tierDescriptions: ['+0.25 bark strength', '+0.45 bark strength', '+0.65 bark strength'] },
  { id: 'cohesion', name: 'Flock harmony', icon: 'harmony', costs: [160, 220, 320],
    description: 'Robots regroup more readily when the flock stretches across a meadow.',
    tierNames: ['Stay together', 'Close companions', 'Perfect formation'],
    tierDescriptions: ['12% stronger regrouping', '23% stronger regrouping', '35% stronger regrouping'] },
];

export const UPGRADE_CATALOG = Object.freeze(catalog.map(item => Object.freeze({
  ...item,
  cost: item.costs[0],
  maxLevel: item.costs.length,
  costs: Object.freeze(item.costs),
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

/** Purchasing one tier is atomic: unsuccessful purchases never mutate points. */
export function purchaseUpgrade(profile, id) {
  const upgrade = findUpgrade(id);
  if (!upgrade) return { ok: false, reason: 'unknown' };
  if (!profile || typeof profile !== 'object') return { ok: false, reason: 'points' };
  const level = upgradeLevel(profile.upgrades, id);
  const cost = upgradeCost(profile.upgrades, id);
  if (cost === null) return { ok: false, reason: 'owned' };
  if (!Number.isFinite(profile.points) || profile.points < cost) return { ok: false, reason: 'points' };
  profile.points -= cost;
  profile.upgrades = { ...validateUpgrades(profile.upgrades), [id]: level + 1 };
  return { ok: true, upgrade, level: level + 1, cost };
}

/** Add boosts to base dog stats; use helper strengths as absolute values. */
export function upgradeEffects(upgrades) {
  const tier = id => upgradeLevel(upgrades, id);
  const effects = {
    speedBoost: [0, 1.8, 2.7, 3.5][tier('speed')],
    signalBoost: [0, 2, 3, 4][tier('flock')],
    barkBoost: [0, 0.25, 0.45, 0.65][tier('bark')],
    cohesionBoost: [0, 0.12, 0.23, 0.35][tier('cohesion')],
    droneStrength: [0, 0.7, 0.93, 1.17][tier('drone')],
    helperStrength: [0, 1, 1.3, 1.58][tier('helper')],
    drone: tier('drone') > 0,
    helper: tier('helper') > 0,
  };
  return effects;
}
