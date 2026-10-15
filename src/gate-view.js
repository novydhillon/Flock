import * as THREE from 'three';

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

/** Alternating masonry courses use the same .6-unit physical footprint. */
export function createStoneWallView(segments=[]){
  const group=ownedGroup(),geometry=group.ownGeometry(new THREE.BoxGeometry(1,1,1)),material=group.ownMaterial(new THREE.MeshStandardMaterial({color:'#8a8d7b',roughness:1}));
  const blocks=[];
  for(const segment of segments.filter(s=>s.material==='stone')){
    const {a,b}=segment,length=Math.hypot(b.x-a.x,b.z-a.z);if(length<.001)continue;
    const count=Math.max(1,Math.ceil(length/1.7)),yaw=-Math.atan2(b.z-a.z,b.x-a.x);
    for(let row=0;row<3;row++)for(let i=0;i<count;i++){
      const start=Math.max(0,(i-(row%2)*.35)/count),end=Math.min(1,(i+1-(row%2)*.35)/count);
      if(end<=start)continue;
      blocks.push({x:a.x+(b.x-a.x)*(start+end)/2,z:a.z+(b.z-a.z)*(start+end)/2,y:.22+row*.44,width:length*(end-start)-.025,yaw});
      if(row%2&&i===count-1)blocks.push({x:b.x-(b.x-a.x)*.175/count,z:b.z-(b.z-a.z)*.175/count,y:.22+row*.44,width:length*.35/count-.025,yaw});
    }
  }
  const mesh=new THREE.InstancedMesh(geometry,material,blocks.length),matrix=new THREE.Matrix4(),q=new THREE.Quaternion(),scale=new THREE.Vector3(),position=new THREE.Vector3();
  blocks.forEach((block,i)=>{position.set(block.x,block.y,block.z);q.setFromAxisAngle(new THREE.Vector3(0,1,0),block.yaw);scale.set(Math.max(.01,block.width),.42,.6);matrix.compose(position,q,scale);mesh.setMatrixAt(i,matrix);});
  mesh.castShadow=mesh.receiveShadow=true;group.add(mesh);return group;
}
