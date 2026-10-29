import * as THREE from 'three';
import settings from './config/presentation.json' with { type: 'json' };
import { resolveConfig } from './config/resolve.js';
import { CONFIG_CONTRACTS } from './config/contracts.js';

const PRESENTATION = resolveConfig(settings, 'presentation', CONFIG_CONTRACTS.presentation);
const cross = (a, b, c) => (b.x - a.x) * (c.z - a.z) - (b.z - a.z) * (c.x - a.x);

function convexHull(points) {
  points.sort((a, b) => a.x - b.x || a.z - b.z);
  const half = values => {
    const result = [];
    for (const point of values) {
      while (result.length > 1 && cross(result.at(-2), result.at(-1), point) <= 1e-10) result.pop();
      result.push(point);
    }
    return result;
  };
  return [...half(points).slice(0, -1), ...half(points.slice().reverse()).slice(0, -1)];
}

function clipHalfPlane(polygon, a, b, sign = 1) {
  const result = [];
  for (let i = 0; i < polygon.length; i++) {
    const p = polygon[i], q = polygon[(i + 1) % polygon.length];
    const dp = sign * cross(a, b, p), dq = sign * cross(a, b, q);
    const inside = dp >= 0, nextInside = dq >= 0;
    if (inside) result.push(p);
    if (inside !== nextInside) {
      const t = dp / (dp - dq);
      result.push({ x: p.x + (q.x - p.x) * t, z: p.z + (q.z - p.z) * t });
    }
  }
  return result;
}

function intersectConvex(polygon, boundary) {
  const sign = Math.sign(cross(...boundary.slice(0, 3)));
  for (let i = 0; i < boundary.length && polygon.length; i++) {
    polygon = clipHalfPlane(polygon, boundary[i], boundary[(i + 1) % boundary.length], sign);
  }
  return polygon;
}

// Split off the outside of each rectangle edge and discard its final interior.
function excludeConvex(polygon, boundary) {
  const sign = Math.sign(cross(...boundary.slice(0, 3)));
  const result = [];
  for (let i = 0; i < boundary.length && polygon.length; i++) {
    const a = boundary[i], b = boundary[(i + 1) % boundary.length];
    const outside = clipHalfPlane(polygon, a, b, -sign);
    if (outside.length > 2) result.push(outside);
    polygon = clipHalfPlane(polygon, a, b, sign);
  }
  return result;
}

function surfaceTriangles(geometry) {
  if (!geometry) return null;
  const positions = geometry.attributes.position, index = geometry.index;
  const triangles = [];
  for (let offset = 0; offset < (index?.count ?? positions.count); offset += 3) {
    const points = Array.from({ length: 3 }, (_, i) => {
      const vertex = index ? index.getX(offset + i) : offset + i;
      return { x: positions.getX(vertex), z: positions.getZ(vertex) };
    });
    if (Math.abs(cross(...points)) > 1e-10) triangles.push(points);
  }
  return triangles;
}

function bridgeBoundary(bridge) {
  const heading = bridge.heading ?? 0;
  const dx = Math.sin(heading), dz = Math.cos(heading);
  return [[-1, -1], [1, -1], [1, 1], [-1, 1]].map(([along, across]) => ({
    x: bridge.x + dx * along * bridge.length / 2 + dz * across * bridge.width / 2,
    z: bridge.z + dz * along * bridge.length / 2 - dx * across * bridge.width / 2,
  }));
}

/** Bake fixed-sun silhouettes once; the camera and realtime shadow map never participate. */
export function bakeVegetationShadow(parent, meshes, { receiverY = 0, receiverGeometry = null, bridges = [] } = {}) {
  const receivers = surfaceTriangles(receiverGeometry);
  const exclusions = bridges.map(bridgeBoundary);
  parent.updateWorldMatrix(true, false);
  const inverse = parent.matrixWorld.clone().invert();
  const sun = new THREE.Vector3(...PRESENTATION.lighting.sunOffset).transformDirection(inverse);
  const shiftX = sun.x / Math.max(1e-4, sun.y), shiftZ = sun.z / Math.max(1e-4, sun.y);
  const projected = [], groups = new Map(), instance = new THREE.Matrix4(), transform = new THREE.Matrix4(), vertex = new THREE.Vector3();
  const outputY = receiverY + PRESENTATION.vegetationShadows.surfaceOffset;
  for (const mesh of meshes) {
    mesh.castShadow = mesh.receiveShadow = false;
    mesh.userData.staticVegetation = true;
    mesh.updateMatrix();
    const positions = mesh.geometry.attributes.position;
    for (let i = 0; i < mesh.count; i++) {
      mesh.getMatrixAt(i, instance);
      transform.multiplyMatrices(mesh.matrix, instance);
      const points = [];
      for (let j = 0; j < positions.count; j++) {
        vertex.fromBufferAttribute(positions, j).applyMatrix4(transform);
        const height = Math.max(0, vertex.y - receiverY);
        points.push({ x: vertex.x - shiftX * height, z: vertex.z - shiftZ * height });
      }
      const group = mesh.userData.shadowGroups?.[i] ?? `${mesh.id}:${i}`;
      if (!groups.has(group)) groups.set(group, []);
      groups.get(group).push(...points);
    }
  }
  for (const points of groups.values()) {
      const silhouette = convexHull(points);
      let pieces = receivers ? receivers.map(triangle => intersectConvex(silhouette, triangle)).filter(polygon => polygon.length > 2) : [silhouette];
      for (const boundary of exclusions) pieces = pieces.flatMap(polygon => excludeConvex(polygon, boundary));
      for (const polygon of pieces) {
        for (let j = 1; j < polygon.length - 1; j++) {
          if (Math.abs(cross(polygon[0], polygon[j], polygon[j + 1])) < 1e-10) continue;
          for (const point of [polygon[0], polygon[j], polygon[j + 1]]) projected.push(point.x, outputY, point.z);
        }
      }
  }
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.Float32BufferAttribute(projected, 3));
  geometry.computeBoundingSphere();
  const material = new THREE.MeshBasicMaterial({
    color: PRESENTATION.vegetationShadows.color,
    opacity: PRESENTATION.vegetationShadows.opacity,
    transparent: true,
    side: THREE.DoubleSide,
    depthWrite: false,
    polygonOffset: true,
    polygonOffsetFactor: -1,
    polygonOffsetUnits: -1,
    toneMapped: false,
  });
  const shadow = new THREE.Mesh(geometry, material);
  shadow.name = 'Baked static vegetation shadows';
  shadow.castShadow = shadow.receiveShadow = false;
  shadow.userData.bakedVegetationShadow = true;
  shadow.userData.ownedGeometry = shadow.userData.ownedMaterial = true;
  parent.add(shadow);
  return shadow;
}
