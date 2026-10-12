import * as THREE from 'three';
import { createDog, createAnimal, createDrone, createTree, createBush, createBarn, createFence, createBridge, createFlowerPatch, createMaterials } from './models.js';

function rng(seed){let s=seed;return()=>{s=(s*1664525+1013904223)>>>0;return s/4294967296;};}
function texture(kind){
  const canvas=document.createElement('canvas');canvas.width=canvas.height=256;
  const ctx=canvas.getContext('2d');const r=rng(83);
  ctx.fillStyle=kind==='grass'?'#a9c58a':'#d8c5a0';ctx.fillRect(0,0,256,256);
  for(let i=0;i<5200;i++){const x=r()*256,y=r()*256;ctx.fillStyle=kind==='grass'?['#8fae77','#b7cc92','#c6d4a3'][i%3]:['#c6b48e','#ecdfbd','#bfb38f'][i%3];ctx.globalAlpha=.17+r()*.23;ctx.beginPath();ctx.ellipse(x,y,.6+r()*1.4,1+r()*2.5,r()*Math.PI,0,Math.PI*2);ctx.fill();}
  const t=new THREE.CanvasTexture(canvas);t.colorSpace=THREE.SRGBColorSpace;t.wrapS=t.wrapT=THREE.RepeatWrapping;return t;
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
    this.renderer.outputColorSpace=THREE.SRGBColorSpace;this.renderer.toneMapping=THREE.ACESFilmicToneMapping;this.renderer.toneMappingExposure=1.35;
    this.scene=new THREE.Scene();this.scene.background=new THREE.Color('#cdddc6');this.scene.fog=new THREE.Fog('#cdddc6',65,130);
    this.scene.add(new THREE.HemisphereLight('#fff8dc','#71886a',2.5));
    this.sun=new THREE.DirectionalLight('#fff1ca',3.1);this.sun.position.set(-18,35,20);this.sun.castShadow=true;
    this.sun.shadow.mapSize.set(1024,1024);Object.assign(this.sun.shadow.camera,{left:-30,right:30,top:30,bottom:-30,near:1,far:100});this.sun.shadow.camera.updateProjectionMatrix();this.sun.shadow.bias=-.0007;this.sun.shadow.normalBias=.035;this.scene.add(this.sun,this.sun.target);
    this.camera=new THREE.OrthographicCamera(-30,30,20,-20,.1,180);this.center=new THREE.Vector3(-7,0,0);this.targetCenter=this.center.clone();
    this.terrain=new THREE.Group();this.actors=new THREE.Group();this.scene.add(this.terrain,this.actors);this.materials=createMaterials();
    this.grass=new THREE.MeshStandardMaterial({color:'#b0ca8f',roughness:1,map:texture('grass')});this.grass.map.repeat.set(25,17);
    this.path=new THREE.MeshStandardMaterial({color:'#e0cfac',roughness:1,map:texture('path')});this.path.map.repeat.set(12,2);
    this.water=new THREE.MeshStandardMaterial({color:'#86c3c7',roughness:.35,metalness:.13});
    this.targetMat=new THREE.MeshBasicMaterial({color:'#ffe8a0',transparent:true,opacity:.56,depthWrite:false,side:THREE.DoubleSide});
    this.animalMeshes=[];this.animalBatches=[];this.helperMeshes=new Map();this.resize();this.preview=true;this.particles=[];
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
    this.terrain.clear();this.actors.clear();this.helperMeshes.clear();this.animalMeshes=[];this.animalBatches=[];this.particles=[];
    const b=level.bounds,w=b.maxX-b.minX,d=b.maxZ-b.minZ,r=rng(level.seed),cx=(b.maxX+b.minX)/2;
    const ground=this.flat(new THREE.PlaneGeometry(w+50,d+55,1,1),this.grass,cx,0,-.05);ground.userData.ownedGeometry=true;
    // Broad softly rounded hedgerows and grass berms make an organic horizon.
    for(let i=0;i<16;i++){const side=i%2?-1:1;const hill=new THREE.Mesh(new THREE.SphereGeometry(1,20,12),new THREE.MeshStandardMaterial({color:['#a0bc8c','#90ae83','#b0c69a'][i%3],roughness:1}));hill.position.set(b.minX-12+r()*(w+24),.5,side*(29+r()*9));hill.scale.set(5+r()*7,2+r()*4,5+r()*5);hill.userData.ownedGeometry=hill.userData.ownedMaterial=true;this.terrain.add(hill);}
    for(const road of level.roads){const len=Math.hypot(road.to.x-road.from.x,road.to.z-road.from.z);const path=this.flat(new THREE.PlaneGeometry(len,road.width),this.path,(road.from.x+road.to.x)/2,(road.from.z+road.to.z)/2,.006);path.rotation.z=-Math.atan2(road.to.z-road.from.z,road.to.x-road.from.x);path.userData.ownedGeometry=true;}
    for(const river of level.rivers){const water=this.flat(new THREE.PlaneGeometry(river.width,river.maxZ-river.minZ+10),this.water,river.x,0,.025);water.userData.ownedGeometry=true;for(const bridge of river.bridges){const g=createBridge(bridge.width,river.width+2);g.rotation.y=Math.PI/2;this.place(g,river.x,bridge.z,1,true);}
      for(const side of [-1,1])for(let i=0;i<10;i++){const bush=createBush(i);this.place(bush,river.x+side*(river.width/2+.55),-23+i*5,.6);}
    }
    for(const fence of level.fences){let start=fence.minZ;for(const opening of [...fence.gates,{z:fence.maxZ+10,width:20}]){const end=Math.min(fence.maxZ,opening.z-opening.width/2);if(end>start){const f=createFence(end-start);f.rotation.y=Math.PI/2;this.place(f,fence.x,(start+end)/2,1,true);}start=opening.z+opening.width/2;}}
    const t=level.target,s=t.radius+1.4;
    this.goal=this.flat(new THREE.CircleGeometry(t.radius,64),this.targetMat,t.x,t.z,.033);this.goal.userData.ownedGeometry=true;
    const outline=this.flat(new THREE.RingGeometry(t.radius-.15,t.radius+.15,64),new THREE.MeshBasicMaterial({color:'#fff4bd',side:THREE.DoubleSide}),t.x,t.z,.04);outline.userData.ownedGeometry=outline.userData.ownedMaterial=true;
    // Destination stays visually open on the approach side, matching simulation.
    if(t.type==='barn'){
      const beam=(x,y,z,sx,sy,sz,mat)=>{const m=new THREE.Mesh(new THREE.BoxGeometry(sx,sy,sz),mat);m.position.set(x,y,z);m.castShadow=m.receiveShadow=true;m.userData.ownedGeometry=true;this.terrain.add(m);return m;};
      const m=this.materials;
      beam(t.x+s,1.4,t.z,.23,2.8,s*2,m.barn);for(const side of [-1,1]){beam(t.x,1.1,t.z+side*s,s*2,2.2,.2,m.barn);beam(t.x-s,1.1,t.z+side*(s+3.5)/2,.2,2.2,s-3.5,m.barn);}
      for(const x of [t.x-s,t.x,t.x+s])for(const side of [-1,1])beam(x,2.05,t.z+side*s,.2,4.1,.2,m.barnTrim);
      // A cutaway roof reveals the arriving flock rather than hiding it.
      for(const side of [-1,1]){const roof=beam(t.x+s-2.2,4.1,t.z+side*s/2,4.5,.2,s+1,m.roof);roof.rotation.x=side*.32;}
      beam(t.x-s,3.9,t.z,.2,.2,s*2,m.barnTrim);const floor=this.flat(new THREE.PlaneGeometry(s*2,s*2),this.path,t.x,t.z,.015);floor.userData.ownedGeometry=true;
    }else if(t.type==='field'){
      for(let i=0;i<Math.ceil(s*2);i++){const offset=-s+i*(s*2/Math.ceil(s*2));for(const side of [-1,1])this.place(createBush(i),t.x+offset,t.z+side*s,.9);this.place(createBush(i),t.x+s,t.z+offset,.9);if(Math.abs(offset)>3.5)this.place(createBush(i),t.x-s,t.z+offset,.9);}
      for(let i=0;i<10;i++)this.place(createFlowerPatch(i,4),t.x+(r()-.5)*s*1.2,t.z+(r()-.5)*s*1.2,1.2);
    }else{
      for(const z of [-s,s])this.place(createFence(s*2),t.x,t.z+z,1,true);
      const rear=createFence(s*2);rear.rotation.y=Math.PI/2;this.place(rear,t.x+s,t.z,1,true);
      const front1=createFence(s-3.5);front1.rotation.y=Math.PI/2;this.place(front1,t.x-s,t.z-(s+3.5)/2,1,true);
      const front2=createFence(s-3.5);front2.rotation.y=Math.PI/2;this.place(front2,t.x-s,t.z+(s+3.5)/2,1,true);
      const barn=createBarn();barn.rotation.y=-Math.PI/2;this.place(barn,b.maxX+4,t.z-6,1.6);
    }
    const sign=label(t.type==='pen'?'SUNNY PEN':t.type==='barn'?'HOME BARN':'CLOVER FIELD');sign.position.set(t.x,3,t.z-s);sign.userData.ownedLabel=true;this.terrain.add(sign);
    for(const obstacle of level.obstacles)this.place(createTree(Math.floor(r()*3)),obstacle.x,obstacle.z,obstacle.radius*1.15);
    for(let i=0;i<34;i++){const x=b.minX-6+r()*(w+12),z=(i%2?-1:1)*(27+r()*8);this.place(createTree(i%3),x,z,1.2+r()*1.7);if(i%3===0)this.place(createBush(i),x+2,z,1.2);}
    for(let i=0;i<45;i++){const x=b.minX+r()*w,z=(r()-.5)*45;if(level.rivers.some(v=>Math.abs(x-v.x)<v.width/2+1))continue;this.place(createFlowerPatch(i,3),x,z,1.1);}
    // Sculpted rounded clouds drift gently above the far boundary.
    this.clouds=[];const cloudMat=new THREE.MeshStandardMaterial({color:'#f2f1dd',roughness:1});for(let i=0;i<6;i++){const g=new THREE.Group();for(let j=0;j<3;j++){const m=new THREE.Mesh(new THREE.SphereGeometry(1,12,8),cloudMat);m.scale.set(1.3,1,1);m.position.set(j*1.1,Math.sin(j)*.3,0);m.userData.ownedGeometry=m.userData.ownedMaterial=true;g.add(m);}g.position.set(b.minX+r()*w,8+r()*3,-22-r()*7);this.terrain.add(g);this.clouds.push(g);}
    this.batchScenery();
    this.dog=createDog();this.dog.scale.setScalar(1.35);this.actors.add(this.dog);
    const halo=new THREE.Mesh(new THREE.RingGeometry(.82,.95,40),new THREE.MeshBasicMaterial({color:'#fff0bb',transparent:true,opacity:.9,side:THREE.DoubleSide,depthWrite:false}));halo.rotation.x=-Math.PI/2;halo.position.y=.03;halo.userData.ownedGeometry=halo.userData.ownedMaterial=true;this.dog.add(halo);
    for(const a of level.animals){const pose=new THREE.Object3D();pose.position.set(a.x,0,a.z);pose.rotation.y=Math.PI/2;this.animalMeshes.push(pose);}
    for(const type of ['sheep','cow']){const indices=level.animals.flatMap((a,i)=>a.type===type?[i]:[]);if(!indices.length)continue;const prototype=createAnimal(type),meshes=[];for(const child of prototype.children){const instanced=new THREE.InstancedMesh(child.geometry,child.material,indices.length);instanced.instanceMatrix.setUsage(THREE.DynamicDrawUsage);instanced.castShadow=instanced.receiveShadow=true;instanced.frustumCulled=false;instanced.userData.limbIndex=child.userData.limbIndex;instanced.userData.pivot=child.userData.pivot;this.actors.add(instanced);meshes.push(instanced);}this.animalBatches.push({indices,meshes});}
    this.center.set(level.spawn.x+(this.aspect<.8?2:10),0,1);this.time=0;this.update(level,level.dog,0,true);
  }
  batchScenery(){
    this.terrain.updateMatrixWorld(true);const groups=new Map();
    this.terrain.traverse(o=>{if(!o.isMesh||o.userData.ownedGeometry||o.material.transparent)return;const key=`${o.geometry.id}:${o.material.id}`;if(!groups.has(key))groups.set(key,[]);groups.get(key).push(o);});
    for(const pieces of groups.values()){if(pieces.length<2)continue;const first=pieces[0],batch=new THREE.InstancedMesh(first.geometry,first.material,pieces.length);pieces.forEach((piece,i)=>{batch.setMatrixAt(i,piece.matrixWorld);piece.parent.remove(piece);});batch.castShadow=false;batch.receiveShadow=true;batch.computeBoundingSphere();this.terrain.add(batch);}
  }
  update(level,dog,dt,preview=false){
    this.time+=dt;this.preview=preview;const active=level.animals.filter(a=>!a.saved);
    const avg=active.reduce((p,a)=>({x:p.x+a.x/active.length,z:p.z+a.z/active.length}),{x:0,z:0});
    const viewHeight=preview?(this.aspect<.8?50:44):(this.aspect<.8?39:36);const half=viewHeight/2,halfWidth=half*this.aspect;
    // Follow Pip; enough leading space keeps the flock and crossing visible.
    let desiredX=preview?level.spawn.x+(this.aspect<.8?2:10):dog.x*.68+(active.length?avg.x:level.target.x)*.32+2;
    let desiredZ=preview?1:dog.z*.75+(active.length?avg.z:level.target.z)*.25+1;
    if(!preview){desiredX=Math.max(dog.x-halfWidth*.45,Math.min(dog.x+halfWidth*.45,desiredX));desiredZ=Math.max(dog.z-4,Math.min(dog.z+4,desiredZ));}
    const lerp=preview?Math.min(1,dt*.8):Math.min(1,dt*3.5);this.center.x+=(desiredX-this.center.x)*lerp;this.center.z+=(desiredZ-this.center.z)*lerp;
    if(!preview){const margin=Math.max(1,halfWidth-2.5);this.center.x=Math.max(dog.x-margin,Math.min(dog.x+margin,this.center.x));}
    this.camera.left=-halfWidth;this.camera.right=halfWidth;this.camera.top=half;this.camera.bottom=-half;this.camera.updateProjectionMatrix();
    this.camera.position.set(this.center.x,36,this.center.z+29);this.camera.lookAt(this.center.x,0,this.center.z-2);
    this.sun.position.set(this.center.x-18,35,this.center.z+20);this.sun.target.position.set(this.center.x,0,this.center.z);this.sun.target.updateMatrixWorld();
    this.dog.position.set(dog.x,Math.sin(this.time*16)*Math.min(.06,Math.hypot(dog.vx||0,dog.vz||0)*.008),dog.z);this.dog.rotation.y=dog.heading??Math.PI/2;
    const speed=Math.hypot(dog.vx||0,dog.vz||0);const parts=this.dog.userData.parts;
    const poseTime=Math.floor(this.time*12)/12;
    parts.legs.forEach((leg,i)=>leg.rotation.x=Math.sin(poseTime*14+(i%3===0?0:Math.PI))*Math.min(.5,speed*.07));parts.tail.rotation.z=Math.sin(poseTime*7)*.3;
    level.animals.forEach((a,i)=>{const m=this.animalMeshes[i];m.position.set(a.x,Math.sin(poseTime*12+i)*Math.min(.07,Math.hypot(a.vx,a.vz)*.025),a.z);m.rotation.y=a.heading??Math.PI/2;m.rotation.z=Math.sin(poseTime*9+i)*Math.min(.055,Math.hypot(a.vx,a.vz)*.02);if(a.saved)m.rotation.y=Math.sin(i*2)*1.3;m.updateMatrix();});
    const limbTransform=new THREE.Matrix4(),limbRotation=new THREE.Matrix4(),worldTransform=new THREE.Matrix4();
    for(const batch of this.animalBatches){batch.indices.forEach((index,i)=>batch.meshes.forEach(m=>{if(m.userData.limbIndex===undefined){m.setMatrixAt(i,this.animalMeshes[index].matrix);return;}const a=level.animals[index],limb=m.userData.limbIndex,phase=(limb===0||limb===3)?0:Math.PI,gait=Math.sin(poseTime*12+index*.8+phase)*Math.min(.5,Math.hypot(a.vx,a.vz)*.15);limbTransform.makeTranslation(...m.userData.pivot);limbRotation.makeRotationX(gait);limbTransform.multiply(limbRotation);worldTransform.multiplyMatrices(this.animalMeshes[index].matrix,limbTransform);m.setMatrixAt(i,worldTransform);}));batch.meshes.forEach(m=>m.instanceMatrix.needsUpdate=true);}
    for(const h of level.helpers||[]){let m=this.helperMeshes.get(h.type);if(!m){m=h.type==='drone'?createDrone():createDog();if(h.type==='helper')m.scale.setScalar(1.1);this.helperMeshes.set(h.type,m);this.actors.add(m);}const dx=h.x-m.position.x,dz=h.z-m.position.z;m.position.set(h.x,h.type==='drone'?2+Math.sin(this.time*4)*.18:0,h.z);if(h.type==='drone')m.userData.parts.propellers.forEach(p=>p.rotation.y=this.time*35);else{if(Math.hypot(dx,dz)>.001)m.rotation.y=Math.atan2(dx,dz);m.userData.parts.legs.forEach((leg,i)=>leg.rotation.x=Math.sin(poseTime*14+(i===0||i===3?0:Math.PI))*Math.min(.5,Math.hypot(dx,dz)*15));m.userData.parts.tail.rotation.z=Math.sin(poseTime*7)*.3;}}
    this.goal.material.opacity=.38+Math.sin(this.time*2)*.09;
    for(const cloud of this.clouds)cloud.position.x+=dt*.13;
    for(const p of this.particles){p.life-=dt;p.mesh.position.addScaledVector(p.velocity,dt);p.velocity.y-=dt*6;p.mesh.rotation.x+=dt*2;p.mesh.scale.setScalar(Math.max(0,p.life));if(p.life<=0){this.actors.remove(p.mesh);p.mesh.geometry.dispose();p.mesh.material.dispose();}}
    this.particles=this.particles.filter(p=>p.life>0);this.renderer.render(this.scene,this.camera);
  }
  celebrate(x,z){for(let i=0;i<36;i++){const mesh=new THREE.Mesh(new THREE.BoxGeometry(.12,.12,.05),new THREE.MeshBasicMaterial({color:['#f0b65c','#f8e8ad','#e99585','#80b398'][i%4]}));mesh.userData.ownedGeometry=mesh.userData.ownedMaterial=true;mesh.position.set(x,1.5,z);this.actors.add(mesh);this.particles.push({mesh,velocity:new THREE.Vector3(Math.sin(i*2.4)*3,2+(i%5),Math.cos(i*2.4)*3),life:1.8});}}
  bark(){const r=new THREE.Mesh(new THREE.RingGeometry(.9,1.1,40),new THREE.MeshBasicMaterial({color:'#fff6d8',side:THREE.DoubleSide,transparent:true,opacity:.8}));r.rotation.x=-Math.PI/2;r.position.copy(this.dog.position);r.position.y=.08;this.actors.add(r);const start=performance.now();const animate=()=>{const t=(performance.now()-start)/600;if(t>=1){this.actors.remove(r);r.geometry.dispose();r.material.dispose();return;}r.scale.setScalar(1+t*6);r.material.opacity=.8*(1-t);requestAnimationFrame(animate);};animate();}
  drawMap(canvas,level,dog){
    const ctx=canvas.getContext('2d'),w=canvas.width,h=canvas.height,b=level.bounds,px=x=>8+(x-b.minX)/(b.maxX-b.minX)*(w-16),pz=z=>8+(z-b.minZ)/(b.maxZ-b.minZ)*(h-16);
    ctx.fillStyle='#c9d8b7';ctx.fillRect(0,0,w,h);
    ctx.lineWidth=5;ctx.strokeStyle='#e2d4b2';for(const r of level.roads){ctx.beginPath();ctx.moveTo(px(r.from.x),pz(r.from.z));ctx.lineTo(px(r.to.x),pz(r.to.z));ctx.stroke();}
    for(const r of level.rivers){const rw=r.width/(b.maxX-b.minX)*(w-16);ctx.fillStyle='#8bbec6';ctx.fillRect(px(r.x)-rw/2,0,rw,h);ctx.fillStyle='#e2c29b';for(const bridge of r.bridges)ctx.fillRect(px(r.x)-rw/2-2,pz(bridge.z)-bridge.width/(b.maxZ-b.minZ)*(h-16)/2,rw+4,bridge.width/(b.maxZ-b.minZ)*(h-16));}
    ctx.strokeStyle='#a38a65';ctx.lineWidth=2;for(const f of level.fences){let z=f.minZ;for(const g of [...f.gates,{z:f.maxZ+10,width:20}]){ctx.beginPath();ctx.moveTo(px(f.x),pz(z));ctx.lineTo(px(f.x),pz(g.z-g.width/2));ctx.stroke();z=g.z+g.width/2;}}
    const dot=(x,z,r,c)=>{ctx.fillStyle=c;ctx.beginPath();ctx.arc(px(x),pz(z),r,0,Math.PI*2);ctx.fill();};
    dot(level.target.x,level.target.z,9,'#f9e7a2');for(const a of level.animals)dot(a.x,a.z,a.type==='cow'?3:2.3,a.saved?'#80a777':'#fff8e7');dot(dog.x,dog.z,4.8,'#c9843b');ctx.strokeStyle='#fff2d0';ctx.lineWidth=2;ctx.beginPath();ctx.arc(px(dog.x),pz(dog.z),6,0,Math.PI*2);ctx.stroke();
    for(const h of level.helpers||[])dot(h.x,h.z,3,'#4a9c9b');
  }
}
