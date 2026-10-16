import test from 'node:test';
import assert from 'node:assert/strict';
import * as THREE from 'three';
import { createDog, createTree, createBush, createMaterials } from '../src/models.js';
import { setTailLightBarking } from '../src/tail-light.js';
import { generateBushClusters } from '../src/vegetation.js';
import { createLevel, canOccupy } from '../src/world.js';

function installCanvasStub() {
  const context = {
    createImageData: (width, height) => ({ data: new Uint8ClampedArray(width * height * 4) }),
    putImageData() {}, fillRect() {}, beginPath() {}, ellipse() {}, fill() {},
  };
  globalThis.document = { createElement: () => ({ width: 0, height: 0, getContext: () => context }) };
}

function lineDistance(point, points) {
  let result = Infinity;
  for (let i = 1; i < points.length; i++) {
    const a = points[i - 1], b = points[i], dx = b.x - a.x, dz = b.z - a.z;
    const t = Math.max(0, Math.min(1, ((point.x - a.x) * dx + (point.z - a.z) * dz) / (dx * dx + dz * dz || 1)));
    result = Math.min(result, Math.hypot(point.x - a.x - dx * t, point.z - a.z - dz * t));
  }
  return result;
}

test('dog bark light is isolated from shared cyan and restores from simulation state', () => {
  installCanvasStub();
  const sharedCyan = createMaterials().cyan, cyanBefore = sharedCyan.color.getHexString();
  const pip = createDog(), buddy = createDog();
  assert.ok(pip.userData.parts.tailLight.isMesh);
  assert.notEqual(pip.userData.parts.tailLight.material, buddy.userData.parts.tailLight.material,
    'each dog owns its independently animated feedback material');
  assert.equal(pip.userData.parts.tailLight.material.color.getHexString(), '9ceeff');
  assert.equal(setTailLightBarking(pip, true), true);
  assert.equal(pip.userData.parts.tailLight.material.color.getHexString(), 'ff7062');
  assert.equal(buddy.userData.parts.tailLight.material.color.getHexString(), '9ceeff');
  assert.equal(setTailLightBarking(pip.userData.parts, false), true);
  assert.equal(pip.userData.parts.tailLight.material.color.getHexString(), '9ceeff');
  assert.equal(sharedCyan.color.getHexString(), cyanBefore);
  assert.equal(setTailLightBarking({}, true), false);
});

test('trees and bushes use shared bark/foliage textures and fuller handmade forms', () => {
  installCanvasStub();
  const materials = createMaterials();
  assert.ok(materials.bark.map && materials.bark.bumpMap, 'bark has color and relief detail');
  assert.ok(materials.leaves.map && materials.leavesLight.map && materials.leavesDark.map);
  assert.equal(materials.leaves.map, materials.leavesLight.map, 'foliage texture is shared across cached palette materials');
  const tree = createTree(2), bush = createBush(1);
  tree.updateMatrixWorld(true); bush.updateMatrixWorld(true);
  const treeBounds = new THREE.Box3().setFromObject(tree), bushBounds = new THREE.Box3().setFromObject(bush);
  assert.ok(treeBounds.max.y > 3.5, `tree has a visibly taller canopy (${treeBounds.max.y})`);
  assert.ok(treeBounds.max.x - treeBounds.min.x > 2.5, 'the expanded crown remains rounded and broad');
  assert.ok(bushBounds.max.y > .8 && bushBounds.max.x - bushBounds.min.x > 1.4);
  assert.ok(tree.children.filter(child => child.isMesh).length <= 2, 'all trunk and crown detail is baked into two shared material meshes');
  assert.ok(bush.children.filter(child => child.isMesh).length <= 2, 'bush detail remains bounded after material baking');
});

test('bush clusters are deterministic, bounded decorations that preserve safe routes and staging', () => {
  const cases = [[0, 11], [25, 73], [99, 203]];
  for (const [index, seed] of cases) {
    const level = createLevel(index, seed), placements = generateBushClusters(level);
    assert.deepEqual(placements, generateBushClusters(level), `same level seed gives same bush plan at index ${index}`);
    assert.ok(placements.length <= 24 * 5);
    const clusterIds = new Set(placements.map(plant => plant.cluster));
    assert.ok(clusterIds.size <= 24);
    for (const plant of placements) {
      assert.ok(plant.variant >= 0 && plant.variant < 3);
      assert.ok(plant.scale >= .66 && plant.scale <= 1.14);
      assert.ok(canOccupy(level, plant.x, plant.z, .55), 'decorative shrubs do not occupy water, obstacles or blocked ground');
      assert.ok(Math.hypot(plant.x - level.spawn.x, plant.z - level.spawn.z) >= 14);
      assert.ok(Math.hypot(plant.x - level.target.x, plant.z - level.target.z) >= level.target.radius + 11);
      for (const road of level.roads) assert.ok(lineDistance(plant, road.points) >= road.width / 2 + 2.8);
      for (const river of level.rivers) assert.ok(lineDistance(plant, river.points) >= river.width / 2 + 1.4);
    }
    assert.ok(placements.length > 0, `at least some safe habitat exists at index ${index}`);
  }
  assert.equal(generateBushClusters(createLevel(99, 203), { maxClusters: 0 }).length, 0);
});


test('bark light is the actual wagging tail tip, behind the body',()=>{
 const dog=createDog(),parts=dog.userData.parts;assert.equal(parts.tailLight.parent,parts.tail);
 dog.updateMatrixWorld(true);const position=new THREE.Vector3();parts.tailLight.getWorldPosition(position);assert.ok(position.z<0);
});
