import test from 'node:test';
import assert from 'node:assert/strict';
import * as THREE from 'three';
import { createLevel, groundHeight, terrainHeight, terrainNormal, GROUND_SURFACE_OFFSET } from '../src/world.js';
import { conformSurface, meadowGeometry, meadowSurfaceHeight, roughPastureEnabled, alignAnimalToTerrain, drapeGroundGuide, alignGroundProp } from '../src/terrain-view.js';
import { roadNetwork } from '../src/surfaces.js';
import { createFlowerPatch } from '../src/models.js';
import { createGateView, createStoneWallView } from '../src/gate-view.js';

function rollingLevel() {
  for (let seed = 200; seed < 220; seed++) {
    const level = createLevel(19, seed);
    if (level.terrain.enabled) return level;
  }
  throw new Error('No seeded rolling fixture');
}

test('rolling ground samples one smooth height field and smooth normals across all grid seams', () => {
  const level = rollingLevel();
  const geometry = meadowGeometry(level, 90, 70, 3, -8);
  const p = geometry.attributes.position, n = geometry.attributes.normal;
  assert.ok(p.count < 4000, 'ground mesh budget scales with bounded grid spacing');
  const normal = new THREE.Vector3();
  for (let i = 0; i < p.count; i++) {
    const x = p.getX(i), z = p.getZ(i), expected = terrainNormal(level, x, z);
    assert.ok(Math.abs(p.getY(i) - groundHeight(level, x, z) - GROUND_SURFACE_OFFSET) < 2e-7);
    normal.fromBufferAttribute(n, i);
    assert.ok(normal.distanceTo(new THREE.Vector3(expected.x, expected.y, expected.z)) < 2e-6,
      'normals follow the smooth gradient rather than individual triangle faces');
  }
  geometry.dispose();
});

test('surface grid preserves road fade and shared edge positions while bounding skinny-triangle growth', () => {
  const source = new THREE.BufferGeometry();
  source.setAttribute('position', new THREE.Float32BufferAttribute([
    0, .007, 0, 100, .007, 0, 100, .007, .01,
    0, .007, 0, 100, .007, .01, 0, .007, .01,
  ], 3));
  source.setAttribute('roadOpacity', new THREE.Float32BufferAttribute([0, 1, 1, 0, 1, 0], 1));
  const height = (x, z) => .3 * Math.sin(x / 18) + z * .03;
  const geometry = conformSurface(source, height, {spacing: 1.5});
  assert.ok(geometry.index, 'shared vertices are indexed');
  assert.ok(geometry.attributes.position.count < 1200, 'long thin slivers do not grow quadratically');
  const p = geometry.attributes.position, opacity = geometry.attributes.roadOpacity;
  const samples = new Map();
  for (let i = 0; i < p.count; i++) {
    const x = p.getX(i), z = p.getZ(i);
    assert.ok(Math.abs(p.getY(i) - height(x, z) - .007) < 2e-7);
    assert.ok(Math.abs(opacity.getX(i) - x / 100) < 1e-6);
    const key = x.toFixed(5) + ',' + z.toFixed(5);
    if (samples.has(key)) assert.ok(Math.abs(samples.get(key) - p.getY(i)) < 1e-7);
    samples.set(key, p.getY(i));
  }
  geometry.dispose();
});

test('large rolling road network has a bounded indexed geometry budget', () => {
  for (const [index, seed, vertexBudget, triangleBudget] of [[19, 201, 50000, 100000], [99, undefined, 80000, 150000]]) {
    const level = createLevel(index, seed);
    const geometry = conformSurface(roadNetwork(level.roads), (x, z) => groundHeight(level, x, z));
    assert.ok(geometry.attributes.position.count < vertexBudget, `public level ${index + 1} vertex budget`);
    assert.ok(geometry.index.count / 3 < triangleBudget, `public level ${index + 1} triangle budget`);
    geometry.dispose();
  }
});

test('rough pasture is independent, repeatable, mixed and absent from the first five meadows', () => {
  for (let index = 0; index < 5; index++) assert.equal(roughPastureEnabled(createLevel(index)), false);
  const selection = Array.from({length: 40}, (_, index) => roughPastureEnabled(createLevel(index + 5)));
  assert.ok(selection.includes(true) && selection.includes(false));
  assert.deepEqual(selection, Array.from({length: 40}, (_, index) => roughPastureEnabled(createLevel(index + 5))));
});

test('all livestock sizes follow support grade while keeping yaw and uniform size', () => {
  const level = rollingLevel();
  for (const type of ['sheep', 'cow']) for (const scale of [1, 13/12, 7/6, 1.25]) {
    const animal = {...level.animals[0], type, x: level.spawn.x, z: level.spawn.z};
    const pose = new THREE.Object3D();
    pose.scale.setScalar(scale);pose.rotation.y = .7;
    alignAnimalToTerrain(pose, animal, level);
    assert.equal(pose.rotation.y, .7);
    assert.deepEqual(pose.scale.toArray(), [scale, scale, scale]);
    assert.ok(Math.abs(pose.position.y - terrainHeight(level, animal.x, animal.z)) < .02);
    const up = new THREE.Vector3(0, 1, 0).applyQuaternion(pose.quaternion);
    const normal = terrainNormal(level, animal.x, animal.z);
    assert.ok(up.dot(new THREE.Vector3(normal.x, normal.y, normal.z)) > .9995);
  }
});

test('gate controls and masonry follow a graded support surface through open and closed states', () => {
  const height = (x, z) => .4 + .06 * x + .025 * z;
  const gate = {x: 2, z: -3, width: 4, heading: .7, operable: true, open: false};
  const view = createGateView([gate], height);
  const housings = [];
  view.traverse(object => {if (object.name === 'gate-switch-panel') housings.push(object);});
  assert.equal(housings.length, 2);
  for (const housing of housings) assert.ok(housing.position.y > height(housing.position.x, housing.position.z));
  const panel = view.getObjectByName('gate-panel');
  const closed = panel.position.y;
  gate.open = true;view.update();
  assert.notEqual(panel.position.y, closed, 'sliding gate follows its new support elevation');
  const walls = createStoneWallView([{a: {x: -5, z: 1}, b: {x: 7, z: 4}, material: 'stone'}], height);
  const matrix = new THREE.Matrix4(), center = new THREE.Vector3();
  let stones = 0;
  walls.traverse(mesh => {
    if (!mesh.isInstancedMesh) return;
    for (let i = 0; i < mesh.count; i++) {
      mesh.getMatrixAt(i, matrix);center.setFromMatrixPosition(matrix);
      assert.ok(center.y > height(center.x, center.z));
      stones++;
    }
  });
  assert.ok(stones > 30);
  view.dispose();walls.dispose();
});


test('moving ground guidance drapes over receiving grade without accumulated deformation', () => {
  const level = rollingLevel(), root = new THREE.Group();
  root.position.set(level.spawn.x, terrainHeight(level, level.spawn.x, level.spawn.z), level.spawn.z);
  root.rotation.y = .7;
  root.scale.setScalar(1.0125);
  const ring = new THREE.Mesh(new THREE.RingGeometry(.82, .95, 32), new THREE.MeshBasicMaterial());
  ring.rotation.x = -Math.PI / 2;ring.position.y = .04;root.add(ring);
  drapeGroundGuide(ring, level, root.position.y);
  const position = ring.geometry.attributes.position, point = new THREE.Vector3();
  for (let i = 0; i < position.count; i++) {
    point.fromBufferAttribute(position, i);ring.localToWorld(point);
    assert.ok(Math.abs(point.y - terrainHeight(level, point.x, point.z) - .0405) < 1e-6);
  }
  const frozen = position.array.slice();drapeGroundGuide(ring, level, root.position.y);
  assert.deepEqual(position.array, frozen);
  ring.geometry.dispose();ring.material.dispose();
});


test('small flower roots follow the ground tangent while retaining shared cached meshes', () => {
  globalThis.document = {createElement: () => ({getContext: () => ({
    createImageData: (width, height) => ({data: new Uint8ClampedArray(width * height * 4)}),
    putImageData() {},
  })})};
  const first = createFlowerPatch(2, 3), second = createFlowerPatch(2, 3);
  const height = (x, z) => .4 + x * .12 - z * .07;
  first.position.set(5, height(5, -4), -4);first.scale.setScalar(1.2);
  alignGroundProp(first, height, 5, -4);first.updateMatrixWorld(true);
  assert.deepEqual(first.children.map(mesh => mesh.geometry), second.children.map(mesh => mesh.geometry),
    'terrain alignment must not bake or clone each flower mesh');
  for (let i = 0; i < 3; i++) {
    const angle = i * 2.39996 + 2, radius = Math.sqrt(i / 3) * .65;
    const root = new THREE.Vector3(Math.cos(angle) * radius, 0, Math.sin(angle) * radius);
    first.localToWorld(root);
    assert.ok(Math.abs(root.y - height(root.x, root.z)) < 1e-8, 'every stem root lies on its support plane');
  }
  assert.deepEqual(second.quaternion.toArray(), [0, 0, 0, 1], 'cached prototype remains upright for the next placement');
});


test('pool support matches actual ground triangles at their vertices and interiors', () => {
  for(const index of [5,19,49,94,99]) {
    const level=createLevel(index), b=level.bounds;
    if(!level.terrain.enabled)continue;
    const geometry=meadowGeometry(level,b.maxX-b.minX+90,b.maxZ-b.minZ+90,(b.minX+b.maxX)/2,(b.minZ+b.maxZ)/2);
    const positions=geometry.attributes.position, indices=geometry.index;
    for(let i=0;i<indices.count;i+=Math.max(3,Math.floor(indices.count/500/3)*3)) {
      const a=new THREE.Vector3().fromBufferAttribute(positions,indices.getX(i));
      const c=new THREE.Vector3().fromBufferAttribute(positions,indices.getX(i+1));
      const d=new THREE.Vector3().fromBufferAttribute(positions,indices.getX(i+2));
      for(const weights of [[1,0,0],[.2,.3,.5],[.6,.2,.2]]) {
        const point=a.clone().multiplyScalar(weights[0]).addScaledVector(c,weights[1]).addScaledVector(d,weights[2]);
        assert.ok(Math.abs(meadowSurfaceHeight(level,point.x,point.z)-point.y)<2e-7,'pool clipping samples the exact receiving ground triangle');
      }
    }
    geometry.dispose();
  }
});
