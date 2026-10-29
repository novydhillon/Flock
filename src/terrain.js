import settings from './config/terrain.json' with { type: 'json' };
import { CONFIG_CONTRACTS } from './config/contracts.js';
import { resolveConfig } from './config/resolve.js';

export const TERRAIN = resolveConfig(settings, 'terrain', CONFIG_CONTRACTS.terrain);
// Existing bare-ground mesh clearance below the authoritative support surface.
export const GROUND_SURFACE_OFFSET = -.035;
const radians = degrees => degrees * Math.PI / 180;
const clamp = (value, low, high) => Math.max(low, Math.min(high, value));

function randomStream(seed) {
  let state = seed >>> 0;
  return () => {
    state += 0x6D2B79F5;
    let value = Math.imul(state ^ state >>> 15, 1 | state);
    value ^= value + Math.imul(value ^ value >>> 7, 61 | value);
    return ((value ^ value >>> 14) >>> 0) / 4294967296;
  };
}

/** Terrain has its own stream: changing relief never advances layout RNG. */
export function createTerrain(level, { angle, halfV, channels }) {
  const random = randomStream(level.seed ^ 0x54455252);
  const selected = random() < TERRAIN.selectionProbability;
  const terrain = {
    enabled: level.index >= TERRAIN.unlockIndex && selected,
    kind: level.index >= TERRAIN.unlockIndex && selected ? 'rolling' : 'flat',
    cosine: Math.cos(angle),
    sine: Math.sin(angle),
    downstreamExtent: halfV,
    phases: Array.from({ length: 3 }, () => random() * Math.PI * 2),
    channels: channels.map(channel => ({
      base: channel.base,
      phase: channel.phase,
      primaryScale: channel.primaryScale,
      secondaryScale: channel.secondaryScale,
      primaryAmplitude: channel.primaryAmplitude,
      secondaryAmplitude: channel.secondaryAmplitude,
      wetRadius: channel.width / 2 + TERRAIN.waterEdgeInset,
    })),
    maximumRelief: TERRAIN.maximumRelief,
    maximumSlopeDegrees: TERRAIN.maximumSlopeDegrees,
  };
  // These are construction limits, not a height clamp: clamping a finished
  // surface would introduce precisely the abrupt grade changes we avoid.
  const reliefBound = TERRAIN.valleyLift + TERRAIN.waveAmplitude + 2 * TERRAIN.downstreamDrop + TERRAIN.bridgeLift;
  if (reliefBound > TERRAIN.maximumRelief + 1e-12) throw new RangeError('terrain: configured relief exceeds maximumRelief');
  if (TERRAIN.poolMaximumSlopeDegrees >= TERRAIN.maximumSlopeDegrees) throw new RangeError('terrain: pool grade must be below traversable grade');
  return terrain;
}

function coordinates(terrain, x, z) {
  return { u: x * terrain.cosine + z * terrain.sine, v: -x * terrain.sine + z * terrain.cosine };
}

function downstream(terrain, v) {
  const t = Math.tanh(v / terrain.downstreamExtent);
  return { height: TERRAIN.downstreamDrop * t, derivative: TERRAIN.downstreamDrop * (1 - t * t) / terrain.downstreamExtent };
}

/** C-infinity pasture/valley height and exact derivatives, without sample seams. */
function groundSample(level, x, z) {
  const terrain = level?.terrain;
  if (!terrain?.enabled) return { height: 0, dx: 0, dz: 0 };
  const { u, v } = coordinates(terrain, x, z), phases = terrain.phases;
  const a = u / 6 + phases[0], b = v / 8 + phases[1], c = (u + v) / 10 + phases[2];
  const lift = TERRAIN.valleyLift + TERRAIN.waveAmplitude * (.5 * Math.sin(a) + .3 * Math.sin(b) + .2 * Math.sin(c));
  const liftU = TERRAIN.waveAmplitude * (.5 * Math.cos(a) / 6 + .2 * Math.cos(c) / 10);
  const liftV = TERRAIN.waveAmplitude * (.3 * Math.cos(b) / 8 + .2 * Math.cos(c) / 10);
  let mask = 1, maskU = 0, maskV = 0;
  for (const channel of terrain.channels) {
    const a = v / channel.primaryScale + channel.phase, b = v / channel.secondaryScale + channel.phase;
    const center = channel.base + Math.sin(a) * channel.primaryAmplitude + Math.sin(b) * channel.secondaryAmplitude;
    const derivative = Math.cos(a) * channel.primaryAmplitude / channel.primaryScale + Math.cos(b) * channel.secondaryAmplitude / channel.secondaryScale;
    const distance = u - center, radiusSquared = channel.wetRadius ** 2;
    // Normalize the valley to the water elevation at its physical wet edge.
    // Hill waves may change the outer lift, but cannot expose the river bed.
    const exponent = -Math.log1p(-TERRAIN.waterDepth / lift) / radiusSquared;
    const exponentDerivative = -TERRAIN.waterDepth / (lift * (lift - TERRAIN.waterDepth) * radiusSquared);
    const gaussian = Math.exp(-distance * distance * exponent), nextMask = 1 - gaussian;
    const du = gaussian * (2 * distance * exponent + distance * distance * exponentDerivative * liftU);
    const dv = gaussian * (-2 * distance * exponent * derivative + distance * distance * exponentDerivative * liftV);
    maskU = maskU * nextMask + mask * du;
    maskV = maskV * nextMask + mask * dv;
    mask *= nextMask;
  }
  const flow = downstream(terrain, v);
  const du = liftU * mask + lift * maskU, dv = flow.derivative + liftV * mask + lift * maskV;
  return {
    height: flow.height - TERRAIN.channelDepth + lift * mask,
    dx: du * terrain.cosine - dv * terrain.sine,
    dz: du * terrain.sine + dv * terrain.cosine,
  };
}

/** Bare ground, including the submerged bed. All meshes read this same field. */
export function groundHeight(level, x, z) {
  return groundSample(level, x, z).height;
}

export function terrainNormal(level, x, z) {
  const { dx, dz } = groundSample(level, x, z), length = Math.hypot(dx, 1, dz);
  return { x: -dx / length, y: 1 / length, z: -dz / length };
}

export function terrainSlope(level, x, z) {
  const { dx, dz } = groundSample(level, x, z);
  return Math.atan(Math.hypot(dx, dz));
}

/** Every generated river shares a downhill reference along its ordered points. */
export function riverSurfaceHeight(level, river, x, z) {
  if (!level?.terrain?.enabled) return .018;
  const { v } = coordinates(level.terrain, x, z);
  return downstream(level.terrain, v).height - TERRAIN.channelDepth + TERRAIN.waterDepth;
}

export function bridgeSurfaceHeight(level, bridge, x, z) {
  const forwardX = Math.sin(bridge.heading), forwardZ = Math.cos(bridge.heading);
  const along = (x - bridge.x) * forwardX + (z - bridge.z) * forwardZ;
  if (!level?.terrain?.enabled) return .18 + .12 * Math.sin(Math.PI * (along / bridge.length + .5));
  const fraction = clamp(along * 2 / bridge.length, -1, 1);
  // Both the lift and its derivative vanish at the dry ends. Ground grade is
  // retained rather than replaced by a flat pad or a step onto the bridge.
  return groundHeight(level, x, z) + TERRAIN.bridgeLift * (1 - fraction * fraction) ** 2;
}

/** Standing-water placement is a world rule; weather only fills eligible sites.
 * The height is a horizontal water plane. Callers clip its edge to bare ground;
 * a sloping puddle mesh must never be substituted for standing water. */
export function poolingSite(level, x, z, radius = 1.5) {
  const samples = [{ x, z }];
  for (const fraction of [.5, 1]) for (let i = 0; i < 12; i++) {
    const angle = i * Math.PI / 6;
    samples.push({ x: x + Math.cos(angle) * radius * fraction, z: z + Math.sin(angle) * radius * fraction });
  }
  let minimum = Infinity, maximum = -Infinity, slope = 0;
  for (const point of samples) {
    const sample = groundSample(level, point.x, point.z);
    minimum = Math.min(minimum, sample.height);
    maximum = Math.max(maximum, sample.height);
    slope = Math.max(slope, Math.atan(Math.hypot(sample.dx, sample.dz)));
  }
  const terrain = level?.terrain;
  const reference = terrain?.enabled ? downstream(terrain, coordinates(terrain, x, z).v).height : 0;
  const eligible = slope < radians(TERRAIN.poolMaximumSlopeDegrees)
    && maximum - minimum <= TERRAIN.poolMaximumHeightRange
    && maximum <= reference + TERRAIN.poolLowlandHeight;
  return { eligible, height: minimum + .008, slope, minimum, maximum };
}
