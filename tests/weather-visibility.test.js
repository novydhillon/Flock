import test from 'node:test';
import assert from 'node:assert/strict';
import * as THREE from 'three';
import { Atmosphere } from '../src/atmosphere.js';
import { RainView } from '../src/rain-view.js';

const level = index => ({ index, seed: index + 42, bounds: { minX: -80, maxX: 80, minZ: -80, maxZ: 80 }, rivers: [] });
function ortho(aspect, x, z) {
  const camera = new THREE.OrthographicCamera(-24 * aspect, 24 * aspect, 24, -24, .1, 300);
  camera.position.set(x, 36, z + 29); camera.lookAt(x, 0, z - 2); camera.updateProjectionMatrix(); camera.updateMatrixWorld(true); return camera;
}
function rayPlane(camera, nx, ny, y) {
  const ray = new THREE.Raycaster(); ray.setFromCamera(new THREE.Vector2(nx, ny), camera);
  return ray.ray.intersectPlane(new THREE.Plane(new THREE.Vector3(0, 1, 0), -y), new THREE.Vector3());
}
function alphaAt(texture, u, v) {
  const x = Math.max(0, Math.min(63, Math.floor(u * 64))), y = Math.max(0, Math.min(63, Math.floor(v * 64)));
  return texture.image.data[(y * 64 + x) * 4 + 3] / 255;
}
function setOfQuadClouds(mesh, camera, targets) {
  const inverse = new THREE.Matrix4(), local = new THREE.Vector3(), hits = new Array(targets.length).fill(false);
  for (let i = 0; i < mesh.count; i++) {
    const matrix = new THREE.Matrix4(); mesh.getMatrixAt(i, matrix); inverse.copy(matrix).invert();
    for (let j = 0; j < targets.length; j++) {
      if (hits[j]) continue;
      const [nx, ny] = targets[j], point = rayPlane(camera, nx, ny, 13);
      local.copy(point).applyMatrix4(inverse);
      if (Math.abs(local.x) <= .5 && Math.abs(local.y) <= .5 && alphaAt(mesh.material.map, local.x + .5, local.y + .5) > .04) hits[j] = true;
    }
  }
  return hits;
}
function instanceCenter(mesh, index) {
  const matrix = new THREE.Matrix4(), center = new THREE.Vector3(); mesh.getMatrixAt(index, matrix); matrix.decompose(center, new THREE.Quaternion(), new THREE.Vector3()); return center;
}

test('orthographic camera-ray footprint and cloud alpha cover screen corners across levels and travel', () => {
  const scene = new THREE.Scene(), atmosphere = new Atmosphere(scene), corners = [[-.98,-.98],[-.98,.98],[.98,-.98],[.98,.98]];
  for (const index of [1, 9, 16, 24, 100]) {
    atmosphere.setLevel(level(index), { cloudCoverage: .5 });
    for (const camera of [ortho(16 / 9, 0, 0), ortho(.6, index * 2.7, -index * 1.4)]) {
      camera.updateMatrixWorld(true);
      const independent = [[-1,-1],[-1,1],[1,-1],[1,1]].map(([x, y]) => rayPlane(camera, x, y, 13));
      const bounds = atmosphere.projectedFootprint(camera, 13);
      assert.ok(Math.abs(bounds.minX - Math.min(...independent.map(p => p.x))) < 1e-5);
      assert.ok(Math.abs(bounds.maxZ - Math.max(...independent.map(p => p.z))) < 1e-5);
      atmosphere.update(0, { weather: { cloudCoverage: .55 }, camera, paused: true });
      scene.updateMatrixWorld(true);
      assert.ok(setOfQuadClouds(atmosphere.cloudMesh, camera, corners).every(Boolean), `screen corner lacks cloud alpha at level ${index}`);
      assert.ok(atmosphere.cloudMesh.material.opacity >= .1 && atmosphere.cloudMesh.material.opacity <= .25);
    }
  }
  const camera = ortho(.6, 120, -40); atmosphere.update(0, { weather: {}, camera, paused: true });
  const before = atmosphere.clouds.map((_, i) => [instanceCenter(atmosphere.cloudMesh, i).toArray(), instanceCenter(atmosphere.shadowMesh, i).toArray()]);
  atmosphere.update(.5, { weather: { cloudCoverage: .5, windIntensity: .5 }, camera });
  const cloudAfter = atmosphere.clouds.map((_, i) => instanceCenter(atmosphere.cloudMesh, i));
  const shadowAfter = atmosphere.clouds.map((_, i) => instanceCenter(atmosphere.shadowMesh, i));
  assert.ok(Math.abs(cloudAfter[0].x - before[0][0][0]) > .1, 'clouds should drift in world space');
  assert.ok(Math.abs(shadowAfter[0].x - before[0][1][0]) > .1, 'shadow should follow cloud drift');
  assert.ok(Math.abs((shadowAfter[0].x - before[0][1][0]) - (cloudAfter[0].x - before[0][0][0])) < 1e-5);
  assert.ok(Math.abs((shadowAfter[0].z - before[0][1][2]) - (cloudAfter[0].z - before[0][0][2])) < 1e-5);
  const moving = atmosphere.clouds.map((_, i) => [atmosphere.cloudMesh.instanceMatrix.array.slice(i * 16, i * 16 + 16), atmosphere.shadowMesh.instanceMatrix.array.slice(i * 16, i * 16 + 16)]);
  atmosphere.update(3, { weather: { cloudCoverage: .5, windIntensity: .5 }, camera, paused: true });
  for (let i = 0; i < atmosphere.clouds.length; i++) {
    assert.deepEqual(atmosphere.cloudMesh.instanceMatrix.array.slice(i * 16, i * 16 + 16), moving[i][0]);
    assert.deepEqual(atmosphere.shadowMesh.instanceMatrix.array.slice(i * 16, i * 16 + 16), moving[i][1]);
  }
  atmosphere.dispose();
});

function projectedDrops(rain, camera) {
  const attr = rain.geometry.getAttribute('position');
  return Array.from({ length: rain.active }, (_, i) => ({
    start: new THREE.Vector3().fromBufferAttribute(attr, i * 2).project(camera),
    end: new THREE.Vector3().fromBufferAttribute(attr, i * 2 + 1).project(camera),
  }));
}

test('rain curtain covers beyond every viewport edge at actual camera tilt, aspect, zoom and travel', () => {
  const rain = new RainView(new THREE.Scene());
  for (const aspect of [.46, .6, 1, 16 / 9, 2.4]) {
    for (const height of [36, 39, 44, 50]) {
      const camera = ortho(aspect, 140, -75);
      camera.left = -height / 2 * aspect; camera.right = height / 2 * aspect;
      camera.top = height / 2; camera.bottom = -height / 2; camera.updateProjectionMatrix();
      rain.update(0, { camera, weather: { kind: 'storm', rainIntensity: .9, windIntensity: .85 } });
      for (let frame = -1; frame < 180; frame++) {
        camera.position.x += .3; camera.position.z -= .2; camera.updateMatrixWorld(true);
        rain.update(frame < 0 ? 0 : .1, { camera, weather: { kind: 'storm', rainIntensity: .9, windIntensity: .85 } });
        const drops = projectedDrops(rain, camera);
        if (frame === -1 || frame % 30 === 0) {
          for (const edge of ['left', 'right', 'top', 'bottom']) {
            const covered = drops.some(({ start }) => edge === 'left' ? start.x < -1 : edge === 'right' ? start.x > 1 : edge === 'top' ? start.y > 1 : start.y < -1);
            assert.ok(covered, `${edge} edge missing: aspect ${aspect}, height ${height}, frame ${frame}`);
          }
          // The old 85% footprint excluded the corners completely.
          for (const sx of [-1, 1]) for (const sy of [-1, 1]) {
            assert.ok(drops.some(({ start }) => start.x * sx > .85 && start.y * sy > .85), 'rain must populate corner margins');
          }
        }
        assert.ok(drops.every(({ start, end }) => end.y < start.y), 'all streaks fall downward');
        assert.ok(drops.every(({ start, end }) => Math.abs(end.x - start.x) / (start.y - end.y) > .1), 'storm must have a visible projected slant');
      }
    }
  }
  rain.dispose();
});

test('rain respawns above screen, preserves falling speed, pause and bounded resources', () => {
  const rain = new RainView(new THREE.Scene()), camera = ortho(.6, 140, -75);
  for (const [kind, count, length, speed] of [['rain', 96, .8, 16], ['heavy-rain', 176, 1.3, 23], ['storm', 256, 1.8, 30]]) {
    const weather = { kind, rainIntensity: kind === 'rain' ? .3 : kind === 'heavy-rain' ? .65 : .9 };
    rain.update(0, { camera, weather }); assert.equal(rain.active, count);
    const attr = rain.geometry.getAttribute('position');
    assert.ok(Math.abs(attr.getY(0) - attr.getY(1) - length) < .001);
    const before = projectedDrops(rain, camera)[0].start.y;
    const origin = new THREE.Vector3(0, 0, 0).unproject(camera);
    const expectedDelta = origin.clone().add(new THREE.Vector3(0, -speed * .01, 0)).project(camera).y;
    rain.update(.01, { camera, weather });
    assert.ok(Math.abs(projectedDrops(rain, camera)[0].start.y - before - expectedDelta) < .001);
    const paused = Array.from(attr.array);
    rain.update(4, { camera, weather, paused: true }); assert.deepEqual(Array.from(attr.array), paused);
    // Force a particle just beyond the lower viewport margin, then observe its entry point.
    rain.drops[0].y = -1.251;
    rain.update(.01, { camera, weather });
    assert.ok(projectedDrops(rain, camera)[0].start.y > 1, 'recycled rain must enter above the screen');
  }
  rain.update(0, { camera, weather: { kind: 'sun', rainIntensity: 0 } });
  assert.equal(rain.active, 0); assert.equal(rain.geometry.drawRange.count, 0);
  let disposed = 0;
  rain.geometry.addEventListener('dispose', () => disposed++); rain.material.addEventListener('dispose', () => disposed++);
  rain.dispose(); assert.equal(disposed, 2);
});

test('clouds drifting left and right wrap within their tiles over a long level',()=>{
 const atmosphere=new Atmosphere(new THREE.Scene()),camera=ortho(.52,80,-120);atmosphere.setLevel(level(100),{cloudCoverage:.7});
 for(let i=0;i<240;i++){atmosphere.update(5,{weather:{cloudCoverage:.7,windIntensity:.85},camera});for(const cloud of atmosphere.clouds){assert.ok(cloud.offsetX>=-.5&&cloud.offsetX<.5);assert.ok(cloud.offsetZ>=-.5&&cloud.offsetZ<.5);}}
 atmosphere.dispose();
});



