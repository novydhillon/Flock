import * as THREE from 'three';
import { mergeGeometries } from 'three/addons/utils/BufferGeometryUtils.js';
import { createPipMotionState, applyDogPose } from './animation/pip-motion.js';

// All colours are baked into the clay. Each moving joint needs only one draw,
// even for the eyes, facial markings, white socks and two-tone tail.
const clay = new THREE.MeshStandardMaterial({ vertexColors: true, roughness: 0.93 });
const palette = {
  coat: '#35353b',
  cheek: '#49474a',
  muzzle: '#757273',
  cream: '#f4ede1',
  ivory: '#dbd4c9',
  brow: '#97918b',
  leather: '#242225',
  eye: '#41342e',
  ear: '#786166',
  tongue: '#c98889',
};
for (const name of Object.keys(palette)) palette[name] = new THREE.Color(palette[name]);
const unit = new THREE.SphereGeometry(1, 16, 12);
const detail = new THREE.SphereGeometry(1, 10, 8);

// Sculpt a soft ellipsoid in joint-local space. Deformations operate on the
// unit surface, so markings and tapered tips stay attached as joints move.
function form(tint, position, size, sculpt, rotation = 0) {
  const geometry = (Math.max(...size) < 0.235 ? detail : unit).clone();
  const points = geometry.attributes.position;
  const colors = [];
  const point = new THREE.Vector3();
  for (let i = 0; i < points.count; i++) {
    const x = points.getX(i),
      y = points.getY(i),
      z = points.getZ(i);
    point.set(x, y, z);
    const shade = sculpt?.(point) || tint;
    const grain = Math.sin(7 * x + 3 * z) * Math.cos(6 * y - 2 * x);
    const press = 1 + 0.014 * grain;
    points.setXYZ(i, point.x * size[0] * press, point.y * size[1] * press, point.z * size[2] * press);
    const color = palette[shade],
      value = 1 + 0.035 * grain;
    colors.push(color.r * value, color.g * value, color.b * value);
  }
  geometry.computeVertexNormals();
  // Average coincident pole/seam normals after sculpting to avoid a visible mould line.
  const normals = geometry.attributes.normal;
  const { widthSegments, heightSegments } = geometry.parameters;
  const sum = new THREE.Vector3();
  for (let row = 0; row <= heightSegments; row++) {
    const first = row * (widthSegments + 1);
    const step = row === 0 || row === heightSegments ? 1 : widthSegments;
    sum.set(0, 0, 0);
    for (let col = 0; col <= widthSegments; col += step) sum.add(point.fromBufferAttribute(normals, first + col));
    sum.normalize();
    for (let col = 0; col <= widthSegments; col += step) normals.setXYZ(first + col, sum.x, sum.y, sum.z);
  }
  geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
  geometry.rotateX(rotation);
  geometry.translate(...position);
  return geometry;
}

function joint(parent, name, position, pieces) {
  const geometry = mergeGeometries(pieces);
  for (const piece of pieces) piece.dispose();
  const mesh = new THREE.Mesh(geometry, clay);
  mesh.name = name;
  mesh.position.set(...position);
  mesh.castShadow = mesh.receiveShadow = true;
  mesh.userData.ownedGeometry = true;
  parent.add(mesh);
  return mesh;
}

function makeHead(rig, puppy) {
  const skull = [
    form('coat', [0, 0.18, 0.06], [0.295, 0.285, 0.28], (p) => {
      if (p.z > 0.45 && Math.abs(p.x + 0.035) < 0.16 * (1.12 - p.y)) return 'muzzle';
    }),
    form('muzzle', [0, 0.09, 0.31], [0.191, 0.126, puppy ? 0.195 : 0.24], (p) => {
      p.y += 0.1 * p.z;
      p.x *= 1 - 0.19 * p.z;
    }),
    form('leather', [0, 0.118, puppy ? 0.47 : 0.512], [0.104, 0.078, 0.068], (p) => {
      p.x *= 1 + 0.2 * p.y;
    }),
  ];
  for (const side of [-1, 1]) {
    // Cheek feathers fall away from the muzzle, framing the tapered collie face.
    skull.push(
      form('cheek', [side * 0.206, 0.065, 0.057], [0.089, 0.155, 0.147], (p) => {
        p.x -= side * 0.32 * p.y;
        p.z += 0.24 * p.y;
        p.x *= 0.82 + 0.25 * p.y;
      }),
    );
    const x = side * 0.145;
    skull.push(form('cream', [x, 0.239, 0.277], [0.078, 0.086, 0.052]));
    skull.push(form('eye', [x + side * 0.008, 0.237, 0.312], [0.054, 0.065, 0.029]));
    skull.push(form('leather', [x + side * 0.007, 0.237, 0.334], [0.032, 0.048, 0.014]));
    skull.push(form('cream', [x - 0.009, 0.26, 0.348], [0.014, 0.017, 0.008]));
    skull.push(
      form('brow', [side * 0.152, 0.336, 0.22], [0.074, 0.026, 0.038], (p) => {
        p.y -= side * 0.52 * p.x;
      }),
    );
  }
  const head = joint(rig, 'Head', [0, 0.245, 0.42], skull);
  if (puppy) head.scale.setScalar(1.1);
  const ears = [-1, 1].map((side) =>
    joint(
      head,
      side < 0 ? 'Pricked ear' : 'Tipped ear',
      [side * 0.172, 0.374, 0.012],
      [
        form('coat', [0, 0.101, 0], [0.11, 0.19, 0.065], (p) => {
          const h = (p.y + 1) / 2;
          const inside = p.z > 0.62 && h > 0.28 && h < 0.88 && Math.abs(p.x) < 0.56;
          p.x = p.x * (1.2 - 0.83 * h) + side * h * 0.75;
          if (side > 0 || puppy) {
            const fold = Math.max(0, h - (side > 0 ? 0.55 : 0.8));
            p.y -= fold * 3.1;
            p.z += fold * 4.8;
          }
          if (inside) return 'ear';
        }),
      ],
    ),
  );
  const jaw = joint(
    head,
    'Jaw',
    [0, 0.018, 0.192],
    [
      form('cheek', [0, -0.014, 0.128], [0.15, 0.058, puppy ? 0.148 : 0.175]),
      form('tongue', [0, 0.022, 0.155], [0.11, 0.031, 0.13]),
    ],
  );
  return { head, ears, jaw };
}

function makeLeg(rig, side, fore) {
  const upperLength = 0.385,
    lowerLength = 0.385;
  const upper = joint(
    rig,
    fore ? 'Shoulder' : 'Haunch',
    [side * 0.202, 0, fore ? 0.376 : -0.405],
    [
      form('coat', [0, -0.127, 0], [fore ? 0.105 : 0.158, 0.286, fore ? 0.135 : 0.204], (p) => {
        p.x *= 1 + 0.27 * p.y;
        p.z *= 1 + 0.24 * p.y;
      }),
    ],
  );
  const lower = joint(
    upper,
    fore ? 'Foreleg' : 'Hock',
    [0, -upperLength, 0],
    [
      form('ivory', [0, -0.171, 0], [0.081, 0.232, 0.086], (p) => {
        const dark = p.y > (fore ? 0.66 : -0.25) + 0.07 * p.x;
        if (!fore) p.z -= 0.7 * (1 - p.y * p.y);
        return dark ? 'coat' : 'cream';
      }),
    ],
  );
  const paw = joint(
    lower,
    'Paw',
    [0, -lowerLength, 0],
    [
      form('cream', [0, -0.006, 0.038], [0.102, 0.077, 0.148], (p) => {
        p.y = Math.max(-0.86, p.y);
        p.x *= 1 + 0.13 * p.z;
      }),
    ],
  );
  return {
    upper,
    lower,
    paw,
    restZ: upper.position.z,
    upperLength,
    lowerLength,
    side,
    fore,
    target: new THREE.Vector3(),
    planted: false,
    anchor: new THREE.Vector2(),
    release: new THREE.Vector2(),
  };
}

function borderCollie(puppy) {
  const dog = new THREE.Group();
  dog.name = puppy ? 'Buddy the Border Collie puppy' : 'Pip the Border Collie';
  const rig = new THREE.Group();
  dog.add(rig);
  const torso = [
    form('coat', [0, 0.026, -0.035], [0.274, 0.278, puppy ? 0.605 : 0.657], (p) => {
      const waist = 1 - 0.12 * Math.exp(-((p.z + 0.23) ** 2) / 0.055);
      p.x *= waist;
      p.y = p.y * waist + 0.075 * (1 - waist);
    }),
    form('cream', [0, 0.152, 0.361], [0.273, 0.326, 0.245], (p) => {
      p.z += 0.33 * p.y;
      p.x *= 0.94 + p.y * 0.15;
    }),
    form('cream', [0, 0.062, 0.519], [0.16, 0.247, 0.113], (p) => {
      p.x *= 0.95 + 0.37 * p.y;
    }),
  ];
  for (const side of [-1, 1]) {
    torso.push(
      form('ivory', [side * 0.174, 0.144, 0.396], [0.107, 0.218, 0.125], (p) => {
        p.x -= side * 0.32 * p.y;
        p.x *= 0.85 + 0.27 * p.y;
      }),
    );
  }
  const body = joint(rig, 'Coat and ruff', [0, 0, 0], torso);
  const tail = joint(
    rig,
    'Brush tail',
    [0, 0.082, -0.54],
    [
      form('coat', [0, -0.069, -0.332], [0.14, 0.146, puppy ? 0.312 : 0.392], (p) => {
        const tip = (1 - p.z) / 2;
        p.y += 2.5 * tip ** 2 - 1.5 * tip;
        p.x *= 1 - 0.25 * tip;
        if (tip > 0.76 + 0.045 * p.y) return 'cream';
      }),
    ],
  );
  const legs = [];
  for (const fore of [true, false]) for (const side of [-1, 1]) legs.push(makeLeg(rig, side, fore));
  dog.userData.parts = { rig, body, tail, legs, ...makeHead(rig, puppy) };
  dog.userData.suggestedScale = puppy ? 0.82 : 1;
  dog.userData.motion = createPipMotionState(puppy);
  applyDogPose(dog);
  return dog;
}

export function createPip() {
  return borderCollie(false);
}
export function createBuddy() {
  return borderCollie(true);
}
