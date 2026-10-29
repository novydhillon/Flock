import test from 'node:test';
import assert from 'node:assert/strict';
import * as THREE from 'three';
import { waterVegetationSites, WaterVegetation } from '../src/water-vegetation.js';
import { WaterEffects } from '../src/water-effects.js';
import { RiverDetails, riverSurfaceContains } from '../src/river-details.js';
import { ribbon } from '../src/surfaces.js';

function rectangle(width = 40, depth = 12) {
  const geometry = new THREE.PlaneGeometry(width, depth);
  geometry.rotateX(-Math.PI / 2);
  return geometry;
}

function eligibleSeed(geometry) {
  for (let seed = 0; seed < 100; seed++) if (waterVegetationSites(geometry, seed).length) return seed;
  throw new Error('No selected water body in fixture range');
}

test('water eligibility is independently seeded, stable and approximately one in five bodies', () => {
  const geometry = rectangle();
  let selected = 0;
  for (let seed = 0; seed < 2000; seed++) {
    const sites = waterVegetationSites(geometry, seed);
    selected += sites.length > 0;
    if (seed < 20) assert.deepEqual(waterVegetationSites(geometry, seed), sites);
  }
  assert.ok(selected > 350 && selected < 450, `selected ${selected}/2000`);
  geometry.dispose();
});

test('clumps favor banks, retain complete wet footprints and leave bridge decks clear', () => {
  const geometry = rectangle();
  const bridge = { x: 0, z: 0, heading: 0, length: 16, width: 4 };
  let count = 0, nearEdge = 0, sumDistance = 0;
  for (let seed = 0; seed < 300; seed++) {
    for (const site of waterVegetationSites(geometry, seed, [bridge])) {
      count++;
      nearEdge += site.edgeDistance < 2;
      sumDistance += site.edgeDistance;
      assert.ok(Math.abs(site.x) > bridge.width / 2 + site.radius + 0.6);
      for (let i = 0; i < 16; i++) {
        const angle = i * Math.PI / 8;
        assert.ok(riverSurfaceContains(geometry, site.x + Math.cos(angle) * site.radius, site.z + Math.sin(angle) * site.radius));
      }
    }
  }
  assert.ok(count > 300);
  assert.ok(nearEdge / count > 0.7, `${nearEdge}/${count} are near banks`);
  assert.ok(sumDistance / count < 1.9, 'uniform surface sampling would average about 2.7m from banks');
  geometry.dispose();
});

test('curved stream and closed pond surfaces both accept seeded standing clumps', () => {
  const stream = ribbon([{ x: -20, z: -5 }, { x: 0, z: 3 }, { x: 20, z: -4 }], 7, 0.02);
  const pond = new THREE.CircleGeometry(12, 24);
  pond.rotateX(-Math.PI / 2);
  for (const geometry of [stream, pond]) {
    let samples = 0;
    for (let seed = 0; seed < 100; seed++) {
      for (const site of waterVegetationSites(geometry, seed)) {
        samples++;
        assert.ok(riverSurfaceContains(geometry, site.x, site.z));
        assert.ok(site.edgeDistance >= site.radius);
      }
    }
    assert.ok(samples > 10);
    geometry.dispose();
  }
});

test('owned instanced plants stand above water, avoid realtime shadows and dispose once', () => {
  const geometry = rectangle(), parent = new THREE.Group(), mesh = new THREE.Mesh(geometry);
  mesh.position.set(3, 2, 4);
  const plants = new WaterVegetation(parent, { mesh }, eligibleSeed(geometry));
  assert.ok(plants.meshes.length > 0 && plants.meshes.length <= 3);
  assert.equal(plants.root.children.length, plants.meshes.length, 'no baked shadow meshes');
  assert.deepEqual(plants.root.position, mesh.position);
  let disposed = 0;
  const resources = plants.meshes.flatMap(batch => [batch, batch.geometry, batch.material]);
  for (const resource of resources) resource.addEventListener('dispose', () => disposed++);
  const matrix = new THREE.Matrix4();
  for (const batch of plants.meshes) {
    assert.equal(batch.castShadow, false);
    assert.equal(batch.receiveShadow, false);
    for (let i = 0; i < batch.count; i++) {
      batch.getMatrixAt(i, matrix);
      assert.ok(new THREE.Vector3().setFromMatrixPosition(matrix).y > 0);
    }
  }
  plants.dispose();
  plants.dispose();
  assert.equal(disposed, resources.length);
  assert.equal(parent.children.length, 0);
  geometry.dispose();
});

test('every standing clump contributes a clipped, current-responsive obstacle wake', () => {
  const geometry = rectangle();
  const water = { mesh: new THREE.Mesh(geometry), points: [{ x: -20, z: 0 }, { x: 20, z: 0 }], width: 12, bridges: [] };
  const seed = eligibleSeed(geometry);
  const sites = waterVegetationSites(geometry, seed);
  const parent = new THREE.Group();
  const bare = new RiverDetails(parent, water, seed);
  const planted = new RiverDetails(parent, water, seed, sites);
  assert.equal(planted.sites.filter(site => site.kind === 'vegetation').length, sites.length);
  assert.ok(planted.wakes.geometry.attributes.position.count > bare.wakes.geometry.attributes.position.count);
  const positions = planted.wakes.geometry.attributes.position;
  for (let i = 0; i < positions.count; i++) assert.ok(riverSurfaceContains(geometry, positions.getX(i), positions.getZ(i)));
  planted.update(0.1, 0, 0.06);
  const sunnyStep = planted.wakes.material.uniforms.time.value;
  planted.update(0.1, 1, 0.24);
  assert.ok(planted.wakes.material.uniforms.time.value - sunnyStep > sunnyStep);
  bare.dispose(); planted.dispose(); geometry.dispose();
});

test('water-effects level replacement owns vegetation and wires all clump wake sites', () => {
  const geometry = rectangle(), mesh = new THREE.Mesh(geometry);
  const river = { mesh, points: [{ x: -20, z: 0 }, { x: 20, z: 0 }], width: 12, bridges: [] };
  const seed = eligibleSeed(geometry) ^ Math.imul(1, 7919);
  const effects = new WaterEffects(new THREE.Scene(), { maxPuddles: 0, maxSplashes: 0 });
  const level = { seed, index: 0, bounds: { minX: -25, maxX: 25, minZ: -10, maxZ: 10 }, rivers: [] };
  effects.setLevel(level, { rivers: [river] });
  const vegetation = effects.waterVegetation[0];
  assert.ok(vegetation.sites.length > 0);
  assert.equal(effects.riverDetails[0].sites.filter(site => site.kind === 'vegetation').length, vegetation.sites.length);
  let disposed = 0;
  vegetation.meshes.forEach(batch => batch.addEventListener('dispose', () => disposed++));
  const instances = vegetation.meshes.length;
  effects.setLevel(level, { rivers: [river] });
  assert.equal(disposed, instances);
  assert.deepEqual(effects.waterVegetation[0].sites, vegetation.sites);
  effects.dispose(); geometry.dispose();
});


test('point-free pond bodies retain standing plants and obstacle wakes', () => {
  const geometry = new THREE.CircleGeometry(9, 24);
  geometry.rotateX(-Math.PI / 2);
  const water = { mesh: new THREE.Mesh(geometry), bridges: [] };
  const seed = eligibleSeed(geometry);
  const plants = new WaterVegetation(new THREE.Group(), water, seed);
  const details = new RiverDetails(new THREE.Group(), water, seed, plants.sites);
  assert.equal(details.sites.filter(site => site.kind === 'vegetation').length, plants.sites.length);
  assert.ok(details.wakes.geometry.attributes.position.count > 0);
  plants.dispose(); details.dispose(); geometry.dispose();
});
