import test from 'node:test';
import assert from 'node:assert/strict';
import {
  createLevel, canOccupy, hasClearGroundPath, moveBody,
  groundHeight, terrainHeight, terrainNormal, terrainSlope,
  bridgeSurfaceHeight, riverSurfaceHeight, poolingSite,
} from '../src/world.js';
import { createTerrain, TERRAIN } from '../src/terrain.js';
import terrainSettings from '../src/config/terrain.json' with { type: 'json' };
import { CONFIG_CONTRACTS } from '../src/config/contracts.js';
import { resolveConfig } from '../src/config/resolve.js';
import { animalRadius, COW_SCALES } from '../src/animal-size.js';

const degrees = radians => radians * 180 / Math.PI;
const seedsFor = index => [index * 7919 + 42, 200, 201, 202, 203];
const bridgePoint = (bridge, along, lateral = 0) => ({
  x: bridge.x + Math.sin(bridge.heading) * along + Math.cos(bridge.heading) * lateral,
  z: bridge.z + Math.cos(bridge.heading) * along - Math.sin(bridge.heading) * lateral,
});
const finiteGradient = (sample, x, z, step = .001) => ({
  dx: (sample(x + step, z) - sample(x - step, z)) / (2 * step),
  dz: (sample(x, z + step) - sample(x, z - step)) / (2 * step),
});

test('terrain configuration rejects a lowered independent grade cap before gameplay', () => {
  const document = structuredClone(terrainSettings);
  document.maximumSlopeDegrees.value = 5;
  assert.throws(() => resolveConfig(document, 'terrain', CONFIG_CONTRACTS.terrain), /terrain.maximumSlopeDegrees: value is below min 30/);
});

test('terrain is repeatable, leaves layout state untouched, and selects a subset after the first five lessons', () => {
  let rolling = 0, flat = 0;
  for (let index = 0; index < 100; index++) {
    const level = createLevel(index), before = structuredClone(level);
    assert.deepEqual(level, createLevel(index));
    const terrain = createTerrain(level, {
      angle: 0, halfV: 80,
      channels: [{ base: 0, phase: 1, width: 4, primaryScale: 21, secondaryScale: 8, primaryAmplitude: 2.4, secondaryAmplitude: .65 }],
    });
    assert.deepEqual(level, before, 'terrain construction cannot mutate generated layout');
    assert.equal(terrain.enabled, level.terrain.enabled, 'selection depends on its own seed/index only');
    if (index < 5) assert.equal(level.terrain.enabled, false);
    else if (level.terrain.enabled) rolling++;
    else flat++;
  }
  assert.ok(rolling > 0 && flat > 0, 'both smooth and rolling campaign meadows remain');
});

test('every campaign seed and compass orientation keeps continuous relief and grades below the agreed limits', () => {
  for (let index = 0; index < 100; index++) for (const seed of seedsFor(index)) {
    const level = createLevel(index, seed), bounds = level.bounds;
    let minimum = Infinity, maximum = -Infinity;
    const samples = [level.spawn, level.dog, level.target, ...level.boundary];
    for (let x = bounds.minX; x <= bounds.maxX; x += 9) for (let z = bounds.minZ; z <= bounds.maxZ; z += 9) samples.push({ x, z });
    for (const point of samples) {
      const label = `${index}/${seed}/${point.x}/${point.z}`;
      const height = groundHeight(level, point.x, point.z), normal = terrainNormal(level, point.x, point.z);
      minimum = Math.min(minimum, height); maximum = Math.max(maximum, height);
      assert.ok(degrees(terrainSlope(level, point.x, point.z)) <= TERRAIN.maximumSlopeDegrees, `ground grade: ${label}`);
      assert.ok(Math.abs(Math.hypot(normal.x, normal.y, normal.z) - 1) < 1e-12, `unit normal: ${label}`);
      const gradient = finiteGradient((x, z) => groundHeight(level, x, z), point.x, point.z);
      assert.ok(Math.abs(gradient.dx + normal.x / normal.y) < 1e-7 && Math.abs(gradient.dz + normal.z / normal.y) < 1e-7, `smooth shared gradient: ${label}`);
    }
    assert.ok(maximum - minimum <= TERRAIN.maximumRelief, `relief ${index}/${seed}`);
  }
});

test('higher riverbanks return between smooth low-gradient bridge approaches', () => {
  for (const angle of [0, Math.PI / 2, Math.PI, Math.PI * 1.5]) {
    const level = { index: 5, seed: 202, rivers: [{ bridges: [{ x: 0, z: 0 }] }] };
    level.terrain = createTerrain(level, {
      angle, halfV: 80,
      channels: [{ base: 0, phase: 0, width: 5, primaryScale: 21, secondaryScale: 8, primaryAmplitude: 0, secondaryAmplitude: 0 }],
    });
    const point = (u, v) => ({ x: u * Math.cos(angle) - v * Math.sin(angle), z: u * Math.sin(angle) + v * Math.cos(angle) });
    // Compare the same six-metre dry-bank setback, beside and away from the
    // crossing. Water elevation is local so downstream fall cannot fake relief.
    const landing = point(8.5, 0), bank = point(8.5, 40);
    const aboveWater = p => groundHeight(level, p.x, p.z) - riverSurfaceHeight(level, level.rivers[0], p.x, p.z);
    assert.ok(aboveWater(landing) < .15 && degrees(terrainSlope(level, landing.x, landing.z)) < 3, 'gentle crossing verge');
    assert.ok(aboveWater(bank) > .45 && aboveWater(bank) - aboveWater(landing) > .3, 'ordinary banks retain substantial relief');
    assert.ok(degrees(terrainSlope(level, bank.x, bank.z)) > 7, 'ordinary bank is allowed a stronger grade');
    assert.equal(poolingSite(level, bank.x, bank.z, 2).eligible, false, 'higher sloping bank cannot host a large pool');
    for (let v = -30; v <= 30; v += 1.7) {
      const p = point(8.5, v), normal = terrainNormal(level, p.x, p.z);
      const gradient = finiteGradient((x, z) => groundHeight(level, x, z), p.x, p.z);
      assert.ok(Math.abs(gradient.dx + normal.x / normal.y) < 1e-7 && Math.abs(gradient.dz + normal.z / normal.y) < 1e-7, 'exact normal through the crossing-to-bank blend');
    }
  }
});

test('water flows toward the existing first-point current and stays above the full sampled channel bed', () => {
  for (let index = 5; index < 100; index++) for (const seed of seedsFor(index)) {
    const level = createLevel(index, seed);
    if (!level.terrain.enabled) continue;
    for (const river of level.rivers) {
      let previous = -Infinity;
      for (let i = 0; i < river.points.length; i++) {
        const a = river.points[i], water = riverSurfaceHeight(level, river, a.x, a.z);
        assert.ok(water >= previous, `no upstream rise toward first point ${index}/${seed}/${i}`);
        previous = water;
        if (i === river.points.length - 1) continue;
        const b = river.points[i + 1], length = Math.hypot(b.x - a.x, b.z - a.z);
        const nx = (b.z - a.z) / length, nz = -(b.x - a.x) / length;
        for (const t of [0, .5, 1]) for (const side of [-1, -.5, 0, .5, 1]) {
          const x = a.x + (b.x - a.x) * t + nx * river.width / 2 * side;
          const z = a.z + (b.z - a.z) * t + nz * river.width / 2 * side;
          assert.ok(groundHeight(level, x, z) < riverSurfaceHeight(level, river, x, z), `submerged full-width bed ${index}/${seed}/${i}/${side}`);
        }
      }
    }
  }
});

test('rolling bridges clear water and join both graded banks without height or normal discontinuities', () => {
  for (let index = 5; index < 100; index++) for (const seed of seedsFor(index)) {
    const level = createLevel(index, seed);
    if (!level.terrain.enabled) continue;
    for (const river of level.rivers) for (const bridge of river.bridges) {
      for (const side of [-1, 1]) for (const lateral of [-bridge.width / 2 + .05, 0, bridge.width / 2 - .05]) {
        const end = bridgePoint(bridge, side * bridge.length / 2, lateral);
        assert.ok(Math.abs(bridgeSurfaceHeight(level, bridge, end.x, end.z) - groundHeight(level, end.x, end.z)) < 1e-12);
        const inside = bridgePoint(bridge, side * (bridge.length / 2 - .001), lateral);
        const outside = bridgePoint(bridge, side * (bridge.length / 2 + .001), lateral);
        const delta = (terrainHeight(level, outside.x, outside.z) - terrainHeight(level, inside.x, inside.z)) / .002;
        const groundDelta = (groundHeight(level, outside.x, outside.z) - groundHeight(level, inside.x, inside.z)) / .002;
        assert.ok(Math.abs(delta - groundDelta) < .001, `matching landing grade ${index}/${seed}`);
      }
      for (let along = -bridge.length / 2 + .02; along < bridge.length / 2; along += .2) for (const lateral of [-bridge.width / 2 + .05, 0, bridge.width / 2 - .05]) {
        const point = bridgePoint(bridge, along, lateral), gradient = finiteGradient((x, z) => terrainHeight(level, x, z), point.x, point.z);
        assert.ok(degrees(Math.atan(Math.hypot(gradient.dx, gradient.dz))) <= TERRAIN.maximumSlopeDegrees, `deck grade ${index}/${seed}`);
        if (Math.abs(along) <= river.width / 2) assert.ok(terrainHeight(level, point.x, point.z) > riverSurfaceHeight(level, river, point.x, point.z), `dry deck ${index}/${seed}`);
      }
    }
  }
});

test('elevated crossings retain high bank-to-bank support and match the entire landing surface', () => {
  let elevated = 0, short = 0;const orientations = new Set();
  for (let index = 0; index < 100; index++) {
    const level = createLevel(index);
    for (const river of level.rivers) for (const bridge of river.bridges) {
      if (!bridge.elevated) { short++; continue; }
      elevated++;orientations.add(Math.round(level.startHeading / (Math.PI / 2)));
      assert.ok(level.terrain.enabled && index >= 5);
      assert.ok(bridge.length <= river.width + 14, 'higher banks use a bounded physical span');
      for (const lateral of [-bridge.width / 2 + .01, -bridge.width / 4, 0, bridge.width / 4, bridge.width / 2 - .01]) {
        const ends = [-1, 1].map(side => bridgePoint(bridge, side * bridge.length / 2, lateral));
        const heights = ends.map(p => groundHeight(level, p.x, p.z));
        for (const end of ends) {
          assert.ok(groundHeight(level, end.x, end.z) - riverSurfaceHeight(level, river, end.x, end.z) >= .25, 'both complete landing banks are elevated above water');
          assert.ok(Math.abs(bridgeSurfaceHeight(level, bridge, end.x, end.z) - groundHeight(level, end.x, end.z)) < 1e-12);
          const support = finiteGradient((x, z) => terrainHeight(level, x, z), end.x, end.z);
          const ground = finiteGradient((x, z) => groundHeight(level, x, z), end.x, end.z);
          assert.ok(Math.hypot(support.dx - ground.dx, support.dz - ground.dz) < .001, 'both components of the landing normal match');
        }
        for (let along = -bridge.length / 2 + .02; along < bridge.length / 2; along += .25) {
          const point = bridgePoint(bridge, along, lateral), height = terrainHeight(level, point.x, point.z);
          assert.ok(height >= Math.min(...heights) - .13, 'the deck stays near the higher banks instead of descending to the riverbed');
          assert.ok(height > riverSurfaceHeight(level, river, point.x, point.z) + .2, 'elevated support stays clearly above running water');
          const gradient = finiteGradient((x, z) => terrainHeight(level, x, z), point.x, point.z);
          assert.ok(degrees(Math.atan(Math.hypot(gradient.dx, gradient.dz))) < 20, 'higher-bank decks have gentle traversable grades');
        }
      }
    }
  }
  assert.ok(elevated >= 20 && short > elevated, 'the seeded campaign offers both crossing types');
  assert.equal(orientations.size, 4, 'higher-bank crossings work in every compass orientation');
  const demo = createLevel(5);
  assert.ok(demo.rivers[0].bridges.every(bridge => bridge.elevated), 'public level 6 demonstrates higher-bank crossings');
});

test('rolling relief preserves all existing route openings and traversal for every cow size', () => {
  for (let index = 5; index < 100; index++) {
    const level = createLevel(index);
    for (const gate of level.gates) gate.open = true;
    for (const route of level.routes) for (let i = 1; i < route.points.length; i++) {
      const a = route.points[i - 1], b = route.points[i];
      for (const scale of COW_SCALES) {
        const radius = animalRadius({ type: 'cow', scale });
        assert.ok(hasClearGroundPath(level, a, b, radius), `${index}/${route.id}/${i}/${scale}`);
      }
    }
    for (const river of level.rivers) for (const bridge of river.bridges) for (const scale of COW_SCALES) {
      const radius = animalRadius({ type: 'cow', scale }), start = bridgePoint(bridge, -bridge.length / 2 - 1), end = bridgePoint(bridge, bridge.length / 2 + 1);
      const body = { ...start };
      assert.ok(canOccupy(level, body.x, body.z, radius));
      moveBody(level, body, end.x - start.x, end.z - start.z, radius);
      assert.ok(Math.hypot(body.x - end.x, body.z - end.z) < 1e-8, `physical crossing ${index}/${scale}`);
    }
  }
});

test('large rain pools accept flat lowland footprints and reject hillside and high-ground sites', () => {
  let lowSites = 0, hillsideRejected = 0, highRejected = 0;
  for (let index = 5; index < 100; index++) {
    const level = createLevel(index);
    if (!level.terrain.enabled) continue;
    const bounds = level.bounds;
    for (let x = bounds.minX + 4; x < bounds.maxX - 4; x += 11) for (let z = bounds.minZ + 4; z < bounds.maxZ - 4; z += 11) {
      const site = poolingSite(level, x, z, 2);
      if (site.eligible) {
        lowSites++;
        assert.ok(degrees(site.slope) < 3);
        assert.ok(site.maximum - site.minimum <= TERRAIN.poolMaximumHeightRange);
        assert.equal(site.height, site.minimum + .008, 'one horizontal water plane per pool');
      }
      if (degrees(terrainSlope(level, x, z)) >= 3) {
        hillsideRejected++;
        assert.equal(site.eligible, false);
      }
      if (groundHeight(level, x, z) > .44) {
        highRejected++;
        assert.equal(site.eligible, false);
      }
    }
  }
  assert.ok(lowSites > 0 && hillsideRejected > 0 && highRejected > 0);
  assert.ok(poolingSite(createLevel(0), 0, 0, 2).eligible, 'flat lessons retain their standing-water compatibility');
});
