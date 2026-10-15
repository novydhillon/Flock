/** Deterministic decorative weather. Advance only with gameplay simulation time. */
const clamp = n => Math.max(0, Math.min(1, n));
const smooth = n => { const t = clamp(n); return t * t * (3 - 2 * t); };
const presets = {
  sun: { rainIntensity: 0, snowIntensity: 0, windIntensity: .12, severity: 0, cloudCoverage: .22, daylight: 1 },
  wind: { rainIntensity: 0, snowIntensity: 0, windIntensity: .6, severity: .3, cloudCoverage: .4, daylight: .92 },
  rain: { rainIntensity: .35, snowIntensity: 0, windIntensity: .35, severity: .35, cloudCoverage: .62, daylight: .83 },
  storm: { rainIntensity: .95, snowIntensity: 0, windIntensity: .9, severity: .92, cloudCoverage: .95, daylight: .64 },
  snow: { rainIntensity: 0, snowIntensity: .4, windIntensity: .28, severity: .4, cloudCoverage: .65, daylight: .88 },
};
function initial(level) {
  const number = (level.index || 0) + 1;
  const requested = typeof level.weather === 'string' ? level.weather : level.weather?.type;
  let kind = requested || (number <= 5 ? 'sun' : ['sun', 'wind', 'rain', 'sun', 'snow'][(number - 6) % 5]);
  if (!presets[kind] || number <= 5 || (number <= 8 && ['snow', 'storm'].includes(kind))) kind = 'sun';
  return kind;
}
function sample(state, time) {
  const episode = Math.floor(time / 90), local = time % 90;
  const sequence = state.sequence, next = sequence[episode % sequence.length];
  const previous = sequence[Math.max(0, episode - 1) % sequence.length];
  const blend = episode === 0 ? 1 : smooth(local / 18);
  const fields = {};
  for (const field of Object.keys(presets.sun)) fields[field] = presets[previous][field] + (presets[next][field] - presets[previous][field]) * blend;
  fields.kind = blend < .5 ? previous : next;
  return fields;
}
export function createWeatherState(level = {}) {
  const kind = initial(level), number = (level.index || 0) + 1;
  const cycle = number <= 5 ? ['sun'] : number <= 8 ? ['sun', 'wind', 'rain', 'sun'] : ['sun', 'wind', 'rain', 'storm', 'rain', 'sun', 'snow'];
  const offset = cycle.indexOf(kind);
  const sequence = offset >= 0 ? [...cycle.slice(offset), ...cycle.slice(0, offset)] : [kind, ...cycle];
  const state = { elapsed: 0, sequence, seed: level.seed || 42, levelIndex: level.index || 0, lightningId: null,
    lightningAge: Infinity, thunderDelay: .8, lightningFlash: 0, clouds: 5, butterflies: kind === 'snow' ? 0 : kind === 'rain' || kind === 'storm' ? 4 : 8, birds: 5, squirrels: 3 };
  return stepWeather(state, 0);
}
export function weatherForLevel(level = {}) { return createWeatherState(level); }
export function stepWeather(state, dt) {
  if (Number.isFinite(dt) && dt > 0) state.elapsed += dt;
  const fields = sample(state, state.elapsed);
  Object.assign(state, fields);
  state.type = fields.kind === 'storm' ? 'rain' : fields.kind;
  state.storm = fields.kind === 'storm';
  state.intensity = Math.max(state.rainIntensity, state.snowIntensity, state.type === 'wind' ? state.windIntensity : 0);
  state.wind = .2 + state.windIntensity * 1.6;
  state.particles = state.levelIndex < 5 ? 0 : 128;
  // One brief, low-strength flash per 24 seconds of severe weather, followed by
  // thunder from the same ID. No wall-clock timers or random frame decisions.
  const event = Math.floor((state.elapsed - 30) / 24), at = 30 + event * 24;
  const eligible = event >= 0 && sample(state, at).severity >= .72;
  state.lightningId = eligible ? `${state.seed}:${state.levelIndex}:${event}` : null;
  state.lightningAge = eligible ? state.elapsed - at : Infinity;
  state.thunderDelay = .8 + ((state.seed + event * 17) >>> 0) % 9 / 10;
  state.lightningFlash = eligible && state.lightningAge < .22 ? .38 * (1 - state.lightningAge / .22) : 0;
  return state;
}
