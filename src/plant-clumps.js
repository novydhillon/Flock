import * as THREE from 'three';
import { mergeGeometries } from 'three/addons/utils/BufferGeometryUtils.js';

/** Several narrow blades share one geometry and one instance per clump. */
export function plantClumpGeometry(radius, height, blades = 5) {
  const pieces = [];
  for (let i = 0; i < blades; i++) {
    const angle = i * Math.PI * 2 / blades;
    const bladeHeight = height * (0.72 + (i % 3) * 0.14);
    const geometry = new THREE.ConeGeometry(radius, bladeHeight, 3);
    geometry.translate(Math.cos(angle) * radius * 2, bladeHeight / 2, Math.sin(angle) * radius * 2);
    pieces.push(geometry);
  }
  const result = mergeGeometries(pieces);
  for (const piece of pieces) piece.dispose();
  result.userData.bladesPerClump = blades;
  return result;
}

/** Independent arc-length samples avoid rows tied to river control points. */
export function bankClumpSites(river, random, bounds) {
  const segments = [];
  let total = 0;
  for (let i = 1; i < river.points.length; i++) {
    const a = river.points[i - 1], b = river.points[i];
    const length = Math.hypot(b.x - a.x, b.z - a.z);
    if (length > 0) { segments.push({ a, b, length, start: total }); total += length; }
  }
  const sites = [];
  const count = Math.min(36, Math.ceil(total / 6));
  for (let attempt = 0; attempt < count * 8 && sites.length < count; attempt++) {
    const distance = random() * total;
    const segment = segments.find(s => distance < s.start + s.length);
    if (!segment) continue;
    const { a, b, length, start } = segment;
    const t = (distance - start) / length;
    const dx = (b.x - a.x) / length, dz = (b.z - a.z) / length;
    const offset = (river.width / 2 + 0.65 + random() * 1.1) * (random() < 0.5 ? -1 : 1);
    const x = a.x + dx * length * t - dz * offset;
    const z = a.z + dz * length * t + dx * offset;
    if (x < bounds.minX || x > bounds.maxX || z < bounds.minZ || z > bounds.maxZ) continue;
    if ((river.bridges || []).some(v => Math.hypot(x - v.x, z - v.z) < v.length / 2 + v.width)) continue;
    if (sites.some(p => Math.hypot(x - p.x, z - p.z) < 1.2)) continue;
    sites.push({ x, z });
  }
  return sites;
}
