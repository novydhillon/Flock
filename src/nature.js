import * as THREE from 'three';
import { canOccupy, terrainHeight } from './world.js';

const clamp = (n, lo, hi) => Math.max(lo, Math.min(hi, n));
const distance = (a, b) => Math.hypot(a.x - b.x, a.z - b.z);
function seeded(seed) { let s = seed >>> 0; return () => ((s = Math.imul(s, 1664525) + 1013904223 >>> 0) / 4294967296); }

/** Weather is gentle scenery: it never affects the herd, controls, or rewards. */
export function weatherForLevel(level) {
  const number = (level.index || 0) + 1;
  const requested = typeof level.weather === 'string' ? level.weather : level.weather?.type;
  let type = requested || (number <= 5 ? 'sun' : ['sun', 'wind', 'rain', 'sun', 'snow'][(number - 6) % 5]);
  if (!['sun', 'wind', 'rain', 'snow'].includes(type)) type = 'sun';
  if (type === 'snow' && number <= 8) type = 'sun';
  return { type, intensity: type === 'sun' ? 0 : .3, wind: type === 'wind' ? 1.4 : type === 'rain' ? .65 : .35,
    particles: type === 'rain' ? 128 : type === 'snow' ? 72 : 0,
    clouds: 5, butterflies: type === 'snow' ? 0 : type === 'rain' ? 4 : 8, birds: 5, squirrels: 3 };
}

function routeDistance(level, p) {
  const paths = level.paths || [];
  const lines = paths.length ? paths : (level.roads || []).map(r => r.points || [r.from, r.to]);
  let closest = Infinity;
  for (const line of lines) {
    const points = Array.isArray(line) ? line : line.points || line.waypoints || [];
    for (let i = 1; i < points.length; i++) {
      const a = points[i - 1], b = points[i];
      if (!a || !b) continue;
      const dx = b.x - a.x, dz = b.z - a.z, length = dx * dx + dz * dz;
      const t = length ? clamp(((p.x - a.x) * dx + (p.z - a.z) * dz) / length, 0, 1) : 0;
      closest = Math.min(closest, Math.hypot(p.x - a.x - dx * t, p.z - a.z - dz * t));
    }
  }
  return closest;
}

export function safeWildlifePosition(level, p, threats = []) {
  return canOccupy(level, p.x, p.z, .45) && routeDistance(level, p) > 5.5 && threats.every(t => distance(p, t) > 9);
}

/** Pure motion step used by the scene and tests. Fauna cannot push herd animals. */
export function stepWildlife(level, state, dt, threats = [], time = 0, occupancy = canOccupy) {
  if (!(dt > 0)) return state;
  const b = level.bounds, margin = 2;
  let dx = 0, dz = 0, threatened = false;
  for (const t of threats) {
    const d = distance(state, t), radius = state.kind === 'bird' ? 10 : 8;
    if (d < radius) {
      threatened = true;
      dx += (state.x - t.x) / Math.max(.1, d) * (radius - d);
      dz += (state.z - t.z) / Math.max(.1, d) * (radius - d);
    }
  }
  if (!threatened) {
    const radius = state.kind === 'bird' ? 5 : state.kind === 'squirrel' ? 2 : 3;
    const angle = time * (state.kind === 'squirrel' ? .3 : .35) + state.phase;
    dx = state.homeX + Math.cos(angle) * radius - state.x;
    dz = state.homeZ + Math.sin(angle) * radius - state.z;
  }
  if (Math.hypot(dx, dz) < .01) dx = 1; // Coincident threats still trigger a flight response.
  const length = Math.hypot(dx, dz), speed = threatened ? (state.kind === 'bird' ? 5 : 3.6) : state.kind === 'squirrel' ? .6 : 1.4;
  const travel = Math.min(length, dt * speed);
  const nx = clamp(state.x + dx / length * travel, b.minX + margin, b.maxX - margin);
  const nz = clamp(state.z + dz / length * travel, b.minZ + margin, b.maxZ - margin);
  // Ground critters share world collision; flying ones can clear fences and water.
  if (state.kind !== 'squirrel' || occupancy(level, nx, nz, .4)) { state.x = nx; state.z = nz; }
  else if (occupancy(level, nx, state.z, .4)) state.x = nx;
  else if (occupancy(level, state.x, nz, .4)) state.z = nz;
  else state.phase += dt * 2;
  if (threatened) { state.homeX = state.x; state.homeZ = state.z; }
  state.heading = Math.atan2(dx, dz); state.fleeing = threatened;
  return state;
}

function cloudShadowTexture() {
  const n = 64, data = new Uint8Array(n * n * 4);
  for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) {
    const i = (y * n + x) * 4, d = Math.hypot((x + .5 - n / 2) / (n / 2), (y + .5 - n / 2) / (n / 2));
    data[i] = data[i + 1] = data[i + 2] = 255;
    data[i + 3] = Math.round(255 * Math.pow(Math.max(0, 1 - d), 1.4));
  }
  const texture = new THREE.DataTexture(data, n, n); texture.needsUpdate = true;
  texture.magFilter = THREE.LinearFilter; texture.minFilter = THREE.LinearFilter;
  return texture;
}

function precipitationTexture(snow) {
  const n = 32, data = new Uint8Array(n * n * 4);
  for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) {
    const i = (y * n + x) * 4;
    const alpha = snow ? Math.pow(Math.max(0, 1 - Math.hypot(x - 15.5, y - 15.5) / 15.5), .5)
      : Math.max(0, 1 - Math.abs(x - 15.5) / 3) * Math.sin((y + .5) / n * Math.PI);
    data[i] = data[i + 1] = data[i + 2] = 255; data[i + 3] = alpha * 255;
  }
  const texture = new THREE.DataTexture(data, n, n); texture.needsUpdate = true;
  texture.magFilter = texture.minFilter = THREE.LinearFilter; return texture;
}

/** All nature meshes are batched; no Canvas, network asset, or physics body needed. */
export class MeadowNature {
  constructor(scene) {
    this.scene = scene; this.root = new THREE.Group(); this.root.name = 'Meadow nature'; scene.add(this.root);
    this.resources = new Set(); this.time = 0; this.wildlife = []; this.clouds = []; this.batches = {};
    this.transform = new THREE.Object3D();
  }
  own(resource) { this.resources.add(resource); return resource; }
  clear() {
    this.root.traverse(o => { if (o.isInstancedMesh) o.dispose(); });
    this.root.clear(); this.resources.forEach(r => r.dispose()); this.resources.clear();
    this.wildlife = []; this.clouds = []; this.batches = {}; this.precipitation = null;
  }
  batch(name, geometry, material, count) {
    const batch = new THREE.InstancedMesh(geometry, material, count); batch.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
    batch.frustumCulled = false; this.root.add(batch); this.batches[name] = batch; return batch;
  }
  setLevel(level) {
    this.clear(); this.level = level; this.time = 0; this.weather = weatherForLevel(level);
    const r = seeded((level.seed || 42) + 71053), b = level.bounds, w = b.maxX - b.minX, d = b.maxZ - b.minZ;
    const sphere = this.own(new THREE.SphereGeometry(1, 10, 7));
    const cloudMat = this.own(new THREE.MeshLambertMaterial({ color: '#fffaf0', transparent: true, opacity: .5, depthWrite: false }));
    this.batch('cloud', sphere, cloudMat, this.weather.clouds * 4);
    const shadowMat = this.own(new THREE.MeshBasicMaterial({ color: '#486548', map: this.own(cloudShadowTexture()), transparent: true,
      opacity: .14, depthWrite: false, side: THREE.DoubleSide }));
    this.batch('shadow', this.own(new THREE.PlaneGeometry(1, 1)), shadowMat, this.weather.clouds);
    const route = (level.roads || []).flatMap(road => road.points || [road.from, road.to]).filter(Boolean);
    for (let i = 0; i < this.weather.clouds; i++) {
      const anchor = i === 0 ? level.spawn : route[Math.floor(r() * route.length)];
      this.clouds.push({ x: anchor ? anchor.x + 10 + r() * 6 : b.minX + r() * w,
        z: anchor ? anchor.z - 10 + r() * 18 : b.minZ + r() * d,
        y: 10 + r() * 3, scale: 1.8 + r() * 1.5, phase: r() * 6.28 });
    }
    const threats = [level.dog || level.spawn, ...(level.animals || [])].filter(Boolean);
    for (const [kind, count] of [['butterfly', this.weather.butterflies], ['bird', this.weather.birds], ['squirrel', this.weather.squirrels]]) {
      const bodyColor = kind === 'bird' ? '#54777b' : kind === 'squirrel' ? '#a97552' : '#65523f';
      const wingColor = kind === 'butterfly' ? '#f2ac75' : kind === 'bird' ? '#91adb0' : '#bc8c60';
      this.batch(`${kind}Body`, sphere, this.own(new THREE.MeshStandardMaterial({ color: bodyColor, roughness: 1 })), count);
      this.batch(`${kind}Wing`, sphere, this.own(new THREE.MeshStandardMaterial({ color: wingColor, roughness: 1 })), count * (kind === 'squirrel' ? 1 : 2));
      for (let i = 0; i < count; i++) {
        let p = null;
        for (let attempt = 0; attempt < 180; attempt++) {
          // Prefer the meadow beside the walking route. Sampling only the full
          // expanded bounds made the first minutes of a level feel empty.
          const anchor = attempt < 100 ? (i < 2 && attempt < 40 ? level.spawn : route[Math.floor(r() * route.length)]) : null;
          const angle = r() * Math.PI * 2, offset = 10 + r() * 10;
          const candidate = anchor ? { x: anchor.x + Math.cos(angle) * offset, z: anchor.z + Math.sin(angle) * offset }
            : { x: b.minX + 3 + r() * (w - 6), z: b.minZ + 3 + r() * (d - 6) };
          if (safeWildlifePosition(level, candidate, threats)) { p = candidate; break; }
        }
        // No safe habitat on an unusually constrained map: hide that instance.
        this.wildlife.push({ kind, slot: i, x: p?.x || 0, z: p?.z || 0, homeX: p?.x || 0, homeZ: p?.z || 0,
          phase: r() * 6.28, heading: 0, visible: !!p });
      }
    }
    if (this.weather.particles) {
      this.precipitationData = new Float32Array(this.weather.particles * 3);
      for (let i = 0; i < this.weather.particles; i++) {
        this.precipitationData[i * 3] = (r() - .5) * 34; this.precipitationData[i * 3 + 1] = r() * 13;
        this.precipitationData[i * 3 + 2] = (r() - .5) * 44;
      }
      const geometry = this.own(new THREE.BufferGeometry()); geometry.setAttribute('position', new THREE.BufferAttribute(this.precipitationData, 3));
      const snow = this.weather.type === 'snow';
      const material = this.own(new THREE.PointsMaterial({ color: snow ? '#fffef7' : '#a6c7cf', size: snow ? 3.5 : 7,
        map: this.own(precipitationTexture(snow)), sizeAttenuation: false, transparent: true, opacity: snow ? .8 : .65, depthWrite: false }));
      this.precipitation = new THREE.Points(geometry, material); this.precipitation.frustumCulled = false; this.root.add(this.precipitation);
    }
    this.update(0, { dog: level.dog || level.spawn, animals: level.animals });
  }
  pose(batch, index, x, y, z, sx, sy, sz, heading = 0, roll = 0, pitch = 0) {
    const t = this.transform; t.position.set(x, y, z); t.rotation.set(pitch, heading, roll); t.scale.set(sx, sy, sz); t.updateMatrix(); batch.setMatrixAt(index, t.matrix);
  }
  update(dt, { dog, animals = [], paused = false } = {}) {
    if (!this.level || paused) return;
    dt = clamp(Number(dt) || 0, 0, .1); this.time += dt;
    const b = this.level.bounds, wind = this.weather.wind, now = this.time;
    this.clouds.forEach((c, i) => {
      c.x += dt * wind; if (c.x > b.maxX + 12) c.x = b.minX - 12;
      const z = c.z + Math.sin(now * .06 + c.phase) * 1.5;
      for (let j = 0; j < 4; j++) this.pose(this.batches.cloud, i * 4 + j, c.x + (j - 1.5) * c.scale * .8,
        c.y + Math.sin(j * 2) * .55, z + Math.cos(j * 2) * c.scale * .4, c.scale * 1.2, c.scale * .65, c.scale * .95);
      this.pose(this.batches.shadow, i, c.x + 1.5, .06 + i * .001, z + 1, c.scale * 8, c.scale * 4.8, 1, 0, 0, -Math.PI / 2);
    });
    const threats = [dog, ...animals, ...(this.level.helpers || [])].filter(Boolean);
    for (const a of this.wildlife) {
      if (!a.visible) {
        this.pose(this.batches[`${a.kind}Body`], a.slot, 0, -100, 0, 0, 0, 0);
        const n = a.kind === 'squirrel' ? 1 : 2;
        for (let j = 0; j < n; j++) this.pose(this.batches[`${a.kind}Wing`], a.slot * n + j, 0, -100, 0, 0, 0, 0);
        continue;
      }
      stepWildlife(this.level, a, dt, threats, now);
      const bird = a.kind === 'bird', squirrel = a.kind === 'squirrel';
      const y = squirrel ? .27 + terrainHeight(this.level, a.x, a.z) : bird ? 3.5 + Math.sin(now * 1.5 + a.phase) * .3 + (a.fleeing ? .8 : 0) : 1.1 + Math.sin(now * 2 + a.phase) * .3;
      this.pose(this.batches[`${a.kind}Body`], a.slot, a.x, y, a.z, squirrel ? .22 : .09, squirrel ? .21 : .08, squirrel ? .4 : bird ? .28 : .15, a.heading);
      if (squirrel) {
        this.pose(this.batches.squirrelWing, a.slot, a.x - Math.sin(a.heading) * .4, y + .2, a.z - Math.cos(a.heading) * .4, .18, .44, .22, a.heading, 0, -.55);
      } else for (const side of [-1, 1]) {
        const flap = Math.sin(now * (bird ? 11 : 18) + a.phase) * (bird ? .5 : .85);
        const offset = bird ? .2 : .13;
        this.pose(this.batches[`${a.kind}Wing`], a.slot * 2 + (side > 0 ? 1 : 0), a.x + Math.cos(a.heading) * side * offset,
          y + .04, a.z - Math.sin(a.heading) * side * offset, bird ? .27 : .19, .025, bird ? .2 : .16, a.heading, side * flap);
      }
    }
    for (const batch of Object.values(this.batches)) batch.instanceMatrix.needsUpdate = true;
    if (this.precipitation) {
      const snow = this.weather.type === 'snow', p = this.precipitationData;
      for (let i = 0; i < p.length; i += 3) {
        p[i] += dt * (snow ? wind + Math.sin(now + i) * .4 : wind * 2); p[i + 1] -= dt * (snow ? 1.1 : 9);
        if (p[i + 1] < 0) p[i + 1] = 13;
        if (p[i] > 17) p[i] = -17;
      }
      this.precipitation.position.set(dog?.x || this.level.spawn.x, 0, dog?.z || this.level.spawn.z);
      this.precipitation.geometry.attributes.position.needsUpdate = true;
    }
  }
  dispose() { this.clear(); this.scene.remove(this.root); this.level = null; }
}
