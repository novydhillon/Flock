import * as THREE from 'three';
import { createTreeWood, configureTreeMaterial } from './tree-geometry.js';
import { createPipMotionState, updatePipMotion } from './pip-motion.js';
export { deformTreeGeometry } from './tree-geometry.js';
import { mergeGeometries } from 'three/addons/utils/BufferGeometryUtils.js';

// Rounded sculpted forms and tiny enamel/brass details give the machines a
// friendly hand-built character. Geometry is shared between flock members.
const geometryCache = new Map();
// Static constructor references let the production bundler omit unused Three
// exports instead of retaining the entire namespace for dynamic lookup.
const geometryConstructors = {
  TorusGeometry: THREE.TorusGeometry,
  SphereGeometry: THREE.SphereGeometry,
  BoxGeometry: THREE.BoxGeometry,
  CylinderGeometry: THREE.CylinderGeometry,
  ConeGeometry: THREE.ConeGeometry,
};
const modelCache = new Map();
let materialCache;

// Tree trunk width follows the rendered instance scale continuously; canopy
// maturity remains in three shared tiers so cache size never grows per tree.
export function treeTrunkFactor(scale) {
  return 0.7 + 0.2 * Math.max(0, Math.min(1, (scale - 1.015) / (3.1 - 1.015)));
}

// A flock may contain dozens of animals. Collapse decorative pieces by material
// and share the resulting geometry across clones; limb meshes retain hip pivots.
function bakeModel(root) {
  root.updateMatrixWorld(true);
  const byMaterial = new Map();
  root.traverse((object) => {
    if (!object.isMesh) return;
    if (!byMaterial.has(object.material)) byMaterial.set(object.material, []);
    const piece = object.geometry.clone().applyMatrix4(object.matrixWorld);
    if (root.userData.animalRig) {
      const count = piece.attributes.position.count,
        tag = object.userData.gestureKind || 0;
      const pivot = new THREE.Vector3(...(object.userData.gesturePivot || [0, 0, 0])).applyMatrix4(root.matrixWorld);
      const tags = new Float32Array(count * 2),
        pivots = new Float32Array(count * 3);
      for (let i = 0; i < count; i++) {
        tags[i * 2] = tag;
        tags[i * 2 + 1] = object.userData.gestureSide || 1;
        pivots.set(pivot.toArray(), i * 3);
      }
      piece.setAttribute('animalGesturePart', new THREE.BufferAttribute(tags, 2));
      piece.setAttribute('animalGesturePivot', new THREE.BufferAttribute(pivots, 3));
    }
    byMaterial.get(object.material).push(piece);
  });
  const baked = new THREE.Group();
  baked.name = root.name;
  baked.userData.parts = {};
  for (const [material, pieces] of byMaterial) {
    const combined = mergeGeometries(pieces, false);
    pieces.forEach((piece) => piece.dispose());
    if (root.userData.animalRig) combined.userData.animalRig = true;
    const object = new THREE.Mesh(combined, root.userData.animalRig ? animalGestureMaterial(material) : material);
    object.castShadow = object.receiveShadow = true;
    baked.add(object);
  }
  return baked;
}

function cachedModel(key, root) {
  const baked = bakeModel(root);
  modelCache.set(key, baked);
  return baked.clone();
}

function geometry(kind, args) {
  const key = `${kind}:${args.join(',')}`;
  if (!geometryCache.has(key)) geometryCache.set(key, new geometryConstructors[kind](...args));
  return geometryCache.get(key);
}

function clayTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = canvas.height = 128;
  const context = canvas.getContext('2d');
  const data = context.createImageData(128, 128);
  for (let p = 0; p < data.data.length; p += 4) {
    // Deterministic grain, kept subtle enough for the model's silhouette to read.
    const n = 224 + ((p * 13 + (p >>> 5) * 7) % 27);
    data.data[p] = data.data[p + 1] = data.data[p + 2] = n;
    data.data[p + 3] = 255;
  }
  context.putImageData(data, 0, 0);
  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(2, 2);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

function woodTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = canvas.height = 128;
  const context = canvas.getContext('2d');
  const data = context.createImageData(128, 128);
  for (let y = 0; y < 128; y++) {
    for (let x = 0; x < 128; x++) {
      const grain = Math.sin(x * 0.38 + Math.sin(y * 0.051) * 1.7);
      const knots = Math.sin(Math.hypot(x - 78, (y - 45) * 0.4) * 0.38);
      const value = Math.round(227 + grain * 12 + knots * 4 + ((x * 7 + y * 11) % 7));
      const p = (y * 128 + x) * 4;
      data.data[p] = data.data[p + 1] = data.data[p + 2] = value;
      data.data[p + 3] = 255;
    }
  }
  context.putImageData(data, 0, 0);
  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

function barkTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = canvas.height = 128;
  const context = canvas.getContext('2d');
  const data = context.createImageData(128, 128);
  for (let y = 0; y < 128; y++)
    for (let x = 0; x < 128; x++) {
      // Long, gently wandering ridges read as bark at phone scale without a
      // high-frequency stripe pattern that shimmers as the camera moves.
      const groove =
        Math.sin(x * 0.31 + Math.sin(y * 0.045) * 1.65) * 8 + Math.sin(x * 0.11 + Math.sin(y * 0.021) * 2.6) * 5;
      const scar = Math.sin(Math.hypot(x - 35, (y - 74) * 0.15) * 0.46) * 4;
      const grain = ((x * 17 + y * 31 + ((x * y) % 29)) % 9) - 4;
      const value = Math.max(0, Math.min(255, Math.round(132 + groove + scar + grain)));
      const p = (y * 128 + x) * 4;
      data.data[p] = value;
      data.data[p + 1] = value;
      data.data[p + 2] = value;
      data.data[p + 3] = 255;
    }
  context.putImageData(data, 0, 0);
  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(1.2, 1.7);
  return texture;
}

function foliageTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = canvas.height = 128;
  const context = canvas.getContext('2d');
  const image = context.createImageData(128, 128);
  const palette = [
    [188, 203, 148],
    [210, 207, 153],
    [164, 191, 137],
    [223, 207, 155],
    [154, 184, 133],
  ];
  // Wide, deterministic mottles suggest layers of leaves. Pixel generation
  // uses the same minimal Canvas surface as the existing model textures.
  for (let y = 0; y < 128; y++)
    for (let x = 0; x < 128; x++) {
      const wave = Math.sin(x * 0.17 + Math.sin(y * 0.11) * 1.4) + Math.cos(y * 0.19 - x * 0.07);
      const grain = ((x * 17 + y * 31 + ((x * y) % 29)) % 13) - 6;
      const color = palette[(Math.floor((wave + 2) * 1.25) + Math.floor(x / 19) + Math.floor(y / 23)) % palette.length];
      const p = (y * 128 + x) * 4;
      image.data[p] = Math.max(0, Math.min(255, color[0] + grain));
      image.data[p + 1] = Math.max(0, Math.min(255, color[1] + grain));
      image.data[p + 2] = Math.max(0, Math.min(255, color[2] + grain));
      image.data[p + 3] = 255;
    }
  context.putImageData(image, 0, 0);
  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

export function createMaterials() {
  if (materialCache) return materialCache;
  const tactile = clayTexture();
  const clay = (color) => new THREE.MeshStandardMaterial({ color, roughness: 0.9, map: tactile });
  const enamel = (color) => new THREE.MeshStandardMaterial({ color, roughness: 0.55, metalness: 0.18, map: tactile });
  materialCache = {
    cream: enamel('#f5ead3'),
    white: enamel('#fff8e7'),
    dark: enamel('#354b55'),
    brass: new THREE.MeshStandardMaterial({ color: '#ddb469', roughness: 0.48, metalness: 0.62 }),
    orange: enamel('#e6a04e'),
    dogCream: enamel('#ffe5ac'),
    rust: enamel('#c7704d'),
    cyan: new THREE.MeshStandardMaterial({
      color: '#b6fbff',
      emissive: '#69dfe9',
      emissiveIntensity: 0.8,
      roughness: 0.32,
    }),
    mint: enamel('#84cbb7'),
    black: enamel('#20343e'),
    wood: clay('#ba9167'),
    paleWood: clay('#e1bb87'),
    bark: clay('#8b7758'),
    leaves: clay('#8cbd8b'),
    leavesLight: clay('#b8d28f'),
    leavesDark: clay('#619b84'),
    roof: clay('#bf755f'),
    barn: clay('#d9977e'),
    barnTrim: clay('#fae7c2'),
    flowerPink: clay('#f2a6a6'),
    flowerYellow: clay('#ffe28a'),
    flowerWhite: clay('#fff7e5'),
    flowerCenter: clay('#daa661'),
    stem: clay('#7fab72'),
    stone: clay('#abb7a4'),
  };
  materialCache.eye = materialCache.white;
  materialCache.pupil = materialCache.black;
  const grain = woodTexture();
  for (const name of ['wood', 'paleWood']) materialCache[name].map = grain;
  const bark = barkTexture();
  materialCache.bark.map = materialCache.bark.bumpMap = bark;
  materialCache.bark.bumpScale = 0.055;
  // Forks have no global cylindrical UV chart. Their dedicated material uses
  // subtle, seam-free vertex grain; ordinary bush stems retain their bark UVs.
  materialCache.treeWood = materialCache.bark.clone();
  materialCache.treeWood.map = materialCache.treeWood.bumpMap = null;
  materialCache.treeWood.vertexColors = true;
  configureTreeMaterial(materialCache.treeWood);
  const foliage = foliageTexture();
  for (const name of ['leaves', 'leavesLight', 'leavesDark']) materialCache[name].map = foliage;
  materialCache.leaves.needsUpdate =
    materialCache.leavesLight.needsUpdate =
    materialCache.leavesDark.needsUpdate =
      true;
  return materialCache;
}

function mesh(parent, type, args, material, pos = [0, 0, 0], scale = [1, 1, 1]) {
  const object = new THREE.Mesh(geometry(type, args), material);
  object.position.set(...pos);
  object.scale.set(...scale);
  object.castShadow = true;
  object.receiveShadow = true;
  parent.add(object);
  return object;
}
function sphere(parent, material, pos, scale, detail = 10) {
  return mesh(parent, 'SphereGeometry', [1, detail, 6], material, pos, scale);
}
function sculptedSphere(parent, material, pos, scale, amount = 0.025, detail = 10) {
  const key = `sculpted-sphere:${amount}:${detail}`;
  if (!geometryCache.has(key)) {
    const sculpted = geometry('SphereGeometry', [1, detail, Math.max(3, Math.round(detail * 0.6))]).clone();
    const vertices = sculpted.attributes.position;
    for (let i = 0; i < vertices.count; i++) {
      const x = vertices.getX(i),
        y = vertices.getY(i),
        z = vertices.getZ(i);
      // Continuous surface displacement keeps UV seams and pole vertices joined.
      const factor = 1 + amount * Math.sin(x * 4.1 + z * 2.8) * Math.cos(y * 3.7 - z * 1.3);
      vertices.setXYZ(i, x * factor, y * factor, z * factor);
    }
    sculpted.computeVertexNormals();
    geometryCache.set(key, sculpted);
  }
  const object = new THREE.Mesh(geometryCache.get(key), material);
  object.position.set(...pos);
  object.scale.set(...scale);
  object.castShadow = object.receiveShadow = true;
  parent.add(object);
  return object;
}
function box(parent, material, pos, scale) {
  return mesh(parent, 'BoxGeometry', [1, 1, 1], material, pos, scale);
}
function cylinder(parent, material, pos, radius, height, rotation) {
  const object = mesh(parent, 'CylinderGeometry', [radius, radius, height, 10], material, pos);
  if (rotation) object.rotation.set(...rotation);
  return object;
}
function eye(parent, m, x, y, z, size = 0.105) {
  sphere(parent, m.eye, [x, y, z], [size, size * 1.08, size * 0.55]);
  sphere(parent, m.pupil, [x, y - size * 0.05, z + size * 0.45], [size * 0.43, size * 0.58, size * 0.23]);
  sphere(
    parent,
    m.white,
    [x - size * 0.14, y + size * 0.2, z + size * 0.67],
    [size * 0.15, size * 0.15, size * 0.12],
    8,
  );
}
function panel(parent, m, pos, scale, material = m.brass) {
  const p = sphere(parent, material, pos, scale);
  return p;
}
function leg(parent, m, x, z, height, footMaterial = m.dark) {
  const g = new THREE.Group();
  g.position.set(x, height + 0.1, z);
  parent.add(g);
  sphere(g, m.brass, [0, 0, 0], [0.105, 0.105, 0.105]);
  cylinder(g, m.dark, [0, -height * 0.45, 0], 0.065, height * 0.85);
  sphere(g, m.brass, [0, -height * 0.72, 0], [0.078, 0.078, 0.078]);
  sphere(g, footMaterial, [0, -height + 0.025, 0.055], [0.115, 0.1, 0.17]);
  return g;
}

export function createDog() {
  const m = createMaterials();
  const dog = new THREE.Group();
  dog.name = 'Pip the robot sheepdog';
  const body = sculptedSphere(dog, m.orange, [0, 0.55, 0], [0.29, 0.3, 0.49]);
  sphere(dog, m.dogCream, [0, 0.47, 0.25], [0.23, 0.24, 0.25]);
  panel(dog, m, [0, 0.837, -0.07], [0.16, 0.04, 0.22], m.rust);
  [-1, 1].forEach((side) => {
    panel(dog, m, [side * 0.277, 0.56, -0.03], [0.03, 0.13, 0.16]);
    for (let i = 0; i < 3; i++)
      cylinder(dog, m.dark, [side * 0.311, 0.57, -0.1 + i * 0.07], 0.017, 0.12, [0, 0, Math.PI / 2]);
  });
  const head = new THREE.Group();
  head.position.set(0, 0.89, 0.38);
  dog.add(head);
  sculptedSphere(head, m.orange, [0, 0, 0], [0.28, 0.27, 0.28]);
  sphere(head, m.dogCream, [0, -0.085, 0.23], [0.235, 0.145, 0.17]);
  sphere(head, m.dark, [0, -0.025, 0.365], [0.1, 0.067, 0.058]);
  sphere(head, m.rust, [0, -0.2, 0.265], [0.057, 0.072, 0.05]);
  eye(head, m, -0.115, 0.06, 0.231, 0.099);
  eye(head, m, 0.115, 0.06, 0.231, 0.099);
  [-1, 1].forEach((side) => {
    const ear = sphere(head, m.dark, [side * 0.26, 0.05, -0.025], [0.11, 0.23, 0.13]);
    ear.rotation.z = side * 0.38;
    sphere(head, m.brass, [side * 0.23, 0.14, -0.025], [0.07, 0.07, 0.07]);
  });
  cylinder(dog, m.dark, [0, 0.76, 0.37], 0.18, 0.085);
  const tailLightMaterial = new THREE.MeshStandardMaterial({
    color: '#9ceeff',
    emissive: '#39bfe8',
    emissiveIntensity: 1.25,
    roughness: 0.28,
  });
  const legs = [
    leg(dog, m, -0.22, 0.28, 0.34),
    leg(dog, m, 0.22, 0.28, 0.34),
    leg(dog, m, -0.22, -0.3, 0.34),
    leg(dog, m, 0.22, -0.3, 0.34),
  ];
  const tail = new THREE.Group();
  tail.position.set(0, 0.64, -0.44);
  dog.add(tail);
  cylinder(tail, m.brass, [0, 0.16, -0.08], 0.047, 0.32, [-0.42, 0, 0]);
  const tailLight = sphere(tail, tailLightMaterial, [0, 0.32, -0.15], [0.077, 0.077, 0.077]);
  tailLight.name = 'Pip tail light';
  tailLight.userData.ownedMaterial = true;
  dog.userData.parts = { body, head, legs, tail, tailLight };
  return dog;
}

// Pip has a separate constructor so Buddy keeps its established walking model.
export function createPip() {
  const m = createMaterials(),
    shell = new THREE.Group(),
    headShell = new THREE.Group();
  const steel = new THREE.MeshStandardMaterial({ color: '#dce4e5', metalness: 0.45, roughness: 0.55 });
  const trim = new THREE.MeshStandardMaterial({ color: '#9caaae', metalness: 0.55, roughness: 0.45 });
  box(shell, steel, [0, 0.83, -0.06], [0.62, 0.51, 0.92]);
  box(shell, trim, [0, 1.095, -0.08], [0.64, 0.035, 0.8]);
  // Recessed seams and small rivets read as sheet-metal panels at game scale.
  for (const side of [-1, 1]) {
    box(shell, trim, [side * 0.315, 0.84, -0.08], [0.016, 0.018, 0.84]);
    box(shell, trim, [side * 0.316, 0.84, -0.13], [0.018, 0.48, 0.018]);
    for (const z of [-0.43, 0.28])
      for (const y of [0.64, 1.03]) sphere(shell, m.brass, [side * 0.327, y, z], [0.025, 0.025, 0.025]);
  }
  cylinder(shell, m.dark, [0, 1.03, 0.38], 0.21, 0.18, [Math.PI / 2, 0, 0]);
  box(headShell, steel, [0, 1.32, 0.47], [0.57, 0.45, 0.43]);
  box(headShell, m.dark, [0, 1.35, 0.696], [0.49, 0.25, 0.025]);
  const muzzle = box(headShell, steel, [0, 1.15, 0.79], [0.49, 0.25, 0.45]);
  muzzle.rotation.x = -0.18;
  box(headShell, trim, [0, 0.99, 0.8], [0.46, 0.04, 0.42]);
  sphere(headShell, m.black, [0, 1.2, 1.025], [0.1, 0.095, 0.085]);
  eye(headShell, m, -0.135, 1.36, 0.72, 0.109);
  eye(headShell, m, 0.135, 1.36, 0.72, 0.109);
  for (const side of [-1, 1]) {
    const ear = box(headShell, steel, [side * 0.28, 1.69, 0.43], [0.22, 0.4, 0.12]);
    ear.rotation.z = side * -0.42;
    box(ear, m.dark, [0, 0, 0.52], [0.68, 0.75, 0.12]);
  }
  const pods = [];
  for (const x of [-0.3, 0.3])
    for (const z of [-0.35, 0.29]) {
      box(shell, steel, [x, 0.64, z], [0.23, 0.43, 0.27]);
      cylinder(shell, trim, [x * 1.35, 0.78, z], 0.105, 0.06, [0, 0, Math.PI / 2]);
      cylinder(shell, m.dark, [x, 0.39, z], 0.12, 0.09);
      cylinder(shell, trim, [x, 0.335, z], 0.13, 0.05);
      pods.push(new THREE.Vector3(x, 0.3, z));
    }
  const dog = new THREE.Group(),
    rig = new THREE.Group();
  dog.name = 'Pip the hovering robot sheepdog';
  rig.name = 'Pip floating body rig';
  dog.add(rig);
  // Bake body and head independently, retaining a neck pivot for looking into turns.
  const body = bakeModel(shell),
    head = bakeModel(headShell);
  body.position.y = -0.83;
  head.position.set(0, 1.03 - 0.83, 0.38);
  for (const mesh of head.children) mesh.geometry.translate(0, -1.03, -0.38);
  rig.position.y = 0.83;
  rig.add(body, head);
  rig.traverse((o) => {
    if (o.isMesh) {
      o.userData.ownedGeometry = true;
      if (o.material === steel || o.material === trim) o.userData.ownedMaterial = true;
    }
  });
  const tail = new THREE.Group();
  tail.position.set(0, 0.94 - 0.83, -0.52);
  rig.add(tail);
  for (let i = 0; i < 7; i++)
    cylinder(tail, i % 2 ? m.dark : trim, [0, 0.04 + i * 0.05, -i * 0.035], 0.035, 0.055, [-0.6, 0, 0]);
  const light = new THREE.MeshStandardMaterial({
    color: '#9ceeff',
    emissive: '#39bfe8',
    emissiveIntensity: 1.25,
    roughness: 0.28,
  });
  const tailLight = sphere(tail, light, [0, 0.41, -0.27], [0.075, 0.075, 0.075]);
  tailLight.userData.ownedMaterial = true;
  // Bounded pool: exactly three hollow rings per pod, with no flame geometry.
  const rings = pods.map((pod) =>
    Array.from({ length: 3 }, (_, index) => {
      const material = new THREE.MeshBasicMaterial({
        color: '#55dfff',
        transparent: true,
        opacity: 1,
        depthWrite: false,
        toneMapped: false,
      });
      const ring = new THREE.Mesh(geometry('TorusGeometry', [0.135, 0.014, 6, 24]), material);
      ring.name = `Pip thruster ring ${index + 1}`;
      ring.rotation.x = Math.PI / 2;
      ring.userData.ownedMaterial = true;
      dog.add(ring);
      return ring;
    }),
  );
  dog.userData.parts = {
    body,
    rig,
    head,
    legs: [],
    tail,
    tailLight,
    basePods: pods.map((p) => p.clone().add(new THREE.Vector3(0, -0.83, 0))),
    pods,
    rings,
  };
  dog.userData.motion = createPipMotionState();
  updatePipPose(dog, { x: 0, z: 0, heading: 0, vx: 0, vz: 0 }, 0);
  dog.userData.motion.previous = null;
  dog.userData.hover = { time: 0, previous: null, trails: [] };
  return dog;
}

// Buddy is Pip's smaller companion: a friendly, panel-built robot puppy with
// expressive eyes, intentionally mismatched ears, four blue hover pods and a
// spring tail. Keep the neutral rig/pod baseline aligned with Pip so the same
// pose and ground-lighting systems can animate either character independently.
export function createBuddy() {
  const m = createMaterials(),
    shell = new THREE.Group(),
    headShell = new THREE.Group();
  const podTipMaterials = [];
  const steel = new THREE.MeshStandardMaterial({ color: '#d4dfe0', metalness: 0.28, roughness: 0.68 });
  const cream = new THREE.MeshStandardMaterial({ color: '#eee5d5', metalness: 0.12, roughness: 0.82 });
  const panel = new THREE.MeshStandardMaterial({ color: '#b8b1a7', metalness: 0.24, roughness: 0.72 });
  const eyeRim = new THREE.MeshStandardMaterial({ color: '#4a4a43', metalness: 0.08, roughness: 0.6 });

  // Compact, softly rounded torso with a few larger plate details that remain
  // legible at the intended 0.82 scale on a phone screen.
  sculptedSphere(shell, steel, [0, 0.83, -0.08], [0.3, 0.27, 0.42], 0.012, 12);
  box(shell, cream, [0, 0.78, 0.27], [0.39, 0.27, 0.28]);
  box(shell, panel, [0, 0.61, 0.31], [0.3, 0.045, 0.19]);
  for (const side of [-1, 1]) {
    const shoulder = sphere(shell, panel, [side * 0.275, 0.84, -0.02], [0.055, 0.16, 0.19]);
    shoulder.rotation.z = side * -0.12;
    for (const z of [-0.31, 0.25]) sphere(shell, eyeRim, [side * 0.25, 0.81, z], [0.025, 0.025, 0.025], 8);
  }
  cylinder(shell, m.dark, [0, 1.0, 0.31], 0.15, 0.15, [Math.PI / 2, 0, 0]);

  // Round puppy head, dark eye sockets and broad pupils produce a readable,
  // welcoming face; the short cream muzzle and black nose follow the reference.
  sculptedSphere(headShell, steel, [0, 1.31, 0.43], [0.3, 0.31, 0.28], 0.01, 14);
  for (const side of [-1, 1]) {
    cylinder(headShell, eyeRim, [side * 0.135, 1.36, 0.676], 0.117, 0.032, [Math.PI / 2, 0, 0]);
    sphere(headShell, m.white, [side * 0.135, 1.36, 0.704], [0.088, 0.098, 0.043], 12);
    sphere(headShell, m.black, [side * 0.135, 1.35, 0.744], [0.047, 0.058, 0.024], 10);
    sphere(headShell, m.white, [side * 0.115, 1.381, 0.764], [0.018, 0.019, 0.012], 8);
  }
  sculptedSphere(headShell, cream, [0, 1.145, 0.68], [0.235, 0.135, 0.18], 0.006, 12);
  sphere(headShell, m.black, [0, 1.188, 0.835], [0.078, 0.067, 0.055], 10);
  // One upright pointed ear and one lower, folded triangular ear break the
  // silhouette's symmetry, as in the supplied Buddy reference.
  const upright = mesh(headShell, 'ConeGeometry', [1, 1, 3], steel, [-0.255, 1.68, 0.4], [0.14, 0.25, 0.065]);
  upright.rotation.z = -0.16;
  const folded = mesh(headShell, 'ConeGeometry', [1, 1, 3], panel, [0.27, 1.57, 0.4], [0.21, 0.14, 0.07]);
  folded.rotation.set(0, 0, Math.PI / 2 + 0.22);
  box(headShell, m.dark, [0.28, 1.53, 0.459], [0.13, 0.075, 0.018]);

  const pods = [];
  for (const x of [-0.29, 0.29])
    for (const z of [-0.3, 0.25]) {
      sculptedSphere(shell, steel, [x, 0.59, z], [0.14, 0.24, 0.16], 0.006, 10);
      cylinder(shell, panel, [x, 0.72, z], 0.084, 0.055, [0, 0, Math.PI / 2]);
      cylinder(shell, m.dark, [x, 0.37, z], 0.105, 0.075);
      const tip = new THREE.MeshStandardMaterial({
        color: '#7cecff',
        emissive: '#27c8ff',
        emissiveIntensity: 1.1,
        roughness: 0.35,
      });
      podTipMaterials.push(tip);
      const podTip = sphere(shell, tip, [x, 0.325, z], [0.112, 0.052, 0.112], 10);
      podTip.userData.ownedMaterial = true;
      pods.push(new THREE.Vector3(x, 0.3, z));
    }

  const dog = new THREE.Group(),
    rig = new THREE.Group();
  dog.name = 'Buddy the hovering robot puppy';
  rig.name = 'Buddy floating body rig';
  dog.add(rig);
  const body = bakeModel(shell),
    head = bakeModel(headShell);
  body.position.y = -0.83;
  head.position.set(0, 1.03 - 0.83, 0.38);
  for (const child of head.children) child.geometry.translate(0, -1.03, -0.38);
  rig.position.y = 0.83;
  rig.add(body, head);
  rig.traverse((object) => {
    if (!object.isMesh) return;
    object.userData.ownedGeometry = true;
    if ([steel, cream, panel, eyeRim, ...podTipMaterials].includes(object.material))
      object.userData.ownedMaterial = true;
  });
  const tail = new THREE.Group();
  tail.name = 'Buddy spring tail';
  tail.position.set(0, 0.89 - 0.83, -0.47);
  rig.add(tail);
  for (let i = 0; i < 6; i++) {
    const coil = cylinder(
      tail,
      i % 2 ? m.dark : panel,
      [0, 0.035 + i * 0.047, -i * 0.032],
      0.034,
      0.052,
      [-0.62, 0, 0],
    );
    coil.name = `Buddy tail spring segment ${i + 1}`;
  }
  const lightMaterial = new THREE.MeshStandardMaterial({
    color: '#9ceeff',
    emissive: '#39bfe8',
    emissiveIntensity: 1.45,
    roughness: 0.28,
  });
  const tailLight = sphere(tail, lightMaterial, [0, 0.32, -0.205], [0.071, 0.071, 0.071]);
  tailLight.name = 'Buddy blue tail light';
  tailLight.userData.ownedMaterial = true;

  const rings = pods.map((pod) =>
    Array.from({ length: 3 }, (_, index) => {
      const material = new THREE.MeshBasicMaterial({
        color: '#55dfff',
        transparent: true,
        opacity: 1,
        depthWrite: false,
        toneMapped: false,
      });
      const ring = new THREE.Mesh(geometry('TorusGeometry', [0.125, 0.013, 6, 24]), material);
      ring.name = `Buddy hover ring ${index + 1}`;
      ring.rotation.x = Math.PI / 2;
      ring.userData.ownedMaterial = true;
      dog.add(ring);
      return ring;
    }),
  );
  dog.userData.parts = {
    body,
    rig,
    head,
    legs: [],
    tail,
    tailLight,
    basePods: pods.map((p) => p.clone().add(new THREE.Vector3(0, -0.83, 0))),
    pods,
    rings,
  };
  dog.userData.motion = createPipMotionState();
  updatePipPose(dog, { x: 0, z: 0, heading: 0, vx: 0, vz: 0 }, 0);
  dog.userData.motion.previous = null;
  dog.userData.hover = { time: 0, previous: null, trails: [] };
  dog.userData.suggestedScale = 0.82;
  dog.userData.modelContract = 'pip-pose-hover-v1';
  return dog;
}

export function updatePipPose(dog, sample, dt) {
  const state = updatePipMotion(dog.userData.motion, sample, dt),
    parts = dog.userData.parts;
  parts.rig.position.y = 0.83 + state.hover;
  parts.rig.rotation.set(state.pitch, 0, state.roll);
  parts.head.rotation.y = state.headYaw;
  parts.rig.updateMatrix();
  // Rings and the receiving-surface glow consume root-local pod positions.
  parts.pods.forEach((pod, i) => pod.copy(parts.basePods[i]).applyMatrix4(parts.rig.matrix));
}

export function updatePipHover(dog, dt) {
  const state = dog.userData.hover;
  if (!state) return;
  dog.updateMatrixWorld(true);
  const current = dog.userData.parts.pods.map((p) => dog.localToWorld(p.clone()));
  const reset = !state.previous || dog.position.distanceTo(state.previous) > 3;
  if (reset) state.trails = current.map((p) => p.clone());
  // Pausing freezes both the descent and world-space motion trail.
  if (dt > 0) state.time += dt;
  for (let pod = 0; pod < current.length; pod++) {
    if (dt > 0) state.trails[pod].lerp(current[pod], 1 - Math.exp(-dt / 0.13));
    const phase = (state.time / 0.55) % 1;
    for (let index = 0; index < 3; index++) {
      const ring = dog.userData.parts.rings[pod][index];
      const world = current[pod].clone().lerp(state.trails[pod], index === 0 ? 0 : (index - 1 + phase) / 2);
      const local = dog.worldToLocal(world);
      local.y = dog.userData.parts.pods[pod].y - 0.055 - (index === 0 ? 0 : (index - 1 + phase) * 0.1 + 0.055);
      // At recycle, the old middle becomes the new third at identical
      // height, brightness and radius; a new middle fades out of the pod.
      ring.position.copy(local);
      ring.material.opacity = index === 0 ? 0.95 : index === 1 ? 0.85 * Math.min(1, phase / 0.15) : 0.85 * (1 - phase);
      ring.scale.setScalar(1 + (index === 0 ? 0 : (index - 1 + phase) * 0.15));
    }
  }
  state.previous = dog.position.clone();
}

// Four shared torso textures add only three draws to a mixed herd. Anatomy and
// geometry stay shared, and each torso batch keeps ordinary instance QA colors.
const COW_PATCHES = [
  [
    [0.11, 0.47, 0.105, 0.25],
    [0.38, 0.42, 0.14, 0.31],
    [0.65, 0.52, 0.12, 0.28],
    [0.87, 0.43, 0.13, 0.3],
    [0.52, 0.88, 0.09, 0.14],
  ],
  [
    [0.06, 0.36, 0.13, 0.22],
    [0.29, 0.6, 0.095, 0.33],
    [0.56, 0.36, 0.17, 0.27],
    [0.85, 0.65, 0.1, 0.25],
    [0.68, 0.87, 0.08, 0.12],
  ],
  [
    [0.15, 0.65, 0.16, 0.25],
    [0.43, 0.34, 0.11, 0.24],
    [0.68, 0.62, 0.18, 0.32],
    [0.94, 0.3, 0.08, 0.18],
    [0.35, 0.86, 0.07, 0.12],
  ],
  [
    [0.02, 0.58, 0.1, 0.31],
    [0.25, 0.34, 0.16, 0.23],
    [0.51, 0.65, 0.12, 0.28],
    [0.78, 0.38, 0.15, 0.32],
    [0.91, 0.84, 0.06, 0.11],
  ],
];
const cowCoatMaterials = [];
export function cowCoatVariant(seed, index) {
  // Separate from the size RNG and immutable under visible-instance compaction.
  let identity = 0;
  for (const char of String(index)) identity = Math.imul(identity ^ char.charCodeAt(0), 16777619);
  let value = (seed ^ identity ^ 0x434f4154) >>> 0;
  value = Math.imul(value ^ (value >>> 16), 0x85ebca6b);
  value = Math.imul(value ^ (value >>> 13), 0xc2b2ae35);
  return (value ^ (value >>> 16)) >>> 30;
}
export function createCowCoatMaterial(variant = 0) {
  if (!Number.isInteger(variant) || variant < 0 || variant > 3) throw new RangeError('Unknown cow coat variant');
  if (cowCoatMaterials[variant]) return cowCoatMaterials[variant];
  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 128;
  const context = canvas.getContext('2d'),
    image = context.createImageData(256, 128);
  // Broad organic islands follow the body surface without raised spot discs.
  const patches = COW_PATCHES[variant];
  for (let y = 0; y < 128; y++)
    for (let x = 0; x < 256; x++) {
      const u = x / 256,
        v = y / 128;
      const black = patches.some(([cx, cy, rx, ry]) => {
        const dx = Math.min(Math.abs(u - cx), 1 - Math.abs(u - cx)) / rx,
          dy = (v - cy) / ry;
        const angle = Math.atan2(dy, dx);
        return dx * dx + dy * dy < 1 + 0.19 * Math.sin(angle * 3 + cx * 30) + 0.1 * Math.cos(angle * 5 + cy * 12);
      });
      const color = black ? [49, 48, 46] : [238, 228, 204],
        grain = ((x * 13 + y * 7) % 9) - 4;
      const i = (y * 256 + x) * 4;
      for (let c = 0; c < 3; c++) image.data[i + c] = color[c] + grain;
      image.data[i + 3] = 255;
    }
  context.putImageData(image, 0, 0);
  const coatTexture = new THREE.CanvasTexture(canvas);
  coatTexture.colorSpace = THREE.SRGBColorSpace;
  const coat = new THREE.MeshStandardMaterial({ color: '#ffffff', map: coatTexture, roughness: 0.94 });
  coat.userData.cowCoatVariant = variant;
  cowCoatMaterials[variant] = coat;
  return coat;
}

// The accepted 1.5x cow core has a 25% longer torso. Attachment positions
// follow that extension while the head, hooves and leg lengths retain their shape.
function createCow(m) {
  const cow = new THREE.Group();
  cow.name = 'Clay Holstein cow';
  const clay = (color) => new THREE.MeshStandardMaterial({ color, roughness: 0.94, map: m.cream.map });
  const pink = clay('#d99f91'),
    nostril = clay('#704c49'),
    ivory = clay('#e4d1ae');
  const coat = createCowCoatMaterial();
  sculptedSphere(cow, coat, [0, 0.54, 0], [0.32, 0.34, 0.4875], 0.025, 20);
  const head = new THREE.Group();
  head.position.set(0, 0.73, 0.4175);
  cow.add(head);
  sculptedSphere(head, m.cream, [0, -0.015, 0.065], [0.215, 0.225, 0.215], 0.018, 16);
  sculptedSphere(head, m.dark, [0, 0.065, 0.055], [0.205, 0.205, 0.18], 0.018, 16);
  // Cream blaze meets the broad low muzzle; raised eyes keep a sleepy expression.
  sphere(head, m.cream, [0, -0.055, 0.21], [0.095, 0.15, 0.065], 16);
  sphere(head, pink, [0, -0.115, 0.255], [0.224, 0.115, 0.125], 16);
  sphere(head, nostril, [0, -0.203, 0.245], [0.145, 0.012, 0.06], 12);
  tagGesture(sphere(head, pink, [0, -0.215, 0.237], [0.157, 0.026, 0.065], 12), 4, [0, -0.215, 0.237]);
  for (const side of [-1, 1]) {
    animalEye(head, m, side * 0.087, 0.075, 0.207, 0.068);
    sphere(head, m.dark, [side * 0.086, 0.133, 0.2], [0.078, 0.026, 0.043], 12);
    const ear = sphere(head, m.dark, [side * 0.255, 0.09, 0.005], [0.139, 0.065, 0.08], 14);
    ear.rotation.z = side * 0.28;
    tagGesture(ear, 1, [side * 0.16, 0.09, 0.005], side);
    const inner = sphere(head, nostril, [side * 0.265, 0.096, 0.055], [0.09, 0.037, 0.023], 12);
    inner.rotation.z = side * 0.28;
    tagGesture(inner, 1, [side * 0.16, 0.09, 0.005], side);
    const hole = sphere(head, nostril, [side * 0.115, -0.089, 0.359], [0.037, 0.045, 0.014], 12);
    hole.rotation.z = side * -0.22;
    sphere(head, pink, [side * 0.115, -0.074, 0.36], [0.028, 0.014, 0.015], 10);
    // Smooth tapered bent horns, using a short welded tube with a shrinking radius.
    const hornGeometry = new THREE.CylinderGeometry(0.008, 0.045, 0.16, 10, 4);
    const positions = hornGeometry.attributes.position;
    for (let i = 0; i < positions.count; i++) {
      const t = (positions.getY(i) + 0.08) / 0.16;
      positions.setXYZ(
        i,
        positions.getX(i) + side * (0.055 * t - 0.04 * t * t),
        positions.getY(i),
        positions.getZ(i) - 0.025 * t * t,
      );
    }
    hornGeometry.computeVertexNormals();
    hornGeometry.userData.temporaryCowHorn = true;
    const horn = new THREE.Mesh(hornGeometry, ivory);
    horn.position.set(side * 0.145, 0.25, 0.015);
    head.add(horn);
  }
  const legs = [];
  for (const [x, z] of [
    [-0.215, 0.275],
    [0.215, 0.275],
    [-0.215, -0.29375],
    [0.215, -0.29375],
  ]) {
    const limb = new THREE.Group();
    limb.position.set(x, 0.36, z);
    cow.add(limb);
    sphere(limb, m.cream, [0, -0.105, 0], [0.073, 0.19, 0.075], 12);
    // Two toes share the dark material, retaining two material batches per limb.
    for (const side of [-1, 1]) sphere(limb, m.dark, [side * 0.035, -0.272, 0.029], [0.034, 0.063, 0.091], 10);
    legs.push(limb);
  }
  sphere(cow, pink, [0, 0.295, -0.23125], [0.105, 0.067, 0.12], 12);
  for (const x of [-0.052, 0.052])
    for (const z of [-0.2875, -0.1875]) sphere(cow, pink, [x, 0.24, z], [0.019, 0.038, 0.02], 8);
  const tail = sphere(cow, m.cream, [0.035, 0.48, -0.4835], [0.027, 0.18, 0.027], 10);
  tail.rotation.x = 0.2;
  tagGesture(tail, 2, [0.035, 0.66, -0.4835]);
  tagGesture(sphere(cow, m.dark, [0.035, 0.312, -0.5175], [0.048, 0.069, 0.043], 10), 2, [0.035, 0.66, -0.4835]);
  return { animal: cow, legs, head };
}

function tagGesture(object, kind, pivot, side = 1) {
  Object.assign(object.userData, { gestureKind: kind, gesturePivot: pivot, gestureSide: side });
  return object;
}
function animalEye(parent, m, x, y, z, size) {
  const start = parent.children.length;
  eye(parent, m, x, y, z, size);
  for (const child of parent.children.slice(start)) tagGesture(child, 3, [x, y, z]);
}
const animalGestureMaterials = new WeakMap();
function animalGestureMaterial(source) {
  if (animalGestureMaterials.has(source)) return animalGestureMaterials.get(source);
  const material = source.clone(),
    previous = source.onBeforeCompile;
  material.onBeforeCompile = (shader) => {
    previous?.call(material, shader);
    shader.vertexShader =
      'attribute vec2 animalGesturePart;\nattribute vec3 animalGesturePivot;\nattribute vec4 animalGesture;\n' +
      shader.vertexShader;
    shader.vertexShader = shader.vertexShader.replace(
      '#include <begin_vertex>',
      `#include <begin_vertex>
      vec3 gestureOffset=transformed-animalGesturePivot;
      float gestureAngle=0.0;
      if(animalGesturePart.x>0.5&&animalGesturePart.x<1.5)gestureAngle=animalGesture.x*animalGesturePart.y;
      if(animalGesturePart.x>1.5&&animalGesturePart.x<2.5)gestureAngle=animalGesture.y;
      if(animalGesturePart.x>0.5&&animalGesturePart.x<2.5){
        float gc=cos(gestureAngle),gs=sin(gestureAngle);
        transformed=animalGesturePivot+vec3(gc*gestureOffset.x-gs*gestureOffset.y,gs*gestureOffset.x+gc*gestureOffset.y,gestureOffset.z);
      }
      if(animalGesturePart.x>2.5&&animalGesturePart.x<3.5)transformed.y=animalGesturePivot.y+gestureOffset.y*(1.0-animalGesture.z);
      if(animalGesturePart.x>3.5)transformed.y+=animalGesture.w;
    `,
    );
    shader.vertexShader = shader.vertexShader.replace(
      '#include <beginnormal_vertex>',
      `#include <beginnormal_vertex>
      float normalAngle=animalGesturePart.x>0.5&&animalGesturePart.x<1.5?animalGesture.x*animalGesturePart.y:animalGesturePart.x>1.5&&animalGesturePart.x<2.5?animalGesture.y:0.0;
      float nc=cos(normalAngle),ns=sin(normalAngle);
      objectNormal.xy=mat2(nc,ns,-ns,nc)*objectNormal.xy;
    `,
    );
  };
  material.customProgramCacheKey = () => source.customProgramCacheKey() + '|animal-gestures-v1';
  material.defaultAttributeValues = { animalGesture: [0, 0, 0, 0] };
  animalGestureMaterials.set(source, material);
  return material;
}
// Only the instance gesture buffer belongs to the level. Cached static buffers
// remain shared; no geometry or material is created while a frame is updated.
export function createAnimalGestureDepthMaterial() {
  const source = new THREE.MeshDepthMaterial({ depthPacking: THREE.RGBADepthPacking }),
    material = animalGestureMaterial(source);
  source.dispose();
  return material;
}
export function createAnimalGestureGeometry(source, count) {
  const geometry = new THREE.BufferGeometry();
  geometry.index = source.index;
  for (const [name, attribute] of Object.entries(source.attributes)) geometry.setAttribute(name, attribute);
  geometry.boundingBox = source.boundingBox;
  geometry.boundingSphere = source.boundingSphere;
  geometry.setAttribute(
    'animalGesture',
    new THREE.InstancedBufferAttribute(new Float32Array(count * 4), 4).setUsage(THREE.DynamicDrawUsage),
  );
  geometry.userData.animalGestureWrapper = true;
  return geometry;
}

function bakeArticulatedAnimal(animal, legs, head, size) {
  animal.userData.animalRig = true;
  head.userData.animalRig = true;
  for (const limb of legs) limb.userData.animalRig = true;
  animal.scale.setScalar(size);
  for (const limb of legs) animal.remove(limb);
  animal.remove(head);
  const articulated = bakeModel(animal);
  const headPivot = head.position.clone().multiplyScalar(size);
  head.position.set(0, 0, 0);
  head.scale.setScalar(size);
  for (const part of [...bakeModel(head).children]) {
    part.name = 'head';
    part.position.copy(headPivot);
    part.userData = { headPart: true, pivot: headPivot.toArray(), grazeDrop: 0.3 * size };
    articulated.add(part);
  }
  for (let limbIndex = 0; limbIndex < legs.length; limbIndex++) {
    const limb = legs[limbIndex],
      pivot = limb.position.clone().multiplyScalar(size);
    limb.position.set(0, 0, 0);
    limb.scale.setScalar(size);
    for (const part of [...bakeModel(limb).children]) {
      part.name = `leg-${limbIndex}`;
      part.position.copy(pivot);
      part.userData = { limbIndex, pivot: pivot.toArray() };
      articulated.add(part);
    }
  }
  articulated.userData.articulated = true;
  return articulated;
}

export function createAnimal(type = 'sheep') {
  const key = `animal:${type}`;
  if (modelCache.has(key)) return modelCache.get(key).clone();
  const m = createMaterials();
  if (type === 'cow') {
    const { animal, legs, head } = createCow(m);
    const articulated = bakeArticulatedAnimal(animal, legs, head, 1.5);
    head.traverse((part) => {
      if (part.geometry?.userData.temporaryCowHorn) part.geometry.dispose();
    });
    modelCache.set(key, articulated);
    return articulated.clone();
  }
  const cow = false;
  const animal = new THREE.Group();
  animal.name = cow ? 'Robot cow' : 'Robot sheep';
  const body = sculptedSphere(animal, m.cream, [0, 0.54, 0], [0.32, 0.34, cow ? 0.5 : 0.39]);
  if (cow) {
    [-1, 1].forEach((s) => {
      sphere(animal, m.dark, [s * 0.295, 0.57, -0.13], [0.047, 0.16, 0.2]);
      sphere(animal, m.dark, [s * 0.282, 0.67, 0.19], [0.045, 0.11, 0.11]);
    });
  } else {
    // Distinct scalloped shell segments evoke wool without losing the robotic form.
    for (let i = 0; i < 3; i++) sculptedSphere(animal, m.white, [0, 0.625, -0.23 + i * 0.22], [0.335, 0.3, 0.145]);
    [-1, 1].forEach((s) => {
      for (let i = 0; i < 3; i++)
        sphere(animal, m.brass, [s * 0.312, 0.56, -0.21 + i * 0.21], [0.029, 0.033, 0.033], 8);
    });
  }
  panel(animal, m, [0, 0.87, -0.11], [0.1, 0.024, 0.105], m.mint);
  const head = new THREE.Group();
  head.position.set(0, 0.7, cow ? 0.46 : 0.34);
  animal.add(head);
  sphere(head, cow ? m.cream : m.dark, [0, 0, 0.06], [0.22, 0.235, 0.205]);
  tagGesture(sphere(head, cow ? m.rust : m.black, [0, -0.08, 0.225], [0.185, 0.12, 0.09]), 4, [0, -0.08, 0.225]);
  animalEye(head, m, -0.096, 0.055, 0.221, 0.075);
  animalEye(head, m, 0.096, 0.055, 0.221, 0.075);
  [-1, 1].forEach((s) => {
    const ear = sphere(head, cow ? m.rust : m.cream, [s * 0.235, 0.075, 0.025], [0.135, 0.048, 0.082]);
    ear.rotation.z = s * 0.25;
    tagGesture(ear, 1, [s * 0.16, 0.075, 0.025], s);
    tagGesture(sphere(head, m.brass, [s * 0.193, 0.075, 0.025], [0.045, 0.045, 0.045]), 1, [s * 0.16, 0.075, 0.025], s);
    if (cow) {
      const horn = mesh(head, 'ConeGeometry', [0.047, 0.2, 8], m.brass, [s * 0.15, 0.255, -0.018]);
      horn.rotation.z = s * -0.32;
      sphere(head, m.dark, [s * 0.077, -0.082, 0.305], [0.025, 0.021, 0.016], 8);
    }
  });
  sphere(head, m.cyan, [0, 0.22, 0.008], [0.033, 0.033, 0.033], 8);
  cylinder(animal, m.dark, [0, 0.64, 0.31], 0.13, 0.11, [Math.PI / 2, 0, 0]);
  const legs = [
    leg(animal, m, -0.22, 0.22, 0.25),
    leg(animal, m, 0.22, 0.22, 0.25),
    leg(animal, m, -0.22, -0.24, 0.25),
    leg(animal, m, 0.22, -0.24, 0.25),
  ];
  const tail = sphere(animal, m.dark, [0, 0.6, cow ? -0.53 : -0.39], [0.061, cow ? 0.15 : 0.065, 0.07]);
  tagGesture(tail, 2, [0, 0.65, -0.36]);
  const size = cow ? 1.23 : 1;
  // Body, head and limbs retain shared material batches. Head vertices use neck
  // coordinates so every facial detail follows the same grazing transform.
  const articulated = bakeArticulatedAnimal(animal, legs, head, size);
  modelCache.set(key, articulated);
  return articulated.clone();
}

export function createDrone() {
  const m = createMaterials();
  const drone = new THREE.Group();
  drone.name = 'Autonomous meadow drone';
  sphere(drone, m.mint, [0, 0, 0], [0.3, 0.14, 0.25]);
  sphere(drone, m.cream, [0, 0.09, 0], [0.2, 0.085, 0.17]);
  eye(drone, m, -0.1, -0.005, 0.238, 0.068);
  eye(drone, m, 0.1, -0.005, 0.238, 0.068);
  const propellers = [];
  [-1, 1].forEach((x) =>
    [-1, 1].forEach((z) => {
      const arm = cylinder(drone, m.brass, [x * 0.24, 0, z * 0.2], 0.035, 0.32, [0, 0, (x * Math.PI) / 2]);
      arm.rotation.y = z * -0.5;
      const propeller = new THREE.Group();
      propeller.position.set(x * 0.39, 0.09, z * 0.29);
      drone.add(propeller);
      sphere(propeller, m.dark, [0, -0.045, 0], [0.071, 0.08, 0.071]);
      sphere(propeller, m.cream, [0, 0, 0], [0.23, 0.017, 0.04]);
      sphere(propeller, m.cream, [0, 0, 0], [0.04, 0.017, 0.23]);
      sphere(propeller, m.cyan, [0, 0.014, 0], [0.036, 0.027, 0.036]);
      propellers.push(propeller);
    }),
  );
  drone.userData.parts = { propellers };
  return drone;
}

export function createTree(variant = 0, maturity = 0) {
  variant = Math.abs(Math.floor(variant)) % 3;
  const tier = Math.max(0, Math.min(2, Math.round(maturity)));
  const key = `tree:${variant}:${tier}`;
  if (modelCache.has(key)) return cloneTree(modelCache.get(key));
  const m = createMaterials(),
    tree = new THREE.Group();
  tree.name = 'clay tree';
  const wood = new THREE.Mesh(createTreeWood(variant), m.treeWood);
  wood.name = 'tree-wood';
  wood.userData.treeWidth = 1;

  wood.castShadow = wood.receiveShadow = true;
  tree.add(wood);
  tree.userData.forks = wood.geometry.userData.forks;
  const tips = wood.geometry.userData.tips,
    up = new THREE.Vector3(0, 1, 0);
  const leaf = [m.leaves, m.leavesDark, m.leavesLight][variant];
  // Three overlapping central crowns avoid a single ball on a pole. Peripheral
  // crowns sit on branch tips, with seeded size variation at the same radius.
  const positions = [
    [0.14, 3.12, 0.02],
    [-0.26, 2.85, -0.13],
    [0.32, 2.83, 0.27],
    ...tips,
    [-0.52, 2.64, 0.47],
    [0.52, 2.75, -0.47],
    [-0.48, 3.19, 0.27],
    [0.44, 3.21, -0.3],
  ];
  const canopy = positions.slice(0, 7 + tier * 2).map((position, i) => {
    const radial = Math.hypot(position[0], position[2]);
    const jitter = 1 + 0.12 * Math.sin(i * 4.71 + variant * 1.93);
    const size = (0.59 - 0.21 * Math.min(1, radial / 1.2)) * jitter;
    return [position, [size, size * (1.02 + 0.1 * Math.sin(i + variant)), size * (0.94 + 0.08 * Math.cos(i * 2))]];
  });
  const foliage = new THREE.Group();
  for (const [position, scale] of canopy) sculptedSphere(foliage, leaf, position, scale, 0.075, 8);
  for (let i = 0; i < canopy.length * 2; i++) {
    const [center, scale] = canopy[i % canopy.length],
      a = i * 2.399963 + variant * 0.27;
    const ny = i % 2 ? 0.3 : -0.25,
      ring = Math.sqrt(1 - ny * ny);
    const nx = Math.cos(a) * ring,
      nz = Math.sin(a) * ring;
    const sculpt = 1 + 0.075 * Math.sin(nx * 4.1 + nz * 2.8) * Math.cos(ny * 3.7 - nz * 1.3);
    const normal = new THREE.Vector3(nx / scale[0], ny / scale[1], nz / scale[2]).normalize();
    const mark = mesh(
      foliage,
      'SphereGeometry',
      [1, 6, 3],
      leaf,
      [
        center[0] + nx * scale[0] * sculpt * 0.92,
        center[1] + ny * scale[1] * sculpt * 0.92,
        center[2] + nz * scale[2] * sculpt * 0.92,
      ],
      [0.14, 0.07, 0.11],
    );
    mark.quaternion.setFromUnitVectors(up, normal);
  }
  const bakedFoliage = bakeModel(foliage).children[0];
  bakedFoliage.name = 'tree-foliage';
  bakedFoliage.userData.crownProfile = canopy.map(([position, scale]) => ({
    position,
    radial: Math.hypot(position[0], position[2]),
    size: scale[0],
  }));
  tree.add(bakedFoliage);
  modelCache.set(key, tree);
  return cloneTree(tree);
}

function cloneTree(template) {
  const tree = template.clone(),
    wood = tree.getObjectByName('tree-wood');
  // A standalone tree owns its width uniform. Shared-material onBeforeRender
  // updates can be skipped by Three's uniform cache between consecutive draws.
  // Scenery batching disposes these private materials and uses treeWood again.
  wood.material = wood.material.clone();
  configureTreeMaterial(wood.material);
  wood.userData.ownedMaterial = true;
  return tree;
}

export function createBarn() {
  if (modelCache.has('barn')) return modelCache.get('barn').clone();
  const m = createMaterials();
  const barn = new THREE.Group();
  // Separate walls leave a true doorway and interior for a destination barn.
  box(barn, m.barn, [0, 1, -1.66], [3.2, 2, 0.18]);
  box(barn, m.wood, [0, 0.025, 0], [3.02, 0.05, 3.32]);
  for (const side of [-1, 1]) {
    box(barn, m.barn, [side * 1.52, 1, 0], [0.16, 2, 3.5]);
    box(barn, m.barn, [side * 1.25, 1, 1.66], [0.7, 2, 0.18]);
  }
  const roof = mesh(barn, 'CylinderGeometry', [1, 1, 3.95, 3, 1, false, Math.PI], m.roof, [0, 2.4, 0], [2.1, 1, 0.8]);
  roof.rotation.x = Math.PI / 2;
  [-1, 1].forEach((s) => {
    box(barn, m.barnTrim, [s * 0.88, 0.95, 1.79], [0.12, 1.9, 0.09]);
    box(barn, m.barnTrim, [s * 1.56, 1.03, 0], [0.12, 2.04, 3.6]);
    const door = new THREE.Group();
    door.position.set(s * 0.88, 0, 1.8);
    door.rotation.y = (s * Math.PI) / 2;
    barn.add(door);
    box(door, m.paleWood, [-s * 0.39, 0.86, 0], [0.74, 1.65, 0.06]);
    const brace = box(door, m.barnTrim, [-s * 0.39, 0.84, 0.045], [0.1, 1.7, 0.045]);
    brace.rotation.z = s * 0.41;
    sphere(door, m.brass, [-s * 0.7, 0.83, 0.065], [0.036, 0.045, 0.025], 8);
  });
  box(barn, m.barnTrim, [0, 1.93, 1.8], [2, 0.13, 0.12]);
  box(barn, m.cyan, [0, 2.25, 1.783], [0.42, 0.38, 0.025]);
  box(barn, m.barnTrim, [0, 2.25, 1.805], [0.055, 0.42, 0.04]);
  box(barn, m.barnTrim, [0, 2.25, 1.807], [0.47, 0.055, 0.04]);
  cylinder(barn, m.roof, [0.8, 2.93, -0.6], 0.17, 0.55);
  return cachedModel('barn', barn);
}

export function createFence(length = 4) {
  const m = createMaterials();
  const fence = new THREE.Group();
  const sections = Math.max(1, Math.ceil(length / 1.8));
  for (let i = 0; i <= sections; i++) {
    const x = -length / 2 + (i * length) / sections;
    cylinder(fence, m.paleWood, [x, 0.46, 0], 0.075, 0.92);
    sphere(fence, m.paleWood, [x, 0.94, 0], [0.083, 0.065, 0.083], 8);
  }
  for (const y of [0.34, 0.69]) box(fence, m.wood, [0, y, 0], [length + 0.03, 0.105, 0.085]);
  // Length varies with procedural worlds. The renderer owns and disposes
  // these merged meshes, keeping the persistent model cache bounded.
  return bakeModel(fence);
}

export function createBridge(width = 2.2, length = 4.5, supportHeight = null) {
  const m = createMaterials();
  const bridge = new THREE.Group();
  const planks = Math.ceil(length / 0.3),
    ownedPlanks = [];
  for (let i = 0; i < planks; i++) {
    const z = -length / 2 + ((i + 0.5) * length) / planks;
    const y = supportHeight ? supportHeight(0, z) - 0.18 : Math.sin(((i + 0.5) / planks) * Math.PI) * 0.12;
    const plank = box(bridge, i % 3 ? m.paleWood : m.wood, [0, y + 0.09, z], [width, 0.18, length / planks - 0.025]);
    if (supportHeight) {
      // Rolling a box narrows its horizontal footprint and pulls its upper
      // corners away from support. Drape only elevation, retaining the shared
      // physical deck width and each board's original UVs/thickness.
      const geometry = new THREE.BoxGeometry(width, 0.18, length / planks - 0.025, Math.ceil(width / 0.6), 1, 1);
      const position = geometry.attributes.position,
        normal = geometry.attributes.normal,
        step = 0.025;
      for (let vertex = 0; vertex < position.count; vertex++) {
        const x = position.getX(vertex),
          along = z + position.getZ(vertex),
          side = normal.getY(vertex);
        position.setY(vertex, supportHeight(x, along) + position.getY(vertex) - 0.09);
        if (side) {
          const dx = (supportHeight(x + step, along) - supportHeight(x - step, along)) / (step * 2);
          const dz = (supportHeight(x, along + step) - supportHeight(x, along - step)) / (step * 2);
          const size = Math.hypot(dx, 1, dz);
          normal.setXYZ(vertex, (-side * dx) / size, side / size, (-side * dz) / size);
        }
      }
      ownedPlanks.push(geometry);
      plank.geometry = geometry;
      plank.position.set(0, 0, z);
      plank.scale.setScalar(1);
    }
    [-1, 1].forEach((s) =>
      sphere(
        bridge,
        m.brass,
        [s * (width / 2 - 0.16), supportHeight ? supportHeight(s * (width / 2 - 0.16), z) + 0.004 : y + 0.184, z],
        [0.025, 0.01, 0.025],
        6,
      ),
    );
  }
  [-1, 1].forEach((side) => {
    for (let i = 0; i < 4; i++) {
      const x = (side * width) / 2,
        z = -length / 2 + (i * length) / 3;
      cylinder(bridge, m.wood, [x, supportHeight ? supportHeight(x, z) + 0.38 : 0.56, z], 0.065, 0.96);
    }
    if (!supportHeight) {
      box(bridge, m.paleWood, [(side * width) / 2, 0.86, 0], [0.1, 0.1, length + 0.2]);
      box(bridge, m.wood, [(side * width) / 2, 0.46, 0], [0.08, 0.075, length + 0.2]);
      return;
    }
    const sections = Math.ceil(length / 0.6),
      x = (side * width) / 2;
    for (let i = 0; i < sections; i++)
      for (const upper of [true, false]) {
        const start = -length / 2 + (i * length) / sections;
        const end = -length / 2 + ((i + 1) * length) / sections;
        const height = upper ? 0.56 : 0.16;
        const firstY = supportHeight(x, start) + height,
          lastY = supportHeight(x, end) + height;
        const delta = new THREE.Vector3(0, lastY - firstY, end - start);
        const rail = box(
          bridge,
          upper ? m.paleWood : m.wood,
          [x, (firstY + lastY) / 2, (start + end) / 2],
          [upper ? 0.1 : 0.08, upper ? 0.1 : 0.075, delta.length() + 0.015],
        );
        rail.quaternion.setFromUnitVectors(new THREE.Vector3(0, 0, 1), delta.normalize());
      }
  });
  const baked = bakeModel(bridge);
  ownedPlanks.forEach((geometry) => geometry.dispose());
  return baked;
}

export function createFlowerPatch(seed = 0, count = 5) {
  seed = Number.isFinite(seed) ? Math.abs(Math.floor(seed)) % 6 : 0;
  count = Number.isFinite(count) ? Math.max(1, Math.min(12, Math.floor(count))) : 5;
  const key = `flowers:${seed}:${count}`;
  if (modelCache.has(key)) return modelCache.get(key).clone();
  const m = createMaterials();
  const patch = new THREE.Group();
  for (let i = 0; i < count; i++) {
    const angle = i * 2.39996 + seed;
    const radius = Math.sqrt(i / count) * 0.65;
    const flower = new THREE.Group();
    flower.position.set(Math.cos(angle) * radius, 0, Math.sin(angle) * radius);
    patch.add(flower);
    const h = 0.18 + ((i * 7 + seed) % 4) * 0.03;
    cylinder(flower, m.stem, [0, h / 2, 0], 0.014, h);
    const petalMat = [m.flowerYellow, m.flowerPink, m.flowerWhite][(i + seed) % 3];
    for (let p = 0; p < 5; p++) {
      const a = (p * Math.PI * 2) / 5;
      sphere(flower, petalMat, [Math.cos(a) * 0.05, h, Math.sin(a) * 0.05], [0.045, 0.022, 0.045], 6);
    }
    sphere(flower, m.flowerCenter, [0, h + 0.015, 0], [0.027, 0.023, 0.027], 6);
  }
  return cachedModel(key, patch);
}

export function createBush(variant = 0) {
  variant = Math.abs(Math.floor(variant)) % 3;
  const key = `bush:${variant}`;
  if (modelCache.has(key)) return modelCache.get(key).clone();
  const m = createMaterials();
  const bush = new THREE.Group();
  const leaf = [m.leaves, m.leavesDark, m.leavesLight][variant % 3];
  cylinder(bush, m.bark, [0, 0.16, 0], 0.08, 0.3);
  sculptedSphere(bush, leaf, [0, 0.42, 0], [0.62, 0.46, 0.48], 0.075);
  sculptedSphere(bush, leaf, [-0.42, 0.28, 0.12], [0.38, 0.34, 0.35], 0.075);
  sculptedSphere(bush, leaf, [0.42, 0.34, -0.1], [0.4, 0.37, 0.36], 0.075);
  sculptedSphere(bush, leaf, [0.1, 0.65, -0.13], [0.38, 0.34, 0.37], 0.075);
  for (let i = 0; i < 4; i++) {
    const angle = (i * Math.PI) / 2 + variant * 0.29;
    const leafForm = sculptedSphere(
      bush,
      leaf,
      [Math.cos(angle) * 0.52, 0.46 + (i % 2) * 0.1, Math.sin(angle) * 0.42],
      [0.25, 0.16, 0.33],
      0.04,
    );
    leafForm.rotation.y = angle;
  }
  return cachedModel(key, bush);
}
