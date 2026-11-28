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
import {
  DOG_TRAINING_CATALOG,
  buyDogTraining,
  dogTrainingEffects,
  dogStatRange,
  trainingAvailability,
} from '../src/progression/dog-training.js';
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
  assert.equal(kennel.dogs[0].catalogId, 'buddy');
  assert.equal(kennel.dogs[0].name, 'Buddy');
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

test('kennel slots keep their milestones and prices without duplicating the starter Buddy', () => {
  const profile = defaultProfile();
  const price = 100;
  profile.points = 360;

  for (const [slot, meadow] of [
    [2, 20],
    [3, 40],
    [4, 60],
  ]) {
    profile.highestLevel = meadow - 2;
    assert.equal(slotAvailability(profile, slot, price).available, false);
    const beforeGate = structuredClone(profile);
    buyKennelSlot(profile, slot, price);
    assert.deepEqual(profile, beforeGate);

    profile.highestLevel = meadow - 1;
    assert.equal(slotAvailability(profile, slot, price).available, true);
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
    assert.deepEqual(profile.kennel.lineup, [buddies[0].id, null, null, null]);

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
    assert.equal(assignKennelDog(profile, 4, 'buddy').ok, false);
    assert.equal(profile.points, 2_000);
    assert.equal(buyKennelSlot(profile, 2, 600).ok, true);
    assert.equal(profile.kennel.openedSlots, 2);
    assert.equal(profile.points, 1_400);
  }
});

test('Pip unlocks at meadow three as a one-time adoption and keeps Buddy in the player slot', () => {
  const profile = defaultProfile();
  profile.highestLevel = 1;
  profile.points = 100;
  assert.equal(adoptKennelDog(profile, 'pip').reason, 'locked');
  profile.highestLevel = 2;
  profile.points = 99;
  assert.equal(adoptKennelDog(profile, 'pip').reason, 'points');
  profile.points = 100;
  assert.equal(adoptKennelDog(profile, 'pip').dog.id, 'pip');
  assert.deepEqual(adoptKennelDog(profile, 'pip'), { ok: false, reason: 'owned' });
  assert.deepEqual(validateProfile(profile), profile);
  assert.equal(profile.points, 0);
  assert.deepEqual(profile.kennel.lineup, ['buddy', null, null, null]);
  assert.equal(assignKennelDog(profile, 1, 'pip').ok, true);
});

test('each paid adoption unlocks before or without a crew-position purchase', () => {
  for (let index = 0; index < 8; index++) {
    const profile = defaultProfile();
    const meadow = 10 + 5 * index;
    const cost = 600 + 200 * index;
    const catalogId = `dog-${index + 3}`;
    profile.points = 5_000;
    profile.highestLevel = meadow - 2;
    assert.equal(adoptionAvailability(profile, catalogId).available, false);
    profile.highestLevel = meadow - 1;
    assert.equal(adoptionAvailability(profile, catalogId).available, true);
    assert.equal(adoptKennelDog(profile, catalogId).ok, true);
    assert.equal(profile.points, 5_000 - cost);
    assert.equal(profile.kennel.openedSlots, 1);
    assert.deepEqual(validateProfile(profile), profile);
  }
});

test('duplicate kennel adoptions and lineup changes persist alongside campaign rewards', () => {
  const profile = defaultProfile();
  profile.highestLevel = 8;
  profile.points = 10_000;
  profile.music = false;
  assert.equal(applyLevelReward(profile, finishedRun(2)), 32);
  assert.equal(adoptionAvailability(profile, 'dog-3').available, false);
  const beforeSlot = structuredClone(profile);
  adoptKennelDog(profile, 'dog-3', 'Early');
  assert.deepEqual(profile, beforeSlot);

  profile.highestLevel = 8;
  assert.equal(adoptionAvailability(profile, 'dog-3').available, false);
  const beforeGate = structuredClone(profile);
  adoptKennelDog(profile, 'dog-3', 'Early');
  assert.deepEqual(profile, beforeGate);

  profile.highestLevel = 9;
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
  profile.highestLevel = 19;
  assert.ok(buyKennelSlot(profile, 2, 100).ok);
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

test('personal training quotes one tier and rejects gated, unfunded, stale and maxed purchases', () => {
  for (const skill of DOG_TRAINING_CATALOG) {
    const profile = defaultProfile();
    const dog = profile.kennel.dogs[0];
    for (let tier = 0; tier < 3; tier++) {
      const cost = skill.costs[tier];
      const meadow = skill.unlockLevels[tier];
      profile.points = cost;
      profile.highestLevel = meadow - 2;
      assert.equal(buyDogTraining(profile, dog.id, skill.id, tier).reason, 'locked');
      assert.equal(profile.points, cost);
      profile.highestLevel++;
      profile.points--;
      assert.equal(buyDogTraining(profile, dog.id, skill.id, tier).reason, 'points');
      assert.equal(dog.training[skill.id], tier);
      profile.points++;
      assert.deepEqual(trainingAvailability(profile, dog.id, skill.id), {
        available: true,
        reason: null,
        level: tier,
        meadow,
        cost,
        base: skill.id === 'speed' ? 2 : 1,
        upgrades: 3,
      });
      assert.equal(buyDogTraining(profile, dog.id, skill.id, tier).ok, true);
      assert.equal(profile.points, 0);
      profile.highestLevel = 99;
      profile.points = 10_000;
      assert.equal(buyDogTraining(profile, dog.id, skill.id, tier).ok, false);
      assert.equal(dog.training[skill.id], tier + 1);
      assert.equal(profile.points, 10_000);
    }
    assert.equal(trainingAvailability(profile, dog.id, skill.id).reason, 'max');
    assert.equal(buyDogTraining(profile, 'missing', skill.id).reason, 'dog');
    assert.equal(buyDogTraining(profile, dog.id, 'helper').reason, 'unknown');
  }
});

test('each dog has bounded purchasable tiers and configured base stats that affect gameplay', () => {
  const profile = defaultProfile();
  profile.highestLevel = 99;
  profile.points = 20000;
  const buddy = profile.kennel.dogs[0];
  const { dog: pip } = adoptKennelDog(profile, 'pip');
  assert.equal(dogTrainingEffects(pip).maxSpeed, dogTrainingEffects(buddy).maxSpeed);
  for (const catalogId of ['buddy', 'pip', ...Array.from({ length: 8 }, (_, i) => `dog-${i + 3}`)]) {
    assert.ok(dogStatRange(catalogId, 'speed').base >= 2);
    assert.ok(
      dogTrainingEffects({ catalogId, training: { speed: 1 } }).maxSpeed > dogTrainingEffects({ catalogId }).maxSpeed,
    );
  }
  assert.ok(dogTrainingEffects(pip).signalBoost > dogTrainingEffects(buddy).signalBoost);
  for (let tier = 0; tier < 5; tier++) {
    const state = trainingAvailability(profile, pip.id, 'bark');
    assert.equal(state.upgrades, 5);
    assert.equal(state.level, tier);
    assert.ok(buyDogTraining(profile, pip.id, 'bark', tier).ok);
  }
  assert.equal(trainingAvailability(profile, pip.id, 'bark').reason, 'max');
  assert.equal(validateProfile(profile).kennel.dogs[1].training.bark, 5);
  assert.ok(
    dogTrainingEffects(pip).barkMultiplier > dogTrainingEffects({ ...pip, training: { bark: 3 } }).barkMultiplier,
  );
});

test('training survives reload and lineup swaps for individual copies, including runs in earlier meadows', () => {
  const profile = defaultProfile();
  profile.highestLevel = 49;
  profile.points = 10_000;
  buyKennelSlot(profile, 2);
  const { dog: fern } = adoptKennelDog(profile, 'dog-3', 'Fern');
  const { dog: hazel } = adoptKennelDog(profile, 'dog-3', 'Hazel');
  for (const skill of DOG_TRAINING_CATALOG) {
    for (let tier = 0; tier < 3; tier++) assert.equal(buyDogTraining(profile, fern.id, skill.id, tier).ok, true);
  }
  assignKennelDog(profile, 1, fern.id);
  assignKennelDog(profile, 2, hazel.id);
  let stored;
  const storage = {
    getItem: () => stored,
    setItem: (_, value) => {
      stored = value;
    },
  };
  saveProfile(profile, storage);
  const reloaded = loadProfile(storage);
  const [lead, helper] = reloaded.kennel.lineup.map((id) => reloaded.kennel.dogs.find((dog) => dog.id === id));
  assert.equal(lead.id, fern.id);
  assert.equal(helper.id, hazel.id);
  const trained = dogTrainingEffects(lead);
  const untrained = dogTrainingEffects(helper);
  assert.ok(trained.maxSpeed > untrained.maxSpeed && trained.turnMultiplier > untrained.turnMultiplier);
  assert.equal(trained.signalBoost, 4);
  assert.equal(untrained.signalBoost, 0);
  assert.ok(trained.barkMultiplier > untrained.barkMultiplier);
  assert.equal(trained.barkCharges, 2);
  assert.equal(untrained.barkCharges, 1);
  assert.deepEqual(reloaded, profile);
});

test('existing and malformed saved dogs get validated individual tiers without converting Workshop purchases', () => {
  const profile = defaultProfile();
  delete profile.kennel.dogs[0].training;
  profile.upgrades = { speed: 3, flock: 1 };
  const saved = validateProfile(profile);
  assert.deepEqual(saved.kennel.dogs[0].training, { speed: 0, agility: 0, influence: 0, bark: 0 });
  assert.deepEqual(saved.upgrades, profile.upgrades);
  profile.kennel.dogs[0].training = { speed: true, agility: Infinity, influence: 2, bark: 999, helper: 3 };
  assert.deepEqual(validateProfile(profile).kennel.dogs[0].training, { speed: 0, agility: 0, influence: 2, bark: 3 });
});
