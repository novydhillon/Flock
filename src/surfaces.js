import * as THREE from 'three';
import { terrainHeight, groundHeight, bridgeSurfaceHeight } from './world.js';

const EPS=1e-9;
const cross=(a,b)=>a.x*b.z-a.z*b.x;
const sub=(a,b)=>({x:a.x-b.x,z:a.z-b.z});

// Sweep the union of convex stroke pieces. All edge crossings become slab
// boundaries, so ordering cannot change inside a slab. Merged intervals yield
// disjoint trapezoids, including at reversals and self-crossings (no stacked
// coplanar triangles). UVs use world coordinates, without seams at joins.
export function unionSurface(polygons,y=0){
  const edges=[],cuts=[],polygonEdges=[];
  for(const polygon of polygons){
    const boundary=[];boundary.minX=Math.min(...polygon.map(p=>p.x));boundary.maxX=Math.max(...polygon.map(p=>p.x));polygonEdges.push(boundary);
    for(let i=0;i<polygon.length;i++){
      const a=polygon[i],b=polygon[(i+1)%polygon.length];cuts.push(a.x);
      if(Math.abs(a.x-b.x)>EPS){const edge={a,b,min:Math.min(a.x,b.x),max:Math.max(a.x,b.x),id:edges.length};edges.push(edge);boundary.push(edge);}
    }
  }
  const ordered=[...edges].sort((a,b)=>a.min-b.min);
  for(let i=0;i<ordered.length;i++)for(let j=i+1;j<ordered.length&&ordered[j].min<ordered[i].max;j++){
    const a=ordered[i],b=ordered[j];if(b.max<=a.min)continue;
    const u=sub(a.b,a.a),v=sub(b.b,b.a),den=cross(u,v);if(Math.abs(den)<EPS)continue;
    const delta=sub(b.a,a.a),t=cross(delta,v)/den,s=cross(delta,u)/den;
    if(t>EPS&&t<1-EPS&&s>EPS&&s<1-EPS)cuts.push(a.a.x+t*u.x);
  }
  cuts.sort((a,b)=>a-b);const xs=cuts.filter((x,i)=>!i||x-cuts[i-1]>EPS),positions=[],uvs=[];
  const at=(edge,x)=>edge.a.z+(x-edge.a.x)*(edge.b.z-edge.a.z)/(edge.b.x-edge.a.x);
  const triangle=(a,b,c)=>{
    // Validate the coordinates the GPU will actually receive. Distinct sweep
    // cuts can round to the same Float32 x, collapsing an otherwise valid slab.
    [a,b,c]=[a,b,c].map(p=>({x:Math.fround(p.x),z:Math.fround(p.z)}));
    const area=cross(sub(b,a),sub(c,a));
    if(Math.abs(area)<EPS)return;
    // Upward winding in x/y/z coordinates.
    if(area>0)[b,c]=[c,b];
    for(const p of [a,b,c]){positions.push(p.x,y,p.z);uvs.push(p.x/4,p.z/4);}
  };
  let open=new Map();const trapezoids=[];
  for(let i=1;i<xs.length;i++){
    const left=xs[i-1],right=xs[i],mid=(left+right)/2,intervals=[];
    for(const boundary of polygonEdges){
      if(mid<=boundary.minX||mid>=boundary.maxX)continue;
      let low=null,high=null,lowZ=Infinity,highZ=-Infinity,hits=0;
      for(const edge of boundary)if(mid>edge.min&&mid<edge.max){const z=at(edge,mid);hits++;if(z<lowZ){low=edge;lowZ=z;}if(z>highZ){high=edge;highZ=z;}}
      if(hits>=2)intervals.push({low,high});
    }
    intervals.sort((a,b)=>at(a.low,mid)-at(b.low,mid));const merged=[];
    for(const interval of intervals){const last=merged[merged.length-1];if(last&&at(interval.low,mid)<=at(last.high,mid)+EPS){if(at(interval.high,mid)>at(last.high,mid))last.high=interval.high;}else merged.push({...interval});}
    const next=new Map();
    for(const {low,high} of merged){const key=`${low.id}:${high.id}`,previous=open.get(key);if(previous){previous.right=right;next.set(key,previous);open.delete(key);}else next.set(key,{low,high,left,right});}
    trapezoids.push(...open.values());open=next;
  }
  trapezoids.push(...open.values());
  for(const {low,high,left,right} of trapezoids){const a={x:left,z:at(low,left)},b={x:right,z:at(low,right)},c={x:right,z:at(high,right)},d={x:left,z:at(high,left)};triangle(a,b,c);triangle(a,c,d);}
  const geometry=new THREE.BufferGeometry();geometry.setAttribute('position',new THREE.Float32BufferAttribute(positions,3));geometry.setAttribute('uv',new THREE.Float32BufferAttribute(uvs,2));geometry.computeVertexNormals();return geometry;
}

export function ribbon(points,width,{ragged=false,y=.008,seed=1,roundCaps=false}={}){
  let state=seed,distance=0;const offsets=points.map((p,i)=>{if(i)distance+=Math.hypot(p.x-points[i-1].x,p.z-points[i-1].z);state=(state*1664525+1013904223)>>>0;return ragged?Math.sin(distance*.72)*.11+(state/4294967296-.5)*.17:0;});
  const polygons=[],ends=[];
  for(let i=1;i<points.length;i++){
    const a=points[i-1],b=points[i],length=Math.hypot(b.x-a.x,b.z-a.z);if(length<EPS)continue;
    const nx=-(b.z-a.z)/length,nz=(b.x-a.x)/length;
    const edge=(p,offset,side)=>({x:p.x+nx*(width/2*side+offset),z:p.z+nz*(width/2*side+offset)});
    const start=[edge(a,offsets[i-1],-1),edge(a,offsets[i-1],1)],end=[edge(b,offsets[i],-1),edge(b,offsets[i],1)];
    polygons.push([start[0],end[0],end[1],start[1]]);
    if(ends[i-1]){
      // Two center fans form bevel joins without unbounded miters.
      polygons.push([a,ends[i-1][0],start[0]],[a,ends[i-1][1],start[1]]);
    }
    ends[i]=end;
  }
  if(roundCaps&&polygons.length)for(const p of [points[0],points[points.length-1]])polygons.push(Array.from({length:20},(_,i)=>({x:p.x+Math.cos(i*Math.PI/10)*width/2,z:p.z+Math.sin(i*Math.PI/10)*width/2})));
  return unionSurface(polygons,y);
}

const smooth=(a,b,x)=>{const t=Math.max(0,Math.min(1,(x-a)/(b-a)));return t*t*(3-2*t);};

// Rendering keeps the physical centreline within 2.5 cm, but need not sweep
// hundreds of nearly collinear samples through the road union. Retain bounded
// spans so the original ragged offsets still have frequent shape samples.
function roadSamples(points){
  const keep=new Set([0,points.length-1]);
  const visit=(first,last)=>{
    if(last-first<2)return;
    const a=points[first],b=points[last],dx=b.x-a.x,dz=b.z-a.z,length2=dx*dx+dz*dz;
    let maximum=0,index=first+1;
    for(let i=first+1;i<last;i++){
      const p=points[i],t=Math.max(0,Math.min(1,((p.x-a.x)*dx+(p.z-a.z)*dz)/(length2||1))),d=(p.x-a.x-t*dx)**2+(p.z-a.z-t*dz)**2;
      if(d>maximum){maximum=d;index=i;}
    }
    if(maximum>.025**2||length2>2.5**2){if(maximum<=.025**2)index=Math.floor((first+last)/2);keep.add(index);visit(first,index);visit(index,last);}
  };
  if(points.length>1)visit(0,points.length-1);
  return [...keep].filter(i=>i>=0&&i<points.length).sort((a,b)=>a-b);
}
function roadStroke(points,width,{ragged=false,seed=1}={}){
  let state=seed,distance=0;const offsets=points.map((p,i)=>{if(i)distance+=Math.hypot(p.x-points[i-1].x,p.z-points[i-1].z);state=(state*1664525+1013904223)>>>0;return ragged?Math.sin(distance*.72)*.11+(state/4294967296-.5)*.17:0;});
  const sampled=roadSamples(points),polygons=[],radius=width/2;let previous=null;
  const disk=(p,offset,nx,nz)=>Array.from({length:24},(_,i)=>({x:p.x+nx*offset+Math.cos(i*Math.PI/12)*radius,z:p.z+nz*offset+Math.sin(i*Math.PI/12)*radius}));
  for(let j=1;j<sampled.length;j++){
    const ai=sampled[j-1],bi=sampled[j],a=points[ai],b=points[bi],length=Math.hypot(b.x-a.x,b.z-a.z);if(length<EPS)continue;
    const dx=(b.x-a.x)/length,dz=(b.z-a.z)/length,nx=-dz,nz=dx;
    const edge=(p,offset,side)=>({x:p.x+nx*(radius*side+offset),z:p.z+nz*(radius*side+offset)});
    const start=[edge(a,offsets[ai],-1),edge(a,offsets[ai],1)],end=[edge(b,offsets[bi],-1),edge(b,offsets[bi],1)];
    polygons.push([start[0],end[0],end[1],start[1]]);
    if(previous){
      polygons.push([a,previous.end[0],start[0]],[a,previous.end[1],start[1]]);
      const turn=Math.atan2(previous.dx*dz-previous.dz*dx,previous.dx*dx+previous.dz*dz);
      if(Math.abs(turn)>2.8)polygons.push(disk(a,0,0,0));
      else if(Math.abs(turn)>.16){
        const side=turn>0?-1:1,from=previous.end[side>0?1:0],to=start[side>0?1:0],angle=Math.atan2(from.z-a.z,from.x-a.x),sweep=turn,steps=Math.ceil(Math.abs(sweep)/(Math.PI/12));
        const r0=Math.hypot(from.x-a.x,from.z-a.z),r1=Math.hypot(to.x-a.x,to.z-a.z);
        const arc=[a];for(let k=0;k<=steps;k++){const f=k/steps,r=r0+(r1-r0)*f;arc.push({x:a.x+Math.cos(angle+sweep*f)*r,z:a.z+Math.sin(angle+sweep*f)*r});}
        // Individual centre fans remain convex even with ragged radii.
        for(let k=1;k<arc.length-1;k++)polygons.push([a,arc[k],arc[k+1]]);
      }
    }else polygons.push(disk(a,offsets[ai],nx,nz));
    previous={dx,dz,end,b,offset:offsets[bi],nx,nz};
  }
  if(previous)polygons.push(disk(previous.b,previous.offset,previous.nx,previous.nz));
  return polygons;
}

// One disjoint surface for the full network: shared starts, endings and
// crossings cannot leave separate square nubs or stacked terminal layers.
export function roadNetwork(roads,{widthExtra=0,ragged=false,y=.008,seed=1,fadeLength=2.4}={}){
  const polygons=[],segments=[],terminals=[],endings=[];
  for(const [roadIndex,road] of roads.entries()){
    const {points}=road,width=road.width+widthExtra,radius=width/2;let total=0;const first=segments.length;
    polygons.push(...roadStroke(points,width,{ragged,seed}));
    for(let i=1;i<points.length;i++){const a=points[i-1],b=points[i],length=Math.hypot(b.x-a.x,b.z-a.z);if(length>EPS){segments.push({a,b,length,start:total,radius,dx:(b.x-a.x)/length,dz:(b.z-a.z)/length});total+=length;}}
    if(first===segments.length)continue;
    const fade=Math.max(.01,Math.min(fadeLength,total*.3));
    for(let i=first;i<segments.length;i++)Object.assign(segments[i],{total,fade,first:i===first,last:i===segments.length-1});
    for(const point of [segments[first].a,segments.at(-1).b]){
      const reach=radius+fade+.25;if(!terminals.some(t=>t.x===point.x&&t.z===point.z&&t.reach===reach))terminals.push({...point,reach});
      let ending=endings.find(t=>Math.hypot(t.x-point.x,t.z-point.z)<.025);
      if(!ending){ending={...point,radius,roads:new Set()};endings.push(ending);}ending.radius=Math.max(ending.radius,radius);ending.roads.add(roadIndex);
    }
  }
  const source=unionSurface(polygons,y),input=source.getAttribute('position');
  if(!segments.length){source.setAttribute('roadOpacity',new THREE.Float32BufferAttribute([],1));return source;}
  const junctions=endings.filter(t=>t.roads.size>1),cellSize=Math.max(2,...terminals.map(t=>t.reach)),grid=new Map(),coverageCache=new Map();
  segments.forEach((segment,i)=>{
    const {a,b,radius}=segment,margin=radius+.25;
    for(let x=Math.floor((Math.min(a.x,b.x)-margin)/cellSize);x<=Math.floor((Math.max(a.x,b.x)+margin)/cellSize);x++)for(let z=Math.floor((Math.min(a.z,b.z)-margin)/cellSize);z<=Math.floor((Math.max(a.z,b.z)+margin)/cellSize);z++){
      const key=x+','+z;if(!grid.has(key))grid.set(key,[]);grid.get(key).push(i);
    }
  });
  let pieces=[];
  for(let i=0;i<input.count;i+=3)pieces.push([0,1,2].map(j=>({x:input.getX(i+j),z:input.getZ(i+j)})));
  for(const end of terminals){
    const {reach}=end;
    const bounds=[p=>p.x-end.x-reach,p=>p.x-end.x+reach,p=>p.z-end.z-reach,p=>p.z-end.z+reach];
    for(const line of bounds)pieces=pieces.flatMap(p=>splitPolygon(p,line));
    const next=[];
    for(const polygon of pieces){
      const center=polygon.reduce((a,p)=>({x:a.x+p.x/polygon.length,z:a.z+p.z/polygon.length}),{x:0,z:0});
      if(Math.abs(center.x-end.x)>reach+EPS||Math.abs(center.z-end.z)>reach+EPS){next.push(polygon);continue;}
      let cells=[polygon];
      for(let offset=-reach+.5;offset<reach;offset+=.5)for(const axis of ['x','z'])cells=cells.flatMap(p=>splitPolygon(p,v=>v[axis]-end[axis]-offset));
      next.push(...cells);
    }
    pieces=next;
  }
  const opacity=p=>{
    const cacheKey=p.x+','+p.z;if(coverageCache.has(cacheKey))return coverageCache.get(cacheKey);
    let coverage=0;
    // Joined endpoint centres are a junction, not several overlapping fades.
    // Keep the exposed circular rim soft when every branch terminates here.
    for(const j of junctions)coverage=Math.max(coverage,1-smooth(Math.max(0,j.radius-.25),j.radius,Math.hypot(p.x-j.x,p.z-j.z)));
    for(const i of grid.get(Math.floor(p.x/cellSize)+','+Math.floor(p.z/cellSize))||[]){
      const {a,length,start,total,radius,fade,dx,dz,first,last}=segments[i];
      const along=(p.x-a.x)*dx+(p.z-a.z)*dz,clamped=Math.max(0,Math.min(length,along));
      const distance=Math.hypot(p.x-a.x-dx*clamped,p.z-a.z-dz*clamped);
      if(distance>radius+.25)continue;
      const station=start+clamped,left=first?along:station,right=last?total-start-along:total-station;
      const terminal=Math.min(left,right),longitudinal=smooth(-radius,fade,terminal);
      const feather=.45*(1-smooth(0,fade,terminal));
      const edge=feather>EPS?1-smooth(radius-feather,radius,distance):1;
      coverage=Math.max(coverage,longitudinal*edge);
      if(coverage>=1)break;
    }
    coverageCache.set(cacheKey,coverage);
    return coverage;
  };
  const positions=[],uvs=[],opacities=[];
  for(const polygon of pieces)for(let j=1;j<polygon.length-1;j++){
    let [a,b,c]=[polygon[0],polygon[j],polygon[j+1]].map(p=>({x:Math.fround(p.x),z:Math.fround(p.z)}));
    const area=cross(sub(b,a),sub(c,a));if(Math.abs(area)<EPS)continue;if(area>0)[b,c]=[c,b];
    for(const p of [a,b,c]){positions.push(p.x,y,p.z);uvs.push(p.x/4,p.z/4);opacities.push(opacity(p));}
  }
  source.dispose();const geometry=new THREE.BufferGeometry();
  geometry.setAttribute('position',new THREE.Float32BufferAttribute(positions,3));geometry.setAttribute('uv',new THREE.Float32BufferAttribute(uvs,2));geometry.setAttribute('roadOpacity',new THREE.Float32BufferAttribute(opacities,1));geometry.computeVertexNormals();return geometry;
}
export function roadRibbon(points,width,options={}){return roadNetwork([{points,width}],options);}

// Hashed coverage keeps ordinary depth occlusion and avoids dark alpha stacks
// where independent roads meet. Shared floor/river materials remain untouched.
export function createRoadMaterial(source){
  const material=source.clone(),compile=source.onBeforeCompile,key=source.customProgramCacheKey();
  material.transparent=false;material.alphaHash=true;material.depthWrite=true;
  material.onBeforeCompile=(shader,renderer)=>{
    compile.call(material,shader,renderer);
    shader.vertexShader='attribute float roadOpacity;\nvarying float vRoadOpacity;\n'+shader.vertexShader.replace('#include <begin_vertex>','#include <begin_vertex>\nvRoadOpacity = roadOpacity;');
    shader.fragmentShader='varying float vRoadOpacity;\n'+shader.fragmentShader.replace('#include <alphahash_fragment>','diffuseColor.a *= clamp(vRoadOpacity, 0.0, 1.0);\n#include <alphahash_fragment>');
  };
  material.customProgramCacheKey=()=>key+'|road-terminal-fade-v1';return material;
}

// Split at each deck and plank edge before applying height: a triangle can
// never interpolate down through a raised plank when the ring straddles land.
function splitPolygon(polygon,distance){
  const positive=[],negative=[];
  for(let i=0;i<polygon.length;i++){
    const a=polygon[i],b=polygon[(i+1)%polygon.length],da=distance(a),db=distance(b);
    if(da>=-EPS)positive.push(a);if(da<=EPS)negative.push(a);
    if(da*db<-EPS*EPS){const t=da/(da-db),p={x:a.x+(b.x-a.x)*t,z:a.z+(b.z-a.z)*t};positive.push(p);negative.push(p);}
  }
  return [positive,negative].filter(p=>p.length>=3);
}
export function barkSurface(level,origin,scale=1,geometry=new THREE.BufferGeometry()){
  const bridges=(level.rivers||[]).flatMap(r=>r.bridges).filter(b=>Math.hypot(b.x-origin.x,b.z-origin.z)<b.length/2+b.width/2+1.1*scale);
  const frames=bridges.map(b=>({...b,s:Math.sin(b.heading),c:Math.cos(b.heading),planks:Math.ceil(b.length/.3)}));
  const local=(p,b)=>({x:(p.x-b.x)*b.c-(p.z-b.z)*b.s,z:(p.x-b.x)*b.s+(p.z-b.z)*b.c});
  const positions=[];
  for(let i=0;i<64;i++){
    const point=(j,r)=>({x:origin.x+Math.cos(j/64*Math.PI*2)*r*scale,z:origin.z+Math.sin(j/64*Math.PI*2)*r*scale});
    let pieces=[[point(i,.9),point(i+1,.9),point(i+1,1.1),point(i,1.1)]];
    for(const b of frames){
      const lines=[p=>local(p,b).x-b.width/2,p=>local(p,b).x+b.width/2];
      for(let j=0;j<=b.planks;j++)lines.push(p=>local(p,b).z-(-b.length/2+j*b.length/b.planks));
      for(const line of lines)pieces=pieces.flatMap(p=>splitPolygon(p,line));
    }
    for(const polygon of pieces){
      const center=polygon.reduce((p,v)=>({x:p.x+v.x/polygon.length,z:p.z+v.z/polygon.length}),{x:0,z:0});let height=.055;
      for(const b of frames){const p=local(center,b);if(Math.abs(p.x)<=b.width/2+EPS&&Math.abs(p.z)<b.length/2){const plank=Math.min(b.planks-1,Math.floor((p.z/b.length+.5)*b.planks));height=Math.max(height,.18+.12*Math.sin((plank+.5)/b.planks*Math.PI)+.04);}}
      // A clipped polygon belongs to one support surface. Classify its interior
      // once: a rounded Float32 vertex on a deck edge must not fall to the bed.
      const deck = level.terrain?.enabled && frames.find(bridge => {
        const point = local(center, bridge);
        return Math.abs(point.x) <= bridge.width / 2 + EPS && Math.abs(point.z) < bridge.length / 2;
      });
      for (let j = 1; j < polygon.length - 1; j++) {
        for (const point of [polygon[0], polygon[j], polygon[j + 1]]) {
          const support = deck ? bridgeSurfaceHeight(level, deck, point.x, point.z)
            : groundHeight(level, point.x, point.z);
          positions.push(point.x, level.terrain?.enabled ? support + .04 : height, point.z);
        }
      }
    }
  }
  let attribute=geometry.getAttribute('position');
  if(!attribute||attribute.array.length<positions.length){
    // Release any previous GPU buffer before growing; normal frames reuse it.
    if(attribute)geometry.dispose();
    attribute=new THREE.BufferAttribute(new Float32Array(3*2**Math.ceil(Math.log2(Math.max(positions.length/3,1)))),3);
    attribute.setUsage(THREE.DynamicDrawUsage);geometry.setAttribute('position',attribute);
  }
  attribute.array.set(positions);attribute.needsUpdate=true;geometry.setDrawRange(0,positions.length/3);
  geometry.boundingSphere=new THREE.Sphere(new THREE.Vector3(origin.x,terrainHeight(level,origin.x,origin.z)+.2,origin.z),1.1*scale+.4);return geometry;
}
