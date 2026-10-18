import * as THREE from 'three';

const cache = new Map();
const sides = 10;
const v = (a) => new THREE.Vector3(...a);
const centerAt = (y) => [.07 * Math.sin(y * 1.8), y, .055 * Math.sin(y * 2.1)];

// Width affects offsets from a continuous skeleton, never branch reach. Normal
// coefficients are the exact area-weighted face cross-products for p = c + f*r.
function normalCoefficients(geometry) {
  const p = geometry.attributes.position, c = geometry.attributes.treeCenter;
  const coefficients = [0, 1, 2].map(() => new Float32Array(p.count * 3));
  const a = new THREE.Vector3(), b = new THREE.Vector3(), da = new THREE.Vector3(), db = new THREE.Vector3();
  const at = (attribute, i) => new THREE.Vector3().fromBufferAttribute(attribute, i);
  const ids = geometry.index.array;
  for (let i = 0; i < ids.length; i += 3) {
    const [u, w, t] = ids.slice(i, i + 3), origin = at(c, u), offset = at(p, u).sub(origin);
    a.copy(at(c, w)).sub(origin); b.copy(at(c, t)).sub(origin);
    da.copy(at(p, w)).sub(at(c, w)).sub(offset); db.copy(at(p, t)).sub(at(c, t)).sub(offset);
    const terms = [a.clone().cross(b), a.clone().cross(db).add(da.clone().cross(b)), da.clone().cross(db)];
    for (let k = 0; k < 3; k++) for (const id of [u, w, t]) {
      coefficients[k][id * 3] += terms[k].x; coefficients[k][id * 3 + 1] += terms[k].y; coefficients[k][id * 3 + 2] += terms[k].z;
    }
  }
  coefficients.forEach((data, i) => geometry.setAttribute(`treeNormal${i}`, new THREE.BufferAttribute(data, 3)));
}

export function deformTreeGeometry(geometry, width) {
  const result = geometry.clone(), p = result.attributes.position, c = geometry.attributes.treeCenter;
  for (let i = 0; i < p.count; i++) for (let j = 0; j < 3; j++) p.array[i * 3 + j] = c.array[i * 3 + j] + width * (p.array[i * 3 + j] - c.array[i * 3 + j]);
  result.computeVertexNormals(); result.computeBoundingSphere(); result.computeBoundingBox();
  return result;
}

export function createTreeWood(variant = 0) {
  variant = Math.abs(Math.floor(variant)) % 3;
  if (cache.has(variant)) return cache.get(variant);
  const positions = [], centers = [], indices = [], rings = [], forks = [], tips = [];
  const add = (point, center) => { const id = positions.length / 3; positions.push(...point); centers.push(...center); return id; };
  const tri = (a, b, c) => indices.push(a, b, c);
  const specifications = [{ y: -.06, r: .62 }, { y: .16, r: .57 }, { y: .6, r: .49 }, { y: 1.08, r: .4 }];
  let parentRadius = .34;
  for (let i = 0; i < 4; i++) {
    const y = 1.56 + .35 * i, branchRadius = parentRadius * .6, continuingRadius = parentRadius * .8;
    const lower = specifications.length;
    specifications.push({ y: y - .12, r: parentRadius }, { y: y + .12, r: continuingRadius });
    const sector = (i * 4 + variant) % sides;
    forks.push({ point: centerAt(y), parentRadius, childRadii: [continuingRadius, branchRadius], lower, sector });
    parentRadius = continuingRadius * .89;
  }
  specifications.push({ y: 2.94, r: .075 }, { y: 3.12, r: .025 });
  for (const { y, r } of specifications) {
    const center = centerAt(y), ring = [];
    for (let j = 0; j < sides; j++) {
      const angle = j * 2 * Math.PI / sides;
      // The root buttress belongs to the same surface and closes below soil.
      const radius = r + Math.max(0, 1 - (y + .06) / .3) * .14 * Math.pow(Math.cos(angle * 2 + variant * .2), 4);
      ring.push(add([center[0] + radius * Math.cos(angle), y, center[2] + radius * Math.sin(angle)], center));
    }
    rings.push(ring);
  }
  for (let k = 0; k < rings.length - 1; k++) for (let j = 0; j < sides; j++) {
    const fork = forks.find(f => f.lower === k);
    if (fork && (j - fork.sector + sides) % sides < 3) continue;
    const next = (j + 1) % sides, a = rings[k][j], b = rings[k][next], c = rings[k + 1][j], d = rings[k + 1][next];
    tri(a, c, b); tri(b, c, d);
  }
  const bottom = add(centerAt(specifications[0].y), centerAt(specifications[0].y));
  const top = add(centerAt(3.15), centerAt(3.15));
  for (let j = 0; j < sides; j++) {
    tri(rings[0][j], rings[0][(j + 1) % sides], bottom);
    tri(rings.at(-1)[(j + 1) % sides], rings.at(-1)[j], top);
  }
  for (const fork of forks) {
    const { lower, sector, point, childRadii } = fork;
    const ring = [];
    // Shared indices around a removed trunk patch: eight-vertex junction.
    for (let j = 0; j <= 3; j++) ring.push(rings[lower][(sector + j) % sides]);
    for (let j = 3; j >= 0; j--) ring.push(rings[lower + 1][(sector + j) % sides]);
    const angle = (sector + 1.5) * 2 * Math.PI / sides;
    const outward = new THREE.Vector3(Math.cos(angle), 0, Math.sin(angle));
    const side = new THREE.Vector3(-Math.sin(angle), 0, Math.cos(angle));
    const endY = 2.48 + (point[1] - 1.56) * .48;
    // Keep the first circular section beyond the upper trunk lip: placing it
    // too close folds the transition inward and flips its smoothed corner normals.
    const startCenter = v(point).addScaledVector(outward, .54); startCenter.y += .08;
    const endCenter = v(point).addScaledVector(outward, 1.08); endCenter.y = endY;
    let previous = ring;
    fork.branchRings = []; fork.parentRing = rings[lower]; fork.continuingRing = rings[lower + 1];
    for (let k = 0; k < 4; k++) {
      const t = k / 3, center = startCenter.clone().lerp(endCenter, t).addScaledVector(side, .065 * Math.sin(t * Math.PI));
      center.y -= .09 * Math.sin(t * Math.PI);
      const tangent = endCenter.clone().sub(startCenter).addScaledVector(side, .065 * Math.PI * Math.cos(t * Math.PI)); tangent.y -= .09 * Math.PI * Math.cos(t * Math.PI); tangent.normalize();
      const across = side.clone(), vertical = across.clone().cross(tangent).normalize();
      const radius = childRadii[1] * (1 - .78 * t), next = [];
      // Corresponding boundary order traverses lower arc then upper arc.
      for (let j = 0; j < 8; j++) {
        const a = -Math.PI * .625 - j * Math.PI / 4;
        next.push(add(center.clone().addScaledVector(across, Math.sin(a) * radius).addScaledVector(vertical, Math.cos(a) * radius).toArray(), center.toArray()));
      }
      for (let j = 0; j < 8; j++) { const n = (j + 1) % 8; tri(previous[n], previous[j], next[j]); tri(previous[n], next[j], next[n]); }
      fork.branchRings.push({ indices: next, center: center.toArray(), radius });
      previous = next;
    }
    const end = add(endCenter.clone().addScaledVector(endCenter.clone().sub(startCenter).normalize(), .025).toArray(), endCenter.toArray());
    for (let j = 0; j < 8; j++) tri(previous[(j + 1) % 8], previous[j], end);
    tips.push(endCenter.toArray());
  }
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
  geometry.setAttribute('treeCenter', new THREE.Float32BufferAttribute(centers, 3));
  const colors = positions.map((value, i) => {
    const x = positions[i - i % 3], y = positions[i - i % 3 + 1], z = positions[i - i % 3 + 2];
    return .94 + .035 * Math.sin(x * 16 + Math.sin(y * 2) + z * 11);
  });
  geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
  geometry.setIndex(indices); geometry.computeVertexNormals(); normalCoefficients(geometry);
  geometry.computeBoundingBox(); geometry.computeBoundingSphere();
  geometry.userData = { forks, tips, trunkRings: rings, trunkProfile: specifications };
  cache.set(variant, geometry);
  return geometry;
}

// Both a lone tree and an instanced batch use this same surface deformation.
export function configureTreeMaterial(material) {
  const width = { value: 1 };
  material.userData.treeWidth = width;
  material.onBeforeCompile = shader => {
    shader.uniforms.treeWidth = width;
    shader.vertexShader = `attribute vec3 treeCenter;\nattribute vec3 treeNormal0;\nattribute vec3 treeNormal1;\nattribute vec3 treeNormal2;\nuniform float treeWidth;\n#ifdef USE_INSTANCING\nattribute float treeInstanceWidth;\n#endif\n${shader.vertexShader}`;
    shader.vertexShader = shader.vertexShader.replace('#include <beginnormal_vertex>', `float woodWidth = treeWidth;\n#ifdef USE_INSTANCING\nwoodWidth = treeInstanceWidth;\n#endif\nvec3 objectNormal = normalize(treeNormal0 + woodWidth * treeNormal1 + woodWidth * woodWidth * treeNormal2);`);
    shader.vertexShader = shader.vertexShader.replace('#include <begin_vertex>', 'vec3 transformed = treeCenter + woodWidth * (position - treeCenter);');
  };
  material.customProgramCacheKey = () => 'continuous-tree-v1';
}
