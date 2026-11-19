import * as THREE from 'three';
import { terrainHeight, terrainNormal } from '../../world/world.js';
import { createWeatherState, stepWeather, weatherForLevel } from '../weather/weather.js';
import {
  birdLandingPositionSafe,
  wildlifeGroundPositionSafe,
  wildlifePopulation,
  wildlifePositionSafe,
  stepWildlife,
} from './wildlife.js';
import { wildlifeParts, wildlifeBodyGeometry, birdWingGeometry } from './wildlife-models.js';
import { arrangeBirdGroups, birdWetFooting } from './bird-behavior.js';
import { birdAirPathClear, birdPerchVisible } from './bird-perches.js';
import { canGrazeAt } from '../animation/grazing.js';
import { meadowSurfaceHeight } from '../terrain-view.js';
import { RainView } from '../weather/rain-view.js';
const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
function seeded(seed) {
  let s = seed >>> 0;
  return () => (s = (Math.imul(s, 1664525) + 1013904223) >>> 0) / 4294967296;
}
export { weatherForLevel, stepWildlife, wildlifePositionSafe as safeWildlifePosition };

/** Wildlife is instanced by anatomical part so even the detailed ground fauna
 * costs a fixed handful of draws. Weather state is shared with the atmosphere. */
export class MeadowNature {
  constructor(scene) {
    this.scene = scene;
    this.root = new THREE.Group();
    this.root.name = 'Meadow nature';
    scene.add(this.root);
    this.resources = new Set();
    this.time = 0;
    this.wildlife = [];
    this.batches = {};
    this.transform = new THREE.Object3D();
    this.birdRoot = new THREE.Matrix4();
    this.birdFeetRoot = new THREE.Matrix4();
    this.birdHeadRoot = new THREE.Matrix4();
    this.callFrustum = new THREE.Frustum();
    this.callProjection = new THREE.Matrix4();
    this.callPosition = new THREE.Vector3();
    this.birdCalls = [];
    this.birdFrame = { birds: [], perches: null };
    this.partMatrix = new THREE.Matrix4();
  }
  own(r) {
    this.resources.add(r);
    return r;
  }
  clear() {
    this.root.traverse((o) => {
      if (o.isInstancedMesh) o.dispose();
    });
    this.root.clear();
    this.resources.forEach((r) => r.dispose());
    this.resources.clear();
    this.rainView?.dispose();
    this.rainView = null;
    this.wildlife = [];
    this.batches = {};
    this.precipitation = null;
    this.birdCalls.length = 0;
    this.birdFrame = { birds: [], perches: null };
  }
  batch(name, geo, mat, count) {
    const m = new THREE.InstancedMesh(geo, mat, count);
    m.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
    m.frustumCulled = false;
    m.castShadow = m.receiveShadow = true;
    this.root.add(m);
    this.batches[name] = m;
    return m;
  }
  setLevel(level, perches = null, wetGround, weather = createWeatherState(level)) {
    this.clear();
    this.level = level;
    this.time = 0;
    this.weather = weather;
    const rand = seeded((level.seed || 42) + 71053),
      b = level.bounds,
      w = b.maxX - b.minX,
      d = b.maxZ - b.minZ,
      threats = [level.dog || level.spawn, ...(level.animals || [])].filter(Boolean);
    const sphere = this.own(new THREE.SphereGeometry(1, 10, 8));
    const counts = wildlifePopulation(level);
    const kinds = ['butterfly', 'bird', 'squirrel', 'rabbit'];
    for (const kind of kinds) {
      const count = counts[kind] || 0;
      if (!count) continue;
      for (let i = 0; i < count; i++) {
        let p = null;
        for (let attempt = 0; attempt < 240; attempt++) {
          const route = (level.roads || []).flatMap((r) => r.points || [r.from, r.to]).filter(Boolean),
            anchor = attempt < 120 && route.length ? route[Math.floor(rand() * route.length)] : null,
            ang = rand() * Math.PI * 2,
            off = 8 + rand() * 13,
            candidate = anchor
              ? { x: anchor.x + Math.cos(ang) * off, z: anchor.z + Math.sin(ang) * off }
              : { x: b.minX + 2 + rand() * (w - 4), z: b.minZ + 2 + rand() * (d - 4) };
          if (wildlifePositionSafe(level, candidate, threats, 0.5)) {
            p = candidate;
            break;
          }
        }
        if (kind === 'bird' && p) {
          const safeStart = (point) => {
            if (birdWetFooting(wetGround, point.x, point.z) || !birdLandingPositionSafe(level, point)) return false;
            const y = terrainHeight(level, point.x, point.z);
            return birdAirPathClear(level, perches, { ...point, y }, { ...point, y: y + 0.9 });
          };
          if (!safeStart(p)) {
            p = null;
            const birdRand = seeded((level.seed || 42) ^ Math.imul(i + 1, 1750606043));
            for (let attempt = 0; attempt < 40 && !p; attempt++) {
              const candidate = { x: b.minX + 2 + birdRand() * (w - 4), z: b.minZ + 2 + birdRand() * (d - 4) };
              if (wildlifePositionSafe(level, candidate, threats, 0) && safeStart(candidate)) p = candidate;
            }
          }
        }
        this.wildlife.push({
          kind,
          slot: i,
          x: p?.x ?? 0,
          z: p?.z ?? 0,
          homeX: p?.x ?? 0,
          homeZ: p?.z ?? 0,
          phase: rand() * Math.PI * 2,
          heading: rand() * Math.PI * 2,
          visible: !!p,
          gait: 0,
          hidden: false,
          hideTimer: 0,
        });
      }
    }
    this.birdFrame = {
      birds: this.wildlife.filter((animal) => animal.kind === 'bird' && animal.visible),
      perches,
      wetGround,
    };
    arrangeBirdGroups(level, this.birdFrame.birds, perches, threats, wildlifeGroundPositionSafe, wetGround);
    if (counts.bird) {
      const parts = wildlifeParts.bird,
        body = this.batch(
          'birdBody',
          sphere,
          this.own(new THREE.MeshStandardMaterial({ roughness: 0.94 })),
          counts.bird * parts.length,
        );
      for (let i = 0; i < counts.bird; i++)
        for (let j = 0; j < parts.length; j++) body.setColorAt(i * parts.length + j, new THREE.Color(parts[j].color));
      this.batch(
        'birdWing',
        this.own(birdWingGeometry()),
        this.own(new THREE.MeshStandardMaterial({ vertexColors: true, roughness: 0.94 })),
        counts.bird * 2,
      );
    }
    if (counts.butterfly) {
      this.batch(
        'butterflyBody',
        sphere,
        this.own(new THREE.MeshStandardMaterial({ color: '#65523f', roughness: 1 })),
        counts.butterfly,
      );
      this.batch(
        'butterflyWing',
        sphere,
        this.own(new THREE.MeshStandardMaterial({ color: '#f2ac75', roughness: 1 })),
        counts.butterfly * 2,
      );
    }
    for (const kind of ['squirrel', 'rabbit']) {
      const count = counts[kind] || 0;
      if (!count) continue;
      this.batch(
        `${kind}Body`,
        this.own(wildlifeBodyGeometry(kind)),
        this.own(new THREE.MeshStandardMaterial({ vertexColors: true, roughness: 0.94 })),
        count,
      );
      const pawColor = kind === 'squirrel' ? '#74503b' : '#b09b7c';
      this.batch(
        `${kind}Paw`,
        sphere,
        this.own(new THREE.MeshStandardMaterial({ color: pawColor, roughness: 0.94 })),
        count * wildlifeParts[kind].filter((part) => part.part === 'paw').length,
      );
    }
    this.rainView = new RainView(this.root);
    this.update(0, { dog: level.dog || level.spawn, animals: level.animals });
  }
  pose(batch, i, x, y, z, sx, sy, sz, heading = 0, roll = 0, pitch = 0) {
    const t = this.transform;
    t.position.set(x, y, z);
    t.rotation.set(pitch, heading, roll);
    t.scale.set(sx, sy, sz);
    t.updateMatrix();
    batch.setMatrixAt(i, t.matrix);
  }
  hideParts(a) {
    if (a.kind === 'bird' || a.kind === 'butterfly') {
      const stride = a.kind === 'bird' ? wildlifeParts.bird.length : 1;
      for (let k = 0; k < stride; k++)
        this.pose(this.batches[`${a.kind}Body`], a.slot * stride + k, 0, -100, 0, 0, 0, 0);
      for (let k = 0; k < 2; k++) this.pose(this.batches[`${a.kind}Wing`], a.slot * 2 + k, 0, -100, 0, 0, 0, 0);
    } else {
      this.pose(this.batches[`${a.kind}Body`], a.slot, 0, -100, 0, 0, 0, 0);
      const stride = wildlifeParts[a.kind].filter((part) => part.part === 'paw').length;
      for (let k = 0; k < stride; k++)
        this.pose(this.batches[`${a.kind}Paw`], a.slot * stride + k, 0, -100, 0, 0, 0, 0);
    }
  }
  poseBird(a, now) {
    const state = a.birdState || 'forage',
      visibility = Math.max(0.06, 1 - (a.shelter || 0) * 0.94),
      landing = state === 'landing' ? clamp((a.birdStateTime || 0) / a.landingDuration, 0, 1) : 0;
    const perched = state === 'perched' || state === 'perchedChirp';
    const flightPhase =
      state === 'forage' || perched
        ? 0
        : state === 'takeoff'
          ? clamp((a.birdStateTime || 0) / 0.18, 0, 1)
          : state === 'landing'
            ? clamp((1 - landing) * 4, 0, 1)
            : 1;
    const support = a.perch || a.landing?.anchor;
    const ground = terrainHeight(this.level, a.x, a.z);
    const altitude = a.altitude || 0;
    const wingSupport = support || a.takeoffExit;
    const flight = wingSupport
      ? Math.min(flightPhase, Math.hypot(a.x - wingSupport.x, ground + altitude - wingSupport.y, a.z - wingSupport.z))
      : flightPhase;
    const groundBlend = support ? 0 : clamp(1 - altitude / 0.38, 0, 1);
    const groundOffset =
      groundBlend && canGrazeAt(this.level, a) ? (meadowSurfaceHeight(this.level, a.x, a.z) - ground) * groundBlend : 0;
    const y = ground + groundOffset + altitude + (a.hopHeight || 0),
      pitch =
        state === 'forage'
          ? (a.peck || 0) * 0.76
          : state === 'takeoff'
            ? -0.18 * flight
            : state === 'landing'
              ? -0.12 * flight
              : perched
                ? 0
                : -0.035;
    const t = this.transform;
    t.position.set(a.x, y, a.z);
    t.rotation.set(0, a.heading || 0, 0);
    const supportNormal =
      support?.normal ||
      (state === 'forage' && this.level.terrain?.enabled ? terrainNormal(this.level, a.x, a.z) : null);
    if (supportNormal && flight === 0) {
      const normal = supportNormal;
      const sine = Math.sin(a.heading || 0),
        cosine = Math.cos(a.heading || 0);
      const rightGrade = -(normal.x * cosine - normal.z * sine) / normal.y;
      const forwardGrade = -(normal.x * sine + normal.z * cosine) / normal.y;
      t.rotation.order = 'YXZ';
      t.rotation.x = -Math.atan(forwardGrade);
      t.rotation.z = Math.atan(rightGrade);
    }
    t.scale.setScalar(visibility);
    t.updateMatrix();
    this.birdFeetRoot.copy(t.matrix);
    // Local pitch follows heading; feet keep their support while the body pecks.
    t.position.set(0, 0, 0);
    const gesture = perched ? a.gestureAmount || 0 : 0;
    t.rotation.set(pitch, 0, a.perchedGesture === 'ruffle' ? gesture * 0.13 : 0);
    t.scale.setScalar(1);
    t.updateMatrix();
    this.birdRoot.multiplyMatrices(this.birdFeetRoot, t.matrix);
    // The head, beak and eyes share a neck pivot so they never separate.
    t.position.set(0, 0.34, 0.126);
    const singing = state === 'perchedChirp' ? Math.sin((a.birdStateTime / 0.55) * Math.PI) : 0;
    t.rotation.set(
      a.perchedGesture === 'preen' ? gesture * 0.7 : singing * -0.18,
      a.perchedGesture === 'preen' ? gesture * 0.94 : 0,
      a.perchedGesture === 'tilt' ? gesture * 0.46 : 0,
    );
    t.updateMatrix();
    this.birdHeadRoot.multiplyMatrices(this.birdRoot, t.matrix);
    const parts = wildlifeParts.bird;
    for (let j = 0; j < parts.length; j++) {
      const p = parts[j];
      const headPart = p.part === 'head' || p.part === 'beak' || p.part === 'eye';
      const footPart = p.part === 'foot' || p.part === 'leg';
      t.position.set(...p.at);
      // Match the grip footprint validated for this support as the wings fold.
      if (footPart) t.position.z -= (1 - flight) * (support?.footInset || 0);
      if (headPart) {
        t.position.y -= 0.34;
        t.position.z -= 0.126;
      }
      t.rotation.set(p.tilt || 0, 0, 0);
      t.scale.set(...p.scale);
      t.updateMatrix();
      this.partMatrix.multiplyMatrices(
        footPart ? this.birdFeetRoot : headPart ? this.birdHeadRoot : this.birdRoot,
        t.matrix,
      );
      this.batches.birdBody.setMatrixAt(a.slot * parts.length + j, this.partMatrix);
    }
    for (let j = 0; j < 2; j++) {
      const side = j ? 1 : -1,
        flap = 0.18 + Math.sin(now * 13 + a.phase) * 0.7;
      // Geometry begins at its shoulder. Mirrored, bounded hinge rotations lift
      // both tips together and fold them back along the body on dry ground.
      t.position.set(side * 0.105, 0.28, 0);
      const ruffle = a.perchedGesture === 'ruffle' ? gesture * 0.22 : 0;
      t.rotation.set(
        0,
        side * ((1 - flight) * 1.35 + ruffle),
        (j ? 0 : Math.PI) + side * ((1 - flight) * -0.11 + flight * flap + ruffle),
      );
      t.scale.setScalar(1);
      t.updateMatrix();
      this.partMatrix.multiplyMatrices(this.birdRoot, t.matrix);
      this.batches.birdWing.setMatrixAt(a.slot * 2 + j, this.partMatrix);
    }
  }
  advanceWeather(dt, paused = false) {
    const step = !this.level || paused ? 0 : clamp(Number(dt) || 0, 0, 0.1);
    this.time += step;
    if (this.level) stepWeather(this.weather, step);
    return step;
  }
  update(dt, frame = {}) {
    this.updateEffects(this.advanceWeather(dt, frame.paused), frame);
  }
  updateEffects(dt, { dog, animals = [], camera, paused = false } = {}) {
    this.birdCalls.length = 0;
    if (!this.level) return;
    const now = this.time,
      threats = [dog, ...animals, ...(this.level.helpers || [])].filter(Boolean);
    let callCameraReady = false;
    for (const a of this.wildlife) {
      if (a.visible) {
        stepWildlife(this.level, a, dt, threats, now, this.weather, wildlifeGroundPositionSafe, this.birdFrame);
      }
      if (!a.visible || a.hidden) {
        this.hideParts(a);
        continue;
      }
      if (a.kind === 'bird') {
        this.poseBird(a, now);
        if (dt > 0 && a.call && a.perch) {
          if (camera && !callCameraReady) {
            camera.updateMatrixWorld();
            this.callProjection.multiplyMatrices(camera.projectionMatrix, camera.matrixWorldInverse);
            this.callFrustum.setFromProjectionMatrix(this.callProjection);
            callCameraReady = true;
          }
          const { x, y, z } = a.perch;
          if (
            !camera ||
            (this.callFrustum.containsPoint(this.callPosition.set(x, y + 0.38, z)) &&
              birdPerchVisible(this.birdFrame.perches, camera, a.perch))
          )
            this.birdCalls.push({ x, y, z });
        }
        continue;
      }
      const flying = a.kind === 'butterfly',
        squirrel = a.kind === 'squirrel',
        rabbit = a.kind === 'rabbit';
      const gaitPhase = (((a.gait || 0) % 1) + 1) % 1,
        airborne = gaitPhase < 0.54,
        hop =
          rabbit && a.moving && airborne
            ? Math.sin((gaitPhase / 0.54) * Math.PI) * 0.24
            : squirrel && a.moving
              ? Math.abs(Math.sin(gaitPhase * Math.PI * 2)) * 0.1
              : 0,
        visibility = Math.max(0.06, 1 - (a.shelter || 0) * 0.94),
        y =
          (squirrel ? 0.12 : rabbit ? 0.04 : flying ? 3.2 : 1) +
          terrainHeight(this.level, a.x, a.z) +
          (flying ? Math.sin(now * 2 + a.phase) * 0.28 : hop) +
          (a.alert ? 0.08 : 0);
      if (squirrel || rabbit) {
        const crouch = rabbit && !airborne ? 0.9 : 1,
          hopPitch = rabbit && airborne ? -0.14 * Math.sin((gaitPhase / 0.54) * Math.PI) : 0;
        const bodyRoll = squirrel && a.moving ? Math.sin(gaitPhase * Math.PI * 2) * 0.06 : 0;
        this.pose(
          this.batches[`${a.kind}Body`],
          a.slot,
          a.x,
          y,
          a.z,
          visibility,
          visibility * crouch,
          visibility,
          a.heading,
          bodyRoll,
          hopPitch,
        );
        const paws = wildlifeParts[a.kind].filter((part) => part.part === 'paw');
        for (let j = 0; j < paws.length; j++) {
          const p = paws[j],
            gait = a.moving
              ? rabbit && airborne
                ? Math.sin((gaitPhase / 0.54) * Math.PI) * 0.08
                : Math.sin(gaitPhase * Math.PI * 2 + [0, Math.PI, Math.PI, 0][j]) * 0.07
              : 0,
            localX = p.at[0] * visibility,
            localZ = p.at[2] * visibility,
            x = a.x + Math.cos(a.heading) * localX + Math.sin(a.heading) * localZ,
            z = a.z - Math.sin(a.heading) * localX + Math.cos(a.heading) * localZ;
          this.pose(
            this.batches[`${a.kind}Paw`],
            a.slot * paws.length + j,
            x,
            y + p.at[1] * visibility + gait + terrainHeight(this.level, x, z) - terrainHeight(this.level, a.x, a.z),
            z,
            p.scale[0] * visibility,
            p.scale[1] * visibility,
            p.scale[2] * visibility,
            a.heading,
          );
        }
      } else {
        this.pose(
          this.batches[`${a.kind}Body`],
          a.slot,
          a.x,
          y,
          a.z,
          0.075 * visibility,
          0.06 * visibility,
          0.12 * visibility,
          a.heading,
        );
        for (let side = 0; side < 2; side++) {
          const flap = Math.sin(now * 18 + a.phase) * 0.85;
          this.pose(
            this.batches[`${a.kind}Wing`],
            a.slot * 2 + side,
            a.x + (side ? 1 : -1) * 0.15,
            y + 0.04,
            a.z,
            0.22 * visibility,
            0.025 * visibility,
            0.16 * visibility,
            a.heading,
            (side ? 1 : -1) * flap,
          );
        }
      }
    }
    for (const m of Object.values(this.batches)) m.instanceMatrix.needsUpdate = true;
    this.rainView?.update(dt, { weather: this.weather, camera, paused });
  }
  dispose() {
    this.clear();
    this.scene.remove(this.root);
    this.level = null;
  }
}
