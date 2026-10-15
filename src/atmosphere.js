import * as THREE from 'three';
import { terrainHeight } from './world.js';

/** Overlapping Gaussian puffs composited into one texture, so their alpha does
 * not stack into opaque model silhouettes. Transparent borders hide the plane. */
export function cloudTexture() {
  const size = 64, data = new Uint8Array(size * size * 4);
  const blobs = [[-.36, .06, .3], [0, -.12, .38], [.36, .08, .3], [.05, .27, .26]];
  for (let y = 0; y < size; y++) for (let x = 0; x < size; x++) {
    const u = (x + .5) / size * 2 - 1, v = (y + .5) / size * 2 - 1;
    let alpha = 0;
    for (const [cx, cy, r] of blobs) alpha += Math.exp(-((u - cx) ** 2 + (v - cy) ** 2) / (r * r) * 2);
    const border = Math.max(0, Math.min(1, (1 - Math.abs(u)) * 9, (1 - Math.abs(v)) * 9));
    const i = (y * size + x) * 4;
    data[i] = data[i + 1] = data[i + 2] = 255;
    data[i + 3] = Math.round(255 * Math.min(1, alpha) * border);
  }
  const texture = new THREE.DataTexture(data, size, size); texture.needsUpdate = true;
  texture.minFilter = texture.magFilter = THREE.LinearFilter;
  return texture;
}
export class Atmosphere {
  constructor(scene) {
    this.root = new THREE.Group(); this.root.name = 'Soft weather atmosphere'; scene.add(this.root);
    this.resources = new Set(); this.clouds = []; this.transform = new THREE.Object3D(); this.time = 0;
  }
  own(resource) { this.resources.add(resource); return resource; }
  clear() {
    this.root.traverse(o => { if (o.isInstancedMesh) o.dispose(); });
    this.root.clear(); for (const resource of this.resources) resource.dispose();
    this.resources.clear(); this.clouds = []; this.cloudMesh = this.shadowMesh = null; this.level = null;
  }
  setLevel(level, weather) {
    this.clear(); this.level = level; this.time = 0;
    const texture = this.own(cloudTexture()), geometry = this.own(new THREE.PlaneGeometry(1, 1));
    const cloud = this.own(new THREE.MeshBasicMaterial({ color: '#fffaf0', map: texture, transparent: true,
      opacity: .12, depthWrite: false, side: THREE.DoubleSide }));
    const shadow = this.own(new THREE.MeshBasicMaterial({ color: '#38553c', map: texture, transparent: true,
      opacity: .1, depthWrite: false, side: THREE.DoubleSide }));
    this.cloudMesh = new THREE.InstancedMesh(geometry, cloud, 10);
    this.shadowMesh = new THREE.InstancedMesh(geometry, shadow, 10);
    for (const mesh of [this.cloudMesh, this.shadowMesh]) {
      mesh.frustumCulled = false; mesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage); this.root.add(mesh);
    }
    const b = level.bounds, width = b.maxX - b.minX, depth = b.maxZ - b.minZ;
    let seed = ((level.seed || 42) + 17081) >>> 0;
    const random = () => ((seed = Math.imul(seed, 1664525) + 1013904223 >>> 0) / 4294967296);
    // Fixed capacity; worsening cover expands these softly textured clusters.
    for (let i = 0; i < 10; i++) this.clouds.push({ x: b.minX + ((i % 5 + .45 + random() * .1) / 5) * width,
      z: b.minZ + ((Math.floor(i / 5) + .45 + random() * .1) / 2) * depth,
      y: 13 + random() * 3, scale: Math.min(8 + random() * 4, width / 5 * .38, depth / 2 * .4), phase: random() * Math.PI * 2 });
    this.update(0, { weather });
  }
  update(dt, { weather = {}, camera, paused = false } = {}) {
    if (!this.level || paused) return;
    const step = Number.isFinite(dt) ? Math.max(0, dt) : 0; this.time += step;
    const coverage = Math.max(0, Math.min(1, weather.cloudCoverage ?? .22));
    // No storm opacity exception: at most .12 per cluster (two overlapping
    // clusters composite to .226), increasing coverage through area instead.
    this.cloudMesh.material.opacity = .1 + coverage * .02;
    this.shadowMesh.material.opacity = .1 + coverage * .1;
    this.cloudMesh.material.color.set('#fffaf0').lerp(new THREE.Color('#d9e2e4'), coverage);
    const b = this.level.bounds, width = b.maxX - b.minX;
    for (let i = 0; i < this.clouds.length; i++) {
      const c = this.clouds[i]; c.x = b.minX + ((c.x - b.minX + step * (.25 + (weather.windIntensity || 0) * .7)) % width + width) % width;
      const scale = c.scale * (.6 + coverage * 1.2), transform = this.transform;
      transform.position.set(c.x, c.y + Math.sin(this.time * .08 + c.phase) * .2, c.z);
      if (camera) transform.quaternion.copy(camera.quaternion); else transform.rotation.set(-Math.PI / 2, 0, 0);
      transform.scale.set(scale * 1.7, scale, 1); transform.updateMatrix(); this.cloudMesh.setMatrixAt(i, transform.matrix);
      transform.position.set(c.x + 1.5, terrainHeight(this.level, c.x + 1.5, c.z + 1) + .045, c.z + 1);
      transform.rotation.set(-Math.PI / 2, 0, 0); transform.scale.set(scale * 1.9, scale * 1.2, 1);
      transform.updateMatrix(); this.shadowMesh.setMatrixAt(i, transform.matrix);
    }
    this.cloudMesh.instanceMatrix.needsUpdate = this.shadowMesh.instanceMatrix.needsUpdate = true;
  }
  dispose() { this.clear(); this.root.removeFromParent(); }
}
