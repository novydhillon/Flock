import test from 'node:test';
import assert from 'node:assert/strict';
import { stepSimulation, canOccupy } from '../src/simulation.js';
import { createLevel } from '../src/world.js';

const robot = (id, x, z, vx = 0, vz = 0) => ({ id, type: 'sheep', x, z, vx, vz, saved: false });
function meadow(animals, changes = {}) {
  return {
    index: 19, time: 0, reward: 300,
    bounds: { minX: -100, maxX: 100, minZ: -100, maxZ: 100 },
    dog: { x: -70, z: 0 }, target: { x: 65, z: 0, radius: 5, heading: Math.PI / 2, type: 'field' },
    animals, rivers: [], fences: [], fenceSegments: [], gates: [], obstacles: [], routes: [], ...changes,
  };
}
const center = animals => animals.reduce((c, a) => ({ x: c.x + a.x / animals.length, z: c.z + a.z / animals.length }), { x: 0, z: 0 });
const separation = (a, b) => Math.hypot(a.x - b.x, a.z - b.z);
const simulate = (level, seconds, upgrades = { drone: 1 }) => {
  for (let frame = 0; frame < seconds * 10; frame++) stepSimulation(level, level.dog, {}, 0.1, upgrades);
};

test('the drone attends the larger connected herd, excluding isolated and paired stragglers', () => {
  for (const stragglers of [[robot(6, 28, 0)], [robot(6, 28, 0), robot(7, 30, 0)]]) {
    const level = meadow([robot(0, 0, 0), robot(1, 2, 0), robot(2, 0, 2), robot(3, 2, 2), ...stragglers]);
    const baseline = structuredClone(level);
    simulate(level, 60); simulate(baseline, 60, {});
    const drone = level.helpers.find(h => h.type === 'drone');
    assert.deepEqual(drone.clusterIds.slice().sort(), [0, 1, 2, 3]);
    assert.equal(drone.mode, 'hold');
    assert.ok(separation(drone, center(level.animals.slice(0, 4))) < 0.4, 'the drone stays over the main herd');
    for (const straggler of level.animals.slice(4)) {
      const untouched = baseline.animals.find(a => a.id === straggler.id);
      assert.ok(separation(straggler, untouched) < 1e-8, 'excluded animals receive no drone pressure');
    }
  }
});

test('companions stand by when only isolated stragglers remain', () => {
  for (const animals of [[robot(0, 0, 0)], [robot(0, 0, 0), robot(1, 30, 0)]]) {
    const level = meadow(animals), baseline = structuredClone(level);
    simulate(level, 10, { drone: 1, helper: 1 }); simulate(baseline, 10, {});
    assert.deepEqual(level.animals, baseline.animals, 'isolated robots receive no companion support or hold');
    assert.ok(level.helpers.every(h => h.mode === 'standby' && h.clusterIds.length === 0));
  }
  const level = meadow([robot(0, 0, 0), robot(1, 2, 0), robot(2, 30, 0)]);
  simulate(level, 1);
  assert.equal(level.helpers[0].mode, 'hold');
  level.animals[0].saved = level.animals[1].saved = true;
  simulate(level, 1);
  assert.equal(level.helpers[0].mode, 'standby', 'delivered herd does not turn the last straggler into a herd');
  level.animals.push(robot(3, level.animals[2].x + 2, level.animals[2].z));
  simulate(level, 1);
  assert.equal(level.helpers[0].mode, 'hold', 'support resumes when a connected group reforms');
});

test('when Pip leaves, drone stops inherited momentum and holds the flock for fifteen minutes', () => {
  const level = meadow([robot(0, 0, 0, 3), robot(1, 2, 0, 3), robot(2, 0, 2, 3), robot(3, 2, 2, 3)]);
  const anchor = center(level.animals);
  simulate(level, 900, { drone: 3, helper: 3, cohesion: 3 });
  assert.ok(separation(center(level.animals), anchor) < 0.4, 'the flock cannot drift along its old heading');
  assert.equal(level.animals.filter(a => a.saved).length, 0);
  assert.notEqual(level.completed, true);
  assert.ok(level.helpers.every(h => h.mode === 'hold'));
});

test('Pip returning reactivates lateral assistance; 12/18m hysteresis avoids mode chatter', () => {
  const level = meadow([robot(0, 0, 0), robot(1, 2, 0), robot(2, 0, 2), robot(3, 2, 2)]);
  simulate(level, 2);
  let herd = { x: Math.min(...level.animals.map(a => a.x)), z: center(level.animals).z };
  level.dog = { x: herd.x - 13, z: herd.z };
  stepSimulation(level, level.dog, {}, .1, { drone: 1 });
  assert.equal(level.helpers[0].mode, 'hold');
  level.dog = { x: herd.x - 10, z: herd.z };
  stepSimulation(level, level.dog, {}, .1, { drone: 1 });
  assert.equal(level.helpers[0].mode, 'assist');
  level.dog = { x: herd.x - 16, z: herd.z };
  stepSimulation(level, level.dog, {}, .1, { drone: 1 });
  assert.equal(level.helpers[0].mode, 'assist');
  level.dog = { x: herd.x - 20, z: herd.z };
  stepSimulation(level, level.dog, {}, .1, { drone: 1 });
  assert.equal(level.helpers[0].mode, 'hold');
});

test('Pip can retrieve an isolated straggler while the drone parks the main herd', () => {
  const level = meadow([robot(0, 0, 0), robot(1, 2, 0), robot(2, 0, 2), robot(3, 2, 2), robot(4, 28, 0)], { dog: { x: 32, z: 0 } });
  const anchor = center(level.animals.slice(0, 4));
  let parkedFrames = 0, rejoined = false;
  for (let frame = 0; frame < 150; frame++) {
    const straggler = level.animals[4], dx = anchor.x - straggler.x, dz = anchor.z - straggler.z, length = Math.hypot(dx, dz) || 1;
    const wanted = { x: straggler.x - dx / length * 3.3, z: straggler.z - dz / length * 3.3 };
    const ix = wanted.x - level.dog.x, iz = wanted.z - level.dog.z, divisor = Math.max(1, Math.hypot(ix, iz));
    stepSimulation(level, level.dog, { x: ix / divisor, z: iz / divisor }, .1, { drone: 1 });
    const drone = level.helpers[0];
    if (drone.clusterIds.includes(4)) { rejoined = true; break; }
    if (drone.mode === 'hold') {
      assert.ok(separation(center(level.animals.slice(0, 4)), anchor) < .4);
      parkedFrames++;
    } else {
      assert.ok(level.animals.slice(0, 4).some(a => separation(a, level.dog) < 18), 'support resumes only as Pip approaches the main herd');
    }
  }
  assert.ok(parkedFrames > 10, 'retrieval takes time while the main group waits');
  assert.equal(rejoined, true, 'ordinary dog movement returns the robot to the main group');
  assert.equal(level.helpers[0].mode, 'assist');
  assert.notEqual(level.completed, true);
});

test('companion assistance never consults the goal direction', () => {
  const first = meadow([robot(0, 0, -5), robot(1, 0, -2), robot(2, 0, 1), robot(3, 0, 4)], { dog: { x: -6, z: 0 } });
  const second = structuredClone(first); second.target = { ...second.target, x: -65, z: -65 };
  for (let i = 0; i < 100; i++) {
    stepSimulation(first, first.dog, {}, .1, { drone: 3, helper: 3 });
    stepSimulation(second, second.dog, {}, .1, { drone: 3, helper: 3 });
  }
  assert.deepEqual(first.animals, second.animals, 'changing the destination cannot change helper herding');
  assert.deepEqual(first.helpers, second.helpers);
});

test('companions cannot admit an unattended flock into a destination or complete a level', () => {
  const level = meadow([robot(0, 0, 0), robot(1, 2, 0)], { target: { x: 1, z: 0, radius: 5, heading: Math.PI / 2, type: 'field' } });
  simulate(level, 900, { drone: 3, helper: 3 });
  assert.ok(level.animals.every(a => !a.saved));
  assert.notEqual(level.completed, true);
  level.dog = { x: -5, z: 0 };
  stepSimulation(level, level.dog, {}, .1, { drone: 3, helper: 3 });
  assert.equal(level.completed, true, 'Pip participates in delivery');
});

test('a held sheep crossing the admission line cannot finish before Pip returns', () => {
  const level = createLevel(19), t = level.target;
  const forward = { x: Math.sin(t.heading), z: Math.cos(t.heading) };
  const side = { x: forward.z, z: -forward.x };
  level.dog = { x: t.x + side.x * 17, z: t.z + side.z * 17 };
  const startDistance = t.radius - .275 + .04;
  level.animals = [robot(0, t.x - forward.x * startDistance, t.z - forward.z * startDistance, forward.x * 4.2, forward.z * 4.2), robot(1, t.x - forward.x * startDistance + side.x * 2, t.z - forward.z * startDistance + side.z * 2)];
  assert.ok(canOccupy(level, level.dog.x, level.dog.z, .62));
  assert.ok(canOccupy(level, level.animals[0].x, level.animals[0].z, .55));
  const result = stepSimulation(level, level.dog, {}, .1, { drone: 1 });
  assert.equal(level.helpers[0].mode, 'hold');
  assert.ok(separation(level.animals[0], t) < t.radius - .275, 'momentum crossed the line');
  assert.equal(result.saved, 0);
  assert.equal(result.completed, false);
  assert.deepEqual(result.events, []);
  simulate(level, 60);
  assert.notEqual(level.completed, true);
  level.dog = { x: t.x - forward.x * (t.radius + 3), z: t.z - forward.z * (t.radius + 3) };
  stepSimulation(level, level.dog, {}, .1, { drone: 1 });
  assert.equal(level.helpers[0].mode, 'assist');
  simulate(level, 3);
  assert.equal(level.completed, true);
});

test('a player across a wall or river cannot reactivate or admit the held herd', () => {
  for (const barrier of [
    { fenceSegments: [{ a: { x: 4, z: -100 }, b: { x: 4, z: 100 }, kind: 'target' }] },
    { rivers: [{ points: [{ x: 4, z: -100 }, { x: 4, z: 100 }], width: 2, bridges: [] }] },
  ]) {
    const level = meadow([robot(0, 0, 0), robot(1, 1, 1)], {
      ...barrier, target: { x: 0, z: 0, radius: 5, type: 'pen', heading: Math.PI / 2 }, dog: { x: 7, z: 0 },
    });
    const result = stepSimulation(level, level.dog, {}, .1, { drone: 1 });
    assert.equal(level.helpers[0].mode, 'hold', 'nearby Pip cannot signal through solid ground');
    assert.equal(result.saved, 0);
    assert.equal(result.completed, false);
    level.dog = { x: -5, z: 0 };
    stepSimulation(level, level.dog, {}, .1, { drone: 1 });
    assert.equal(level.helpers[0].mode, 'assist');
    assert.equal(level.completed, true, 'delivery resumes on the same accessible ground');
  }
});

test('losing a clear signal overrides retained assist hysteresis at the goal wall', () => {
  const level = createLevel(19), t = level.target;
  const f = { x: Math.sin(t.heading), z: Math.cos(t.heading) }, side = { x: f.z, z: -f.x };
  const start = t.radius - .275 + .04;
  level.animals = [robot(0, t.x - f.x * start, t.z - f.z * start, f.x * 4.2, f.z * 4.2), robot(1, t.x - f.x * start + side.x * 2, t.z - f.z * start + side.z * 2)];
  level.dog = { x: t.x - f.x * (start + 3.3), z: t.z - f.z * (start + 3.3) };
  stepSimulation(level, level.dog, {}, 0, { drone: 1 });
  assert.equal(level.helpers[0].mode, 'assist');
  level.dog = { x: t.x + side.x * 16, z: t.z + side.z * 16 };
  assert.ok(canOccupy(level, level.dog.x, level.dog.z, .62));
  const result = stepSimulation(level, level.dog, {}, .1, { drone: 1 });
  assert.equal(level.helpers[0].mode, 'hold');
  assert.equal(level.animals[0].alert, 0);
  assert.equal(result.saved, 0);
  assert.equal(result.completed, false);
});

test('holding at a river bank or fence cannot pin or push the herd across solid terrain', () => {
  const river = { points: [{ x: 5, z: -100 }, { x: 5, z: 100 }], width: 2, bridges: [{ x: 5, z: 50, width: 7, length: 5, heading: Math.PI / 2 }] };
  for (const barrier of [
    { rivers: [river] },
    { fenceSegments: [{ a: { x: 4, z: -100 }, b: { x: 4, z: 100 }, kind: 'interior' }] },
    { obstacles: [{ x: 5, z: 0, radius: 1.6 }] },
  ]) {
    const level = meadow([robot(0, 1.6, -2, 2), robot(1, 2.7, 0, 2), robot(2, 1.6, 2, 2)], barrier);
    const anchor = center(level.animals);
    simulate(level, 90, { drone: 3, helper: 3 });
    assert.ok(separation(center(level.animals), anchor) < .45);
    assert.ok(level.animals.every(a => canOccupy(level, a.x, a.z, .55)), 'every animal remains on usable ground');
    assert.ok(level.animals.every(a => a.x < 3.45), 'no signal pushes into or across the barrier');
  }
});

test('a drone does not apply pressure through a river to an isolated opposite-bank animal', () => {
  const level = meadow([robot(0, 1, 0), robot(1, 1, 2), robot(2, 1, -2), robot(3, 7, 0)], {
    rivers: [{ points: [{ x: 4, z: -100 }, { x: 4, z: 100 }], width: 2, bridges: [] }],
  });
  const baseline = structuredClone(level);
  simulate(level, 30); simulate(baseline, 30, {});
  assert.deepEqual(level.helpers[0].clusterIds.slice().sort(), [0, 1, 2]);
  assert.ok(separation(level.animals[3], baseline.animals[3]) < 1e-8);
});

test('flock cohesion cannot attract animals through a fence, tree or river', () => {
  for (const barrier of [
    { fenceSegments: [{ a: { x: 0, z: -100 }, b: { x: 0, z: 100 }, kind: 'interior' }] },
    { obstacles: [{ x: 0, z: 0, radius: 1.2 }] },
    { rivers: [{ points: [{ x: 0, z: -100 }, { x: 0, z: 100 }], width: 2, bridges: [] }] },
  ]) {
    const level = meadow([robot(0, -4, 0), robot(1, 4, 0)], barrier);
    const alone = meadow([robot(0, -4, 0)], barrier);
    stepSimulation(level, level.dog, {}, .1);
    stepSimulation(alone, alone.dog, {}, .1);
    assert.deepEqual(level.animals[0], alone.animals[0], 'the hidden neighbor adds no cohesion or alignment');
  }
});


test('Pip working the tail of a large main herd counts as nearby; isolated stragglers do not', () => {
  const animals = Array.from({ length: 15 }, (_, i) => robot(i, i * 2, 0));
  const level = meadow(animals, { dog: { x: -5, z: 0 } });
  stepSimulation(level, level.dog, {}, .1, { drone: 1 });
  assert.equal(level.helpers[0].mode, 'assist', 'near the tail even though 19m from centroid');
  level.animals.push(robot(99, -55, 0)); level.dog = { x: -60, z: 0 };
  stepSimulation(level, level.dog, {}, .1, { drone: 1 });
  assert.equal(level.helpers[0].mode, 'hold', 'a nearby isolated robot is not the attended main herd');
  assert.ok(!level.helpers[0].clusterIds.includes(99));
});

test('the ground buddy stays with an unattended herd rather than following faraway Pip', () => {
  const level = meadow([robot(0, 0, 0), robot(1, 2, 0), robot(2, 0, 2)], {
    helpers: [{ type: 'helper', x: -5, z: 0 }],
  });
  simulate(level, 10, { helper: 1 });
  const buddy = level.helpers.find(h => h.type === 'helper');
  assert.equal(buddy.mode, 'hold');
  assert.ok(separation(buddy, center(level.animals)) < 5, 'buddy watches the herd on valid ground');
  assert.ok(canOccupy(level, buddy.x, buddy.z, .6));
  assert.ok(separation(buddy, level.dog) > 60, 'buddy did not abandon its flock to chase Pip');
});
