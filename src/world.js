/** Deterministic meadow geometry. Rendering and every ground body share these
 * sampled river edges, fence segments, and circular tree footprints. */
const clamp = (v, lo, hi) => Math.max(lo, Math.min(hi, v));
export const distance = (a,b) => Math.hypot(a.x-b.x,a.z-b.z);
const unit = (x,z) => { const d=Math.hypot(x,z); return d>1e-8?{x:x/d,z:z/d}:{x:0,z:0}; };
function rng(seed) { let s=seed>>>0;return()=>{s+=0x6D2B79F5;let t=Math.imul(s^s>>>15,1|s);t^=t+Math.imul(t^t>>>7,61|t);return((t^t>>>14)>>>0)/4294967296;}; }
export function closestOnSegment(p,a,b) {
  const dx=b.x-a.x,dz=b.z-a.z,t=clamp(((p.x-a.x)*dx+(p.z-a.z)*dz)/(dx*dx+dz*dz||1),0,1);
  return {x:a.x+dx*t,z:a.z+dz*t,t};
}
export function segmentDistance(p,a,b) {return distance(p,closestOnSegment(p,a,b));}
const yawVector = heading=>({x:Math.sin(heading),z:Math.cos(heading)});
/** The enclosure floor, walls, map outline and admission share this rectangle.
 * Forward points away from the entrance; lateral runs across its opening. */
export function targetLocalPoint(target,point) {
  const f=yawVector(target.heading),dx=point.x-target.x,dz=point.z-target.z;
  return {forward:dx*f.x+dz*f.z,lateral:dx*f.z-dz*f.x};
}
export function targetWorldPoint(target,forward,lateral) {
  const f=yawVector(target.heading);
  return {x:target.x+f.x*forward+f.z*lateral,z:target.z+f.z*forward-f.x*lateral};
}
export function targetFootprint(target) {
  const halfLength=target.radius+1.4,halfWidth=halfLength,forward=yawVector(target.heading),side={x:forward.z,z:-forward.x};
  return {x:target.x,z:target.z,heading:target.heading,halfLength,halfWidth,openingWidth:7,forward,side,
    corners:[[-halfLength,-halfWidth],[halfLength,-halfWidth],[halfLength,halfWidth],[-halfLength,halfWidth]].map(([u,v])=>targetWorldPoint(target,u,v)),
    entrance:targetWorldPoint(target,-halfLength,0)};
}
export function containsTarget(target,point,bodyRadius=0) {
  const shape=targetFootprint(target),local=targetLocalPoint(target,point),clearance=Math.max(0,bodyRadius);
  return Math.abs(local.forward)<=shape.halfLength-clearance&&Math.abs(local.lateral)<=shape.halfWidth-clearance;
}
function withinBridge(bridge,p,radius) {
  const f=yawVector(bridge.heading),dx=p.x-bridge.x,dz=p.z-bridge.z;
  return Math.abs(dx*f.x+dz*f.z)<=bridge.length/2+radius && Math.abs(dx*f.z-dz*f.x)<=bridge.width/2-radius;
}
// Bridge side rails continue over the dry deck ends. They are independent
// physical geometry, so rendering does not duplicate them as meadow fences.
const bridgeRailsCache=new WeakMap();
function bridgeRails(bridge){
  let geometry=bridgeRailsCache.get(bridge);if(geometry)return geometry;
  const f=yawVector(bridge.heading),l={x:f.z,z:-f.x};
  const point=(u,v)=>({x:bridge.x+f.x*u+l.x*v,z:bridge.z+f.z*u+l.z*v});
  const rails=[-1,1].map(side=>({
    a:point(-bridge.length/2-.1,side*bridge.width/2),
    b:point(bridge.length/2+.1,side*bridge.width/2),radius:.05,
    posts:Array.from({length:4},(_,i)=>point(-bridge.length/2+i*bridge.length/3,side*bridge.width/2)),
  }));
  const ends=rails.flatMap(rail=>[rail.a,rail.b]);
  const bounds={minX:Math.min(...ends.map(p=>p.x)),maxX:Math.max(...ends.map(p=>p.x)),minZ:Math.min(...ends.map(p=>p.z)),maxZ:Math.max(...ends.map(p=>p.z))};
  geometry={rails,bounds};bridgeRailsCache.set(bridge,geometry);return geometry;
}
function collidesWithBridgeRails(bridge,p,radius){
  const {rails,bounds:b}=bridgeRails(bridge),e=radius+.065;
  if(p.x<b.minX-e||p.x>b.maxX+e||p.z<b.minZ-e||p.z>b.maxZ+e)return false;
  return rails.some(rail=>segmentDistance(p,rail.a,rail.b)<radius+rail.radius||rail.posts.some(post=>distance(p,post)<radius+.065));
}
function pathHitsBridgeRails(bridge,a,b,radius){
  const {rails,bounds:box}=bridgeRails(bridge),e=radius+.065;
  if(Math.max(a.x,b.x)<box.minX-e||Math.min(a.x,b.x)>box.maxX+e||Math.max(a.z,b.z)<box.minZ-e||Math.min(a.z,b.z)>box.maxZ+e)return false;
  return rails.some(rail=>segmentsTouch(a,b,rail.a,rail.b,radius+rail.radius)||rail.posts.some(post=>segmentDistance(post,a,b)<radius+.065));
}
// Generated streams are monotonic along their main axis. Looking at only
// neighboring samples keeps large-flock collision independent of river length.
function nearbyRiverSegments(river,p,margin=4) {
  const points=river.points,first=points[0],last=points.at(-1);
  const axis=Math.abs(last.x-first.x)>Math.abs(last.z-first.z)?'x':'z';
  const step=points[1][axis]-first[axis],center=Math.floor((p[axis]-first[axis])/step),reach=Math.ceil(margin/Math.abs(step))+2;
  const result=[];for(let i=Math.max(0,center-reach);i<Math.min(points.length-1,center+reach+1);i++)result.push([points[i],points[i+1]]);
  return result;
}
const riverBoundsCache=new WeakMap();
function riverBounds(river){let b=riverBoundsCache.get(river);if(!b){b={minX:Math.min(...river.points.map(p=>p.x)),maxX:Math.max(...river.points.map(p=>p.x)),minZ:Math.min(...river.points.map(p=>p.z)),maxZ:Math.max(...river.points.map(p=>p.z))};riverBoundsCache.set(river,b);}return b;}
function nearWater(river,p,radius) {const b=riverBounds(river),e=river.width/2+radius;if(p.x<b.minX-e||p.x>b.maxX+e||p.z<b.minZ-e||p.z>b.maxZ+e)return false;return nearbyRiverSegments(river,p,e).some(([a,b])=>segmentDistance(p,a,b)<e);}
function pathNearRiver(river,a,b,radius){const box=riverBounds(river),e=river.width/2+radius;return Math.max(a.x,b.x)>=box.minX-e&&Math.min(a.x,b.x)<=box.maxX+e&&Math.max(a.z,b.z)>=box.minZ-e&&Math.min(a.z,b.z)<=box.maxZ+e;}
function segmentsTouch(a,b,c,d,radius){
  if(Math.max(a.x,b.x)<Math.min(c.x,d.x)-radius||Math.min(a.x,b.x)>Math.max(c.x,d.x)+radius||Math.max(a.z,b.z)<Math.min(c.z,d.z)-radius||Math.min(a.z,b.z)>Math.max(c.z,d.z)+radius)return false;
  const cross=(p,q,r)=>(q.x-p.x)*(r.z-p.z)-(q.z-p.z)*(r.x-p.x);
  const t1=cross(a,b,c),t2=cross(a,b,d),t3=cross(c,d,a),t4=cross(c,d,b);
  if(t1*t2<0&&t3*t4<0)return true;
  return Math.min(segmentDistance(a,c,d),segmentDistance(b,c,d),segmentDistance(c,a,b),segmentDistance(d,a,b))<radius;
}
export function canOccupy(level,x,z,radius=.55) {
  const p={x,z},b=level.bounds;
  if(x<b.minX+radius+.18||x>b.maxX-radius-.18||z<b.minZ+radius+.18||z>b.maxZ-radius-.18)return false;
  for(const segment of level.fenceSegments||[]) if(segmentDistance(p,segment.a,segment.b)<radius+.18)return false;
  for(const river of level.rivers||[]) {
    if(river.bridges.some(bridge=>collidesWithBridgeRails(bridge,p,radius)))return false;
    const wet=nearWater(river,p,radius);
    if(wet&&!river.bridges.some(bridge=>withinBridge(bridge,p,radius)))return false;
  }
  for(const tree of level.obstacles||[])if(distance(p,tree)<radius+tree.radius)return false;
  return true;
}
export function moveBody(level,body,dx,dz,radius=.55) {
  const n=Math.max(1,Math.ceil(Math.hypot(dx,dz)/.25)),sx=dx/n,sz=dz/n;let blockedX=false,blockedZ=false;
  for(let i=0;i<n;i++) {
    if(canOccupy(level,body.x+sx,body.z+sz,radius)){body.x+=sx;body.z+=sz;}
    else {if(canOccupy(level,body.x+sx,body.z,radius))body.x+=sx;else if(Math.abs(sx)>1e-8)blockedX=true;
      if(canOccupy(level,body.x,body.z+sz,radius))body.z+=sz;else if(Math.abs(sz)>1e-8)blockedZ=true;}
  }
  return{blockedX,blockedZ};
}
function clearPath(level,a,b,radius,solidRails,audible=false) {
  const bounds=level.bounds;
  for(const p of [a,b])if(p.x<bounds.minX+radius+.18||p.x>bounds.maxX-radius-.18||p.z<bounds.minZ+radius+.18||p.z>bounds.maxZ-radius-.18)return false;
  for(const segment of level.fenceSegments||[]){
    if(audible&&(segment.kind!=='target'||level.target?.type!=='barn'))continue;
    if(segmentsTouch(a,b,segment.a,segment.b,radius+.18))return false;
  }
  for(const tree of level.obstacles||[]){
    const reach=radius+tree.radius;
    if(tree.x<Math.min(a.x,b.x)-reach||tree.x>Math.max(a.x,b.x)+reach||tree.z<Math.min(a.z,b.z)-reach||tree.z>Math.max(a.z,b.z)+reach)continue;
    if(segmentDistance(tree,a,b)<reach)return false;
  }
  for(const river of level.rivers||[]){
    if(solidRails&&river.bridges.some(bridge=>pathHitsBridgeRails(bridge,a,b,radius)))return false;
    if(!pathNearRiver(river,a,b,radius))continue;
    const n=Math.max(1,Math.ceil(distance(a,b)/.45));
    for(let i=0;i<=n;i++){const p={x:a.x+(b.x-a.x)*i/n,z:a.z+(b.z-a.z)*i/n};if(nearWater(river,p,radius)&&!river.bridges.some(bridge=>withinBridge(bridge,p,radius)))return false;}
  }
  return true;
}
export function hasClearGroundPath(level,a,b,radius=.55){return clearPath(level,a,b,radius,true);}
// Pip's call reaches over low fences and bridge rails, letting the player
// retrieve robots beside a wall or deck. Water, barns and trees still shield it;
// physical movement, companions and delivery always use the solid ground path.
export function hasClearPlayerSignal(level,a,b){return clearPath(level,a,b,.15,false,true);}
export function terrainHeight(level,x,z){
  for(const river of level?.rivers||[])for(const bridge of river.bridges){
    if(withinBridge(bridge,{x,z},0)){const f=yawVector(bridge.heading),along=(x-bridge.x)*f.x+(z-bridge.z)*f.z;return .18+.12*Math.sin(Math.PI*(along/bridge.length+.5));}
  }
  return 0;
}
function perimeter(b) { const nw={x:b.minX,z:b.minZ},ne={x:b.maxX,z:b.minZ},se={x:b.maxX,z:b.maxZ},sw={x:b.minX,z:b.maxZ};
  return [[nw,ne],[ne,se],[se,sw],[sw,nw]].map(([a,b])=>({a,b,kind:'boundary'})); }
/** Roads have gentle, sampled meanders. Crossing decks remain straight. */
function wander(points,random,geometry) {
  const result=[points[0]];
  for(let i=1;i<points.length;i++) {
    const a=points[i-1],b=points[i],d=distance(a,b),n=Math.max(1,Math.ceil(d/1.2)),v=unit(b.x-a.x,b.z-a.z),phase=random()*Math.PI*2;
    const amplitude=(a.kind==='bridge'||b.kind==='bridge'||a.kind==='gate'||b.kind==='gate'||b.kind==='target')?0:Math.min(1.8,d*.045);
    const leg=[];for(let j=1;j<=n;j++){const t=j/n,w=Math.sin(Math.PI*t)*Math.sin(Math.PI*2*t+phase)*amplitude;
      leg.push({x:a.x+(b.x-a.x)*t-v.z*w,z:a.z+(b.z-a.z)*t+v.x*w,...(j===n&&b.kind?{kind:b.kind}:{})});}
    const safe=!geometry||leg.every((p,j)=>hasClearGroundPath(geometry,j?leg[j-1]:a,p,.85));
    for(let j=1;j<=n;j++){const t=j/n;result.push(safe?leg[j-1]:{x:a.x+(b.x-a.x)*t,z:a.z+(b.z-a.z)*t,...(j===n&&b.kind?{kind:b.kind}:{})});}
  }
  return result;
}
export function createLevel(index=0,seed=index*7919+42) {
  index=clamp(Math.floor(Number(index)||0),0,99);seed=Number(seed)>>>0;
  // A broad first crossing accepts the starter flock before later lessons
  // require collecting stragglers. Its road widens with the physical deck.
  const random=rng(seed),early=index<5,count=Math.min(5+index*3,65),roadWidth=index===1?9.4:early?4.1:4.8;
  // Early lessons preserve their intimate footprint; level six opens into a
  // meadow 3.5 times deeper, then later chapters expand further.
  const endU=early?15+index*3:48+index*3,minU=early?-32:-40,maxU=endU+15,halfV=early?24:84+Math.floor(index/15)*14;
  // Late destinations occupy every compass direction, not always screen right.
  const quarter=early?(index===0?0:seed%2*2):seed%4;
  const angle=quarter*Math.PI/2;
  const transform=p=>({x:Number((p.x*Math.cos(angle)-p.z*Math.sin(angle)).toFixed(6)),z:Number((p.x*Math.sin(angle)+p.z*Math.cos(angle)).toFixed(6)),...(p.kind?{kind:p.kind}:{})});
  const heading=Math.PI/2-angle;
  const corners=[{x:minU,z:-halfV},{x:maxU,z:halfV},{x:minU,z:halfV},{x:maxU,z:-halfV}].map(transform);
  const bounds={minX:Math.min(...corners.map(p=>p.x)),maxX:Math.max(...corners.map(p=>p.x)),minZ:Math.min(...corners.map(p=>p.z)),maxZ:Math.max(...corners.map(p=>p.z))};
  if(!early){bounds.minZ=Math.min(bounds.minZ,-halfV);bounds.maxZ=Math.max(bounds.maxZ,halfV);}
  const target={...transform({x:endU,z:0}),radius:4.7+Math.sqrt(count)*.2,type:index%3===2?'barn':index%3===1?'field':'pen',heading};
  const spawn=transform({x:early?-20:-26,z:0}),dog=transform({x:early?-26:-33,z:0});
  const routeCount=early?1:index<15?(index%2===1?2:1):(index%3===0?3:2);
  const gateU=early?endU-21:endU-32;
  const riverBases=index===0?[]:early?[index===1?-10:-12]:index>=15?[gateU-48,gateU-23]:[gateU-23];
  const riverFunctions=riverBases.map(base=>{const phase=random()*Math.PI*2;return {width:early?3.1:3.7+Math.min(index*.025,1.8),at:v=>base+Math.sin(v/21+phase)*2.4+Math.sin(v/8+phase)*.65};});
  const canonicalRivers=riverFunctions.map(r=>({width:r.width,points:Array.from({length:Math.ceil((halfV*2+64)/2)+1},(_,i)=>{const z=-halfV-32+i*2;return{x:r.at(z),z};}),bridges:[]}));
  const canonicalGates=[],canonicalRoutes=[];
  const sign=random()>.5?1:-1;
  for(let r=0;r<routeCount;r++) {
    const offset=routeCount===1?0:(r-(routeCount-1)/2)*(early?12:32);
    const points=[{x:spawn.x*Math.cos(angle)+spawn.z*Math.sin(angle),z:0}];
    if(index===0){points.push({x:-8,z:2.8},{x:2,z:-2.2},{x:endU-target.radius-3,z:0},{x:endU,z:0,kind:'target'});}
    else {
      riverFunctions.forEach((river,j)=>{
        const z=early?(index===1?0:sign*5):offset+sign*(j%2?-1:1)*(14+random()*5);
        // Align the deck to the actual sampled bank segment, rather than the
        // meadow axis. The road's usable surface sets deck width; its rendered
        // shoulder is decoration and is deliberately excluded.
        const sampled=canonicalRivers[j].points;
        const k=clamp(Math.floor((z-sampled[0].z)/2),0,sampled.length-2),a=sampled[k],b=sampled[k+1];
        const t=(z-a.z)/(b.z-a.z),x=a.x+(b.x-a.x)*t,f=unit(b.z-a.z,a.x-b.x);
        // A short .75-unit landing on each bank covers the sampled curvature.
        const bridge={x,z,width:roadWidth*1.25,length:river.width+1.5,heading:Math.atan2(f.x,f.z)-angle};
        canonicalRivers[j].bridges.push(bridge);
        // Every branch reaches common dry turning planes before changing
        // lanes. This prevents a turn crossing another deck's side rail.
        // Turning space belongs to the trail, not the shortened deck.
        const approach=river.width/2+2.5+(early?3:6);
        const nearU=early?approach:(x-riverBases[j]+approach)/f.x,farU=early?approach:(riverBases[j]+approach-x)/f.x;
        const near={x:x-f.x*nearU,z:z-f.z*nearU},far={x:x+f.x*farU,z:z+f.z*farU};
        points.push({x:near.x-4,z:near.z-sign*(early?3:8)},near,{x,z,kind:'bridge'},far);
      });
      if(index>=2) {
        const z=early?sign*-4:offset-sign*(13+random()*4);
        const gate={x:gateU,z,width:early?8:10,heading};canonicalGates.push(gate);
        points.push({x:gateU-5,z},{x:gateU,z,kind:'gate'},{x:gateU+5,z});
      }
      const approachU=endU-target.radius-4;
      points.push({x:approachU-7,z:early?sign*3:offset*.3},{x:approachU,z:0},{x:endU,z:0,kind:'target'});
    }
    canonicalRoutes.push(points);
  }
  const rivers=canonicalRivers.map(r=>({width:r.width,points:r.points.map(transform),bridges:r.bridges.map(b=>({...b,...transform(b)}))}));
  const gates=canonicalGates.map(g=>({...g,...transform(g)}));
  const fenceSegments=perimeter(bounds);
  if(gates.length) {
    const sorted=[...canonicalGates].sort((a,b)=>a.z-b.z);let cursor=-halfV;
    for(const gate of sorted){fenceSegments.push({a:transform({x:gateU,z:cursor}),b:transform({x:gateU,z:gate.z-gate.width/2}),kind:'interior'});cursor=gate.z+gate.width/2;}
    fenceSegments.push({a:transform({x:gateU,z:cursor}),b:transform({x:gateU,z:halfV}),kind:'interior'});
  }
  const shape=targetFootprint(target),e=shape.halfLength,w=shape.halfWidth,opening=shape.openingWidth/2;
  const box=[[[-e,-w],[e,-w]],[[e,-w],[e,w]],[[e,w],[-e,w]],[[-e,w],[-e,opening]],[[-e,-opening],[-e,-w]]];
  for(const [a,b]of box)fenceSegments.push({a:targetWorldPoint(target,...a),b:targetWorldPoint(target,...b),kind:'target'});
  const corridorGeometry={bounds,rivers,fenceSegments,obstacles:[]};
  const routes=canonicalRoutes.map((points,i)=>{const sampled=wander(points.map(transform),random,corridorGeometry);return{id:`route-${i}`,points:sampled,length:sampled.slice(1).reduce((sum,p,j)=>sum+distance(p,sampled[j]),0)};});
  const roads=routes.map(route=>({routeId:route.id,points:route.points,width:roadWidth}));
  const level={index,seed,title:['First day on the farm','Over the babbling brook','Through the garden gate','A mixed-up meadow','The long way home'][index]||`Pasture patrol ${index+1}`,
    description:index===0?'Move behind the sheep and gently guide all five into the sunny pen.':`Bring ${count} robots to the ${target.type}. ${routeCount>1?'Choose a crossing and lead your flock through the meadow.':'Follow the winding trail and use the crossings.'}`,
    bounds,spawn,dog,target,animals:[],rivers,gates,fences:[],fenceSegments,obstacles:[],routes,roads,reward:80+index*25,sceneryHills:[]};
  for(let i=0;i<count;i++) {
    const p=transform({x:(early?-20:-26)+Math.floor(i/7)*1.65+(random()-.5)*.2,z:(i%7-3)*1.65+(random()-.5)*.2});
    level.animals.push({id:i,type:index>=3&&i%4===0?'cow':'sheep',...p,vx:0,vz:0,saved:false});
  }
  // A curved bank can occasionally graze the forward row for a custom seed.
  // Slide the complete grid backward together, keeping its compact spacing and
  // the player's position behind it instead of scattering individual robots.
  if(level.animals.some(a=>!canOccupy(level,a.x,a.z,a.type==='cow'?.78:.55))){
    const f=yawVector(heading),original=level.animals.map(a=>({x:a.x,z:a.z}));
    for(let step=1;step<=7;step++){
      const shift=step*.5;
      const candidate=original.map(p=>({x:p.x-f.x*shift,z:p.z-f.z*shift}));
      if(candidate.every((p,i)=>canOccupy(level,p.x,p.z,level.animals[i].type==='cow'?.78:.55))){
        candidate.forEach((p,i)=>Object.assign(level.animals[i],p));break;
      }
    }
  }
  // Trees never intrude on a viable herd corridor or on spawns/destinations.
  for(let i=0;i<Math.min(10+index*2,130);i++) {
    const p=transform({x:minU+5+random()*(maxU-minU-10),z:-halfV+5+random()*(halfV*2-10)}),radius=.7+random()*.7;
    if(distance(p,spawn)<14||distance(p,target)<target.radius+10||!canOccupy(level,p.x,p.z,radius+1))continue;
    if(routes.some(route=>route.points.slice(1).some((q,j)=>segmentDistance(p,route.points[j],q)<7+radius)))continue;
    level.obstacles.push({...p,radius});
  }
  for(let i=0;i<14;i++) {
    const radius=7+random()*8,height=3+random()*5;
    const side=i%4,p=side===0?{x:bounds.minX-radius-3,z:bounds.minZ+random()*(bounds.maxZ-bounds.minZ)}:side===1?{x:bounds.maxX+radius+3,z:bounds.minZ+random()*(bounds.maxZ-bounds.minZ)}:side===2?{x:bounds.minX+random()*(bounds.maxX-bounds.minX),z:bounds.minZ-radius-3}:{x:bounds.minX+random()*(bounds.maxX-bounds.minX),z:bounds.maxZ+radius+3};
    level.sceneryHills.push({...p,radius,height});
  }
  return level;
}

/** Nearest route arclength makes guidance work in all compass directions. */
export function routeProgress(level,position,routeId) {
  let best=null;
  for(const route of level.routes||[]) {
    if(routeId&&route.id!==routeId)continue;let length=0;
    for(let i=1;i<route.points.length;i++) {
      const a=route.points[i-1],b=route.points[i],p=closestOnSegment(position,a,b),d=distance(position,p),segmentLength=distance(a,b);
      if(!best||d<best.distance)best={route,routeId:route.id,index:i-1,point:p,distance:d,progress:length+segmentLength*p.t,length:route.length};
      length+=segmentLength;
    }
  }
  return best;
}
export function nextNavigationPoint(level,position,routeId) {
  const info=routeProgress(level,position,routeId);if(!info)return level.target;
  const threshold=info.progress+7;let length=0;
  for(let i=1;i<info.route.points.length;i++){length+=distance(info.route.points[i-1],info.route.points[i]);if(length>=threshold)return info.route.points[i];}
  return level.target;
}
export function separatedByBank(level,a,b) {
  for(const river of level.rivers||[]) {
    if(river.bridges.some(bridge=>pathHitsBridgeRails(bridge,a,b,.1)))return true;
    if(!pathNearRiver(river,a,b,.1))continue;
    const side=p=>{let best=null,d=Infinity;for(const [v,w]of nearbyRiverSegments(river,p)){const q=closestOnSegment(p,v,w),dist=distance(p,q);if(dist<d){d=dist;best=(w.x-v.x)*(p.z-q.z)-(w.z-v.z)*(p.x-q.x);}}return best||0;};
    if(side(a)*side(b)>0)continue;
    const n=Math.max(1,Math.ceil(distance(a,b)/1.2));
    for(let i=0;i<=n;i++){const p={x:a.x+(b.x-a.x)*i/n,z:a.z+(b.z-a.z)*i/n};if(nearWater(river,p,.1)&&!river.bridges.some(bridge=>withinBridge(bridge,p,.1)))return true;}
  }
  return false;
}
export function destinationApproach(level,body) {
  const t=level.target,extent=targetFootprint(t).halfLength,{forward,lateral}=targetLocalPoint(t,body);
  const point=(u,v)=>targetWorldPoint(t,u,v);
  if(forward>extent+.4)return point(extent+2,Math.sign(lateral||1)*(extent+2));
  if(Math.abs(lateral)>extent-.4&&forward>-extent-.8)return point(-extent-2,Math.sign(lateral||1)*(extent+2));
  if(forward<-extent+.7)return point(-extent+2,0);
  return t;
}
function routeNavigationTarget(level,body,desired) {
  if(hasClearGroundPath(level,body,desired,.6))return desired;
  const start=routeProgress(level,body),end=routeProgress(level,desired,start?.routeId);
  if(!start||!end)return desired;
  const forward=end.progress>=start.progress,points=start.route.points;
  if(start.distance>3&&hasClearGroundPath(level,body,start.point,.6))return start.point;
  const aim=forward?Math.min(points.length-1,start.index+5):Math.max(0,start.index-4);
  for(let i=aim;forward?i>start.index:i<=start.index;i+=forward?-1:1)if(hasClearGroundPath(level,body,points[i],.6))return points[i];
  return start.point;
}
export function navigationTarget(level,body,desired,radius=.62) {
  if(hasClearGroundPath(level,body,desired,radius))return desired;
  const fallback=routeNavigationTarget(level,body,desired);
  // A ground companion outside a side rail must walk around a dry open end
  // before joining the deck. Route projection alone can point through a rail.
  const bridges=(level.rivers||[]).flatMap(r=>r.bridges)
    .filter(b=>distance(body,b)<b.length+b.width+8||pathHitsBridgeRails(b,body,desired,radius))
    .sort((a,b)=>Math.min(distance(body,a),distance(desired,a))-Math.min(distance(body,b),distance(desired,b))).slice(0,2);
  if(!bridges.length)return fallback;
  const nodes=[body,desired,fallback];
  for(const b of bridges){
    const f=yawVector(b.heading),u=b.length/2+radius+.4,v=b.width/2+radius+.4;
    for(const [along,side]of [[-u,-v],[-u,v],[u,-v],[u,v],[-u,0],[u,0],[0,0]])
      nodes.push({x:b.x+f.x*along+f.z*side,z:b.z+f.z*along-f.x*side});
  }
  const costs=nodes.map(()=>Infinity),previous=[],visited=new Set();costs[0]=0;
  for(let step=0;step<nodes.length;step++){
    let nearest=-1;for(let i=0;i<nodes.length;i++)if(!visited.has(i)&&(nearest<0||costs[i]<costs[nearest]))nearest=i;
    if(nearest<0||!Number.isFinite(costs[nearest]))break;
    visited.add(nearest);
    for(let i=1;i<nodes.length;i++){
      if(visited.has(i)||!hasClearGroundPath(level,nodes[nearest],nodes[i],radius))continue;
      const cost=costs[nearest]+distance(nodes[nearest],nodes[i]);
      if(cost<costs[i]){costs[i]=cost;previous[i]=nearest;}
    }
  }
  let first=Number.isFinite(costs[1])?1:Number.isFinite(costs[2])?2:-1;
  if(first<0)return fallback;
  while(previous[first]!==0&&previous[first]!==undefined)first=previous[first];
  return nodes[first];
}
// Plan with the moving body's clearance: a valid sheep position near a bank
// can be wet for a cow, leaving a cow-sized visibility graph disconnected.
export function openingSteer(level,body,vx,vz,radius=.78) {
  const speed=Math.hypot(vx,vz);if(speed<.01)return{x:0,z:0};
  const future={x:body.x+vx/speed*2,z:body.z+vz/speed*2};if(hasClearGroundPath(level,body,future,radius))return{x:0,z:0};
  // Select the closest opening on the barrier being pressed, never chase a goal.
  let opening=null,best=Infinity;
  for(const river of level.rivers||[]) {
    if(!nearWater(river,body,3))continue;
    for(const bridge of river.bridges){const d=distance(body,bridge);if(d<best){best=d;opening=bridge;}}
  }
  const t=level.target,shape=targetFootprint(t);
  const targetGate={...shape.entrance,width:shape.openingWidth,heading:t.heading};
  for(const gate of [...(level.gates||[]),targetGate]) {
    const f=yawVector(gate.heading),dx=body.x-gate.x,dz=body.z-gate.z;
    if(Math.abs(dx*f.x+dz*f.z)<3&&distance(body,gate)<best){best=distance(body,gate);opening=gate;}
  }
  if(!opening)return{x:0,z:0};
  // Pressure at a short landing can hit either a rail or the curved bank,
  // even when aligned with the opening. Walk around its dry end first; the
  // only target is this nearby physical opening, never the destination.
  if(opening.length){
    const waypoint=navigationTarget(level,body,opening,radius),toward=unit(waypoint.x-body.x,waypoint.z-body.z);
    return{x:toward.x*Math.min(2.4,speed*.8+.5),z:toward.z*Math.min(2.4,speed*.8+.5)};
  }
  const f=yawVector(opening.heading),u=(opening.x-body.x)*f.z-(opening.z-body.z)*f.x;
  if(Math.abs(u)<opening.width/2-1)return{x:0,z:0};
  return{x:f.z*Math.sign(u)*Math.min(2.4,speed*.8+.5),z:-f.x*Math.sign(u)*Math.min(2.4,speed*.8+.5)};
}
export const steeringOpening=openingSteer;
