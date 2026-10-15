import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import vm from 'node:vm';
import {JSDOM} from 'jsdom';
import * as simulation from '../src/simulation.js';
import * as progression from '../src/progression.js';
import * as world from '../src/world.js';

const settle=()=>new Promise(resolve=>setImmediate(resolve));
function launch(){
  const dom=new JSDOM(readFileSync(new URL('../index.html',import.meta.url),'utf8'),{url:'https://example.test/Flock/dev2/'}),document=dom.window.document;
  const initial=JSON.stringify({version:1,points:315,highestLevel:7,completedLevels:[0,1],upgrades:{speed:1},music:false}),saved=new Map([['flock-foundry-v1',initial]]);
  const storage={getItem:key=>saved.get(key),setItem:(key,value)=>saved.set(key,value)};
  const descriptor=Object.getOwnPropertyDescriptor(globalThis,'localStorage');Object.defineProperty(globalThis,'localStorage',{configurable:true,value:storage});
  let now=1000;
  class MeadowRenderer {setLevel(){} update(){} drawMap(){} bark(){} celebrate(){}}
  class FarmAudio {async start(){} pause(){} resume(){} play(){} setMuted(){}}
  const context=vm.createContext({...simulation,...progression,...world,document,window:dom.window,navigator:dom.window.navigator,MeadowRenderer,FarmAudio,__FLOCK_QA__:true,
    localStorage:storage,performance:{now:()=>now},requestAnimationFrame(){},setTimeout:()=>1,clearTimeout(){},Blob:dom.window.Blob,URL:dom.window.URL,console});
  const qa=readFileSync(new URL('../src/qa.js',import.meta.url),'utf8').replace(/^import .*;\s*$/gm,'').replace(/^export /gm,'');
  vm.runInContext(qa,context);
  const main=readFileSync(new URL('../src/main.js',import.meta.url),'utf8').replace(/^import .*;\s*$/gm,'').replace("import('./qa.js')","Promise.resolve({installQA})");
  vm.runInContext(main+'\nglobalThis.app={frame,state:()=>({mode,level,dog,profile,elapsed,qaSession})};',context);
  return {dom,document,saved,initial,app:context.app,tick:()=>{now+=16;context.app.frame(now);},close(){if(descriptor)Object.defineProperty(globalThis,'localStorage',descriptor);else delete globalThis.localStorage;dom.window.close();}};
}
function submit(ui,id,submitter){const event=new ui.dom.window.Event('submit',{bubbles:true,cancelable:true});if(submitter)Object.defineProperty(event,'submitter',{value:submitter});ui.document.getElementById(id).dispatchEvent(event);}

test('production controller and QA editor freeze timed delivery and protect the normal save',async()=>{
  const ui=launch();try{
    await settle();ui.document.getElementById('play').click();await settle();
    assert.equal(ui.app.state().level.index,7);
    ui.document.getElementById('qa-toggle').click();await settle();
    assert.equal(ui.app.state().mode,'qa');assert.equal(ui.app.state().qaSession,true);
    assert.equal(ui.app.state().level.index,0);assert.equal(ui.app.state().profile.points,0);
    const state=ui.app.state();state.level.delivery={started:true,duration:30,remaining:12};
    const time=state.level.time||0,elapsed=state.elapsed;
    for(let i=0;i<100;i++)ui.tick();
    assert.equal(state.level.delivery.remaining,12);assert.equal(state.level.time||0,time);assert.equal(ui.app.state().elapsed,elapsed);
    ui.document.getElementById('qa-amount').value='500';submit(ui,'qa-bolts');await settle();
    assert.equal(ui.app.state().profile.points,500);assert.equal(ui.saved.get('flock-foundry-v1'),ui.initial);
    const animal=state.level.animals[0];ui.document.getElementById('qa-animal').value=String(animal.id);
    ui.document.getElementById('qa-x').value=String(state.level.spawn.x+.5);ui.document.getElementById('qa-z').value=String(state.level.spawn.z);
    submit(ui,'qa-move');await settle();assert.equal(animal.x,state.level.spawn.x+.5);assert.equal(state.level.delivery.remaining,12);
    ui.document.getElementById('qa-resume').click();assert.equal(ui.app.state().mode,'playing');
    Object.assign(state.dog,{x:state.level.target.x,z:state.level.target.z});for(const a of state.level.animals)Object.assign(a,{x:state.level.target.x,z:state.level.target.z,vx:0,vz:0});
    ui.tick();assert.equal(ui.app.state().mode,'complete');assert.ok(ui.app.state().profile.points>500);
    assert.equal(ui.saved.get('flock-foundry-v1'),ui.initial,'QA completion cannot persist rewards over the real profile');
    const earned=ui.app.state().profile.points;ui.document.getElementById('qa-toggle').click();await settle();
    assert.equal(ui.app.state().mode,'qa');ui.document.getElementById('qa-resume').click();
    assert.equal(ui.app.state().mode,'complete');assert.ok(!ui.document.getElementById('modal').classList.contains('hidden'));
    assert.ok(ui.document.getElementById('next'));assert.equal(ui.app.state().profile.points,earned,'Restoring results must not award again');
  }finally{ui.close();}
});

test('QA public-level jump remains paused through controller startup and cannot bypass into background play',async()=>{
  const ui=launch();try{
    await settle();ui.document.getElementById('qa-toggle').click();await settle();
    ui.document.getElementById('qa-level').value='100';submit(ui,'qa-jump');
    assert.equal(ui.app.state().mode,'qa');await settle();assert.equal(ui.app.state().level.index,99);assert.equal(ui.app.state().mode,'qa');
    ui.document.dispatchEvent(new ui.dom.window.KeyboardEvent('keydown',{key:'Escape',bubbles:true,cancelable:true}));assert.equal(ui.app.state().mode,'qa');
    for(let i=0;i<5;i++)ui.tick();assert.equal(ui.app.state().level.time||0,0);
    assert.equal(ui.saved.get('flock-foundry-v1'),ui.initial);
  }finally{ui.close();}
});
