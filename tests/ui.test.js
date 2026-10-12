import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import vm from 'node:vm';

const root = process.env.FLOCK_UI_TEST_ROOT || fileURLToPath(new URL('../', import.meta.url));

// Run the production controller and simulation together. Rendering, browser DOM,
// and WebAudio are the only substitutes; navigation and rewards are real code.
function launch({ deniedStorage = false, points = 0 } = {}) {
  const main = readFileSync(path.join(root, 'src/main.js'), 'utf8').replace(/^import .*;\s*$/gm, '');
  const progression = readFileSync(path.join(root, 'src/progression.js'), 'utf8').replace(/^export /gm, '');
  const simulation = readFileSync(path.join(root, 'src/simulation.js'), 'utf8').replace(/^import .*;\s*$/gm, '').replace(/^export \{.*\};\s*$/gm, '').replace(/^export /gm, '');
  const html = readFileSync(path.join(root, 'index.html'), 'utf8');
  const elements = new Map();
  const documentEvents = new Map(), windowEvents = new Map();
  const audioEvents = [];
  let clock = 1000;
  const storage = new Map([['flock-foundry-v1', JSON.stringify({ points, music: true })]]);
  const document = {
    hidden: false, activeElement: null,
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
    setAttribute(key, value) { this.attrs[key] = value; }
    focus() { document.activeElement = this; }
    closest(selector) {
      if (selector === '#joystick' && this.id === 'joystick') return this;
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
    update() {} drawMap() {} resize() {} bark() {} celebrate() {}
  }
  class FarmAudio {
    async start() { audioEvents.push('start'); }
    setMuted(value) { audioEvents.push(`muted:${value}`); }
    pause() { audioEvents.push('pause'); }
    resume() { audioEvents.push('resume'); }
    play(name) { audioEvents.push(name); }
  }
  const context = {
    document, window: { addEventListener: (event, handler) => windowEvents.set(event, handler) },
    navigator: {}, performance: { now: () => clock }, MeadowRenderer, FarmAudio,
    setTimeout: () => 1, clearTimeout() {}, requestAnimationFrame() {},
    console: { error: (...args) => { throw new Error(`Controller startup failed: ${args.join(' ')}`); } },
  };
  Object.defineProperty(context, 'localStorage', {
    get() {
      if (deniedStorage) throw new Error('SecurityError: storage denied');
      return { getItem: key => storage.get(key) || null, setItem: (key, value) => storage.set(key, value) };
    },
  });
  vm.runInNewContext(`${progression}\n${simulation}\n${main}\nglobalThis.app = {
    begin, menu, shop, complete, frame,
    state: () => ({ mode, previousMode, input, pointer, keyCount: keys.size, level, dog, profile }),
  };`, context, { filename: 'flock-ui-integration.js' });
  const app = context.app;
  const el = id => document.getElementById(id);
  const click = async id => { const button = el(id); assert.ok(button, `Expected button ${id}`); assert.equal(button.disabled, false); button.focus(); return button.onclick({ preventDefault() {} }); };
  const buy = id => { const button = el('modal-card').querySelectorAll('[data-buy]').find(e => e.dataset.buy === id); assert.ok(button, `Expected upgrade ${id}`); assert.equal(button.disabled, false); button.onclick(); };
  const emit = (name, event = {}) => documentEvents.get(name)?.({ type: name, target: el('world'), preventDefault() {}, ...event });
  const tick = () => { clock += 16; app.frame(clock); };
  const completeFlock = () => { const state = app.state(); for (const animal of state.level.animals) Object.assign(animal, { x: state.level.target.x, z: state.level.target.z, vx: 0, vz: 0 }); tick(); };
  return { app, el, click, buy, emit, tick, completeFlock, audioEvents, windowEvents, storage };
}

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
  const ui = launch({ points: 400 });
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
  const ui = launch({ points: 400 });
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
