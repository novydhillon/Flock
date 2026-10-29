import * as THREE from 'three';
import { bakeVegetationShadow } from './vegetation-shadows.js';
import presentationSettings from './config/presentation.json' with { type: 'json' };
import { resolveConfig } from './config/resolve.js';
import { CONFIG_CONTRACTS } from './config/contracts.js';

const SETTINGS = resolveConfig(presentationSettings, 'presentation', CONFIG_CONTRACTS.presentation).waterVegetation;
const CLUMP_RADIUS = 0.28;

// This local sequence never consumes level generation or simulation randomness.
function randomSequence(seed) {
  let state = (seed ^ 0x76e4ad91) >>> 0;
  return () => {
    state = (state + 0x6d2b79f5) >>> 0;
    let value = Math.imul(state ^ (state >>> 15), state | 1);
    value ^= value + Math.imul(value ^ (value >>> 7), value | 61);
    return ((value ^ (value >>> 14)) >>> 0) / 4294967296;
  };
}

const cross = (a, b, c) => (b.x - a.x) * (c.z - a.z) - (b.z - a.z) * (c.x - a.x);
const pointKey = point => `${Math.round(point.x * 1e5)},${Math.round(point.z * 1e5)}`;

function waterSurface(geometry) {
  const positions = geometry.attributes.position;
  const index = geometry.index;
  const triangles = [];
  const edges = new Map();
  let area = 0;
  for (let offset = 0; offset < (index?.count ?? positions.count); offset += 3) {
    const points = Array.from({ length: 3 }, (_, vertex) => {
      const i = index ? index.getX(offset + vertex) : offset + vertex;
      return { x: positions.getX(i), y: positions.getY(i), z: positions.getZ(i) };
    });
    const triangleArea = Math.abs(cross(...points)) / 2;
    if (triangleArea < 1e-8) continue;
    area += triangleArea;
    triangles.push({ points, endArea: area });
    for (let i = 0; i < 3; i++) {
      const a = points[i], b = points[(i + 1) % 3];
      const key = [pointKey(a), pointKey(b)].sort().join('|');
      const previous = edges.get(key);
      if (previous) previous.count++;
      else edges.set(key, { a, b, count: 1 });
    }
  }
  return { triangles, area, banks: [...edges.values()].filter(edge => edge.count === 1) };
}

function distanceToEdge(point, edge) {
  const dx = edge.b.x - edge.a.x, dz = edge.b.z - edge.a.z;
  const lengthSquared = dx * dx + dz * dz;
  const t = Math.max(0, Math.min(1, ((point.x - edge.a.x) * dx + (point.z - edge.a.z) * dz) / lengthSquared));
  return Math.hypot(point.x - edge.a.x - dx * t, point.z - edge.a.z - dz * t);
}

function clearOfBridge(point, bridge) {
  const heading = bridge.heading ?? 0;
  const dx = point.x - bridge.x, dz = point.z - bridge.z;
  const along = dx * Math.sin(heading) + dz * Math.cos(heading);
  const across = dx * Math.cos(heading) - dz * Math.sin(heading);
  return Math.abs(along) > bridge.length / 2 + CLUMP_RADIUS + 0.6 ||
    Math.abs(across) > bridge.width / 2 + CLUMP_RADIUS + 0.6;
}

/** One eligibility roll per body, followed by area sampling biased toward its banks. */
export function waterVegetationSites(geometry, seed, bridges = []) {
  const random = randomSequence(seed);
  if (random() >= SETTINGS.bodyChance) return [];
  const { triangles, banks, area } = waterSurface(geometry);
  if (!triangles.length || !banks.length) return [];
  const count = Math.min(SETTINGS.maximumClumps, Math.max(3, Math.ceil(area / SETTINGS.areaPerClump)));
  const sites = [];
  // Bounded rejection sampling keeps narrow/bridge-covered water cheap and safe.
  for (let attempt = 0; attempt < count * 60 && sites.length < count; attempt++) {
    const choice = random() * area;
    const { points: [a, b, c] } = triangles.find(triangle => choice <= triangle.endArea) ?? triangles.at(-1);
    const u = Math.sqrt(random()), v = random();
    const point = {
      x: a.x * (1 - u) + b.x * u * (1 - v) + c.x * u * v,
      y: a.y * (1 - u) + b.y * u * (1 - v) + c.y * u * v,
      z: a.z * (1 - u) + b.z * u * (1 - v) + c.z * u * v,
    };
    const edgeDistance = Math.min(...banks.map(edge => distanceToEdge(point, edge)));
    // The entire circular clump footprint stays in water, including concave banks.
    if (edgeDistance < CLUMP_RADIUS) continue;
    const acceptance = 0.06 + 0.94 * Math.exp(-(edgeDistance - CLUMP_RADIUS) / SETTINGS.edgeFalloffMeters);
    if (random() > acceptance || !bridges.every(bridge => clearOfBridge(point, bridge))) continue;
    if (sites.some(site => Math.hypot(point.x - site.x, point.z - site.z) < CLUMP_RADIUS * 3)) continue;
    sites.push({ ...point, radius: CLUMP_RADIUS, edgeDistance, reed: random() < 0.55, rotation: random() * Math.PI * 2, scale: 0.8 + random() * 0.4 });
  }
  return sites;
}

/** Standing clay grass and reed clumps, allocated once and owned by one water body. */
export class WaterVegetation {
  constructor(parent, water, seed) {
    this.root = new THREE.Group();
    this.root.name = 'Standing water grass and reeds';
    this.root.position.copy(water.mesh.position);
    this.root.rotation.copy(water.mesh.rotation);
    this.root.scale.copy(water.mesh.scale);
    parent.add(this.root);
    this.sites = waterVegetationSites(water.mesh.geometry, seed, water.bridges);
    this.meshes = [];
    if (!this.sites.length) return;
    const grass = [], stems = [], heads = [];
    for (const [clump, site] of this.sites.entries()) {
      for (let blade = 0; blade < 5; blade++) {
        const angle = site.rotation + blade * Math.PI * 2 / 5;
        const spread = blade === 0 ? 0 : 0.12;
        const height = (site.reed ? SETTINGS.reedHeight : SETTINGS.grassHeight) * site.scale * (0.8 + blade * 0.06);
        const x = site.x + Math.cos(angle) * spread, z = site.z + Math.sin(angle) * spread;
        const pose = { clump, x, z, y: site.y - 0.06 + height / 2, height, angle };
        if (site.reed) {
          stems.push(pose);
          if (blade % 2 === 0) heads.push({ ...pose, y: site.y - 0.06 + height, height: 0.19 * site.scale });
        } else grass.push(pose);
      }
    }
    this.addBatch(grass, new THREE.ConeGeometry(0.055, 1, 4), 0x66864b);
    this.addBatch(stems, new THREE.CylinderGeometry(0.018, 0.025, 1, 4), 0x627b43);
    this.addBatch(heads, new THREE.CylinderGeometry(0.045, 0.045, 1, 5), 0x72513a);
    this.shadow = bakeVegetationShadow(this.root, this.meshes, {
      receiverY: water.mesh.geometry.attributes.position.getY(0),
      receiverGeometry: water.mesh.geometry,
      bridges: water.bridges ?? [],
    });
  }

  addBatch(poses, geometry, color) {
    if (!poses.length) { geometry.dispose(); return; }
    const material = new THREE.MeshStandardMaterial({ color, roughness: 1 });
    const mesh = new THREE.InstancedMesh(geometry, material, poses.length);
    const transform = new THREE.Object3D();
    mesh.userData.shadowGroups = poses.map(pose => pose.clump);
    poses.forEach((pose, index) => {
      transform.position.set(pose.x, pose.y, pose.z);
      transform.rotation.set(0, pose.angle, 0);
      transform.scale.set(1, pose.height, 1);
      transform.updateMatrix();
      mesh.setMatrixAt(index, transform.matrix);
    });
    mesh.castShadow = mesh.receiveShadow = false;
    mesh.computeBoundingSphere();
    this.root.add(mesh);
    this.meshes.push(mesh);
  }

  dispose() {
    this.root.removeFromParent();
    for (const mesh of this.meshes) {
      mesh.dispose();
      mesh.geometry.dispose();
      mesh.material.dispose();
    }
    this.meshes.length = 0;
    if (this.shadow) {
      this.shadow.geometry.dispose();
      this.shadow.material.dispose();
      this.shadow = null;
    }
    this.root.clear();
  }
}
