import { CONFIG_CONTRACTS } from './config/contracts.js';
import settings from './config/weather.json' with { type: 'json' };
import { resolveConfig } from './config/resolve.js';
const WEATHER=resolveConfig(settings, 'weather', CONFIG_CONTRACTS.weather);
const unlockLevels = Object.values(WEATHER.unlock);
if (unlockLevels.some((level, index) => index > 0 && level < unlockLevels[index - 1])) throw new RangeError('weather.unlock: public-level boundaries are out of order');
for (const [key, values] of Object.entries(WEATHER.selection)) {
  if (Array.isArray(values) && values.some((value, index) => index > 0 && value < values[index - 1])) throw new RangeError(`weather.selection.${key}: cumulative cutoffs must be ordered`);
}


/** Deterministic per-level weather. Only lightning advances with simulation time. */
const presets = WEATHER.presets;
// Integer hashing avoids frame randomness and makes seed/index choices replayable.
function hash(seed, index) {
  let value = (seed ^ Math.imul(index + 1, 0x9e3779b9)) >>> 0;
  value = Math.imul(value ^ (value >>> 16), 0x21f0aaad);
  value = Math.imul(value ^ (value >>> 15), 0x735a2d97);
  return (value ^ (value >>> 15)) >>> 0;
}
function initial(level, seed, index) {
  const number = index + 1;
  if (number <= WEATHER.unlock.sunOnlyThrough) return 'sun';
  const requested = typeof level.weather === 'string' ? level.weather : level.weather?.kind || level.weather?.type;
  const alias = requested === 'light-rain' || requested === 'snow' ? 'rain' : requested;
  if (alias && presets[alias]) {
    if (alias === 'sun' || alias === 'wind') return alias;
    if (number < WEATHER.unlock.rainLevel) return 'sun';
    if (alias === 'storm' && number >= WEATHER.unlock.stormLevel) return 'storm';
    if ((alias === 'storm' || alias === 'heavy-rain') && number >= WEATHER.unlock.heavyRainLevel) return 'heavy-rain';
    return 'rain';
  }
  // Unlock fixtures and cumulative cutoffs share one hash draw. Retain the
  // ordering and hash stream so tuning never introduces frame-dependent weather.
  if (number === WEATHER.unlock.rainLevel) return 'rain';
  if (number === WEATHER.unlock.heavyRainLevel) return 'heavy-rain';
  if (number === WEATHER.unlock.stormLevel) return 'storm';
  const roll = hash(seed, index) / 0x100000000;
  if (number < WEATHER.unlock.rainLevel) return roll < WEATHER.selection.earlySunCutoff ? 'sun' : 'wind';
  if (number < WEATHER.unlock.heavyRainLevel) return roll < WEATHER.selection.rainCutoffs[0] ? 'sun' : roll < WEATHER.selection.rainCutoffs[1] ? 'wind' : 'rain';
  if (number < WEATHER.unlock.stormLevel) return roll < WEATHER.selection.heavyRainCutoffs[0] ? 'sun' : roll < WEATHER.selection.heavyRainCutoffs[1] ? 'wind' : roll < WEATHER.selection.heavyRainCutoffs[2] ? 'rain' : 'heavy-rain';
  return roll < WEATHER.selection.stormCutoffs[0] ? 'sun' : roll < WEATHER.selection.stormCutoffs[1] ? 'wind' : roll < WEATHER.selection.stormCutoffs[2] ? 'rain' : roll < WEATHER.selection.stormCutoffs[3] ? 'heavy-rain' : 'storm';
}
export function createWeatherState(level = {}) {
  const levelIndex = Number.isFinite(level.index) ? Math.max(0, Math.floor(level.index)) : 0;
  const seed = Number.isFinite(level.seed) ? level.seed >>> 0 : 42;
  const kind = initial(level, seed, levelIndex), preset = presets[kind];
  const state = { ...preset, kind, type: kind === 'heavy-rain' || kind === 'storm' ? 'rain' : kind,
    snowIntensity: 0, storm: kind === 'storm', elapsed: 0, seed, levelIndex,
    intensity: Math.max(preset.rainIntensity, kind === 'wind' ? preset.windIntensity : 0),
    wind: WEATHER.ambience.windBase + preset.windIntensity * WEATHER.ambience.windScale, particles: preset.rainIntensity > 0 ? WEATHER.ambience.rainParticles : 0,
    lightningId: null, lightningAge: Infinity, thunderDelay: WEATHER.lightning.thunderDelaySeconds, lightningFlash: 0,
    clouds: 0, butterflies: kind === 'storm' ? 0 : preset.rainIntensity > 0 ? WEATHER.ambience.wetButterflies : WEATHER.ambience.dryButterflies,
    birds: kind === 'storm' ? 0 : WEATHER.ambience.birds, squirrels: kind === 'storm' ? 0 : WEATHER.ambience.squirrels,
    lightningStart: WEATHER.lightning.startSeconds + hash(seed, levelIndex + 1000) % 401 / 100,
    lightningInterval: WEATHER.lightning.intervalSeconds };
  return state;
}
export function weatherForLevel(level = {}) { return createWeatherState(level); }
export function stepWeather(state, dt) {
  if (Number.isFinite(dt) && dt > 0) state.elapsed += dt;
  if (!state.storm) return state;
  // A low-strength brief flash, then thunder from that same event ID. Large
  // frame gaps sample the latest event without replaying skipped strikes.
  const event = Math.floor((state.elapsed - state.lightningStart) / state.lightningInterval);
  if (event < 0) return state;
  state.lightningId = `${state.seed}:${state.levelIndex}:${event}`;
  state.lightningAge = Math.max(0, state.elapsed - (state.lightningStart + event * state.lightningInterval));
  state.thunderDelay = WEATHER.lightning.thunderDelaySeconds + hash(state.seed, state.levelIndex + event + 2000) % 9 / 10;
  state.lightningFlash = state.lightningAge < WEATHER.lightning.flashSeconds ? WEATHER.lightning.flashStrength * (1 - state.lightningAge / WEATHER.lightning.flashSeconds) : 0;
  return state;
}
