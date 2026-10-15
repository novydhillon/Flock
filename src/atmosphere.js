import * as THREE from 'three';
import { terrainHeight } from './world.js';

export function cloudTexture() {
  const size = 64, data = new Uint8Array(size * size * 4);
  const blobs = [[-.36, .06, .3], [0, -.12, .38], [.36, .08, .3], [.05, .27, .26]];
  for (let y = 0; y < size; y++) for (let x = 0; x < size; x++) {
    const u = (x + .5) / size * 2 - 1, v = (y + .5) / size * 2 - 1;
    let alpha = 0; for (const [cx, cy, r] of blobs) alpha += Math.exp(-((u - cx) ** 2 + (v - cy) ** 2) / (r * r) * 2);
    const border = Math.max(0, Math.min(1, (1 - Math.abs(u)) * 9, (1 - Math.abs(v)) * 9)), i = (y * size + x) * 4;
    data[i] = data[i + 1] = data[i + 2] = 255; data[i + 3] = Math.round(255 * Math.min(1, alpha) * border);
  }
  const texture = new THREE.DataTexture(data, size, size); texture.needsUpdate = true; texture.minFilter = texture.magFilter = THREE.LinearFilter; return texture;
}

const CLOUD_COLS = 8, CLOUD_ROWS = 6, CLOUD_COUNT = CLOUD_COLS * CLOUD_ROWS;
export class Atmosphere {
  constructor(scene) { this.root = new THREE.Group(); this.root.name = 'Soft weather atmosphere'; scene.add(this.root); this.resources = new Set(); this.clouds = []; this.transform = new THREE.Object3D(); this.time = 0; }
  own(resource) { this.resources.add(resource); return resource; }
  clear() { this.root.traverse(o => { if (o.isInstancedMesh) o.dispose(); }); this.root.clear(); for (const resource of this.resources) resource.dispose(); this.resources.clear(); this.clouds = []; this.cloudMesh = this.shadowMesh = null; this.level = null; }
  setLevel(level, weather) {
    this.clear(); this.level = level; this.time = 0;
    const texture = this.own(cloudTexture()), geometry = this.own(new THREE.PlaneGeometry(1, 1));
    const cloud = this.own(new THREE.MeshBasicMaterial({ color: '#fffaf0', map: texture, transparent: true, opacity: .13, depthWrite: false, side: THREE.DoubleSide, forceSinglePass: true }));
    const shadow = this.own(new THREE.MeshBasicMaterial({ color: '#38553c', map: texture, transparent: true, opacity: .11, depthWrite: false, side: THREE.DoubleSide, forceSinglePass: true }));
    this.cloudMesh = new THREE.InstancedMesh(geometry, cloud, CLOUD_COUNT); this.shadowMesh = new THREE.InstancedMesh(geometry, shadow, CLOUD_COUNT);
    for (const mesh of [this.cloudMesh, this.shadowMesh]) { mesh.frustumCulled = false; mesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage); this.root.add(mesh); }
    let seed = ((level.seed || 42) + 17081) >>> 0; const random = () => ((seed = Math.imul(seed, 1664525) + 1013904223 >>> 0) / 4294967296);
    for (let i = 0; i < CLOUD_COUNT; i++) this.clouds.push({ phase: random() * Math.PI * 2, drift: random() * 2 - 1, offsetX: random() - .5, offsetZ: random() - .5, scale: .72 + random() * .5 });
    this.update(0, { weather });
  }
  /** Intersect the four orthographic viewport rays with the cloud-height plane. */
  projectedFootprint(camera, y = 13) {
    if (!camera) { const b = this.level.bounds; return { minX: b.minX, maxX: b.maxX, minZ: b.minZ, maxZ: b.maxZ }; }
    camera.updateMatrixWorld(true); const points = [], raycaster = new THREE.Raycaster(), plane = new THREE.Plane(new THREE.Vector3(0, 1, 0), -y);
    for (const [x, z] of [[-1,-1],[-1,1],[1,-1],[1,1]]) {
      raycaster.setFromCamera(new THREE.Vector2(x, z), camera);
      const hit = raycaster.ray.intersectPlane(plane, new THREE.Vector3());
      if (hit) points.push(hit);
    }
    if (points.length !== 4) return this.projectedFootprint(null, y);
    return { minX: Math.min(...points.map(p => p.x)), maxX: Math.max(...points.map(p => p.x)), minZ: Math.min(...points.map(p => p.z)), maxZ: Math.max(...points.map(p => p.z)) };
  }
  projectedPoint(camera, nx, ny, y = 13) {
    const raycaster = new THREE.Raycaster(); raycaster.setFromCamera(new THREE.Vector2(nx, ny), camera);
    return raycaster.ray.intersectPlane(new THREE.Plane(new THREE.Vector3(0, 1, 0), -y), new THREE.Vector3());
  }
  update(dt, { weather = {}, camera, paused = false } = {}) {
    if (!this.level) return;
    const step = paused ? 0 : Number.isFinite(dt) ? Math.max(0, dt) : 0; this.time += step;
    const coverage = Math.max(0, Math.min(1, weather.cloudCoverage ?? .22));
    this.cloudMesh.material.opacity = .13 + coverage * .05; this.shadowMesh.material.opacity = .11 + coverage * .1;
    this.cloudMesh.material.color.set('#fffaf0').lerp(new THREE.Color('#d9e2e4'), coverage);
    const bounds = this.projectedFootprint(camera);
    const grid = box => {
      const padX = Math.max(1, (box.maxX - box.minX) * .02), padZ = Math.max(1, (box.maxZ - box.minZ) * .02);
      const minX = box.minX - padX, maxX = box.maxX + padX, minZ = box.minZ - padZ, maxZ = box.maxZ + padZ;
      return { minX, minZ, dx: (maxX - minX) / CLOUD_COLS, dz: (maxZ - minZ) / CLOUD_ROWS };
    };
    const skyGrid = grid(bounds), wind = weather.windIntensity || 0;
    const viewWidth = camera?.isOrthographicCamera ? Math.abs(camera.right - camera.left) / camera.zoom : skyGrid.dx * CLOUD_COLS;
    const viewHeight = camera?.isOrthographicCamera ? Math.abs(camera.top - camera.bottom) / camera.zoom : skyGrid.dz * CLOUD_ROWS;
    for (let i = 0; i < CLOUD_COUNT; i++) {
      const c = this.clouds[i], col = i % CLOUD_COLS, row = Math.floor(i / CLOUD_COLS);
      const speed = .35 + Math.min(1, wind) * .65, cellX = 2 / CLOUD_COLS, cellY = 2 / CLOUD_ROWS;
      if (!paused) { c.offsetX = (((c.offsetX + step * speed / (viewWidth / CLOUD_COLS) * (c.drift < 0 ? -1 : 1) + .5) % 1) + 1) % 1 - .5; c.offsetZ = (((c.offsetZ + step * speed * c.drift * .18 / (viewHeight / CLOUD_ROWS) + .5) % 1) + 1) % 1 - .5; }
      const edgeX = col === 0 || col === CLOUD_COLS - 1 ? .5 : 1, edgeY = row === 0 || row === CLOUD_ROWS - 1 ? .5 : 1;
      const ndcX = -1 + 2 * col / (CLOUD_COLS - 1) + c.offsetX * cellX * edgeX;
      const ndcY = -1 + 2 * row / (CLOUD_ROWS - 1) + c.offsetZ * cellY * edgeY;
      const point = camera?.isOrthographicCamera ? this.projectedPoint(camera, ndcX, ndcY, 13) : null;
      const x = point?.x ?? skyGrid.minX + col / (CLOUD_COLS - 1) * (CLOUD_COLS * skyGrid.dx);
      const z = point?.z ?? skyGrid.minZ + row / (CLOUD_ROWS - 1) * (CLOUD_ROWS * skyGrid.dz);
      const width = viewWidth / CLOUD_COLS * 1.55 * c.scale, height = viewHeight / CLOUD_ROWS * 1.55 * c.scale, transform = this.transform;
      transform.position.set(x, 13 + Math.sin(this.time * .08 + c.phase) * .12, z);
      if (camera) transform.quaternion.copy(camera.quaternion); else transform.rotation.set(-Math.PI / 2, 0, 0);
      transform.scale.set(width, height, 1); transform.updateMatrix(); this.cloudMesh.setMatrixAt(i, transform.matrix);
      const groundY = terrainHeight(this.level, x + 7, z - 7), sx = x + (13 - groundY) * 18 / 35, sz = z - (13 - groundY) * 20 / 35;
      const shadowWidth = width * .9, shadowHeight = height * .9;
      transform.position.set(sx, terrainHeight(this.level, sx, sz) + .045, sz); transform.rotation.set(-Math.PI / 2, 0, 0);
      transform.scale.set(shadowWidth, shadowHeight, 1); transform.updateMatrix(); this.shadowMesh.setMatrixAt(i, transform.matrix);
    }
    this.cloudMesh.instanceMatrix.needsUpdate = this.shadowMesh.instanceMatrix.needsUpdate = true;
  }
  dispose() { this.clear(); this.root.removeFromParent(); }
}
