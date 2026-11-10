import test from 'node:test';
import assert from 'node:assert/strict';
import { plantClumpGeometry, bankClumpSites, oddBladeCount, plantBladeHeight } from '../src/plant-clumps.js';
import { RiverDetails } from '../src/river-details.js';
import { ribbon } from '../src/surfaces.js';
import * as THREE from 'three';
function random(seed) { return () => { seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0; return seed / 4294967296; }; }
const river = { points: [{ x: -60, z: 0 }, { x: 60, z: 0 }], width: 12, bridges: [] };
const bounds = { minX: -70, maxX: 70, minZ: -20, maxZ: 20 };
test('slender merged clumps retain multiple blades without multiplying instances', () => {
  const geometry = plantClumpGeometry(.024, .55);
  assert.equal(geometry.userData.bladesPerClump, 5);
  geometry.computeBoundingBox();
  assert.ok(geometry.boundingBox.max.y > .5);
  assert.ok(geometry.boundingBox.max.x - geometry.boundingBox.min.x > .2
    && geometry.boundingBox.max.x - geometry.boundingBox.min.x < .3);
  geometry.dispose();
});
test('bank clumps are seeded and have varied spacing, sides and offsets', () => {
  const sites = bankClumpSites(river, random(12), bounds);
  assert.deepEqual(sites, bankClumpSites(river, random(12), bounds));
  assert.ok(sites.some(p => p.z > 0) && sites.some(p => p.z < 0));
  assert.ok(new Set(sites.map(p => Math.abs(p.z).toFixed(2))).size > 5);
  assert.notDeepEqual(sites, bankClumpSites(river, random(13), bounds));
});
test('rock population reaches both banks and uses irregular longitudinal spacing', () => {
  const mesh = new THREE.Mesh(ribbon(river.points, river.width, { y: .018 }));
  const sites = [];
  for (let seed = 0; seed < 60; seed++) {
    const details = new RiverDetails(new THREE.Group(), { ...river, mesh }, seed);
    sites.push(...details.sites.filter(p => p.kind === 'rock'));
    details.dispose();
  }
  assert.ok(sites.some(p => p.z > 4) && sites.some(p => p.z < -4));
  assert.ok(sites.some(p => Math.abs(p.z) < 1));
  assert.ok(new Set(sites.map(p => p.x.toFixed(1))).size > 40);
  mesh.geometry.dispose(); mesh.material.dispose();
});

test('off-center rocks keep their entire footprint clear of bridge decks', () => {
  const mesh = new THREE.Mesh(ribbon(river.points, river.width, { y: .018 }));
  const bridge = { x: 0, z: 0, heading: 0, width: 4, length: 16 };
  for (let seed = 0; seed < 100; seed++) {
    const details = new RiverDetails(new THREE.Group(), { ...river, mesh, bridges: [bridge] }, seed);
    for (const p of details.sites.filter(p => p.kind === 'rock')) {
      assert.ok(Math.abs(p.x) >= bridge.width / 2 + p.radius + .5 || Math.abs(p.z) >= bridge.length / 2 + p.radius + .5);
    }
    details.dispose();
  }
  mesh.geometry.dispose(); mesh.material.dispose();
});
test('one river has irregular rock gaps rather than fixed longitudinal slots', () => {
  const mesh = new THREE.Mesh(ribbon(river.points, river.width, { y: .018 }));
  const details = new RiverDetails(new THREE.Group(), { ...river, mesh }, 12);
  const xs = details.sites.filter(p => p.kind === 'rock').map(p => p.x).sort((a,b) => a-b);
  const gaps = xs.slice(1).map((x,i) => x-xs[i]);
  assert.ok(gaps.length >= 3);
  assert.ok(Math.max(...gaps) > Math.min(...gaps) * 2);
  details.dispose(); mesh.geometry.dispose(); mesh.material.dispose();
});


test('every grass variant contains an odd 3–11 complete blades with varied heights', () => {
  const randomDraw = random(71), counts = new Set();
  for (let draw = 0; draw < 100; draw++) counts.add(oddBladeCount(randomDraw));
  assert.deepEqual([...counts].sort((a, b) => a - b), [3, 5, 7, 9, 11]);
  for (const count of counts) {
    const geometry = plantClumpGeometry(.024, .55, count);
    assert.equal(geometry.userData.bladesPerClump, count);
    const position = geometry.attributes.position;
    const single = plantClumpGeometry(.024, .55, 3);
    assert.equal(position.count / count, single.attributes.position.count / 3);
    single.dispose();
    const verticesPerBlade = position.count / count, heights = [];
    for (let blade = 0; blade < count; blade++) {
      let low = Infinity, high = -Infinity;
      for (let i = blade * verticesPerBlade; i < (blade + 1) * verticesPerBlade; i++) {
        low = Math.min(low, position.getY(i));high = Math.max(high, position.getY(i));
      }
      assert.ok(Math.abs(low) < 1e-6, 'all blade roots share the clump base');
      heights.push(high);
    }
    assert.ok(Math.max(...heights) - Math.min(...heights) > .1);
    geometry.dispose();
  }
  for (const invalid of [1, 2, 4, 12, 13]) assert.throws(() => plantClumpGeometry(.024, .55, invalid), RangeError);
  assert.equal(plantBladeHeight(() => 0), .65);
  assert.ok(plantBladeHeight(() => .999) < 1.2);
});

test('landward bank spacing includes near and distant clumps without rows', () => {
  const sites = bankClumpSites(river, random(12), bounds);
  const distances = sites.map(site => Math.abs(site.z) - river.width / 2);
  assert.ok(Math.min(...distances) < 1.2);
  assert.ok(Math.max(...distances) > 2.8);
  assert.ok(distances.every(distance => distance >= .65 && distance <= 3.65));
});
