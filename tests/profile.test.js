import test from 'node:test';
import assert from 'node:assert/strict';
import {
  defaultProfile,
  validateProfile,
  applyLevelReward,
  loadProfile,
  saveProfile,
} from '../src/progression/profile.js';
import {
  adoptionAvailability,
  adoptKennelDog,
  assignKennelDog,
  buyKennelSlot,
  slotAvailability,
} from '../src/progression/kennel.js';
import { maximumLevelReward, MAX_LEVEL_INDEX } from '../src/simulation/delivery.js';
import {
  UPGRADE_CATALOG,
  upgradeEffects,
  upgradeAvailability,
  purchaseUpgrade,
} from '../src/progression/progression.js';
import progressionSettings from '../src/config/progression.json' with { type: 'json' };
import { resolveConfig } from '../src/config/resolve.js';

const finishedRun = (saved, index = 0, reward = maximumLevelReward(index)) => ({
  index,
  reward,
  completed: true,
  animals: Array.from({ length: 5 }, (_, id) => ({ id, saved: id < saved })),
});

test('profile defaults own fresh state and malformed saves cannot introduce transient data', () => {
  const first = defaultProfile(),
    second = defaultProfile();
  first.upgrades.speed = 1;
  first.bestEarnedBolts[0] = 16;
  first.completedLevels.push(0);
  first.kennel.dogs[0].name = 'Renamed';
  const { kennel, ...campaign } = second;
  assert.deepEqual(campaign, {
    version: 2,
    points: 0,
    upgrades: {},
    completedLevels: [],
    bestScores: {},
    bestEarnedBolts: {},
    highestLevel: 0,
    music: true,
  });
  assert.equal(kennel.openedSlots, 1);
  assert.equal(kennel.dogs.length, 1);
  assert.equal(kennel.dogs[0].catalogId, 'pip');
  assert.equal(kennel.dogs[0].name, 'Pip');
  assert.deepEqual(kennel.lineup, [kennel.dogs[0].id, null, null, null]);
  for (const value of [null, undefined, false, 12, 'profile', [], {}]) assert.deepEqual(validateProfile(value), second);
  const result = validateProfile({
    version: 2,
    points: 3.9,
    animals: [{ saved: true }],
    delivery: { remaining: 1 },
    upgrades: { speed: true, helper: 999, bark: '3', bogus: 3 },
    music: false,
  });
  assert.equal(result.points, 3);
  assert.deepEqual(result.upgrades, { speed: 1, helper: 3 });
  assert.equal(result.music, false);
  assert.equal(Object.hasOwn(result, 'animals'), false);
  assert.equal(Object.hasOwn(result, 'delivery'), false);
  for (const points of [-1, NaN, Infinity, '100']) assert.equal(validateProfile({ points }).points, 0);
  assert.equal(validateProfile({ points: 1e12 }).points, 1e9);
});

test('kennel slots open at the campaign milestones and grant Buddy only on the first successful purchase', () => {
  const profile = defaultProfile();
  const price = 100;
  profile.points = 360;

  for (const [slot, meadow] of [
    [2, 20],
    [3, 40],
    [4, 60],
  ]) {
    profile.highestLevel = meadow - 2;
    assert.equal(slotAvailability(profile, slot).available, false);
    const beforeGate = structuredClone(profile);
    buyKennelSlot(profile, slot, price);
    assert.deepEqual(profile, beforeGate);

    profile.highestLevel = meadow - 1;
    assert.equal(slotAvailability(profile, slot).available, true);
    const balance = profile.points;
    profile.points = price - 1;
    const beforeFunds = structuredClone(profile);
    buyKennelSlot(profile, slot, price);
    assert.deepEqual(profile, beforeFunds);

    profile.points = balance;
    buyKennelSlot(profile, slot, price);
    assert.equal(profile.points, balance - price);
    assert.equal(profile.kennel.openedSlots, slot);
    const buddies = profile.kennel.dogs.filter((dog) => dog.catalogId === 'buddy');
    assert.equal(buddies.length, 1);
    assert.equal(profile.kennel.lineup[1], buddies[0].id);
    assert.deepEqual(profile.kennel.lineup.slice(2), [null, null]);

    const purchased = structuredClone(profile);
    buyKennelSlot(profile, slot, price);
    assert.deepEqual(profile, purchased);
  }
});

test('invalid opened-slot data cannot spend bolts or create assignments that validation discards', () => {
  for (const openedSlots of [0, 9, '2']) {
    const profile = defaultProfile();
    profile.highestLevel = 59;
    profile.points = 2_000;
    profile.kennel.openedSlots = openedSlots;
    assert.equal(buyKennelSlot(profile, 1, 600).ok, false);
    assert.equal(adoptKennelDog(profile, 'dog-3').ok, false);
    assert.equal(assignKennelDog(profile, 4, 'pip').ok, false);
    assert.equal(profile.points, 2_000);
    assert.equal(buyKennelSlot(profile, 2, 600).ok, true);
    assert.equal(profile.kennel.openedSlots, 2);
    assert.equal(profile.points, 1_400);
  }
});

test('each adoption price becomes available at its public meadow, even after a late Buddy purchase', () => {
  for (let index = 0; index < 8; index++) {
    const profile = defaultProfile();
    const meadow = 25 + 5 * index;
    const cost = 600 + 200 * index;
    const catalogId = `dog-${index + 3}`;
    profile.points = 5_000;
    profile.highestLevel = meadow - 2;
    assert.equal(buyKennelSlot(profile, 2, 600).ok, true);
    assert.equal(adoptionAvailability(profile, catalogId).available, false);
    profile.highestLevel = meadow - 1;
    assert.equal(adoptionAvailability(profile, catalogId).available, true);
    assert.equal(adoptKennelDog(profile, catalogId).ok, true);
    assert.equal(profile.points, 5_000 - 600 - cost);
  }

  const late = defaultProfile();
  late.highestLevel = 59;
  late.points = 5_000;
  assert.equal(adoptionAvailability(late, 'dog-3').available, false);
  assert.equal(buyKennelSlot(late, 2, 600).ok, true);
  assert.equal(adoptionAvailability(late, 'dog-3').available, true);
  assert.equal(adoptionAvailability(late, 'dog-10').available, true);
});

test('duplicate kennel adoptions and lineup changes persist alongside campaign rewards', () => {
  const profile = defaultProfile();
  profile.highestLevel = 24;
  profile.points = 10_000;
  profile.music = false;
  assert.equal(applyLevelReward(profile, finishedRun(2)), 32);
  assert.equal(adoptionAvailability(profile, 'dog-3').available, false);
  const beforeSlot = structuredClone(profile);
  adoptKennelDog(profile, 'dog-3', 'Early');
  assert.deepEqual(profile, beforeSlot);

  buyKennelSlot(profile, 2, 100);
  profile.highestLevel = 23;
  assert.equal(adoptionAvailability(profile, 'dog-3').available, false);
  const beforeGate = structuredClone(profile);
  adoptKennelDog(profile, 'dog-3', 'Early');
  assert.deepEqual(profile, beforeGate);

  profile.highestLevel = 24;
  const balance = profile.points;
  const { available, cost } = adoptionAvailability(profile, 'dog-3');
  assert.equal(available, true);
  assert.ok(cost > 0);

  profile.points = cost - 1;
  assert.equal(adoptionAvailability(profile, 'dog-3').available, false);
  const beforeFunds = structuredClone(profile);
  adoptKennelDog(profile, 'dog-3', 'Unfunded');
  assert.deepEqual(profile, beforeFunds);

  profile.points = balance;
  adoptKennelDog(profile, 'dog-3', 'Fern');
  adoptKennelDog(profile, 'dog-3', 'Hazel', 'auburn-white');
  assert.equal(profile.points, balance - 2 * cost);
  const copies = profile.kennel.dogs.filter((dog) => dog.catalogId === 'dog-3');
  assert.deepEqual(
    copies.map((dog) => dog.name),
    ['Fern', 'Hazel'],
  );
  assert.notEqual(copies[0].id, copies[1].id);
  assert.deepEqual(
    copies.map((dog) => dog.coat),
    ['blonde-white', 'auburn-white'],
  );

  const [fern, hazel] = copies;
  const beforeLockedAssignment = structuredClone(profile);
  assignKennelDog(profile, 3, hazel.id);
  assignKennelDog(profile, 1, null);
  assert.deepEqual(profile, beforeLockedAssignment);
  assignKennelDog(profile, 1, fern.id);
  assignKennelDog(profile, 2, hazel.id);
  assert.deepEqual(profile.kennel.lineup, [fern.id, hazel.id, null, null]);

  const saved = new Map();
  const storage = {
    setItem: (key, value) => saved.set(key, value),
    getItem: (key) => saved.get(key),
  };
  assert.equal(saveProfile(profile, storage), true);
  assert.ok(saved.has('flock-foundry-v1'));
  const reloaded = loadProfile(storage);
  assert.deepEqual(reloaded, profile);
  assert.equal(applyLevelReward(reloaded, finishedRun(2)), 0);
  assert.deepEqual(reloaded.kennel.lineup, [fern.id, hazel.id, null, null]);
  assert.deepEqual(reloaded.bestEarnedBolts, { 0: 32 });
});

test('v2 ledger alone rebuilds caches, rejects malformed keys and caps campaign rewards', () => {
  const profile = validateProfile({
    version: 2,
    points: 7,
    highestLevel: 0,
    completedLevels: [0, 50],
    bestScores: { 0: 80, 50: 99999 },
    bestEarnedBolts: {
      0: 16,
      1: 99999,
      2: -1,
      3: 1.5,
      4: 0.5,
      5: '100',
      6: Infinity,
      '01': 20,
      '1.0': 20,
      '1e0': 20,
      '-0': 20,
      '-1': 20,
      100: 20,
      [MAX_LEVEL_INDEX]: 99999,
    },
  });
  assert.deepEqual(profile.bestEarnedBolts, { 0: 16, 1: 105, 3: 1, 99: 2555 });
  assert.deepEqual(profile.bestScores, profile.bestEarnedBolts);
  assert.deepEqual(profile.completedLevels, [0, 1, 3, 99]);
  assert.equal(profile.highestLevel, 99);
  assert.equal(profile.points, 7);
  assert.deepEqual(validateProfile(profile), profile);
  assert.deepEqual(validateProfile({ version: 2, completedLevels: [0], bestScores: { 0: 80 } }).completedLevels, []);
});

test('only pre-ledger versions migrate completed levels without adding spendable bolts', () => {
  for (const version of [undefined, 1]) {
    const profile = validateProfile({
      version,
      points: 17,
      highestLevel: 20,
      completedLevels: [0, 1, 1, -1, 100, '2'],
      bestEarnedBolts: { 0: 16 },
      upgrades: { speed: true, helper: 2 },
      music: false,
    });
    assert.deepEqual(profile.bestEarnedBolts, { 0: 80, 1: 105 });
    assert.deepEqual(profile.upgrades, { speed: 1, helper: 2 });
    assert.equal(profile.points, 17);
    assert.equal(profile.highestLevel, 20);
    assert.equal(profile.music, false);
    assert.equal(applyLevelReward(profile, finishedRun(5)), 0);
    assert.deepEqual(validateProfile(profile), profile);
  }
  for (const version of [2, 3, null]) {
    const profile = validateProfile({ version, points: 17, completedLevels: [0, 1], bestEarnedBolts: { 0: 16 } });
    assert.deepEqual(profile.bestEarnedBolts, { 0: 16 });
    assert.equal(applyLevelReward(profile, finishedRun(2)), 16);
  }
});

test('partial rewards pay only lifetime improvements after spending and persistence', () => {
  let profile = defaultProfile(),
    serialized,
    savedKey;
  const storage = {
    setItem(key, value) {
      savedKey = key;
      serialized = value;
    },
    getItem(key) {
      assert.equal(key, 'flock-foundry-v1');
      return serialized;
    },
  };
  assert.equal(applyLevelReward(profile, finishedRun(2)), 32);
  profile.points = 0;
  assert.equal(saveProfile(profile, storage), true);
  assert.equal(savedKey, 'flock-foundry-v1');
  profile = loadProfile(storage);
  assert.equal(applyLevelReward(profile, finishedRun(1)), 0);
  assert.equal(applyLevelReward(profile, finishedRun(2)), 0);
  assert.equal(applyLevelReward(profile, finishedRun(4)), 32);
  assert.equal(applyLevelReward(profile, finishedRun(5)), 16);
  assert.equal(applyLevelReward(profile, finishedRun(5)), 0);
  assert.equal(profile.points, 48);
  assert.equal(profile.highestLevel, 1);
  assert.deepEqual(profile.bestEarnedBolts, { 0: 80 });
  assert.deepEqual(profile.completedLevels, [0]);
});

test('invalid and empty runs do not unlock levels; cached saved count and campaign cap remain authoritative', () => {
  const profile = defaultProfile();
  for (const level of [
    finishedRun(0),
    { ...finishedRun(5), completed: false },
    { ...finishedRun(5), animals: [] },
    finishedRun(5, -1),
    finishedRun(5, 100),
    finishedRun(5, 1.5),
  ]) {
    assert.equal(applyLevelReward(profile, level), 0);
    assert.deepEqual(profile, defaultProfile());
  }
  const partial = finishedRun(5);
  partial.result = { saved: 2 };
  assert.equal(applyLevelReward(profile, partial), 32);
  assert.equal(applyLevelReward(profile, finishedRun(5, 0, 99999)), 48);
  const last = finishedRun(5, 99);
  assert.equal(applyLevelReward(profile, last), 2555);
  assert.equal(profile.highestLevel, 99);
});

test('storage parsing, access failures and explicit keys preserve the persistence contract', () => {
  for (const getItem of [
    () => 'broken JSON',
    () => {
      throw new Error('denied');
    },
    () => null,
  ]) {
    assert.deepEqual(loadProfile({ getItem }), defaultProfile());
  }
  assert.equal(
    saveProfile(defaultProfile(), {
      setItem() {
        throw new Error('full');
      },
    }),
    false,
  );
  let data;
  assert.equal(
    saveProfile(
      { points: 12.8 },
      {
        setItem(key, value) {
          assert.equal(key, 'custom');
          data = value;
        },
      },
      'custom',
    ),
    true,
  );
  assert.equal(
    loadProfile(
      {
        getItem(key) {
          assert.equal(key, 'custom');
          return data;
        },
      },
      'custom',
    ).points,
    12,
  );
  const prior = Object.getOwnPropertyDescriptor(globalThis, 'localStorage');
  try {
    Object.defineProperty(globalThis, 'localStorage', {
      configurable: true,
      get() {
        throw new Error('blocked');
      },
    });
    assert.deepEqual(loadProfile(), defaultProfile());
    assert.equal(saveProfile(defaultProfile()), false);
  } finally {
    if (prior) Object.defineProperty(globalThis, 'localStorage', prior);
    else delete globalThis.localStorage;
  }
});

test('configured upgrade tiers keep catalog, effect arrays and atomic purchase gates aligned', () => {
  const config = resolveConfig(progressionSettings, 'progression');
  for (const item of UPGRADE_CATALOG) {
    assert.equal(item.costs.length, item.unlockLevels.length);
    assert.equal(item.costs.length, item.tierNames.length);
    assert.equal(item.costs.length, item.tierDescriptions.length);
    assert.equal(config.upgrades[item.id].costs.length, item.maxLevel);
    assert.ok(Object.isFrozen(item.costs));
    assert.ok(Object.isFrozen(item.unlockLevels));
    assert.ok(item.costs.every((cost, i) => Number.isInteger(cost) && cost > 0 && (!i || cost > item.costs[i - 1])));
    assert.ok(
      item.unlockLevels.every(
        (gate, i) => Number.isInteger(gate) && gate > 1 && gate <= 100 && (!i || gate > item.unlockLevels[i - 1]),
      ),
    );
    for (let tier = 0; tier < item.maxLevel; tier++) {
      const profile = { points: item.costs[tier], highestLevel: 99, upgrades: { [item.id]: tier } };
      const gate = item.unlockLevels[tier],
        before = structuredClone(profile);
      assert.equal(upgradeAvailability(profile, item.id, gate - 1).reason, 'locked');
      assert.equal(purchaseUpgrade(profile, item.id, gate - 1).reason, 'locked');
      assert.deepEqual(profile, before);
      assert.equal(purchaseUpgrade(profile, item.id, gate).level, tier + 1);
      assert.equal(profile.points, 0);
    }
  }
  const tiers = UPGRADE_CATALOG[0].maxLevel + 1;
  for (const values of Object.values(config.effects).filter(Array.isArray)) assert.equal(values.length, tiers);
  assert.equal(config.effects.bark.charges.length, tiers);
});

test('upgrade config preserves every original effect at every campaign level and owned tier', () => {
  const gates = {
    speed: [2, 6, 11],
    flock: [7, 10, 15],
    drone: [10, 14, 18],
    helper: [20, 24, 28],
    bark: [4, 8, 13],
    cohesion: [12, 14, 15],
  };
  for (let levelNumber = 1; levelNumber <= 100; levelNumber++)
    for (let owned = 0; owned <= 3; owned++) {
      const tier = (id) => Math.min(owned, gates[id].filter((gate) => gate <= levelNumber).length);
      const upgrades = Object.fromEntries(Object.keys(gates).map((id) => [id, owned]));
      assert.deepEqual(
        upgradeEffects(upgrades, levelNumber),
        {
          speedBoost: [0, 1.8, 2.7, 3.5][tier('speed')],
          signalBoost: [0, 2, 3, 4][tier('flock')],
          barkBoost: [0, 0.25, 1.9 * 1.33 - 1.65, 1.9 * 1.33 - 1.65][tier('bark')],
          barkMultiplier: [1.65, 1.9, 1.9 * 1.33, 1.9 * 1.33][tier('bark')],
          barkCharges: tier('bark') >= 3 ? 2 : 1,
          cohesionBoost: [0, 0.12, 0.23, 0.35][tier('cohesion')],
          droneStrength: [0, 0.7, 0.93, 1.17][tier('drone')],
          helperStrength: [0, 1, 1.3, 1.58][tier('helper')],
          drone: tier('drone') > 0,
          helper: tier('helper') > 0,
          helperTier: tier('helper'),
        },
        `owned ${owned}, public level ${levelNumber}`,
      );
    }
});
