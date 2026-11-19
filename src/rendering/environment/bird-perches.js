import { Box3, Euler, Matrix4, Ray, Triangle, Vector3 } from 'three';
import { terrainHeight } from '../../world/world.js';
import { wildlifeParts } from './wildlife-models.js';

const CELL_SIZE = 5;
const CONTACT_TOLERANCE = 0.018;
const WING_REACH = 0.51;
const FOLDED_REACH = 0.29;
const BODY_HEIGHTS = [0.035, 0.22, 0.47, 0.29, 0.29];
const TRIANGLES_PER_PATCH = 72;
const SOLID_TEST_DIRECTION = new Vector3(0.314, 0.91, 0.228).normalize();
const FEET = wildlifeParts.bird.filter(({ part }) => part === 'foot');
const FOOT_CONTACT_TOLERANCE = 0.036;
const TORSO = wildlifeParts.bird.find(({ part }) => part === 'body');
const TORSO_RIGHT = TORSO.scale[0];
const TORSO_FORWARD = TORSO.scale[2] + Math.abs(TORSO.at[2]);
const TORSO_SECTION = 0.2;
// Circumscribe the clay ellipsoid by height bands. Narrower boxes at its
// rounded bottom preserve legitimate grip on a sloped branch.
const TORSO_HEIGHT_FRACTIONS = [-1, -0.94, -0.76, -0.45, 0.62, 0.86, 1];
const TORSO_BANDS = TORSO_HEIGHT_FRACTIONS.slice(1).map((high, index) => {
  const low = TORSO_HEIGHT_FRACTIONS[index];
  const widest = low > 0 ? low : high < 0 ? high : 0;
  return {
    low: TORSO.at[1] + low * TORSO.scale[1],
    high: TORSO.at[1] + high * TORSO.scale[1],
    reach: Math.sqrt(1 - widest * widest),
  };
});

function cellKey(x, z) {
  return `${x},${z}`;
}

function walkCells(minX, maxX, minZ, maxZ, visit) {
  for (let x = Math.floor(minX / CELL_SIZE); x <= Math.floor(maxX / CELL_SIZE); x++)
    for (let z = Math.floor(minZ / CELL_SIZE); z <= Math.floor(maxZ / CELL_SIZE); z++)
      if (visit(cellKey(x, z))) return true;
  return false;
}

function meshSurfaces(object, include = () => true, solid = true) {
  if (!object) return [];
  object.updateWorldMatrix(true, true);
  const surfaces = [];
  const matrix = new Matrix4();
  const vertex = new Vector3();
  const center = new Vector3();
  object.traverse((mesh) => {
    const positions = mesh.geometry?.getAttribute('position');
    if (!mesh.isMesh || !positions || !include(mesh)) return;
    const treeCenters = mesh.geometry.getAttribute('treeCenter');
    const indices = mesh.geometry.index?.array;
    const count = mesh.isInstancedMesh ? mesh.count : 1;
    for (let instance = 0; instance < count; instance++) {
      if (mesh.isInstancedMesh) {
        mesh.getMatrixAt(instance, matrix);
        matrix.premultiply(mesh.matrixWorld);
      } else matrix.copy(mesh.matrixWorld);
      const bounds = new Box3();
      const vertices = new Float32Array(positions.count * 3);
      for (let i = 0; i < positions.count; i++) {
        vertex.fromBufferAttribute(positions, i);
        if (treeCenters && mesh.userData.treeWidth !== undefined) {
          center.fromBufferAttribute(treeCenters, i);
          vertex.lerp(center, 1 - mesh.userData.treeWidth);
        }
        vertex.applyMatrix4(matrix).toArray(vertices, i * 3);
        bounds.expandByPoint(vertex);
      }
      const vertexSlots = indices?.length ?? vertices.length / 3;
      const patches = [];
      const stride = TRIANGLES_PER_PATCH * 3;
      if (vertexSlots > stride * 2)
        for (let first = 0; first < vertexSlots; first += stride) {
          const last = Math.min(vertexSlots, first + stride);
          const bounds = new Box3();
          for (let i = first; i < last; i++) bounds.expandByPoint(vertex.fromArray(vertices, 3 * (indices?.[i] ?? i)));
          patches.push({ bounds, first, last });
        }
      surfaces.push({
        bounds,
        vertices,
        indices,
        solid,
        patches: patches.length ? patches : [{ bounds, first: 0, last: vertexSlots }],
        mesh,
        matrix: matrix.clone(),
        center: new Vector3().setFromMatrixPosition(matrix),
      });
    }
  });
  return surfaces;
}

function createQuery() {
  return {
    ray: new Ray(),
    hit: new Vector3(),
    a: new Vector3(),
    b: new Vector3(),
    c: new Vector3(),
    destination: new Vector3(),
    seen: new Set(),
    body: BODY_HEIGHTS.map(() => ({ ray: new Ray(), length: 0 })),
    solidRay: new Ray(new Vector3(), SOLID_TEST_DIRECTION),
    solidHits: [],
    eye: new Vector3(),
    view: new Vector3(),
    foot: new Vector3(),
    footPose: new Euler(0, 0, 0, 'YXZ'),
    torso: {
      bounds: new Box3(),
      boxes: [],
      count: 0,
      triangle: new Triangle(),
    },
  };
}

function rayReaches(ray, hit, bounds, limit) {
  return (
    bounds.containsPoint(ray.origin) ||
    (ray.intersectBox(bounds, hit) && ray.origin.distanceToSquared(hit) <= limit * limit)
  );
}

function contact(surface, query, limit, closest = false, ray = query.ray) {
  const { hit, a, b, c } = query;
  const { bounds, vertices, indices, patches } = surface;
  if (!rayReaches(ray, hit, bounds, limit)) return null;
  let result = null;
  for (const patch of patches) {
    if (patch.bounds !== bounds && !rayReaches(ray, hit, patch.bounds, limit)) continue;
    for (let i = patch.first; i < patch.last; i += 3) {
      a.fromArray(vertices, 3 * (indices?.[i] ?? i));
      b.fromArray(vertices, 3 * (indices?.[i + 1] ?? i + 1));
      c.fromArray(vertices, 3 * (indices?.[i + 2] ?? i + 2));
      if (!ray.intersectTriangle(a, b, c, false, hit)) continue;
      const distance = ray.origin.distanceTo(hit);
      if (distance > limit) continue;
      if (!closest) return true;
      const normal = c.sub(a).cross(b.sub(a)).normalize().negate();
      if (normal.y <= 0.5) continue;
      result = { x: hit.x, y: hit.y, z: hit.z, normal: { x: normal.x, y: normal.y, z: normal.z } };
      limit = distance;
    }
  }
  return result;
}

function topContact(surface, query, x, z, upper, lower) {
  query.ray.origin.set(x, upper, z);
  query.ray.direction.set(0, -1, 0);
  const point = contact(surface, query, upper - lower, true);
  return point && { ...point, surface };
}

function supportsBothFeet(anchor, surface, heading, query) {
  const { normal } = anchor;
  const sine = Math.sin(heading);
  const cosine = Math.cos(heading);
  const rightGrade = -(normal.x * cosine - normal.z * sine) / normal.y;
  const forwardGrade = -(normal.x * sine + normal.z * cosine) / normal.y;
  const { foot, footPose } = query;
  footPose.set(-Math.atan(forwardGrade), heading, Math.atan(rightGrade));
  for (const { at, scale } of FEET) {
    const forward = at[2] - anchor.footInset;
    // Check beneath both feet and their forward gripping pads after applying
    // the settled render pose. Toe tips can drape over a rail.
    for (const z of [forward, forward + scale[2] / 3]) {
      foot.set(at[0], at[1] - scale[1], z).applyEuler(footPose);
      const expectedY = anchor.y + foot.y;
      if (
        !topContact(
          surface,
          query,
          anchor.x + foot.x,
          anchor.z + foot.z,
          expectedY + FOOT_CONTACT_TOLERANCE,
          expectedY - FOOT_CONTACT_TOLERANCE,
        )
      )
        return false;
    }
  }
  return true;
}

function containsSolidBody(surface, query, point) {
  if (!surface.solid) return false;
  const { bounds, vertices, indices, patches } = surface;
  const { solidRay, solidHits, a, b, c, hit } = query;
  solidRay.origin.set(point.x, point.y + BODY_HEIGHTS[1], point.z);
  if (!bounds.containsPoint(solidRay.origin)) return false;
  solidHits.length = 0;
  for (const patch of patches) {
    if (patch.bounds !== bounds && !rayReaches(solidRay, hit, patch.bounds, Infinity)) continue;
    for (let i = patch.first; i < patch.last; i += 3) {
      a.fromArray(vertices, 3 * (indices?.[i] ?? i));
      b.fromArray(vertices, 3 * (indices?.[i + 1] ?? i + 1));
      c.fromArray(vertices, 3 * (indices?.[i + 2] ?? i + 2));
      if (!solidRay.intersectTriangle(a, b, c, false, hit)) continue;
      const distance = solidRay.origin.distanceTo(hit);
      const orientation = Math.sign(b.sub(a).cross(c.sub(a)).dot(solidRay.direction));
      if (
        orientation &&
        !solidHits.some((result) => result.orientation === orientation && Math.abs(result.distance - distance) < 1e-6)
      )
        solidHits.push({ distance, orientation });
    }
  }
  // Count exits minus entries rather than odd/even hits. A mesh can contain
  // overlapping closed clay lobes, where being inside two lobes is still solid.
  return solidHits.reduce((total, hit) => total + hit.orientation, 0) > 0;
}

function unpackGate(level, group) {
  return (level.gates || [])
    .filter((gate) => gate.operable)
    .map((gate) => {
      const base = group?.children.find(
        (child) =>
          Math.hypot(child.position.x - gate.x, child.position.z - gate.z) < 0.002 &&
          child.getObjectByName('gate-panel'),
      );
      const panel = base?.getObjectByName('gate-panel');
      if (!panel) return null;
      return { gate, panel, open: gate.open, surfaces: meshSurfaces(panel) };
    })
    .filter(Boolean);
}

/**
 * Capture CPU geometry before scenery batching repacks and compacts instances.
 * Surface positions include the tree wood shader's width deformation, actual
 * renderer transforms, and the yard's terrain-conformed wood/stone/roof shapes.
 */
export function createBirdPerches(level, { trees = [], fences = [], stoneWalls, roof, gateView, blockers = [] } = {}) {
  const cells = new Map();
  const anchors = [];
  const query = createQuery();
  const gates = unpackGate(level, gateView);
  const perches = { level, cells, query, gates, anchors };
  const index = (surfaces) => {
    for (const surface of surfaces) {
      const { min, max } = surface.bounds;
      walkCells(min.x, max.x, min.z, max.z, (key) => {
        let cell = cells.get(key);
        if (!cell) cells.set(key, (cell = []));
        cell.push(surface);
      });
    }
    return surfaces;
  };
  const treeSurfaces = trees.map((tree) => ({ tree, surfaces: index(meshSurfaces(tree)) }));
  const railSurfaces = fences.flatMap((fence) =>
    index(meshSurfaces(fence)).filter(({ mesh }) => mesh.userData.birdRail),
  );
  const stones = index(meshSurfaces(stoneWalls));
  const roofs = index(meshSurfaces(roof, () => true, false));
  index(meshSurfaces(gateView, (mesh) => mesh.parent?.name !== 'gate-panel'));
  for (const blocker of blockers) index(meshSurfaces(blocker));

  function addAnchor(point, kind, angles, id, gate = undefined, heading = undefined) {
    if (!point) return false;
    // Lateral approach to a branch stays underneath/outside the crown. Top
    // surfaces instead get a shallow glide from above, away from their edges.
    const { x, y, z, normal, surface } = point;
    const reach = kind === 'tree' ? 1.6 : 1.7;
    const rise = kind === 'tree' ? 0.46 : 0.95;
    const footInset = kind === 'fence' || kind === 'tree' ? 0.05 : 0;
    const anchor = { x, y, z, normal, id, kind, gate, footInset };
    for (const angle of angles) {
      const approach = { x: x + Math.sin(angle) * reach, y: y + rise, z: z + Math.cos(angle) * reach };
      const { bounds } = level;
      if (
        !bounds ||
        approach.x < bounds.minX + 0.3 ||
        approach.x > bounds.maxX - 0.3 ||
        approach.z < bounds.minZ + 0.3 ||
        approach.z > bounds.maxZ - 0.3
      )
        continue;
      const facing = heading ?? angle + Math.PI;
      if (!supportsBothFeet(anchor, surface, facing, query)) continue;
      anchor.heading = facing;
      if (!birdAirPathClear(level, perches, approach, anchor, anchor)) continue;
      anchor.approach = approach;
      anchors.push(anchor);
      return true;
    }
    return false;
  }

  for (const [treeIndex, { tree, surfaces }] of treeSurfaces.entries()) {
    const wood = surfaces.find(({ mesh }) => mesh.name === 'tree-wood');
    if (!wood) continue;
    const scale = wood.matrix.getMaxScaleOnAxis();
    const forks = tree.userData.forks || [];
    // A single accessible branch is enough to make each tree a landing
    // option. Favor the low lateral forks where birds read below the canopy.
    for (const forkIndex of [1, 0, 2, 3]) {
      const fork = forks[forkIndex];
      if (!fork) continue;
      const [start, next] = fork.branchRings;
      const branchStart = new Vector3(...start.center).applyMatrix4(wood.matrix);
      const branchNext = new Vector3(...next.center).applyMatrix4(wood.matrix);
      const radial = Math.atan2(branchNext.x - branchStart.x, branchNext.z - branchStart.z);
      let added = false;
      for (const fraction of [0.45, 0.8, 0.15]) {
        const p = branchStart.clone().lerp(branchNext, fraction);
        const surface = topContact(wood, query, p.x, p.z, p.y + 0.23 * scale, p.y - 0.12 * scale);
        if (
          addAnchor(
            surface,
            'tree',
            [radial + 1.15, radial - 1.15, radial + 1.65, radial - 1.65, radial],
            `tree:${treeIndex}:${forkIndex}`,
            undefined,
            radial + Math.PI / 2,
          )
        ) {
          added = true;
          break;
        }
      }
      if (added) break;
    }
  }
  const railStride = Math.max(2, Math.ceil(railSurfaces.length / 180));
  for (let i = 0; i < railSurfaces.length; i += railStride) {
    const rail = railSurfaces[i];
    const { x, z } = rail.center;
    const direction = Math.atan2(rail.matrix.elements[0], rail.matrix.elements[2]);
    addAnchor(
      topContact(rail, query, x, z, rail.bounds.max.y + 0.03, rail.center.y),
      'fence',
      [direction - Math.PI / 2, direction + Math.PI / 2],
      `fence:${i}`,
      undefined,
      direction + Math.PI / 2,
    );
  }
  // A rendered stone segment contains several uneven layers. Probe the actual
  // tallest solid surface at each selected stone center; this excludes gaps.
  const stoneStride = Math.max(3, Math.ceil(stones.length / 280));
  for (let i = 0; i < stones.length; i += stoneStride) {
    const stone = stones[i];
    const { x, y, z } = stone.center;
    if (y < terrainHeight(level, x, z) + 0.99) continue;
    const above = stone.bounds.max.y + 0.7;
    const local = cells.get(cellKey(Math.floor(x / CELL_SIZE), Math.floor(z / CELL_SIZE))) || [];
    let top = null;
    for (const other of local) {
      if (other.mesh.name !== 'clay-drystone') continue;
      const hit = topContact(other, query, x, z, above, top?.y ?? y);
      if (hit) top = hit;
    }
    if (anchors.some((anchor) => anchor.kind === 'stone' && Math.hypot(anchor.x - x, anchor.z - z) < 1.2)) continue;
    addAnchor(top, 'stone', [0, Math.PI / 2, Math.PI, -Math.PI / 2], `stone:${i}`);
  }
  for (const [i, surface] of roofs.entries()) {
    const geometry = surface.mesh.geometry;
    geometry.computeBoundingBox();
    const bounds = geometry.boundingBox;
    for (const side of [-1, 1])
      for (const fraction of [-0.55, 0.55]) {
        const point = new Vector3(side * (bounds.max.x - 0.2), 0, bounds.max.z * fraction);
        const outward = new Vector3(side, 0, 0).transformDirection(surface.matrix);
        point.applyMatrix4(surface.matrix);
        addAnchor(
          topContact(surface, query, point.x, point.z, surface.bounds.max.y + 0.1, surface.bounds.min.y - 0.1),
          'barn',
          [Math.atan2(outward.x, outward.z)],
          `barn:${i}:${side}:${fraction}`,
        );
      }
  }
  for (const [i, state] of gates.entries()) {
    if (state.open) continue;
    const { gate } = state;
    for (const side of [-1, 1]) {
      const offset = (side * gate.width) / 4;
      const x = gate.x + Math.cos(gate.heading) * offset;
      const z = gate.z - Math.sin(gate.heading) * offset;
      let top = null;
      for (const surface of state.surfaces) {
        const hit = topContact(surface, query, x, z, surface.bounds.max.y + 0.1, top?.y ?? surface.bounds.min.y);
        if (hit) top = hit;
      }
      addAnchor(top, 'gate', [gate.heading, gate.heading + Math.PI], `gate:${i}:${side}`, gate);
    }
  }
  return perches;
}

export function birdPerchAvailable(level, anchor) {
  return !anchor.gate || (!anchor.gate.open && level.gates?.includes(anchor.gate));
}

function surfacesAlong(perches, start, end, margin, intersects) {
  const {
    cells,
    gates,
    query: { seen },
  } = perches;
  for (const state of gates) {
    if (state.open !== state.gate.open) {
      state.open = state.gate.open;
      state.surfaces = meshSurfaces(state.panel);
    }
    if (state.surfaces.some(intersects)) return true;
  }
  seen.clear();
  return walkCells(
    Math.min(start.x, end.x) - margin,
    Math.max(start.x, end.x) + margin,
    Math.min(start.z, end.z) - margin,
    Math.max(start.z, end.z) + margin,
    (key) => {
      for (const surface of cells.get(key) || []) {
        if (seen.has(surface)) continue;
        seen.add(surface);
        if (intersects(surface)) return true;
      }
      return false;
    },
  );
}

function prepareTorsoSweep(torso, start, end, sideX, sideZ, anchor) {
  const dx = end.x - start.x;
  const dy = end.y - start.y;
  const dz = end.z - start.z;
  const movingPlanar = Math.hypot(dx, dz) > 1e-7;
  let halfX = movingPlanar ? Math.hypot(sideX * TORSO_RIGHT, sideZ * TORSO_FORWARD) : TORSO_FORWARD;
  let halfZ = movingPlanar ? Math.hypot(sideZ * TORSO_RIGHT, sideX * TORSO_FORWARD) : TORSO_FORWARD;
  if (anchor) {
    // Approaching birds can turn to face across a narrow support before landing.
    const heading = anchor.heading ?? Math.atan2(dx, dz);
    const sine = Math.sin(heading);
    const cosine = Math.cos(heading);
    halfX = Math.max(halfX, Math.hypot(cosine * TORSO_RIGHT, sine * TORSO_FORWARD));
    halfZ = Math.max(halfZ, Math.hypot(sine * TORSO_RIGHT, cosine * TORSO_FORWARD));
  }
  const sections = Math.max(1, Math.ceil(Math.hypot(dx, dy, dz) / (anchor ? TORSO_SECTION * 0.5 : TORSO_SECTION)));
  torso.count = 0;
  torso.bounds.makeEmpty();
  for (let i = 0; i < sections; i++) {
    const a = i / sections;
    const b = (i + 1) / sections;
    for (const band of TORSO_BANDS) {
      const box = (torso.boxes[torso.count++] ??= new Box3());
      box.min.set(
        start.x + Math.min(dx * a, dx * b) - halfX * band.reach,
        start.y + Math.min(dy * a, dy * b) + band.low,
        start.z + Math.min(dz * a, dz * b) - halfZ * band.reach,
      );
      box.max.set(
        start.x + Math.max(dx * a, dx * b) + halfX * band.reach,
        start.y + Math.max(dy * a, dy * b) + band.high,
        start.z + Math.max(dz * a, dz * b) + halfZ * band.reach,
      );
      torso.bounds.union(box);
    }
  }
}

function torsoHits(surface, torso) {
  if (!torso.bounds.intersectsBox(surface.bounds)) return false;
  const { patches, vertices, indices } = surface;
  const { triangle, boxes, count } = torso;
  for (const patch of patches) {
    if (!torso.bounds.intersectsBox(patch.bounds)) continue;
    for (let section = 0; section < count; section++) {
      const box = boxes[section];
      if (!box.intersectsBox(patch.bounds)) continue;
      for (let i = patch.first; i < patch.last; i += 3) {
        triangle.a.fromArray(vertices, 3 * (indices?.[i] ?? i));
        triangle.b.fromArray(vertices, 3 * (indices?.[i + 1] ?? i + 1));
        triangle.c.fromArray(vertices, 3 * (indices?.[i + 2] ?? i + 2));
        if (box.intersectsTriangle(triangle)) return true;
      }
    }
  }
  return false;
}

function intersectsGeometry(perches, start, end, sideX, sideZ, anchor) {
  const { query } = perches;
  const { body, destination, torso } = query;
  prepareTorsoSweep(torso, start, end, sideX, sideZ, anchor);
  const reachAt = (point) =>
    anchor
      ? FOLDED_REACH +
        (WING_REACH - FOLDED_REACH) *
          Math.min(1, Math.hypot(point.x - anchor.x, point.y - anchor.y, point.z - anchor.z))
      : WING_REACH;
  const startReach = reachAt(start);
  const endReach = reachAt(end);
  for (let i = 0; i < body.length; i++) {
    const side = i === 3 ? -1 : i === 4 ? 1 : 0;
    const height = BODY_HEIGHTS[i];
    const ray = body[i].ray;
    ray.origin.set(start.x + side * sideX * startReach, start.y + height, start.z + side * sideZ * startReach);
    destination.set(end.x + side * sideX * endReach, end.y + height, end.z + side * sideZ * endReach).sub(ray.origin);
    body[i].length = destination.length();
    ray.direction.copy(destination).normalize();
  }
  return surfacesAlong(
    perches,
    start,
    end,
    WING_REACH,
    (surface) =>
      body.some(({ ray, length }) => length && contact(surface, query, length, false, ray)) ||
      torsoHits(surface, torso) ||
      containsSolidBody(surface, query, start) ||
      containsSolidBody(surface, query, end),
  );
}

/** Check actual scenery between the eye and the perched bird's visible body. */
export function birdPerchVisible(perches, camera, point) {
  if (!perches) return true;
  const { query, level } = perches;
  const target = { x: point.x, y: point.y + 0.38, z: point.z };
  const cameraPosition = camera.isCamera ? camera.getWorldPosition(query.eye) : camera;
  if (camera.isOrthographicCamera) {
    // Every screen pixel has the same viewing direction in this camera, with
    // a different origin on the view plane.
    const forward = camera.getWorldDirection(query.view);
    const depth =
      (target.x - cameraPosition.x) * forward.x +
      (target.y - cameraPosition.y) * forward.y +
      (target.z - cameraPosition.z) * forward.z;
    cameraPosition.set(target.x, target.y, target.z).addScaledVector(forward, -depth);
  }
  const dx = target.x - cameraPosition.x;
  const dy = target.y - cameraPosition.y;
  const dz = target.z - cameraPosition.z;
  const distance = Math.hypot(dx, dy, dz);
  if (!Number.isFinite(distance)) return false;
  if (distance < 0.015) return true;
  const samples = Math.ceil(Math.hypot(dx, dz) / 0.3);
  for (let i = 1; i < samples; i++) {
    const t = i / samples;
    if (cameraPosition.y + dy * t < terrainHeight(level, cameraPosition.x + dx * t, cameraPosition.z + dz * t))
      return false;
  }
  query.ray.origin.copy(cameraPosition);
  query.ray.direction.set(dx / distance, dy / distance, dz / distance);
  return !surfacesAlong(perches, cameraPosition, target, 0, (surface) => contact(surface, query, distance - 0.015));
}

/** Bounded support checks on analytical terrain and segment/triangle crossing
 * tests against actual placements. Feet and torso use independent rays so
 * the bird can touch a landing surface while keeping its body clear. */
export function birdAirPathClear(level, perches, start, end, anchor = null) {
  const dx = end.x - start.x;
  const dy = end.y - start.y;
  const dz = end.z - start.z;
  if (![dx, dy, dz, start.x, start.y, start.z].every(Number.isFinite)) return false;
  const planar = Math.hypot(dx, dz);
  const samples = Math.max(1, Math.ceil(planar / 0.18));
  for (let i = 0; i <= samples; i++) {
    const t = i / samples;
    const x = start.x + dx * t;
    const z = start.z + dz * t;
    if (start.y + dy * t + CONTACT_TOLERANCE < terrainHeight(level, x, z)) return false;
  }
  if (!perches) return true;
  const sideX = planar ? dz / planar : 1;
  const sideZ = planar ? -dx / planar : 0;
  return !intersectsGeometry(perches, start, end, sideX, sideZ, anchor);
}
