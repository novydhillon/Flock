import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import vm from 'node:vm';
import {JSDOM} from 'jsdom';
import * as THREE from 'three';

function api(){const context={};const source=readFileSync(new URL('../src/qa.js',import.meta.url),'utf8').replace(/^import .*;\s*$/gm,'').replace(/^export /gm,'');vm.runInNewContext(source+'\nglobalThis.api={nextQAWanderCheck,applyQAWanderTints,installQA};',context);return context.api;}
const {nextQAWanderCheck,applyQAWanderTints,installQA}=api();
const animals=()=>[{id:0,saved:false,wander:{bolting:true},nextWanderCheck:7},{id:1,saved:true,wander:{bolting:true},nextWanderCheck:7},{id:2,saved:false,wander:{bolting:false},nextWanderCheck:6}];
function batch(){const mesh=new THREE.InstancedMesh(new THREE.BoxGeometry(),new THREE.MeshStandardMaterial(),3);return{meshes:[mesh],visibleIndices:[2,0]};}
function rgb(mesh,slot){const c=new THREE.Color();mesh.getColorAt(slot,c);return[c.r,c.g,c.b].map(n=>Math.round(n*100)/100);}

test('QA tints follow compacted instance identities, reset on disable, and never change shared materials or animals',()=>{
  const b=batch(),mesh=b.meshes[0],renderer={animalBatches:[b]},level={animals:animals()},before=structuredClone(level);
  const material=mesh.material.color.clone();
  applyQAWanderTints(renderer,level,false);assert.equal(mesh.instanceColor,null,'disabled debug allocates no per-instance colors');
  applyQAWanderTints(renderer,level,true);
  assert.deepEqual(rgb(mesh,0),[1,.88,.08]);assert.deepEqual(rgb(mesh,1),[1,.10,.08]);
  assert.deepEqual(level,before,'tracking selection does not modify gameplay state');
  b.visibleIndices=[1,0,2];applyQAWanderTints(renderer,level,true);
  assert.deepEqual(rgb(mesh,0),[1,1,1],'delivered animals stay untinted');
  assert.deepEqual(rgb(mesh,1),[1,.10,.08]);assert.deepEqual(rgb(mesh,2),[1,.88,.08]);
  level.animals[0].wanderHome={};delete level.animals[0].wander;
  level.animals[2].wanderHome={};delete level.animals[2].wander;
  applyQAWanderTints(renderer,level,true);
  assert.deepEqual(rgb(mesh,1),[1,.10,.08],'settled bolter keeps its red tracking tint');
  assert.deepEqual(rgb(mesh,2),[1,.88,.08],'settled wanderer keeps its yellow tracking tint');
  level.time=6;level.animals[2].nextWanderCheck=13;applyQAWanderTints(renderer,level,true);
  assert.deepEqual(rgb(mesh,2),[1,1,1],'selection expires at its original next-check time, not the rescheduled deadline');
  assert.deepEqual(rgb(mesh,1),[1,.10,.08],'other animals retain their own countdown');
  delete level.animals[0].wanderHome;level.time=6.5;applyQAWanderTints(renderer,level,true);
  assert.deepEqual(rgb(mesh,1),[1,.10,.08],'herding does not prematurely clear selection tint');
  level.time=7;applyQAWanderTints(renderer,level,true);assert.deepEqual(rgb(mesh,1),[1,1,1]);
  level.animals[0].wander={bolting:true};level.animals[0].nextWanderCheck=12;
  applyQAWanderTints(renderer,level,true);assert.deepEqual(rgb(mesh,1),[1,.10,.08],'a new choice refreshes its tint');
  level.time=12;level.animals[0].nextWanderCheck=19;
  applyQAWanderTints(renderer,level,true);assert.deepEqual(rgb(mesh,1),[1,1,1],'long bolt does not extend tint beyond the next check');
  const afterSettling=structuredClone(level);
  b.visibleIndices=[1]; // Hidden instance slots must also reset before the hook is removed.
  applyQAWanderTints(renderer,level,false);
  for(let i=0;i<3;i++)assert.deepEqual(rgb(mesh,i),[1,1,1]);
  assert.ok(mesh.material.color.equals(material));assert.deepEqual(level,afterSettling);
  mesh.geometry.dispose();mesh.material.dispose();mesh.dispose();
});

test('QA countdown reads the soonest eligible non-excursion check without changing behavior',()=>{
  const level={index:16,time:20,wanderCohort:new Set([0,1,2,3,4]),animals:[{id:0,nextWanderCheck:25.5},{id:1,saved:true,nextWanderCheck:20.1},{id:2,wander:{},nextWanderCheck:20.2},{id:3,wanderHome:{},nextWanderCheck:20.3},{id:4,nextWanderCheck:27},{id:5,nextWanderCheck:20.01}]};
  const before=structuredClone(level);assert.equal(nextQAWanderCheck(level),5.5);assert.deepEqual(level,before);
  level.time=22;assert.equal(nextQAWanderCheck(level),3.5);
  assert.equal(nextQAWanderCheck({...level,index:0}),null);assert.equal(nextQAWanderCheck({...level,completed:true}),null);
  assert.equal(nextQAWanderCheck({...level,wanderCohort:undefined}),null);
});

test('one QA checkbox controls countdown and pre-draw tints through pause, level replacement, disable and destruction',async()=>{
  const dom=new JSDOM('<div id="controls"><div class="control-right"><button id="bark">Woof</button></div></div>'),doc=dom.window.document;
  let mode='playing',level={index:16,time:1,bounds:{minX:-50,maxX:50,minZ:-50,maxZ:50},animals:animals(),wanderCohort:new Set([0,1,2])};
  level.animals[2].wander=undefined;level.animals[2].nextWanderCheck=6;
  const b=batch(),renderer={animalBatches:[b],updateAnimalBatches(){}};const original=renderer.updateAnimalBatches;
  const bridge={getState:()=>({level,profile:{points:0}}),getMode:()=>mode,getRenderer:()=>renderer,enterSession:async()=>{},pause:()=>{mode='qa';},resume:()=>{mode='playing';},isPaused:()=>mode==='qa',resetSession:async()=>{},jump:async()=>{},updateWallet(){}};
  const qa=installQA(bridge,doc),toggle=doc.querySelector('#qa-wander-debug'),output=doc.querySelector('#qa-wander-countdown');
  assert.equal(toggle.checked,false);qa.update();assert.equal(output.hidden,true);
  doc.querySelector('#qa-toggle').click();await new Promise(resolve=>setImmediate(resolve));
  toggle.checked=true;toggle.dispatchEvent(new dom.window.Event('change'));qa.update();assert.equal(output.hidden,true);
  doc.querySelector('#qa-resume').click();qa.update();assert.equal(output.textContent,'5.0');assert.equal(output.hidden,false);
  assert.equal(output.nextElementSibling.id,'bark','number sits directly above the bark button');
  renderer.updateAnimalBatches(level,0);assert.deepEqual(rgb(b.meshes[0],1),[1,.10,.08]);
  mode='qa';qa.update();assert.equal(output.hidden,true);assert.equal(output.textContent,'5.0');
  mode='playing';level={...level,time:0,wanderCohort:undefined};qa.update();assert.equal(output.textContent,'—');
  toggle.checked=false;toggle.dispatchEvent(new dom.window.Event('change'));renderer.updateAnimalBatches(level,0);qa.update();
  assert.equal(output.hidden,true);assert.deepEqual(rgb(b.meshes[0],1),[1,1,1]);
  qa.destroy();assert.equal(renderer.updateAnimalBatches,original);assert.equal(doc.querySelector('#qa-wander-countdown'),null);
  b.meshes[0].geometry.dispose();b.meshes[0].material.dispose();b.meshes[0].dispose();dom.window.close();
});
