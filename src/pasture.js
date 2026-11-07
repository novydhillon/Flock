import settings from './config/pasture.json' with { type: 'json' };
import { CONFIG_CONTRACTS } from './config/contracts.js';
import { resolveConfig } from './config/resolve.js';

export const PASTURE = resolveConfig(settings, 'pasture', CONFIG_CONTRACTS.pasture);
const SETTINGS = PASTURE;
const distance = (a, b) => Math.hypot(a.x - b.x, a.z - b.z);
function randomStream(seed) {
  let state = seed >>> 0;
  return () => ((state = Math.imul(state, 1664525) + 1013904223 >>> 0) / 4294967296);
}
function segmentDistance(p, a, b) {
  const dx = b.x - a.x, dz = b.z - a.z;
  const t = Math.max(0, Math.min(1, ((p.x - a.x) * dx + (p.z - a.z) * dz) / (dx * dx + dz * dz || 1)));
  return Math.hypot(p.x - a.x - dx * t, p.z - a.z - dz * t);
}
const nearLine = (point, points, reach) => points.slice(1).some((b, i) => segmentDistance(point, points[i], b) < reach);

/** Shared seeded selection: scenery and physical rocks always agree. */
export function roughPastureEnabled(level) {
  if (level.index < 5 || level.showcase) return false;
  let value = ((level.seed ?? 0) ^ Math.imul(level.index + 1, 0x9e3779b9) ^ 0x70617374) >>> 0;
  value = Math.imul(value ^ (value >>> 16), 0x21f0aaad) >>> 0;
  return value / 4294967296 < SETTINGS.roughChance;
}

/** Bias limited detail toward playable trails without tying it to curve sampling. */
function candidates(level, random) {
  const segments = [];
  let total = 0;
  for (const road of level.roads) for (let i = 1; i < road.points.length; i++) {
    const a = road.points[i - 1], b = road.points[i], length = distance(a, b);
    if (length) { total += length; segments.push({a, b, length, end: total, width: road.width}); }
  }
  return (radius, roadside = true) => {
    if (roadside && total) {
      const at = random() * total, segment = segments.find(s => s.end >= at);
      const t = (at - segment.end + segment.length) / segment.length;
      const dx = (segment.b.x - segment.a.x) / segment.length, dz = (segment.b.z - segment.a.z) / segment.length;
      const offset = (segment.width / 2 + radius + 1.0 + random() * 1.2) * (random() < .5 ? -1 : 1);
      return {x: segment.a.x + dx * t * segment.length - dz * offset,
        z: segment.a.z + dz * t * segment.length + dx * offset};
    }
    const b = level.bounds;
    return {x: b.minX + random() * (b.maxX - b.minX), z: b.minZ + random() * (b.maxZ - b.minZ)};
  };
}

/** Dense overlapping rosettes have a loose fringe, with no underlying polygon.
 * Clear tests include the full grass radius, so trails and entrances stay open.
 */
export function pastureGrassSites(level, clear) {
  if (!roughPastureEnabled(level)) return [];
  const random = randomStream(level.seed ^ 0x47524153), candidate = candidates(level, random), anchors = [];
  for (let attempt = 0; attempt < SETTINGS.roughPatches * 18 && anchors.length < SETTINGS.roughPatches; attempt++) {
    const radius = 1.6 + random() * 1.3, point = candidate(radius, attempt % 5 !== 0);
    if (!clear(point.x, point.z, radius + .65) || anchors.some(p => distance(p, point) < (p.radius + radius) * .8)) continue;
    anchors.push({...point, radius});
  }
  const sites = [];
  if (!anchors.length) return sites;
  for (let i = 0; i < SETTINGS.roughClumps * 2 && sites.length < SETTINGS.roughClumps; i++) {
    const anchor = anchors[i % anchors.length], angle = random() * Math.PI * 2;
    // A few low, small clumps beyond the dense core soften its silhouette.
    const fringe = random() < .18, reach = Math.sqrt(random()) * anchor.radius * (fringe ? 1.18 : .92);
    const x = anchor.x + Math.cos(angle) * reach, z = anchor.z + Math.sin(angle) * reach * .72;
    const scale = (fringe ? .52 : .82) + random() * .35;
    if (!clear(x, z, .65 * scale)) continue;
    sites.push({x, z, scale, heading: random() * Math.PI * 2});
  }
  return sites;
}

/** Real circular blockers, added after trees with an independent random stream.
 * Every visible rock fits its collision disk; navigation uses ordinary obstacles.
 */
export function addPastureRocks(level, canPlace) {
  if (!roughPastureEnabled(level)) return;
  const random = randomStream(level.seed ^ 0x524f434b), candidate = candidates(level, random);
  const limit = Math.min(SETTINGS.roughRocks, Math.max(0, 260 - level.obstacles.length));
  let count = 0;
  for (let attempt = 0; attempt < limit * 60 && count < limit; attempt++) {
    const radius = 1.05 + random() * 1.05, point = candidate(radius + 3, attempt % 5 !== 0);
    if (!canPlace(point.x, point.z, radius + 1)) continue;
    if (distance(point, level.spawn) < radius + 18 || distance(point, level.dog) < radius + 12
      || distance(point, level.target) < level.target.radius + radius + 12) continue;
    if (level.animals.some(a => distance(a, point) < radius + 4)) continue;
    if (level.roads.some(road => nearLine(point, road.points, road.width / 2 + radius + 3))) continue;
    if (level.rivers.some(river => nearLine(point, river.points, river.width / 2 + radius + 4))) continue;
    if (level.fenceSegments.some(wall => segmentDistance(point, wall.a, wall.b) < radius + 4)) continue;
    level.obstacles.push({...point, radius, kind: 'rock', heading: random() * Math.PI * 2,
      height: .65 + random() * .8, variant: count % 3});
    count++;
  }
}
