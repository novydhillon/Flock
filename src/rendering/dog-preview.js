import * as THREE from 'three';
import { createBuddy, createPip } from './border-collie.js';
import { applyDogPose, createPipMotionState, updatePipPose } from './animation/pip-motion.js';

const walkOnSpeed = 5.8;
const crewSpacing = 1.43;

function removeDog(actor) {
  actor.mesh.removeFromParent();
  actor.mesh.traverse((part) => {
    if (part.userData.ownedGeometry) part.geometry.dispose();
  });
}

// Previews own their rigs and never step the live meadow or its dogs.
export function mountDogPreview(
  container,
  { solo = false, createRenderer = (options) => new THREE.WebGLRenderer(options) } = {},
) {
  const win = container.ownerDocument.defaultView;
  const noPreview = { show() {}, dispose() {} };
  if (!win?.WebGL2RenderingContext) return noPreview;
  const canvas = container.ownerDocument.createElement('canvas');
  canvas.setAttribute('aria-hidden', 'true');
  let renderer;
  try {
    renderer = createRenderer({ canvas, alpha: true, antialias: true });
  } catch {
    return noPreview;
  }
  renderer.setPixelRatio(Math.min(win.devicePixelRatio || 1, 1.5));

  const scene = new THREE.Scene();
  const camera = new THREE.OrthographicCamera();
  camera.position.set(0, 2.55, 7);
  camera.lookAt(0, 0.66, 0);
  const sun = new THREE.DirectionalLight(0xfff0d9, 2.25);
  sun.position.set(-3, 5, 4);
  scene.add(new THREE.HemisphereLight(0xf1f9ff, 0x9a855d, 2.1), sun);
  const shadowGeo = new THREE.CircleGeometry(1, 28);
  shadowGeo.rotateX(-Math.PI / 2);
  const shadowMat = new THREE.MeshBasicMaterial({ color: 0x52744c, transparent: true, opacity: 0.18 });

  const reduceMotion = win.matchMedia('(prefers-reduced-motion: reduce)');
  const actors = new Map();
  let requested = [];
  let outgoing = null;
  let requestId;
  let previousTime = null;
  let disposed = false;
  let needsRender = true;
  let reduced = reduceMotion.matches;
  let width = 0;
  let height = 0;
  let cameraSpan = 3;

  function createActor(dog) {
    const mesh = dog.model === 'buddy' ? createBuddy(dog.coat) : createPip(dog.coat);
    mesh.scale.setScalar(mesh.userData.suggestedScale);
    mesh.userData.motion.random = Math.random;
    const shadow = new THREE.Mesh(shadowGeo, shadowMat);
    shadow.scale.set(0.57 * mesh.scale.x, 1, 0.82 * mesh.scale.x);
    scene.add(mesh, shadow);
    return { mesh, shadow, x: 0, target: 0, heading: 0.28 };
  }

  function release(actor) {
    removeDog(actor);
    actor.shadow.removeFromParent();
  }

  function layout() {
    const nextWidth = container.clientWidth;
    const nextHeight = container.clientHeight;
    if (!nextWidth || !nextHeight) return false;
    const ratio = nextWidth / nextHeight;
    cameraSpan = Math.max(solo ? 3.05 : 6.1, 1.95 * ratio);
    camera.left = -cameraSpan / 2;
    camera.right = cameraSpan / 2;
    camera.top = cameraSpan / ratio / 2;
    camera.bottom = -camera.top;
    camera.updateProjectionMatrix();
    if (width !== nextWidth || height !== nextHeight) {
      width = nextWidth;
      height = nextHeight;
      renderer.setSize(width, height, false);
      needsRender = true;
    }
    return true;
  }

  function frame(now) {
    requestId = win.requestAnimationFrame(frame);
    if (container.ownerDocument.hidden || (previousTime !== null && now - previousTime < 31)) return;
    const dt = previousTime === null ? 1 / 30 : Math.min(0.05, (now - previousTime) / 1000);
    previousTime = now;
    if (reduced !== reduceMotion.matches) {
      reduced = reduceMotion.matches;
      needsRender = true;
    }
    if (!layout() || (reduced && !needsRender && !outgoing)) return;
    if (outgoing && (reduceMotion.matches || outgoing.x > cameraSpan / 2 + 1.3)) {
      release(outgoing);
      outgoing = null;
      syncActors(true);
    }
    for (const actor of outgoing ? [...actors.values(), outgoing] : actors.values()) {
      const { mesh, shadow } = actor;
      const oldX = actor.x;
      actor.x =
        actor === outgoing
          ? actor.x + walkOnSpeed * dt
          : reduceMotion.matches
            ? actor.target
            : Math.min(actor.target, actor.x + walkOnSpeed * dt);
      const vx = (actor.x - oldX) / dt;
      const facing = Math.atan2(-actor.x, camera.position.z);
      const standingHeading = Math.max(-Math.PI / 6, Math.min(Math.PI / 6, facing + 0.29));
      const movingHeading = Math.PI / 2;
      const wanted = vx > 0.2 && !reduceMotion.matches ? movingHeading : standingHeading;
      if (reduced) actor.heading = standingHeading;
      else actor.heading += (wanted - actor.heading) * (1 - Math.exp(-dt * 12));
      mesh.position.x = shadow.position.x = actor.x;
      mesh.rotation.y = actor.heading;
      shadow.rotation.y = actor.heading;
      if (reduced) {
        mesh.userData.motion = createPipMotionState(mesh.userData.motion.puppy, Math.random);
        mesh.userData.parts.legs.forEach((leg) => {
          leg.planted = false;
          leg.liftOff = null;
        });
        applyDogPose(mesh);
        mesh.userData.parts.head.rotation.y += facing - actor.heading;
      } else {
        updatePipPose(
          mesh,
          { x: actor.x, z: 0, vx, vz: 0, heading: actor.heading, nearAnimal: true, bowHeading: facing },
          dt,
        );
        const motion = mesh.userData.motion;
        mesh.rotation.y += motion.bowYaw;
        if (motion.effort < 0.1 && motion.poseWeights[3] + motion.poseWeights[4] < 0.01)
          mesh.userData.parts.head.rotation.y += facing - actor.heading - motion.bowYaw;
      }
    }
    renderer.render(scene, camera);
    needsRender = false;
  }

  const keyFor = ({ id, model, coat }) => JSON.stringify([id, model, coat]);
  function syncActors(entering = false) {
    if (outgoing) return;
    requested.forEach((dog, i) => {
      const key = keyFor(dog);
      const target = (i - (requested.length - 1) / 2) * crewSpacing;
      const actor = actors.get(key) ?? createActor(dog);
      actor.target = target;
      if (!solo) actor.x = target;
      else if (entering && !reduceMotion.matches) actor.x = -cameraSpan / 2 - 1.3;
      actors.set(key, actor);
    });
  }

  function show(dogs) {
    if (disposed) return;
    needsRender = true;
    const initial = requested.length === 0;
    requested = dogs;
    const nextKeys = new Set(dogs.map(keyFor));
    for (const [key, actor] of actors) {
      if (nextKeys.has(key)) continue;
      actors.delete(key);
      if (solo && !reduceMotion.matches) outgoing = actor;
      else release(actor);
    }
    syncActors(solo && !initial);
  }

  container.append(canvas);
  container.classList.add('dog-preview-active');
  canvas.addEventListener('webglcontextlost', dispose, { once: true });
  requestId = win.requestAnimationFrame(frame);
  function dispose() {
    if (disposed) return;
    disposed = true;
    canvas.removeEventListener('webglcontextlost', dispose);
    win.cancelAnimationFrame(requestId);
    actors.forEach(release);
    actors.clear();
    if (outgoing) release(outgoing);
    outgoing = null;
    requested = [];
    shadowGeo.dispose();
    shadowMat.dispose();
    renderer.dispose();
    renderer.forceContextLoss();
    canvas.remove();
    container.classList.remove('dog-preview-active');
  }
  return { show, dispose };
}
