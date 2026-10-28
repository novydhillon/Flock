import { CONFIG_CONTRACTS } from './config/contracts.js';
import settings from './config/delivery.json' with { type: 'json' };
import { resolveConfig } from './config/resolve.js';

const CONFIG = resolveConfig(settings, 'delivery', CONFIG_CONTRACTS.delivery);
if (CONFIG.countdown.minimumSeconds > CONFIG.countdown.maximumSeconds) throw new RangeError('delivery.countdown: minimumSeconds exceeds maximumSeconds');
const clamp = (value, min, max) => Math.max(min, Math.min(max, value));
const distance = (a, b) => Math.hypot(a.x - b.x, a.z - b.z);

export const MAX_LEVEL_NUMBER = CONFIG.campaign.maximumLevelNumber;
export const MAX_LEVEL_INDEX = MAX_LEVEL_NUMBER - 1;

// Reward entitlement is fixed by campaign index, independently of save data.
export const maximumLevelReward = index => CONFIG.reward.base + index * CONFIG.reward.perLevel;

/** Recovery allowance starts on the first attended arrival, never during travel. */
export function deliveryCountdownSeconds(level) {
  const policy = CONFIG.countdown;
  const extraRobots = Math.max(0, (level.animals?.length || 0) - policy.baseRobots);
  const routes = Math.max(1, level.routes?.length || 1);
  const journey = level.spawn && level.target ? distance(level.spawn, level.target) : 0;
  return clamp(policy.minimumSeconds + Math.ceil(extraRobots / policy.extraRobotsPerSecond) + (routes - 1) * policy.extraRouteSeconds +
    Math.floor(journey / policy.journeyMetersPerStep) * policy.journeySecondsPerStep, policy.minimumSeconds, policy.maximumSeconds);
}

/** A run's score and maximum bolt entitlement share the same integer scale. */
export function deliveryScore(level, saved = level.animals.filter(a => a.saved).length) {
  const total = level.animals.length;
  return total ? Math.floor(Math.max(0, level.reward) * clamp(saved, 0, total) / total) : 0;
}

export function deliveryResult(level, events = [], justCompleted = false, dogCollision = { blockedX: false, blockedZ: false }) {
  const saved = level.result?.saved ?? level.animals.filter(a => a.saved).length;
  const total = level.result?.total ?? level.animals.length;
  const score = level.result?.score ?? deliveryScore(level, saved);
  return { saved, total, score, possibleScore: level.reward, completed: Boolean(level.completed), justCompleted,
    reward: justCompleted ? score : 0, remaining: level.delivery?.remaining ?? null,
    countdownStarted: Boolean(level.delivery?.started), events, helpers: level.helpers || [], dogCollision };
}

export function finishDelivery(level, reason, events = [], dogCollision) {
  level.completed = true;
  const saved = level.animals.filter(a => a.saved).length;
  level.result = { saved, total: level.animals.length, score: deliveryScore(level, saved), possibleScore: level.reward, reason };
  events.push({ type: 'levelCompleted', index: level.index, reward: level.result.score, reason });
  return deliveryResult(level, events, true, dogCollision);
}

/** Called before movement: expiry closes admission before a late animal can enter. */
export function advanceDeliveryCountdown(level, dt, events = [], dogCollision) {
  if (level.completed || !(dt > 0) || !level.delivery?.started) return null;
  level.delivery.remaining = Math.max(0, level.delivery.remaining - dt);
  if (level.delivery.remaining <= 1e-8) {
    level.delivery.remaining = 0;
    return finishDelivery(level, 'timeout', events, dogCollision);
  }
  return null;
}

/** Called after admission, so a first arrival receives its whole recovery allowance. */
export function startDeliveryCountdown(level, events = []) {
  if (level.completed || level.delivery?.started || !events.some(event => event.type === 'animalSaved')) return false;
  const duration = deliveryCountdownSeconds(level);
  level.delivery = { started: true, duration, remaining: duration };
  events.push({ type: 'countdownStarted', duration });
  return true;
}

/** Finalize post-movement delivery state without making geometry/admission decisions. */
export function completeDelivery(level, events = [], dogCollision) {
  if (level.completed) return deliveryResult(level, events, false, dogCollision);
  startDeliveryCountdown(level, events);
  const saved = level.animals.filter(a => a.saved).length;
  if (saved === level.animals.length && saved > 0) return finishDelivery(level, 'all-arrived', events, dogCollision);
  return deliveryResult(level, events, false, dogCollision);
}
