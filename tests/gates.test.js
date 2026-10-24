import test from 'node:test';
import assert from 'node:assert/strict';
import {JSDOM} from 'jsdom';
import * as THREE from 'three';
import {createLevel,gateSegment,canOccupy,moveBody,hasClearGroundPath,hasClearPlayerSignal,distance} from '../src/world.js';
import {accessibleGate,openNearbyGate,createGateControl,gateButtons,gateSwitchPanels,updateGateContacts} from '../src/gates.js';
import {createGateView,createStoneWallView} from '../src/gate-view.js';
import {stepSimulation} from '../src/simulation.js';

const near=(gate,side=-1,d=2)=>({x:gate.x+Math.sin(gate.heading)*d*side,z:gate.z+Math.cos(gate.heading)*d*side});

const gatedLevel=(index=19)=>{for(let seed=200;seed<300;seed++){const level=createLevel(index,seed);if(level.gates.some(g=>g.operable))return level;}throw Error('No gated fixture');};
const stoneLevel=()=>{for(let seed=200;seed<400;seed++){const level=createLevel(23,seed);if(level.fenceSegments.some(s=>s.material==='stone'))return level;}throw Error('No stone fixture');};

test('operable gates remain closed until Pip acts and restart restores them',()=>{
  assert.ok(createLevel(18).gates.every(g=>g.open&&!g.operable));
  for(const index of [19,23,50,99])for(const seed of [200,201,202,203]){
    const level=createLevel(index,seed);

    for(const gate of level.gates){
      const a=near(gate),b=near(gate,1);
      assert.equal(gate.open,false);
      assert.equal(canOccupy(level,gate.x,gate.z,.55),false);
      assert.equal(hasClearGroundPath(level,a,b,.78),false);
      assert.equal(hasClearPlayerSignal(level,a,b),false);
      for(const radius of [.55,.62,.78]){const body={...a};moveBody(level,body,b.x-body.x,b.z-body.z,radius);assert.ok(distance(body,b)>2);}
      assert.equal(openNearbyGate(level,level.dog,gate.id),false,'remote Pip cannot activate it');
      assert.equal(accessibleGate(level,a),gate);
      level.flockVisibility=new Map([['old',{}]]);
      assert.equal(openNearbyGate(level,a,gate.id),true);
      assert.equal(level.flockVisibility.size,0);
      assert.ok(hasClearGroundPath(level,a,b,.8));
      assert.ok(hasClearPlayerSignal(level,a,b));
      const walker={...a};moveBody(level,walker,b.x-a.x,b.z-a.z,.78);assert.ok(distance(walker,b)<.001);
    }
    assert.ok(createLevel(index,seed).gates.every(g=>!g.open));
  }
});

test('a wall or tree between Pip and a nearby latch prevents interaction',()=>{
  const level=gatedLevel(),gate=level.gates[0],dog=near(gate,-1,3);
  assert.equal(accessibleGate(level,dog),gate);
  const middle=near(gate,-1,1.8);level.obstacles.push({...middle,radius:.35});
  assert.equal(accessibleGate(level,dog),null);
  assert.equal(openNearbyGate(level,dog,gate.id),false);
});

test('real touch controller opens the selected gate with one action, hides during pause, and leaves bark independent',()=>{
  const dom=new JSDOM('<div id="controls"><button id="bark">Woof</button></div>'),document=dom.window.document;
  const level=gatedLevel(),gate=level.gates[0],dog=near(gate);let playing=true,opens=0,barks=0;
  document.getElementById('bark').onclick=()=>barks++;
  const control=createGateControl({document,getState:()=>({level,dog,playing}),onOpen:()=>opens++});
  control.update();assert.equal(control.button.disabled,false);
  playing=false;control.update();assert.ok(control.button.classList.contains('hidden'));assert.equal(control.activate(),false);
  playing=true;control.update();control.button.dispatchEvent(new dom.window.Event('touchend',{bubbles:true,cancelable:true}));
  assert.equal(gate.open,true);assert.equal(opens,1);assert.equal(barks,0);assert.ok(control.button.classList.contains('hidden'));
  document.getElementById('bark').click();assert.equal(barks,1);
  control.button.click();assert.equal(opens,1,'stale/double clicks cannot activate another gate');
});

test('stone variants preserve the same segment openings and block bodies and herding signals',()=>{
  const stone=stoneLevel(),wood=Array.from({length:100},(_,i)=>createLevel(22,200+i)).find(l=>l.fenceSegments.every(s=>s.material==='wood'));
  assert.ok(stone.fenceSegments.some(s=>s.material==='stone'));
  assert.ok(wood.fenceSegments.every(s=>s.material==='wood'));
  const segment=stone.fenceSegments.find(s=>s.kind==='interior'),p={x:(segment.a.x+segment.b.x)/2,z:(segment.a.z+segment.b.z)/2},dx=segment.b.x-segment.a.x,dz=segment.b.z-segment.a.z,d=Math.hypot(dx,dz);
  const a={x:p.x-dz/d*2,z:p.z+dx/d*2},b={x:p.x+dz/d*2,z:p.z-dx/d*2};
  assert.equal(canOccupy(stone,p.x,p.z,.55),false);assert.equal(hasClearPlayerSignal(stone,a,b),false);
  for(const gate of stone.gates){gate.open=true;assert.ok(hasClearGroundPath(stone,near(gate),near(gate,1),.8));}
});

test('gate visuals follow descriptor state and own disposable resources; masonry stays on physical centerlines',()=>{
  const level=gatedLevel(23),view=createGateView(level.gates),stone=createStoneWallView(stoneLevel().fenceSegments);
  const panels=view.children.map(local=>local.getObjectByName('gate-panel')).filter(Boolean);
  const buttons=[];view.traverse(local=>{if(local.name==='gate-button')buttons.push(local);});assert.equal(buttons.length,panels.length*2);
  assert.ok(buttons.every(button=>button.parent.name==='gate-switch-panel'&&button.parent.position.y>1&&button.material.isMeshBasicMaterial&&!button.material.toneMapped));
  assert.ok(buttons.every(button=>button.material.color.getHexString()==='ff382b'));
  assert.ok(panels.every(panel=>panel.position.x===0));
  level.gates[0].open=true;view.update();assert.equal(panels[0].position.x,-level.gates[0].width);if(panels[1])assert.equal(panels[1].position.x,0);assert.ok(buttons.slice(0,2).every(button=>button.material.color.getHexString()==='32f56a'));
  const endpoints=gateSegment(level.gates[0]);assert.ok(Math.abs(distance(endpoints.a,endpoints.b)-level.gates[0].width)<.00001);
  assert.ok(stone.children[0].count>0);let disposed=0;
  stone.children[0].geometry.addEventListener('dispose',()=>disposed++);stone.dispose();assert.equal(disposed,1);view.dispose();
});

test('closed gate prevents remote companions from delivering a flock, with no automatic gate action',()=>{
  const level={index:23,reward:300,bounds:{minX:-40,maxX:40,minZ:-30,maxZ:30},target:{x:18,z:0,radius:5,heading:Math.PI/2,type:'pen'},dog:{x:-15,z:0},animals:Array.from({length:4},(_,id)=>({id,type:'sheep',x:-3-(id%2)*2,z:Math.floor(id/2)*2,vx:5,vz:0,saved:false})),rivers:[],routes:[],obstacles:[],fenceSegments:[{a:{x:0,z:-30},b:{x:0,z:-5},kind:'interior'},{a:{x:0,z:5},b:{x:0,z:30},kind:'interior'}],gates:[{id:'gate-0',x:0,z:0,width:10,heading:Math.PI/2,open:false,operable:true}]};
  for(let i=0;i<600;i++)stepSimulation(level,level.dog,{},.1,{helper:3,drone:3,cohesion:3});
  assert.equal(level.gates[0].open,false);assert.equal(level.animals.filter(a=>a.saved).length,0);assert.ok(level.animals.every(a=>a.x<0));
});

test('luminous gate domes retain visible coverage from the gameplay camera across fence headings',()=>{
  const towardCamera=new THREE.Vector3(0,36,31).normalize(),right=new THREE.Vector3(1,0,0),up=new THREE.Vector3(0,31,-36).normalize();
  for(const material of ['wood','stone'])for(let step=0;step<16;step++){
    const gate={id:'lit',x:0,z:0,width:10,heading:step*Math.PI/8,material,open:false,operable:true},view=createGateView([gate]);
    const wall=new THREE.Mesh(new THREE.BoxGeometry(25,1.5,material==='stone'?.6:.36),new THREE.MeshBasicMaterial());wall.position.set(Math.cos(gate.heading)*17.5,.75,-Math.sin(gate.heading)*17.5);wall.rotation.y=gate.heading;
    view.add(wall);view.updateMatrixWorld(true);
    const meshes=[],buttons=[];view.traverse(o=>{if(o.isMesh)meshes.push(o);if(o.name==='gate-button')buttons.push(o);});
    for(const open of [false,true]){
      gate.open=open;view.update();view.updateMatrixWorld(true);
      assert.ok(buttons.every(button=>button.material.color.getHexString()===(open?'32f56a':'ff382b')));
      const visible=buttons.map(button=>{
      const center=button.getWorldPosition(new THREE.Vector3());let hits=0;
      for(const [x,y] of [[0,0],[-.10,0],[.10,0],[0,.10],[0,-.10]]){
        const point=center.clone().addScaledVector(right,x).addScaledVector(up,y),ray=new THREE.Raycaster(point.clone().addScaledVector(towardCamera,10),towardCamera.clone().negate());
        const first=ray.intersectObjects(meshes,false)[0]?.object;
        if(first?.name==='gate-button'||first?.name==='gate-light-core')hits++;
      }
      return hits;
    });
      assert.ok(Math.max(...visible)>=4,`${material} heading ${step}, ${open?'open':'closed'}: a broad lamp surface must remain exposed, not an edge-on strip`);
    }
    wall.geometry.dispose();wall.material.dispose();view.dispose();
  }
});

test('gate lamp state switches dome and halo together with bounded disposable resources',()=>{
  const gate={id:'lit',x:0,z:0,width:10,heading:Math.PI/2,material:'stone',open:false,operable:true},view=createGateView([gate]),domes=[],halos=[],materials=new Set(),geometries=new Set(),textures=new Set();
  view.traverse(o=>{if(o.name==='gate-button')domes.push(o);if(o.name==='gate-light-halo')halos.push(o);if(o.isMesh)geometries.add(o.geometry);if(o.material){materials.add(o.material);if(o.material.map)textures.add(o.material.map);}assert.equal(o.isLight,undefined,'no per-panel realtime lights');});
  assert.equal(domes.length,2);assert.equal(halos.length,2);assert.equal(textures.size,1);
  const positions=domes.map(o=>o.getWorldPosition(new THREE.Vector3()));
  for(const open of [true,false,true,false]){
    gate.open=open;view.update();view.updateMatrixWorld(true);
    for(let i=0;i<2;i++){
      assert.equal(domes[i].material.color.getHexString(),open?'32f56a':'ff382b');assert.equal(halos[i].material.color.getHexString(),open?'32f56a':'ff382b');
      assert.equal(domes[i].material.toneMapped,false);assert.equal(halos[i].material.depthTest,true);assert.equal(halos[i].material.depthWrite,false);
      assert.ok(domes[i].getWorldPosition(new THREE.Vector3()).distanceTo(positions[i])<1e-8,'switch remains mounted while leaf moves');
    }
  }
  // Both state materials are owned even if only one is currently attached.
  gate.open=true;view.update();domes.forEach(o=>materials.add(o.material));halos.forEach(o=>materials.add(o.material));
  const counts=new Map([...materials,...geometries,...textures].map(resource=>[resource,0]));for(const resource of counts.keys())resource.addEventListener('dispose',()=>counts.set(resource,counts.get(resource)+1));
  view.dispose();assert.ok([...counts.values()].every(value=>value===1));
});


test('clay dry-stone instances are deterministic and contained within rotated wall endpoints and collision width',()=>{
  for(const angle of [0,Math.PI/2,.67])for(const length of [.005,.2,3.7,40]){
    const a={x:2,z:-3},b={x:a.x+Math.cos(angle)*length,z:a.z+Math.sin(angle)*length};
    const segment={a,b,material:'stone'},view=createStoneWallView([segment]),again=createStoneWallView([segment]);
    assert.ok(view.children.length<=3,'bounded draw calls');
    const matrix=new THREE.Matrix4(),v=new THREE.Vector3();
    let colors=new Set(),heights=new Set(),disposed=0;
    for(const [batch,mesh] of view.children.entries()){
      assert.deepEqual(mesh.instanceMatrix.array,again.children[batch].instanceMatrix.array);
      assert.deepEqual(mesh.instanceColor.array,again.children[batch].instanceColor.array);
      assert.equal(mesh.material.vertexColors,true,'weathering is visible on the shared material');
      const weather=mesh.geometry.attributes.color;
      assert.equal(weather.count,mesh.geometry.attributes.position.count);
      assert.deepEqual(weather.array,again.children[batch].geometry.attributes.color.array);
      assert.ok(Array.from(weather.array).every(Number.isFinite));
      assert.ok(new Set(Array.from(weather.array,x=>x.toFixed(3))).size>6,'weathering varies across each stone');
      assert.ok((mesh.geometry.index?.count??mesh.geometry.attributes.position.count)/3<=44,'bounded per-stone triangle count');
      mesh.geometry.addEventListener('dispose',()=>disposed++);
      for(let i=0;i<mesh.count;i++){
        mesh.getMatrixAt(i,matrix);heights.add(matrix.elements[13].toFixed(3));
        colors.add(Array.from(mesh.instanceColor.array.slice(i*3,i*3+3)).join(','));
        for(let j=0;j<mesh.geometry.attributes.position.count;j++){
          v.fromBufferAttribute(mesh.geometry.attributes.position,j).applyMatrix4(matrix);
          const dx=v.x-a.x,dz=v.z-a.z,along=dx*Math.cos(angle)+dz*Math.sin(angle),across=-dx*Math.sin(angle)+dz*Math.cos(angle);
          assert.ok(along>=-1e-5&&along<=length+1e-5,'no stones project into openings');
          assert.ok(Math.abs(across)<=.30001,'visuals fit collision width');
          assert.ok(v.y>=-.03&&v.y<1.4,'low, grounded field-wall silhouette');
        }
      }
    }
    assert.ok(colors.size>1);assert.ok(heights.size>=4);
    const geometryCount=view.children.length;view.dispose();again.dispose();assert.equal(disposed,geometryCount);
  }
  const wood={a:{x:0,z:0},b:{x:5,z:0},material:'wood'};
  assert.equal(createStoneWallView([wood]).children.length,0);
});

test('both wall panels have reachable approaches and toggle only on fresh contact, updating collision and restart state',()=>{
  for(const heading of [0,Math.PI/2,Math.PI,Math.PI*1.5])for(const material of ['wood','stone']){
    const gate={id:'contact',x:0,z:0,width:10,heading,material,open:false,operable:true};
    const f={x:Math.sin(heading),z:Math.cos(heading)},l={x:f.z,z:-f.x};
    const level={gates:[gate],animals:[],helpers:[],bounds:{minX:-30,maxX:30,minZ:-30,maxZ:30},rivers:[],obstacles:[],fenceSegments:[{a:{x:l.x*5,z:l.z*5},b:{x:l.x*30,z:l.z*30},material},{a:{x:-l.x*5,z:-l.z*5},b:{x:-l.x*30,z:-l.z*30},material}],flockVisibility:new Map([['old',true]])};
    const pads=gateButtons(gate),dog={...pads[0]};
    const view=createGateView([gate]),housings=view.children.filter(child=>child.name==='gate-switch-panel');
    gateSwitchPanels(gate).forEach((panel,i)=>{
      const normal=(panel.x-gate.x)*f.x+(panel.z-gate.z)*f.z;
      const lateral=(panel.x-gate.x)*l.x+(panel.z-gate.z)*l.z;
      assert.ok(Math.abs(Math.abs(normal)-(material==='stone'?.38:.26))<1e-8);
      assert.ok(lateral>gate.width/2,'mounted beside the fixed opening');
      assert.ok(housings[i].position.distanceTo(new THREE.Vector3(panel.x,panel.y,panel.z))<1e-8);
      const facing=new THREE.Vector3(0,0,1).applyQuaternion(housings[i].quaternion);
      assert.ok(Math.abs(facing.x-f.x*panel.sign)<1e-8&&Math.abs(facing.z-f.z*panel.sign)<1e-8);
    });view.dispose();
    for(const pad of pads){assert.ok(canOccupy(level,pad.x,pad.z,.62));assert.ok(hasClearGroundPath(level,{x:pad.x+f.x*2*Math.sign(pad.x*f.x+pad.z*f.z),z:pad.z+f.z*2*Math.sign(pad.x*f.x+pad.z*f.z)},pad,.62));}
    assert.equal(updateGateContacts(level,dog)[0].open,true);assert.equal(level.flockVisibility.size,0);assert.equal(level.geometryRevision,1);
    assert.ok(hasClearGroundPath(level,near(gate),near(gate,1),.975));
    for(let i=0;i<60;i++)assert.deepEqual(updateGateContacts(level,dog),[]);
    updateGateContacts(level,{x:-15,z:-15});Object.assign(dog,pads[1]);
    assert.equal(updateGateContacts(level,dog)[0].open,false);assert.equal(level.geometryRevision,2);
    assert.equal(hasClearGroundPath(level,near(gate),near(gate,1),.62),false);
    const restarted=gatedLevel();assert.ok(restarted.gates.every(g=>!g.buttonContact&&!g.open));
  }
});

test('closing refuses to place a panel through livestock or a ground helper',()=>{
  const level=gatedLevel(),gate=level.gates[0],pads=gateButtons(gate),dog={...pads[0]};
  updateGateContacts(level,dog);assert.equal(gate.open,true);
  updateGateContacts(level,{x:level.dog.x,z:level.dog.z});
  const cow={id:999,type:'cow',scale:1.25,x:gate.x,z:gate.z};level.animals.push(cow);
  Object.assign(dog,pads[1]);assert.equal(updateGateContacts(level,dog)[0].type,'gateBlocked');assert.equal(gate.open,true);
  level.animals.pop();updateGateContacts(level,level.dog);
  level.helpers=[{type:'helper',x:gate.x,z:gate.z}];assert.equal(updateGateContacts(level,dog)[0].type,'gateBlocked');assert.equal(gate.open,true);
  level.helpers=[];updateGateContacts(level,level.dog);
  assert.equal(updateGateContacts(level,dog)[0].open,false);
});

test('Buddy and Pip share one latch across simultaneous contact and handoffs; animals and drones cannot activate',()=>{
  const level=gatedLevel(),gate=level.gates[0],pads=gateButtons(gate),away={...level.dog};
  level.animals=[];level.helpers=[{type:'drone',...pads[0]}];
  assert.deepEqual(updateGateContacts(level,away),[]);assert.equal(gate.open,false);
  level.animals=[{id:999,type:'sheep',...pads[0]}];
  assert.deepEqual(updateGateContacts(level,away),[]);assert.equal(gate.open,false);
  const buddy={type:'helper',...pads[0]};level.helpers.push(buddy);
  assert.equal(updateGateContacts(level,away)[0].open,true,'Buddy presses the wall panel');
  assert.deepEqual(updateGateContacts(level,pads[1]),[],'Pip joining cannot immediately reverse Buddy');
  Object.assign(buddy,away);
  assert.deepEqual(updateGateContacts(level,pads[1]),[],'Pip holds the shared contact after Buddy leaves');
  updateGateContacts(level,away);
  Object.assign(buddy,pads[0]);
  assert.equal(updateGateContacts(level,pads[1])[0].open,false,'simultaneous fresh contacts toggle once');
  assert.equal(level.geometryRevision,2);
});

test('simulation allows active Buddy contact and removes inactive helper contacts before evaluating panels',()=>{
  for(const helper of [0,3]){
    const level=gatedLevel(),gate=level.gates[0],pad=gateButtons(gate)[0];
    level.animals=[];level.helpers=[{type:'helper',...pad}];
    const result=stepSimulation(level,level.dog,{},.001,{helper});
    assert.equal(gate.open,helper>0);assert.equal(result.events.filter(e=>e.type==='gateToggled').length,helper>0?1:0);
  }
});

test('Buddy cannot close a gate onto Pip, and an obstructed panel approach cannot activate',()=>{
  const level=gatedLevel(),gate=level.gates[0],pad=gateButtons(gate)[0];
  level.animals=[];
  updateGateContacts(level,pad);updateGateContacts(level,level.dog);
  level.helpers=[{type:'helper',...pad}];
  assert.equal(updateGateContacts(level,{x:gate.x,z:gate.z})[0].type,'gateBlocked');
  assert.equal(gate.open,true);
  level.helpers=[];updateGateContacts(level,level.dog);gate.open=false;
  const f={x:Math.sin(gate.heading),z:Math.cos(gate.heading)};
  const dog={x:pad.x+f.z,z:pad.z-f.x};
  level.obstacles.push({type:'tree',x:pad.x,z:pad.z,radius:.2});
  assert.ok(canOccupy(level,dog.x,dog.z,.62));
  assert.deepEqual(updateGateContacts(level,dog),[]);assert.equal(gate.open,false);
});

test('wall panel approach centres remain occupiable across generated rotated gate layouts',()=>{
  for(const index of [19,23,50,99])for(const seed of [200,201,202,203]){
    const level=createLevel(index,seed);
    for(const gate of level.gates.filter(g=>g.operable))for(const pad of gateButtons(gate)){
      assert.ok(canOccupy(level,pad.x,pad.z,.62),`approach blocked: level ${index+1}, seed ${seed}, ${gate.id}`);
    }
  }
});

test('normal simulation movement presses a button, while paused steps do not',()=>{
  const level=gatedLevel(),gate=level.gates[0],pad=gateButtons(gate)[0],f={x:Math.sin(gate.heading),z:Math.cos(gate.heading)};
  level.animals=[];const dog={x:pad.x-f.x*1.3,z:pad.z-f.z*1.3};
  stepSimulation(level,dog,{},0,{});assert.equal(gate.open,false);
  const result=stepSimulation(level,dog,{x:f.x,z:f.z},.1,{});
  assert.equal(gate.open,true);assert.equal(result.events.filter(e=>e.type==='gateToggled').length,1);
});
