import * as THREE from 'three';

/** Rounded part layouts keep ground species clearly distinct. Coordinates face +Z. */
export const wildlifeParts = {
  bird: [
    { part: 'body', at: [0, 0.23, -0.015], scale: [0.115, 0.14, 0.21], color: '#667f82' },
    { part: 'breast', at: [0, 0.235, 0.11], scale: [0.1, 0.115, 0.115], color: '#c1c5b5' },
    { part: 'head', at: [0, 0.36, 0.155], scale: [0.105, 0.11, 0.11], color: '#728e8e' },
    { part: 'beak', at: [0, 0.345, 0.285], scale: [0.034, 0.025, 0.075], color: '#c49b56' },
    { part: 'tail', at: [0, 0.205, -0.25], scale: [0.082, 0.035, 0.16], color: '#4b656b', tilt: -0.12 },
    { part: 'eye', at: [-0.089, 0.392, 0.211], scale: [0.017, 0.019, 0.017], color: '#151d21' },
    { part: 'eye', at: [0.089, 0.392, 0.211], scale: [0.017, 0.019, 0.017], color: '#151d21' },
    { part: 'leg', at: [-0.062, 0.072, 0.025], scale: [0.014, 0.065, 0.014], color: '#8c694d' },
    { part: 'leg', at: [0.062, 0.072, 0.025], scale: [0.014, 0.065, 0.014], color: '#8c694d' },
    { part: 'foot', at: [-0.062, 0.02, 0.06], scale: [0.032, 0.02, 0.072], color: '#8c694d' },
    { part: 'foot', at: [0.062, 0.02, 0.06], scale: [0.032, 0.02, 0.072], color: '#8c694d' },
  ],
  squirrel: [
    { part: 'body', at: [0, 0.31, 0], scale: [0.2, 0.23, 0.32], color: '#a97552' },
    { part: 'head', at: [0, 0.47, 0.2], scale: [0.17, 0.17, 0.17], color: '#bd8960' },
    { part: 'tail', at: [0, 0.48, -0.34], scale: [0.2, 0.31, 0.19], color: '#8e5b3e', tilt: -0.48 },
    { part: 'ear', at: [-0.1, 0.62, 0.19], scale: [0.055, 0.095, 0.045], color: '#915b43' },
    { part: 'ear', at: [0.1, 0.62, 0.19], scale: [0.055, 0.095, 0.045], color: '#915b43' },
    { part: 'paw', at: [-0.14, 0.13, 0.13], scale: [0.06, 0.1, 0.09], color: '#74503b' },
    { part: 'paw', at: [0.14, 0.13, 0.13], scale: [0.06, 0.1, 0.09], color: '#74503b' },
    { part: 'paw', at: [-0.19, 0.12, -0.22], scale: [0.085, 0.11, 0.13], color: '#74503b' },
    { part: 'paw', at: [0.19, 0.12, -0.22], scale: [0.085, 0.11, 0.13], color: '#74503b' },
    { part: 'eye', at: [-0.105, 0.5, 0.33], scale: [0.025, 0.03, 0.018], color: '#171819' },
    { part: 'eye', at: [0.105, 0.5, 0.33], scale: [0.025, 0.03, 0.018], color: '#171819' },
  ],
  rabbit: [
    { part: 'body', at: [0, 0.31, -0.02], scale: [0.25, 0.27, 0.34], color: '#d6c7aa' },
    { part: 'haunch', at: [0, 0.25, -0.23], scale: [0.23, 0.23, 0.22], color: '#c4b08f' },
    { part: 'head', at: [0, 0.48, 0.25], scale: [0.17, 0.17, 0.17], color: '#e4d6bd' },
    { part: 'ear', at: [-0.09, 0.78, 0.25], scale: [0.055, 0.27, 0.055], color: '#b98278' },
    { part: 'ear', at: [0.09, 0.78, 0.25], scale: [0.055, 0.27, 0.055], color: '#b98278' },
    { part: 'tail', at: [0, 0.34, -0.4], scale: [0.095, 0.1, 0.095], color: '#f0e9dc' },
    { part: 'paw', at: [-0.15, 0.1, 0.2], scale: [0.07, 0.1, 0.12], color: '#b09b7c' },
    { part: 'paw', at: [0.15, 0.1, 0.2], scale: [0.07, 0.1, 0.12], color: '#b09b7c' },
    { part: 'paw', at: [-0.23, 0.1, -0.27], scale: [0.095, 0.1, 0.18], color: '#b09b7c' },
    { part: 'paw', at: [0.23, 0.1, -0.27], scale: [0.095, 0.1, 0.18], color: '#b09b7c' },
    { part: 'eye', at: [-0.12, 0.51, 0.36], scale: [0.025, 0.03, 0.018], color: '#211c19' },
    { part: 'eye', at: [0.12, 0.51, 0.36], scale: [0.025, 0.03, 0.018], color: '#211c19' },
  ],
};

/** Compose static anatomy into one vertex-colored geometry per species, keeping
 * per-animal pose updates batched. Paws remain separate animated instances. */
function anatomyGeometry(parts) {
  const positions = [],
    normals = [],
    colors = [];
  const unitSphere = new THREE.SphereGeometry(1, 10, 8).toNonIndexed();
  const sourcePositions = unitSphere.getAttribute('position');
  const sourceNormals = unitSphere.getAttribute('normal');
  const color = new THREE.Color();
  const normalMatrix = new THREE.Matrix3();
  for (const part of parts) {
    if (part.part === 'paw') continue;
    const rotation = new THREE.Euler(part.tilt || 0, 0, 0);
    const matrix = new THREE.Matrix4().compose(
      new THREE.Vector3(...part.at),
      new THREE.Quaternion().setFromEuler(rotation),
      new THREE.Vector3(...part.scale),
    );
    normalMatrix.getNormalMatrix(matrix);
    color.set(part.color);
    for (let i = 0; i < sourcePositions.count; i++) {
      const point = new THREE.Vector3().fromBufferAttribute(sourcePositions, i).applyMatrix4(matrix);
      const normal = new THREE.Vector3().fromBufferAttribute(sourceNormals, i).applyMatrix3(normalMatrix).normalize();
      positions.push(point.x, point.y, point.z);
      normals.push(normal.x, normal.y, normal.z);
      colors.push(color.r, color.g, color.b);
    }
  }
  unitSphere.dispose();
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
  geometry.setAttribute('normal', new THREE.Float32BufferAttribute(normals, 3));
  geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
  geometry.computeBoundingSphere();
  return geometry;
}

export function wildlifeBodyGeometry(kind) {
  return anatomyGeometry(wildlifeParts[kind]);
}

/** Local origin is the shoulder hinge; turn 180 degrees for the other side. The
 * rounded trailing feathers form a single owned, vertex-colored draw geometry. */
export function birdWingGeometry() {
  return anatomyGeometry([
    { at: [0.17, 0, -0.025], scale: [0.18, 0.035, 0.13], color: '#809b9b' },
    { at: [0.27, -0.004, -0.09], scale: [0.155, 0.026, 0.065], color: '#66878b', tilt: 0.12 },
    { at: [0.24, -0.005, -0.15], scale: [0.15, 0.024, 0.048], color: '#58777e', tilt: 0.14 },
    { at: [0.2, -0.006, -0.195], scale: [0.125, 0.022, 0.038], color: '#4e6c75', tilt: 0.16 },
  ]);
}
