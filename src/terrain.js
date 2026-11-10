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

/** Selection is independent of layout RNG, including the longer-crossing choice. */
export function elevatedBridgeMeadow(index, seed) {
  return index >= TERRAIN.unlockIndex
    && randomStream(seed ^ 0x54455252)() < TERRAIN.selectionProbability
    && randomStream(seed ^ 0x454C4556)() < TERRAIN.elevatedBridgeChance;
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
    channels: channels.map((channel, index) => {
      const wetRadius = channel.width / 2 + TERRAIN.waterEdgeInset;
      return {
        base: channel.base,
        phase: channel.phase,
        primaryScale: channel.primaryScale,
        secondaryScale: channel.secondaryScale,
        primaryAmplitude: channel.primaryAmplitude,
        secondaryAmplitude: channel.secondaryAmplitude,
        wetRadius,
        bankPhase: random() * Math.PI * 2,
        elevatedBanks: (level.rivers?.[index]?.bridges || []).filter(bridge => bridge.elevated).map(bridge => ({
          coordinate: -bridge.x * Math.sin(angle) + bridge.z * Math.cos(angle),
          halfWidth: bridge.width / 2 + 1,
        })),
        bridgeCoordinates: (level.rivers?.[index]?.bridges || []).filter(bridge => !bridge.elevated).map(bridge => -bridge.x * Math.sin(angle) + bridge.z * Math.cos(angle)),
      };
    }),
    maximumRelief: TERRAIN.maximumRelief,
    maximumSlopeDegrees: TERRAIN.maximumSlopeDegrees,
  };
  if (Math.abs(TERRAIN.waveWeights.reduce((sum, weight) => sum + weight, 0) - 1) > 1e-12)
    throw new RangeError('terrain: waveWeights must sum to one to preserve the relief budget');
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

// Widen only the local crossing verges; the analytic Gaussian blend keeps
// heights and grades continuous as higher banks return between bridges.
function bankShelf(channel, v) {
  let remaining = 1, derivative = 0;
  for (const coordinate of channel.bridgeCoordinates) {
    const delta = (v - coordinate) / TERRAIN.bridgeBlendLength;
    const weight = Math.exp(-delta * delta / 2);
    derivative = derivative * (1 - weight) + remaining * weight * delta / TERRAIN.bridgeBlendLength;
    remaining *= 1 - weight;
  }
  const range = TERRAIN.bridgeShelfWidth - TERRAIN.bankShelfWidth;
  // Seeded slow variations change ordinary bank grades without sample seams.
  const variation = TERRAIN.bankVariation * Math.sin(v / TERRAIN.bankVariationLength + channel.bankPhase);
  return { value: TERRAIN.bankShelfWidth + variation * remaining + range * (1 - remaining),
    derivative: TERRAIN.bankVariation / TERRAIN.bankVariationLength * Math.cos(v / TERRAIN.bankVariationLength + channel.bankPhase) * remaining
      + variation * derivative - range * derivative };
}

// Odd analytic distance warp: a low-gradient wet verge, then unbounded
// distance so far pasture still reaches its full independent hill relief.
const softplus = value => Math.max(value, 0) + Math.log1p(Math.exp(-Math.abs(value)));
const sigmoid = value => 1 / (1 + Math.exp(-value));
function valleyDistance(distance, radius, shelf) {
  const edge = radius + shelf, blend = TERRAIN.lowlandBlendWidth;
  const t = Math.tanh(distance / radius), amplitude = radius / Math.tanh(1);
  const a = (distance - edge) / blend, b = (-distance - edge) / blend;
  return {
    value: amplitude * t + TERRAIN.bankRiseScale * blend * (softplus(a) - softplus(b)),
    derivative: amplitude * (1 - t * t) / radius + TERRAIN.bankRiseScale * (sigmoid(a) + sigmoid(b)),
    shelfDerivative: TERRAIN.bankRiseScale * (-sigmoid(a) + sigmoid(b)),
  };
}

function smoothRise(value) {
  const t = clamp(value, 0, 1);
  return { value: t ** 3 * (10 - 15 * t + 6 * t * t), derivative: 30 * t * t * (1 - t) ** 2 };
}

/** Region where the compact-bank blend modifies the ordinary valley field.
 * This is a measurement classification, not an occupancy/collision rule.
 * The C2 blend joins the unchanged field at its along-river boundaries.
 */
export function compactBankRegion(level, x, z) {
  const terrain = level?.terrain;
  if (!terrain?.enabled) return false;
  const {u, v} = coordinates(terrain, x, z);
  return terrain.channels.some(channel => {
    const a = v / channel.primaryScale + channel.phase;
    const b = v / channel.secondaryScale + channel.phase;
    const center = channel.base + Math.sin(a) * channel.primaryAmplitude
      + Math.sin(b) * channel.secondaryAmplitude;
    return Math.abs(u - center) > channel.wetRadius + .25
      && channel.elevatedBanks.some(bank =>
        Math.abs(v - bank.coordinate) < bank.halfWidth + TERRAIN.bridgeBlendLength);
  });
}

/** C2 pasture/valley height and exact derivatives, without sample seams. */
function groundSample(level, x, z) {
  const terrain = level?.terrain;
  if (!terrain?.enabled) return { height: 0, dx: 0, dz: 0 };
  const { u, v } = coordinates(terrain, x, z), phases = terrain.phases;
  const [primaryLength, secondaryLength, diagonalLength] = TERRAIN.waveLengths;
  const [primaryWeight, secondaryWeight, diagonalWeight] = TERRAIN.waveWeights;
  const a = u / primaryLength + phases[0];
  const b = v / secondaryLength + phases[1];
  const c = (u + v) / diagonalLength + phases[2];
  // One dominant rounded wave preserves visible crests rather than letting
  // three equally strong directions cancel. Exact derivatives keep every
  // support normal and road/structure join on the same smooth field.
  const lift = TERRAIN.valleyLift + TERRAIN.waveAmplitude * (primaryWeight * Math.sin(a) + secondaryWeight * Math.sin(b) + diagonalWeight * Math.sin(c));
  const liftU = TERRAIN.waveAmplitude * (primaryWeight * Math.cos(a) / primaryLength + diagonalWeight * Math.cos(c) / diagonalLength);
  const liftV = TERRAIN.waveAmplitude * (secondaryWeight * Math.cos(b) / secondaryLength + diagonalWeight * Math.cos(c) / diagonalLength);
  let mask = 1, maskU = 0, maskV = 0;
  for (const channel of terrain.channels) {
    const a = v / channel.primaryScale + channel.phase, b = v / channel.secondaryScale + channel.phase;
    const center = channel.base + Math.sin(a) * channel.primaryAmplitude + Math.sin(b) * channel.secondaryAmplitude;
    const derivative = Math.cos(a) * channel.primaryAmplitude / channel.primaryScale + Math.cos(b) * channel.secondaryAmplitude / channel.secondaryScale;
    const shelf = bankShelf(channel, v);
    const mapped = valleyDistance(u - center, channel.wetRadius, shelf.value);
    const edge = valleyDistance(channel.wetRadius, channel.wetRadius, shelf.value);
    const distance = mapped.value, radiusSquared = edge.value ** 2;
    // Normalize the valley to the water elevation at its physical wet edge.
    // Hill waves may change the outer lift, but cannot expose the river bed.
    const exponent = -Math.log1p(-TERRAIN.waterDepth / lift) / radiusSquared;
    const exponentDerivative = -TERRAIN.waterDepth / (lift * (lift - TERRAIN.waterDepth) * radiusSquared);
    const gaussian = Math.exp(-distance * distance * exponent);
    let nextMask = 1 - gaussian;
    let du = gaussian * (2 * distance * exponent * mapped.derivative + distance * distance * exponentDerivative * liftU);
    const mappedV = -mapped.derivative * derivative + mapped.shelfDerivative * shelf.derivative;
    const exponentV = exponentDerivative * liftV - 2 * exponent * edge.shelfDerivative * shelf.derivative / edge.value;
    let dv = gaussian * (2 * distance * exponent * mappedV + distance * distance * exponentV);
    // Raise dry banks beside selected crossings within a compact setback.
    // Quintic joins leave water untouched and meet the outer field at its
    // actual height and tangent, so decks need no long ramps into pasture.
    const signedDistance = u - center;
    const span = TERRAIN.elevatedBridgeBankSetback - .5;
    const rise = smoothRise((Math.abs(signedDistance) - channel.wetRadius - .25) / span);
    const riseU = rise.derivative * Math.sign(signedDistance) / span;
    for (const bank of channel.elevatedBanks) {
      const delta = v - bank.coordinate;
      const fade = smoothRise((Math.abs(delta) - bank.halfWidth) / TERRAIN.bridgeBlendLength);
      const weight = 1 - fade.value;
      const weightV = -fade.derivative * Math.sign(delta) / TERRAIN.bridgeBlendLength;
      const blend = rise.value * weight * TERRAIN.compactBankLiftFraction;
      const blendU = riseU * weight * TERRAIN.compactBankLiftFraction;
      const blendV = (-riseU * derivative * weight + rise.value * weightV) * TERRAIN.compactBankLiftFraction;
      du = du * (1 - blend) + (1 - nextMask) * blendU;
      dv = dv * (1 - blend) + (1 - nextMask) * blendV;
      nextMask += (1 - nextMask) * blend;
    }
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
  if (bridge.elevated) {
    if (Math.abs(along) >= bridge.length / 2) return groundHeight(level, x, z);
    const lateral = (x - bridge.x) * forwardZ - (z - bridge.z) * forwardX;
    const sample = end => groundSample(level,
      bridge.x + forwardX * end * bridge.length / 2 + forwardZ * lateral,
      bridge.z + forwardZ * end * bridge.length / 2 - forwardX * lateral);
    const a = sample(-1), b = sample(1), t = clamp(along / bridge.length + .5, 0, 1);
    const chord = (b.height - a.height) / bridge.length;
    const nearGrade = a.dx * forwardX + a.dz * forwardZ - chord;
    const farGrade = b.dx * forwardX + b.dz * forwardZ - chord;
    // Match the entire bank cross-section and tangent at both ends. Localized
    // corrections avoid the large central dip of an unconstrained cubic deck.
    const power = TERRAIN.elevatedBridgeTangentPower;
    return a.height * (1 - t) + b.height * t
      + bridge.length * (nearGrade * t * (1 - t) ** power + farGrade * (t - 1) * t ** power)
      + TERRAIN.elevatedBridgeCrown * (4 * t * (1 - t)) ** 2;
  }
  const fraction = clamp(along * 2 / bridge.length, -1, 1);
  // The broad crown clears the complete wet strip; a narrow arch can dip
  // below water near the banks. Both lift and derivative vanish at dry ends.
  // Retain the ground grade rather than adding a flat pad or a landing step.
  return groundHeight(level, x, z) + TERRAIN.bridgeLift * (1 - fraction ** 4) ** 2;
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

