import test from 'node:test';
import assert from 'node:assert/strict';
import { deliveryCountdownSeconds, deliveryScore, deliveryResult, advanceDeliveryCountdown,
  startDeliveryCountdown, completeDelivery, maximumLevelReward } from '../src/delivery.js';

const flock = (total = 5, saved = 0, index = 0) => ({
  index, reward: maximumLevelReward(index), spawn: { x: 0, z: 0 }, target: { x: 20, z: 0 }, routes: [[]],
  animals: Array.from({ length: total }, (_, id) => ({ id, type: 'sheep', saved: id < saved })),
});
const arrival = id => ({ type: 'animalSaved', id, animalType: 'sheep' });

test('configured recovery allowance matches the original formula at flock, route and distance boundaries', () => {
  for (const total of [0, 1, 5, 6, 10, 11, 65, 1000]) for (const routeCount of [0, 1, 2, 20]) {
    for (const distance of [0, 39.99, 40, 79.99, 80, 1000]) {
      const level = flock(total);
      level.routes = Array.from({ length: routeCount }, () => []);
      level.target.x = distance;
      const expected = Math.max(30, Math.min(60, 30 + Math.ceil(Math.max(0, total - 5) / 5) +
        (Math.max(1, routeCount) - 1) * 4 + Math.floor(distance / 40) * 2));
      assert.equal(deliveryCountdownSeconds(level), expected);
    }
  }
  assert.equal(deliveryCountdownSeconds({}), 30);
  for (let index = 0; index < 100; index++) assert.equal(maximumLevelReward(index), 80 + index * 25);
});

test('scores stay proportional whole bolts and clamp invalid delivery counts to the flock', () => {
  const level = flock(8, 3, 1);
  assert.equal(deliveryScore(level), 39);
  assert.equal(deliveryScore(level, -1), 0);
  assert.equal(deliveryScore(level, 99), 105);
  assert.equal(deliveryScore({ ...level, reward: -10 }), 0);
  assert.equal(deliveryScore(flock(0)), 0);
});

test('travel has no timer and the first arrival receives the full allowance in event order', () => {
  const level = flock();
  assert.equal(advanceDeliveryCountdown(level, 1000), null);
  assert.equal(completeDelivery(level).remaining, null);
  assert.equal(startDeliveryCountdown(level), false);
  assert.equal(level.delivery, undefined);
  level.animals[0].saved = true;
  const events = [arrival(0)], result = completeDelivery(level, events);
  assert.equal(result.remaining, 30);
  assert.equal(result.justCompleted, false);
  assert.equal(result.countdownStarted, true);
  assert.deepEqual(events.map(event => event.type), ['animalSaved', 'countdownStarted']);
  assert.deepEqual(level.delivery, { started: true, duration: 30, remaining: 30 });
  assert.equal(advanceDeliveryCountdown(level, .1), null);
  level.animals[1].saved = true;
  const later = completeDelivery(level, [arrival(1)]);
  assert.equal(later.remaining, 29.9);
  assert.equal(later.events.some(event => event.type === 'countdownStarted'), false);
});

test('timeout freezes partial results before the admission phase and pays one completion event', () => {
  const level = flock(5, 2);
  completeDelivery(level, [arrival(0), arrival(1)]);
  level.delivery.remaining = .05;
  let result = advanceDeliveryCountdown(level, .1);
  if (!result) {
    // This admission phase must be unreachable once the timer expires.
    level.animals[2].saved = true;
    result = completeDelivery(level, [arrival(2)]);
  }
  assert.equal(level.animals[2].saved, false);
  assert.equal(result.saved, 2); assert.equal(result.score, 32); assert.equal(result.reward, 32);
  assert.equal(result.justCompleted, true); assert.equal(result.remaining, 0);
  assert.deepEqual(level.result, { saved: 2, total: 5, score: 32, possibleScore: 80, reason: 'timeout' });
  assert.deepEqual(result.events, [{ type: 'levelCompleted', index: 0, reward: 32, reason: 'timeout' }]);
  const frozen = structuredClone(level);
  assert.equal(advanceDeliveryCountdown(level, .1), null);
  const again = completeDelivery(level);
  assert.equal(again.justCompleted, false); assert.equal(again.reward, 0); assert.deepEqual(again.events, []);
  assert.deepEqual(level, frozen);
});

test('all arrivals finish immediately after the start event and preserve collision/helper result references', () => {
  const level = flock(2, 2), collision = { blockedX: true, blockedZ: false }, helpers = [{ type: 'drone' }];
  level.helpers = helpers;
  const events = [arrival(0), arrival(1)], result = completeDelivery(level, events, collision);
  assert.deepEqual(events.map(event => event.type), ['animalSaved', 'animalSaved', 'countdownStarted', 'levelCompleted']);
  assert.equal(result.remaining, 30); assert.equal(result.score, 80); assert.equal(result.reward, 80);
  assert.equal(result.completed, true); assert.equal(result.justCompleted, true);
  assert.equal(result.dogCollision, collision); assert.equal(result.helpers, helpers); assert.equal(result.events, events);
  assert.equal(level.result.reason, 'all-arrived');
  assert.equal(completeDelivery(level).reward, 0);
});

test('zero or invalid time pauses countdown, empty herds never complete, and the exact boundary expires', () => {
  const empty = flock(0);
  assert.equal(completeDelivery(empty).completed, false);
  assert.equal(completeDelivery(empty).score, 0);
  const level = flock(5, 1);
  completeDelivery(level, [arrival(0)]);
  for (const dt of [0, -1, NaN]) assert.equal(advanceDeliveryCountdown(level, dt), null);
  assert.equal(level.delivery.remaining, 30);
  for (let i = 0; i < 299; i++) assert.equal(advanceDeliveryCountdown(level, .1), null);
  assert.ok(Math.abs(level.delivery.remaining - .1) < 1e-8);
  const expired = advanceDeliveryCountdown(level, .1);
  assert.equal(expired.justCompleted, true); assert.equal(expired.remaining, 0);
  assert.equal(expired.saved, 1); assert.equal(expired.score, 16);
});

test('completed result reads the frozen snapshot while ordinary result calls award no wallet delta', () => {
  const level = flock(5, 2);
  completeDelivery(level, [arrival(0)]);
  level.delivery.remaining = .1;
  advanceDeliveryCountdown(level, .1);
  level.animals[2].saved = true;
  const result = deliveryResult(level);
  assert.equal(result.saved, 2); assert.equal(result.score, 32);
  assert.equal(result.reward, 0); assert.equal(result.justCompleted, false);
  assert.deepEqual(result.dogCollision, { blockedX: false, blockedZ: false });
});
