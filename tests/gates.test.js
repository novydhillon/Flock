import test from 'node:test';
import assert from 'node:assert/strict';
import {JSDOM} from 'jsdom';
import * as THREE from 'three';
import {createLevel,gateSegment,canOccupy,moveBody,hasClearGroundPath,hasClearPlayerSignal,distance} from '../src/world.js';
import {accessibleGate,openNearbyGate,createGateControl,gateButtons,updateGateContacts} from '../src/gates.js';
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
  const buttons=view.children.filter(local=>local.name==='gate-button');assert.equal(buttons.length,panels.length*2);
  assert.ok(buttons.every(button=>button.material.color.getHexString()==='d54b45'));
  assert.ok(panels.every(panel=>panel.position.x===0));
  level.gates[0].open=true;view.update();assert.equal(panels[0].position.x,-level.gates[0].width);if(panels[1])assert.equal(panels[1].position.x,0);assert.ok(buttons.slice(0,2).every(button=>button.material.color.getHexString()==='55b76b'));
  const endpoints=gateSegment(level.gates[0]);assert.ok(Math.abs(distance(endpoints.a,endpoints.b)-level.gates[0].width)<.00001);
  assert.ok(stone.children[0].count>0);let disposed=0;
  stone.children[0].geometry.addEventListener('dispose',()=>disposed++);stone.dispose();assert.equal(disposed,1);view.dispose();
});

test('closed gate prevents remote companions from delivering a flock, with no automatic gate action',()=>{
  const level={index:23,reward:300,bounds:{minX:-40,maxX:40,minZ:-30,maxZ:30},target:{x:18,z:0,radius:5,heading:Math.PI/2,type:'pen'},dog:{x:-15,z:0},animals:Array.from({length:4},(_,id)=>({id,type:'sheep',x:-3-(id%2)*2,z:Math.floor(id/2)*2,vx:5,vz:0,saved:false})),rivers:[],routes:[],obstacles:[],fenceSegments:[{a:{x:0,z:-30},b:{x:0,z:-5},kind:'interior'},{a:{x:0,z:5},b:{x:0,z:30},kind:'interior'}],gates:[{id:'gate-0',x:0,z:0,width:10,heading:Math.PI/2,open:false,operable:true}]};
  for(let i=0;i<600;i++)stepSimulation(level,level.dog,{},.1,{helper:3,drone:3,cohesion:3});
  assert.equal(level.gates[0].open,false);assert.equal(level.animals.filter(a=>a.saved).length,0);assert.ok(level.animals.every(a=>a.x<0));
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

test('both ground buttons toggle only on fresh Pip contact, update collision and reset on restart',()=>{
  for(const heading of [0,Math.PI/2,Math.PI,Math.PI*1.5])for(const material of ['wood','stone']){
    const gate={id:'contact',x:0,z:0,width:10,heading,material,open:false,operable:true};
    const f={x:Math.sin(heading),z:Math.cos(heading)},l={x:f.z,z:-f.x};
    const level={gates:[gate],animals:[],helpers:[],bounds:{minX:-30,maxX:30,minZ:-30,maxZ:30},rivers:[],obstacles:[],fenceSegments:[{a:{x:l.x*5,z:l.z*5},b:{x:l.x*30,z:l.z*30},material},{a:{x:-l.x*5,z:-l.z*5},b:{x:-l.x*30,z:-l.z*30},material}],flockVisibility:new Map([['old',true]])};
    const pads=gateButtons(gate),dog={...pads[0]};
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

test('closing refuses to place a panel through livestock or a ground helper; helpers cannot press buttons',()=>{
  const level=gatedLevel(),gate=level.gates[0],pads=gateButtons(gate),dog={...pads[0]};
  updateGateContacts(level,dog);assert.equal(gate.open,true);
  updateGateContacts(level,{x:level.dog.x,z:level.dog.z});
  const cow={id:999,type:'cow',scale:1.25,x:gate.x,z:gate.z};level.animals.push(cow);
  Object.assign(dog,pads[1]);assert.equal(updateGateContacts(level,dog)[0].type,'gateBlocked');assert.equal(gate.open,true);
  level.animals.pop();updateGateContacts(level,level.dog);
  level.helpers=[{type:'helper',x:gate.x,z:gate.z}];assert.equal(updateGateContacts(level,dog)[0].type,'gateBlocked');assert.equal(gate.open,true);
  level.helpers=[{type:'helper',...pads[0]}];updateGateContacts(level,level.dog);assert.equal(gate.open,true,'helper on a pad does not activate it');
  assert.equal(updateGateContacts(level,dog)[0].open,false);
});

test('normal simulation movement presses a button, while paused steps do not',()=>{
  const level=gatedLevel(),gate=level.gates[0],pad=gateButtons(gate)[0],f={x:Math.sin(gate.heading),z:Math.cos(gate.heading)};
  level.animals=[];const dog={x:pad.x-f.x*1.5,z:pad.z-f.z*1.5};
  stepSimulation(level,dog,{},0,{});assert.equal(gate.open,false);
  const result=stepSimulation(level,dog,{x:f.x,z:f.z},.1,{});
  assert.equal(gate.open,true);assert.equal(result.events.filter(e=>e.type==='gateToggled').length,1);
});
