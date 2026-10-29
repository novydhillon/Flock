import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import vm from 'node:vm';
import {JSDOM} from 'jsdom';
import {createLoading,requireWebGL2} from '../src/loading.js';

function launch({reduced=false}={}){
  const dom=new JSDOM(readFileSync(new URL('../index.html',import.meta.url),'utf8'));
  const {window}=dom,document=window.document,timers=new Map();let next=0,reloads=0;
  window.setTimeout=fn=>{timers.set(++next,fn);return next;};window.clearTimeout=id=>timers.delete(id);
  window.matchMedia=()=>({matches:reduced});
  const loading=createLoading({document,window,reload:()=>reloads++});
  return {dom,document,window,loading,timers,get reloads(){return reloads;},tick(){const callbacks=[...timers.values()];timers.clear();callbacks.forEach(fn=>fn());}};
}

test('real stage announcements stay indeterminate and slow work offers safe retry',()=>{
  const run=launch();run.loading.stage('Building the scene');
  assert.equal(run.document.getElementById('loading-status').textContent,'Building the scene');
  assert.equal(run.document.querySelector('[role="progressbar"]'),null);
  run.tick();const retry=run.document.getElementById('loading-retry');
  assert.equal(retry.hidden,false);assert.match(run.document.getElementById('loading-detail').textContent,/Still/);
  retry.click();retry.click();assert.equal(run.reloads,1);
  run.loading.dispose();run.dom.window.close();
});

test('input stays blocked through reveal, then prior inert state and event access return',async()=>{
  const run=launch(),play=run.document.getElementById('play');let clicks=0;
  play.addEventListener('click',()=>clicks++);
  play.click();assert.equal(clicks,0);assert.equal(play.closest('#intro').inert,true);
  const ready=run.loading.ready();play.click();assert.equal(clicks,0);
  assert.ok(run.document.getElementById('loading'));run.tick();await ready;
  assert.equal(run.document.getElementById('loading'),null);play.click();assert.equal(clicks,1);
  run.dom.window.close();
});

test('reduced motion reveals immediately and loading animation pauses when hidden',async()=>{
  const run=launch({reduced:true});Object.defineProperty(run.document,'hidden',{value:true,configurable:true});
  run.document.dispatchEvent(new run.window.Event('visibilitychange'));
  assert.equal(run.document.getElementById('loading').classList.contains('loading-paused'),true);
  await run.loading.ready();assert.equal(run.timers.size,0);assert.equal(run.document.getElementById('loading'),null);
  run.dom.window.close();
});

test('only an unavailable context produces graphics-specific recovery; retry preserves storage',()=>{
  assert.throws(()=>requireWebGL2({getContext:()=>null}),error=>error.code==='WEBGL_UNAVAILABLE');
  assert.equal(requireWebGL2({getContext:()=>({usable:true})}).usable,true);
  const run=launch();run.loading.fail(new Error('network fetch failed'));
  assert.match(run.document.getElementById('loading-detail').textContent,/connection/);
  assert.doesNotMatch(run.document.getElementById('loading-detail').textContent,/WebGL/);
  const error=Object.assign(new Error('context unavailable'),{code:'WEBGL_UNAVAILABLE'});run.loading.fail(error);
  assert.match(run.document.getElementById('loading-detail').textContent,/WebGL 2/);
  run.document.getElementById('loading-retry').dispatchEvent(new run.window.KeyboardEvent('keydown',{key:'Enter',bubbles:true}));
  assert.equal(run.reloads,1);run.loading.dispose();run.dom.window.close();
});


test('initialization submits and paints the scene before revealing or starting the loop',async()=>{
  const source=readFileSync(new URL('../src/main.js',import.meta.url),'utf8');
  const init=source.slice(source.indexOf('export async function initializeMeadow'),source.indexOf('// Vite removes')).replace('export ','');
  const calls=[],rafs=[],canvas={},loading={stage:s=>calls.push(s),ready:async()=>calls.push('ready')};
  const context={requireWebGL2:()=>calls.push('graphics'),$:()=>canvas,renderer:null,level:{},dog:{},last:0,
    MeadowRenderer:class{update(){calls.push('render');}drawMap(){calls.push('map');}},
    setupShowcase(){calls.push('scene');},updateWallet(){},requestAnimationFrame:fn=>rafs.push(fn),
    performance:{now:()=>1},frame(){},initializeDevelopmentQA:async()=>calls.push('qa'),activateMusic:()=>calls.push('music')};
  vm.runInNewContext(init+';globalThis.initialize=initializeMeadow',context);
  const pending=context.initialize(loading);
  for(let i=0;i<16;i++){if(rafs.length&&rafs[0]!==context.frame)rafs.shift()();await Promise.resolve();}
  await pending;
  assert.ok(calls.indexOf('render')<calls.indexOf('ready'));
  assert.ok(calls.indexOf('ready')<calls.indexOf('music'));
  assert.ok(calls.indexOf('render')<calls.indexOf('qa'));assert.ok(calls.indexOf('qa')<calls.indexOf('ready'),'QA installs with a ready renderer before input is released');
  assert.equal(rafs.length,1,'only the gameplay frame loop remains scheduled');
});
