import { CONFIG_CONTRACTS } from './config/contracts.js';
import settings from './config/delivery.json' with { type: 'json' };
import { resolveConfig } from './config/resolve.js';
import { validateUpgrades } from './progression.js';
import { deliveryScore, maximumLevelReward, MAX_LEVEL_INDEX } from './delivery.js';

const CONFIG = resolveConfig(settings, 'delivery', CONFIG_CONTRACTS.delivery);
const clamp = (value, min, max) => Math.max(min, Math.min(max, value));

/** Campaign persistence; transient world and helper state never enter saves. */
export function defaultProfile() { return { version: 2, points: 0, upgrades: {}, completedLevels: [], bestScores: {}, bestEarnedBolts: {}, highestLevel: 0, music: true }; }

function validateLedger(raw) {
  const ledger = {};
  if (!raw || typeof raw !== 'object' || Array.isArray(raw)) return ledger;
  for (const [key, score] of Object.entries(raw)) {
    const index = Number(key);
    if (String(index) !== key || !Number.isInteger(index) || index < 0 || index > MAX_LEVEL_INDEX || !Number.isFinite(score) || score <= 0) continue;
    ledger[index] = clamp(Math.floor(score), 0, maximumLevelReward(index));
    if (!ledger[index]) delete ledger[index];
  }
  return ledger;
}

export function validateProfile(value) {
  const result = defaultProfile();
  if (!value || typeof value !== 'object') return result;
  result.points = Number.isFinite(value.points) ? clamp(Math.floor(value.points), 0, CONFIG.profile.maximumPoints) : 0;
  result.upgrades=validateUpgrades(value.upgrades);
  const legacyCompleted = [...new Set((Array.isArray(value.completedLevels) ? value.completedLevels : []).filter(v => Number.isInteger(v) && v >= 0 && v <= MAX_LEVEL_INDEX))];
  result.bestEarnedBolts = validateLedger(value.bestEarnedBolts);
  // Only pre-ledger saves receive the old full-reward entitlement. A v2
  // completedLevels cache must never inflate a partially earned ledger.
  if (value.version === undefined || value.version === 1) {
    for (const index of legacyCompleted) result.bestEarnedBolts[index] = maximumLevelReward(index);
  }
  // Scores are a display cache of the authoritative earned entitlement. A
  // stale or malformed cache cannot rewrite a player's lifetime reward cap.
  result.bestScores = { ...result.bestEarnedBolts };
  result.completedLevels = Object.keys(result.bestEarnedBolts).map(Number).sort((a, b) => a - b);
  result.highestLevel = clamp(Math.max(Number.isInteger(value.highestLevel) ? value.highestLevel : 0, ...result.completedLevels.map(v => v + 1)), 0, MAX_LEVEL_INDEX);
  result.music = value.music !== false;
  return result;
}

export function applyLevelReward(profile, level) {
  if (!level.completed || !Number.isInteger(level.index) || level.index < 0 || level.index > MAX_LEVEL_INDEX) return 0;
  const saved = level.result?.saved ?? level.animals.filter(a => a.saved).length;
  if (saved <= 0 || !level.animals.length) return 0;
  Object.assign(profile, validateProfile(profile));
  const score = Math.min(maximumLevelReward(level.index), deliveryScore(level, saved));
  const previousEarned = profile.bestEarnedBolts[level.index] || 0;
  // The lifetime ledger survives spending and reloading. Pay only an improved
  // entitlement, never the full replay score, so old rewards cannot pay twice.
  const reward = Math.max(0, score - previousEarned);
  profile.bestScores[level.index] = Math.max(profile.bestScores[level.index] || 0, score);
  profile.bestEarnedBolts[level.index] = Math.max(previousEarned, score);
  if (!profile.completedLevels.includes(level.index)) profile.completedLevels.push(level.index);
  profile.completedLevels.sort((a, b) => a - b);
  profile.highestLevel = Math.min(MAX_LEVEL_INDEX, Math.max(profile.highestLevel, level.index + 1));
  profile.points += reward;
  return reward;
}

export function loadProfile(storage, key = 'flock-foundry-v1') {
  try {
    storage ||= globalThis.localStorage;
    return validateProfile(JSON.parse(storage.getItem(key)));
  } catch { return defaultProfile(); }
}

export function saveProfile(profile, storage, key = 'flock-foundry-v1') {
  try {
    storage ||= globalThis.localStorage;
    storage.setItem(key, JSON.stringify(validateProfile(profile)));
    return true;
  } catch { return false; }
}

