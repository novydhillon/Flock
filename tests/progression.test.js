import test from 'node:test';
import assert from 'node:assert/strict';
import { UPGRADE_CATALOG, upgradeLevel, upgradeCost, purchaseUpgrade, validateUpgrades, upgradeEffects } from '../src/progression.js';

test('six skills each have three progressively priced, effective tiers', () => {
  assert.equal(UPGRADE_CATALOG.length, 6);
  assert.deepEqual(UPGRADE_CATALOG.slice(0, 4).map(item => item.cost), [80, 120, 200, 320]);
  for (const item of UPGRADE_CATALOG) {
    assert.equal(item.costs.length, 3);
    assert.ok(item.costs.every((cost, index) => cost > 0 && (!index || cost > item.costs[index - 1])));
    assert.equal(item.tierNames.length, 3);
    assert.equal(item.tierDescriptions.length, 3);
    assert.ok(Object.isFrozen(item.costs));
  }
});

test('tutorial reward buys Turbo paws and repeated purchases spend the next tier cost', () => {
  const profile = { points: 80, upgrades: {} };
  assert.equal(purchaseUpgrade(profile, 'speed').level, 1);
  assert.equal(profile.points, 0);
  assert.equal(upgradeCost(profile.upgrades, 'speed'), 120);
  const before = structuredClone(profile);
  assert.equal(purchaseUpgrade(profile, 'speed').reason, 'points');
  assert.deepEqual(profile, before);
  profile.points += 120;
  assert.equal(purchaseUpgrade(profile, 'speed').level, 2);
  assert.equal(profile.points, 0);
  assert.equal(upgradeCost(profile.upgrades, 'speed'), 200);
  profile.points += 200;
  assert.equal(purchaseUpgrade(profile, 'speed').level, 3);
  assert.equal(profile.points, 0);
  assert.equal(upgradeCost(profile.upgrades, 'speed'), null);
  assert.equal(purchaseUpgrade(profile, 'speed').reason, 'owned');
});

test('full upgrades remain unaffordable through fifteen base-reward levels', () => {
  const totalCost = UPGRADE_CATALOG.flatMap(item => item.costs).reduce((sum, cost) => sum + cost, 0);
  const rewards = levels => Array.from({ length: levels }, (_, index) => 80 + index * 25).reduce((sum, reward) => sum + reward, 0);
  assert.ok(totalCost > rewards(15), 'later journeys still fund new tiers');
  assert.ok(totalCost <= rewards(17), 'complete progression is reachable without grinding');
  const profile = { points: rewards(17), upgrades: {} };
  for (const item of UPGRADE_CATALOG) for (let tier = 1; tier <= 3; tier++) {
    assert.equal(purchaseUpgrade(profile, item.id).level, tier);
    assert.ok(profile.points >= 0);
  }
  assert.equal(profile.points, rewards(17) - totalCost);
  for (const item of UPGRADE_CATALOG) assert.equal(purchaseUpgrade(profile, item.id).reason, 'owned');
});

test('legacy saves migrate and malformed upgrade values cannot create benefits', () => {
  assert.deepEqual(validateUpgrades({ speed: true, flock: 2, helper: 999, drone: false, bark: '3', cohesion: 1.5, bogus: 3 }), { speed: 1, flock: 2, helper: 3 });
  for (const raw of [undefined, null, 12, 'speed', [], { speed: NaN }, { speed: Infinity }, { speed: -1 }]) {
    assert.equal(upgradeLevel(raw, 'speed'), 0);
    assert.deepEqual(validateUpgrades(raw), {});
  }
  assert.deepEqual(validateUpgrades(Object.create({ speed: 3 })), {});
  assert.equal(upgradeLevel({ unknown: 3 }, 'unknown'), 0);
  assert.equal(upgradeCost({}, 'unknown'), null);
});

test('invalid balances and unknown purchases never deduct points', () => {
  for (const points of [-1, NaN, Infinity, '100', 79]) {
    const profile = { points, upgrades: {} };
    assert.equal(purchaseUpgrade(profile, 'speed').reason, 'points');
    assert.ok(Object.is(profile.points, points));
    assert.deepEqual(profile.upgrades, {});
  }
  const profile = { points: 100, upgrades: null };
  assert.equal(purchaseUpgrade(profile, 'unknown').reason, 'unknown');
  assert.equal(profile.points, 100);
  assert.equal(purchaseUpgrade(profile, 'speed').ok, true);
  assert.deepEqual(profile.upgrades, { speed: 1 });
  assert.equal(purchaseUpgrade(null, 'speed').reason, 'points');
});

test('each tier produces a stronger gameplay effect and helper flags unlock at tier one', () => {
  const fieldById = { speed: 'speedBoost', flock: 'signalBoost', bark: 'barkBoost', cohesion: 'cohesionBoost', drone: 'droneStrength', helper: 'helperStrength' };
  for (const item of UPGRADE_CATALOG) {
    let previous = upgradeEffects({})[fieldById[item.id]];
    for (let tier = 1; tier <= 3; tier++) {
      const effect = upgradeEffects({ [item.id]: tier })[fieldById[item.id]];
      assert.ok(effect > previous, `${item.id} tier ${tier} improves its gameplay stat`);
      previous = effect;
    }
  }
  assert.equal(upgradeEffects({}).drone, false);
  assert.equal(upgradeEffects({}).helper, false);
  assert.equal(upgradeEffects({ drone: true, helper: 1 }).drone, true);
  assert.equal(upgradeEffects({ drone: true, helper: 1 }).helper, true);
  assert.deepEqual(upgradeEffects({ speed: true }), upgradeEffects({ speed: 1 }));
});
