import * as THREE from 'three';

const RAIN_COUNTS = { light: 96, heavy: 176, storm: 256 };
const RAIN_SPEEDS = { light: 16, heavy: 23, storm: 30 };

/** Camera-local, bounded line rain. Each drop has a real world-space length. */
export class RainView {
  constructor(scene) {
    this.root = new THREE.Group(); this.root.name = 'Visible rain'; scene.add(this.root);
    this.geometry = new THREE.BufferGeometry();
    this.material = new THREE.LineBasicMaterial({ color: '#e5f2f4', transparent: true, opacity: .62, depthWrite: false });
    this.lines = new THREE.LineSegments(this.geometry, this.material); this.lines.frustumCulled = false;
    this.root.add(this.lines); this.randomState = 8029; this.positions = new Float32Array(0); this.active = 0; this.anchorX = null; this.anchorZ = null; this.cameraInitialized = false;
  }
  random() { this.randomState = (Math.imul(this.randomState, 1664525) + 1013904223) >>> 0; return this.randomState / 4294967296; }
  rayPoint(camera, nx, ny, y) {
    if (!camera) return new THREE.Vector3(0, y, 0);
    const raycaster = new THREE.Raycaster(); raycaster.setFromCamera(new THREE.Vector2(nx, ny), camera);
    return raycaster.ray.intersectPlane(new THREE.Plane(new THREE.Vector3(0, 1, 0), -y), new THREE.Vector3()) || new THREE.Vector3(0, y, 0);
  }
  resize(count) {
    if (count === this.active) return;
    this.active = count; this.positions = new Float32Array(count * 6);
    this.geometry.setAttribute('position', new THREE.BufferAttribute(this.positions, 3));
    for (let i = 0; i < count; i++) this.positions[i * 6 + 1] = 0;
    this.geometry.attributes.position.needsUpdate = true; this.geometry.setDrawRange(0, count * 2);
  }
  update(dt, { weather = {}, camera, paused = false } = {}) {
    const kind = weather.kind || weather.type;
    const intensity = Math.max(0, Math.min(1, weather.rainIntensity ?? weather.intensity ?? 0));
    const tier = kind === 'storm' || weather.severity >= .78 ? 'storm' : kind === 'heavy-rain' || intensity >= .68 ? 'heavy' : kind === 'rain' && intensity > .02 ? 'light' : null;
    const count = tier ? RAIN_COUNTS[tier] : 0;
    this.resize(count);
    if (!count) return;
    this.material.opacity = tier === 'light' ? .48 : tier === 'heavy' ? .6 : .7;
    const step = paused ? 0 : Math.min(.1, Math.max(0, Number(dt) || 0));
    const wind = Math.max(-8, Math.min(8, weather.windIntensity ?? weather.wind ?? 0));
    const speed = RAIN_SPEEDS[tier];
    camera?.updateMatrixWorld(true);
    const anchor = this.rayPoint(camera, 0, 0, 13), anchorX = anchor.x, anchorZ = anchor.z;
    if (camera && !this.cameraInitialized) { for (let i = 0; i < count; i++) this.positions[i * 6 + 1] = 0; this.cameraInitialized = true; }
    if (this.anchorX !== null) {
      const shiftX = anchorX - this.anchorX, shiftZ = anchorZ - this.anchorZ;
      for (let i = 0; i < count; i++) { const j = i * 6; this.positions[j] += shiftX; this.positions[j + 3] += shiftX; this.positions[j + 2] += shiftZ; this.positions[j + 5] += shiftZ; }
    }
    this.anchorX = anchorX; this.anchorZ = anchorZ;
    for (let i = 0; i < count; i++) {
      const j = i * 6;
      let x = this.positions[j], y = this.positions[j + 1], z = this.positions[j + 2];
      if (y <= 0 || !Number.isFinite(y)) {
        const nx = (this.random() * 1.7) - .85, ny = (this.random() * 1.7) - .85; y = 9 + this.random() * 9;
        const point = this.rayPoint(camera, nx, ny, y); x = point.x; z = point.z;
      }
      x += wind * step; y -= speed * step;
      if (y <= 0) {
        const nx = (this.random() * 1.7) - .85, ny = (this.random() * 1.7) - .85; y = 9 + this.random() * 9;
        const point = this.rayPoint(camera, nx, ny, y); x = point.x; z = point.z;
      }
      const length = tier === 'light' ? .8 : tier === 'heavy' ? 1.3 : 1.8;
      this.positions[j] = x; this.positions[j + 1] = y; this.positions[j + 2] = z;
      this.positions[j + 3] = x + wind * length / speed; this.positions[j + 4] = y - length; this.positions[j + 5] = z;
    }
    this.geometry.attributes.position.needsUpdate = true;
  }
  dispose() { this.geometry.dispose(); this.material.dispose(); this.root.removeFromParent(); }
}
