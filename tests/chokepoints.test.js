import test from 'node:test';
import assert from 'node:assert/strict';
import { stepSimulation, canOccupy } from '../src/simulation.js';
import { createLevel, routeProgress, distance, targetFootprint } from '../src/world.js';
import { animalRadius, COW_SCALES } from '../src/animal-size.js';
import { yieldAtOpening, chokeApproach, YIELD_LIMIT, ESCAPE_TIME, QUEUE_WIDTH } from '../src/chokepoints.js';
import { bridgeCrossing } from '../src/bridge-crossing.js';

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
  for (const a of level.animals) { a.x -= 3; a.vx = 1.2; } // Front row 9.5m from the deck end, outside its 3m commit zone.
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

test('a pushed animal lined up with the deck commits just before it, but not back over a deck it crossed', () => {
  const level = crowdLevel(1), a = level.animals[0];
  Object.assign(a, { x: -4.5, z: .5, vx: 1, vz: 0, alert: .5, pushed: true });
  assert.ok(bridgeCrossing(level, a, { ...a }), 'commits 1.25m before the deck end');
  delete a.bridgeCrossing;
  assert.equal(bridgeCrossing(level, a, { ...a, pushed: false }), null, 'drifting without Pip or Buddy pressure does not commit early');
  assert.equal(bridgeCrossing(level, a, { ...a, z: 3.4 }), null, 'an animal beside the deck end does not commit');
  // Having crossed toward -x, being pushed back toward the deck needs a deliberate walk onto it.
  Object.assign(a, { lastBridge: { bridge: level.rivers[0].bridges[0], sign: -1 } });
  assert.equal(bridgeCrossing(level, a, { ...a }), null, 'no early commitment back over a deck it already crossed');
  Object.assign(a, { x: -2 });
  assert.ok(bridgeCrossing(level, a, { ...a }), 'walking onto the deck itself still commits');
});

test('Pip can still turn back animals inside the commit zone before they commit', () => {
  const level = crowdLevel(3);
  level.animals.forEach((a, i) => Object.assign(a, { x: -5, z: (i - 1) * 1.6, vx: 0, vz: 0 }));
  level.dog = { x: -2, z: 0 }; // Pip on the bank between the animals and the deck end.
  for (let i = 0; i < 40; i++) stepSimulation(level, level.dog, {}, .05);
  assert.ok(level.animals.every(a => !a.bridgeCrossing && a.x < -5), 'they move away from the bridge');
});

test('a pressed crowd queues through an open gate and the destination entrance', () => {
  const heading = Math.PI / 2, gate = { id: 'gate-0', x: 0, z: 0, width: 6, heading, operable: false, open: true };
  const level = crowdLevel(10);
  level.rivers = [];
  level.gates = [gate];
  level.fenceSegments = [{ a: { x: 0, z: -40 }, b: { x: 0, z: -3 }, kind: 'interior' }, { a: { x: 0, z: 3 }, b: { x: 0, z: 40 }, kind: 'interior' }];
  pushAcross(level, 60);
  assert.ok(level.animals.every(a => a.x > 4), 'all pass the gate');
  // The entrance is approached from outside only: animals inside a pen are never steered back toward it.
  const pen = createLevel(2), inside = { ...pen.animals[0], x: pen.target.x, z: pen.target.z };
  assert.equal(chokeApproach(pen, inside), null);
});

test('at the destination entrance an animal outside queues and steers into the opening', () => {
  const level = createLevel(2), t = level.target, shape = targetFootprint(t), f = { x: Math.sin(t.heading), z: Math.cos(t.heading) };
  const at = (out, side) => ({ x: shape.entrance.x - f.x * out + f.z * side, z: shape.entrance.z - f.z * out - f.x * side });
  const [a, b] = level.animals;
  Object.assign(a, at(1.6, 0), { vx: 0, vz: 0 }); Object.assign(b, at(.45, 0), { vx: 0, vz: 0 });
  level.time = 0;
  const inward = { x: f.x * 3, z: f.z * 3 }, none = { x: 0, z: 0 };
  const queued = yieldAtOpening(level, a, { ...a }, [{ ...a }, { ...b }], inward, inward, none);
  assert.ok(queued.x * f.x + queued.z * f.z < 1, 'waits behind the animal standing in the entrance');
  // Off to one side of the 7m opening, it is steered across into a lane.
  Object.assign(a, at(1.2, 5.5));
  const steered = yieldAtOpening(level, a, { ...a }, [{ ...a }], inward, inward, none);
  const lateral = steered.x * f.z - steered.z * f.x;
  assert.ok(lateral < -.5, `moves toward the opening (lateral ${lateral.toFixed(2)})`);
});

test('no queuing help back toward a deck the animal already crossed, and none at wide openings', () => {
  const level = crowdLevel(1), a = level.animals[0], bridge = level.rivers[0].bridges[0];
  Object.assign(a, { x: -5, z: 0, vx: 0, vz: 0 });
  const forward = { x: 3, z: .4 }, none = { x: 0, z: 0 };
  const shaped = yieldAtOpening(level, a, { ...a }, [{ ...a }], { x: -2, z: .4 }, forward, { x: -3, z: 0 });
  assert.notDeepEqual(shaped, { x: -2, z: .4 }, 'a fresh forward approach is shaped');
  a.lastBridge = { bridge, sign: -1 }; // It crossed toward -x and is now pushed back toward +x.
  assert.deepEqual(yieldAtOpening(level, a, { ...a }, [{ ...a }], { x: -2, z: .4 }, forward, { x: -3, z: 0 }), { x: -2, z: .4 });
  a.lastBridge = { bridge, sign: 1 }; // Same direction as its last crossing: shaped again.
  assert.notDeepEqual(yieldAtOpening(level, a, { ...a }, [{ ...a }], { x: -2, z: .4 }, forward, { x: -3, z: 0 }), { x: -2, z: .4 });
  const wide = crowdLevel(1); wide.rivers[0].bridges[0].width = QUEUE_WIDTH + 1; Object.assign(wide.animals[0], { x: -5, z: 0 });
  assert.equal(chokeApproach(wide, wide.animals[0]), null, 'openings wider than the queue width are left to normal flocking');
});

test('opposing groups at a deck do not deadlock', () => {
  const level = crowdLevel(4);
  // Two animals wait on the far bank right at the deck end, facing the crowd.
  for (const [i, z] of [[0, -.8], [1, .8]]) Object.assign(level.animals[i], { x: 4.2, z, vx: -.4 });
  pushAcross(level, 60);
  assert.ok(level.animals.every(a => a.x > 4), 'the pushed group gets across with the waiting animals in the way');
});

test('delivered animals and fresh levels carry no crossing state', () => {
  const level = crowdLevel(6);
  pushAcross(level, 3);
  assert.ok(level.animals.some(a => a.chokeYield || a.bridgeCrossing || a.pushed), 'state exists mid-crossing');
  assert.ok(createLevel(20).animals.every(a => !a.chokeYield && !a.lastBridge && !a.bridgeCrossing && !a.pushed));
  // Admission, not a pre-set saved flag, must clear live traversal history.
  const arrival = createLevel(2), animal = arrival.animals[0], target = arrival.target;
  const bridge = { x: target.x, z: target.z, width: 6, length: 6, heading: target.heading };
  Object.assign(animal, { x: target.x, z: target.z, vx: 0, vz: 0,
    bridgeCrossing: { bridge, sign: 1, lane: 0 },
    chokeYield: { since: 0 }, lastBridge: { bridge, sign: -1 }, pushed: true });
  Object.assign(arrival.dog, { x: target.x, z: target.z });
  assert.ok(animal.bridgeCrossing && animal.chokeYield && animal.lastBridge && animal.pushed);
  const result = stepSimulation(arrival, arrival.dog, {}, .05);
  assert.equal(animal.saved, true, 'the real attended admission path saves the animal');
  assert.ok(result.events.some(event => event.type === 'animalSaved' && event.id === animal.id));
  for (const key of ['bridgeCrossing', 'chokeYield', 'lastBridge', 'pushed']) {
    assert.equal(Object.hasOwn(animal, key), false, `admission removes ${key}`);
  }
});

test('large-herd levels leave room between the last bridge and the gate', () => {
  for (const index of [5, 9, 12, 14, 15, 17, 20, 30, 45, 70, 99]) for (const seed of [undefined, 1001, 1002]) {
    const level = createLevel(index, seed), route = level.routes[0], gate = level.gates[0];
    const bridges = level.rivers.flatMap(r => r.bridges).filter(b => route.points.some(p => distance(p, b) < 1));
    const at = p => routeProgress(level, p, route.id).progress;
    const last = bridges.map(b => ({ b, u: at(b) })).filter(x => x.u < at(gate)).sort((x, y) => y.u - x.u)[0];
    const gap = at(gate) - last.u - last.b.length / 2;
    assert.ok(gap >= 26, `level ${index + 1} seed ${seed}: ${gap.toFixed(1)}m from bridge exit to gate`);
  }
  assert.ok(distance(createLevel(2).spawn, createLevel(2).rivers[0].bridges[0]) < 30, 'early lessons keep their compact layout');
});
