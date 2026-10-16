import test from 'node:test';
import assert from 'node:assert/strict';
import {JSDOM} from 'jsdom';
import {createLevel,gateSegment,canOccupy,moveBody,hasClearGroundPath,hasClearPlayerSignal,distance} from '../src/world.js';
import {accessibleGate,openNearbyGate,createGateControl} from '../src/gates.js';
import {createGateView,createStoneWallView} from '../src/gate-view.js';
import {stepSimulation} from '../src/simulation.js';

const near=(gate,side=-1,d=2)=>({x:gate.x+Math.sin(gate.heading)*d*side,z:gate.z+Math.cos(gate.heading)*d*side});

test('the level-20 transition closes every passage, an explicit nearby action opens it, and restart restores it',()=>{
  assert.ok(createLevel(18).gates.every(g=>g.open&&!g.operable));
  for(const index of [19,23,50,99])for(const seed of [200,201,202,203]){
    const level=createLevel(index,seed);
    assert.ok(level.gates.length);
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
  const level=createLevel(19,200),gate=level.gates[0],dog=near(gate,-1,3);
  assert.equal(accessibleGate(level,dog),gate);
  const middle=near(gate,-1,1.8);level.obstacles.push({...middle,radius:.35});
  assert.equal(accessibleGate(level,dog),null);
  assert.equal(openNearbyGate(level,dog,gate.id),false);
});

test('real touch controller opens the selected gate with one action, hides during pause, and leaves bark independent',()=>{
  const dom=new JSDOM('<div id="controls"><button id="bark">Woof</button></div>'),document=dom.window.document;
  const level=createLevel(19,200),gate=level.gates[0],dog=near(gate);let playing=true,opens=0,barks=0;
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
  const stone=createLevel(23,200),wood=createLevel(22,200);
  assert.ok(stone.fenceSegments.some(s=>s.material==='stone'));
  assert.ok(wood.fenceSegments.every(s=>s.material==='wood'));
  const segment=stone.fenceSegments.find(s=>s.kind==='interior'),p={x:(segment.a.x+segment.b.x)/2,z:(segment.a.z+segment.b.z)/2},dx=segment.b.x-segment.a.x,dz=segment.b.z-segment.a.z,d=Math.hypot(dx,dz);
  const a={x:p.x-dz/d*2,z:p.z+dx/d*2},b={x:p.x+dz/d*2,z:p.z-dx/d*2};
  assert.equal(canOccupy(stone,p.x,p.z,.55),false);assert.equal(hasClearPlayerSignal(stone,a,b),false);
  for(const gate of stone.gates){gate.open=true;assert.ok(hasClearGroundPath(stone,near(gate),near(gate,1),.8));}
});

test('gate visuals follow descriptor state and own disposable resources; masonry stays on physical centerlines',()=>{
  const level=createLevel(23,200),view=createGateView(level.gates),stone=createStoneWallView(level.fenceSegments);
  const panels=view.children.map(local=>local.getObjectByName('gate-panel'));
  assert.ok(panels.every(panel=>panel.position.x===0));
  level.gates[0].open=true;view.update();assert.equal(panels[0].position.x,-level.gates[0].width);assert.equal(panels[1].position.x,0);
  const endpoints=gateSegment(level.gates[0]);assert.ok(Math.abs(distance(endpoints.a,endpoints.b)-level.gates[0].width)<.00001);
  assert.ok(stone.children[0].count>0);let disposed=0;
  stone.children[0].geometry.addEventListener('dispose',()=>disposed++);stone.dispose();assert.equal(disposed,1);view.dispose();
});

test('closed gate prevents remote companions from delivering a flock, with no automatic gate action',()=>{
  const level={index:23,reward:300,bounds:{minX:-40,maxX:40,minZ:-30,maxZ:30},target:{x:18,z:0,radius:5,heading:Math.PI/2,type:'pen'},dog:{x:-15,z:0},animals:Array.from({length:4},(_,id)=>({id,type:'sheep',x:-3-(id%2)*2,z:Math.floor(id/2)*2,vx:5,vz:0,saved:false})),rivers:[],routes:[],obstacles:[],fenceSegments:[{a:{x:0,z:-30},b:{x:0,z:-5},kind:'interior'},{a:{x:0,z:5},b:{x:0,z:30},kind:'interior'}],gates:[{id:'gate-0',x:0,z:0,width:10,heading:Math.PI/2,open:false,operable:true}]};
  for(let i=0;i<600;i++)stepSimulation(level,level.dog,{},.1,{helper:3,drone:3,cohesion:3});
  assert.equal(level.gates[0].open,false);assert.equal(level.animals.filter(a=>a.saved).length,0);assert.ok(level.animals.every(a=>a.x<0));
});
