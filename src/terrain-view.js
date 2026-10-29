import * as THREE from 'three';
import { mergeVertices } from 'three/addons/utils/BufferGeometryUtils.js';
import { groundHeight, terrainHeight, GROUND_SURFACE_OFFSET } from './world.js';
import settings from './config/presentation.json' with { type: 'json' };
import { CONFIG_CONTRACTS } from './config/contracts.js';
import { resolveConfig } from './config/resolve.js';

const SETTINGS = resolveConfig(settings, 'presentation', CONFIG_CONTRACTS.presentation).terrain;

/** Analytic support normals also work for water and gently graded decks. */
export function surfaceNormal(height, x, z) {
  const step = 0.025;
  return new THREE.Vector3(
    (height(x - step, z) - height(x + step, z)) / (2 * step),
    1,
    (height(x, z - step) - height(x, z + step)) / (2 * step),
  ).normalize();
}

/** Subdivide on shared grid lines; long triangles must never cut through a hill.
 * Interpolate every attribute, including road fade, then replace face normals
 * with the shared smooth surface gradient so triangle boundaries stay invisible.
 */
export function conformSurface(source, height, { spacing = SETTINGS.surfaceSpacing, offset = 0 } = {}) {
  // Pack each temporary vertex into one numeric row. Road unions contain many
  // thin polygons, so object-per-attribute interpolation adds significant GC.
  const attributes = [];
  let stride = 0, positionOffset = 0;
  for (const [name, attribute] of Object.entries(source.attributes)) {
    if (name === 'normal') continue;
    if (name === 'position') positionOffset = stride;
    attributes.push({name, attribute, offset: stride, output: []});
    stride += attribute.itemSize;
  }
  const normals = [], index = source.index;
  const read = i => {
    const vertex = new Array(stride);
    for (const entry of attributes) {
      const size = entry.attribute.itemSize, input = entry.attribute.array;
      for (let component = 0; component < size; component++)
        vertex[entry.offset + component] = input[i * size + component];
    }
    return vertex;
  };
  const split = (polygon, axis, line) => {
    const low = [], high = [];
    for (let i = 0; i < polygon.length; i++) {
      const a = polygon[i], b = polygon[(i + 1) % polygon.length];
      const first = a[positionOffset + axis] - line, last = b[positionOffset + axis] - line;
      if (first <= 1e-9) low.push(a);
      if (first >= -1e-9) high.push(a);
      if (first * last < -1e-18) {
        const fraction = first / (first - last), middle = new Array(stride);
        for (let component = 0; component < stride; component++)
          middle[component] = a[component] + (b[component] - a[component]) * fraction;
        low.push(middle); high.push(middle);
      }
    }
    return {low, high};
  };
  // Common world-grid cuts preserve the original shared-edge topology. Sweep
  // only the unsliced remainder, rather than visiting completed strips again.
  const cell = spacing / Math.SQRT2;
  const slice = (polygons, axis) => {
    const result = [];
    for (const polygon of polygons) {
      let minimum = Infinity, maximum = -Infinity;
      for (const vertex of polygon) {
        const value = vertex[positionOffset + axis];
        minimum = Math.min(minimum, value);maximum = Math.max(maximum, value);
      }
      let active = polygon;
      for (let line = (Math.floor(minimum / cell) + 1) * cell; line < maximum - 1e-9; line += cell) {
        const {low, high} = split(active, axis, line);
        if (low.length >= 3) result.push(low);
        active = high;
        if (active.length < 3) break;
      }
      if (active.length >= 3) result.push(active);
    }
    return result;
  };
  const sampleCache = new Map();
  const emit = vertex => {
    const x = vertex[positionOffset], originalY = vertex[positionOffset + 1], z = vertex[positionOffset + 2];
    const key = x.toFixed(7) + ',' + z.toFixed(7);
    let sample = sampleCache.get(key);
    if (!sample) {
      const normal = surfaceNormal(height, x, z);
      sample = [height(x, z), normal.x, normal.y, normal.z];
      sampleCache.set(key, sample);
    }
    for (const entry of attributes) {
      if (entry.name === 'position') entry.output.push(x, sample[0] + originalY + offset, z);
      else for (let component = 0; component < entry.attribute.itemSize; component++)
        entry.output.push(vertex[entry.offset + component]);
    }
    normals.push(sample[1], sample[2], sample[3]);
  };
  const count = index?.count ?? source.attributes.position.count;
  for (let i = 0; i < count; i += 3) {
    const triangle = [read(index ? index.getX(i) : i), read(index ? index.getX(i + 1) : i + 1),
      read(index ? index.getX(i + 2) : i + 2)];
    for (const polygon of slice(slice([triangle], 0), 2)) for (let j = 1; j < polygon.length - 1; j++) {
      const a = polygon[0], b = polygon[j], c = polygon[j + 1], x = positionOffset, z = x + 2;
      if (Math.abs((b[x]-a[x])*(c[z]-a[z]) - (b[z]-a[z])*(c[x]-a[x])) < 1e-12) continue;
      emit(a);emit(b);emit(c);
    }
  }
  const geometry = new THREE.BufferGeometry();
  for (const entry of attributes) geometry.setAttribute(entry.name,
    new THREE.Float32BufferAttribute(entry.output, entry.attribute.itemSize));
  geometry.setAttribute('normal', new THREE.Float32BufferAttribute(normals, 3));
  source.dispose();
  const indexed = mergeVertices(geometry, 1e-6);
  geometry.dispose();
  return indexed;
}

export function meadowGeometry(level, width, depth, centerX, centerZ) {
  const rolling = level.terrain?.enabled;
  const geometry = new THREE.PlaneGeometry(width, depth,
    rolling ? Math.ceil(width / SETTINGS.groundSpacing) : 1,
    rolling ? Math.ceil(depth / SETTINGS.groundSpacing) : 1);
  geometry.rotateX(-Math.PI / 2);
  geometry.translate(centerX, GROUND_SURFACE_OFFSET, centerZ);
  if (rolling) {
    const position = geometry.attributes.position, normal = geometry.attributes.normal;
    const height = (x, z) => groundHeight(level, x, z);
    for (let i = 0; i < position.count; i++) {
      const x = position.getX(i), z = position.getZ(i);
      position.setY(i, height(x, z) + GROUND_SURFACE_OFFSET);
      const n = surfaceNormal(height, x, z);
      normal.setXYZ(i, n.x, n.y, n.z);
    }
  }
  return geometry;
}

export function roughPastureEnabled(level) {
  if (level.index < 5 || level.showcase) return false;
  let value = ((level.seed ?? 0) ^ Math.imul(level.index + 1, 0x9e3779b9) ^ 0x70617374) >>> 0;
  value = Math.imul(value ^ (value >>> 16), 0x21f0aaad) >>> 0;
  return value / 4294967296 < SETTINGS.roughChance;
}

/** Support plane follows the actual hoof span, including each cow's size. */
export function alignAnimalToTerrain(pose, animal, level) {
  if (!level.terrain?.enabled) return;
  const scale = Math.abs(pose.scale.x), cow = animal.type === 'cow';
  const side = (cow ? 0.3225 : 0.22) * scale;
  const front = (cow ? 0.4125 : 0.22) * scale;
  const back = (cow ? -0.440625 : -0.24) * scale;
  const heading = pose.rotation.y, sine = Math.sin(heading), cosine = Math.cos(heading);
  const sample = (x, z) => terrainHeight(level, animal.x + cosine * x + sine * z,
    animal.z - sine * x + cosine * z);
  const left = (sample(-side, front) + sample(-side, back)) / 2;
  const right = (sample(side, front) + sample(side, back)) / 2;
  const ahead = (sample(-side, front) + sample(side, front)) / 2;
  const behind = (sample(-side, back) + sample(side, back)) / 2;
  pose.rotation.order = 'YXZ';
  pose.rotation.x += -Math.atan2(ahead - behind, front - back);
  pose.rotation.z += Math.atan2(right - left, side * 2);
  // Keep the hoof plane planted; leg articulation supplies the walking motion.
  pose.position.y = (left + right) / 2;
}

/** Keep small moving guidance decals on the receiving surface without moving
 * their actor root, authored rotation, scale or world-space clearance. */
export function drapeGroundGuide(mesh, level, rootHeight) {
  if (!level.terrain?.enabled) return;
  const position = mesh.geometry.attributes.position;
  const state = mesh.userData.groundGuide ||= {
    authored: position.array.slice(),
    point: new THREE.Vector3(),
  };
  mesh.updateWorldMatrix(true, false);
  for (let i = 0; i < position.count; i++) {
    state.point.fromArray(state.authored, i * 3).applyMatrix4(mesh.matrixWorld);
    const clearance = state.point.y - rootHeight;
    state.point.y = terrainHeight(level, state.point.x, state.point.z) + clearance;
    mesh.worldToLocal(state.point);
    position.setXYZ(i, state.point.x, state.point.y, state.point.z);
  }
  position.needsUpdate = true;
}


/** Small cached flower patches follow the local tangent without rebuilding
 * their sphere geometry or changing the upright trunks of larger scenery. */
export function alignGroundProp(group, height, x, z) {
  group.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), surfaceNormal(height, x, z));
}
