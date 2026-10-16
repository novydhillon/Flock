import { canOccupy } from './world.js';

function seeded(seed) {
  let state = seed >>> 0;
  return () => ((state = Math.imul(state, 1664525) + 1013904223 >>> 0) / 4294967296);
}

function distance(a, b) { return Math.hypot(a.x - b.x, a.z - b.z); }

function segmentDistance(point, a, b) {
  const dx = b.x - a.x, dz = b.z - a.z;
  const t = Math.max(0, Math.min(1, ((point.x - a.x) * dx + (point.z - a.z) * dz) / (dx * dx + dz * dz || 1)));
  return Math.hypot(point.x - a.x - dx * t, point.z - a.z - dz * t);
}

function lineDistance(point, points) {
  let nearest = Infinity;
  for (let i = 1; i < (points || []).length; i++) nearest = Math.min(nearest, segmentDistance(point, points[i - 1], points[i]));
  return nearest;
}

function safeBushPosition(level, point, clearance = .8) {
  const b = level.bounds, target = level.target, spawn = level.spawn;
  if (point.x < b.minX + 2 || point.x > b.maxX - 2 || point.z < b.minZ + 2 || point.z > b.maxZ - 2) return false;
  if (!canOccupy(level, point.x, point.z, clearance)) return false;
  if (spawn && distance(point, spawn) < 14) return false;
  if (target && distance(point, target) < (target.radius || 5) + 11) return false;
  if ((level.roads || []).some(road => lineDistance(point, road.points) < (road.width || 4) / 2 + 2.8)) return false;
  if ((level.rivers || []).some(river => lineDistance(point, river.points) < river.width / 2 + 1.4)) return false;
  if ((level.obstacles || []).some(tree => distance(point, tree) < (tree.radius || 1) + 2.1)) return false;
  if ((level.fenceSegments || []).some(wall => segmentDistance(point, wall.a, wall.b) < 2.8)) return false;
  return true;
}

/**
 * Deterministic, decorative shrub placements for open meadow pockets. Bushes
 * have no collision: every leaf remains outside routes, water, tree trunks,
 * starts, destinations and fence entrances. The result can be passed directly
 * to `createBush(variant)` and the renderer's existing `place` helper.
 */
export function generateBushClusters(level, { seed = (level.seed || 42) + 93371, maxClusters } = {}) {
  const bounds = level.bounds;
  const area = (bounds.maxX - bounds.minX) * (bounds.maxZ - bounds.minZ);
  const naturalCount = Math.max(3, Math.min(24, Math.ceil(area / 1600)));
  const clusterLimit = Math.max(0, Math.min(32, Math.floor(maxClusters ?? naturalCount)));
  const random = seeded(seed);
  const placements = [];
  const anchors = [];
  for (let attempts = 0; attempts < clusterLimit * 90 && anchors.length < clusterLimit; attempts++) {
    const anchor = { x: bounds.minX + 2 + random() * (bounds.maxX - bounds.minX - 4),
      z: bounds.minZ + 2 + random() * (bounds.maxZ - bounds.minZ - 4) };
    if (!safeBushPosition(level, anchor, .85) || anchors.some(other => distance(anchor, other) < 5.5)) continue;
    const count = 3 + Math.floor(random() * 3);
    const cluster = anchors.length;
    const members = [];
    for (let i = 0; i < count; i++) {
      const angle = random() * Math.PI * 2, radius = i === 0 ? 0 : .55 + random() * 1.25;
      const point = { x: anchor.x + Math.cos(angle) * radius, z: anchor.z + Math.sin(angle) * radius };
      if (!safeBushPosition(level, point, .55)) continue;
      members.push({ x: point.x, z: point.z, variant: Math.floor(random() * 3), scale: .66 + random() * .48, cluster });
    }
    if (members.length < 2) continue;
    anchors.push(anchor);
    placements.push(...members);
  }
  return placements;
}
