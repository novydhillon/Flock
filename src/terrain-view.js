import * as THREE from 'three';
import { mergeVertices } from 'three/addons/utils/BufferGeometryUtils.js';
import { groundHeight, terrainHeight, terrainNormal, GROUND_SURFACE_OFFSET } from './world.js';
import { TERRAIN } from './terrain.js';
import settings from './config/presentation.json' with { type: 'json' };
import { CONFIG_CONTRACTS } from './config/contracts.js';
import { resolveConfig } from './config/resolve.js';

const SETTINGS = resolveConfig(settings, 'presentation', CONFIG_CONTRACTS.presentation).terrain;

/** Blend painted grass and granular soil using the unperturbed support normal.
 * Sampling before bump lighting keeps the soil mask stable as the camera moves.
 * Both textures share the meadow UV transform and its existing weather tint.
 */
export function installSlopeSoil(material, soilMap, soilBumpMap) {
  const compile = material.onBeforeCompile, key = material.customProgramCacheKey();
  material.onBeforeCompile = function(shader, renderer) {
    compile.call(this, shader, renderer);
    shader.uniforms.meadowSoilMap = {value: soilMap};
    shader.uniforms.meadowSoilBumpMap = {value: soilBumpMap};
    shader.vertexShader = 'varying float meadowNormalY;\n' + shader.vertexShader.replace(
      '#include <begin_vertex>', '#include <begin_vertex>\nmeadowNormalY = normal.y;');
    shader.fragmentShader = `varying float meadowNormalY;
      uniform sampler2D meadowSoilMap;
      uniform sampler2D meadowSoilBumpMap;
      float meadowSoilWeight() {
        return 1.0 - smoothstep(${Math.cos(TERRAIN.soilFullDegrees * Math.PI / 180)}, ${Math.cos(TERRAIN.soilStartDegrees * Math.PI / 180)}, meadowNormalY);
      }
      ` + shader.fragmentShader;
    // 18 to 32 degrees: gentle ground retains grass, steep banks expose soil.
    shader.fragmentShader = shader.fragmentShader.replace('#include <map_fragment>',
      THREE.ShaderChunk.map_fragment.replace('diffuseColor *= sampledDiffuseColor;',
        'sampledDiffuseColor = mix(sampledDiffuseColor, texture2D(meadowSoilMap, vMapUv), meadowSoilWeight());\ndiffuseColor *= sampledDiffuseColor;'));
    shader.fragmentShader = shader.fragmentShader.replace('#include <bumpmap_pars_fragment>',
      THREE.ShaderChunk.bumpmap_pars_fragment.replace(/texture2D\( bumpMap, ([^)]*) \)\.x/g,
        'mix(texture2D(bumpMap, $1).x, texture2D(meadowSoilBumpMap, $1).x, meadowSoilWeight())'));
  };
  material.customProgramCacheKey = () => key + ':slope-soil-v1';
  material.needsUpdate = true;
  return material;
}

/** Height shading uses the same world elevation on grass and roads. The
 * rolling-level uniform is shared across material clones, including weather
 * wrappers, so replacing a level cannot leave a flat meadow shaded as a valley.
 */
export function installTerrainRelief(material, enabled) {
  const compile = material.onBeforeCompile, cacheKey = material.customProgramCacheKey;
  material.onBeforeCompile = function(shader, renderer) {
    compile.call(this, shader, renderer);
    shader.uniforms.terrainReliefEnabled = enabled;
    shader.uniforms.terrainReliefFloor = {value: -TERRAIN.channelDepth - TERRAIN.downstreamDrop};
    shader.uniforms.terrainReliefRange = {value: TERRAIN.valleyLift + TERRAIN.waveAmplitude + 2 * TERRAIN.downstreamDrop};
    shader.uniforms.terrainReliefLow = {value: SETTINGS.reliefLowBrightness};
    shader.uniforms.terrainReliefHigh = {value: SETTINGS.reliefHighBrightness};
    shader.vertexShader = 'varying float vTerrainReliefHeight;\n' + shader.vertexShader.replace(
      '#include <begin_vertex>', '#include <begin_vertex>\nvTerrainReliefHeight = (modelMatrix * vec4(position, 1.0)).y;');
    shader.fragmentShader = `varying float vTerrainReliefHeight;
      uniform float terrainReliefEnabled;
      uniform float terrainReliefFloor;
      uniform float terrainReliefRange;
      uniform float terrainReliefLow;
      uniform float terrainReliefHigh;
      ` + shader.fragmentShader.replace('#include <color_fragment>', `
        #include <color_fragment>
        float reliefHeight = smoothstep(0.0, 1.0,
          (vTerrainReliefHeight - terrainReliefFloor) / terrainReliefRange);
        diffuseColor.rgb *= mix(1.0, mix(terrainReliefLow, terrainReliefHigh, reliefHeight), terrainReliefEnabled);`);
  };
  material.customProgramCacheKey = function() { return cacheKey.call(this) + ':terrain-relief-v1'; };
  material.needsUpdate = true;
  return material;
}

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
  // Match the indexed merge tolerance: a face thinner than one micrometre
  // has no stable topology after quantization. Use altitude, not absolute
  // area, so small but well-shaped legitimate faces remain represented.
  const numericalSliver = (a,b,c) => {
    const x=positionOffset,z=x+2;
    const area=Math.abs((b[x]-a[x])*(c[z]-a[z])-(b[z]-a[z])*(c[x]-a[x]));
    const longest=Math.max(Math.hypot(b[x]-a[x],b[z]-a[z]),
      Math.hypot(c[x]-b[x],c[z]-b[z]),Math.hypot(a[x]-c[x],a[z]-c[z]));
    return area < longest*1e-6;
  };
  let triangles = [];
  const count = index?.count ?? source.attributes.position.count;
  for (let i = 0; i < count; i += 3) {
    const triangle = [read(index ? index.getX(i) : i), read(index ? index.getX(i + 1) : i + 1),
      read(index ? index.getX(i + 2) : i + 2)];
    for (const polygon of slice(slice([triangle], 0), 2)) for (let j = 1; j < polygon.length - 1; j++) {
      const a = polygon[0], b = polygon[j], c = polygon[j + 1], x = positionOffset, z = x + 2;
      if (numericalSliver(a,b,c)) continue;
      triangles.push([a,b,c]);
    }
  }
  // Red/green refinement shares every new edge sample with its neighbour.
  // This keeps narrow roads conforming to compact banks without raising the
  // uniform tessellation cost across the entire route network.
  const pointKeys = new WeakMap();
  const pointKey = p => {
    let key=pointKeys.get(p);
    if(key===undefined){key=p[positionOffset].toFixed(7)+','+p[positionOffset+2].toFixed(7);pointKeys.set(p,key);}
    return key;
  };
  const edgeKey = (a,b) => {
    const first=pointKey(a),last=pointKey(b);
    return first<last ? first+':'+last : last+':'+first;
  };
  const midpoint = (a,b) => a.map((value,i)=>(value+b[i])/2);
  const supportCache = new Map();
  const support = p => {
    const key = pointKey(p);
    if (!supportCache.has(key)) supportCache.set(key, height(p[positionOffset],p[positionOffset+2]));
    return supportCache.get(key);
  };
  // Unchanged triangles retain the same analytic interpolation error. Only
  // newly split faces need to be checked again as neighbour cuts propagate.
  const converged = new WeakSet();
  for(let pass=0;pass<10;pass++) {
    const splits = new Map();
    for(const triangle of triangles) {
      if(converged.has(triangle))continue;
      let split = false;
      for(let e=0;e<3;e++) {
        const a=triangle[e],b=triangle[(e+1)%3],middle=midpoint(a,b);
        if(Math.abs(support(middle)-(support(a)+support(b))/2)>.012) {
          splits.set(edgeKey(a,b),middle);split=true;
        }
      }
      if(split) for(let e=0;e<3;e++) {
        const a=triangle[e],b=triangle[(e+1)%3];splits.set(edgeKey(a,b),midpoint(a,b));
      }
      if(!split) {
        const interiorError = [[1/3,1/3,1/3],[.6,.2,.2],[.2,.6,.2],[.2,.2,.6]].some(weights => {
          // Interior probes are unique to this face. Avoid allocating an
          // attribute row and string cache entry for each temporary probe.
          let x = 0, z = 0, interpolated = 0;
          for (let j = 0; j < 3; j++) {
            x += triangle[j][positionOffset] * weights[j];
            z += triangle[j][positionOffset + 2] * weights[j];
            interpolated += support(triangle[j]) * weights[j];
          }
          return Math.abs(height(x, z) - interpolated) > .012;
        });
        if(interiorError) {
          for(let e=0;e<3;e++) {
            const a=triangle[e],b=triangle[(e+1)%3];splits.set(edgeKey(a,b),midpoint(a,b));
          }
        } else converged.add(triangle);
      }
    }
    if(!splits.size)break;
    const next=[];
    for(const triangle of triangles) {
      const middles=triangle.map((a,e)=>splits.has(edgeKey(a,triangle[(e+1)%3])) ? midpoint(a,triangle[(e+1)%3]) : undefined);
      const count=middles.filter(Boolean).length;
      if(!count)next.push(triangle);
      else if(count===3) {
        const [a,b,c]=triangle,[ab,bc,ca]=middles;
        next.push([a,ab,ca],[ab,b,bc],[ca,bc,c],[ab,bc,ca]);
      } else {
        const start=count===1?middles.findIndex(Boolean):(middles.findIndex(p=>!p)+1)%3;
        const a=triangle[start],b=triangle[(start+1)%3],c=triangle[(start+2)%3];
        const ab=middles[start],bc=middles[(start+1)%3];
        if(count===1)next.push([a,ab,c],[ab,b,c]);
        else next.push([ab,b,bc],[a,ab,c],[ab,bc,c]);
      }
    }
    triangles=next;
  }
  for(const triangle of triangles) {
    if(numericalSliver(...triangle))continue;
    for(const vertex of triangle)emit(vertex);
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

// Refine cells only where smooth support curves too far from a linear face.
// Coarse cells share their fine neighbours' edge cuts; center fans stitch those
// cuts without cracks or the whole-axis growth of the original prototype.
const meadowGrids = new WeakMap();
function meadowGrid(level, width, depth, centerX, centerZ) {
  const key = [width, depth, centerX, centerZ].join(',');
  let cache = meadowGrids.get(level);
  if (!cache) meadowGrids.set(level, cache = new Map());
  if (cache.has(key)) return cache.get(key);
  // Keep dense support through the play area and its immediate verge. The
  // distant decorative apron has no actors and can use a coarser base mesh.
  const axis = (extent, center, low, high) => {
    const start = center - extent / 2, end = center + extent / 2;
    const cuts = [start, Math.max(start, Math.min(end, low - 2)),
      Math.max(start, Math.min(end, high + 2)), end];
    const values = [Math.fround(start)];
    for (let section = 0; section < 3; section++) {
      const a = cuts[section], b = cuts[section + 1];
      const spacing = section === 1 ? SETTINGS.groundSpacing : 2.4;
      const count = Math.ceil((b - a) / spacing);
      for (let i = 1; i <= count; i++) values.push(Math.fround(a + (b - a) * i / count));
    }
    return values;
  };
  const xs = axis(width, centerX, level.bounds.minX, level.bounds.maxX);
  const zs = axis(depth, centerZ, level.bounds.minZ, level.bounds.maxZ);
  const nx = xs.length - 1, nz = zs.length - 1;
  const height = (x, z) => groundHeight(level, x, z) + GROUND_SURFACE_OFFSET;
  const cells = Array.from({length: nx * nz}, () => ({pieces: 1, triangles: []}));
  // Measure actual triangular interpolation, including the diagonal: a
  // bilinear estimate misses mixed-axis curvature on the steepest bank faces.
  const weights = [[1/3,1/3,1/3],[.6,.2,.2],[.2,.6,.2],[.2,.2,.6],
    [.5,.5,0],[.5,0,.5],[0,.5,.5]];
  const error = triangle => {
    const heights = triangle.map(([x,z]) => height(x,z));
    return Math.max(...weights.map(weight => {
      const x = triangle.reduce((sum,p,i) => sum + p[0]*weight[i],0);
      const z = triangle.reduce((sum,p,i) => sum + p[1]*weight[i],0);
      return Math.abs(heights.reduce((sum,y,i) => sum+y*weight[i],0)-height(x,z));
    }));
  };
  for (let j = 0; j < nz; j++) for (let i = 0; i < nx; i++) {
    const x0 = xs[i], x1 = xs[i + 1], z0 = zs[j], z1 = zs[j + 1];
    const bounds = level.bounds;
    if (x1 < bounds.minX - 2 || x0 > bounds.maxX + 2
        || z1 < bounds.minZ - 2 || z0 > bounds.maxZ + 2) continue;
    let pieces = 1;
    while (pieces < 16) {
      let maximum = 0;
      for (let v=0;v<pieces;v++) for(let u=0;u<pieces;u++) {
        const xa=x0+(x1-x0)*u/pieces,xb=x0+(x1-x0)*(u+1)/pieces;
        const za=z0+(z1-z0)*v/pieces,zb=z0+(z1-z0)*(v+1)/pieces;
        maximum=Math.max(maximum,error([[xa,za],[xa,zb],[xb,za]]),
          error([[xa,zb],[xb,zb],[xb,za]]));
      }
      if(maximum < .024)break;
      pieces*=2;
    }
    cells[j*nx+i].pieces=pieces;
  }
  const positions = [], normals = [], uvs = [], colors = [], indices = [], vertices = new Map();
  const vertex = (x, z) => {
    x = Math.fround(x); z = Math.fround(z);
    const key = x + ',' + z;
    if (vertices.has(key)) return vertices.get(key);
    const index = positions.length / 3, y = height(x, z), n = terrainNormal(level, x, z);
    positions.push(x, y, z); normals.push(n.x, n.y, n.z);
    uvs.push((x-centerX+width/2)/width, 1-(z-centerZ+depth/2)/depth);
    const high = Math.max(0,Math.min(1,(y-GROUND_SURFACE_OFFSET+TERRAIN.channelDepth+TERRAIN.downstreamDrop)/(TERRAIN.valleyLift+TERRAIN.waveAmplitude+2*TERRAIN.downstreamDrop)));
    colors.push(.9+high*.14,.94+high*.09,.88+high*.1);
    vertices.set(key, index); return index;
  };
  const piecesAt = (i,j) => i < 0 || j < 0 || i >= nx || j >= nz ? 1 : cells[j*nx+i].pieces;
  for (let j = 0; j < nz; j++) for (let i = 0; i < nx; i++) {
    const cell = cells[j*nx+i], pieces = cell.pieces;
    const triangle = (a,b,c) => {indices.push(a,b,c);cell.triangles.push([a,b,c]);};
    for (let v=0;v<pieces;v++) for(let u=0;u<pieces;u++) {
      const x0=xs[i]+(xs[i+1]-xs[i])*u/pieces,x1=xs[i]+(xs[i+1]-xs[i])*(u+1)/pieces;
      const z0=zs[j]+(zs[j+1]-zs[j])*v/pieces,z1=zs[j]+(zs[j+1]-zs[j])*(v+1)/pieces;
      // Clockwise from above gives upward normals in the x/z ground plane.
      const corners=[[x0,z0],[x0,z1],[x1,z1],[x1,z0]];
      const edgePieces=[u===0?piecesAt(i-1,j):pieces, v===pieces-1?piecesAt(i,j+1):pieces, u===pieces-1?piecesAt(i+1,j):pieces, v===0?piecesAt(i,j-1):pieces]
        .map(n=>Math.max(1,n/pieces));
      if(edgePieces.every(n=>n===1)) {
        const [a,b,c,d]=corners.map(([x,z])=>vertex(x,z));triangle(a,b,d);triangle(b,c,d);
      } else {
        const rim=[];
        for(let e=0;e<4;e++)for(let k=0;k<edgePieces[e];k++) {
          const a=corners[e],b=corners[(e+1)%4],t=k/edgePieces[e];
          rim.push(vertex(a[0]+(b[0]-a[0])*t,a[1]+(b[1]-a[1])*t));
        }
        const center=vertex((x0+x1)/2,(z0+z1)/2);
        for(let k=0;k<rim.length;k++)triangle(center,rim[k],rim[(k+1)%rim.length]);
      }
    }
  }
  const grid={xs,zs,nx,nz,cells,positions:new Float32Array(positions),normals,uvs,colors,indices};
  cache.set(key,grid);return grid;
}

export function meadowGeometry(level, width, depth, centerX, centerZ) {
  if (!level.terrain?.enabled) {
    const geometry=new THREE.PlaneGeometry(width,depth);
    geometry.rotateX(-Math.PI/2);geometry.translate(centerX,GROUND_SURFACE_OFFSET,centerZ);
    geometry.setAttribute('color',new THREE.Float32BufferAttribute(new Float32Array(12).fill(1),3));
    return geometry;
  }
  const grid=meadowGrid(level,width,depth,centerX,centerZ),geometry=new THREE.BufferGeometry();
  geometry.setAttribute('position',new THREE.Float32BufferAttribute(grid.positions,3));
  geometry.setAttribute('normal',new THREE.Float32BufferAttribute(grid.normals,3));
  geometry.setAttribute('uv',new THREE.Float32BufferAttribute(grid.uvs,2));
  geometry.setAttribute('color',new THREE.Float32BufferAttribute(grid.colors,3));
  geometry.setIndex(grid.indices);return geometry;
}

/** Pool clipping reads the same stitched triangles as the receiving mesh. */
export function meadowSurfaceHeight(level,x,z) {
  if(!level.terrain?.enabled)return GROUND_SURFACE_OFFSET;
  const b=level.bounds,width=b.maxX-b.minX+90,depth=b.maxZ-b.minZ+90;
  const g=meadowGrid(level,width,depth,(b.minX+b.maxX)/2,(b.minZ+b.maxZ)/2);
  const interval = (values, value) => {
    let low=0,high=values.length-1;
    while(high-low>1){const middle=(low+high)>>1;if(values[middle]<=value)low=middle;else high=middle;}
    return Math.min(values.length-2,low);
  };
  const ix=interval(g.xs,x),iz=interval(g.zs,z);
  for(const triangle of g.cells[iz*g.nx+ix].triangles) {
    const [a,b,c]=triangle.map(index=>index*3),p=g.positions;
    const denominator=(p[b+2]-p[c+2])*(p[a]-p[c])+(p[c]-p[b])*(p[a+2]-p[c+2]);
    const u=((p[b+2]-p[c+2])*(x-p[c])+(p[c]-p[b])*(z-p[c+2]))/denominator;
    const v=((p[c+2]-p[a+2])*(x-p[c])+(p[a]-p[c])*(z-p[c+2]))/denominator;
    if(u>=-1e-5&&v>=-1e-5&&u+v<=1+1e-5)return u*p[a+1]+v*p[b+1]+(1-u-v)*p[c+1];
  }
  return groundHeight(level,x,z)+GROUND_SURFACE_OFFSET;
}

export { roughPastureEnabled } from './pasture.js';

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

