import * as THREE from 'three';

const RAIN_COUNTS = { light: 96, heavy: 176, storm: 256 };
const RAIN_SPEEDS = { light: 16, heavy: 23, storm: 30 };
const SCREEN_MARGIN = 1.25;

/** Camera-local rain curtain. Its spawn and wrap bounds are outside the viewport. */
export class RainView {
  constructor(scene) {
    this.root = new THREE.Group(); this.root.name = 'Visible rain'; scene.add(this.root);
    this.geometry = new THREE.BufferGeometry();
    // This foreground weather curtain must not disappear behind distant terrain.
    this.material = new THREE.LineBasicMaterial({ color: '#e5f2f4', transparent: true, opacity: .62, depthWrite: false, depthTest: false });
    this.lines = new THREE.LineSegments(this.geometry, this.material); this.lines.frustumCulled = false;
    this.lines.renderOrder = 20;
    this.root.add(this.lines); this.randomState = 8029; this.positions = new Float32Array(0); this.drops = []; this.active = 0;
    this.fallbackCamera = new THREE.OrthographicCamera(-30, 30, 20, -20, .1, 180);
    this.fallbackCamera.position.set(0, 36, 29); this.fallbackCamera.lookAt(0, 0, -2);
  }
  random() { this.randomState = (Math.imul(this.randomState, 1664525) + 1013904223) >>> 0; return this.randomState / 4294967296; }
  resize(count) {
    if (count === this.active) return;
    this.active = count; this.positions = new Float32Array(count * 6);
    // Seed the whole curtain immediately; subsequent drops enter only beyond the top.
    this.drops = Array.from({ length: count }, () => ({ x: (this.random() * 2 - 1) * SCREEN_MARGIN, y: (this.random() * 2 - 1) * SCREEN_MARGIN }));
    this.geometry.setAttribute('position', new THREE.BufferAttribute(this.positions, 3));
    this.geometry.setDrawRange(0, count * 2);
  }
  update(dt, { weather = {}, camera = this.fallbackCamera, paused = false } = {}) {
    const kind = weather.kind || weather.type;
    const intensity = Math.max(0, Math.min(1, weather.rainIntensity ?? weather.intensity ?? 0));
    const tier = kind === 'storm' || weather.severity >= .78 ? 'storm' : kind === 'heavy-rain' || intensity >= .68 ? 'heavy' : kind === 'rain' && intensity > .02 ? 'light' : null;
    this.resize(tier ? RAIN_COUNTS[tier] : 0);
    if (!this.active) return;
    this.material.opacity = tier === 'light' ? .48 : tier === 'heavy' ? .6 : .7;
    const step = paused ? 0 : Math.min(.1, Math.max(0, Number(dt) || 0));
    const requestedWind = Math.max(-8, Math.min(8, weather.windIntensity ?? weather.wind ?? 0));
    const speed = RAIN_SPEEDS[tier];
    // Storm wind is visibly slanted even with the normalized 0..1 weather input.
    const wind = tier === 'storm' ? (requestedWind < 0 ? -1 : 1) * Math.max(10, Math.abs(requestedWind) * 16) : requestedWind * 3;
    const velocity = new THREE.Vector3(wind, -speed, 0);
    const length = tier === 'light' ? .8 : tier === 'heavy' ? 1.3 : 1.8;
    camera.updateMatrixWorld(true);
    const origin = new THREE.Vector3(0, 0, 0).unproject(camera);
    const projectedVelocity = origin.clone().add(velocity).project(camera);
    for (let i = 0; i < this.active; i++) {
      const drop = this.drops[i];
      drop.x += projectedVelocity.x * step; drop.y += projectedVelocity.y * step;
      if (drop.y < -SCREEN_MARGIN) {
        // Keep overshoot so timing remains evenly distributed between frames.
        drop.y += SCREEN_MARGIN * 2;
        drop.x = (this.random() * 2 - 1) * SCREEN_MARGIN;
      }
      if (drop.x > SCREEN_MARGIN) drop.x -= SCREEN_MARGIN * 2;
      if (drop.x < -SCREEN_MARGIN) drop.x += SCREEN_MARGIN * 2;
      const start = new THREE.Vector3(drop.x, drop.y, 0).unproject(camera);
      const end = start.clone().addScaledVector(velocity, length / speed);
      start.toArray(this.positions, i * 6); end.toArray(this.positions, i * 6 + 3);
    }
    this.geometry.attributes.position.needsUpdate = true;
  }
  dispose() { this.geometry.dispose(); this.material.dispose(); this.root.removeFromParent(); }
}
