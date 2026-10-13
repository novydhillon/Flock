import * as THREE from 'three';
import { MeadowNature } from './nature.js';
import { terrainHeight } from './world.js';
import { createDog, createAnimal, createDrone, createTree, createBush, createBridge, createFlowerPatch, createMaterials } from './models.js';

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
// The exact sampled world centerline is also used by collision. Only cosmetic
// road shoulders wander; river banks retain their physical half-width.
function ribbon(points,width,{ragged=false,y=.008,seed=1}={}){
  const positions=[],uvs=[],indices=[],r=rng(seed);let distance=0;
  for(let i=0;i<points.length;i++){
    const p=points[i],prev=points[Math.max(0,i-1)],next=points[Math.min(points.length-1,i+1)];
    const dx=next.x-prev.x,dz=next.z-prev.z,len=Math.hypot(dx,dz)||1,nx=-dz/len,nz=dx/len;
    if(i)distance+=Math.hypot(p.x-prev.x,p.z-prev.z);
    const edge=ragged?Math.sin(distance*.72)*.11+(r()-.5)*.17:0;
    for(const side of [-1,1]){const half=width/2+edge*side;positions.push(p.x+nx*half*side,y,p.z+nz*half*side);uvs.push((side+1)*width/8,distance/4);}
    if(i){const a=(i-1)*2,b=i*2;indices.push(a,a+1,b,a+1,b+1,b);}
  }
  const g=new THREE.BufferGeometry();g.setAttribute('position',new THREE.Float32BufferAttribute(positions,3));g.setAttribute('uv',new THREE.Float32BufferAttribute(uvs,2));g.setIndex(indices);g.computeVertexNormals();return g;
}
function label(text,color='#45684d'){
  const c=document.createElement('canvas');c.width=512;c.height=128;const x=c.getContext('2d');
  x.fillStyle='#faf6e9';x.beginPath();x.roundRect(8,12,496,98,35);x.fill();x.fillStyle=color;x.font='bold 34px sans-serif';x.textAlign='center';x.fillText(text,256,76);
  const t=new THREE.CanvasTexture(c);t.colorSpace=THREE.SRGBColorSpace;const s=new THREE.Sprite(new THREE.SpriteMaterial({map:t,depthTest:false}));s.scale.set(6,1.5,1);return s;
}

export class MeadowRenderer{
  constructor(canvas){
    this.renderer=new THREE.WebGLRenderer({canvas,antialias:true,powerPreference:'high-performance'});
    this.renderer.setPixelRatio(Math.min(devicePixelRatio,1.6));this.renderer.shadowMap.enabled=true;this.renderer.shadowMap.type=THREE.PCFSoftShadowMap;
    this.renderer.outputColorSpace=THREE.SRGBColorSpace;this.renderer.toneMapping=THREE.ACESFilmicToneMapping;this.renderer.toneMappingExposure=1.05;
    this.scene=new THREE.Scene();this.scene.background=new THREE.Color('#bdd6df');this.scene.fog=new THREE.Fog('#bdd6df',95,195);
    this.scene.add(new THREE.HemisphereLight('#eaf7ff','#536747',1.65));
    this.sun=new THREE.DirectionalLight('#fff4dc',2.05);this.sun.position.set(-18,35,20);this.sun.castShadow=true;
    this.sun.shadow.mapSize.set(1024,1024);Object.assign(this.sun.shadow.camera,{left:-30,right:30,top:30,bottom:-30,near:1,far:100});this.sun.shadow.camera.updateProjectionMatrix();this.sun.shadow.bias=-.0007;this.sun.shadow.normalBias=.035;this.scene.add(this.sun,this.sun.target);
    this.camera=new THREE.OrthographicCamera(-30,30,20,-20,.1,180);this.center=new THREE.Vector3(-7,0,0);this.targetCenter=this.center.clone();
    this.terrain=new THREE.Group();this.actors=new THREE.Group();this.scene.add(this.terrain,this.actors);this.materials=createMaterials();
    this.grass=new THREE.MeshStandardMaterial({color:'#ffffff',roughness:.96,map:texture('grass'),bumpMap:texture('grass',true),bumpScale:.12});
    this.path=new THREE.MeshStandardMaterial({color:'#fff1d3',roughness:.95,map:texture('path'),bumpMap:texture('path',true),bumpScale:.08,side:THREE.DoubleSide});this.pathShoulder=new THREE.MeshStandardMaterial({color:'#a99261',roughness:1,transparent:true,opacity:.36,depthWrite:false,side:THREE.DoubleSide});
    this.water=new THREE.MeshStandardMaterial({color:'#4b9fae',roughness:.29,metalness:.08,side:THREE.DoubleSide});
    this.targetMat=new THREE.MeshBasicMaterial({color:'#ffe8a0',transparent:true,opacity:.56,depthWrite:false,side:THREE.DoubleSide});
    // Fence parts stay shared across worlds, just like cached animal geometry.
    this.fenceParts=[
      new THREE.Mesh(new THREE.CylinderGeometry(.075,.075,.92,10),this.materials.paleWood),
      new THREE.Mesh(new THREE.SphereGeometry(1,8,6),this.materials.paleWood),
      new THREE.Mesh(new THREE.BoxGeometry(1,.105,.085),this.materials.wood)
    ];
    this.sceneryBatches=[];this.sceneryFrustum=new THREE.Frustum();this.viewMatrix=new THREE.Matrix4();
    this.animalMeshes=[];this.animalBatches=[];this.helperMeshes=new Map();this.resize();this.preview=true;this.particles=[];this.nature=new MeadowNature(this.scene);
  }
  resize(){this.width=innerWidth;this.height=innerHeight;this.renderer.setSize(this.width,this.height,false);this.aspect=this.width/this.height;}
  place(group,x,z,scale=1,owned=false){group.position.set(x,0,z);group.scale.multiplyScalar(scale);if(owned)group.traverse(o=>{if(o.isMesh)o.userData.ownedGeometry=true;});this.terrain.add(group);return group;}
  flat(geometry,material,x,z,y=.02){const mesh=new THREE.Mesh(geometry,material);mesh.rotation.x=-Math.PI/2;mesh.position.set(x,y,z);mesh.receiveShadow=true;this.terrain.add(mesh);return mesh;}
  setLevel(level){
    this.level=level;
    // Dispose world-owned geometry; model geometry/materials are cached across levels.
    const geometries=new Set(),materials=new Set();
    for(const parent of [this.terrain,this.actors])parent.traverse(o=>{if(o.userData.ownedGeometry)geometries.add(o.geometry);if(o.userData.ownedMaterial)materials.add(o.material);if(o.userData.ownedLabel){o.material.map.dispose();materials.add(o.material);}if(o.isInstancedMesh)o.dispose();});
    geometries.forEach(g=>g?.dispose());materials.forEach(m=>m?.dispose());
    this.terrain.clear();this.actors.clear();this.sceneryBatches=[];this.helperMeshes.clear();this.animalMeshes=[];this.animalBatches=[];this.particles=[];
    const b=level.bounds,w=b.maxX-b.minX,d=b.maxZ-b.minZ,r=rng(level.seed),cx=(b.maxX+b.minX)/2,cz=(b.maxZ+b.minZ)/2;
    const ground=this.flat(new THREE.PlaneGeometry(w+90,d+90,1,1),this.grass,cx,cz,-.035);ground.userData.ownedGeometry=true;
    this.grass.map.repeat.set((w+90)/15,(d+90)/15);this.grass.bumpMap.repeat.copy(this.grass.map.repeat);
    for(const spec of level.sceneryHills||[]){
      const hill=new THREE.Mesh(new THREE.SphereGeometry(1,20,12),new THREE.MeshStandardMaterial({color:['#799552','#6f914e','#93a75d'][Math.floor(r()*3)],roughness:1}));
      hill.position.set(spec.x,-.3,spec.z);hill.scale.set(spec.radius,spec.height,spec.radius);hill.userData.ownedGeometry=hill.userData.ownedMaterial=true;this.terrain.add(hill);
    }
    const surface=(g,m)=>{const mesh=new THREE.Mesh(g,m);mesh.receiveShadow=true;mesh.userData.ownedGeometry=true;this.terrain.add(mesh);return mesh;};
    for(const road of level.roads){
      surface(ribbon(road.points,road.width+.65,{ragged:true,y:.003,seed:level.seed+5}),this.pathShoulder);
      surface(ribbon(road.points,road.width,{ragged:true,y:.007,seed:level.seed}),this.path);
    }
    for(const river of level.rivers){
      const bankMat=new THREE.MeshStandardMaterial({color:'#6c8960',roughness:1,side:THREE.DoubleSide});
      const bank=surface(ribbon(river.points,river.width+.8,{y:.002}),bankMat);bank.userData.ownedMaterial=true;
      surface(ribbon(river.points,river.width,{y:.018}),this.water);
      for(const bridge of river.bridges){const g=createBridge(bridge.width,bridge.length);g.rotation.y=bridge.heading;this.place(g,bridge.x,bridge.z,1,true);}
    }
    const t=level.target,s=t.radius+1.4;
    this.goal=this.flat(new THREE.CircleGeometry(t.radius,64),this.targetMat,t.x,t.z,.033);this.goal.userData.ownedGeometry=true;
    const outline=this.flat(new THREE.RingGeometry(t.radius-.13,t.radius+.13,64),new THREE.MeshBasicMaterial({color:'#fff0b5',side:THREE.DoubleSide}),t.x,t.z,.04);outline.userData.ownedGeometry=outline.userData.ownedMaterial=true;
    const beam=(a,b,height,thickness,mat)=>{const length=Math.hypot(b.x-a.x,b.z-a.z),mesh=new THREE.Mesh(new THREE.BoxGeometry(length,height,thickness),mat);mesh.position.set((a.x+b.x)/2,height/2,(a.z+b.z)/2);mesh.rotation.y=-Math.atan2(b.z-a.z,b.x-a.x);mesh.castShadow=mesh.receiveShadow=true;mesh.userData.ownedGeometry=true;this.terrain.add(mesh);return mesh;};
    // Every visible blocking perimeter, gate and destination segment comes from
    // the same world objects as collision: no fake scenery walls in play space.
    for(const segment of level.fenceSegments||[]){
      const {a,b,kind}=segment,len=Math.hypot(b.x-a.x,b.z-a.z);
      if(kind==='target'&&t.type==='barn'){
        beam(a,b,2.4,.22,this.materials.barn);const trim=beam(a,b,.14,.25,this.materials.barnTrim);trim.position.y=2.35;
      }else if(kind==='target'&&t.type==='field'){
        // Visible low fence defines the exact collision line; plants soften it.
        this.placeFence(a,b);
        const steps=Math.ceil(len/1.4);for(let i=0;i<steps;i++)this.place(createBush(i),a.x+(b.x-a.x)*(i+.5)/steps,a.z+(b.z-a.z)*(i+.5)/steps,.75);
      }else this.placeFence(a,b);
    }
    if(t.type==='barn'){
      const floor=this.flat(new THREE.PlaneGeometry(s*2,s*2),this.path,t.x,t.z,.013);floor.rotation.z=-(t.heading||0);floor.userData.ownedGeometry=true;
      // Narrow rear roof retains the cosy barn silhouette and reveals the flock.
      const roof=new THREE.Group(),heading=t.heading||0;
      for(const side of [-1,1]){const m=new THREE.Mesh(new THREE.BoxGeometry(s+.6,.18,s*.6),this.materials.roof);m.position.set(side*s/2,2.8,s*.7);m.rotation.z=-side*.21;m.castShadow=true;m.userData.ownedGeometry=true;roof.add(m);}
      roof.position.set(t.x,0,t.z);roof.rotation.y=heading;this.terrain.add(roof);
    }
    const sign=label(t.type==='pen'?'SUNNY PEN':t.type==='barn'?'HOME BARN':'CLOVER FIELD');sign.position.set(t.x-Math.sin(t.heading||0)*(s+1),3,t.z-Math.cos(t.heading||0)*(s+1));sign.userData.ownedLabel=true;this.terrain.add(sign);
    for(const obstacle of level.obstacles){
      this.place(createTree(Math.floor(r()*3)),obstacle.x,obstacle.z,obstacle.radius*.95);
      // A rounded root hedge shows the otherwise invisible tree collision disk.
      for(let i=0;i<4;i++){const angle=i*Math.PI/2;this.place(createBush(i),obstacle.x+Math.cos(angle)*obstacle.radius*.48,obstacle.z+Math.sin(angle)*obstacle.radius*.48,obstacle.radius*.7);}
    }
    const meadowClear=(x,z,padding=0)=>x>b.minX+padding&&x<b.maxX-padding&&z>b.minZ+padding&&z<b.maxZ-padding&&!level.rivers.some(v=>lineDistance(x,z,v.points)<v.width/2+padding+.5)&&!level.roads.some(v=>lineDistance(x,z,v.points)<v.width/2+padding+.35)&&Math.hypot(x-t.x,z-t.z)>t.radius+padding+2&&!level.obstacles.some(o=>Math.hypot(x-o.x,z-o.z)<o.radius+padding)&&!(level.fenceSegments||[]).some(v=>segmentDistance(x,z,v.a,v.b)<padding+.7);
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
    if(tufts.length){const blade=new THREE.ConeGeometry(.12,.55,3),bladeMat=new THREE.MeshStandardMaterial({color:'#648844',roughness:1}),grass=new THREE.InstancedMesh(blade,bladeMat,tufts.length),pose=new THREE.Object3D();tufts.forEach((p,i)=>{pose.position.set(p.x,.18,p.z);pose.scale.set(.7+r()*.6,.55+r()*.8,.7+r()*.6);pose.rotation.y=r()*Math.PI;pose.updateMatrix();grass.setMatrixAt(i,pose.matrix);});grass.receiveShadow=true;grass.userData.ownedGeometry=grass.userData.ownedMaterial=true;this.terrain.add(grass);this.trackScenery(grass);}
    // Thin reeds follow the exact banks and leave crossing entrances clear.
    const reeds=[];for(const river of level.rivers)for(let i=2;i<river.points.length-2;i+=5){const p=river.points[i],next=river.points[i+1],dx=next.x-p.x,dz=next.z-p.z,l=Math.hypot(dx,dz)||1;for(const side of [-1,1]){const x=p.x-dz/l*(river.width/2+.65)*side,z=p.z+dx/l*(river.width/2+.65)*side;if(x>b.minX&&x<b.maxX&&z>b.minZ&&z<b.maxZ&&!river.bridges.some(v=>Math.hypot(x-v.x,z-v.z)<v.length/2+v.width))reeds.push({x,z});}}
    if(reeds.length){const geo=new THREE.ConeGeometry(.18,.95,4),mat=new THREE.MeshStandardMaterial({color:'#5b7951',roughness:1}),batch=new THREE.InstancedMesh(geo,mat,reeds.length),pose=new THREE.Object3D();reeds.forEach((p,i)=>{pose.position.set(p.x,.4,p.z);pose.rotation.z=(r()-.5)*.25;pose.updateMatrix();batch.setMatrixAt(i,pose.matrix);});batch.userData.ownedGeometry=batch.userData.ownedMaterial=true;this.terrain.add(batch);this.trackScenery(batch);}
    const sceneryCount=Math.min(62,28+Math.floor(level.index/3));for(let i=0;i<sceneryCount;i++){
      let x,z;const side=i%4;
      if(side<2){x=b.minX-12+r()*(w+24);z=side===0?b.minZ-4-r()*17:b.maxZ+4+r()*17;}else{x=side===2?b.minX-5-r()*18:b.maxX+5+r()*18;z=b.minZ+r()*d;}
      if(level.rivers.some(v=>lineDistance(x,z,v.points)<v.width/2+3))continue;this.place(createTree(i%3),x,z,1.3+r()*1.8);
    }
    this.nature.setLevel(level);
    this.batchScenery();
    this.dog=createDog();this.dog.scale.setScalar(1.35);this.actors.add(this.dog);
    const halo=new THREE.Mesh(new THREE.RingGeometry(.82,.95,40),new THREE.MeshBasicMaterial({color:'#fff0bb',transparent:true,opacity:.9,side:THREE.DoubleSide,depthWrite:false}));halo.rotation.x=-Math.PI/2;halo.position.y=.03;halo.userData.ownedGeometry=halo.userData.ownedMaterial=true;this.dog.add(halo);
    for(const a of level.animals){const pose=new THREE.Object3D();pose.position.set(a.x,0,a.z);pose.rotation.y=Math.PI/2;this.animalMeshes.push(pose);}
    for(const type of ['sheep','cow']){
      const indices=level.animals.flatMap((a,i)=>a.type===type?[i]:[]);if(!indices.length)continue;
      const prototype=createAnimal(type),meshes=[];let radius=0;
      for(const child of prototype.children){
        if(!child.geometry.boundingSphere)child.geometry.computeBoundingSphere();
        const sphere=child.geometry.boundingSphere,pivot=child.userData.pivot;
        // A sphere about the animal origin includes every baked body piece and
        // the full rotation envelope of each leg around its retained hip pivot.
        radius=Math.max(radius,sphere.center.length()+sphere.radius+(pivot?Math.hypot(...pivot):0));
        const instanced=new THREE.InstancedMesh(child.geometry,child.material,indices.length);instanced.instanceMatrix.setUsage(THREE.DynamicDrawUsage);instanced.castShadow=instanced.receiveShadow=true;instanced.frustumCulled=false;instanced.userData.limbIndex=child.userData.limbIndex;instanced.userData.pivot=pivot;this.actors.add(instanced);meshes.push(instanced);
      }
      this.animalBatches.push({indices,meshes,radius,visibleIndices:[]});
    }
    this.center.set(level.spawn.x+(this.aspect<.8?2:10),0,level.spawn.z+1);this.time=0;this.update(level,level.dog,0,true);
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
    this.sceneryBatches.push({batch,matrices,bounds});
  }
  batchScenery(){
    this.terrain.updateMatrixWorld(true);const groups=new Map();
    this.terrain.traverse(o=>{if(!o.isMesh||o.userData.ownedGeometry||o.material.transparent)return;const key=`${o.geometry.id}:${o.material.id}`;if(!groups.has(key))groups.set(key,[]);groups.get(key).push(o);});
    for(const pieces of groups.values()){
      if(pieces.length<2)continue;const first=pieces[0],batch=new THREE.InstancedMesh(first.geometry,first.material,pieces.length);
      pieces.forEach((piece,i)=>{batch.setMatrixAt(i,piece.matrixWorld);piece.parent.remove(piece);});
      batch.castShadow=!!first.userData.fencePart;batch.receiveShadow=true;this.terrain.add(batch);this.trackScenery(batch);
    }
    // Empty model wrappers no longer need a matrix traversal every frame.
    const empty=[];this.terrain.traverse(o=>{if(o.isGroup&&!o.children.length)empty.push(o);});empty.forEach(o=>o.parent.remove(o));
  }
  cullScenery(){
    this.camera.updateMatrixWorld(true);this.viewMatrix.multiplyMatrices(this.camera.projectionMatrix,this.camera.matrixWorldInverse);this.sceneryFrustum.setFromProjectionMatrix(this.viewMatrix);
    const planes=this.sceneryFrustum.planes;
    for(const {batch,matrices,bounds} of this.sceneryBatches){
      let count=0;
      for(let i=0;i<bounds.length;i+=4){
        // Two world units retain edge silhouettes and short fence shadows.
        const radius=bounds[i+3]+2;
        if(planes.some(p=>p.normal.x*bounds[i]+p.normal.y*bounds[i+1]+p.normal.z*bounds[i+2]+p.constant < -radius))continue;
        batch.instanceMatrix.array.set(matrices.subarray(i*4,i*4+16),count++*16);
      }
      batch.count=count;batch.visible=count>0;batch.instanceMatrix.needsUpdate=true;
      batch.instanceMatrix.clearUpdateRanges();if(count)batch.instanceMatrix.addUpdateRange(0,count*16);
    }
  }
  updateAnimalBatches(level,poseTime){
    const planes=this.sceneryFrustum.planes,limbTransform=new THREE.Matrix4(),limbRotation=new THREE.Matrix4(),worldTransform=new THREE.Matrix4();
    for(const batch of this.animalBatches){
      const visible=batch.visibleIndices;visible.length=0;
      // The extra three units keep offscreen bodies whose short sun shadows
      // can still land in view, and avoid edge popping during a walking pose.
      for(const index of batch.indices){
        const pose=this.animalMeshes[index],position=pose.position,radius=batch.radius*Math.max(Math.abs(pose.scale.x),Math.abs(pose.scale.y),Math.abs(pose.scale.z))+3;
        if(!planes.some(p=>p.normal.x*position.x+p.normal.y*position.y+p.normal.z*position.z+p.constant < -radius))visible.push(index);
      }
      // All body and limb materials share one compacted ordering. Gait phases
      // still use the original animal index, including saved and distant animals.
      visible.forEach((index,i)=>batch.meshes.forEach(m=>{
        if(m.userData.limbIndex===undefined){m.setMatrixAt(i,this.animalMeshes[index].matrix);return;}
        const a=level.animals[index],limb=m.userData.limbIndex,phase=(limb===0||limb===3)?0:Math.PI,gait=Math.sin(poseTime*12+index*.8+phase)*Math.min(.5,Math.hypot(a.vx,a.vz)*.15);
        limbTransform.makeTranslation(...m.userData.pivot);limbRotation.makeRotationX(gait);limbTransform.multiply(limbRotation);worldTransform.multiplyMatrices(this.animalMeshes[index].matrix,limbTransform);m.setMatrixAt(i,worldTransform);
      }));
      for(const mesh of batch.meshes){mesh.count=visible.length;mesh.visible=visible.length>0;mesh.instanceMatrix.needsUpdate=true;mesh.instanceMatrix.clearUpdateRanges();if(visible.length)mesh.instanceMatrix.addUpdateRange(0,visible.length*16);}
    }
  }
  update(level,dog,dt,preview=false){
    this.time+=dt;this.preview=preview;const active=level.animals.filter(a=>!a.saved);
    const avg=active.reduce((p,a)=>({x:p.x+a.x/active.length,z:p.z+a.z/active.length}),{x:0,z:0});
    const viewHeight=preview?(this.aspect<.8?50:44):(this.aspect<.8?39:36);const half=viewHeight/2,halfWidth=half*this.aspect;
    // Follow Pip; enough leading space keeps the flock and crossing visible.
    let desiredX=preview?level.spawn.x+(this.aspect<.8?2:10):dog.x*.68+(active.length?avg.x:level.target.x)*.32+2;
    let desiredZ=preview?level.spawn.z+1:dog.z*.75+(active.length?avg.z:level.target.z)*.25+1;
    if(!preview){desiredX=Math.max(dog.x-halfWidth*.45,Math.min(dog.x+halfWidth*.45,desiredX));desiredZ=Math.max(dog.z-4,Math.min(dog.z+4,desiredZ));}
    const lerp=preview?Math.min(1,dt*.8):Math.min(1,dt*3.5);this.center.x+=(desiredX-this.center.x)*lerp;this.center.z+=(desiredZ-this.center.z)*lerp;
    if(!preview){const margin=Math.max(1,halfWidth-2.5);this.center.x=Math.max(dog.x-margin,Math.min(dog.x+margin,this.center.x));}
    this.camera.left=-halfWidth;this.camera.right=halfWidth;this.camera.top=half;this.camera.bottom=-half;this.camera.updateProjectionMatrix();
    this.camera.position.set(this.center.x,36,this.center.z+29);this.camera.lookAt(this.center.x,0,this.center.z-2);
    this.sun.position.set(this.center.x-18,35,this.center.z+20);this.sun.target.position.set(this.center.x,0,this.center.z);this.sun.target.updateMatrixWorld();
    this.dog.position.set(dog.x,terrainHeight(level,dog.x,dog.z)+Math.sin(this.time*16)*Math.min(.06,Math.hypot(dog.vx||0,dog.vz||0)*.008),dog.z);this.dog.rotation.y=dog.heading??Math.PI/2;
    const speed=Math.hypot(dog.vx||0,dog.vz||0);const parts=this.dog.userData.parts;
    const poseTime=Math.floor(this.time*12)/12;
    parts.legs.forEach((leg,i)=>leg.rotation.x=Math.sin(poseTime*14+(i%3===0?0:Math.PI))*Math.min(.5,speed*.07));parts.tail.rotation.z=Math.sin(poseTime*7)*.3;
    level.animals.forEach((a,i)=>{const m=this.animalMeshes[i];m.position.set(a.x,terrainHeight(level,a.x,a.z)+Math.sin(poseTime*12+i)*Math.min(.07,Math.hypot(a.vx,a.vz)*.025),a.z);m.rotation.y=a.heading??Math.PI/2;m.rotation.z=Math.sin(poseTime*9+i)*Math.min(.055,Math.hypot(a.vx,a.vz)*.02);if(a.saved)m.rotation.y=Math.sin(i*2)*1.3;m.updateMatrix();});
    for(const h of level.helpers||[]){let m=this.helperMeshes.get(h.type);if(!m){m=h.type==='drone'?createDrone():createDog();if(h.type==='helper')m.scale.setScalar(1.1);this.helperMeshes.set(h.type,m);this.actors.add(m);}const dx=h.x-m.position.x,dz=h.z-m.position.z;m.position.set(h.x,h.type==='drone'?2+Math.sin(this.time*4)*.18:terrainHeight(level,h.x,h.z),h.z);if(h.type==='drone')m.userData.parts.propellers.forEach(p=>p.rotation.y=this.time*35);else{if(Math.hypot(dx,dz)>.001)m.rotation.y=Math.atan2(dx,dz);m.userData.parts.legs.forEach((leg,i)=>leg.rotation.x=Math.sin(poseTime*14+(i===0||i===3?0:Math.PI))*Math.min(.5,Math.hypot(dx,dz)*15));m.userData.parts.tail.rotation.z=Math.sin(poseTime*7)*.3;}}
    this.goal.material.opacity=.38+Math.sin(this.time*2)*.09;
    this.nature.update(dt,{dog,animals:level.animals,camera:this.camera,time:this.time,paused:dt<=0});
    for(const p of this.particles){p.life-=dt;p.mesh.position.addScaledVector(p.velocity,dt);p.velocity.y-=dt*6;p.mesh.rotation.x+=dt*2;p.mesh.scale.setScalar(Math.max(0,p.life));if(p.life<=0){this.actors.remove(p.mesh);p.mesh.geometry.dispose();p.mesh.material.dispose();}}
    this.particles=this.particles.filter(p=>p.life>0);this.cullScenery();this.updateAnimalBatches(level,poseTime);this.renderer.render(this.scene,this.camera);
  }
  celebrate(x,z){for(let i=0;i<36;i++){const mesh=new THREE.Mesh(new THREE.BoxGeometry(.12,.12,.05),new THREE.MeshBasicMaterial({color:['#f0b65c','#f8e8ad','#e99585','#80b398'][i%4]}));mesh.userData.ownedGeometry=mesh.userData.ownedMaterial=true;mesh.position.set(x,1.5,z);this.actors.add(mesh);this.particles.push({mesh,velocity:new THREE.Vector3(Math.sin(i*2.4)*3,2+(i%5),Math.cos(i*2.4)*3),life:1.8});}}
  bark(){const r=new THREE.Mesh(new THREE.RingGeometry(.9,1.1,40),new THREE.MeshBasicMaterial({color:'#fff6d8',side:THREE.DoubleSide,transparent:true,opacity:.8}));r.rotation.x=-Math.PI/2;r.position.copy(this.dog.position);r.position.y=.08;this.actors.add(r);const start=performance.now();const animate=()=>{const t=(performance.now()-start)/600;if(t>=1){this.actors.remove(r);r.geometry.dispose();r.material.dispose();return;}r.scale.setScalar(1+t*6);r.material.opacity=.8*(1-t);requestAnimationFrame(animate);};animate();}
  drawMap(canvas,level,dog){
    const ctx=canvas.getContext('2d'),w=canvas.width,h=canvas.height,b=level.bounds,px=x=>8+(x-b.minX)/(b.maxX-b.minX)*(w-16),pz=z=>8+(z-b.minZ)/(b.maxZ-b.minZ)*(h-16);
    ctx.fillStyle='#c9d8b7';ctx.fillRect(0,0,w,h);
    const line=(points,width,color)=>{ctx.lineWidth=width;ctx.strokeStyle=color;ctx.lineCap='round';ctx.lineJoin='round';ctx.beginPath();points.forEach((p,i)=>i?ctx.lineTo(px(p.x),pz(p.z)):ctx.moveTo(px(p.x),pz(p.z)));ctx.stroke();};
    const scale=Math.min((w-16)/(b.maxX-b.minX),(h-16)/(b.maxZ-b.minZ));
    for(const river of level.rivers){line(river.points,river.width*scale,'#5dabb7');for(const bridge of river.bridges){const vx=Math.sin(bridge.heading)*bridge.length/2,vz=Math.cos(bridge.heading)*bridge.length/2;line([{x:bridge.x-vx,z:bridge.z-vz},{x:bridge.x+vx,z:bridge.z+vz}],Math.max(3,bridge.width*scale),'#dfbd8c');}}
    for(const road of level.roads)line(road.points,Math.max(1.5,road.width*scale),'#d4b784');
    for(const fence of level.fenceSegments||[])line([fence.a,fence.b],fence.kind==='boundary'?1:1.5,'#8f7758');
    const dot=(x,z,r,c)=>{ctx.fillStyle=c;ctx.beginPath();ctx.arc(px(x),pz(z),r,0,Math.PI*2);ctx.fill();};
    dot(level.target.x,level.target.z,9,'#f9e7a2');for(const a of level.animals)dot(a.x,a.z,a.type==='cow'?3:2.3,a.saved?'#80a777':'#fff8e7');dot(dog.x,dog.z,4.8,'#c9843b');ctx.strokeStyle='#fff2d0';ctx.lineWidth=2;ctx.beginPath();ctx.arc(px(dog.x),pz(dog.z),6,0,Math.PI*2);ctx.stroke();
    for(const h of level.helpers||[])dot(h.x,h.z,3,'#4a9c9b');
  }
}
