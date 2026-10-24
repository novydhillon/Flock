import * as THREE from 'three';
import { terrainHeight } from './world.js';
import { createWeatherState, stepWeather, weatherForLevel } from './weather.js';
import { wildlifePopulation, wildlifePositionSafe, stepWildlife } from './wildlife.js';
import { wildlifeParts, wildlifeBodyGeometry } from './wildlife-models.js';
import { RainView } from './rain-view.js';
const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
function seeded(seed){let s=seed>>>0;return()=>((s=Math.imul(s,1664525)+1013904223>>>0)/4294967296);}
export { weatherForLevel, stepWildlife, wildlifePositionSafe as safeWildlifePosition };

/** Wildlife is instanced by anatomical part so even the detailed ground fauna
 * costs a fixed handful of draws. Weather state is shared with the atmosphere. */
export class MeadowNature {
 constructor(scene){this.scene=scene;this.root=new THREE.Group();this.root.name='Meadow nature';scene.add(this.root);this.resources=new Set();this.time=0;this.wildlife=[];this.batches={};this.transform=new THREE.Object3D();}
 own(r){this.resources.add(r);return r;}
 clear(){this.root.traverse(o=>{if(o.isInstancedMesh)o.dispose();});this.root.clear();this.resources.forEach(r=>r.dispose());this.resources.clear();this.rainView?.dispose();this.rainView=null;this.wildlife=[];this.batches={};this.precipitation=null;}
 batch(name,geo,mat,count){const m=new THREE.InstancedMesh(geo,mat,count);m.instanceMatrix.setUsage(THREE.DynamicDrawUsage);m.frustumCulled=false;this.root.add(m);this.batches[name]=m;return m;}
 setLevel(level){this.clear();this.level=level;this.time=0;this.weather=createWeatherState(level);const rand=seeded((level.seed||42)+71053),b=level.bounds,w=b.maxX-b.minX,d=b.maxZ-b.minZ,threats=[level.dog||level.spawn,...(level.animals||[])].filter(Boolean);
  const sphere=this.own(new THREE.SphereGeometry(1,10,8));
  const counts=wildlifePopulation(level);
  const kinds=['butterfly','bird','squirrel','rabbit'];
  for(const kind of kinds){const count=counts[kind]||0; if(!count)continue;
   for(let i=0;i<count;i++){let p=null;for(let attempt=0;attempt<240;attempt++){const route=(level.roads||[]).flatMap(r=>r.points||[r.from,r.to]).filter(Boolean),anchor=attempt<120&&route.length?route[Math.floor(rand()*route.length)]:null,ang=rand()*Math.PI*2,off=8+rand()*13,candidate=anchor?{x:anchor.x+Math.cos(ang)*off,z:anchor.z+Math.sin(ang)*off}:{x:b.minX+2+rand()*(w-4),z:b.minZ+2+rand()*(d-4)};if(wildlifePositionSafe(level,candidate,threats,.5)){p=candidate;break;}}
    this.wildlife.push({kind,slot:i,x:p?.x??0,z:p?.z??0,homeX:p?.x??0,homeZ:p?.z??0,phase:rand()*Math.PI*2,heading:rand()*Math.PI*2,visible:!!p,gait:0,hidden:false,hideTimer:0});}
  }
  const colors={bird:['#54777b','#91adb0'],butterfly:['#65523f','#f2ac75']};
  for(const kind of ['bird','butterfly']){const count=counts[kind]||0;if(!count)continue;const [body,wing]=colors[kind];this.batch(`${kind}Body`,sphere,this.own(new THREE.MeshStandardMaterial({color:body,roughness:1})),count);this.batch(`${kind}Wing`,sphere,this.own(new THREE.MeshStandardMaterial({color:wing,roughness:1})),count*2);}
  for(const kind of ['squirrel','rabbit']){const count=counts[kind]||0;if(!count)continue;this.batch(`${kind}Body`,this.own(wildlifeBodyGeometry(kind)),this.own(new THREE.MeshStandardMaterial({vertexColors:true,roughness:.94})),count);const pawColor=kind==='squirrel'?'#74503b':'#b09b7c';this.batch(`${kind}Paw`,sphere,this.own(new THREE.MeshStandardMaterial({color:pawColor,roughness:.94})),count*wildlifeParts[kind].filter(part=>part.part==='paw').length);}
  this.rainView=new RainView(this.root);
  this.update(0,{dog:level.dog||level.spawn,animals:level.animals});
 }
 pose(batch,i,x,y,z,sx,sy,sz,heading=0,roll=0,pitch=0){const t=this.transform;t.position.set(x,y,z);t.rotation.set(pitch,heading,roll);t.scale.set(sx,sy,sz);t.updateMatrix();batch.setMatrixAt(i,t.matrix);}
 hideParts(a){if(a.kind==='bird'||a.kind==='butterfly'){this.pose(this.batches[`${a.kind}Body`],a.slot,0,-100,0,0,0,0);for(let k=0;k<2;k++)this.pose(this.batches[`${a.kind}Wing`],a.slot*2+k,0,-100,0,0,0,0);}else{this.pose(this.batches[`${a.kind}Body`],a.slot,0,-100,0,0,0,0);const stride=wildlifeParts[a.kind].filter(part=>part.part==='paw').length;for(let k=0;k<stride;k++)this.pose(this.batches[`${a.kind}Paw`],a.slot*stride+k,0,-100,0,0,0,0);}}
 update(dt,{dog,animals=[],camera,paused=false}={}){if(!this.level)return;dt=paused?0:clamp(Number(dt)||0,0,.1);this.time+=dt;stepWeather(this.weather,dt);const now=this.time,threats=[dog,...animals,...(this.level.helpers||[])].filter(Boolean);
  for(const a of this.wildlife){stepWildlife(this.level,a,dt,threats,now,this.weather);if(!a.visible||a.hidden){this.hideParts(a);continue;}const flying=a.kind==='bird'||a.kind==='butterfly',squirrel=a.kind==='squirrel',rabbit=a.kind==='rabbit';const gaitPhase=((a.gait||0)%1+1)%1,airborne=gaitPhase<.54,hop=rabbit&&a.moving&&airborne?Math.sin(gaitPhase/.54*Math.PI)*.24:squirrel&&a.moving?Math.abs(Math.sin(gaitPhase*Math.PI*2))*.1:0,visibility=Math.max(.06,1-(a.shelter||0)*.94),y=(squirrel?.12:rabbit?.04:flying?3.2:1)+terrainHeight(this.level,a.x,a.z)+(flying?Math.sin(now*(a.kind==='bird'?1.5:2)+a.phase)*.28:hop)+(a.alert?.08:0);
   if(squirrel||rabbit){
    const crouch=rabbit&&!airborne?.9:1,hopPitch=rabbit&&airborne?-.14*Math.sin(gaitPhase/.54*Math.PI):0;
    const bodyRoll=squirrel&&a.moving?Math.sin(gaitPhase*Math.PI*2)*.06:0;
    this.pose(this.batches[`${a.kind}Body`],a.slot,a.x,y,a.z,visibility,visibility*crouch,visibility,a.heading,bodyRoll,hopPitch);
    const paws=wildlifeParts[a.kind].filter(part=>part.part==='paw');
    for(let j=0;j<paws.length;j++){const p=paws[j],gait=a.moving?(rabbit&&airborne?Math.sin(gaitPhase/.54*Math.PI)*.08:Math.sin(gaitPhase*Math.PI*2+([0,Math.PI,Math.PI,0][j]))*.07):0,localX=p.at[0]*visibility,localZ=p.at[2]*visibility,x=a.x+Math.cos(a.heading)*localX+Math.sin(a.heading)*localZ,z=a.z-Math.sin(a.heading)*localX+Math.cos(a.heading)*localZ;this.pose(this.batches[`${a.kind}Paw`],a.slot*paws.length+j,x,y+p.at[1]*visibility+gait,z,p.scale[0]*visibility,p.scale[1]*visibility,p.scale[2]*visibility,a.heading);}
   }
   else{this.pose(this.batches[`${a.kind}Body`],a.slot,a.x,y,a.z,(a.kind==='bird'?.09:.075)*visibility,(a.kind==='bird'?.08:.06)*visibility,(a.kind==='bird'?.28:.12)*visibility,a.heading);for(let side=0;side<2;side++){const flap=Math.sin(now*(a.kind==='bird'?11:18)+a.phase)*(a.kind==='bird'?.5:.85);this.pose(this.batches[`${a.kind}Wing`],a.slot*2+side,a.x+(side?1:-1)*.15,y+.04,a.z,.22*visibility,.025*visibility,.16*visibility,a.heading,(side?1:-1)*flap);}}
  }
  for(const m of Object.values(this.batches))m.instanceMatrix.needsUpdate=true;
  this.rainView?.update(dt,{weather:this.weather,camera,paused});
 }
 dispose(){this.clear();this.scene.remove(this.root);this.level=null;}
}

