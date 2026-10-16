import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import vm from 'node:vm';
import * as simulationAPI from '../src/simulation.js';
import * as progressionAPI from '../src/progression.js';
import * as gatesAPI from '../src/gates.js';
import * as worldAPI from '../src/world.js';

const root = process.env.FLOCK_UI_TEST_ROOT || fileURLToPath(new URL('../', import.meta.url));

// Run the production controller and simulation together. Rendering, browser DOM,
// and WebAudio are the only substitutes; navigation and rewards are real code.
function launch({ deniedStorage = false, points = 0, highestLevel = 0, upgrades = {}, completedLevels = [], music = true, deferAudioStart = false } = {}) {
  const main = readFileSync(path.join(root, 'src/main.js'), 'utf8').replace(/^import .*;\s*$/gm, '');
  const html = readFileSync(path.join(root, 'index.html'), 'utf8');
  const elements = new Map();
  const documentEvents = new Map(), windowEvents = new Map();
  const audioEvents = [];
  let resolveAudioStart;
  const audioActivation = deferAudioStart ? new Promise(resolve => { resolveAudioStart = resolve; }) : Promise.resolve();
  let clock = 1000;
  const storage = new Map([['flock-foundry-v1', JSON.stringify({ points, highestLevel, upgrades, completedLevels, music })]]);
  const document = {
    hidden: false, activeElement: null,
    createElement: tag => new Element('', {tag}),
    getElementById: id => elements.get('modal-card')?.children.find(e => e.id === id) || elements.get(id) || null,
    addEventListener: (event, handler) => documentEvents.set(event, handler),
  };

  class Element {
    constructor(id = '', attrs = {}) {
      this.id = id; this.attrs = attrs; this.dataset = {}; this.style = {};
      this.children = []; this.textContent = ''; this.disabled = false;
      this.classes = new Set();
      this.classList = {
        contains: value => this.classes.has(value),
        toggle: (value, force) => { const add = force === undefined ? !this.classes.has(value) : force; add ? this.classes.add(value) : this.classes.delete(value); return add; },
      };
    }
    appendChild(child) { this.children.push(child); elements.set(child.id,child); return child; }
    addEventListener() {}
    setAttribute(key, value) { this.attrs[key] = value; }
    focus() { document.activeElement = this; }
    closest(selector) {
      if (selector === '#joystick' && this.id === 'joystick') return this;
      if (selector === '#bark' && this.id === 'bark') return this;
      if (selector === '#controls' && ['joystick','bark','controls'].includes(this.id)) return this;
      if (selector.includes('button') && this.attrs.tag === 'button') return this;
      return null;
    }
    setPointerCapture() {}
    set innerHTML(value) {
      this.html = value;
      this.children = [...value.matchAll(/<button\b([^>]*)>/g)].map(([, attrs]) => {
        const child = new Element(attrs.match(/\bid="([^"]*)"/)?.[1] || '', { tag: 'button' });
        child.disabled = /\bdisabled\b/.test(attrs);
        for (const [, key, data] of attrs.matchAll(/data-([a-z]+)="([^"]*)"/g)) child.dataset[key] = data;
        return child;
      });
    }
    get innerHTML() { return this.html || ''; }
    querySelectorAll(selector) {
      if (selector === '[data-buy]') return this.children.filter(e => e.dataset.buy);
      if (selector === '[data-level]') return this.children.filter(e => e.dataset.level !== undefined);
      if (selector === 'button:not([disabled])') return this.children.filter(e => !e.disabled);
      return this.children;
    }
    querySelector(selector) {
      if (selector === '.tip-number') return this.tipNumber ||= new Element();
      return this.querySelectorAll(selector)[0] || null;
    }
  }
  for (const [, tag, , id] of html.matchAll(/<(\w+)\b([^>]*\bid="([^"]+)"[^>]*)>/g)) elements.set(id, new Element(id, { tag }));
  for (const id of ['modal', 'controls', 'error', 'toast']) elements.get(id)?.classes.add('hidden');
  class MeadowRenderer {
    setLevel(level) { this.level = level; }
    update(_level,_dog,dt) { this.lastDt=dt; } drawMap() {} resize() {} bark(source) { (this.barks ||= []).push(source); } celebrate() {}
  }
  class FarmAudio {
    async start() { audioEvents.push('start'); await audioActivation; }
    setMuted(value) { audioEvents.push(`muted:${value}`); }
    pause() { audioEvents.push('pause'); }
    resume() { audioEvents.push('resume'); }
    play(name) { audioEvents.push(name); }
  }
  const context = {
    ...simulationAPI,...progressionAPI,...worldAPI,...gatesAPI,
    document, window: { addEventListener: (event, handler) => windowEvents.set(event, handler) },
    navigator: {}, performance: { now: () => clock }, MeadowRenderer, FarmAudio,
    setTimeout: () => 1, clearTimeout() {}, requestAnimationFrame() {},
    console: { error: (...args) => { throw new Error(`Controller startup failed: ${args.join(' ')}`); } },
  };
  const storageDescriptor={configurable:true,
    get() {
      if (deniedStorage) throw new Error('SecurityError: storage denied');
      return { getItem: key => storage.get(key) || null, setItem: (key, value) => storage.set(key, value) };
    },
  };
  Object.defineProperty(context,'localStorage',storageDescriptor);
  Object.defineProperty(globalThis,'localStorage',storageDescriptor);
  vm.runInNewContext(`${main}\nglobalThis.app = {
    begin, menu, shop, complete, frame,
    state: () => ({ mode, previousMode, input, pointer, keyCount: keys.size, level, dog, profile, renderer }),
  };`, context, { filename: 'flock-ui-integration.js' });
  const app = context.app;
  const el = id => document.getElementById(id);
  const click = async id => { const button = el(id); assert.ok(button, `Expected button ${id}`); assert.equal(button.disabled, false); button.focus(); return button.onclick({ preventDefault() {} }); };
  const buy = id => { const button = el('modal-card').querySelectorAll('[data-buy]').find(e => e.dataset.buy === id); assert.ok(button, `Expected upgrade ${id}`); assert.equal(button.disabled, false); button.onclick(); };
  const emit = (name, event = {}) => documentEvents.get(name)?.({ type: name, target: el('world'), preventDefault() {}, ...event });
  const tick = () => { clock += 16; app.frame(clock); };
  const completeFlock = () => { const state = app.state();state.dog.x=state.level.target.x;state.dog.z=state.level.target.z;for (const animal of state.level.animals) Object.assign(animal, { x: state.level.target.x, z: state.level.target.z, vx: 0, vz: 0 }); tick(); };
  return { app, el, click, buy, emit, tick, completeFlock, audioEvents, windowEvents, storage, document, settleAudioStart: () => resolveAudioStart?.() };
}

test('nested workshop navigation restores focus to the original pause control', async () => {
  const ui = launch();
  await ui.click('play');
  await ui.click('pause');
  await ui.click('upgrades-menu');
  await ui.click('shop-back');
  assert.equal(ui.app.state().mode, 'playing');
  assert.equal(ui.document.activeElement, ui.el('pause'));
});

test('delayed audio startup cannot undo menu or visibility pause', async () => {
  for (const cause of ['menu', 'visibility']) {
    const ui = launch({ deferAudioStart: true });
    const startup = ui.click('play');
    assert.equal(ui.app.state().mode, 'playing');
    if (cause === 'menu') await ui.click('pause');
    else { ui.document.hidden = true; ui.emit('visibilitychange'); }
    assert.equal(ui.app.state().mode, 'paused');
    ui.settleAudioStart(); await startup;
    assert.equal(ui.app.state().mode, 'paused');
    assert.equal(ui.audioEvents.at(-1), 'pause');
    assert.ok(!ui.audioEvents.includes('resume'));
  }
});

test('sound activation finishing in a paused menu cannot resume music', async () => {
  const ui = launch({ deferAudioStart: true });
  await ui.click('sound'); // Turn sound off without requesting activation.
  const activation = ui.click('sound');
  assert.equal(ui.app.state().mode, 'intro');
  ui.settleAudioStart(); await activation;
  assert.equal(ui.audioEvents.at(-1), 'pause');
  assert.ok(!ui.audioEvents.includes('resume'));
});

test('intro starts the tutorial, enables thumb controls and respects audio settings', async () => {
  const ui = launch();
  assert.equal(ui.app.state().mode, 'intro');
  await ui.click('play');
  assert.equal(ui.app.state().mode, 'playing');
  assert.equal(ui.app.state().level.index, 0);
  assert.equal(ui.app.state().level.animals.length, 5);
  assert.ok(ui.el('intro').classList.contains('hidden'));
  assert.ok(!ui.el('controls').classList.contains('hidden'));
  assert.ok(ui.audioEvents.includes('start'));
});

test('workshop purchase refresh preserves the playing origin and applies one purchase', async () => {
  const ui = launch({ points: 400,highestLevel:14 });
  await ui.click('play'); await ui.click('wallet');
  ui.buy('speed'); ui.buy('flock');
  assert.equal(ui.app.state().profile.points, 200);
  assert.equal(ui.app.state().profile.upgrades.speed, 1);
  assert.equal(ui.app.state().profile.upgrades.flock, 1);
  await ui.click('shop-back');
  assert.equal(ui.app.state().mode, 'playing');
  assert.ok(!ui.el('controls').classList.contains('hidden'));
});

test('pause -> workshop -> back resumes play instead of reverting to intro', async () => {
  const ui = launch({ points: 400,highestLevel:14 });
  await ui.click('play'); await ui.click('pause');
  assert.equal(ui.app.state().mode, 'paused');
  await ui.click('upgrades-menu'); ui.buy('speed'); await ui.click('shop-back');
  assert.equal(ui.app.state().mode, 'playing');
  assert.ok(ui.audioEvents.includes('pause'));
  assert.equal(ui.audioEvents.at(-1), 'resume');
});

test('completed level rewards once and workshop back preserves the reward screen', async () => {
  const ui = launch();
  await ui.click('play'); ui.completeFlock();
  assert.equal(ui.app.state().mode, 'complete');
  assert.equal(ui.app.state().profile.points, 80);
  assert.equal(ui.app.state().profile.completedLevels.length, 1);
  ui.tick(); ui.tick();
  assert.equal(ui.app.state().profile.points, 80);
  assert.equal(ui.audioEvents.filter(event => event === 'completed').length, 1);
  await ui.click('reward-shop'); ui.buy('speed'); await ui.click('shop-back');
  assert.equal(ui.app.state().mode, 'complete');
  assert.equal(ui.app.state().profile.points, 0);
  assert.ok(ui.el('next'), 'Completion actions survive the shop round trip');
  await ui.click('replay'); ui.completeFlock();
  assert.equal(ui.app.state().profile.points, 0, 'Replay cannot farm the same level reward');
});

test('Escape in a completion workshop restores completion actions', async () => {
  const ui = launch();
  await ui.click('play'); ui.completeFlock(); await ui.click('reward-shop');
  ui.emit('keydown', { key: 'Escape' });
  assert.equal(ui.app.state().mode, 'complete');
  assert.ok(!ui.el('modal').classList.contains('hidden'));
  assert.ok(ui.el('next'));
});

test('pointercancel ends movement without a woof and permits the next thumb gesture', async () => {
  const ui = launch();
  await ui.click('play');
  ui.emit('pointerdown', { pointerId: 1, clientX: 100, clientY: 100 });
  ui.emit('pointermove', { pointerId: 1, clientX: 140, clientY: 100 });
  assert.ok(ui.app.state().input.x > 0);
  ui.emit('pointercancel', { pointerId: 1 });
  assert.equal(ui.app.state().input.x, 0); assert.equal(ui.app.state().input.z, 0);
  assert.equal(ui.app.state().pointer, null);
  assert.equal(ui.audioEvents.filter(event => event === 'bark').length, 0);
  ui.emit('pointerdown', { pointerId: 2, clientX: 100, clientY: 100 });
  ui.emit('pointermove', { pointerId: 2, clientX: 100, clientY: 140 });
  assert.ok(ui.app.state().input.z > 0);
  await ui.click('pause');
  assert.equal(ui.app.state().input.z, 0); assert.equal(ui.app.state().pointer, null);
});

test('focus loss pauses and clears both held keyboard and thumb movement', async () => {
  const ui = launch();
  await ui.click('play'); ui.emit('keydown', { key: 'w' });
  ui.emit('pointerdown', { pointerId: 1, clientX: 0, clientY: 0 });
  ui.emit('pointermove', { pointerId: 1, clientX: 40, clientY: 0 });
  ui.windowEvents.get('blur')();
  assert.equal(ui.app.state().mode, 'paused');
  assert.equal(ui.app.state().keyCount, 0);
  assert.equal(ui.app.state().input.x, 0);
  await ui.click('resume');
  const before = { x: ui.app.state().dog.x, z: ui.app.state().dog.z };
  ui.tick();
  assert.equal(ui.app.state().dog.x, before.x); assert.equal(ui.app.state().dog.z, before.z);
});

test('denied localStorage getter permits startup, play and session-only rewards', async () => {
  const ui = launch({ deniedStorage: true });
  assert.equal(ui.app.state().profile.points, 0);
  await ui.click('play'); ui.completeFlock();
  assert.equal(ui.app.state().mode, 'complete');
  assert.equal(ui.app.state().profile.points, 80);
  assert.match(ui.el('toast').textContent, /session/);
});

test('keyboard movement works while Play or Resume retains browser focus', async () => {
  const ui=launch(); await ui.click('play');
  ui.emit('keydown',{key:'d',target:ui.el('play')}); const before=ui.app.state().dog.x; ui.tick();
  assert.ok(ui.app.state().dog.x>before);
  await ui.click('pause'); await ui.click('resume');
  ui.emit('keydown',{key:'w',target:ui.el('resume')}); const z=ui.app.state().dog.z; ui.tick();
  assert.ok(ui.app.state().dog.z<z);
});

test('the workshop labels level locks and cannot spend on an early drone',async()=>{
  const ui=launch({points:1000,highestLevel:7});await ui.click('play');await ui.click('wallet');
  const drone=ui.el('modal-card').querySelectorAll('[data-buy]').find(b=>b.dataset.buy==='drone');
  assert.equal(drone.disabled,true);assert.match(ui.el('modal-card').innerHTML,/Level 10/);
  const before=ui.app.state().profile.points;drone.onclick?.();assert.equal(ui.app.state().profile.points,before);
});

test('double taps and native touch gestures bark without changing the game viewport',async()=>{
  const ui=launch();await ui.click('play');let prevented=0;
  const gesture={pointerId:1,clientX:120,clientY:450,preventDefault(){prevented++;}};
  ui.emit('pointerdown',gesture);ui.emit('pointerup',gesture);ui.tick();
  ui.emit('pointerdown',{...gesture,pointerId:2});ui.emit('pointerup',{...gesture,pointerId:2});
  assert.equal(ui.audioEvents.filter(e=>e==='bark').length,1);
  ui.emit('dblclick',{preventDefault(){prevented++;}});ui.emit('touchstart',{preventDefault(){prevented++;}});ui.emit('touchend',{preventDefault(){prevented++;}});
  ui.emit('gesturestart',{preventDefault(){prevented++;}});ui.emit('gesturechange',{preventDefault(){prevented++;}});
  assert.ok(prevented>=9,'play surface explicitly cancels native zoom defaults');
  await ui.click('pause');let menuPrevented=false;
  ui.emit('gesturestart',{preventDefault(){menuPrevented=true;}});assert.equal(menuPrevented,false,'menus retain native behavior');
});

test('touch Woof still works when compatibility click events are suppressed',async()=>{
  const ui=launch();await ui.click('play');ui.emit('touchend',{target:ui.el('bark')});
  assert.equal(ui.audioEvents.filter(e=>e==='bark').length,1);
});

for (const origin of ['main', 'pause']) {
  test(`Restart Game from ${origin} clears persisted progress, money and every upgrade`, async () => {
    const ui = launch({ points: 1250, highestLevel: 20, completedLevels: [0, 1, 19], music: false,
      upgrades: { speed: 3, flock: 3, drone: 3, helper: 1, bark: 3, cohesion: 3 } });
    if (origin === 'pause') { await ui.click('play'); await ui.click('pause'); }
    await ui.click(`restart-game-${origin === 'main' ? 'main' : 'menu'}`);
    assert.equal(ui.app.state().mode, 'reset-confirm');
    assert.equal(ui.app.state().profile.points, 1250, 'Opening confirmation does not erase progress');
    assert.match(ui.el('modal-card').innerHTML, /cannot be undone/);
    await ui.click('confirm-reset');
    const state = ui.app.state();
    assert.equal(state.mode, 'playing'); assert.equal(state.level.index, 0);
    assert.equal(state.level.animals.length, 5); assert.equal(state.profile.points, 0);
    assert.equal(ui.el('points').textContent, 0);
    assert.equal(state.profile.highestLevel, 0);
    assert.equal(state.profile.completedLevels.length, 0);
    assert.equal(Object.keys(state.profile.upgrades).length, 0);
    assert.equal(state.profile.music, false);
    assert.ok(!ui.el('controls').classList.contains('hidden'));
    assert.ok(ui.el('modal').classList.contains('hidden'));
    assert.equal(ui.document.activeElement, ui.el('pause'));
    const reloaded = simulationAPI.loadProfile({ getItem: key => ui.storage.get(key) });
    assert.deepEqual(reloaded, { ...simulationAPI.defaultProfile(), music: false });
    await ui.click('pause');
    assert.equal(ui.el('modal-card').querySelectorAll('[data-level]').length, 1);
    await ui.click('resume'); ui.completeFlock();
    assert.equal(ui.app.state().profile.points, 80, 'Fresh tutorial can earn its reward again');
  });
}

test('canceling Restart Game restores the main screen or pause menu without erasing anything', async () => {
  for (const origin of ['main', 'pause']) {
    for (const exit of ['cancel-reset', 'close', 'Escape']) {
      const ui = launch({ points: 600, highestLevel: 9, completedLevels: [0, 8], upgrades: { speed: 2, drone: 1 } });
      if (origin === 'pause') { await ui.click('play'); await ui.click('pause'); }
      const before = JSON.stringify(ui.app.state().profile), level = ui.app.state().level;
      const stored = ui.storage.get('flock-foundry-v1');
      await ui.click(`restart-game-${origin === 'main' ? 'main' : 'menu'}`);
      ui.tick();
      if (exit === 'Escape') ui.emit('keydown', { key: 'Escape' });
      else await ui.click(exit);
      assert.equal(JSON.stringify(ui.app.state().profile), before);
      assert.equal(ui.storage.get('flock-foundry-v1'), stored);
      assert.equal(ui.app.state().level, level);
      assert.equal(ui.app.state().mode, origin === 'main' ? 'intro' : 'paused');
      if (origin === 'pause') {
        assert.ok(ui.el('restart-game-menu'));
        await ui.click('resume'); assert.equal(ui.app.state().mode, 'playing');
      } else {
        assert.ok(ui.el('modal').classList.contains('hidden'));
        assert.equal(ui.document.activeElement, ui.el('restart-game-main'));
      }
    }
  }
});

test('Restart this meadow keeps campaign progress and money', async () => {
  const ui = launch({ points: 600, highestLevel: 9, completedLevels: [0, 8], upgrades: { drone: 1 } });
  await ui.click('play'); const before = JSON.stringify(ui.app.state().profile);
  await ui.click('pause'); await ui.click('restart');
  assert.equal(ui.app.state().mode, 'playing'); assert.equal(ui.app.state().level.index, 9);
  assert.equal(JSON.stringify(ui.app.state().profile), before);
});

test('Restart Game still clears session progress when storage is unavailable', async () => {
  const ui = launch({ deniedStorage: true });
  await ui.click('play'); ui.completeFlock(); await ui.click('next');
  await ui.click('pause'); await ui.click('restart-game-menu'); await ui.click('confirm-reset');
  assert.equal(ui.app.state().profile.points, 0);
  assert.equal(ui.app.state().profile.highestLevel, 0);
  assert.equal(ui.app.state().profile.completedLevels.length, 0);
  assert.equal(ui.app.state().level.index, 0);
  assert.match(ui.el('toast').textContent, /session/);
});

test('delayed Restart Game audio does not move focus out of a newly opened pause menu', async () => {
  const ui = launch({ points: 600, highestLevel: 9, deferAudioStart: true });
  await ui.click('restart-game-main'); const restarting = ui.click('confirm-reset');
  await ui.click('pause'); ui.el('resume').focus();
  ui.settleAudioStart(); await restarting;
  assert.equal(ui.app.state().mode, 'paused');
  assert.equal(ui.document.activeElement, ui.el('resume'));
  assert.equal(ui.audioEvents.at(-1), 'pause');
});

test('first delivery starts the visible timer and pause, workshop and hidden tabs freeze it', async () => {
  const ui=launch();await ui.click('play');
  const {level,dog}=ui.app.state();
  assert.match(ui.el('countdown').textContent,/First arrival starts 30s/);
  Object.assign(dog,{x:level.target.x,z:level.target.z});
  Object.assign(level.animals[0],{x:level.target.x,z:level.target.z,vx:0,vz:0});ui.tick();
  assert.equal(ui.app.state().mode,'playing');
  assert.equal(level.delivery.remaining,30);
  assert.match(ui.el('countdown').textContent,/30s to gather/);
  assert.equal(ui.el('mission-score').textContent,'Score 16 / 80');
  const savedAnimal=level.animals[0],parked={x:savedAnimal.x,z:savedAnimal.z};
  await ui.click('pause');const paused=level.delivery.remaining;ui.tick();ui.tick();
  assert.equal(level.delivery.remaining,paused);
  assert.deepEqual({x:savedAnimal.x,z:savedAnimal.z},parked,'pause freezes the saved animals too');
  await ui.click('upgrades-menu');ui.tick();assert.equal(level.delivery.remaining,paused);
  await ui.click('shop-back');ui.tick();assert.ok(level.delivery.remaining<paused);
  ui.document.hidden=true;ui.emit('visibilitychange');const hidden=level.delivery.remaining;
  ui.tick();assert.equal(level.delivery.remaining,hidden);
});

test('partial timeout displays score, awards once, unlocks next and pays only replay improvements', async () => {
  const ui=launch();await ui.click('play');
  const deliver=count=>{
    const {level,dog}=ui.app.state();Object.assign(dog,{x:level.target.x,z:level.target.z});
    for(const animal of level.animals.slice(0,count))Object.assign(animal,{x:level.target.x,z:level.target.z,vx:0,vz:0});
    ui.tick();level.delivery.remaining=.001;ui.tick();
  };
  deliver(2);
  assert.equal(ui.app.state().mode,'complete');assert.equal(ui.app.state().profile.points,32);
  assert.equal(ui.app.state().profile.highestLevel,1);
  assert.match(ui.el('modal-card').innerHTML,/2 \/ 5 robots delivered/);
  assert.match(ui.el('modal-card').innerHTML,/Score 32 \/ 80 · Best 32 \/ 80/);
  assert.match(ui.el('modal-card').innerHTML,/next meadow is open/);
  const level=ui.app.state().level,saved=level.animals[0],position={x:saved.x,z:saved.z},result=JSON.stringify(level.result),remaining=level.delivery.remaining;
  for(let i=0;i<180;i++)ui.tick();
  assert.ok(Math.hypot(saved.x-position.x,saved.z-position.z)>.1,'saved animals mill while the results screen is open');
  assert.equal(JSON.stringify(level.result),result,'roaming cannot rewrite the delivered score');
  assert.equal(level.delivery.remaining,remaining,'the recovery timer remains frozen after completion');
  assert.equal(ui.app.state().profile.points,32);
  await ui.click('reward-shop');await ui.click('shop-back');assert.equal(ui.app.state().mode,'complete');
  await ui.click('replay');deliver(1);assert.equal(ui.app.state().profile.points,32);
  await ui.click('replay');deliver(4);assert.equal(ui.app.state().profile.points,64);
  assert.match(ui.el('modal-card').innerHTML,/\+32/);
  await ui.click('next');assert.equal(ui.app.state().level.index,1);
});

test('Restart Game erases both score and earned-bolt ledgers from an in-progress countdown', async () => {
  const ui=launch();await ui.click('play');ui.completeFlock();await ui.click('replay');
  const {level,dog}=ui.app.state();Object.assign(dog,{x:level.target.x,z:level.target.z});
  Object.assign(level.animals[0],{x:level.target.x,z:level.target.z,vx:0,vz:0});ui.tick();
  assert.equal(level.delivery.started,true);assert.equal(ui.app.state().profile.bestEarnedBolts[0],80);
  await ui.click('pause');await ui.click('restart-game-menu');await ui.click('confirm-reset');
  assert.equal(Object.keys(ui.app.state().profile.bestScores).length,0);
  assert.equal(Object.keys(ui.app.state().profile.bestEarnedBolts).length,0);
  assert.equal(ui.app.state().level.delivery,undefined);
  assert.match(ui.el('countdown').textContent,/First arrival starts 30s/);
});

test('production controller exposes a nearby gate action without barking and restarts with fresh closed panels',async()=>{
  const ui=launch({highestLevel:19});await ui.click('play');
  const state=ui.app.state(),gate=state.level.gates[0],f={x:Math.sin(gate.heading),z:Math.cos(gate.heading)};
  Object.assign(state.dog,{x:gate.x-f.x*2,z:gate.z-f.z*2});ui.tick();
  assert.equal(ui.el('open-gate').disabled,false);
  const barks=ui.audioEvents.filter(e=>e==='bark').length;
  await ui.click('open-gate');assert.equal(gate.open,true);
  assert.equal(ui.audioEvents.filter(e=>e==='bark').length,barks);
  await ui.click('bark');assert.equal(ui.audioEvents.filter(e=>e==='bark').length,barks+1);
  await ui.click('pause');await ui.click('restart');
  assert.ok(ui.app.state().level.gates.every(g=>g.operable&&!g.open));
});


test('hidden intro and results freeze presentation weather and wetness time',async()=>{
 const ui=launch();ui.tick();assert.ok(ui.app.state().renderer.lastDt>0);
 ui.document.hidden=true;ui.tick();assert.equal(ui.app.state().renderer.lastDt,0);
 ui.document.hidden=false;await ui.click('play');ui.completeFlock();assert.equal(ui.app.state().mode,'complete');
 ui.document.hidden=true;ui.tick();assert.equal(ui.app.state().renderer.lastDt,0);
 ui.document.hidden=false;ui.tick();assert.ok(ui.app.state().renderer.lastDt>0);
});

test('mission identifies fixed weather without requiring a wait or affecting the delivery HUD',()=>{
 const ui=launch(),renderer=ui.app.state().renderer;renderer.nature={weather:{kind:'heavy-rain',type:'rain'}};ui.tick();assert.match(ui.el('weather-status').textContent,/Heavy rain/);
 renderer.nature.weather={kind:'storm',type:'rain'};ui.tick();assert.match(ui.el('weather-status').textContent,/Thunderstorm/);
 assert.ok(ui.el('mission-score'));assert.ok(ui.el('countdown'));
});


test('autonomous Buddy bark reaches audio and renderer without consuming Pip cooldown',async()=>{
 const ui=launch({highestLevel:27,upgrades:{helper:3}});await ui.click('play');
 const state=ui.app.state(),l=state.level;
 Object.assign(l,{time:0,bounds:{minX:-100,maxX:100,minZ:-100,maxZ:100},rivers:[],fenceSegments:[],obstacles:[],routes:[],
  helpers:[{type:'helper',x:-4,z:0}],animals:[0,1].map(id=>({id,x:0,z:id*2,vx:2,vz:0,type:'sheep',saved:false,nextWanderCheck:1e9}))});
 Object.assign(state.dog,{x:-70,z:-70});
 ui.tick();assert.equal(ui.audioEvents.filter(e=>e==='bark').length,1);
 assert.equal(state.renderer.barks.length,1);assert.ok(Number.isFinite(state.renderer.barks[0].x));
 assert.equal(ui.el('bark').disabled,false,'Buddy does not consume Pip cooldown');
 await ui.click('bark');assert.equal(ui.audioEvents.filter(e=>e==='bark').length,2);
 assert.equal(state.renderer.barks[1],undefined,'Pip uses its own bark origin');
 await ui.click('pause');const count=ui.audioEvents.filter(e=>e==='bark').length;ui.tick();
 assert.equal(ui.audioEvents.filter(e=>e==='bark').length,count);
});
