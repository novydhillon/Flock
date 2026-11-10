import test from 'node:test';
import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import * as THREE from 'three';
import { Atmosphere } from '../src/atmosphere.js';
import { RainView } from '../src/rain-view.js';

const level = (index) => ({
  index,
  seed: index + 42,
  bounds: { minX: -80, maxX: 80, minZ: -80, maxZ: 80 },
  rivers: [],
});
function ortho(aspect, x, z) {
  const camera = new THREE.OrthographicCamera(-24 * aspect, 24 * aspect, 24, -24, 0.1, 300);
  camera.position.set(x, 36, z + 29);
  camera.lookAt(x, 0, z - 2);
  camera.updateProjectionMatrix();
  camera.updateMatrixWorld(true);
  return camera;
}
function rayPlane(camera, nx, ny, y) {
  const ray = new THREE.Raycaster();
  ray.setFromCamera(new THREE.Vector2(nx, ny), camera);
  return ray.ray.intersectPlane(new THREE.Plane(new THREE.Vector3(0, 1, 0), -y), new THREE.Vector3());
}
function alphaAt(texture, u, v) {
  const x = Math.max(0, Math.min(63, Math.floor(u * 64))),
    y = Math.max(0, Math.min(63, Math.floor(v * 64)));
  return texture.image.data[(y * 64 + x) * 4 + 3] / 255;
}
function setOfQuadClouds(mesh, camera, targets) {
  const inverse = new THREE.Matrix4(),
    local = new THREE.Vector3(),
    hits = new Array(targets.length).fill(false);
  for (let i = 0; i < mesh.count; i++) {
    const matrix = new THREE.Matrix4();
    mesh.getMatrixAt(i, matrix);
    inverse.copy(matrix).invert();
    for (let j = 0; j < targets.length; j++) {
      if (hits[j]) continue;
      const [nx, ny] = targets[j],
        point = rayPlane(camera, nx, ny, 13);
      local.copy(point).applyMatrix4(inverse);
      if (
        Math.abs(local.x) <= 0.5 &&
        Math.abs(local.y) <= 0.5 &&
        alphaAt(mesh.material.map, local.x + 0.5, local.y + 0.5) > 0.04
      )
        hits[j] = true;
    }
  }
  return hits;
}
function instanceCenter(mesh, index) {
  const matrix = new THREE.Matrix4(),
    center = new THREE.Vector3();
  mesh.getMatrixAt(index, matrix);
  matrix.decompose(center, new THREE.Quaternion(), new THREE.Vector3());
  return center;
}

test('orthographic camera-ray footprint and cloud alpha cover screen corners across levels and travel', () => {
  const scene = new THREE.Scene(),
    atmosphere = new Atmosphere(scene),
    corners = [
      [-0.98, -0.98],
      [-0.98, 0.98],
      [0.98, -0.98],
      [0.98, 0.98],
    ];
  for (const index of [1, 9, 16, 24, 100]) {
    atmosphere.setLevel(level(index), { cloudCoverage: 0.5 });
    for (const camera of [ortho(16 / 9, 0, 0), ortho(0.6, index * 2.7, -index * 1.4)]) {
      camera.updateMatrixWorld(true);
      const independent = [
        [-1, -1],
        [-1, 1],
        [1, -1],
        [1, 1],
      ].map(([x, y]) => rayPlane(camera, x, y, 13));
      const bounds = atmosphere.projectedFootprint(camera, 13);
      assert.ok(Math.abs(bounds.minX - Math.min(...independent.map((p) => p.x))) < 1e-5);
      assert.ok(Math.abs(bounds.maxZ - Math.max(...independent.map((p) => p.z))) < 1e-5);
      atmosphere.update(0, { weather: { cloudCoverage: 0.55 }, camera, paused: true });
      scene.updateMatrixWorld(true);
      assert.ok(
        setOfQuadClouds(atmosphere.cloudMesh, camera, corners).every(Boolean),
        `screen corner lacks cloud alpha at level ${index}`,
      );
      assert.ok(atmosphere.cloudMesh.material.opacity >= 0.1 && atmosphere.cloudMesh.material.opacity <= 0.25);
    }
  }
  const camera = ortho(0.6, 120, -40);
  atmosphere.update(0, { weather: {}, camera, paused: true });
  const before = atmosphere.clouds.map((_, i) => [
    instanceCenter(atmosphere.cloudMesh, i).toArray(),
    instanceCenter(atmosphere.shadowMesh, i).toArray(),
  ]);
  atmosphere.update(0.5, { weather: { cloudCoverage: 0.5, windIntensity: 0.5 }, camera });
  const cloudAfter = atmosphere.clouds.map((_, i) => instanceCenter(atmosphere.cloudMesh, i));
  const shadowAfter = atmosphere.clouds.map((_, i) => instanceCenter(atmosphere.shadowMesh, i));
  assert.ok(Math.abs(cloudAfter[0].x - before[0][0][0]) > 0.1, 'clouds should drift in world space');
  assert.ok(Math.abs(shadowAfter[0].x - before[0][1][0]) > 0.1, 'shadow should follow cloud drift');
  assert.ok(Math.abs(shadowAfter[0].x - before[0][1][0] - (cloudAfter[0].x - before[0][0][0])) < 1e-5);
  assert.ok(Math.abs(shadowAfter[0].z - before[0][1][2] - (cloudAfter[0].z - before[0][0][2])) < 1e-5);
  const moving = atmosphere.clouds.map((_, i) => [
    atmosphere.cloudMesh.instanceMatrix.array.slice(i * 16, i * 16 + 16),
    atmosphere.shadowMesh.instanceMatrix.array.slice(i * 16, i * 16 + 16),
  ]);
  atmosphere.update(3, { weather: { cloudCoverage: 0.5, windIntensity: 0.5 }, camera, paused: true });
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

test('rain preserves baseline vertex buffers and random sequence through weather, travel and pause', () => {
  const rain = new RainView(new THREE.Scene());
  const camera = new THREE.OrthographicCamera(-15, 15, 24, -24, 0.1, 300);
  camera.position.set(140, 36, -46);
  camera.lookAt(140, 0, -77);
  camera.updateProjectionMatrix();
  // Captured from the allocating implementation before scratch-vector reuse.
  const baseline = [
    ['rain', 'a9858b85e036de56d9d56267b3fc560321b57cc5308b31e0ae7f2f90ebeffdac', 254314684],
    ['heavy-rain', 'b10d4e109f01820ad63f92072b1db24d5314de21c1d04a3143e3d8fb0cb7a95f', 723611788],
    ['storm', '720b6e63bf7e99c2936069a465e3cd60d8a37a1c763a43598b59485bcf003a0c', 3982419693],
    ['sun', 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855', 3982419693],
    ['storm', '79043bca306fb4c00d8cb7bec72b20a781fd85e4daa0c0b3b1cda8baf2bce384', 1633090260],
  ];
  for (const [kind, expected, randomState] of baseline) {
    const weather = {
      kind,
      rainIntensity: kind === 'rain' ? 0.3 : kind === 'heavy-rain' ? 0.65 : kind === 'sun' ? 0 : 0.9,
      windIntensity: -0.85,
    };
    const hash = createHash('sha256');
    for (let frame = 0; frame < 80; frame++) {
      camera.position.x += 0.3;
      camera.position.z -= 0.2;
      rain.update(frame % 17 === 0 ? 0 : 0.1, { weather, camera, paused: frame % 19 === 0 });
      hash.update(Buffer.from(rain.positions.buffer));
    }
    assert.equal(hash.digest('hex'), expected, `${kind} retains every rendered vertex across all frames`);
    assert.equal(rain.randomState, randomState, `${kind} retains the seeded spawn/wrap sequence`);
  }
  rain.dispose();
});

test('rain curtain covers beyond every viewport edge at actual camera tilt, aspect, zoom and travel', () => {
  const rain = new RainView(new THREE.Scene());
  for (const aspect of [0.46, 0.6, 1, 16 / 9, 2.4]) {
    for (const height of [36, 39, 44, 50]) {
      const camera = ortho(aspect, 140, -75);
      camera.left = (-height / 2) * aspect;
      camera.right = (height / 2) * aspect;
      camera.top = height / 2;
      camera.bottom = -height / 2;
      camera.updateProjectionMatrix();
      rain.update(0, { camera, weather: { kind: 'storm', rainIntensity: 0.9, windIntensity: 0.85 } });
      for (let frame = -1; frame < 180; frame++) {
        camera.position.x += 0.3;
        camera.position.z -= 0.2;
        camera.updateMatrixWorld(true);
        rain.update(frame < 0 ? 0 : 0.1, {
          camera,
          weather: { kind: 'storm', rainIntensity: 0.9, windIntensity: 0.85 },
        });
        const drops = projectedDrops(rain, camera);
        if (frame === -1 || frame % 30 === 0) {
          for (const edge of ['left', 'right', 'top', 'bottom']) {
            const covered = drops.some(({ start }) =>
              edge === 'left'
                ? start.x < -1
                : edge === 'right'
                  ? start.x > 1
                  : edge === 'top'
                    ? start.y > 1
                    : start.y < -1,
            );
            assert.ok(covered, `${edge} edge missing: aspect ${aspect}, height ${height}, frame ${frame}`);
          }
          // The old 85% footprint excluded the corners completely.
          for (const sx of [-1, 1])
            for (const sy of [-1, 1]) {
              assert.ok(
                drops.some(({ start }) => start.x * sx > 0.85 && start.y * sy > 0.85),
                'rain must populate corner margins',
              );
            }
        }
        assert.ok(
          drops.every(({ start, end }) => end.y < start.y),
          'all streaks fall downward',
        );
        assert.ok(
          drops.every(({ start, end }) => Math.abs(end.x - start.x) / (start.y - end.y) > 0.1),
          'storm must have a visible projected slant',
        );
      }
    }
  }
  rain.dispose();
});

test('rain respawns above screen, preserves falling speed, pause and bounded resources', () => {
  const rain = new RainView(new THREE.Scene()),
    camera = ortho(0.6, 140, -75);
  for (const [kind, count, length, speed] of [
    ['rain', 96, 0.8, 16],
    ['heavy-rain', 176, 1.3, 23],
    ['storm', 256, 1.8, 30],
  ]) {
    const weather = { kind, rainIntensity: kind === 'rain' ? 0.3 : kind === 'heavy-rain' ? 0.65 : 0.9 };
    rain.update(0, { camera, weather });
    assert.equal(rain.active, count);
    const attr = rain.geometry.getAttribute('position');
    assert.ok(Math.abs(attr.getY(0) - attr.getY(1) - length) < 0.001);
    const before = projectedDrops(rain, camera)[0].start.y;
    const origin = new THREE.Vector3(0, 0, 0).unproject(camera);
    const expectedDelta = origin
      .clone()
      .add(new THREE.Vector3(0, -speed * 0.01, 0))
      .project(camera).y;
    rain.update(0.01, { camera, weather });
    assert.ok(Math.abs(projectedDrops(rain, camera)[0].start.y - before - expectedDelta) < 0.001);
    const paused = Array.from(attr.array);
    rain.update(4, { camera, weather, paused: true });
    assert.deepEqual(Array.from(attr.array), paused);
    // Force a particle just beyond the lower viewport margin, then observe its entry point.
    rain.drops[0].y = -1.251;
    rain.update(0.01, { camera, weather });
    assert.ok(projectedDrops(rain, camera)[0].start.y > 1, 'recycled rain must enter above the screen');
  }
  rain.update(0, { camera, weather: { kind: 'sun', rainIntensity: 0 } });
  assert.equal(rain.active, 0);
  assert.equal(rain.geometry.drawRange.count, 0);
  let disposed = 0;
  rain.geometry.addEventListener('dispose', () => disposed++);
  rain.material.addEventListener('dispose', () => disposed++);
  rain.dispose();
  assert.equal(disposed, 2);
});

test('clouds drifting left and right wrap within their tiles over a long level', () => {
  const atmosphere = new Atmosphere(new THREE.Scene()),
    camera = ortho(0.52, 80, -120);
  atmosphere.setLevel(level(100), { cloudCoverage: 0.7 });
  for (let i = 0; i < 240; i++) {
    atmosphere.update(5, { weather: { cloudCoverage: 0.7, windIntensity: 0.85 }, camera });
    for (const cloud of atmosphere.clouds) {
      assert.ok(cloud.offsetX >= -0.5 && cloud.offsetX < 0.5);
      assert.ok(cloud.offsetZ >= -0.5 && cloud.offsetZ < 0.5);
    }
  }
  atmosphere.dispose();
});
