import test from 'node:test';
import assert from 'node:assert/strict';
import * as THREE from 'three';
import { MeadowNature } from '../src/rendering/environment/nature.js';
import { birdLandingPositionSafe, stepWildlife } from '../src/rendering/environment/wildlife.js';
import { createBirdPerches } from '../src/rendering/environment/bird-perches.js';
import { wildlifeParts } from '../src/rendering/environment/wildlife-models.js';

const meadow = () => ({
  index: 0,
  seed: 42,
  bounds: { minX: -40, maxX: 40, minZ: -40, maxZ: 40 },
  dog: { x: -35, z: -35 },
  animals: [],
  roads: [],
  rivers: [],
  obstacles: [],
  fenceSegments: [],
});
const bird = () => ({ kind: 'bird', slot: 0, x: 0, z: 0, homeX: 0, homeZ: 0, phase: 0.3, heading: 0, visible: true });
const dt = 1 / 60;
const matrix = (batch, slot) => {
  const m = new THREE.Matrix4();
  batch.getMatrixAt(slot, m);
  return m;
};

test('seeded birds forage, hop, peck, gain height, fly and decelerate to dry ground', () => {
  const run = () => {
    const level = meadow(),
      a = bird(),
      states = new Set();
    let hop = false,
      peck = false,
      height = 0,
      landingSpeed = Infinity,
      landingFrames = 0;
    for (let i = 0; i < 3600; i++) {
      const old = { ...a };
      stepWildlife(level, a, dt, [], i * dt, { severity: 0 });
      states.add(a.birdState);
      hop ||= a.hopHeight > 0;
      peck ||= a.peck > 0;
      height = Math.max(height, a.altitude);
      assert.ok(Number.isFinite(a.x + a.z + a.altitude + a.heading));
      assert.ok(Math.abs((old.altitude || 0) - a.altitude) < 0.13, 'vertical transitions do not teleport');
      if (a.birdState === 'forage') assert.equal(birdLandingPositionSafe(level, a), true);
      if (old.birdState === 'landing' && a.birdState === 'landing') {
        const speed = Math.hypot(a.x - old.x, a.z - old.z) / dt;
        assert.ok(speed <= landingSpeed + 0.00001, 'landing slows toward its surface');
        landingSpeed = speed;
        landingFrames++;
      } else landingSpeed = Infinity;
    }
    assert.deepEqual([...states].sort(), ['flight', 'forage', 'landing', 'takeoff']);
    assert.ok(hop && peck && height > 2.6 && landingFrames > 30);
    return a;
  };
  assert.deepEqual(run(), run(), 'restarting preserves the independent bird schedule');
});

test('water and bridge water cannot become landing sites; failed searches stay bounded in flight', () => {
  const level = meadow();
  level.rivers = [
    {
      points: [
        { x: -200, z: 0 },
        { x: 200, z: 0 },
      ],
      width: 200,
      bridges: [{ x: 0, z: 0, width: 4, length: 220, heading: 0 }],
    },
  ];
  assert.equal(
    birdLandingPositionSafe(level, { x: 0, z: 0 }, [], () => true),
    false,
  );
  const a = { ...bird(), birdState: 'flight', altitude: 3, cruiseAltitude: 3, flightRemaining: 0, clearTime: 3 };
  let searches = 0;
  for (let i = 0; i < 1200; i++)
    stepWildlife(level, a, dt, [], i * dt, { severity: 0 }, () => {
      searches++;
      return true;
    });
  assert.equal(a.birdState, 'flight');
  assert.ok(a.altitude > 2.9);
  assert.ok(searches > 0 && searches <= 24 * 14, 'at most 24 sites per retry, with a quiet interval after failure');
});

test('a threat interrupts pecking or landing and does not repeatedly restart airborne takeoff', () => {
  const level = meadow(),
    a = bird();
  stepWildlife(level, a, dt, [], 0, { severity: 0 });
  Object.assign(a, { peck: 1, peckElapsed: 0.2 });
  stepWildlife(level, a, dt, [{ x: 0, z: -1 }], dt, { severity: 0 });
  assert.equal(a.birdState, 'takeoff');
  assert.equal(a.peck, 0);
  for (let i = 0; i < 60; i++) stepWildlife(level, a, dt, [{ x: a.x, z: a.z - 1 }], i * dt, { severity: 0 });
  assert.equal(a.birdState, 'flight');
  assert.ok(a.altitude > 2.6);
  for (let i = 0; i < 2000 && a.birdState !== 'landing'; i++) stepWildlife(level, a, dt, [], i * dt, { severity: 0 });
  assert.equal(a.birdState, 'landing');
  for (let i = 0; i < 20; i++) stepWildlife(level, a, dt, [], i * dt, { severity: 0 });
  const altitude = a.altitude;
  stepWildlife(level, a, dt, [{ x: a.x, z: a.z - 1 }], 0, { severity: 0 });
  assert.equal(a.birdState, 'takeoff');
  assert.equal(a.altitude, altitude);
  assert.equal(a.landingX, undefined);
});

test('wings flap about attached shoulder hinges, fold at rest, and pecking keeps feet supported', () => {
  const nature = new MeadowNature(new THREE.Scene());
  nature.setLevel(meadow());
  const a = nature.wildlife.find((a) => a.kind === 'bird'),
    parts = wildlifeParts.bird;
  Object.assign(a, {
    x: 0,
    z: 0,
    heading: 1.2,
    birdState: 'forage',
    altitude: 0,
    hopHeight: 0,
    peck: 0,
    shelter: 0,
    phase: 0,
  });
  nature.poseBird(a, 0);
  const folded = matrix(nature.batches.birdWing, a.slot * 2 + 1),
    beakIndex = parts.findIndex((p) => p.part === 'beak');
  const beakBefore = new THREE.Vector3().setFromMatrixPosition(
    matrix(nature.batches.birdBody, a.slot * parts.length + beakIndex),
  );
  const feet = parts
    .flatMap((p, i) => (p.part === 'foot' ? [i] : []))
    .map((i) => matrix(nature.batches.birdBody, a.slot * parts.length + i).elements.slice());
  nature.poseBird(a, 20);
  assert.deepEqual(
    matrix(nature.batches.birdWing, a.slot * 2 + 1).elements,
    folded.elements,
    'resting wings do not beat',
  );
  a.peck = 1;
  nature.poseBird(a, 20);
  const beakAfter = new THREE.Vector3().setFromMatrixPosition(
    matrix(nature.batches.birdBody, a.slot * parts.length + beakIndex),
  );
  assert.ok(beakBefore.y - beakAfter.y > 0.25, 'the beak lowers to forage');
  for (const [j, i] of parts.flatMap((p, i) => (p.part === 'foot' ? [i] : [])).entries())
    assert.deepEqual(matrix(nature.batches.birdBody, a.slot * parts.length + i).elements, feet[j]);
  Object.assign(a, { birdState: 'flight', altitude: 3, peck: 0 });
  const tips = [];
  for (const time of [Math.PI / 26, (3 * Math.PI) / 26]) {
    nature.poseBird(a, time);
    const pair = [];
    for (let j = 0; j < 2; j++) {
      const m = matrix(nature.batches.birdWing, a.slot * 2 + j),
        root = new THREE.Vector3().setFromMatrixPosition(m);
      assert.ok(m.determinant() > 0, 'wing instances use supported positive scales');
      const shoulder = new THREE.Vector3((j ? 1 : -1) * 0.105, 0.28, 0).applyMatrix4(nature.birdRoot);
      assert.ok(root.distanceTo(shoulder) < 1e-6, 'wing root stays at its body-local shoulder');
      pair.push(new THREE.Vector3(0.4, 0, 0).applyMatrix4(m).y - root.y);
    }
    assert.ok(Math.abs(pair[0] - pair[1]) < 1e-6, 'both wings rise and fall together');
    tips.push(pair[0]);
  }
  assert.ok(tips[0] > 0.25 && tips[1] < -0.15, 'bounded strokes lift and lower the tips');
  assert.equal(Object.keys(nature.batches).length, 8, 'bird detail reuses the existing draw budget');
  nature.dispose();
});

test('bird states and matrices freeze on pause, all hidden anatomy clears, and replacement resets birds', () => {
  const nature = new MeadowNature(new THREE.Scene()),
    level = meadow();
  nature.setLevel(level);
  const a = nature.wildlife.find((a) => a.kind === 'bird');
  for (const state of ['forage', 'takeoff', 'flight', 'landing']) {
    Object.assign(a, {
      birdState: state,
      birdStateTime: 0.2,
      landingDuration: 2,
      altitude: state === 'forage' ? 0 : 2,
    });
    nature.update(0, {});
    const before = JSON.stringify(nature.wildlife),
      matrices = Object.values(nature.batches).map((b) => b.instanceMatrix.array.slice());
    nature.update(0.1, { paused: true });
    assert.equal(JSON.stringify(nature.wildlife), before);
    Object.values(nature.batches).forEach((b, i) => assert.deepEqual(b.instanceMatrix.array, matrices[i]));
  }
  a.visible = false;
  nature.update(0, {});
  for (let i = 0; i < wildlifeParts.bird.length; i++)
    assert.equal(
      new THREE.Vector3()
        .setFromMatrixScale(matrix(nature.batches.birdBody, a.slot * wildlifeParts.bird.length + i))
        .lengthSq(),
      0,
    );
  for (let i = 0; i < 2; i++)
    assert.equal(new THREE.Vector3().setFromMatrixScale(matrix(nature.batches.birdWing, a.slot * 2 + i)).lengthSq(), 0);
  nature.setLevel(level);
  assert.ok(
    nature.wildlife
      .filter((a) => a.kind === 'bird')
      .every((a) => a.birdState === undefined && a.landingX === undefined),
  );
  nature.dispose();
});

test('perch reservations, calls, quiet gestures, pause, and support loss share one state', () => {
  const level = meadow();
  const gate = { open: false };
  level.gates = [gate];
  const anchor = {
    id: 'test-perch',
    kind: 'tree',
    x: 0,
    y: 2.6,
    z: 5,
    heading: 0,
    approach: { x: 0, y: 3.5, z: 3.4 },
    normal: { x: 0, y: 1, z: 0 },
    gate,
  };
  const perches = createBirdPerches(level);
  perches.anchors.push(anchor);
  const nature = new MeadowNature(new THREE.Scene());
  nature.setLevel(level, perches);
  const [first, second] = nature.birdFrame.birds;
  for (const a of [first, second]) {
    Object.assign(a, bird(), {
      slot: a.slot,
      x: (a === first ? -1 : 1) * 0.55,
      birdSeed: 2,
      birdState: 'flight',
      altitude: 3,
      cruiseAltitude: 3,
      flightRemaining: 0,
      clearTime: 3,
    });
  }
  for (const a of nature.birdFrame.birds.slice(2)) a.visible = false;
  nature.birdFrame.birds.length = 2;
  let calls = 0;
  let firstCallFrame = -1;
  let perched = false;
  const gestures = new Set();
  for (let frame = 0; frame < 780; frame++) {
    nature.update(dt);
    assert.ok(
      [first, second].filter((a) => a.perch?.id === anchor.id || a.landing?.anchor?.id === anchor.id).length <= 1,
      'simultaneous approaches reserve distinct elevated anchors',
    );
    if (first.perch) {
      perched = true;
      assert.equal(first.altitude, 2.6);
      if (first.perchedGesture) gestures.add(first.perchedGesture);
    }
    if (!nature.birdCalls.length) continue;
    calls += nature.birdCalls.length;
    firstCallFrame = frame;
    assert.deepEqual(nature.birdCalls, [{ x: 0, y: 2.6, z: 5 }]);
    const before = { ...first };
    nature.update(0.1, { paused: true });
    assert.deepEqual(nature.birdCalls, []);
    assert.deepEqual(first, before);
  }
  assert.ok(perched && calls >= 1 && firstCallFrame > 150);
  assert.ok(gestures.size >= 1);
  assert.equal(first.perch, anchor);
  first.perchedGesture = 'ruffle';
  first.gestureAmount = 1;
  gate.open = true;
  nature.update(dt);
  assert.equal(first.birdState, 'takeoff');
  assert.equal(first.perch, null);
  assert.equal(first.perchedGesture, null);
  assert.ok(first.altitude >= 2.6);
  nature.dispose();
});

test('off-camera and scenery-occluded perched chirps are not emitted or queued', () => {
  const nature = new MeadowNature(new THREE.Scene());
  nature.setLevel(meadow());
  const [a] = nature.birdFrame.birds;
  const anchor = { id: 'tree', kind: 'tree', x: 0, y: 2.6, z: 5, heading: 0 };
  Object.assign(a, {
    birdState: 'perched',
    x: anchor.x,
    z: anchor.z,
    altitude: anchor.y,
    perch: anchor,
    callWait: 0,
    gestureWait: 3,
    perchRemaining: 12,
  });
  const camera = new THREE.OrthographicCamera(-3, 3, 3, -3, 0.1, 40);
  camera.position.set(20, 2.6, 18);
  camera.lookAt(20, 2.6, 0);
  nature.update(dt, { camera });
  assert.equal(a.birdState, 'perchedChirp');
  assert.deepEqual(nature.birdCalls, []);
  camera.position.x = 0;
  camera.lookAt(0, 2.6, 0);
  nature.update(dt, { camera });
  assert.deepEqual(nature.birdCalls, []);

  const wall = new THREE.Mesh(new THREE.BoxGeometry(8, 6, 0.5));
  wall.position.set(0, 3, 10);
  nature.birdFrame.perches = createBirdPerches(nature.level, { blockers: [wall] });
  a.callWait = 0;
  nature.update(dt, { camera });
  assert.deepEqual(nature.birdCalls, [], 'the wall hides a bird that is inside the camera frame');
  nature.birdFrame.perches = createBirdPerches(nature.level);
  a.callWait = 0;
  nature.update(dt, { camera });
  assert.deepEqual(nature.birdCalls, [{ x: 0, y: 2.6, z: 5 }]);
  wall.geometry.dispose();
  wall.material.dispose();
  nature.dispose();
});

test('seeded birds start in foraging groups and an alarm ripples only to close partners', () => {
  const nature = new MeadowNature(new THREE.Scene());
  const level = { ...meadow(), bounds: { minX: -55, maxX: 55, minZ: -55, maxZ: 55 }, dog: { x: -50, z: -50 } };
  nature.setLevel(level);
  const flock = nature.birdFrame.birds;
  assert.equal(flock.length, 6);
  for (const group of [0, 1]) {
    const members = flock.filter((a) => a.group === group);
    assert.equal(members.length, 3);
    assert.ok(members.every((a) => Math.hypot(a.x - members[0].x, a.z - members[0].z) < 4));
  }
  for (const [i, a] of flock.entries()) {
    Object.assign(a, { x: i < 3 ? i * 1.8 : 24 + i * 1.8, z: 0, heading: Math.PI / 2 });
  }
  const departures = new Map();
  for (let frame = 0; frame < 45; frame++) {
    nature.update(dt, { dog: { x: -9.4, z: 0 } });
    for (const a of flock) if (a.birdState === 'takeoff' && !departures.has(a.slot)) departures.set(a.slot, frame);
  }
  assert.equal(departures.get(0), 0);
  assert.ok(departures.get(1) > 0 && departures.get(2) > 0 && departures.get(1) !== departures.get(2));
  assert.ok(flock.slice(3).every((a) => a.birdState === 'forage'));
  nature.dispose();
});

test('nearby livestock only startle foraging birds while moving quickly toward them', () => {
  for (const type of ['sheep', 'cow']) {
    for (const [vx, vz, isThreat] of [
      [0, 0, false],
      [0, 1, false],
      [0, -4, false],
      [4, 0, false],
      [0, 4, true],
    ]) {
      const a = bird();
      const livestock = { type, x: 0, z: -4, vx, vz };
      stepWildlife(meadow(), a, dt, [livestock], 0, { severity: 0 });
      assert.equal(a.birdState, isThreat ? 'takeoff' : 'forage');
    }
  }
});

test('an early elevated approach breaks away from a threat instead of flying toward the perch', () => {
  const nature = new MeadowNature(new THREE.Scene());
  const level = meadow();
  const perches = createBirdPerches(level);
  const anchor = { id: 'test-tree', kind: 'tree', x: 3, y: 3, z: 0, approach: { x: 1.5, y: 3.8, z: 0 }, heading: 0 };
  perches.anchors.push(anchor);
  nature.setLevel(level, perches);
  const [a] = nature.birdFrame.birds;
  Object.assign(a, {
    x: -8,
    z: 0,
    heading: Math.PI / 2,
    birdSeed: 2,
    birdState: 'flight',
    altitude: 3,
    cruiseAltitude: 3,
    flightRemaining: 0,
    clearTime: 3,
  });
  nature.update(dt);
  assert.equal(a.landing?.anchor, anchor);
  nature.update(dt);
  const x = a.x;
  nature.update(dt, { dog: { x: 0, z: 0 } });
  assert.equal(a.birdState, 'takeoff');
  assert.equal(a.takeoffExit, null);
  assert.ok(a.x <= x, 'the bird climbs and turns instead of continuing toward the threat');
  nature.dispose();
});

test('a puddle that grows into a dry destination cancels the approach before contact', () => {
  const nature = new MeadowNature(new THREE.Scene());
  const level = meadow();
  let wet = null;
  nature.setLevel(level, null, (x, z) => wet && Math.hypot(x - wet.x, z - wet.z) < 0.75);
  const [a] = nature.birdFrame.birds;
  Object.assign(a, {
    x: 0,
    z: 0,
    birdState: 'flight',
    altitude: 3,
    cruiseAltitude: 3,
    flightRemaining: 0,
    clearTime: 3,
  });
  nature.update(dt);
  assert.equal(a.birdState, 'landing');
  wet = a.landing.end;
  nature.update(dt);
  assert.equal(a.birdState, 'takeoff');
  assert.ok(a.altitude > 2.5);
  nature.dispose();
});
