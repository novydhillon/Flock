import test from 'node:test';
import assert from 'node:assert/strict';
import * as THREE from 'three';
import { createBuddy, createPip, updatePipPose } from '../src/rendering/models.js';
import { applyDogPose } from '../src/rendering/animation/pip-motion.js';
import { createLevel, stepSimulation } from '../src/simulation/simulation.js';
import { MeadowRenderer } from '../src/rendering/render.js';

const v = new THREE.Vector3();
function minimumHeight(root) {
  let floor = Infinity;
  root.updateWorldMatrix(true, true);
  root.traverse((mesh) => {
    if (!mesh.isMesh) return;
    const pos = mesh.geometry.attributes.position;
    for (let i = 0; i < pos.count; i++)
      floor = Math.min(floor, v.fromBufferAttribute(pos, i).applyMatrix4(mesh.matrixWorld).y);
  });
  return floor;
}
function transforms(dog) {
  const values = [];
  dog.traverse((joint) => {
    joint.updateMatrix();
    values.push(...joint.matrix.elements);
  });
  return values;
}
const stationary = { x: 0, z: 0, vx: 0, vz: 0, heading: 0 };

test('both dogs have independent joints, a forward muzzle and a readable puppy silhouette at game scale', () => {
  const adult = createPip(),
    pup = createBuddy();
  for (const dog of [adult, pup]) {
    const { head, jaw, legs, tail } = dog.userData.parts;
    assert.equal(legs.length, 4);
    assert.ok(head.position.z > 0 && jaw.parent === head && tail.position.z < 0);
    let meshes = 0,
      triangles = 0;
    dog.traverse((mesh) => {
      if (!mesh.isMesh) return;
      meshes++;
      triangles += mesh.geometry.index.count / 3;
      assert.ok(mesh.userData.ownedGeometry && mesh.castShadow && mesh.receiveShadow);
      assert.ok(mesh.geometry.attributes.color && mesh.material.roughness > 0.8);
    });
    assert.ok(meshes <= 20 && triangles < 11000);
    dog.scale.setScalar(1.0125 * dog.userData.suggestedScale);
  }
  const size = (d) => new THREE.Box3().setFromObject(d, true).getSize(new THREE.Vector3());
  assert.ok(size(pup).y / size(adult).y > 0.72 && size(pup).y / size(adult).y < 0.92);
  assert.ok(pup.userData.parts.head.scale.x > adult.userData.parts.head.scale.x);
  const before = transforms(adult);
  for (let i = 0; i < 100; i++) updatePipPose(pup, { ...stationary, barking: true }, 1 / 60);
  assert.deepEqual(transforms(adult), before);
});

test('entire sculpt touches ground through sit, play bow, lie, scratch and rollover transitions', () => {
  for (const dog of [createPip(), createBuddy()]) {
    dog.scale.setScalar(1.0125 * dog.userData.suggestedScale);
    const s = dog.userData.motion;
    for (let pose = 0; pose < 5; pose++) {
      s.poseIndex = pose;
      for (let frame = 0; frame <= 60; frame++) {
        s.time = frame / 15;
        s.idleWeight = (1 - Math.cos((frame * Math.PI) / 30)) / 2;
        applyDogPose(dog);
        const y = minimumHeight(dog);
        assert.ok(Math.abs(y) < 0.002, `${dog.name} pose ${pose}, weight ${s.idleWeight}: bottom ${y}`);
      }
    }
  }
});

test('both collies lengthen and lower the head in flight, then gather the paws under the body', () => {
  for (const [dog, speed] of [
    [createPip(), 8.8],
    [createBuddy(), 8.272],
  ]) {
    const { body, head, legs } = dog.userData.parts;
    const standingHead = head.getWorldPosition(v).y;
    let widest = { span: 0 };
    let smallestGap = Infinity;
    for (let frame = 0; frame < 240; frame++) {
      updatePipPose(dog, { ...stationary, z: (frame * speed) / 240, vz: speed }, 1 / 240);
      const paws = legs.map(({ paw }) => paw.getWorldPosition(v).z);
      const span = Math.max(...paws.slice(0, 2)) - Math.min(...paws.slice(2));
      if (span > widest.span) {
        widest = {
          span,
          back: body.scale.z,
          head: head.getWorldPosition(v).y,
          lowestPaw: Math.min(...legs.map(({ paw }) => paw.getWorldPosition(v).y)),
        };
      }
      if (body.scale.z < 0.96) {
        smallestGap = Math.min(smallestGap, Math.abs(paws[0] - paws[2]), Math.abs(paws[1] - paws[3]));
      }
    }
    assert.ok(widest.span > 1.9 && widest.back > 1.12);
    assert.ok(widest.head < standingHead - 0.2);
    assert.ok(widest.lowestPaw > 0.079, `lowest paw at extension: ${widest.lowestPaw}`);
    assert.ok(smallestGap < 0.08, `gathered paw gap: ${smallestGap}`);
  }
});

test('planted paws hold world contact at walk, blended and galloping speeds, including on a curved path', () => {
  for (const dog of [createPip(), createBuddy()]) {
    dog.scale.setScalar(1.0125 * dog.userData.suggestedScale);
    for (const [speed, rate] of [
      [1.25, 0],
      [3.55, 0],
      [7.8, 0],
      [4, 1.2],
    ]) {
      const history = new Map();
      let contacts = 0,
        lift = 0,
        peakDrift = 0,
        maxHeightError = 0;
      for (let frame = 0; frame < 360; frame++) {
        const dt = 1 / 120,
          heading = (dog.rotation.y += dt * rate),
          vx = speed * Math.sin(heading),
          vz = speed * Math.cos(heading);
        dog.position.x += vx * dt;
        dog.position.z += vz * dt;
        updatePipPose(dog, { x: dog.position.x, z: dog.position.z, heading, vx, vz }, dt);
        for (const leg of dog.userData.parts.legs) {
          const paw = leg.paw.getWorldPosition(v);
          lift = Math.max(lift, paw.y / dog.scale.y);
          if (frame > 120 && leg.planted && history.has(leg)) {
            maxHeightError = Math.max(maxHeightError, Math.abs(paw.y / dog.scale.y - 0.074));
            peakDrift = Math.max(peakDrift, paw.distanceTo(history.get(leg)) / dt);
            contacts++;
          }
          if (leg.planted) history.set(leg, paw.clone());
          else history.delete(leg);
        }
      }
      assert.ok(contacts > 150 && lift > 0.17);
      assert.ok(maxHeightError < 0.002, `stance height error ${maxHeightError}`);
      assert.ok(peakDrift < 0.015, `${dog.name} ${speed} m/s, ${rate} rad/s: drift ${peakDrift}`);
    }
  }
});

for (const hz of [60, 120]) {
  for (const lead of [-0.15, 0.15]) {
    test(`Pip holds planted paws through a full-stick turn at ${hz} Hz with ${lead} rad lead`, (t) => {
      const level = createLevel(0, 201);
      const actor = level.dog;
      const dog = createPip();
      dog.scale.setScalar(1.0125);
      const view = { level, barkEffects: [] };
      const history = new Map();
      let peakDrift = 0;
      let contacts = 0;
      let minSpeed = Infinity;
      let minYaw = Infinity;
      for (let frame = 0; frame < 3 * hz; frame++) {
        const heading = actor.heading ?? 0;
        const aim = heading + lead;
        stepSimulation(level, actor, { x: Math.sin(aim), z: Math.cos(aim) }, 1 / hz);
        MeadowRenderer.prototype.updateDog.call(view, dog, actor, 1 / hz, false);

        const delta = actor.heading - heading;
        if (frame > 0) minYaw = Math.min(minYaw, Math.sign(lead) * Math.atan2(Math.sin(delta), Math.cos(delta)) * hz);
        minSpeed = Math.min(minSpeed, Math.hypot(actor.vx, actor.vz));
        for (const leg of dog.userData.parts.legs) {
          if (leg.planted) {
            const paw = leg.paw.getWorldPosition(v);
            if (history.has(leg)) {
              peakDrift = Math.max(peakDrift, paw.distanceTo(history.get(leg)) * hz);
              contacts++;
            }
            history.set(leg, paw.clone());
          } else history.delete(leg);
        }
      }
      t.diagnostic(
        `speed >= ${minSpeed.toFixed(3)} m/s, yaw >= ${minYaw.toFixed(3)} rad/s, ${contacts} contact intervals, peak drift ${peakDrift.toExponential(3)} m/s`,
      );
      assert.ok(minSpeed > 7.7 && minYaw > 7.9 && contacts > hz);
      assert.ok(peakDrift < 0.015, `planted paw drift ${peakDrift} m/s`);
    });
  }
}

test('barking opens the jaw, pause holds every joint, and relocation clears the pose', () => {
  const dog = createBuddy(),
    { jaw } = dog.userData.parts;
  for (let i = 0; i < 85; i++) updatePipPose(dog, stationary, 1 / 60);
  const closed = jaw.rotation.x;
  for (let i = 0; i < 6; i++) updatePipPose(dog, { ...stationary, barking: true }, 1 / 60);
  assert.ok(jaw.rotation.x > closed + 0.3);
  const before = transforms(dog);
  updatePipPose(dog, { ...stationary, x: 100 }, 0);
  assert.deepEqual(transforms(dog), before);
  updatePipPose(dog, { ...stationary, x: 100 }, 1 / 60);
  assert.deepEqual(transforms(dog), transforms(createBuddy()));
});

for (const hz of [30, 60, 120]) {
  test(`Pip holds or lifts through abrupt turns, reversals and braking at ${hz} Hz`, (t) => {
    const scripts = [
      [
        [0, 1],
        [0, -1],
        [-1, 0],
        [1, 0],
      ],
      [
        [0, 0.45],
        [0, -0.45],
        [-0.45, 0],
        [0.45, 0],
      ],
      [
        [0, 1],
        [0, 0.19],
        [0, 0],
        [0, -0.45],
        [0, -1],
      ],
    ];
    for (const script of scripts) {
      const level = createLevel(0, 201);
      const dog = createPip();
      dog.scale.setScalar(1.0125);
      const view = { level, barkEffects: [] };
      const history = new Map();
      let peakDrift = 0;
      let releases = 0;
      let minLift = Infinity;
      let peakReleaseTravel = 0;
      for (const [x, z] of script) {
        let contacts = 0;
        for (let frame = 0; frame < hz; frame++) {
          stepSimulation(level, level.dog, { x, z }, 1 / hz);
          MeadowRenderer.prototype.updateDog.call(view, dog, level.dog, 1 / hz, false);
          for (const leg of dog.userData.parts.legs) {
            const paw = leg.paw.getWorldPosition(v);
            const height = paw.y - dog.position.y - 0.074 * dog.scale.y;
            if (leg.planted) {
              assert.ok(Math.abs(height) < 0.002);
              if (history.has(leg)) {
                peakDrift = Math.max(peakDrift, paw.distanceTo(history.get(leg)));
                contacts++;
              }
              history.set(leg, paw.clone());
            } else {
              if (leg.liftOff != null && history.has(leg)) {
                minLift = Math.min(minLift, height);
                const last = history.get(leg);
                peakReleaseTravel = Math.max(peakReleaseTravel, Math.hypot(paw.x - last.x, paw.z - last.z));
                releases++;
              }
              history.delete(leg);
            }
          }
        }
        if (x || z) assert.ok(contacts > hz / 2, 'sustained support during each moving segment');
      }
      assert.ok(peakDrift * hz < 0.015, `loaded paw moved ${peakDrift} m in one frame`);
      assert.ok(peakReleaseTravel < 0.15, `first airborne step traveled ${peakReleaseTravel} m`);
      assert.ok(releases > 0 && minLift > 0.015, 'paw clears ground on early release');
      t.diagnostic(
        `stick ${JSON.stringify(script)}: peak planted step ${peakDrift.toExponential(2)} m, ${releases} early lifts, minimum ${minLift.toFixed(3)} m, first airborne travel <= ${peakReleaseTravel.toFixed(3)} m`,
      );
    }
  });
}
