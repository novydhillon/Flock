import * as THREE from 'three';

/** Broad folded leaves form a low, folded, three-dimensional grass rosette.
 * Folded cross-sections catch light from every camera direction;
 * the bent tips and layered root/tip colors avoid thin black needle silhouettes.
 */
export function pastureClumpGeometry() {
  const positions = [], colors = [], indices = [];
  const root = new THREE.Color('#697b48'), tip = new THREE.Color('#a5ad73');
  for (let leaf = 0; leaf < 8; leaf++) {
    const angle = leaf * 2.399963, sx = Math.cos(angle), sz = Math.sin(angle);
    const height = .44 + (leaf % 4) * .065, reach = .29 + (leaf % 3) * .07;
    const start = positions.length / 3;
    for (let station = 0; station < 3; station++) {
      const t = station / 2, y = height * Math.sin(t * Math.PI * .64);
      const outward = .055 + reach * t * t;
      const width = [ .025, .07, 0 ][station];
      const color = root.clone().lerp(tip, t * .76);
      for (const [side, ridge] of [[-1, 0], [1, 0], [0, width * .65]]) {
        positions.push(sx * outward - sz * width * side, y + ridge, sz * outward + sx * width * side);
        colors.push(color.r, color.g, color.b);
      }
    }
    for (let station = 0; station < 2; station++) for (const [first,second] of [[0,2],[2,1]]) {
      const a=start+station*3+first,b=start+station*3+second;
      if(station===1)indices.push(a,b,start+6);else indices.push(a,b,b+3,a,b+3,a+3);
    }
  }
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
  geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
  geometry.setIndex(indices);geometry.computeVertexNormals();
  return geometry;
}

/** A flattened irregular clay outcrop; the horizontal unit disk is a hard bound. */
export function pastureRockGeometry() {
  const geometry = new THREE.IcosahedronGeometry(1, 1), p = geometry.attributes.position;
  const colors = [], dark = new THREE.Color('#7e8378'), light = new THREE.Color('#afb09a');
  for (let i = 0; i < p.count; i++) {
    const x = p.getX(i), y = p.getY(i), z = p.getZ(i);
    const grain = Math.sin(x * 9 + z * 7 + y * 4) * .5 + .5;
    const pinch = .84 + grain * .12;
    p.setXYZ(i, x * pinch, (y + 1) * .5, z * pinch);
    const color = dark.clone().lerp(light, .25 + .5 * grain + .2 * Math.max(0, y));
    colors.push(color.r, color.g, color.b);
  }
  geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
  geometry.computeVertexNormals();
  return geometry;
}
