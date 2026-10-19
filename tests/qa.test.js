import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { JSDOM } from 'jsdom';
import { createLevel, canOccupy, defaultProfile } from '../src/simulation.js';

// Remove browser CSS and resolve JS imports for the data-URL harness.
const source = (await readFile(new URL('../src/qa.js', import.meta.url), 'utf8')).replace("import './qa.css';", '').replace("'./animal-size.js'", JSON.stringify(new URL('../src/animal-size.js', import.meta.url).href));
const { qaLevelIndex, adjustQABolts, moveQAAnimal, exportQAScenario, installQA } = await import(`data:text/javascript;base64,${Buffer.from(source).toString('base64')}`);

test('QA tutorial alias and every public level map to exactly 100 campaign entries', () => {
  assert.equal(qaLevelIndex(0), 0);
  for (let number = 1; number <= 100; number++) assert.equal(qaLevelIndex(number), number-1);
  for (const value of [-1, 101, 1.5, Infinity, NaN, '', 'invalid']) assert.throws(() => qaLevelIndex(value));
});

test('QA bolt adjustments reject invalid values and never create negative balances', () => {
  const profile = defaultProfile();
  assert.equal(adjustQABolts(profile, 300), 300);
  assert.equal(adjustQABolts(profile, 50, -1), 250);
  assert.equal(adjustQABolts(profile, 999, -1), 0);
  for (const value of [-1, Infinity, NaN, 'x', '', 1.5, Number.MAX_SAFE_INTEGER+1]) assert.throws(() => adjustQABolts(profile, value));
  profile.points = Number.MAX_SAFE_INTEGER;
  assert.throws(() => adjustQABolts(profile, 1));
});

test('manual animal placement requires pause; finite bounds apply even with invalid override', () => {
  const level = createLevel(4), animal = level.animals[0], original = {...animal};
  assert.throws(() => moveQAAnimal(level, animal.id, animal.x, animal.z, { canOccupy }));
  for (const coordinates of [[Infinity,0], [NaN,0], ['',0], [level.bounds.maxX+1, 0]]) assert.throws(() => moveQAAnimal(level, animal.id, ...coordinates, { paused:true, override:true }));
  assert.deepEqual(animal, original);
  assert.throws(() => moveQAAnimal(level, 'missing', 0, 0, { paused:true, override:true }));
  const position={x:level.bounds.minX,z:level.bounds.minZ};
  assert.throws(() => moveQAAnimal(level, animal.id, position.x, position.z, { paused:true, canOccupy }));
  animal.saved=true; animal.deliveryRemaining=12; animal.vx=7; animal.vz=8;
  moveQAAnimal(level, animal.id, position.x, position.z, { paused:true, override:true, canOccupy });
  assert.equal(animal.x,position.x); assert.equal(animal.vx,0); assert.equal(animal.vz,0);
  assert.equal(animal.saved,true); assert.equal(animal.deliveryRemaining,12);
});

test('safe placement uses sheep/cow physical radii and canOccupy', () => {
  const level=createLevel(4), animal=level.animals[0], calls=[];
  for(const [type,scale,radius] of [['cow',1,.78],['cow',1.25,.78*1.25],['sheep',1.25,.55]]) {
    animal.type=type;animal.scale=scale;
    moveQAAnimal(level,animal.id,animal.x,animal.z,{paused:true,canOccupy:(...args)=>{calls.push(args);return true;}});
    assert.equal(calls.at(-1)[3],radius);
  }
});

test('scenario export retains seed, per-animal delivery and level countdown state', () => {
  const level=createLevel(99);level.deliveryRemaining=24;level.animals[0].deliveryRemaining=3;
  const state={level,dog:{...level.dog},profile:defaultProfile(),elapsed:31};
  const exported=JSON.parse(exportQAScenario(state));
  assert.equal(exported.publicLevel,100);assert.equal(exported.seed,level.seed);assert.equal(exported.level.deliveryRemaining,24);assert.equal(exported.animals[0].deliveryRemaining,3);
});

test('QA editor hides positioning, closes safely, and isolates background controls', async () => {
  const dom=new JSDOM('<body><button id="game">Normal game</button></body>');
  const doc=dom.window.document, state={level:createLevel(0),profile:defaultProfile(),dog:{},elapsed:0};
  let paused=false, entered=0,resumed=0,jumpIndex=null;
  const qa=installQA({getState:()=>state,enterSession:async()=>{entered++;},pause:()=>{paused=true;},isPaused:()=>paused,resume:()=>{paused=false;resumed++;},jump:async index=>{jumpIndex=index;state.level=createLevel(index);},resetSession:async()=>{},updateWallet:()=>{},canOccupy},doc);
  const toggle=doc.querySelector('#qa-toggle');
  assert.equal(toggle.textContent,'⚙');assert.equal(toggle.getAttribute('aria-label'),'QA · development test session');assert.equal(toggle.title,'QA · development test session');
  doc.querySelector('#qa-toggle').click();await new Promise(resolve=>setTimeout(resolve,0));
  assert.equal(toggle.textContent,'⚙');assert.match(toggle.getAttribute('aria-label'),/QA.*test session/i);
  assert.equal(entered,1);assert.equal(paused,true);assert.equal(doc.querySelector('#game').inert,true);assert.equal(doc.querySelector('#qa-panel').hidden,false);
  assert.equal(doc.querySelector('#qa-move').hidden,true);
  assert.equal(doc.querySelector('#qa-level').options.length,101);
  doc.querySelector('#qa-level').value='100';doc.querySelector('#qa-jump').dispatchEvent(new dom.window.Event('submit',{cancelable:true}));await new Promise(resolve=>setTimeout(resolve,0));assert.equal(jumpIndex,99);
  const key=new dom.window.KeyboardEvent('keydown',{key:'Escape',cancelable:true,bubbles:true});doc.body.dispatchEvent(key);assert.equal(paused,false);
  assert.equal(doc.querySelector('#qa-panel').hidden,true);assert.equal(resumed,1);
  doc.querySelector('#qa-toggle').click();await new Promise(resolve=>setTimeout(resolve,0));doc.querySelector('#qa-close').click();assert.equal(resumed,2);assert.equal(doc.querySelector('#qa-panel').hidden,true);assert.ok(!doc.querySelector('#game').inert);
  assert.equal(toggle.textContent,'⚙');assert.match(toggle.getAttribute('aria-label'),/QA.*test session/i);assert.match(toggle.title,/QA.*test session/i);
  qa.destroy();assert.equal(doc.querySelector('#qa-toggle'),null);
});
