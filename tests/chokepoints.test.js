import test from 'node:test';
import assert from 'node:assert/strict';
import { stepSimulation, canOccupy } from '../src/simulation.js';
import { createLevel, routeProgress, distance } from '../src/world.js';
import { animalRadius, COW_SCALES } from '../src/animal-size.js';
import { yieldAtOpening, chokeApproach, YIELD_LIMIT, ESCAPE_TIME } from '../src/chokepoints.js';

// A 6m deck like the later campaign's, across a river on x=0. Travel is +x.
function crowdLevel(count = 14) {
  const bridge = { x: 0, z: 0, width: 6, length: 6.5, heading: Math.PI / 2 };
  const animals = Array.from({ length: count }, (_, id) => {
    const cow = id % 3 === 2, row = Math.floor(id / 5), col = id % 5;
    return { id, type: cow ? 'cow' : 'sheep', ...(cow ? { scale: COW_SCALES[id % COW_SCALES.length] } : {}),
      x: -6.5 - row * 2.2, z: (col - 2) * 2.3, vx: 0, vz: 0, saved: false, nextWanderCheck: 1e9 };
  });
  return { index: 27, time: 0, seed: 42, reward: 300, animals, bounds: { minX: -100, maxX: 100, minZ: -100, maxZ: 100 },
    dog: { x: -20, z: 0 }, target: { x: 80, z: 80, radius: 5, type: 'field', heading: Math.PI / 2 },
    rivers: [{ points: [{ x: 0, z: -100 }, { x: 0, z: 100 }], width: 5, bridges: [bridge] }],
    fenceSegments: [], gates: [], obstacles: [], routes: [] };
}

// Pip walks behind the rearmost animal still on the near bank, as a player would.
function pushAcross(level, seconds, onStep = () => {}) {
  for (let i = 0; i < seconds * 20; i++) {
    const near = level.animals.filter(a => a.x < 4);
    if (!near.length) break;
    const rear = near.reduce((a, b) => (a.x < b.x ? a : b));
    const aim = { x: rear.x - 3.3, z: rear.z * .6 };
    const dx = aim.x - level.dog.x, dz = aim.z - level.dog.z, d = Math.max(1, Math.hypot(dx, dz));
    stepSimulation(level, level.dog, { x: dx / d, z: dz / d }, .05);
    onStep(level);
  }
}

test('a pressed mixed crowd crosses a narrow deck without surging back and forth', () => {
  const level = crowdLevel(), last = new Map();
  let flips = 0, lanes = new Set();
  pushAcross(level, 90, () => {
    for (const a of level.animals) {
      assert.ok(canOccupy(level, a.x, a.z, animalRadius(a)), 'no body inside rails, water or another obstacle');
      if (a.x > -3.25 - 8 && a.x < -3.25 && Math.abs(a.vx) > .35) {
        const sign = Math.sign(a.vx);
        if (last.has(a.id) && last.get(a.id) !== sign) flips++;
        last.set(a.id, sign);
      }
      if (a.bridgeCrossing) lanes.add(Math.round(a.bridgeCrossing.lane));
    }
  });
  assert.ok(level.animals.every(a => a.x > 4), `all reach the far bank; stuck: ${JSON.stringify(level.animals.filter(a => a.x <= 4).map(a => [a.id, a.x.toFixed(1)]))}`);
  assert.ok(flips / level.animals.length < 1, `approach reversals per animal ${(flips / level.animals.length).toFixed(2)}`);
  assert.ok(lanes.size >= 2, 'the crowd uses more than one lane across the deck');
});

test('the player can still turn a flock back before it reaches the deck', () => {
  const level = crowdLevel(5);
  for (const a of level.animals) { a.x -= 3; a.vx = 1.2; } // Front row 3.25m outside the commit zone.
  level.dog = { x: -5.5, z: 0 }; // Pip steps between the flock and the bridge.
  for (let i = 0; i < 60; i++) stepSimulation(level, level.dog, {}, .05);
  assert.ok(level.animals.every(a => !a.bridgeCrossing), 'nobody outside the commit zone is committed');
  assert.ok(level.animals.every(a => a.vx < 0), 'the flock turns away from the bridge');
});

test('yielding behind a blocked animal is bounded and then escapes', () => {
  const level = crowdLevel(2), [a, b] = level.animals;
  Object.assign(a, { x: -5, z: 0, vx: 0, vz: 0 }); Object.assign(b, { x: -3.9, z: 0, vx: 0, vz: 0 });
  const intent = { x: 3, z: 0 }, wanted = { x: 3, z: 0 }, none = { x: 0, z: 0 };
  const forwardAt = time => { level.time = time; return yieldAtOpening(level, a, { ...a }, [{ ...a }, { ...b }], wanted, intent, none).x; };
  assert.ok(forwardAt(0) < 1, 'waits behind the stationary animal ahead');
  assert.ok(forwardAt(YIELD_LIMIT * .5) < 1);
  assert.equal(forwardAt(YIELD_LIMIT + .1), 3, 'gives up waiting after the limit');
  assert.equal(forwardAt(YIELD_LIMIT + ESCAPE_TIME * .5), 3, 'keeps pushing during the escape window');
  assert.ok(forwardAt(YIELD_LIMIT + ESCAPE_TIME + .2) < 1, 'resumes yielding afterwards');
});

test('crowd separation cannot push a forward-driven animal back out of the approach', () => {
  const level = crowdLevel(1), a = level.animals[0];
  Object.assign(a, { x: -5, z: 0 });
  assert.ok(chokeApproach(level, a));
  const shaped = yieldAtOpening(level, a, { ...a }, [{ ...a }], { x: -2, z: .4 }, { x: 2, z: 0 }, { x: -3, z: .4 });
  assert.ok(shaped.x >= 0, 'no backward motion against forward intent');
  const reverse = yieldAtOpening(level, a, { ...a }, [{ ...a }], { x: -2, z: 0 }, { x: -2, z: 0 }, { x: 0, z: 0 });
  assert.deepEqual(reverse, { x: -2, z: 0 }, 'deliberate backward pressure is untouched');
});

test('pausing freezes a queue at the bridge mouth', () => {
  const level = crowdLevel(8);
  pushAcross(level, 2);
  const paused = structuredClone(level);
  stepSimulation(level, level.dog, { x: 1, z: 0 }, 0);
  assert.deepEqual(level, paused);
});

test('large-herd levels leave room between the last bridge and the gate', () => {
  for (const index of [15, 20, 45, 99]) for (const seed of [undefined, 1001, 1002]) {
    const level = createLevel(index, seed), route = level.routes[0], gate = level.gates[0];
    const bridges = level.rivers.flatMap(r => r.bridges);
    const at = p => routeProgress(level, p, route.id).progress;
    const last = bridges.map(b => ({ b, u: at(b) })).filter(x => x.u < at(gate)).sort((x, y) => y.u - x.u)[0];
    const gap = at(gate) - last.u - last.b.length / 2;
    assert.ok(gap >= 26, `level ${index + 1} seed ${seed}: ${gap.toFixed(1)}m from bridge exit to gate`);
  }
  assert.ok(distance(createLevel(2).spawn, createLevel(2).rivers[0].bridges[0]) < 30, 'early lessons keep their compact layout');
});
