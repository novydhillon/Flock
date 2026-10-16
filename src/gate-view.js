import * as THREE from 'three';
import { ConvexGeometry } from 'three/addons/geometries/ConvexGeometry.js';
import { mergeVertices } from 'three/addons/utils/BufferGeometryUtils.js';

function ownedGroup(){
  const group=new THREE.Group(),geometries=new Set(),materials=new Set();
  group.ownGeometry=value=>(geometries.add(value),value);
  group.ownMaterial=value=>(materials.add(value),value);
  group.dispose=()=>{group.traverse(object=>{if(object.isInstancedMesh)object.dispose();});geometries.forEach(g=>g.dispose());materials.forEach(m=>m.dispose());};
  return group;
}
/** Panels slide along the existing barrier: an open passage has no leaf
 * projecting into its ground corridor. All resources belong to this group. */
export function createGateView(gates=[]){
  const group=ownedGroup(),wood=group.ownMaterial(new THREE.MeshStandardMaterial({color:'#a97640',roughness:.9})),metal=group.ownMaterial(new THREE.MeshStandardMaterial({color:'#4e594b',roughness:.7}));
  const cube=group.ownGeometry(new THREE.BoxGeometry(1,1,1)),panels=[];
  const pending=new Map();
  const box=(parent,x,y,w,h,d,material)=>{let byMaterial=pending.get(parent);if(!byMaterial)pending.set(parent,byMaterial=new Map());let parts=byMaterial.get(material);if(!parts)byMaterial.set(material,parts=[]);parts.push({x,y,w,h,d});};
  for(const gate of gates.filter(g=>g.operable)){
    const local=new THREE.Group();local.position.set(gate.x,0,gate.z);local.rotation.y=gate.heading;group.add(local);
    for(const x of [-gate.width/2,gate.width/2])box(local,x,.85,.22,1.7,.3,metal);
    const panel=new THREE.Group();panel.name='gate-panel';local.add(panel);
    for(const y of [.45,1.2])box(panel,0,y,gate.width,.15,.22,wood);
    for(let i=0;i<=Math.ceil(gate.width/1.2);i++)box(panel,-gate.width/2+gate.width*i/Math.ceil(gate.width/1.2),.82,.14,1.05,.19,wood);
    box(panel,gate.width/2-.35,.85,.24,.28,.3,metal);
    panels.push({gate,panel});
  }
  const matrix=new THREE.Matrix4();
  for(const [parent,byMaterial] of pending)for(const [material,parts] of byMaterial){
    const mesh=new THREE.InstancedMesh(cube,material,parts.length);
    parts.forEach((part,i)=>{matrix.makeScale(part.w,part.h,part.d);matrix.setPosition(part.x,part.y,0);mesh.setMatrixAt(i,matrix);});
    mesh.castShadow=mesh.receiveShadow=true;parent.add(mesh);
  }
  group.update=()=>{for(const {gate,panel} of panels)panel.position.x=gate.open?-gate.width:0;};
  group.update();return group;
}

// Local deterministic noise never consumes simulation/world random state.
function wallRandom(seed){
  let state=seed>>>0;
  return ()=>{state=(Math.imul(state,1664525)+1013904223)>>>0;return state/4294967296;};
}

function clayStone(variant){
  const points=[];
  // A bevelled 24-vertex hull needs only 44 triangles per stone.
  for(let axis=0;axis<3;axis++)for(const side of [-1,1])for(const u of [-.34,.34])for(const v of [-.34,.34]){
    const point=new THREE.Vector3();point.setComponent(axis,side*.5);point.setComponent((axis+1)%3,u);point.setComponent((axis+2)%3,v);points.push(point);
  }
  const source=new ConvexGeometry(points),positions=source.attributes.position;
  for(let i=0;i<positions.count;i++){
    const x=positions.getX(i),y=positions.getY(i),z=positions.getZ(i);
    // Continuous deformation keeps shared corners together; no cracked faces.
    const dent=1+.06*Math.sin(x*8+y*5+z*7+variant*2.3);
    positions.setXYZ(i,x*dent,y*dent,z*dent);
  }
  source.deleteAttribute('normal');
  const geometry=mergeVertices(source);source.dispose();geometry.computeBoundingBox();
  const size=new THREE.Vector3(),center=new THREE.Vector3();
  geometry.boundingBox.getSize(size);geometry.boundingBox.getCenter(center);
  geometry.translate(-center.x,-center.y,-center.z);geometry.scale(1/size.x,1/size.y,1/size.z);
  geometry.computeVertexNormals();geometry.computeBoundingBox();return geometry;
}

/** Hand-laid dry stone, wholly inside the existing .6-unit collision strip.
 * Broad lower stones, staggered smaller infill and upright coping have no mortar.
 * Three shared low-poly clay shapes keep draw calls independent of wall length. */
export function createStoneWallView(segments=[]){
  const group=ownedGroup(),material=group.ownMaterial(new THREE.MeshStandardMaterial({color:'#ffffff',roughness:1}));
  const batches=[[],[],[]],palette=['#a5a393','#b5ad98','#92978c','#bdb6a5','#989b95','#aaa99b'];
  for(const segment of segments.filter(s=>s.material==='stone')){
    const {a,b}=segment,length=Math.hypot(b.x-a.x,b.z-a.z);if(length<.001)continue;
    const random=wallRandom(Math.round(a.x*997+a.z*7919+b.x*104729+b.z*1543)),yaw=-Math.atan2(b.z-a.z,b.x-a.x);
    for(let row=0;row<4;row++){
      const coping=row===3,nominal=coping?.48:row===0?1.24:.98;
      const count=Math.max(1,Math.ceil(length/nominal)),weights=Array.from({length:count},()=>.7+random()*.6),sum=weights.reduce((v,w)=>v+w,0);
      let start=0;
      for(const weight of weights){
        const span=length*weight/sum,end=start+span,mid=(start+end)/2;
        // No in-plane rotation: the exact projected bounds retain gate clearance.
        batches[Math.floor(random()*3)].push({
          x:a.x+(b.x-a.x)*mid/length,z:a.z+(b.z-a.z)*mid/length,yaw,
          y:coping?1.12+(random()-.5)*.055:.175+row*.325+(random()-.5)*.025,
          width:Math.max(.0001,span-Math.min(.018,span*.08)),
          height:coping?.25+random()*.12:.34+random()*.035,
          depth:(coping?.43:.59-row*.055)*( .94+random()*.06),
          color:palette[Math.floor(random()*palette.length)],
        });
        start=end;
      }
    }
  }
  const matrix=new THREE.Matrix4(),q=new THREE.Quaternion(),axis=new THREE.Vector3(0,1,0),scale=new THREE.Vector3(),position=new THREE.Vector3(),color=new THREE.Color();
  for(const [variant,blocks] of batches.entries()){
    if(!blocks.length)continue;
    const mesh=new THREE.InstancedMesh(group.ownGeometry(clayStone(variant)),material,blocks.length);
    mesh.name='clay-drystone';
    blocks.forEach((block,i)=>{
      position.set(block.x,block.y,block.z);q.setFromAxisAngle(axis,block.yaw);scale.set(block.width,block.height,block.depth);
      matrix.compose(position,q,scale);mesh.setMatrixAt(i,matrix);mesh.setColorAt(i,color.set(block.color));
    });
    mesh.castShadow=mesh.receiveShadow=true;group.add(mesh);
  }
  return group;
}
