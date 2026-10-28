import { CONFIG_CONTRACTS } from './config/contracts.js';
import settings from './config/presentation.json' with { type: 'json' };
import { resolveConfig } from './config/resolve.js';
const PRESENTATION=resolveConfig(settings, 'presentation', CONFIG_CONTRACTS.presentation);
if (PRESENTATION.camera.near >= PRESENTATION.camera.far) throw new RangeError('presentation.camera: near must be below far');
if (PRESENTATION.renderer.fogNear >= PRESENTATION.renderer.fogFar) throw new RangeError('presentation.renderer: fogNear must be below fogFar');


import { updateAnimalTurn, animalGaitSpeed } from './animal-turn.js';
import { updateGrazing, grazingAngle } from './grazing.js';
import * as THREE from 'three';
import { animalScale } from './animal-size.js';
import { generateBushClusters } from './vegetation.js';
import { setTailLightBarking } from './tail-light.js';
import { WaterEffects } from './water-effects.js';
import { MeadowNature } from './nature.js';
import { createGateView, createStoneWallView } from './gate-view.js';
import { StructureCutaway } from './cutaway.js';
import { ThrusterGroundGlow } from './thruster-glow.js';
import { terrainHeight, targetFootprint, gateSegment, canOccupy } from './world.js';
import { goalSurface, goalOutline, drawGoalMap } from './goal-view.js';
import { minimapProjection, clipMinimap, minimapLivestockStates, drawLivestockMarker, drawGoalDirection } from './minimap-markers.js';
import { ribbon, roadNetwork, createRoadMaterial, barkSurface } from './surfaces.js';
import { createAnimalGestureGeometry, createPip, updatePipPose, updatePipHover, createBuddy, createAnimal, createCowCoatMaterial, cowCoatVariant, createDrone, createTree, treeTrunkFactor, createBush, createBridge, createFlowerPatch, createMaterials } from './models.js';

function rng(seed){let s=seed;return()=>{s=(s*1664525+1013904223)>>>0;return s/4294967296;};}
// Tileable hand-painted surface: broad meadow patches, fine blades and soil grains.
function texture(kind,bump=false){
  const canvas=document.createElement('canvas');canvas.width=canvas.height=512;
  const ctx=canvas.getContext('2d'),random=rng(kind==='grass'?83:193);
  ctx.fillStyle=bump?'#909090':kind==='grass'?'#779c4d':'#b79763';ctx.fillRect(0,0,512,512);
  for(let i=0;i<90;i++){
    const x=random()*512,y=random()*512,radius=12+random()*57;
    ctx.fillStyle=bump?['#858585','#999999','#aaaaaa'][i%3]:kind==='grass'?['#92ad56','#4f854a','#bdba67','#6a964d'][i%4]:['#c9ad78','#9c8055','#ddc18e'][i%3];ctx.globalAlpha=.08;
    // Repeat edge splashes so the tile has no seam.
    for(const ox of [-512,0,512])for(const oy of [-512,0,512]){ctx.beginPath();ctx.ellipse(x+ox,y+oy,radius,radius*.6,0,0,Math.PI*2);ctx.fill();}
  }
  for(let i=0;i<7200;i++){
    const x=random()*512,y=random()*512;
    ctx.fillStyle=bump?['#777777','#bbbbbb','#dddddd'][i%3]:kind==='grass'?['#496f39','#9eb568','#d0c480','#789b4b'][i%4]:['#826b48','#e4c995','#b99a6a'][i%3];
    ctx.globalAlpha=.14+random()*.25;ctx.beginPath();ctx.ellipse(x,y,.35+random()*.85,kind==='grass'?1.2+random()*3.8:.3+random()*1.4,random()*Math.PI,0,Math.PI*2);ctx.fill();
  }
  ctx.globalAlpha=1;const t=new THREE.CanvasTexture(canvas);if(!bump)t.colorSpace=THREE.SRGBColorSpace;t.wrapS=t.wrapT=THREE.RepeatWrapping;return t;
}
function segmentDistanceSquared(x,z,a,b){const dx=b.x-a.x,dz=b.z-a.z,t=Math.max(0,Math.min(1,((x-a.x)*dx+(z-a.z)*dz)/(dx*dx+dz*dz||1))),px=x-a.x-t*dx,pz=z-a.z-t*dz;return px*px+pz*pz;}
function segmentDistance(x,z,a,b){return Math.sqrt(segmentDistanceSquared(x,z,a,b));}
function lineDistance(x,z,points){let d=Infinity;for(let i=1;i<points.length;i++)d=Math.min(d,segmentDistanceSquared(x,z,points[i-1],points[i]));return Math.sqrt(d);}
function label(text,color='#45684d'){
  const c=document.createElement('canvas');c.width=512;c.height=128;const x=c.getContext('2d');
  x.fillStyle='#faf6e9';x.beginPath();x.roundRect(8,12,496,98,35);x.fill();x.fillStyle=color;x.font='bold 34px sans-serif';x.textAlign='center';x.fillText(text,256,76);
  const t=new THREE.CanvasTexture(c);t.colorSpace=THREE.SRGBColorSpace;const s=new THREE.Sprite(new THREE.SpriteMaterial({map:t,depthTest:false}));s.scale.set(6,1.5,1);return s;
}

export class MeadowRenderer{
  constructor(canvas){
    this.renderer=new THREE.WebGLRenderer({canvas,antialias:true,powerPreference:'high-performance'});
    this.renderer.setPixelRatio(Math.min(devicePixelRatio,PRESENTATION.renderer.pixelRatioCap));this.renderer.shadowMap.enabled=true;this.renderer.shadowMap.type=THREE.PCFSoftShadowMap;
    this.renderer.outputColorSpace=THREE.SRGBColorSpace;this.renderer.toneMapping=THREE.ACESFilmicToneMapping;this.renderer.toneMappingExposure=PRESENTATION.renderer.exposure;
    this.scene=new THREE.Scene();this.scene.background=new THREE.Color(PRESENTATION.lighting.skyDay);this.scene.fog=new THREE.Fog(PRESENTATION.lighting.skyDay,PRESENTATION.renderer.fogNear,PRESENTATION.renderer.fogFar);
    this.hemisphere=new THREE.HemisphereLight(PRESENTATION.lighting.hemisphereSky,PRESENTATION.lighting.hemisphereGround,PRESENTATION.lighting.hemisphereIntensity);this.scene.add(this.hemisphere);this.skyDay=new THREE.Color(PRESENTATION.lighting.skyDay);this.skyStorm=new THREE.Color(PRESENTATION.lighting.skyStorm);
    this.sun=new THREE.DirectionalLight(PRESENTATION.lighting.sunColor,PRESENTATION.lighting.sunIntensity);this.sun.position.set(...PRESENTATION.lighting.sunOffset);this.sun.castShadow=true;
    this.sun.shadow.mapSize.set(PRESENTATION.renderer.shadowMapSize,PRESENTATION.renderer.shadowMapSize);Object.assign(this.sun.shadow.camera,{left:-30,right:30,top:30,bottom:-30,near:1,far:100});this.sun.shadow.camera.updateProjectionMatrix();this.sun.shadow.bias=PRESENTATION.lighting.shadowBias;this.sun.shadow.normalBias=PRESENTATION.lighting.shadowNormalBias;this.scene.add(this.sun,this.sun.target);
    this.camera=new THREE.OrthographicCamera(-30,30,20,-20,PRESENTATION.camera.near,PRESENTATION.camera.far);this.center=new THREE.Vector3(-7,0,0);this.targetCenter=this.center.clone();
    this.terrain=new THREE.Group();this.actors=new THREE.Group();this.scene.add(this.terrain,this.actors);this.materials=createMaterials();
    this.grass=new THREE.MeshStandardMaterial({color:'#ffffff',roughness:.96,map:texture('grass'),bumpMap:texture('grass',true),bumpScale:.12});
    this.path=new THREE.MeshStandardMaterial({color:'#fff1d3',roughness:.95,map:texture('path'),bumpMap:texture('path',true),bumpScale:.08,side:THREE.DoubleSide});this.pathShoulder=new THREE.MeshStandardMaterial({color:'#a99261',roughness:1,transparent:true,opacity:.36,depthWrite:false,side:THREE.DoubleSide});
    this.thrusterGlow=new ThrusterGroundGlow();
    for(const material of [this.grass,this.path,this.pathShoulder])this.thrusterGlow.install(material);
    this.water=new THREE.MeshStandardMaterial({color:'#4b9fae',roughness:.29,metalness:.08,side:THREE.DoubleSide});
    this.targetMat=new THREE.MeshBasicMaterial({color:'#ffe8a0',transparent:true,opacity:.56,depthWrite:false,side:THREE.DoubleSide});
    // Fence parts stay shared across worlds, just like cached animal geometry.
    this.fenceParts=[
      new THREE.Mesh(new THREE.CylinderGeometry(.075,.075,.92,10),this.materials.paleWood),
      new THREE.Mesh(new THREE.SphereGeometry(1,8,6),this.materials.paleWood),
      new THREE.Mesh(new THREE.BoxGeometry(1,.105,.085),this.materials.wood)
    ];
    this.sceneryBatches=[];this.sceneryFrustum=new THREE.Frustum();this.viewMatrix=new THREE.Matrix4();
    this.animalMeshes=[];this.animalBatches=[];this.helperMeshes=new Map();this.resize();this.preview=true;this.particles=[];this.nature=new MeadowNature(this.scene);this.waterEffects=new WaterEffects(this.scene);
  }
  resize(){this.width=innerWidth;this.height=innerHeight;this.renderer.setSize(this.width,this.height,false);this.aspect=this.width/this.height;}
  place(group,x,z,scale=1,owned=false){group.position.set(x,0,z);group.scale.multiplyScalar(scale);group.traverse(o=>{if(o.userData.treeWidth!==undefined){o.userData.treeWidth=treeTrunkFactor(scale);o.material.userData.treeWidth.value=o.userData.treeWidth;}});if(owned)group.traverse(o=>{if(o.isMesh)o.userData.ownedGeometry=true;});this.terrain.add(group);return group;}
  flat(geometry,material,x,z,y=.02){const mesh=new THREE.Mesh(geometry,material);mesh.rotation.x=-Math.PI/2;mesh.position.set(x,y,z);mesh.receiveShadow=true;this.terrain.add(mesh);return mesh;}
  setLevel(level){
    this.level=level;this.barkEffects=[];
    this.waterEffects.restoreMaterials();
    this.cutaway?.dispose();this.cutaway=null;
    this.gateView?.dispose();this.gateView?.removeFromParent();this.stoneView?.dispose();this.stoneView?.removeFromParent();this.gateView=this.stoneView=null;
    // Level replacement disposes only tagged, level-owned resources. Shared
    // cached model geometry/materials remain valid for the next meadow.
    const geometries=new Set(),materials=new Set();
    for(const parent of [this.terrain,this.actors])parent.traverse(o=>{if(o.userData.ownedGeometry)geometries.add(o.geometry);if(o.userData.ownedMaterial)materials.add(o.material);if(o.userData.ownedLabel){o.material.map.dispose();materials.add(o.material);}if(o.isInstancedMesh)o.dispose();});
    geometries.forEach(g=>g?.dispose());materials.forEach(m=>m?.dispose());
    this.terrain.clear();this.actors.clear();this.sceneryBatches=[];this.helperMeshes.clear();this.animalMeshes=[];this.animalBatches=[];this.particles=[];
    // Orientation has its own stream so scenery positions and palette draws stay stable.
    const b=level.bounds,w=b.maxX-b.minX,d=b.maxZ-b.minZ,r=rng(level.seed),treeRotation=rng(level.seed^0x746565),cx=(b.maxX+b.minX)/2,cz=(b.maxZ+b.minZ)/2;
    const ground=this.flat(new THREE.PlaneGeometry(w+90,d+90,1,1),this.grass,cx,cz,-.035);ground.userData.ownedGeometry=true;
    this.grass.map.repeat.set((w+90)/15,(d+90)/15);this.grass.bumpMap.repeat.copy(this.grass.map.repeat);
    if(level.boundary?.length>4){
      // The field follows collision geometry, while both sides share the same
      // grass shader, world-aligned texture and weather response.
      const outline=new THREE.Shape();level.boundary.forEach((p,i)=>i?outline.lineTo(p.x,-p.z):outline.moveTo(p.x,-p.z));outline.closePath();
      const geometry=new THREE.ShapeGeometry(outline);geometry.rotateX(-Math.PI/2);
      const positions=geometry.attributes.position,uv=geometry.attributes.uv;
      for(let i=0;i<positions.count;i++)uv.setXY(i,(positions.getX(i)-cx)/(w+90)+.5,.5-(positions.getZ(i)-cz)/(d+90));
      const meadow=new THREE.Mesh(geometry,this.grass);meadow.name='playable-meadow';meadow.position.y=-.025;meadow.receiveShadow=true;meadow.userData.ownedGeometry=true;this.terrain.add(meadow);
    }
    for(const spec of level.sceneryHills||[]){
      const hill=new THREE.Mesh(new THREE.SphereGeometry(1,20,12),new THREE.MeshStandardMaterial({color:['#799552','#6f914e','#93a75d'][Math.floor(r()*3)],roughness:1}));
      hill.position.set(spec.x,-.3,spec.z);hill.scale.set(spec.radius,spec.height,spec.radius);hill.userData.ownedGeometry=hill.userData.ownedMaterial=true;this.terrain.add(hill);
    }
    const surface=(g,m)=>{const mesh=new THREE.Mesh(g,m);mesh.receiveShadow=true;mesh.userData.ownedGeometry=true;this.terrain.add(mesh);return mesh;};
    const roadCore=level.roads.length?createRoadMaterial(this.path):null,roadShoulder=level.roads.length?createRoadMaterial(this.pathShoulder):null;
    if(level.roads.length){
      surface(roadNetwork(level.roads,{widthExtra:.65,ragged:true,y:.003,seed:level.seed+5}),roadShoulder).userData.ownedMaterial=true;
      surface(roadNetwork(level.roads,{ragged:true,y:.007,seed:level.seed}),roadCore).userData.ownedMaterial=true;
    }
    const riverViews=[];
    for(const river of level.rivers){
      const bankMat=new THREE.MeshStandardMaterial({color:'#6c8960',roughness:1,side:THREE.DoubleSide});
      this.thrusterGlow.install(bankMat);
      const bank=surface(ribbon(river.points,river.width+.8,{y:.002}),bankMat);bank.userData.ownedMaterial=true;
      const mesh=surface(ribbon(river.points,river.width,{y:.018}),this.water);
      const a=river.points[0],b=river.points.at(-1);riverViews.push({mesh,points:river.points,width:river.width,heading:Math.atan2(b.x-a.x,b.z-a.z)});
      for(const bridge of river.bridges){
        const g=createBridge(bridge.width,bridge.length),glowMaterials=new Map();
        // Bridge wood is shared with fences: keep this surface effect local.
        g.traverse(mesh=>{if(!mesh.isMesh)return;const source=mesh.material;
          if(!glowMaterials.has(source))glowMaterials.set(source,this.thrusterGlow.install(source.clone()));
          mesh.material=glowMaterials.get(source);mesh.userData.ownedMaterial=true;
        });
        g.rotation.y=bridge.heading;this.place(g,bridge.x,bridge.z,1,true);
      }
    }
    const t=level.target,shape=targetFootprint(t),s=shape.halfLength,structure=[];
    this.goal=surface(goalSurface(t),this.targetMat);
    this.goalOutline=surface(goalOutline(t),new THREE.MeshBasicMaterial({color:'#fff0b5',side:THREE.DoubleSide}));this.goalOutline.userData.ownedMaterial=true;
    this.goalFloor=null;
    const beam=(a,b,height,thickness,mat,coverSide)=>{const length=Math.hypot(b.x-a.x,b.z-a.z),mesh=new THREE.Mesh(new THREE.BoxGeometry(length,height,thickness),mat);mesh.position.set((a.x+b.x)/2,height/2,(a.z+b.z)/2);mesh.rotation.y=-Math.atan2(b.z-a.z,b.x-a.x);mesh.castShadow=mesh.receiveShadow=true;mesh.userData.ownedGeometry=true;if(coverSide)mesh.userData.coverSide=coverSide;this.terrain.add(mesh);return mesh;};
    // Every visible blocking perimeter, gate and destination segment comes from
    // the same world objects as collision: no fake scenery walls in play space.
    for(const segment of level.fenceSegments||[]){
      if(segment.material==='stone')continue;
      const {a,b,kind}=segment,len=Math.hypot(b.x-a.x,b.z-a.z);
      if(kind==='target'&&t.type==='barn'){
        // Segmented clay walls share a cutaway state for each facing side.
        const count=Math.ceil(len/3);
        for(let i=0;i<count;i++){
          const start={x:a.x+(b.x-a.x)*i/count,z:a.z+(b.z-a.z)*i/count},end={x:a.x+(b.x-a.x)*(i+1)/count,z:a.z+(b.z-a.z)*(i+1)/count};
          const dx=(start.x+end.x)/2-t.x,dz=(start.z+end.z)/2-t.z,c=Math.cos(t.heading||0),sn=Math.sin(t.heading||0),lx=dx*c-dz*sn,lz=dx*sn+dz*c;
          const coverSide=Math.abs(Math.abs(lx)-s)<Math.abs(Math.abs(lz)-s)?(lx>=0?'+x':'-x'):(lz>=0?'+z':'-z');
          structure.push(beam(start,end,2.4,.22,this.materials.barn,coverSide));
          const trim=beam(start,end,.14,.25,this.materials.barnTrim,coverSide);trim.position.y=2.35;structure.push(trim);
        }
      }else if(kind==='target'&&t.type==='field'){
        // Visible low fence defines the exact collision line; plants soften it.
        this.placeFence(a,b);
        const steps=Math.ceil(len/1.4);for(let i=0;i<steps;i++)this.place(createBush(i),a.x+(b.x-a.x)*(i+.5)/steps,a.z+(b.z-a.z)*(i+.5)/steps,.75);
      }else this.placeFence(a,b);
    }
    this.gateView=createGateView(level.gates);this.stoneView=createStoneWallView(level.fenceSegments);this.terrain.add(this.gateView,this.stoneView);
    if(t.type==='barn'){
      this.goalFloor=surface(goalSurface(t,.013),this.path);
      // One continuous sheet: thick overlapping panels would accumulate alpha
      // at their ridge, seam faces and undersides during the cutaway. Shallow
      // grooves retain the clay boards without adding another transparent layer.
      const extent=s+.3,rows=Math.ceil(s*2/2.4),depth=extent*2/rows;
      const zs=[-extent];
      for(let i=1;i<rows;i++){const z=-extent+i*depth;zs.push(z-.045,z,z+.045);}
      zs.push(extent);
      const positions=[],uvs=[],indices=[],ridge=3.29+s*.5*Math.tan(.21);
      for(let j=0;j<zs.length;j++)for(const x of [-extent,0,extent]){
        const groove=j>0&&j<zs.length-1&&(j-2)%3===0?.025:0;
        positions.push(x,ridge-Math.abs(x)*Math.tan(.21)-groove,zs[j]);
        uvs.push((x+extent)/2.4,(zs[j]+extent)/2.4);
      }
      for(let j=0;j<zs.length-1;j++)for(let i=0;i<2;i++){
        const a=j*3+i,b=a+3;indices.push(a,b,a+1,a+1,b,b+1);
      }
      const roofGeometry=new THREE.BufferGeometry();
      roofGeometry.setAttribute('position',new THREE.Float32BufferAttribute(positions,3));
      roofGeometry.setAttribute('uv',new THREE.Float32BufferAttribute(uvs,2));
      roofGeometry.setIndex(indices);roofGeometry.computeVertexNormals();
      const roof=new THREE.Mesh(roofGeometry,this.materials.roof);
      roof.name='barn-roof';roof.castShadow=true;roof.userData.ownedGeometry=true;roof.userData.coverKind='roof';
      roof.position.set(t.x,0,t.z);roof.rotation.y=t.heading||0;this.terrain.add(roof);structure.push(roof);
      this.cutaway=new StructureCutaway(t,structure,{halfExtent:s+.3});
    }
    const sign=label(t.type==='pen'?'SUNNY PEN':t.type==='barn'?'HOME BARN':'CLOVER FIELD');sign.scale.set(4.5,1.125,1);sign.position.set(t.x-Math.sin(t.heading||0)*(s+1),3,t.z-Math.cos(t.heading||0)*(s+1));sign.name='Destination introduction';sign.userData.ownedLabel=true;this.destinationSign=sign;this.terrain.add(sign);
    for(const obstacle of level.obstacles){
      const treeScale=obstacle.radius*1.45;const tree=createTree(Math.floor(r()*3),treeScale<1.7?0:treeScale<2.4?1:2);tree.rotation.y=treeRotation()*Math.PI*2;this.place(tree,obstacle.x,obstacle.z,treeScale);
      // A rounded root hedge shows the otherwise invisible tree collision disk.
      for(let i=0;i<4;i++){const angle=i*Math.PI/2;this.place(createBush(i),obstacle.x+Math.cos(angle)*obstacle.radius*.48,obstacle.z+Math.sin(angle)*obstacle.radius*.48,obstacle.radius*.7);}
    }
    const meadowClear=(x,z,padding=0)=>x>b.minX+padding&&x<b.maxX-padding&&z>b.minZ+padding&&z<b.maxZ-padding&&(!(level.boundary?.length>4)||canOccupy(level,x,z,padding))&&!level.rivers.some(v=>lineDistance(x,z,v.points)<v.width/2+padding+.5)&&!level.roads.some(v=>lineDistance(x,z,v.points)<v.width/2+padding+.35)&&Math.hypot(x-t.x,z-t.z)>t.radius+padding+2&&!level.obstacles.some(o=>Math.hypot(x-o.x,z-o.z)<o.radius+padding)&&!(level.fenceSegments||[]).some(v=>segmentDistance(x,z,v.a,v.b)<padding+.7);
    // Spend the same detail budget beside winding routes, including wide maps.
    // Sampling by arc length avoids concentrating patches at dense curve points.
    const routeSegments=[];let routeLength=0;
    for(const road of level.roads)for(let i=1;i<road.points.length;i++){
      const a=road.points[i-1],b=road.points[i],length=Math.hypot(b.x-a.x,b.z-a.z);
      if(length){routeLength+=length;routeSegments.push({a,b,length,end:routeLength,width:road.width});}
    }
    const candidate=(i,count)=>{
      if(i<count*.7&&routeLength){
        const distance=(i/(count*.7)+r()/(count*.7))*routeLength;
        const segment=routeSegments.find(v=>v.end>=distance)||routeSegments[routeSegments.length-1];
        const t=(distance-segment.end+segment.length)/segment.length,dx=(segment.b.x-segment.a.x)/segment.length,dz=(segment.b.z-segment.a.z)/segment.length;
        const offset=(segment.width/2+1.1+r()*2.8)*(i%2?1:-1);
        return {x:segment.a.x+dx*t*segment.length-dz*offset,z:segment.a.z+dz*t*segment.length+dx*offset};
      }
      return {x:b.minX+2+r()*(w-4),z:b.minZ+2+r()*(d-4)};
    };
    this.meadowDetails=[];
    const patches=Math.min(190,Math.ceil(w*d/130));
    for(let i=0;i<patches;i++){const {x,z}=candidate(i,patches);if(meadowClear(x,z,1)){this.place(createFlowerPatch(i,3),x,z,.85+r()*.6);this.meadowDetails.push({x,z,kind:'flower'});}}
    const tufts=[],tuftBudget=Math.min(650,Math.ceil(w*d/35));
    for(let i=0;i<tuftBudget;i++){const {x,z}=candidate(i,tuftBudget);if(meadowClear(x,z,.4)){tufts.push({x,z});this.meadowDetails.push({x,z,kind:'tuft'});}}
    // Decorative blades draw over opaque ground without claiming its depth.
    // Bark draws after them, while fences/rails retain ordinary depth occlusion.
    if(tufts.length){const blade=new THREE.ConeGeometry(.12,.55,3),bladeMat=new THREE.MeshStandardMaterial({color:'#648844',roughness:1,transparent:true,opacity:1,depthWrite:false}),grass=new THREE.InstancedMesh(blade,bladeMat,tufts.length),pose=new THREE.Object3D();tufts.forEach((p,i)=>{pose.position.set(p.x,.18,p.z);pose.scale.set(.7+r()*.6,.55+r()*.8,.7+r()*.6);pose.rotation.y=r()*Math.PI;pose.updateMatrix();grass.setMatrixAt(i,pose.matrix);});grass.receiveShadow=true;grass.userData.decorativeGrass=true;grass.userData.ownedGeometry=grass.userData.ownedMaterial=true;this.terrain.add(grass);this.trackScenery(grass);}
    // Thin reeds follow the exact banks and leave crossing entrances clear.
    const reeds=[];for(const river of level.rivers)for(let i=2;i<river.points.length-2;i+=5){const p=river.points[i],next=river.points[i+1],dx=next.x-p.x,dz=next.z-p.z,l=Math.hypot(dx,dz)||1;for(const side of [-1,1]){const x=p.x-dz/l*(river.width/2+.65)*side,z=p.z+dx/l*(river.width/2+.65)*side;if(x>b.minX&&x<b.maxX&&z>b.minZ&&z<b.maxZ&&!river.bridges.some(v=>Math.hypot(x-v.x,z-v.z)<v.length/2+v.width))reeds.push({x,z});}}
    if(reeds.length){const geo=new THREE.ConeGeometry(.18,.95,4),mat=new THREE.MeshStandardMaterial({color:'#5b7951',roughness:1}),batch=new THREE.InstancedMesh(geo,mat,reeds.length),pose=new THREE.Object3D();reeds.forEach((p,i)=>{pose.position.set(p.x,.4,p.z);pose.rotation.z=(r()-.5)*.25;pose.updateMatrix();batch.setMatrixAt(i,pose.matrix);});batch.userData.ownedGeometry=batch.userData.ownedMaterial=true;this.terrain.add(batch);this.trackScenery(batch);}
    const sceneryCount=Math.min(62,28+Math.floor(level.index/3));for(let i=0;i<sceneryCount;i++){
      let x,z;const side=i%4;
      if(side<2){x=b.minX-12+r()*(w+24);z=side===0?b.minZ-4-r()*17:b.maxZ+4+r()*17;}else{x=side===2?b.minX-5-r()*18:b.maxX+5+r()*18;z=b.minZ+r()*d;}
      if(level.rivers.some(v=>lineDistance(x,z,v.points)<v.width/2+3))continue;const treeScale=1.3+r()*1.8;const tree=createTree(i%3,treeScale<1.7?0:treeScale<2.4?1:2);tree.rotation.y=treeRotation()*Math.PI*2;this.place(tree,x,z,treeScale);
    }
    this.bushPlacements=generateBushClusters(level);for(const b of this.bushPlacements)this.place(createBush(b.variant),b.x,b.z,b.scale);
    this.nature.setLevel(level);
    this.waterEffects.setLevel(level,{grassMaterials:[this.grass],pathMaterials:[this.path,roadCore],waterMaterial:this.water,terrain:this.terrain,rivers:riverViews,weather:this.nature.weather});
    this.batchScenery();
    this.dog=createPip();this.dog.scale.setScalar(1.35*.75);this.actors.add(this.dog);
    const halo=new THREE.Mesh(new THREE.RingGeometry(.82,.95,40),new THREE.MeshBasicMaterial({color:'#fff0bb',transparent:true,opacity:.9,side:THREE.DoubleSide,depthWrite:false}));halo.scale.setScalar(1/.75);halo.rotation.x=-Math.PI/2;halo.position.y=.03/.75;halo.userData.ownedGeometry=halo.userData.ownedMaterial=true;this.dog.add(halo);
    const arrowShape=new THREE.Shape();arrowShape.moveTo(0,1.45);arrowShape.lineTo(-.19,1.05);arrowShape.lineTo(.19,1.05);arrowShape.closePath();
    this.goalPointer=new THREE.Mesh(new THREE.ShapeGeometry(arrowShape),new THREE.MeshBasicMaterial({color:'#be8652',side:THREE.DoubleSide,depthWrite:false}));
    this.goalPointer.scale.setScalar(1/.75);this.goalPointer.rotation.x=Math.PI/2;this.goalPointer.userData.ownedGeometry=this.goalPointer.userData.ownedMaterial=true;this.dog.add(this.goalPointer);
    for(const a of level.animals){const pose=new THREE.Object3D();pose.position.set(a.x,0,a.z);pose.rotation.y=a.heading??Math.PI/2;pose.scale.setScalar(animalScale(a));this.animalMeshes.push(pose);}
    for(const type of ['sheep','cow']){
      const indices=level.animals.flatMap((a,i)=>a.type===type?[i]:[]);if(!indices.length)continue;
      const prototype=createAnimal(type),meshes=[];let radius=0;
      const coats=[];
      for(const child of prototype.children){
        if(!child.geometry.boundingSphere)child.geometry.computeBoundingSphere();
        const sphere=child.geometry.boundingSphere,pivot=child.userData.pivot;
        // A sphere about the animal origin includes every baked body piece and
        // the full rotation envelope of each leg around its retained hip pivot.
        radius=Math.max(radius,sphere.center.length()+sphere.radius+(pivot?Math.hypot(...pivot):0));
        if(child.material.userData.cowCoatVariant!==undefined){
          for(let variant=0;variant<4;variant++){
            const coatIndices=indices.filter(index=>cowCoatVariant(level.seed,level.animals[index].id??index)===variant);
            if(!coatIndices.length)continue;
            const instanced=new THREE.InstancedMesh(child.geometry,createCowCoatMaterial(variant),coatIndices.length);
            instanced.instanceMatrix.setUsage(THREE.DynamicDrawUsage);instanced.castShadow=instanced.receiveShadow=true;instanced.frustumCulled=false;
            this.actors.add(instanced);coats.push({indices:coatIndices,meshes:[instanced],visibleIndices:[],coatVariant:variant});
          }
          continue;
        }
        const rigGeometry=child.geometry.userData.animalRig?createAnimalGestureGeometry(child.geometry,indices.length):child.geometry;
        const instanced=new THREE.InstancedMesh(rigGeometry,child.material,indices.length);instanced.instanceMatrix.setUsage(THREE.DynamicDrawUsage);instanced.castShadow=instanced.receiveShadow=true;instanced.frustumCulled=false;instanced.userData={...child.userData,ownedGeometry:Boolean(rigGeometry.userData.animalGestureWrapper)};this.actors.add(instanced);meshes.push(instanced);
      }
      this.animalBatches.push({indices,meshes,radius,visibleIndices:[]},...coats.map(batch=>({...batch,radius})));
    }
    this.center.set(level.spawn.x+(this.aspect<PRESENTATION.camera.portraitAspect?PRESENTATION.camera.previewPortraitOffsetX:PRESENTATION.camera.previewLandscapeOffsetX),0,level.spawn.z+PRESENTATION.camera.previewOffsetZ);this.time=0;this.update(level,level.dog,0,true);
  }
  placeFence(a,b){
    const length=Math.hypot(b.x-a.x,b.z-a.z),sections=Math.max(1,Math.ceil(length/1.8)),group=new THREE.Group();
    group.position.set((a.x+b.x)/2,0,(a.z+b.z)/2);group.rotation.y=-Math.atan2(b.z-a.z,b.x-a.x);
    const add=(part,x,y,sx=1,sy=1,sz=1)=>{const mesh=this.fenceParts[part].clone();mesh.position.set(x,y,0);mesh.scale.set(sx,sy,sz);mesh.userData.fencePart=true;group.add(mesh);};
    for(let i=0;i<=sections;i++){const x=-length/2+i*length/sections;add(0,x,.46);add(1,x,.94,.083,.065,.083);}
    // Short collinear rails preserve the collision line and allow view culling.
    for(let i=0;i<sections;i++)for(const y of [.34,.69])add(2,-length/2+(i+.5)*length/sections,y,length/sections+.03);
    this.terrain.add(group);
  }
  trackScenery(batch){
    // Three.js culls an InstancedMesh as one sphere. Keep immutable poses and
    // per-instance bounds, then submit only nearby instances in each frame.
    const matrices=batch.instanceMatrix.array.slice(),bounds=new Float32Array(batch.count*4),matrix=new THREE.Matrix4(),sphere=new THREE.Sphere();
    if(!batch.geometry.boundingSphere)batch.geometry.computeBoundingSphere();
    for(let i=0;i<batch.count;i++){
      matrix.fromArray(matrices,i*16);sphere.copy(batch.geometry.boundingSphere).applyMatrix4(matrix);
      bounds.set([sphere.center.x,sphere.center.y,sphere.center.z,sphere.radius],i*4);
    }
    batch.instanceMatrix.setUsage(THREE.DynamicDrawUsage);batch.frustumCulled=false;
    const widths=batch.geometry.attributes.treeInstanceWidth?.array.slice();
    this.sceneryBatches.push({batch,matrices,bounds,widths});
  }
  batchScenery(){
    this.terrain.updateMatrixWorld(true);const groups=new Map();
    // Stateful meshes must remain attached to their owner; static batches
    // cannot follow later material swaps such as red/green gate indicators.
    this.terrain.traverse(o=>{if(!o.isMesh||o.isInstancedMesh||o.userData.dynamicScenery||o.userData.ownedGeometry||o.material.transparent)return;const key=`${o.geometry.id}:${o.userData.treeWidth!==undefined?'treeWood':o.material.id}`;if(!groups.has(key))groups.set(key,[]);groups.get(key).push(o);});
    for(const pieces of groups.values()){
      if(pieces.length<2&&pieces[0].userData.treeWidth===undefined)continue;const first=pieces[0],wood=first.userData.treeWidth!==undefined;
      const geometry=wood?first.geometry.clone():first.geometry;
      if(wood)geometry.setAttribute('treeInstanceWidth',new THREE.InstancedBufferAttribute(new Float32Array(pieces.map(piece=>piece.userData.treeWidth)),1).setUsage(THREE.DynamicDrawUsage));
      const batch=new THREE.InstancedMesh(geometry,wood?createMaterials().treeWood:first.material,pieces.length);
      if(wood){batch.userData.ownedGeometry=true;batch.userData.treeWood=true;}
      pieces.forEach((piece,i)=>{batch.setMatrixAt(i,piece.matrixWorld);if(wood&&piece.userData.ownedMaterial)piece.material.dispose();piece.parent.remove(piece);});
      batch.castShadow=!!first.userData.fencePart;batch.receiveShadow=true;this.terrain.add(batch);this.trackScenery(batch);
    }
    // Empty model wrappers no longer need a matrix traversal every frame.
    const empty=[];this.terrain.traverse(o=>{if(o.isGroup&&!o.children.length)empty.push(o);});empty.forEach(o=>o.parent.remove(o));
  }
  cullScenery(){
    this.camera.updateMatrixWorld(true);this.viewMatrix.multiplyMatrices(this.camera.projectionMatrix,this.camera.matrixWorldInverse);this.sceneryFrustum.setFromProjectionMatrix(this.viewMatrix);
    const planes=this.sceneryFrustum.planes;
    for(const {batch,matrices,bounds,widths} of this.sceneryBatches){
      let count=0;
      for(let i=0;i<bounds.length;i+=4){
        // Configured margin retains edge silhouettes and short fence shadows.
        const radius=bounds[i+3]+PRESENTATION.culling.sceneryMargin;
        if(planes.some(p=>p.normal.x*bounds[i]+p.normal.y*bounds[i+1]+p.normal.z*bounds[i+2]+p.constant < -radius))continue;
        batch.instanceMatrix.array.set(matrices.subarray(i*4,i*4+16),count*16);
        if(widths)batch.geometry.attributes.treeInstanceWidth.array[count]=widths[i/4];
        count++;
      }
      batch.count=count;batch.visible=count>0;batch.instanceMatrix.needsUpdate=true;
      batch.instanceMatrix.clearUpdateRanges();if(count)batch.instanceMatrix.addUpdateRange(0,count*16);
      if(widths){const attribute=batch.geometry.attributes.treeInstanceWidth;attribute.needsUpdate=true;attribute.clearUpdateRanges();if(count)attribute.addUpdateRange(0,count);}
    }
  }
  updateAnimalBatches(level,poseTime){
    const planes=this.sceneryFrustum.planes,limbTransform=new THREE.Matrix4(),limbRotation=new THREE.Matrix4(),worldTransform=new THREE.Matrix4();
    for(const batch of this.animalBatches){
      const visible=batch.visibleIndices;visible.length=0;
      // The configured margin keeps offscreen bodies whose short sun shadows
      // can still land in view, and avoid edge popping during a walking pose.
      for(const index of batch.indices){
        const pose=this.animalMeshes[index],position=pose.position,radius=batch.radius*Math.max(Math.abs(pose.scale.x),Math.abs(pose.scale.y),Math.abs(pose.scale.z))+PRESENTATION.culling.animalMargin;
        if(!planes.some(p=>p.normal.x*position.x+p.normal.y*position.y+p.normal.z*position.z+p.constant < -radius))visible.push(index);
      }
      // All body and limb materials share one compacted ordering. Gait phases
      // still use the original animal index, including saved and distant animals.
      visible.forEach((index,i)=>batch.meshes.forEach(m=>{
        const gesture=m.geometry.attributes.animalGesture,poseState=this.animalMeshes[index].userData,herdPose=poseState.herdPose||{};
        if(gesture)gesture.setXYZW(i,herdPose.ear||0,herdPose.tail||0,herdPose.blink||0,herdPose.chew||0);
        if(m.userData.headPart){
          const state=this.animalMeshes[index].userData,pivot=m.userData.pivot;
          limbTransform.makeTranslation(pivot[0],pivot[1]-(state.graze||0)*m.userData.grazeDrop+(herdPose.headLift||0),pivot[2]);
          limbRotation.makeRotationY(herdPose.headYaw||0);limbTransform.multiply(limbRotation);
          limbRotation.makeRotationX(grazingAngle(state,index));limbTransform.multiply(limbRotation);
          worldTransform.multiplyMatrices(this.animalMeshes[index].matrix,limbTransform);m.setMatrixAt(i,worldTransform);return;
        }
        if(m.userData.limbIndex===undefined){m.setMatrixAt(i,this.animalMeshes[index].matrix);return;}
        const a=level.animals[index],limb=m.userData.limbIndex,phase=(limb===0||limb===3)?0:Math.PI,gait=Math.sin(poseTime*12+index*.8+phase)*Math.min(.5,animalGaitSpeed(a,this.animalMeshes[index].userData.turnSpeed)*.15);
        limbTransform.makeTranslation(...m.userData.pivot);limbRotation.makeRotationX(gait);limbTransform.multiply(limbRotation);worldTransform.multiplyMatrices(this.animalMeshes[index].matrix,limbTransform);m.setMatrixAt(i,worldTransform);
      }));
      for(const mesh of batch.meshes){if(mesh.geometry.attributes.animalGesture){mesh.geometry.attributes.animalGesture.needsUpdate=true;mesh.geometry.attributes.animalGesture.clearUpdateRanges();if(visible.length)mesh.geometry.attributes.animalGesture.addUpdateRange(0,visible.length*4);}mesh.count=visible.length;mesh.visible=visible.length>0;mesh.instanceMatrix.needsUpdate=true;mesh.instanceMatrix.clearUpdateRanges();if(visible.length)mesh.instanceMatrix.addUpdateRange(0,visible.length*16);}
    }
  }
  update(level,dog,dt,preview=false){
    this.time+=dt;this.preview=preview;
    // Simulation time advances only during play, so menus freeze this introduction.
    this.destinationSign.material.opacity=preview?1:Math.max(0,Math.min(1,1-((level.time||0)-PRESENTATION.introduction.signHoldSeconds)/PRESENTATION.introduction.signFadeSeconds));
    this.destinationSign.visible=this.destinationSign.material.opacity>0;
    const viewHeight=preview?(this.aspect<PRESENTATION.camera.portraitAspect?PRESENTATION.camera.previewPortraitHeight:PRESENTATION.camera.previewLandscapeHeight):(this.aspect<PRESENTATION.camera.portraitAspect?PRESENTATION.camera.playPortraitHeight:PRESENTATION.camera.playLandscapeHeight);const half=viewHeight/2,halfWidth=half*this.aspect;
    // Center on Pip independently of distant livestock or the goal. The follow
    // offset cancels the camera ground look-at offset in every travel direction.
    const desiredX=preview?level.spawn.x+(this.aspect<PRESENTATION.camera.portraitAspect?PRESENTATION.camera.previewPortraitOffsetX:PRESENTATION.camera.previewLandscapeOffsetX):dog.x;
    const desiredZ=preview?level.spawn.z+PRESENTATION.camera.previewOffsetZ:dog.z+PRESENTATION.camera.followOffsetZ;
    const lerp=preview?Math.min(1,dt*PRESENTATION.camera.previewFollowRate):Math.min(1,dt*PRESENTATION.camera.playFollowRate);this.center.x+=(desiredX-this.center.x)*lerp;this.center.z+=(desiredZ-this.center.z)*lerp;
    if(!preview){
      const marginX=halfWidth*PRESENTATION.camera.lagFraction,marginZ=half*PRESENTATION.camera.lagFraction;
      this.center.x=Math.max(desiredX-marginX,Math.min(desiredX+marginX,this.center.x));
      this.center.z=Math.max(desiredZ-marginZ,Math.min(desiredZ+marginZ,this.center.z));
    }
    this.camera.left=-halfWidth;this.camera.right=halfWidth;this.camera.top=half;this.camera.bottom=-half;this.camera.updateProjectionMatrix();
    this.camera.position.set(this.center.x,PRESENTATION.camera.positionY,this.center.z+PRESENTATION.camera.positionOffsetZ);this.camera.lookAt(this.center.x,0,this.center.z+PRESENTATION.camera.lookOffsetZ);
    this.sun.position.set(this.center.x+PRESENTATION.lighting.sunOffset[0],PRESENTATION.lighting.sunOffset[1],this.center.z+PRESENTATION.lighting.sunOffset[2]);this.sun.target.position.set(this.center.x,0,this.center.z);this.sun.target.updateMatrixWorld();
    this.dog.position.set(dog.x,terrainHeight(level,dog.x,dog.z),dog.z);this.dog.rotation.y=dog.heading??Math.PI/2;
    // Cancel the dog's heading so the triangle always faces the goal in world space.
    this.goalPointer.rotation.set(Math.PI/2,0,0);
    this.goalPointer.quaternion.premultiply(new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(0,1,0),Math.atan2(level.target.x-dog.x,level.target.z-dog.z)-this.dog.rotation.y));
    this.goalPointer.position.y=.04/.75;
    this.goalPointer.visible=!preview;
    const parts=this.dog.userData.parts;
    const poseTime=Math.floor(this.time*12)/12;
    updatePipPose(this.dog,dog,dt);updatePipHover(this.dog,dt);parts.tail.rotation.z=Math.sin(poseTime*7)*.3;
    this.thrusterGlow.update(this.dog,(x,z)=>terrainHeight(level,x,z));
    level.animals.forEach((a,i)=>{const m=this.animalMeshes[i];m.scale.setScalar(animalScale(a));m.position.set(a.x,terrainHeight(level,a.x,a.z)+Math.sin(poseTime*12+i)*Math.min(.07,Math.hypot(a.vx,a.vz)*.025),a.z);updateAnimalTurn(m,a,dt);updateGrazing(m,a,level,dt);m.rotation.z=Math.sin(poseTime*9+i)*Math.min(.055,Math.hypot(a.vx,a.vz)*.02);m.rotation.x=m.userData.herdPose?.weightShift||0;m.updateMatrix();});
    this.updateBarks(dt);
    for(const m of this.helperMeshes.values())m.visible=false;
    for(const h of level.helpers||[]){
      let m=this.helperMeshes.get(h.type);
      if(!m){
        m=h.type==='drone'?createDrone():createBuddy();
        if(h.type==='helper')m.scale.setScalar(this.dog.scale.x*(m.userData.suggestedScale??.82));
        this.helperMeshes.set(h.type,m);this.actors.add(m);
      }
      m.visible=true;m.position.set(h.x,h.type==='drone'?2+Math.sin(this.time*4)*.18:terrainHeight(level,h.x,h.z),h.z);
      if(h.type==='drone')m.userData.parts.propellers.forEach(p=>p.rotation.y=this.time*35);
      else{
        if(Number.isFinite(h.heading))m.rotation.y=h.heading;
        updatePipPose(m,{...h,heading:m.rotation.y},dt);updatePipHover(m,dt);
        m.userData.parts.tail.rotation.z=Math.sin(poseTime*7)*.3;
        setTailLightBarking(m,(this.barkEffects||[]).some(e=>e.buddy));
      }
    }
    // A missing helper must clear its previous illuminated footprints.
    const buddy=(level.helpers||[]).some(h=>h.type==='helper')?this.helperMeshes.get('helper'):null;
    this.thrusterGlow.update(this.dog,(x,z)=>terrainHeight(level,x,z),buddy);
    setTailLightBarking(this.dog,(this.barkEffects||[]).some(e=>!e.buddy));this.gateView?.update();
    this.goal.material.opacity=.38+Math.sin(this.time*2)*.09;
    this.cutaway?.update(this.camera,[dog,...level.animals,...(level.helpers||[]).filter(h=>h.type!=='drone')],dt);
    this.nature.update(dt,{dog,animals:level.animals,camera:this.camera,time:this.time,paused:dt<=0});
    const weather=this.nature.weather;
    this.waterEffects.update(dt,{weather,movers:[{...dog,id:'pip'},...level.animals.map(a=>({...a,id:`flock-${a.id}`})),...(level.helpers||[]).filter(h=>h.type!=='drone').map(h=>({...h,id:`helper-${h.type}`}))],paused:dt<=0});
    this.sun.intensity=PRESENTATION.lighting.sunIntensity*weather.daylight+weather.lightningFlash;this.hemisphere.intensity=PRESENTATION.lighting.hemisphereIntensity*weather.daylight+weather.lightningFlash*PRESENTATION.lighting.hemisphereFlashScale;this.scene.background.copy(this.skyDay).lerp(this.skyStorm,weather.cloudCoverage*PRESENTATION.lighting.stormSkyBlend);this.scene.fog.color.copy(this.scene.background);
    for(const p of this.particles){p.life-=dt;p.mesh.position.addScaledVector(p.velocity,dt);p.velocity.y-=dt*PRESENTATION.effects.particleGravity;p.mesh.rotation.x+=dt*2;p.mesh.scale.setScalar(Math.max(0,p.life));if(p.life<=0){this.actors.remove(p.mesh);p.mesh.geometry.dispose();p.mesh.material.dispose();}}
    this.particles=this.particles.filter(p=>p.life>0);this.cullScenery();this.updateAnimalBatches(level,poseTime);this.renderer.render(this.scene,this.camera);
  }
  celebrate(x,z){for(let i=0;i<PRESENTATION.effects.celebrationParticles;i++){const mesh=new THREE.Mesh(new THREE.BoxGeometry(.12,.12,.05),new THREE.MeshBasicMaterial({color:['#f0b65c','#f8e8ad','#e99585','#80b398'][i%4]}));mesh.userData.ownedGeometry=mesh.userData.ownedMaterial=true;mesh.position.set(x,1.5,z);this.actors.add(mesh);this.particles.push({mesh,velocity:new THREE.Vector3(Math.sin(i*2.4)*3,2+(i%5),Math.cos(i*2.4)*3),life:PRESENTATION.effects.celebrationLifeSeconds});}}
  bark(source){
    if(!source)setTailLightBarking(this.dog,true);
    const origin=source?{x:source.x,z:source.z}:{x:this.dog.position.x,z:this.dog.position.z};
    const mesh=new THREE.Mesh(barkSurface(this.level,origin),new THREE.MeshBasicMaterial({color:'#fff6d8',side:THREE.DoubleSide,transparent:true,opacity:PRESENTATION.effects.barkOpacity,depthTest:true,depthWrite:false}));
    mesh.renderOrder=1;mesh.userData.ownedGeometry=mesh.userData.ownedMaterial=true;this.actors.add(mesh);
    this.barkEffects??=[];this.barkEffects.push({mesh,origin,age:0,buddy:Boolean(source)});
    // Cooldowns normally limit this to one; retain a hard cap for QA/repeated input.
    while(this.barkEffects.length>PRESENTATION.effects.maxBarkRings){const old=this.barkEffects.shift();this.actors.remove(old.mesh);old.mesh.geometry.dispose();old.mesh.material.dispose();}
  }
  updateBarks(dt){
    for(const effect of this.barkEffects||[]){
      if(dt<=0)continue;effect.age+=dt;
      if(effect.age>=PRESENTATION.effects.barkSeconds){this.actors.remove(effect.mesh);effect.mesh.geometry.dispose();effect.mesh.material.dispose();continue;}
      barkSurface(this.level,effect.origin,1+effect.age/PRESENTATION.effects.barkSeconds*PRESENTATION.effects.barkExpansion,effect.mesh.geometry);effect.mesh.material.opacity=PRESENTATION.effects.barkOpacity*(1-effect.age/PRESENTATION.effects.barkSeconds);
    }
    this.barkEffects=(this.barkEffects||[]).filter(effect=>effect.age<PRESENTATION.effects.barkSeconds);
  }
  drawMap(canvas,level,dog){
    const ctx=canvas.getContext('2d'),w=canvas.width,h=canvas.height,world=level.bounds;
    const view=minimapProjection(world,dog,w,h,PRESENTATION.minimap.viewDepth),{scale,project}=view;
    const px=x=>project({x,z:0}).x,pz=z=>project({x:0,z}).y;
    clipMinimap(ctx,w,h);
    const shaped=level.boundary?.length>4;
    ctx.fillStyle=shaped?'#172e25':'#29483a';ctx.fillRect(0,0,w,h);
    if(shaped){
      ctx.save();ctx.beginPath();
      level.boundary.forEach((p,i)=>i?ctx.lineTo(px(p.x),pz(p.z)):ctx.moveTo(px(p.x),pz(p.z)));
      ctx.closePath();ctx.fillStyle='#29483a';ctx.fill();ctx.clip();
    }
    const line=(points,width,color)=>{ctx.lineWidth=width;ctx.strokeStyle=color;ctx.lineCap='round';ctx.lineJoin='round';ctx.beginPath();points.forEach((p,i)=>i?ctx.lineTo(px(p.x),pz(p.z)):ctx.moveTo(px(p.x),pz(p.z)));ctx.stroke();};
    for(const river of level.rivers){line(river.points,river.width*scale,'#35b9ed');for(const bridge of river.bridges){const vx=Math.sin(bridge.heading)*bridge.length/2,vz=Math.cos(bridge.heading)*bridge.length/2;line([{x:bridge.x-vx,z:bridge.z-vz},{x:bridge.x+vx,z:bridge.z+vz}],Math.max(3,bridge.width*scale),'#dfbd8c');}}
    for(const road of level.roads)line(road.points,Math.max(1.5,road.width*scale),'#f0c777');
    drawGoalMap(ctx,level.target,p=>({x:px(p.x),y:pz(p.z)}));
    for(const fence of level.fenceSegments||[])line([fence.a,fence.b],fence.material==='stone'?2:fence.kind==='boundary'?1:1.5,fence.material==='stone'?'#d5d9c9':'#c0a67b');
    for(const gate of level.gates||[])if(gate.operable&&!gate.open){const segment=gateSegment(gate);line([segment.a,segment.b],2.5,'#ffad45');}
    const dot=(x,z,r,c,outline='#183027')=>{ctx.fillStyle=c;ctx.strokeStyle=outline;ctx.lineWidth=1.5;ctx.beginPath();ctx.arc(px(x),pz(z),r,0,Math.PI*2);ctx.fill();ctx.stroke();};
    const states=minimapLivestockStates(level);
    for(const a of level.animals)drawLivestockMarker(ctx,project(a),a,states.get(a));
    // Pip's larger gold marker and separate outer ring distinguish the player from helpers.
    dot(dog.x,dog.z,4.8,'#ffd166');ctx.strokeStyle='#ffe6a3';ctx.lineWidth=2;ctx.beginPath();ctx.arc(px(dog.x),pz(dog.z),7,0,Math.PI*2);ctx.stroke();
    for(const helper of level.helpers||[])dot(helper.x,helper.z,3,'#45d9ef','#102c39');
    if(shaped)ctx.restore();
    drawGoalDirection(ctx,level.target,view);
    ctx.restore();
  }
}

