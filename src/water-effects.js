import * as THREE from 'three';
import { canOccupy, terrainHeight } from './world.js';
import { deliveryCountdownSeconds } from './simulation.js';

const clamp=(v,a=0,b=1)=>Math.max(a,Math.min(b,v));
// Travel at 2m/s allows for herding below the cow/sheep maximum speeds, then
// includes the actual arrival countdown. This is a visual pacing estimate, not a timer.
export function puddleGrowthSeconds(level){
  const journey=Math.max(0,...(level.routes||[]).map(r=>Number.isFinite(r.length)?r.length:0));
  return clamp(journey/2+deliveryCountdownSeconds(level),45,240);
}
function puddleRoll(seed,salt){let n=((seed||0)^Math.imul(salt,0x9e3779b9))>>>0;n=Math.imul(n^(n>>>16),0x21f0aaad);n=Math.imul(n^(n>>>15),0x735a2d97);return ((n^(n>>>15))>>>0)/4294967296;}
const flat=(p)=>p?.position?{x:p.position.x,z:p.position.z}:p;
const GRASS_WET=new THREE.Color(0x42634a),PATH_WET=new THREE.Color(0x58432f),WATER_RAIN=new THREE.Color(0x75b5c3);
function segmentDistance(p,a,b){const dx=b.x-a.x,dz=b.z-a.z,t=clamp(((p.x-a.x)*dx+(p.z-a.z)*dz)/(dx*dx+dz*dz||1));return Math.hypot(p.x-a.x-dx*t,p.z-a.z-dz*t);}
function safePuddleSite(level,p){
  if(!canOccupy(level,p.x,p.z,.4))return false;
  for(const river of level.rivers||[]){
    if(river.points.some((a,i)=>i&&segmentDistance(p,river.points[i-1],a)<river.width/2+.8))return false;
    for(const b of river.bridges||[]){const dx=p.x-b.x,dz=p.z-b.z,along=dx*Math.sin(b.heading)+dz*Math.cos(b.heading),across=dx*Math.cos(b.heading)-dz*Math.sin(b.heading);if(Math.abs(along)<b.length/2+.45&&Math.abs(across)<b.width/2+.45)return false;}
  }
  return true;
}

function flowTexture(){
  const n=64,data=new Uint8Array(n*n*4);
  for(let y=0;y<n;y++)for(let x=0;x<n;x++){
    const i=(y*n+x)*4, streak=(Math.sin(y*.72+Math.sin(x*.31)*1.5)+Math.sin(y*1.37+x*.18))*.5;
    const v=Math.round(145+streak*28);data[i]=Math.round(v*.65);data[i+1]=v;data[i+2]=Math.min(255,v+24);data[i+3]=255;
  }
  const t=new THREE.DataTexture(data,n,n);t.wrapS=t.wrapT=THREE.RepeatWrapping;t.repeat.set(1,5);t.magFilter=t.minFilter=THREE.LinearFilter;t.needsUpdate=true;return t;
}

/** Bounded weather-driven river, wet-ground, puddle and splash scenery. */
export class WaterEffects {
  constructor(scene,{maxSplashes=12,maxPuddles=8}={}){
    this.scene=scene;this.root=new THREE.Group();this.root.name='Water and wetness effects';scene.add(this.root);
    this.maxSplashes=Math.max(0,maxSplashes|0);this.maxPuddles=Math.max(0,maxPuddles|0);this.elapsed=0;this.wetness=0;this.level=null;
    this.flowMap=flowTexture();this.flowMaterial=new THREE.MeshBasicMaterial({map:this.flowMap,color:0x8acbd2,transparent:true,opacity:.16,depthWrite:false,side:THREE.DoubleSide});
    this.splashGeometry=new THREE.TorusGeometry(.2,.025,4,12);
    this.splashes=[];this.puddles=[];this.materialSnapshots=[];this.riverSnapshots=[];this.lastMoverPositions=new Map();this.lastSplashAt=new Map();
  }
  setLevel(level,{grassMaterials=[],pathMaterials=[],waterMaterial=null,terrain=null,rivers=[],weather=null}={}){
    this.restoreMaterials();this.clearEffects();this.level=level;this.terrain=terrain;this.rivers=rivers;this.wetness=0;this.elapsed=0;this.puddleGrowthDuration=puddleGrowthSeconds(level);this.rainElapsed=0;this.lastMoverPositions.clear();this.lastSplashAt.clear();
    for(const [kind,materials] of [['grass',grassMaterials],['path',pathMaterials]])for(const material of Array.isArray(materials)?materials:[materials])if(material?.color){
      this.materialSnapshots.push({material,kind,color:material.color.clone(),roughness:material.roughness});
    }
    this.waterSnapshot=waterMaterial?{material:waterMaterial,color:waterMaterial.color?.clone(),roughness:waterMaterial.roughness}:null;
    for(const river of rivers){if(!river?.mesh)continue;const mesh=river.mesh;
      // The lightweight overlay has its own material and texture; it never replaces or disposes the game's source material.
      // Ribbon UVs are world x/z coordinates, so flow along the river axis
      // must advance the matching U/V components instead of rotating the map.
      const map=this.flowMap.clone();map.repeat.set(1,1);
      const material=this.flowMaterial.clone();material.map=map;material.userData.ownedFlowMap=map;
      const geometry=mesh.geometry.clone(),positions=geometry.attributes.position,uv=geometry.attributes.uv;
      // Arc-length V follows each local tangent, independent of world compass.
      const points=river.points;
      if(points?.length>1){for(let i=0;i<positions.count;i++){const x=positions.getX(i),z=positions.getZ(i);let best=Infinity,along=0,side=0,total=0;for(let j=1;j<points.length;j++){const a=points[j-1],b=points[j],dx=b.x-a.x,dz=b.z-a.z,len=Math.hypot(dx,dz);if(!len)continue;const t=clamp(((x-a.x)*dx+(z-a.z)*dz)/(len*len)),px=x-a.x-t*dx,pz=z-a.z-t*dz,d=px*px+pz*pz;if(d<best){best=d;along=total+t*len;side=(-dz*px+dx*pz)/len;}total+=len;}uv.setXY(i,side/Math.max(1,river.width||4),along/4);}uv.needsUpdate=true;}
      const overlay=new THREE.Mesh(geometry,material);overlay.name='River flow';overlay.position.copy(mesh.position);overlay.position.y+=.003;overlay.rotation.copy(mesh.rotation);overlay.scale.copy(mesh.scale);overlay.frustumCulled=mesh.frustumCulled;overlay.userData.flow={heading:river.heading||0,speed:river.flowSpeed??.12,localUV:Boolean(points?.length>1)};this.root.add(overlay);
    }
    for(let i=0;i<this.maxSplashes;i++){const material=new THREE.MeshBasicMaterial({color:0xc9eef0,transparent:true,opacity:.78,depthWrite:false});const mesh=new THREE.Mesh(this.splashGeometry,material);mesh.visible=false;mesh.rotation.x=-Math.PI/2;this.root.add(mesh);this.splashes.push({mesh,material,age:1});}
    const puddleGeometry=new THREE.CircleGeometry(1,20);this.puddleResources={geometry:puddleGeometry};
    const seed=level.seed??level.index??0,initialCount=puddleRoll(seed,71)<.5?0:1+Math.floor(puddleRoll(seed,72)*3);
    for(const site of this.findPuddleSites()) {const material=new THREE.MeshBasicMaterial({color:0x456a69,transparent:true,opacity:.2,depthWrite:false,side:THREE.DoubleSide});const mesh=new THREE.Mesh(puddleGeometry,material);mesh.rotation.x=-Math.PI/2;mesh.visible=false;mesh.position.set(site.x,terrainHeight(level,site.x,site.z)+.024,site.z);mesh.scale.set(site.radius,site.radius*.62,1);this.root.add(mesh);this.puddles.push({mesh,material,depth:0,site,initialDepth:this.puddles.length<initialCount?.1+puddleRoll(seed,80+this.puddles.length)*.1:0});}
    if(weather){this.wetness=weather.kind==='storm'?.60:weather.kind==='heavy-rain'?.35:weather.type==='rain'?.03:0;for(const p of this.puddles){p.depth=weather.type==='rain'?p.initialDepth:0;this.applyPuddleAppearance(p);}this.applySurfaceWeather(weather);}
  }
  findPuddleSites(){
    const level=this.level,b=level.bounds,sites=[],w=b.maxX-b.minX,d=b.maxZ-b.minZ,seed=level.seed??level.index??0;
    const add=(p,radius)=>{
      const {x,z}=p;
      // Overlapping safety probes cover the whole final footprint, including
      // interior obstacles, before any growing mesh becomes visible.
      const footprint=Array.from({length:48},(_,j)=>{const ring=1+Math.floor(j/16),angle=(j%16)*Math.PI/8;return{x:x+Math.cos(angle)*radius*ring/3,z:z+Math.sin(angle)*radius*.62*ring/3};});
      if(!safePuddleSite(level,p)||footprint.some(edge=>!safePuddleSite(level,edge))||sites.some(s=>Math.hypot(s.x-x,s.z-z)<s.radius+radius+.3))return false;
      sites.push({...p,radius});return true;
    };
    const routes=(level.routes||[]).filter(r=>r.points?.length>1);
    // Allocate sites along the journey before filling unused space. A uniform
    // field distribution becomes invisible on large maps, especially in portrait.
    // The first slot stays near spawn so any seeded small puddle is observable.
    for(let slot=0;slot<this.maxPuddles&&routes.length;slot++){
      const route=routes[slot%routes.length],points=route.points;
      const lengths=points.slice(1).map((p,i)=>Math.hypot(p.x-points[i].x,p.z-points[i].z)),total=lengths.reduce((a,v)=>a+v,0);
      const radius=1.35+puddleRoll(seed,150+slot)*.69,progress=slot/Math.max(1,this.maxPuddles-1);
      for(let attempt=0;attempt<35;attempt++){
        let remaining=clamp(progress+(attempt<7?0:(Math.ceil((attempt-6)/7)%2?1:-1)*.035))*total,index=0;
        while(index<lengths.length-1&&remaining>lengths[index])remaining-=lengths[index++];
        const a=points[index],next=points[index+1],length=lengths[index]||1,t=clamp(remaining/length);
        const lateral=[0,2.5,-2.5,4,-4,6,-6][attempt%7]*(puddleRoll(seed,200+slot)<.5?-1:1);
        const p={x:a.x+(next.x-a.x)*t-(next.z-a.z)/length*lateral,z:a.z+(next.z-a.z)*t+(next.x-a.x)/length*lateral};
        if(add(p,radius))break;
      }
    }
    for(let i=1;i<Math.max(100,this.maxPuddles*80)&&sites.length<this.maxPuddles;i++){
      const x=b.minX+2+((i*.61803398875)%1)*Math.max(1,w-4),z=b.minZ+2+((i*.75487766625)%1)*Math.max(1,d-4);
      add({x,z},1.35+((i*37)%70)/100);
    }
    return sites;
  }
  applyPuddleAppearance(p){
    // Area and opacity grow together; geometry never exceeds the validated footprint.
    const size=Math.sqrt(p.depth);p.mesh.scale.set(p.site.radius*size,p.site.radius*.62*size,1);
    p.mesh.visible=p.depth>.008;p.material.opacity=p.mesh.visible?.18+p.depth*.24:0;
  }
  restoreMaterials(){
    for(const s of this.materialSnapshots){s.material.color.copy(s.color);if(s.roughness!==undefined)s.material.roughness=s.roughness;s.color.dispose?.();}
    this.materialSnapshots=[];
    if(this.waterSnapshot){const s=this.waterSnapshot;if(s.color&&s.material.color)s.material.color.copy(s.color);if(s.roughness!==undefined)s.material.roughness=s.roughness;s.color?.dispose?.();this.waterSnapshot=null;}
  }
  clearEffects(){for(const e of this.splashes){this.root.remove(e.mesh);e.material.dispose();}for(const e of this.puddles){this.root.remove(e.mesh);e.material.dispose();}this.splashes=[];this.puddles=[];
    if(this.puddleResources){this.puddleResources.geometry.dispose();this.puddleResources=null;}
    for(const child of [...this.root.children])if(child.name==='River flow'){this.root.remove(child);child.material.userData.ownedFlowMap?.dispose();child.material.dispose();child.geometry.dispose();}
  }
  applySurfaceWeather(weather={}){
    const rain=weather.type==='rain'?clamp(weather.rainIntensity??weather.intensity??0):0;
    for(const s of this.materialSnapshots){const amount=this.wetness*(s.kind==='grass'?.62:.85);s.material.color.copy(s.color).lerp(s.kind==='grass'?GRASS_WET:PATH_WET,amount);if(s.roughness!==undefined)s.material.roughness=Math.max(.28,s.roughness-this.wetness*.22);}
    if(this.waterSnapshot){const s=this.waterSnapshot,cloud=clamp(weather.cloudCoverage??0);if(s.material.color&&s.color)s.material.color.copy(s.color).lerp(WATER_RAIN,clamp((weather.rainIntensity??rain)*.11+cloud*.035+(weather.severity||0)*.025+(weather.lightningFlash||0)*.09));if(s.roughness!==undefined)s.material.roughness=clamp(s.roughness-(weather.rainIntensity??rain)*.16,.12,1);}
  }
  update(dt,{weather={},movers=[],paused=false}={}){
    if(!this.level||paused||!(dt>0))return;
    dt=Math.min(dt,.1);this.elapsed+=dt;
    const rain=weather.type==='rain'?clamp(weather.rainIntensity??weather.intensity??0):0;
    this.wetness=clamp(this.wetness+rain*dt*.012-dt*(weather.type==='sun'?.004:.0012));
    this.applySurfaceWeather(weather);
    for(const overlay of this.root.children)if(overlay.userData.flow){const f=overlay.userData.flow,map=overlay.material.map,speed=dt*(f.speed+(weather.windIntensity||0)*.025);map.offset.x=(map.offset.x+(f.localUV?0:Math.sin(f.heading))*speed)%1;map.offset.y=(map.offset.y+(f.localUV?1:Math.cos(f.heading))*speed)%1;overlay.material.opacity=.08+rain*.18+(weather.daylight??.7)*.025+(weather.lightningFlash||0)*.2;}
    // Any fixed rainy tier reaches full size within the expected level duration.
    // Intensity changes atmosphere density; it must not hide light-rain accumulation.
    if(rain>0)this.rainElapsed+=dt;
    for(const p of this.puddles){p.depth=rain>0?clamp(p.initialDepth+(1-p.initialDepth)*this.rainElapsed/this.puddleGrowthDuration):clamp(p.depth-dt*(weather.type==='sun'?.006:.0008));this.applyPuddleAppearance(p);}
    for(const mover of movers){const pos=flat(mover);if(!pos||!Number.isFinite(pos.x)||!Number.isFinite(pos.z))continue;const id=mover.id??mover.kind??'mover',prev=flat(mover.previousPosition)||((Number.isFinite(mover.previousX))?{x:mover.previousX,z:mover.previousZ}:this.lastMoverPositions.get(id));
      const moved=prev&&Math.hypot(pos.x-prev.x,pos.z-prev.z)>.008;
      const puddle=this.puddles.find(p=>p.mesh.visible&&((pos.x-p.site.x)**2/(p.site.radius**2)+(pos.z-p.site.z)**2/(p.site.radius*.62)**2)<p.depth);
      if(moved&&puddle&&safePuddleSite(this.level,pos)&&this.elapsed-(this.lastSplashAt.get(id)||-10)>.22){this.spawnSplash(pos);this.lastSplashAt.set(id,this.elapsed);}
      this.lastMoverPositions.set(id,{x:pos.x,z:pos.z});
    }
    for(const s of this.splashes){if(s.age>=1)continue;s.age=Math.min(1,s.age+dt*2.4);s.mesh.scale.setScalar(.4+s.age*2.3);s.mesh.position.y=.06+terrainHeight(this.level,s.mesh.position.x,s.mesh.position.z)+s.age*.06;s.material.opacity=.78*(1-s.age);if(s.age>=1)s.mesh.visible=false;}
  }
  spawnSplash(pos){const s=this.splashes.find(v=>v.age>=1);if(!s)return;s.age=0;s.mesh.position.set(pos.x,terrainHeight(this.level,pos.x,pos.z)+.08,pos.z);s.mesh.scale.setScalar(.35);s.mesh.visible=true;}
  dispose(){this.restoreMaterials();this.clearEffects();this.root.removeFromParent();this.flowMap.dispose();this.flowMaterial.dispose();this.splashGeometry.dispose();this.level=null;this.scene=null;}
}
