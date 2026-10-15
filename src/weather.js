/** Deterministic per-level weather. Only lightning advances with simulation time. */
const presets = {
  sun: { rainIntensity: 0, windIntensity: .12, severity: 0, cloudCoverage: .22, daylight: 1 },
  wind: { rainIntensity: 0, windIntensity: .6, severity: .3, cloudCoverage: .4, daylight: .96 },
  rain: { rainIntensity: .3, windIntensity: .3, severity: .28, cloudCoverage: .5, daylight: .94 },
  'heavy-rain': { rainIntensity: .65, windIntensity: .55, severity: .6, cloudCoverage: .7, daylight: .82 },
  storm: { rainIntensity: .9, windIntensity: .85, severity: .88, cloudCoverage: .85, daylight: .70 },
};
// Integer hashing avoids frame randomness and makes seed/index choices replayable.
function hash(seed, index) {
  let value = (seed ^ Math.imul(index + 1, 0x9e3779b9)) >>> 0;
  value = Math.imul(value ^ (value >>> 16), 0x21f0aaad);
  value = Math.imul(value ^ (value >>> 15), 0x735a2d97);
  return (value ^ (value >>> 15)) >>> 0;
}
function initial(level, seed, index) {
  const number = index + 1;
  if (number <= 5) return 'sun';
  const requested = typeof level.weather === 'string' ? level.weather : level.weather?.kind || level.weather?.type;
  const alias = requested === 'light-rain' || requested === 'snow' ? 'rain' : requested;
  if (alias && presets[alias]) {
    if (alias === 'sun' || alias === 'wind') return alias;
    if (number < 9) return 'sun';
    if (alias === 'storm' && number >= 24) return 'storm';
    if ((alias === 'storm' || alias === 'heavy-rain') && number >= 16) return 'heavy-rain';
    return 'rain';
  }
  // Unlock levels are reliable visual QA fixtures, independent of seed.
  if (number === 9) return 'rain';
  if (number === 16) return 'heavy-rain';
  if (number === 24) return 'storm';
  const roll = hash(seed, index) / 0x100000000;
  if (number < 9) return roll < .65 ? 'sun' : 'wind';
  if (number < 16) return roll < .35 ? 'sun' : roll < .5 ? 'wind' : 'rain';
  if (number < 24) return roll < .25 ? 'sun' : roll < .35 ? 'wind' : roll < .65 ? 'rain' : 'heavy-rain';
  return roll < .2 ? 'sun' : roll < .3 ? 'wind' : roll < .5 ? 'rain' : roll < .75 ? 'heavy-rain' : 'storm';
}
export function createWeatherState(level = {}) {
  const levelIndex = Number.isFinite(level.index) ? Math.max(0, Math.floor(level.index)) : 0;
  const seed = Number.isFinite(level.seed) ? level.seed >>> 0 : 42;
  const kind = initial(level, seed, levelIndex), preset = presets[kind];
  const state = { ...preset, kind, type: kind === 'heavy-rain' || kind === 'storm' ? 'rain' : kind,
    snowIntensity: 0, storm: kind === 'storm', elapsed: 0, seed, levelIndex,
    intensity: Math.max(preset.rainIntensity, kind === 'wind' ? preset.windIntensity : 0),
    wind: .2 + preset.windIntensity * 1.6, particles: preset.rainIntensity > 0 ? 128 : 0,
    lightningId: null, lightningAge: Infinity, thunderDelay: .8, lightningFlash: 0,
    clouds: 5, butterflies: preset.rainIntensity > 0 ? 4 : 8, birds: 5, squirrels: 3,
    lightningStart: 8 + hash(seed, levelIndex + 1000) % 401 / 100,
    lightningInterval: 24 };
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
  state.thunderDelay = .8 + hash(state.seed, state.levelIndex + event + 2000) % 9 / 10;
  state.lightningFlash = state.lightningAge < .22 ? .38 * (1 - state.lightningAge / .22) : 0;
  return state;
}
