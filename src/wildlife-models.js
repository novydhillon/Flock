import * as THREE from 'three';

/** Rounded part layouts keep ground species clearly distinct. Coordinates face +Z. */
export const wildlifeParts = {
  squirrel: [
    { part: 'body', at: [0, .31, 0], scale: [.20, .23, .32], color: '#a97552' },
    { part: 'head', at: [0, .47, .20], scale: [.17, .17, .17], color: '#bd8960' },
    { part: 'tail', at: [0, .48, -.34], scale: [.20, .31, .19], color: '#8e5b3e', tilt: -.48 },
    { part: 'ear', at: [-.10, .62, .19], scale: [.055, .095, .045], color: '#915b43' },
    { part: 'ear', at: [.10, .62, .19], scale: [.055, .095, .045], color: '#915b43' },
    { part: 'paw', at: [-.14, .13, .13], scale: [.06, .10, .09], color: '#74503b' },
    { part: 'paw', at: [.14, .13, .13], scale: [.06, .10, .09], color: '#74503b' },
    { part: 'paw', at: [-.19, .12, -.22], scale: [.085, .11, .13], color: '#74503b' },
    { part: 'paw', at: [.19, .12, -.22], scale: [.085, .11, .13], color: '#74503b' },
    { part: 'eye', at: [-.105, .50, .33], scale: [.025, .03, .018], color: '#171819' },
    { part: 'eye', at: [.105, .50, .33], scale: [.025, .03, .018], color: '#171819' },
  ],
  rabbit: [
    { part: 'body', at: [0, .31, -.02], scale: [.25, .27, .34], color: '#d6c7aa' },
    { part: 'haunch', at: [0, .25, -.23], scale: [.23, .23, .22], color: '#c4b08f' },
    { part: 'head', at: [0, .48, .25], scale: [.17, .17, .17], color: '#e4d6bd' },
    { part: 'ear', at: [-.09, .78, .25], scale: [.055, .27, .055], color: '#b98278' },
    { part: 'ear', at: [.09, .78, .25], scale: [.055, .27, .055], color: '#b98278' },
    { part: 'tail', at: [0, .34, -.40], scale: [.095, .10, .095], color: '#f0e9dc' },
    { part: 'paw', at: [-.15, .10, .20], scale: [.07, .10, .12], color: '#b09b7c' },
    { part: 'paw', at: [.15, .10, .20], scale: [.07, .10, .12], color: '#b09b7c' },
    { part: 'paw', at: [-.23, .10, -.27], scale: [.095, .10, .18], color: '#b09b7c' },
    { part: 'paw', at: [.23, .10, -.27], scale: [.095, .10, .18], color: '#b09b7c' },
    { part: 'eye', at: [-.12, .51, .36], scale: [.025, .03, .018], color: '#211c19' },
    { part: 'eye', at: [.12, .51, .36], scale: [.025, .03, .018], color: '#211c19' },
  ],
};

/** Compose static anatomy into one vertex-colored geometry per species, keeping
 * per-animal pose updates batched. Paws remain separate animated instances. */
export function wildlifeBodyGeometry(kind) {
  const positions = [], normals = [], colors = [];
  const unitSphere = new THREE.SphereGeometry(1, 10, 8).toNonIndexed();
  const sourcePositions = unitSphere.getAttribute('position');
  const sourceNormals = unitSphere.getAttribute('normal');
  const color = new THREE.Color();
  const normalMatrix = new THREE.Matrix3();
  for (const part of wildlifeParts[kind]) {
    if (part.part === 'paw') continue;
    const rotation = new THREE.Euler(part.tilt || 0, 0, 0);
    const matrix = new THREE.Matrix4().compose(
      new THREE.Vector3(...part.at), new THREE.Quaternion().setFromEuler(rotation), new THREE.Vector3(...part.scale));
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

