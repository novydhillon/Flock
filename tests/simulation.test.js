import test from 'node:test';
import assert from 'node:assert/strict';
import { createLevel, stepSimulation, canOccupy, defaultProfile, purchaseUpgrade, applyLevelReward, validateProfile, loadProfile, saveProfile } from '../src/simulation.js';

test('buying a ground helper on a bridge spawns it on traversable ground',()=>{
  const level=createLevel(2),river=level.rivers[0],bridge=river.bridges[0],dog={x:river.x,z:bridge.z};
  level.animals.forEach((a,i)=>{a.x=river.x+5+(i%3);a.z=bridge.z+(i%2)*.5;});
  stepSimulation(level,dog,{},1/60,{helper:true});const helper=level.helpers.find(h=>h.type==='helper');
  assert.ok(canOccupy(level,helper.x,helper.z,.6));const initial={...helper};
  for(let i=0;i<600;i++)stepSimulation(level,dog,{},1/60,{helper:true});
  assert.ok(Math.hypot(helper.x-initial.x,helper.z-initial.z)>1);
});

test('the final campaign reward cannot unlock an out-of-range level',()=>{
  const profile=defaultProfile(),level=createLevel(99);level.completed=true;applyLevelReward(profile,level);
  assert.equal(profile.highestLevel,99);assert.equal(createLevel(profile.highestLevel).index,99);
});

test('procedural worlds are repeatable and later levels increase flock and distance', () => {
  assert.deepEqual(createLevel(3, 1234), createLevel(3, 1234));
  assert.notDeepEqual(createLevel(3, 1234), createLevel(3, 5678));
  let previous = createLevel(0);
  assert.equal(previous.animals.length, 5);
  assert.equal(previous.rivers.length, 0);
  for (let index = 1; index < 10; index++) {
    const level = createLevel(index);
    assert.ok(level.animals.length > previous.animals.length);
    assert.ok(level.target.x - level.spawn.x > previous.target.x - previous.spawn.x);
    assert.ok(level.animals.every(a => canOccupy(level, a.x, a.z, a.type === 'cow' ? 0.78 : 0.55)));
    previous = level;
  }
  assert.ok(createLevel(3).animals.some(a => a.type === 'cow'));
});

test('river banks block dog movement and bridges permit crossing', () => {
  const level = createLevel(1);
  const river = level.rivers[0];
  const dog = { x: river.x - river.width / 2 - 1, z: 12 };
  for (let i = 0; i < 150; i++) stepSimulation(level, dog, { x: 1, z: 0 }, 1 / 60);
  assert.ok(dog.x < river.x - river.width / 2);
  dog.z = river.bridges[0].z;
  for (let i = 0; i < 90; i++) stepSimulation(level, dog, { x: 1, z: 0 }, 1 / 60);
  assert.ok(dog.x > river.x + river.width / 2);
});

test('gates constrain fence crossing and even large steps cannot tunnel', () => {
  const level = createLevel(2);
  const gate = level.gates[0];
  const dog = { x: gate.x - 1, z: gate.z + 10 };
  for (let i = 0; i < 30; i++) stepSimulation(level, dog, { x: 1 }, 0.1);
  assert.ok(dog.x < gate.x);
  dog.z = gate.z;
  for (let i = 0; i < 15; i++) stepSimulation(level, dog, { x: 1 }, 0.1);
  assert.ok(dog.x > gate.x);
});

test('the dog moves the herd; waiting does not complete a level', () => {
  const idle = createLevel(0);
  for (let frame = 0; frame < 3600; frame++) stepSimulation(idle, idle.dog, {}, 1 / 60);
  assert.equal(idle.completed, undefined);
  assert.equal(idle.animals.filter(a => a.saved).length, 0);
  const level = createLevel(0);
  const originalX = level.animals.reduce((sum, a) => sum + a.x, 0) / 5;
  for (let frame = 0; frame < 1200; frame++) {
    const active = level.animals.filter(a => !a.saved);
    if (!active.length) break;
    const center = active.reduce((p, a) => ({ x: p.x + a.x / active.length, z: p.z + a.z / active.length }), { x: 0, z: 0 });
    // A real player positioning policy: stay behind the herd, aim toward pen.
    const toward = { x: level.target.x - center.x, z: level.target.z - center.z };
    const length = Math.hypot(toward.x, toward.z);
    const desired = { x: center.x - toward.x / length * 3.3, z: center.z - toward.z / length * 3.3 };
    const dx = desired.x - level.dog.x, dz = desired.z - level.dog.z;
    const d = Math.hypot(dx, dz);
    stepSimulation(level, level.dog, { x: dx / Math.max(1, d), z: dz / Math.max(1, d) }, 1 / 60);
  }
  assert.ok(level.animals.reduce((sum, a) => sum + a.x, 0) / 5 > originalX + 15);
  assert.equal(level.completed, true);
});

test('level rewards and upgrades are idempotent and persist', () => {
  const level = createLevel(0);
  level.animals.forEach(a => { a.x = level.target.x; a.z = level.target.z; });
  const first = stepSimulation(level, level.dog, {}, 1 / 60);
  assert.equal(first.justCompleted, true);
  assert.equal(first.reward, 80);
  assert.equal(stepSimulation(level, level.dog, {}, 1 / 60).reward, 0);
  const profile = defaultProfile();
  assert.equal(purchaseUpgrade(profile, 'drone').reason, 'points');
  assert.equal(applyLevelReward(profile, level), 80);
  assert.equal(applyLevelReward(profile, level), 0);
  assert.equal(purchaseUpgrade(profile, 'speed').ok, true);
  assert.equal(profile.points, 0);
  assert.equal(purchaseUpgrade(profile, 'speed').reason, 'points');
  let data;
  const storage = { setItem: (_key, value) => { data = value; }, getItem: () => data };
  assert.equal(saveProfile(profile, storage), true);
  assert.deepEqual(loadProfile(storage), profile);
  assert.deepEqual(validateProfile({ points: -100, upgrades: { bogus: true }, completedLevels: [-1, 0, 0] }).completedLevels, [0]);
  assert.equal(loadProfile({ getItem: () => 'broken JSON' }).points, 0);
});

test('destination front, sides and rear agree with the visible square pen', () => {
  const level = createLevel(0), target = level.target, extent = target.radius + 1.4;
  const west = target.x - extent, east = target.x + extent;
  assert.equal(canOccupy(level, west, target.z, 0.78), true, 'the entrance fits a cow');
  assert.equal(canOccupy(level, west, target.z + 4.2), false, 'front fence blocks the closed section');
  assert.equal(canOccupy(level, east, target.z), false, 'rear fence is solid');
  assert.equal(canOccupy(level, target.x, target.z + extent), false, 'south side is solid');
  assert.equal(canOccupy(level, target.x, target.z - extent), false, 'north side is solid');
  const dog = { x: west - 1, z: target.z + 4.2 };
  for (let frame = 0; frame < 120; frame++) stepSimulation(level, dog, { x: 1 }, 1 / 60);
  assert.ok(dog.x < west, 'dog cannot walk through front fence');
  dog.z = target.z;
  for (let frame = 0; frame < 240; frame++) stepSimulation(level, dog, { x: 1 }, 1 / 60);
  assert.ok(dog.x > target.x, 'dog entered through the opening');
  assert.ok(dog.x < east, 'dog stops at rear fence');
});

test('blocked browser storage getters fall back to a playable in-memory profile', () => {
  const previous = Object.getOwnPropertyDescriptor(globalThis, 'localStorage');
  try {
    Object.defineProperty(globalThis, 'localStorage', {
      configurable: true,
      get() { throw new Error('Storage access denied'); },
    });
    assert.deepEqual(loadProfile(), defaultProfile());
    assert.equal(saveProfile(defaultProfile()), false);
  } finally {
    if (previous) Object.defineProperty(globalThis, 'localStorage', previous);
    else delete globalThis.localStorage;
  }
});

test('all 100 levels have valid spawns and traversable crossing routes', () => {
  for (let index = 0; index < 100; index++) {
    const level = createLevel(index);
    assert.ok(canOccupy(level, level.dog.x, level.dog.z, 0.62), `level ${index} dog spawn`);
    assert.ok(level.animals.every(a => canOccupy(level, a.x, a.z, a.type === 'cow' ? 0.78 : 0.55)), `level ${index} flock spawns`);
    const crossings = [
      ...level.rivers.map(r => ({ x: r.x, z: r.bridges[0].z, extent: r.width / 2 })),
      ...level.gates.map(g => ({ ...g, extent: 0.18 })),
      { x: level.target.x - level.target.radius - 1.4, z: level.target.z, extent: 0.18 },
    ].sort((a, b) => a.x - b.x);
    const route = crossings.flatMap(c => [
      { x: c.x - c.extent - 0.9, z: c.z },
      { x: c.x + c.extent + 0.9, z: c.z },
    ]);
    route.push(level.target);
    // Exercise actual body movement, rather than only checking individual points.
    level.animals = [];
    for (const waypoint of route) {
      let frame = 0;
      for (; frame < 20000; frame++) {
        const dx = waypoint.x - level.dog.x, dz = waypoint.z - level.dog.z;
        const distance = Math.hypot(dx, dz);
        if (distance < 0.22) break;
        stepSimulation(level, level.dog, { x: dx / Math.max(1, distance), z: dz / Math.max(1, distance) }, 1 / 60);
      }
      assert.ok(frame < 20000, `level ${index} route reaches ${JSON.stringify(waypoint)}`);
    }
  }
});

test('ground helper reaches an off-axis bridge instead of sticking to its river bank', () => {
  const level = createLevel(1);
  level.animals = [{ id: 0, type: 'sheep', x: 6, z: 10, vx: 0, vz: 0, saved: false }];
  level.helpers = [{ type: 'helper', x: -10, z: 13 }];
  level.dog = { x: -16, z: 15 };
  let crossed = false;
  for (let frame = 0; frame < 2400; frame++) {
    const result = stepSimulation(level, level.dog, {}, 1 / 60, { helper: true });
    const helper = result.helpers[0];
    if (!helper) break;
    assert.ok(canOccupy(level, helper.x, helper.z, 0.59), 'helper stays on passable ground');
    if (helper.x > level.rivers[0].x + 2) crossed = true;
  }
  assert.ok(crossed, 'helper navigated the bridge to the flock');
});

test('journeys keep increasing after the flock size reaches its mobile cap', () => {
  let previousDistance = 0;
  for (let index = 0; index < 100; index++) {
    const level = createLevel(index);
    const travelDistance = Math.hypot(level.target.x - level.spawn.x, level.target.z - level.spawn.z);
    assert.ok(travelDistance > previousDistance, `level ${index} is a longer journey`);
    previousDistance = travelDistance;
  }
});

test('unlocked helpers finish the first seven levels, including two-bridge routes', () => {
  for (let index = 0; index <= 6; index++) {
    const level = createLevel(index);
    for (let frame = 0; frame < 18000 && !level.completed; frame++) {
      stepSimulation(level, level.dog, {}, 1 / 60, { helper: true, drone: true });
    }
    assert.ok(level.completed, `helpers complete level ${index} within five minutes`);
    assert.ok(level.animals.every(animal => animal.saved));
  }
});

test('visible road segments lead to real bridge and gate openings', () => {
  for (const index of [1, 2, 5, 6, 10]) {
    const level = createLevel(index);
    const roadPoints = level.roads.flatMap(road => [road.from, road.to]);
    for (const river of level.rivers) {
      assert.ok(roadPoints.some(point => point.x === river.x && point.z === river.bridges[0].z), `level ${index} road meets bridge`);
    }
    for (const gate of level.gates) {
      assert.ok(roadPoints.some(point => point.x === gate.x && point.z === gate.z), `level ${index} road meets gate`);
    }
  }
});

test('level 14 helpers recover from a stationary anchor instead of freezing indefinitely', () => {
  const level = createLevel(13);
  for (let frame = 0; frame < 18000 && !level.completed; frame++) {
    stepSimulation(level, level.dog, {}, 1 / 60, { drone: 3, helper: 3, cohesion: 3 });
  }
  assert.ok(level.helpers.some(helper => helper.recoveryTurn > 0), 'helper detects stalled pressure and changes flank');
  assert.ok(level.animals.some(animal => animal.saved), 'the previous zero-progress level makes progress');
});
