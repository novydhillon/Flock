import test from 'node:test';
import assert from 'node:assert/strict';
import * as THREE from 'three';
import { bakeVegetationShadow } from '../src/vegetation-shadows.js';
import { riverSurfaceContains } from '../src/river-details.js';

function plant(parent, x, z) {
  const mesh = new THREE.InstancedMesh(new THREE.ConeGeometry(0.16, 2, 4), new THREE.MeshStandardMaterial(), 1);
  mesh.setMatrixAt(0, new THREE.Matrix4().makeTranslation(x, 1, z));
  mesh.castShadow = mesh.receiveShadow = true;
  parent.add(mesh);
  return mesh;
}

function dispose(plant, shadow) {
  plant.dispose(); plant.geometry.dispose(); plant.material.dispose();
  shadow.geometry.dispose(); shadow.material.dispose();
}

test('fixed sun silhouettes remain fixed across camera changes and skip all realtime shadows', () => {
  const parent = new THREE.Group(), source = plant(parent, 0, 0);
  const shadow = bakeVegetationShadow(parent, [source], { receiverY: 0.02 });
  assert.equal(source.castShadow, false); assert.equal(source.receiveShadow, false);
  assert.equal(shadow.castShadow, false); assert.equal(shadow.receiveShadow, false);
  assert.equal(shadow.material.isMeshBasicMaterial, true);
  assert.equal(shadow.material.depthTest, true); assert.equal(shadow.material.depthWrite, false);
  assert.equal(shadow.material.polygonOffset, true);
  const positions = shadow.geometry.attributes.position;
  const initial = positions.array.slice(), version = positions.version, matrix = shadow.matrix.clone();
  const camera = new THREE.PerspectiveCamera();
  for (const x of [-40, 0, 40]) {
    camera.position.set(x, 30, 20); camera.lookAt(0, 0, 0); camera.updateMatrixWorld();
    parent.updateMatrixWorld(true);
    assert.deepEqual(positions.array, initial); assert.equal(positions.version, version);
    assert.deepEqual(shadow.matrix, matrix);
  }
  assert.ok([...initial].filter((_, i) => i % 3 === 0).some(x => x > 0.6), 'projection points away from fixed sun X=-18');
  for (let i = 1; i < initial.length; i += 3) assert.ok(Math.abs(initial[i] - 0.0215) < 1e-6);
  dispose(source, shadow);
});

test('water shadow triangles are clipped to the water boundary and exclude bridge decks', () => {
  const parent = new THREE.Group(), source = plant(parent, 0, -1);
  const water = new THREE.PlaneGeometry(3, 4); water.rotateX(-Math.PI / 2);
  const bridge = { x: 0, z: 0, heading: 0, length: 5, width: 0.5 };
  const shadow = bakeVegetationShadow(parent, [source], { receiverGeometry: water, bridges: [bridge] });
  const positions = shadow.geometry.attributes.position;
  assert.ok(positions.count > 0);
  for (let i = 0; i < positions.count; i++) {
    const x = positions.getX(i), z = positions.getZ(i);
    assert.ok(riverSurfaceContains(water, x, z));
    assert.ok(Math.abs(x) >= 0.25 - 1e-6 || Math.abs(z) >= 2.5 - 1e-6);
  }
  for (let i = 0; i < positions.count; i += 3) {
    const x = (positions.getX(i) + positions.getX(i + 1) + positions.getX(i + 2)) / 3;
    assert.ok(Math.abs(x) >= 0.25 - 1e-6, 'triangle interiors do not span across bridge exclusion');
  }
  dispose(source, shadow); water.dispose();
});

test('baked sun direction stays in world space for rotated water roots', () => {
  const parent = new THREE.Group(); parent.rotation.y = Math.PI / 2;
  const source = plant(parent, 0, 0), shadow = bakeVegetationShadow(parent, [source]);
  parent.updateMatrixWorld(true);
  const positions = shadow.geometry.attributes.position, world = new THREE.Vector3();
  let maxX = -Infinity, minZ = Infinity;
  for (let i = 0; i < positions.count; i++) {
    world.fromBufferAttribute(positions, i).applyMatrix4(shadow.matrixWorld);
    maxX = Math.max(maxX, world.x); minZ = Math.min(minZ, world.z);
  }
  assert.ok(maxX > 0.8 && minZ < -0.9, 'world projection retains fixed configured sun direction');
  dispose(source, shadow);
});
