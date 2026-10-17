import * as THREE from 'three';
import { mergeGeometries } from 'three/addons/utils/BufferGeometryUtils.js';

// Rounded sculpted forms and tiny enamel/brass details give the machines a
// friendly hand-built character. Geometry is shared between flock members.
const geometryCache = new Map();
// Static constructor references let the production bundler omit unused Three
// exports instead of retaining the entire namespace for dynamic lookup.
const geometryConstructors = {
  TorusGeometry: THREE.TorusGeometry, SphereGeometry: THREE.SphereGeometry, BoxGeometry: THREE.BoxGeometry,
  CylinderGeometry: THREE.CylinderGeometry, ConeGeometry: THREE.ConeGeometry,
};
const modelCache = new Map();
let materialCache;

// A flock may contain dozens of animals. Collapse decorative pieces by material
// and share the resulting geometry across clones; limb meshes retain hip pivots.
function bakeModel(root) {
  root.updateMatrixWorld(true);
  const byMaterial = new Map();
  root.traverse((object) => {
    if (!object.isMesh) return;
    if (!byMaterial.has(object.material)) byMaterial.set(object.material, []);
    byMaterial.get(object.material).push(object.geometry.clone().applyMatrix4(object.matrixWorld));
  });
  const baked = new THREE.Group();
  baked.name = root.name;
  baked.userData.parts = {};
  for (const [material, pieces] of byMaterial) {
    const combined = mergeGeometries(pieces, false);
    pieces.forEach((piece) => piece.dispose());
    const object = new THREE.Mesh(combined, material);
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
  for (let y = 0; y < 128; y++) for (let x = 0; x < 128; x++) {
    // Long, gently wandering ridges read as bark at phone scale without a
    // high-frequency stripe pattern that shimmers as the camera moves.
    const groove = Math.sin(x * .31 + Math.sin(y * .045) * 1.65) * 8
      + Math.sin(x * .11 + Math.sin(y * .021) * 2.6) * 5;
    const scar = Math.sin(Math.hypot(x - 35, (y - 74) * .15) * .46) * 4;
    const grain = ((x * 17 + y * 31 + (x * y) % 29) % 9) - 4;
    const value = Math.max(0, Math.min(255, Math.round(132 + groove + scar + grain)));
    const p = (y * 128 + x) * 4;
    data.data[p] = value; data.data[p + 1] = value; data.data[p + 2] = value; data.data[p + 3] = 255;
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
  const palette = [[188, 203, 148], [210, 207, 153], [164, 191, 137], [223, 207, 155], [154, 184, 133]];
  // Wide, deterministic mottles suggest layers of leaves. Pixel generation
  // uses the same minimal Canvas surface as the existing model textures.
  for (let y = 0; y < 128; y++) for (let x = 0; x < 128; x++) {
    const wave = Math.sin(x * .17 + Math.sin(y * .11) * 1.4) + Math.cos(y * .19 - x * .07);
    const grain = ((x * 17 + y * 31 + (x * y) % 29) % 13) - 6;
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
    cream: enamel('#f5ead3'), white: enamel('#fff8e7'), dark: enamel('#354b55'),
    brass: new THREE.MeshStandardMaterial({ color: '#ddb469', roughness: 0.48, metalness: 0.62 }),
    orange: enamel('#e6a04e'), dogCream: enamel('#ffe5ac'), rust: enamel('#c7704d'),
    cyan: new THREE.MeshStandardMaterial({ color: '#b6fbff', emissive: '#69dfe9', emissiveIntensity: 0.8, roughness: 0.32 }),
    mint: enamel('#84cbb7'), black: enamel('#20343e'),
    wood: clay('#ba9167'), paleWood: clay('#e1bb87'), bark: clay('#8b7758'),
    leaves: clay('#8cbd8b'), leavesLight: clay('#b8d28f'), leavesDark: clay('#619b84'),
    roof: clay('#bf755f'), barn: clay('#d9977e'), barnTrim: clay('#fae7c2'),
    flowerPink: clay('#f2a6a6'), flowerYellow: clay('#ffe28a'), flowerWhite: clay('#fff7e5'),
    flowerCenter: clay('#daa661'), stem: clay('#7fab72'), stone: clay('#abb7a4'),
  };
  materialCache.eye = materialCache.white;
  materialCache.pupil = materialCache.black;
  const grain = woodTexture();
  for (const name of ['wood', 'paleWood']) materialCache[name].map = grain;
  const bark = barkTexture();
  materialCache.bark.map = bark;
  materialCache.bark.bumpMap = bark;
  materialCache.bark.bumpScale = .055;
  materialCache.bark.needsUpdate = true;
  const foliage = foliageTexture();
  for (const name of ['leaves', 'leavesLight', 'leavesDark']) materialCache[name].map = foliage;
  materialCache.leaves.needsUpdate = materialCache.leavesLight.needsUpdate = materialCache.leavesDark.needsUpdate = true;
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
function sculptedSphere(parent, material, pos, scale, amount = 0.025) {
  const key = `sculpted-sphere:${amount}`;
  if (!geometryCache.has(key)) {
    const sculpted = geometry('SphereGeometry', [1, 10, 6]).clone();
    const vertices = sculpted.attributes.position;
    for (let i = 0; i < vertices.count; i++) {
      const x = vertices.getX(i), y = vertices.getY(i), z = vertices.getZ(i);
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
  sphere(parent, m.white, [x - size * 0.14, y + size * 0.2, z + size * 0.67], [size * 0.15, size * 0.15, size * 0.12], 8);
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
    for (let i = 0; i < 3; i++) cylinder(dog, m.dark, [side * 0.311, 0.57, -0.1 + i * 0.07], 0.017, 0.12, [0, 0, Math.PI / 2]);
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
  const tailLightMaterial = new THREE.MeshStandardMaterial({ color: '#9ceeff', emissive: '#39bfe8', emissiveIntensity: 1.25, roughness: 0.28 });
  const legs = [leg(dog, m, -0.22, 0.28, 0.34), leg(dog, m, 0.22, 0.28, 0.34), leg(dog, m, -0.22, -0.3, 0.34), leg(dog, m, 0.22, -0.3, 0.34)];
  const tail = new THREE.Group();
  tail.position.set(0, 0.64, -0.44);
  dog.add(tail);
  cylinder(tail, m.brass, [0, 0.16, -0.08], 0.047, 0.32, [-0.42, 0, 0]);
  const tailLight = sphere(tail, tailLightMaterial, [0, 0.32, -0.15], [0.077, 0.077, 0.077]);
  tailLight.name = 'Pip tail light';tailLight.userData.ownedMaterial = true;
  dog.userData.parts = { body, head, legs, tail, tailLight };
  return dog;
}

// Pip has a separate constructor so Buddy keeps its established walking model.
export function createPip() {
  const m = createMaterials(), shell = new THREE.Group();
  const steel = new THREE.MeshStandardMaterial({color:'#a6b4b6',metalness:.72,roughness:.48});
  const trim = new THREE.MeshStandardMaterial({color:'#667278',metalness:.8,roughness:.38});
  box(shell,steel,[0,.83,-.06],[.62,.51,.92]);
  box(shell,trim,[0,1.095,-.08],[.64,.035,.8]);
  // Recessed seams and small rivets read as sheet-metal panels at game scale.
  for(const side of [-1,1]) {
    box(shell,trim,[side*.315,.84,-.08],[.016,.018,.84]);
    box(shell,trim,[side*.316,.84,-.13],[.018,.48,.018]);
    for(const z of [-.43,.28])for(const y of [.64,1.03])sphere(shell,m.brass,[side*.327,y,z],[.025,.025,.025]);
  }
  cylinder(shell,m.dark,[0,1.03,.38],.21,.18,[Math.PI/2,0,0]);
  box(shell,steel,[0,1.32,.47],[.57,.45,.43]);
  box(shell,m.dark,[0,1.35,.696],[.49,.25,.025]);
  const muzzle=box(shell,steel,[0,1.15,.79],[.49,.25,.45]);muzzle.rotation.x=-.18;
  box(shell,trim,[0,.99,.8],[.46,.04,.42]);
  sphere(shell,m.black,[0,1.2,1.025],[.1,.095,.085]);
  eye(shell,m,-.135,1.36,.72,.109);eye(shell,m,.135,1.36,.72,.109);
  for(const side of [-1,1]) {
    const ear=box(shell,steel,[side*.28,1.69,.43],[.22,.4,.12]);ear.rotation.z=side*-.42;
    box(ear,m.dark,[0,0,.52],[.68,.75,.12]);
  }
  const pods=[];
  for(const x of [-.3,.3])for(const z of [-.35,.29]) {
    box(shell,steel,[x,.64,z],[.23,.43,.27]);
    cylinder(shell,trim,[x*1.35,.78,z],.105,.06,[0,0,Math.PI/2]);
    cylinder(shell,m.dark,[x,.39,z],.12,.09);
    cylinder(shell,trim,[x,.335,z],.13,.05);
    pods.push(new THREE.Vector3(x,.3,z));
  }
  const dog=bakeModel(shell);dog.name='Pip the hovering robot sheepdog';
  dog.traverse(o=>{if(o.isMesh){o.userData.ownedGeometry=true;if(o.material===steel||o.material===trim)o.userData.ownedMaterial=true;}});
  const tail=new THREE.Group();tail.position.set(0,.94,-.52);dog.add(tail);
  for(let i=0;i<7;i++)cylinder(tail,i%2?m.dark:trim,[0,.04+i*.05,-i*.035],.035,.055,[-.6,0,0]);
  const light=new THREE.MeshStandardMaterial({color:'#9ceeff',emissive:'#39bfe8',emissiveIntensity:1.25,roughness:.28});
  const tailLight=sphere(tail,light,[0,.41,-.27],[.075,.075,.075]);tailLight.userData.ownedMaterial=true;
  // Bounded pool: exactly three hollow rings per pod, with no flame geometry.
  const rings=pods.map((pod)=>Array.from({length:3},(_,index)=>{
    const material=new THREE.MeshBasicMaterial({color:'#55dfff',transparent:true,opacity:1,depthWrite:false,toneMapped:false});
    const ring=new THREE.Mesh(geometry('TorusGeometry',[.135,.014,6,24]),material);
    ring.name=`Pip thruster ring ${index+1}`;ring.rotation.x=Math.PI/2;ring.userData.ownedMaterial=true;dog.add(ring);return ring;
  }));
  dog.userData.parts={body:dog.children[0],legs:[],tail,tailLight,pods,rings};
  dog.userData.hover={time:0,previous:null,trails:[]};
  return dog;
}

export function updatePipHover(dog,dt) {
  const state=dog.userData.hover;if(!state)return;
  dog.updateMatrixWorld(true);
  const current=dog.userData.parts.pods.map(p=>dog.localToWorld(p.clone()));
  const reset=!state.previous||dog.position.distanceTo(state.previous)>3;
  if(reset)state.trails=current.map(p=>p.clone());
  // Pausing freezes both the descent and world-space motion trail.
  if(dt>0)state.time+=dt;
  for(let pod=0;pod<current.length;pod++) {
    if(dt>0)state.trails[pod].lerp(current[pod],1-Math.exp(-dt/.13));
    const phase=(state.time/.55)%1;
    for(let index=0;index<3;index++) {
      const ring=dog.userData.parts.rings[pod][index];
      const world=current[pod].clone().lerp(state.trails[pod],index===0?0:(index-1+phase)/2);
      const local=dog.worldToLocal(world);local.y=dog.userData.parts.pods[pod].y-.055-(index===0?0:(index-1+phase)*.1+.055);
      // At recycle, the old middle becomes the new third at identical
      // height, brightness and radius; a new middle fades out of the pod.
      ring.position.copy(local);ring.material.opacity=index===0?.95:index===1?.85*Math.min(1,phase/.15):.85*(1-phase);
      ring.scale.setScalar(1+(index===0?0:(index-1+phase)*.15));
    }
  }
  state.previous=dog.position.clone();
}

export function createAnimal(type = 'sheep') {
  const key = `animal:${type}`;
  if (modelCache.has(key)) return modelCache.get(key).clone();
  const m = createMaterials();
  const cow = type === 'cow';
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
      for (let i = 0; i < 3; i++) sphere(animal, m.brass, [s * 0.312, 0.56, -0.21 + i * 0.21], [0.029, 0.033, 0.033], 8);
    });
  }
  panel(animal, m, [0, 0.87, -0.11], [0.1, 0.024, 0.105], m.mint);
  const head = new THREE.Group();
  head.position.set(0, 0.7, cow ? 0.46 : 0.34);
  animal.add(head);
  sphere(head, cow ? m.cream : m.dark, [0, 0, 0.06], [0.22, 0.235, 0.205]);
  sphere(head, cow ? m.rust : m.black, [0, -0.08, 0.225], [0.185, 0.12, 0.09]);
  eye(head, m, -0.096, 0.055, 0.221, 0.075);
  eye(head, m, 0.096, 0.055, 0.221, 0.075);
  [-1, 1].forEach((s) => {
    const ear = sphere(head, cow ? m.rust : m.cream, [s * 0.235, 0.075, 0.025], [0.135, 0.048, 0.082]);
    ear.rotation.z = s * 0.25;
    sphere(head, m.brass, [s * 0.193, 0.075, 0.025], [0.045, 0.045, 0.045]);
    if (cow) {
      const horn = mesh(head, 'ConeGeometry', [0.047, 0.2, 8], m.brass, [s * 0.15, 0.255, -0.018]);
      horn.rotation.z = s * -0.32;
      sphere(head, m.dark, [s * 0.077, -0.082, 0.305], [0.025, 0.021, 0.016], 8);
    }
  });
  sphere(head, m.cyan, [0, 0.22, 0.008], [0.033, 0.033, 0.033], 8);
  cylinder(animal, m.dark, [0, 0.64, 0.31], 0.13, 0.11, [Math.PI / 2, 0, 0]);
  const legs = [leg(animal, m, -0.22, 0.22, 0.25), leg(animal, m, 0.22, 0.22, 0.25), leg(animal, m, -0.22, -0.24, 0.25), leg(animal, m, 0.22, -0.24, 0.25)];
  const tail = sphere(animal, m.dark, [0, 0.6, cow ? -0.53 : -0.39], [0.061, cow ? 0.15 : 0.065, 0.07]);
  const size = cow ? 1.23 : 1;
  animal.scale.setScalar(size);
  // Body remains baked, while each leg has two shared material meshes in hip
  // coordinates. An instanced renderer can rotate each pair without rebuilding
  // geometry: animalWorld * translate(pivot) * rotateX(gaitAngle).
  for (const limb of legs) animal.remove(limb);
  const articulated = bakeModel(animal);
  for (let limbIndex = 0; limbIndex < legs.length; limbIndex++) {
    const limb = legs[limbIndex];
    const pivot = limb.position.clone().multiplyScalar(size);
    limb.position.set(0, 0, 0);
    limb.scale.setScalar(size);
    const bakedLimb = bakeModel(limb);
    for (const part of [...bakedLimb.children]) {
      part.name = `leg-${limbIndex}`;
      part.position.copy(pivot);
      part.userData = { limbIndex, pivot: pivot.toArray() };
      articulated.add(part);
    }
  }
  articulated.userData.articulated = true;
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
  [-1, 1].forEach((x) => [-1, 1].forEach((z) => {
    const arm = cylinder(drone, m.brass, [x * 0.24, 0, z * 0.2], 0.035, 0.32, [0, 0, x * Math.PI / 2]);
    arm.rotation.y = z * -0.5;
    const propeller = new THREE.Group();
    propeller.position.set(x * 0.39, 0.09, z * 0.29);
    drone.add(propeller);
    sphere(propeller, m.dark, [0, -0.045, 0], [0.071, 0.08, 0.071]);
    sphere(propeller, m.cream, [0, 0, 0], [0.23, 0.017, 0.04]);
    sphere(propeller, m.cream, [0, 0, 0], [0.04, 0.017, 0.23]);
    sphere(propeller, m.cyan, [0, 0.014, 0], [0.036, 0.027, 0.036]);
    propellers.push(propeller);
  }));
  drone.userData.parts = { propellers };
  return drone;
}

export function createTree(variant = 0) {
  variant = Math.abs(Math.floor(variant)) % 3;
  const key = `tree:${variant}`;
  if (modelCache.has(key)) return modelCache.get(key).clone();
  const m = createMaterials();
  const tree = new THREE.Group();
  // Broad roots, a tapered trunk and stout branches make the tree silhouette
  // read at the normal orthographic camera distance. The renderer scales its
  // base against the existing circular trunk collider.
  const trunk = mesh(tree, 'CylinderGeometry', [0.46, 0.62, 2.25, 12], m.bark, [0, 1.125, 0]);
  // A narrowing leader reaches into the top crown and keeps it grounded in
  // the trunk instead of leaving the highest foliage cluster floating.
  mesh(tree, 'CylinderGeometry', [.09, .25, .98, 10], m.bark, [0, 2.62, 0]);
  // Orient every root/fork between explicit endpoints so each radial limb
  // connects the trunk to its crown or the ground in every quadrant.
  const limbBetween = (start, end, bottom, top) => {
    const direction = new THREE.Vector3(...end).sub(new THREE.Vector3(...start));
    const limb = mesh(tree, 'CylinderGeometry', [top, bottom, direction.length(), 10], m.bark,
      start.map((value, i) => (value + end[i]) / 2));
    limb.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), direction.normalize());
  };
  for (let i = 0; i < 4; i++) {
    const a = i * Math.PI / 2 + variant * .17;
    limbBetween([Math.cos(a) * .18, .32, Math.sin(a) * .18],
      [Math.cos(a) * .65, .05, Math.sin(a) * .65], .2, .09);
  }
  for (let i = 0; i < 4; i++) {
    const a = i * Math.PI / 2;
    limbBetween([Math.cos(a) * .18, 1.45 + (i % 2) * .12, Math.sin(a) * .18],
      [Math.cos(a) * .82, 2.44, Math.sin(a) * .82], .19, .11);
  }
  // Small uneven bark ridges and knots make the broad trunk read as
  // hand-shaped clay even when its shared bark texture is distant.
  for (let i = 0; i < 3; i++) {
    const a = i * Math.PI * 2 / 3 + variant * .31;
    const ridge = sculptedSphere(tree, m.bark,
      [Math.cos(a) * .43, .62 + i * .43, Math.sin(a) * .43], [.065, .34, .06], .035);
    ridge.rotation.y = a;
  }
  const leaf = [m.leaves, m.leavesDark, m.leavesLight][variant];
  // Four lower crowns and one high crown leave branch forks exposed beneath
  // and between them. Their silhouettes stay dense without merging into a dome.
  const canopy = [
    [[-.82, 2.42, 0], [.46, .5, .46]],
    [[.82, 2.42, 0], [.46, .5, .46]],
    [[0, 2.42, -.82], [.46, .5, .46]],
    [[0, 2.42, .82], [.46, .5, .46]],
    [[.02, 3.09, .01], [.47, .5, .47]],
  ];
  for (const [position, scale] of canopy) sculptedSphere(tree, leaf, position, scale, .075);
  // Pressed oval leaf marks sit on exposed sides of the separate crowns.
  // Fifteen low-poly forms add detail without adding materials or submissions.
  for (let i = 0; i < 15; i++) {
    const a = i * 2.399963229728653 + variant * .27;
    const cluster = canopy[i % canopy.length];
    const center = cluster[0], scale = cluster[1];
    const ny = ((i % 3) - 1) * .4, ring = Math.sqrt(1 - ny * ny);
    const nx = Math.cos(a) * ring, nz = Math.sin(a) * ring;
    // Follow the same sculpting field as the crown, inset enough to intersect
    // its faceted shell. The thin axis follows the ellipsoid surface normal.
    const sculpt = 1 + .075 * Math.sin(nx * 4.1 + nz * 2.8) * Math.cos(ny * 3.7 - nz * 1.3);
    const normal = new THREE.Vector3(nx / scale[0], ny / scale[1], nz / scale[2]).normalize();
    const leafMark = mesh(tree, 'SphereGeometry', [1, 6, 4], leaf,
      [center[0] + nx * scale[0] * sculpt * .92,
        center[1] + ny * scale[1] * sculpt * .92,
        center[2] + nz * scale[2] * sculpt * .92],
      [.16 + (i % 2) * .025, .09, .115]);
    leafMark.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), normal);
  }
  return cachedModel(key, tree);
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
    door.rotation.y = s * Math.PI / 2;
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
    const x = -length / 2 + i * length / sections;
    cylinder(fence, m.paleWood, [x, 0.46, 0], 0.075, 0.92);
    sphere(fence, m.paleWood, [x, 0.94, 0], [0.083, 0.065, 0.083], 8);
  }
  for (const y of [0.34, 0.69]) box(fence, m.wood, [0, y, 0], [length + 0.03, 0.105, 0.085]);
  // Length varies with procedural worlds. The renderer owns and disposes
  // these merged meshes, keeping the persistent model cache bounded.
  return bakeModel(fence);
}

export function createBridge(width = 2.2, length = 4.5) {
  const m = createMaterials();
  const bridge = new THREE.Group();
  const planks = Math.ceil(length / 0.3);
  for (let i = 0; i < planks; i++) {
    const z = -length / 2 + (i + 0.5) * length / planks;
    const y = Math.sin((i + 0.5) / planks * Math.PI) * 0.12;
    box(bridge, i % 3 ? m.paleWood : m.wood, [0, y + 0.09, z], [width, 0.18, length / planks - 0.025]);
    [-1, 1].forEach((s) => sphere(bridge, m.brass, [s * (width / 2 - 0.16), y + 0.184, z], [0.025, 0.01, 0.025], 6));
  }
  [-1, 1].forEach((side) => {
    for (let i = 0; i < 4; i++) cylinder(bridge, m.wood, [side * width / 2, 0.56, -length / 2 + i * length / 3], 0.065, 0.96);
    box(bridge, m.paleWood, [side * width / 2, 0.86, 0], [0.1, 0.1, length + 0.2]);
    box(bridge, m.wood, [side * width / 2, 0.46, 0], [0.08, 0.075, length + 0.2]);
  });
  return bakeModel(bridge);
}

export function createFlowerPatch(seed = 0, count = 5) {
  seed = Number.isFinite(seed) ? Math.abs(Math.floor(seed)) % 6 : 0;
  count = Number.isFinite(count) ? Math.max(1, Math.min(12, Math.floor(count))) : 5;
  const key = `flowers:${seed}:${count}`;
  if (modelCache.has(key)) return modelCache.get(key).clone();
  const m = createMaterials();
  const patch = new THREE.Group();
  for (let i = 0; i < count; i++) {
    const angle = (i * 2.39996) + seed;
    const radius = Math.sqrt(i / count) * 0.65;
    const flower = new THREE.Group();
    flower.position.set(Math.cos(angle) * radius, 0, Math.sin(angle) * radius);
    patch.add(flower);
    const h = 0.18 + ((i * 7 + seed) % 4) * 0.03;
    cylinder(flower, m.stem, [0, h / 2, 0], 0.014, h);
    const petalMat = [m.flowerYellow, m.flowerPink, m.flowerWhite][(i + seed) % 3];
    for (let p = 0; p < 5; p++) {
      const a = p * Math.PI * 2 / 5;
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
  cylinder(bush, m.bark, [0, .16, 0], .08, .3);
  sculptedSphere(bush, leaf, [0, .42, 0], [.62, .46, .48], .075);
  sculptedSphere(bush, leaf, [-.42, .28, .12], [.38, .34, .35], .075);
  sculptedSphere(bush, leaf, [.42, .34, -.1], [.4, .37, .36], .075);
  sculptedSphere(bush, leaf, [.1, .65, -.13], [.38, .34, .37], .075);
  for (let i = 0; i < 4; i++) {
    const angle = i * Math.PI / 2 + variant * .29;
    const leafForm = sculptedSphere(bush, leaf,
      [Math.cos(angle) * .52, .46 + (i % 2) * .1, Math.sin(angle) * .42], [.25, .16, .33], .04);
    leafForm.rotation.y = angle;
  }
  return cachedModel(key, bush);
}
