import test from 'node:test';
import assert from 'node:assert/strict';
import { createLevel, stepSimulation, deliveryCountdownSeconds, deliveryScore, defaultProfile, validateProfile, applyLevelReward, saveProfile, loadProfile, canOccupy } from '../src/simulation.js';
import { targetFootprint, targetWorldPoint, containsTarget } from '../src/world.js';

function arrive(level, count = 1) {
  Object.assign(level.dog, { x: level.target.x, z: level.target.z });
  for (const animal of level.animals.filter(a => !a.saved).slice(0, count)) {
    Object.assign(animal, { x: level.target.x, z: level.target.z, vx: 0, vz: 0 });
  }
  return stepSimulation(level, level.dog, {}, 0.1);
}
function timeout(level) {
  level.delivery.remaining = 0.05;
  return stepSimulation(level, level.dog, {}, 0.1);
}
function finishedRun(saved, index = 0) {
  const level = createLevel(index);
  level.completed = true;
  level.animals.slice(0, saved).forEach(animal => animal.saved = true);
  return level;
}

test('recovery countdown uses flock size, route choices and distance, bounded at 30–60 seconds', () => {
  const level = createLevel(0);
  assert.equal(deliveryCountdownSeconds(level), 30);
  assert.equal(deliveryCountdownSeconds({ ...level, animals: Array(10), routes: [[], []], spawn: {x:0,z:0}, target: {x:80,z:0} }), 39);
  assert.equal(deliveryCountdownSeconds({ ...level, animals: Array(1000), routes: Array(20) }), 60);
  for (let index = 0; index < 100; index++) {
    const campaignLevel = createLevel(index), duration = deliveryCountdownSeconds(campaignLevel);
    assert.ok(Number.isInteger(duration) && duration >= 30 && duration <= 60);
    assert.equal(campaignLevel.reward, 80 + index * 25, 'migration caps match campaign rewards');
  }
});

test('there is no travel deadline; only the first attended arrival starts recovery time', () => {
  const level = createLevel(0);
  for (let i = 0; i < 400; i++) stepSimulation(level, level.dog, {}, 0.1);
  assert.equal(level.delivery, undefined);
  // A robot inside the goal still needs Pip present to count as an arrival.
  Object.assign(level.animals[0], { x: level.target.x, z: level.target.z, vx: 0, vz: 0 });
  stepSimulation(level, level.dog, {}, 0.1);
  assert.equal(level.delivery, undefined);
  const first = arrive(level);
  assert.equal(first.saved, 1); assert.equal(first.countdownStarted, true);
  assert.equal(first.remaining, 30); assert.equal(first.justCompleted, false);
  assert.equal(first.events.filter(e => e.type === 'countdownStarted').length, 1);
  const second = arrive(level);
  assert.equal(second.saved, 2); assert.ok(Math.abs(second.remaining - 29.9) < 1e-8);
  assert.equal(second.events.some(e => e.type === 'countdownStarted'), false);
});

test('an animal admitted at minimum entrance clearance roams inward without a second delivery event',()=>{
  const level=createLevel(23,203),animal=level.animals[0],radius=animal.type==='cow'?.78:.55,shape=targetFootprint(level.target);
  Object.assign(animal,targetWorldPoint(level.target,-shape.halfLength+radius+.01,0),{vx:0,vz:0});
  Object.assign(level.dog,targetWorldPoint(level.target,0,4));
  assert.ok(canOccupy(level,animal.x,animal.z,radius));
  assert.ok(containsTarget(level.target,animal,radius));
  const first=stepSimulation(level,level.dog,{},.1);
  assert.equal(animal.saved,true);assert.equal(first.saved,1);
  assert.equal(first.events.filter(e=>e.type==='animalSaved').length,1);
  const start={x:animal.x,z:animal.z},countdown=level.delivery.remaining,score=first.score;
  let laterEvents=[];
  for(let i=0;i<50;i++){
    laterEvents.push(...stepSimulation(level,level.dog,{},.1).events);
    assert.ok(containsTarget(level.target,animal,radius),`delivered animal stays confined during recovery step ${i}`);
  }
  assert.ok(Math.hypot(animal.x-start.x,animal.z-start.z)>.05,'saved animal turns into the pen');
  assert.ok(containsTarget(level.target,animal,radius));
  assert.ok(canOccupy(level,animal.x,animal.z,radius));
  assert.equal(level.animals.filter(a=>a.saved).length,1);
  assert.equal(laterEvents.filter(e=>e.type==='animalSaved').length,0);
  assert.equal(deliveryScore(level),score);
  assert.ok(Math.abs(level.delivery.remaining-(countdown-5))<1e-8);
});

test('zero time cannot deliver or decrement a timer; empty herds do not finish', () => {
  const level = createLevel(0);
  Object.assign(level.dog, level.target);
  Object.assign(level.animals[0], {x:level.target.x,z:level.target.z});
  for (const dt of [0, -1, NaN]) {
    const result = stepSimulation(level, level.dog, {}, dt);
    assert.equal(result.saved, 0); assert.equal(result.justCompleted, false);
  }
  arrive(level, 1);
  const remaining = level.delivery.remaining;
  stepSimulation(level, level.dog, {}, 0);
  assert.equal(level.delivery.remaining, remaining);
  const empty = createLevel(0); empty.animals = [];
  const result = stepSimulation(empty, empty.dog, {}, .1);
  assert.equal(result.completed, false); assert.equal(result.score, 0); assert.equal(result.remaining, null);
  assert.equal(applyLevelReward(defaultProfile(), {...empty, completed: true}), 0);
});

test('timeout locks partial results before admitting late arrivals and emits completion only once', () => {
  const level = createLevel(0);
  arrive(level, 2);
  Object.assign(level.animals.find(a => !a.saved), {x:level.target.x,z:level.target.z});
  const result = timeout(level);
  assert.equal(result.saved, 2); assert.equal(result.score, 32); assert.equal(result.reward, 32);
  assert.equal(result.justCompleted, true); assert.equal(result.remaining, 0);
  assert.equal(level.result.reason, 'timeout');
  const snapshot = JSON.stringify(level);
  const after = stepSimulation(level, level.dog, {x:1,bark:true}, .1, {drone:3,helper:3});
  assert.equal(after.justCompleted, false); assert.equal(after.reward, 0); assert.deepEqual(after.events, []);
  assert.equal(JSON.stringify(level), snapshot, 'completed flock, helpers and countdown freeze');
});

test('all arrivals finish immediately, without waiting for the recovery countdown', () => {
  const level = createLevel(0), result = arrive(level, level.animals.length);
  assert.equal(result.saved, result.total); assert.equal(result.remaining, 30);
  assert.equal(result.score, 80); assert.equal(result.justCompleted, true);
  assert.equal(level.result.reason, 'all-arrived');
  assert.equal(result.events.filter(e => e.type === 'levelCompleted').length, 1);
});

test('the full recovery allowance runs once and expires at its exact boundary', () => {
  const level = createLevel(0); arrive(level);
  // Leave Pip away from the goal so no additional arrivals can be admitted.
  Object.assign(level.dog, level.spawn);
  for (let i = 0; i < 299; i++) {
    assert.equal(stepSimulation(level, level.dog, {}, .1).justCompleted, false);
  }
  assert.ok(Math.abs(level.delivery.remaining - .1) < 1e-8);
  const result = stepSimulation(level, level.dog, {}, .1);
  assert.equal(result.justCompleted, true); assert.equal(result.remaining, 0);
  assert.equal(result.saved, 1); assert.equal(result.score, 16);
});

test('a timed-out partial delivery unlocks the next meadow and pays its exact proportional score', () => {
  const level = createLevel(1), profile = defaultProfile();
  arrive(level, 3); timeout(level);
  assert.equal(deliveryScore(level), Math.floor(105 * 3 / 8));
  assert.equal(applyLevelReward(profile, level), 39);
  assert.equal(profile.points, 39); assert.equal(profile.highestLevel, 2);
  assert.deepEqual(profile.completedLevels, [1]);
  assert.equal(profile.bestScores[1], 39); assert.equal(profile.bestEarnedBolts[1], 39);
  assert.equal(applyLevelReward(profile, level), 0);
});

test('replays pay only the lifetime best-score improvement, including after spending and reloading', () => {
  let profile = defaultProfile();
  assert.equal(applyLevelReward(profile, finishedRun(2)), 32);
  profile.points = 0; // Already earned bolts remain credited after spending.
  let serialized; const storage = {setItem: (_key, data) => serialized = data, getItem: () => serialized};
  saveProfile(profile, storage); profile = loadProfile(storage);
  assert.equal(applyLevelReward(profile, finishedRun(1)), 0);
  assert.equal(applyLevelReward(profile, finishedRun(2)), 0);
  assert.equal(applyLevelReward(profile, finishedRun(4)), 32);
  assert.equal(applyLevelReward(profile, finishedRun(5)), 16);
  assert.equal(applyLevelReward(profile, finishedRun(5)), 0);
  assert.equal(profile.points, 48); assert.equal(profile.bestScores[0], 80);
  assert.equal(profile.bestEarnedBolts[0], 80);
});

test('zero deliveries do not unlock a meadow or award a score', () => {
  const profile = defaultProfile();
  assert.equal(applyLevelReward(profile, finishedRun(0)), 0);
  assert.deepEqual(profile, defaultProfile());
  assert.equal(applyLevelReward(profile, createLevel(0)), 0);
});

test('legacy completion migrates to fully earned ledgers without re-crediting points or changing ownership', () => {
  const profile = validateProfile({version:1,points:17,highestLevel:20,completedLevels:[0,1,1,-1,100],upgrades:{speed:true,helper:2},music:false});
  assert.equal(profile.version, 2); assert.equal(profile.points, 17); assert.equal(profile.highestLevel, 20);
  assert.deepEqual(profile.upgrades, {speed:1,helper:2}); assert.equal(profile.music, false);
  assert.deepEqual(profile.bestScores, {0:80,1:105}); assert.deepEqual(profile.bestEarnedBolts, {0:80,1:105});
  assert.equal(applyLevelReward(profile, finishedRun(5)), 0);
  assert.equal(profile.points, 17);
  assert.deepEqual(validateProfile(profile), profile, 'migration is idempotent');
});

test('v2 ledger is canonical; stale completion and score caches cannot inflate or duplicate earned bolts', () => {
  const profile = validateProfile({version:2,points:9,highestLevel:0,completedLevels:[0,50],bestScores:{0:80,1:99999,2:'130'},bestEarnedBolts:{0:16,1:99999,2:-1,3:1.5,'01':20,'100':5},upgrades:{}});
  assert.deepEqual(profile.completedLevels, [0,1,3]);
  assert.deepEqual(profile.bestEarnedBolts, {0:16,1:105,3:1});
  assert.deepEqual(profile.bestScores, {0:16,1:105,3:1});
  assert.equal(profile.highestLevel, 4);
  assert.equal(applyLevelReward(profile, finishedRun(2)), 16, 'credit uses earned ledger rather than display cache');
  assert.equal(profile.bestEarnedBolts[0], 32);
  assert.deepEqual(defaultProfile().bestScores, {}); assert.deepEqual(defaultProfile().bestEarnedBolts, {});
});
