import test from 'node:test';
import assert from 'node:assert/strict';
import { FarmAudio } from '../src/audio.js';
import { createWeatherState, stepWeather } from '../src/weather.js';

class Param {
  constructor() { this.value = 0; this.targets = []; this.events = []; }
  setValueAtTime(value, time) { this.value = value; this.events.push(['set', value, time]); }
  exponentialRampToValueAtTime(value, time) { this.value = value; this.events.push(['ramp', value, time]); }
  setTargetAtTime(value, time) { this.value = value; this.targets.push(value); this.events.push(['target', value, time]); }
  cancelScheduledValues(time) { this.events.push(['cancel', time]); }
}
class Node {
  constructor() {
    this.gain = new Param(); this.frequency = new Param(); this.Q = new Param(); this.playbackRate = new Param();
    this.connections = []; this.started = false; this.stops = []; this.disconnected = false;
  }
  connect(node) { this.connections.push(node); }
  disconnect() { this.disconnected = true; }
  start(time = 0) { this.started = true; this.startTime = time; }
  stop(time) { this.stops.push(time); }
  end() { this.onended?.(); }
}
class Context {
  constructor() { this.state = 'suspended'; this.currentTime = 0; this.sampleRate = 100; this.destination = new Node(); this.oscillators = []; this.buffers = []; this.sources = []; }
  createGain() { return new Node(); }
  createOscillator() { const node = new Node(); this.oscillators.push(node); return node; }
  createBiquadFilter() { return new Node(); }
  createDelay() { const node = new Node(); node.delayTime = new Param(); return node; }
  createBuffer(channels, count) { const buffer = { getChannelData: () => new Float32Array(count) }; this.buffers.push(buffer); return buffer; }
  createBufferSource() { const node = new Node(); this.sources.push(node); return node; }
  async resume() { this.state = 'running'; }
  async close() { this.state = 'closed'; }
}
class DeferredContext extends Context {
  constructor() { super(); this.pendingResumes = []; }
  resume() {
    return new Promise((resolve) => this.pendingResumes.push(() => {
      if (this.state !== 'closed') this.state = 'running';
      resolve();
    }));
  }
}

test('livestock voices use independent clocks, state cadence and immediate bolt calls', async () => {
  await withAudio(async audio => {
    await audio.start();
    const level = {seed:15};
    const sheep = {id:0,type:'sheep',x:0,z:0}, cow = {id:1,type:'cow',x:0,z:0};
    const animals = [sheep,cow], listener = {x:0,z:0};
    audio.updateLivestock(.01,{level,animals,listener});
    assert.notEqual(audio.livestockSchedules.get(sheep).remaining, audio.livestockSchedules.get(cow).remaining);
    audio.livestockSchedules.get(sheep).remaining = 0;
    audio.updateLivestock(.01,{level,animals,listener});
    const ordinary = [...audio.livestockSources].at(-1);
    assert.equal(ordinary.connections[0].gain.value, .077);
    assert.ok(audio.livestockSchedules.get(sheep).remaining >= 13 && audio.livestockSchedules.get(sheep).remaining <= 25);
    sheep.wander = {bolting:true};
    audio.updateLivestock(.01,{level,animals,listener});
    const bolt = [...audio.livestockSources].at(-1);
    assert.notEqual(ordinary, bolt);
    assert.equal(bolt.connections[0].gain.value, .077 * 1.25);
    assert.ok(audio.livestockSchedules.get(sheep).remaining >= 30);
    audio.updateLivestock(.01,{level,animals,listener});
    assert.equal(audio.livestockSources.size, 2, 'held bolt state does not retrigger each frame');
    assert.notEqual(audio._voiceBuffer('cow'), audio._voiceBuffer('sheep'));
    assert.equal(audio._voiceBuffer('sheep'), ordinary.buffer, 'species buffer is reused');
  });
});

test('livestock calls are bounded, attenuated and canceled on pause or level replacement', async () => {
  await withAudio(async audio => {
    await audio.start();
    const level = {}, animals = Array.from({length:100},(_,id)=>({id,type:'cow',x:12,z:0,wander:{bolting:true}}));
    audio.updateLivestock(.01,{level,animals,listener:{x:0,z:0}});
    assert.equal(audio.livestockSources.size, 6, 'bolt transitions replace old voices rather than exceeding the voice cap');
    assert.equal([...audio.livestockSources][0].connections[0].gain.value,.077 * 1.25 / 2);
    for(const animal of animals)audio.livestockSchedules.get(animal).remaining=0;
    for(let i=0;i<10;i++)audio.updateLivestock(.1,{level,animals});
    assert.ok(audio.livestockSources.size<=6);
    const voices=[...audio.livestockSources];audio.pause();
    assert.equal(audio.livestockSources.size,0);
    assert.ok(voices.every(source=>source.disconnected&&source.stops.includes(undefined)));
    const frozen=audio.livestockSchedules.get(animals[0]).remaining;
    audio.updateLivestock(.1,{level,animals});
    assert.equal(audio.livestockSchedules.get(animals[0]).remaining,frozen);
    audio.resetLivestock({});
    assert.equal(audio.livestockSchedules.size,0);
  });
});

test('dog bark uses a cached finite voiced buffer and mute prevents it', async () => {
  await withAudio(async audio => {
    await audio.start();
    audio.play('bark');
    const source=[...audio.ambientSources].at(-1);
    assert.equal(source.buffer,audio._voiceBuffer('bark'));
    assert.ok(source.stops[0]-source.startTime<.4);
    audio.setMuted(true);
    const count=audio.context.sources.length;
    audio.play('bark');
    assert.equal(audio.context.sources.length,count);
    assert.equal(audio.ambientSources.size,0);
  });
});

test('shared storm lightning flashes before its paired reverberant thunder starts', async () => {
  await withAudio(async audio => {
    await audio.start();
    const weather = createWeatherState({index:23,seed:42});
    stepWeather(weather, weather.lightningStart + .01);
    assert.ok(weather.lightningFlash > 0, 'the renderer receives the flash before audio starts');
    audio.updateAmbience(.01, {weather});
    const thunder = audio.thunderSource;
    assert.ok(thunder.startTime - audio.context.currentTime >= .79);
    stepWeather(weather, .3);
    assert.equal(weather.lightningFlash, 0, 'flash ends before delayed rumble');
    audio.updateAmbience(.1, {weather});
    assert.equal(audio.thunderSource, thunder, 'one sound per shared lightning event');
    const envelope = thunder.connections[0].connections[0];
    const delays = envelope.connections.slice(1);
    thunder.end();
    assert.ok(delays.every(d => d.disconnected && d.connections[0].disconnected));
  });
});

async function withAudio(fn, AudioContext = Context) {
  const originals = { AudioContext: globalThis.AudioContext, setInterval: globalThis.setInterval, clearInterval: globalThis.clearInterval };
  const timers = new Set();
  globalThis.AudioContext = AudioContext;
  globalThis.setInterval = (callback) => { const id = { callback }; timers.add(id); return id; };
  globalThis.clearInterval = (id) => timers.delete(id);
  const audio = new FarmAudio();
  try { await fn(audio, timers); }
  finally { audio.dispose(); Object.assign(globalThis, originals); }
}

test('a pause during pending start or resume remains paused after activation settles', async () => {
  for (const operation of ['start', 'resume']) {
    await withAudio(async (audio, timers) => {
      if (operation === 'resume') {
        const initial = audio.start();
        audio.context.pendingResumes[0]();
        await initial;
        audio.pause();
      }
      const pending = audio[operation]();
      const context = audio.context;
      const before = context.oscillators.length;
      audio.pause();
      context.pendingResumes.at(-1)();
      assert.equal(await pending, false);
      assert.equal(audio.paused, true);
      assert.equal(timers.size, 0);
      assert.equal(context.oscillators.length, before);
      assert.equal(audio.music.gain.value, 0.0001);
    }, DeferredContext);
  }
});

test('latest concurrent activation wins in either completion order and preserves mute', async () => {
  for (const order of [[0, 1], [1, 0]]) {
    await withAudio(async (audio, timers) => {
      const pending = [audio.start(), audio.resume()];
      const context = audio.context;
      audio.setMuted(true);
      for (const index of order) {
        const before = context.oscillators.length;
        context.pendingResumes[index]();
        assert.equal(await pending[index], index === 1);
        if (index === 0) assert.equal(context.oscillators.length, before);
        assert.equal(timers.size, index === 1 || order[0] === 1 ? 1 : 0);
        assert.equal(audio.muted, true);
        assert.equal(audio.master.gain.value, 0);
      }
      audio.pause();
      assert.equal(timers.size, 0);
    }, DeferredContext);
  }
});

test('dispose cancels pending activation without touching released nodes', async () => {
  await withAudio(async (audio, timers) => {
    const pending = [audio.start(), audio.resume()];
    const context = audio.context;
    audio.dispose();
    for (const complete of context.pendingResumes) complete();
    assert.deepEqual(await Promise.all(pending), [false, false]);
    assert.equal(context.state, 'closed');
    assert.equal(context.oscillators.length, 0);
    assert.equal(audio.context, null);
    assert.equal(timers.size, 0);
  }, DeferredContext);
});

test('music keeps its normal sequence and skips overdue steps after a stalled timer', async () => {
  await withAudio(async (audio, timers) => {
    const steps = [];
    const musicStep = audio._musicStep.bind(audio);
    audio._musicStep = (step, time, eighth) => { steps.push({ step, time }); musicStep(step, time, eighth); };
    await audio.start();
    const context = audio.context;
    const callback = [...timers][0].callback;
    for (const time of [0.1, 0.2, 0.3, 0.4]) { context.currentTime = time; callback(); }
    assert.deepEqual(steps.map(({ step }) => step), [0, 1, 2]);
    const eighth = 60 / audio.tempo / 2;
    assert.ok(Math.abs(steps[1].time - steps[0].time - eighth) < 1e-10);
    const previousStep = audio.step;
    const previousTime = audio.nextNoteTime;
    const before = steps.length;
    const beforeOscillators = context.oscillators.length;
    context.currentTime = 60;
    callback();
    const resumed = steps.slice(before);
    assert.ok(resumed.length <= 8);
    assert.ok(resumed.every(({ time }) => time >= 60 && time < 60.25));
    assert.ok(context.oscillators.slice(beforeOscillators).every((node) => node.startTime >= 60));
    const skipped = Math.ceil((60 - previousTime) / eighth);
    assert.equal(audio.step, (previousStep + skipped + resumed.length) % 128);
    assert.ok(audio.nextNoteTime >= 60.25);
  });
});

test('music scheduling work stays bounded even at extreme tempos', async () => {
  await withAudio(async (audio, timers) => {
    await audio.start();
    audio.tempo = 60000;
    let count = 0;
    audio._musicStep = () => { count++; };
    audio.context.currentTime = 60;
    [...timers][0].callback();
    assert.equal(count, 8);
  });
});

test('ambience never creates audio before start, start is reusable, and frames add no timers', async () => {
  await withAudio(async (audio, timers) => {
    audio.updateAmbience(10, { weather: 'rain' });
    assert.equal(audio.context, null);
    assert.equal(timers.size, 0);
    assert.equal(await audio.start(), true);
    const context = audio.context;
    await audio.start();
    assert.equal(audio.context, context);
    assert.equal(timers.size, 1);
    for (let i = 0; i < 12; i++) audio.updateAmbience(0.25, { weather: 'rain' });
    assert.equal(timers.size, 1);
    assert.equal(context.sources.length, 1);
    assert.equal(context.buffers.length, 1);
  });
});

test('birds are varied short quiet phrases and do not burst after a long frame gap', async () => {
  await withAudio(async (audio) => {
    await audio.start();
    const context = audio.context;
    audio.birdCountdown = 1;
    const before = context.oscillators.length;
    audio.updateAmbience(1000, { weather: 'sun' });
    assert.equal(context.oscillators.length, before);
    for (let i = 0; i < 3; i++) audio.updateAmbience(0.25, { weather: 'sun' });
    assert.ok(context.oscillators.length - before >= 2);
    assert.ok(context.oscillators.length - before <= 3);
    const birds = [...audio.ambientSources];
    for (const bird of birds) {
      assert.equal(bird.type, 'sine');
      assert.ok(bird.stops[0] - bird.startTime < 0.2);
      bird.end();
      assert.equal(bird.disconnected, true);
    }
    assert.equal(audio.ambientSources.size, 0);
    assert.ok(audio.birdCountdown >= 4 && audio.birdCountdown <= 10);
  });
});

test('pause and mute stop ambience and prevent new chirps, UI sounds remain on pause', async () => {
  await withAudio(async (audio, timers) => {
    await audio.start();
    audio.updateAmbience(0.1, { weather: 'wind' });
    const source = audio.weatherSource.source;
    audio.birdCountdown = 0;
    audio.updateAmbience(0.1);
    const birds = [...audio.ambientSources];
    audio.pause();
    assert.equal(timers.size, 0);
    assert.equal(source.disconnected, true);
    assert.equal(audio.ambientSources.size, 0);
    assert.ok(birds.every((bird) => bird.disconnected));
    const before = audio.context.oscillators.length;
    audio.birdCountdown = 0;
    audio.updateAmbience(1000, { weather: 'rain' });
    assert.equal(audio.context.oscillators.length, before);
    audio.play('click');
    assert.ok(audio.context.oscillators.length > before);
    await audio.resume();
    audio.updateAmbience(0.1, { weather: 'rain' });
    const rain = audio.weatherSource.source;
    audio.setMuted(true);
    assert.equal(rain.disconnected, true);
    const mutedCount = audio.context.oscillators.length;
    audio.birdCountdown = 0;
    audio.updateAmbience(1, { weather: 'sun' });
    audio.play('click');
    assert.equal(audio.context.oscillators.length, mutedCount);
    assert.equal(audio.master.gain.value, 0);
    audio.setMuted(false);
    assert.equal(audio.master.gain.value, .975, 'unmute restores the 50% louder master mix');
  });
});

test('rain tiers lower gentle rain and trim heavy rain while preserving storm volume', async () => {
  await withAudio(async audio => {
    await audio.start();
    const volumes = [];
    let source;
    for (const [index, factor] of [[8,.5],[15,.85],[23,1]]) {
      const weather = createWeatherState({index,seed:42});
      audio.updateAmbience(.1, {weather});
      const volume = audio.weatherSource.gain.gain.value;
      assert.ok(Math.abs(volume - .032 * weather.intensity * factor) < 1e-12);
      if (source) assert.equal(audio.weatherSource.source, source, 'tier changes reuse the rain loop');
      source = audio.weatherSource.source; volumes.push(volume);
    }
    assert.ok(volumes[0] < volumes[1] && volumes[1] < volumes[2]);
    audio.setMuted(true); audio.setMuted(false);
    audio.updateAmbience(.1, {weather:createWeatherState({index:15,seed:42})});
    assert.ok(Math.abs(audio.weatherSource.gain.gain.value - .032 * .65 * .85) < 1e-12);
  });
});

test('weather shares a single noise buffer, bounded gains, and cleans up on weather changes', async () => {
  await withAudio(async (audio) => {
    await audio.start();
    audio.updateAmbience(0.1, { weather: { type: 'rain', intensity: 999 } });
    const rain = audio.weatherSource;
    assert.ok(rain.gain.gain.value <= 0.032);
    assert.equal(rain.source.loop, true);
    assert.equal(rain.filter.type, 'lowpass');
    audio.updateAmbience(0.1, { weather: { type: 'wind', intensity: -100 } });
    assert.equal(rain.source.disconnected, true);
    assert.equal(rain.gain.disconnected, true);
    assert.equal(rain.filter.disconnected, true);
    assert.equal(audio.weatherSource.gain.gain.value, 0);
    assert.equal(audio.context.buffers.length, 1);
    const wind = audio.weatherSource.source;
    audio.updateAmbience(0.1, { weather: 'sun' });
    assert.equal(wind.disconnected, true);
    assert.equal(audio.weatherSource, null);
    audio.birdCountdown = 0;
    const before = audio.context.oscillators.length;
    audio.updateAmbience(0.1, { weather: { type: 'rain', intensity: 0.9 } });
    assert.equal(audio.context.oscillators.length, before);
  });
});

test('dispose stops and disconnects every source, releases buffer and timer, and is final', async () => {
  await withAudio(async (audio, timers) => {
    await audio.start();
    audio.updateAmbience(0.1, { weather: 'rain' });
    audio.birdCountdown = 0;
    audio.updateAmbience(0.1, { weather: 'rain' });
    const sources = [...audio.active];
    const context = audio.context;
    audio.dispose();
    assert.equal(timers.size, 0);
    assert.equal(audio.active.size, 0);
    assert.equal(audio.ambientSources.size, 0);
    assert.ok(sources.every((source) => source.disconnected && source.stops.length > 0));
    assert.equal(context.state, 'closed');
    assert.equal(audio.noiseBuffer, null);
    assert.equal(audio.context, null);
    assert.equal(await audio.start(), false);
    audio.updateAmbience(1, { weather: 'rain' });
    audio.dispose();
  });
});

test('one lightning event schedules one delayed thunder, pause cancels it and resume does not replay', async () => {
  await withAudio(async (audio, timers) => {
    await audio.start();
    const weather = { type: 'rain', intensity: .9, lightningId: 'storm:1', lightningAge: .1, thunderDelay: 1 };
    audio.updateAmbience(.1, { weather });
    const thunder = audio.thunderSource;
    assert.ok(thunder); assert.ok(Math.abs(thunder.startTime - .9) < 1e-10);
    assert.equal(thunder.loop, true);
    assert.ok(thunder.stops[0] - thunder.startTime <= 5.000001);
    for (let i = 0; i < 20; i++) audio.updateAmbience(.01, { weather });
    assert.equal(audio.context.sources.length, 2); assert.equal(timers.size, 1);
    audio.pause(); assert.equal(thunder.disconnected, true); assert.equal(audio.thunderSource, null);
    await audio.resume(); audio.updateAmbience(.1, { weather }); assert.equal(audio.thunderSource, null);
    weather.lightningId = 'storm:2'; weather.lightningAge = 0;
    audio.updateAmbience(.1, { weather }); assert.ok(audio.thunderSource);
    const next = audio.thunderSource; audio.setMuted(true); assert.equal(next.disconnected, true);
    weather.lightningId = 'storm:3'; audio.updateAmbience(.1, { weather });
    audio.setMuted(false); audio.updateAmbience(.1, { weather }); assert.equal(audio.thunderSource, null);
  });
});
test('weather replacement cancels pending thunder; stale lightning cannot catch up in bursts', async () => {
  await withAudio(async audio => {
    await audio.start();
    const weather = { type: 'rain', intensity: .9, lightningId: 'storm:1', lightningAge: 0, thunderDelay: 1 };
    audio.updateAmbience(.1, { weather }); const thunder = audio.thunderSource;
    audio.updateAmbience(.1, { weather: { ...weather, lightningId: null } });
    assert.equal(thunder.disconnected, true); assert.equal(audio.thunderSource, null);
    audio.updateAmbience(50, { weather: { ...weather, lightningAge: 50 } }); assert.equal(audio.thunderSource, null);
    // New level/replay state owns a fresh event identity, even with the same seeded ID.
    audio.updateAmbience(.1, { weather: { ...weather } }); assert.ok(audio.thunderSource);
    const latest = audio.thunderSource; audio.dispose(); assert.equal(latest.disconnected, true);
  });
});

test('only rain and wind have precipitation ambience; obsolete snow has no audio source', async () => {
  await withAudio(async audio => {
    await audio.start();
    for (const type of ['light-rain', 'heavy-rain', 'storm']) {
      audio.updateAmbience(.1, { weather: { type, intensity: .7 } });
      assert.equal(audio.weatherKind, 'rain'); assert.ok(audio.weatherSource);
    }
    const source = audio.weatherSource.source;
    audio.updateAmbience(.1, { weather: 'snow' });
    assert.equal(audio.weatherKind, 'sun'); assert.equal(audio.weatherSource, null);
    assert.equal(source.disconnected, true);
  });
});
test('muted unseen events and malformed event timing cannot schedule stale thunder', async () => {
  await withAudio(async audio => {
    await audio.start();
    const weather = { type: 'rain', intensity: .9, lightningId: 'storm:0', lightningAge: 0, thunderDelay: 1 };
    audio.setMuted(true); audio.updateAmbience(.1, { weather });
    audio.setMuted(false); audio.updateAmbience(.1, { weather });
    assert.equal(audio.thunderSource, null);
    for (const [age, delay] of [[-1, 1], [0, -1], [NaN, 1], [0, Infinity], [60, 1]]) {
      weather.lightningId += ':next'; weather.lightningAge = age; weather.thunderDelay = delay;
      audio.updateAmbience(.1, { weather }); assert.equal(audio.thunderSource, null);
    }
  });
});


test('thunder uses deep filtering, a tapered rumble and music duck that cancels on exit', async () => {
  await withAudio(async audio => {
    await audio.start();
    const weather = { type: 'rain', intensity: .9, lightningId: 'storm:mix', lightningAge: 0, thunderDelay: 1 };
    audio.updateAmbience(.1, { weather });
    const thunder = audio.thunderSource, filter = thunder.connections[0], envelope = filter.connections[0];
    const duration = thunder.stops[0] - thunder.startTime;
    assert.equal(filter.type, 'lowpass'); assert.ok(filter.Q.value < .5);
    assert.deepEqual(filter.frequency.events[0], ['set', 400, 1]);
    assert.equal(filter.frequency.events[1][1], 85);
    assert.ok(Math.abs(filter.frequency.events[1][2] - (1 + duration * .65)) < 1e-9);
    assert.equal(envelope.connections[0], audio.effects, 'thunder bypasses quiet ambience bus');
    const peak = envelope.gain.events.find(([kind, value]) => kind === 'ramp' && value === .65);
    assert.ok(peak && peak[2] === 1.12, 'rumble has a softened attack');
    assert.ok(envelope.gain.events.every(([, value]) => value >= .0001 && value <= .65));
    assert.ok(audio.music.gain.events.some(([kind, value, at]) => kind === 'target' && value === .16 && at === 1));
    assert.ok(audio.music.gain.events.some(([kind, value, at]) => kind === 'target' && value === .42 && Math.abs(at - (1 + duration * .72)) < 1e-9));
    const reflections = envelope.connections.slice(1);
    assert.equal(reflections.length, 5);
    assert.ok(reflections.every(delay => delay.delayTime.value > 0 && delay.delayTime.value <= 1.1));
    assert.deepEqual(envelope.gain.events.slice(-3).map(e => e[1]), [.32,.035,.0001]);
    assert.ok(duration >= 3 && duration <= 5);
    const fadeEnd = envelope.gain.events.at(-1)[2];
    assert.ok(fadeEnd + reflections.at(-1).delayTime.value < thunder.stops[0], 'full reverb tail finishes before cleanup');
    audio.context.currentTime = .5;
    audio.updateAmbience(.1, { weather: { type: 'sun' } });
    assert.equal(thunder.disconnected, true);
    assert.ok(reflections.every(delay => delay.disconnected && delay.connections[0].disconnected), 'cancel releases dry and reverberant paths');
    assert.deepEqual(audio.music.gain.events.slice(-2), [['cancel', .5], ['target', .42, .5]]);
    weather.lightningId = 'storm:next'; audio.updateAmbience(.1, { weather });
    audio.pause();
    assert.equal(audio.music.gain.value, .0001);
    assert.equal(audio.thunderSource, null);
    await audio.resume();
    assert.equal(audio.music.gain.value, .42);
  });
});



test('successive thunder strikes vary their 3-5 second fade and reverb together', async () => {
  await withAudio(async audio => {
    await audio.start();
    const originalRandom = Math.random, durations = [];
    try {
      for (const roll of [0, .5, .999999]) {
        Math.random = () => roll;
        audio.updateAmbience(.1, { weather: {type:'rain',kind:'storm',intensity:.9,lightningId:`strike-${roll}`,lightningAge:0,thunderDelay:1} });
        const source = audio.thunderSource, duration = source.stops[0] - source.startTime;
        durations.push(duration);
        assert.ok(duration >= 3 && duration <= 5);
        const envelope = source.connections[0].connections[0];
        assert.ok(Math.abs(envelope.connections.at(-1).delayTime.value - duration * .22) < 1e-9);
      }
    } finally { Math.random = originalRandom; }
    assert.ok(durations[0] < durations[1] && durations[1] < durations[2]);
  });
});

test('storm suppresses ambient bird calls even when explicit rain intensity is missing', async () => {
  await withAudio(async audio => {
    await audio.start();
    for (const weather of ['storm', { type: 'storm' }, { kind: 'storm', type: 'rain', intensity: .2 }, { storm: true, type: 'rain' }]) {
      audio.birdCountdown = 0;
      const before = audio.context.oscillators.length;
      audio.updateAmbience(.1, { weather });
      assert.equal(audio.context.oscillators.length, before);
    }
  });
});


for(const prefix of ['/Flock/','/Flock/dev/'])test(`recordings load once from ${prefix} and late loads never replay calls`, async () => {
 const oldFetch=globalThis.fetch,oldDocument=globalThis.document;
 const requests=[],pending=[];
 globalThis.document={baseURI:`https://example.test${prefix}`};
 globalThis.fetch=async url=>{requests.push(String(url));return {ok:true,arrayBuffer:async()=>new ArrayBuffer(2)};};
 Context.prototype.decodeAudioData=()=>new Promise(resolve=>pending.push(resolve));
 try {
  await withAudio(async audio=>{
   await audio.start();await new Promise(resolve=>setImmediate(resolve));
   assert.deepEqual(requests.map(u=>u.split('/').at(-1)).sort(),['bark.mp3','cow.mp3','sheep.mp3']);
   assert.ok(requests.every(u=>u.startsWith(`https://example.test${prefix}audio/`)));
   audio.pause();const count=audio.context.sources.length;
   const recordings=pending.map((resolve,i)=>{const b={duration:.6+i};resolve(b);return b;});
   await audio.voiceLoad;
   assert.equal(audio.context.sources.length,count,'decode completion cannot play a stale call');
   await audio.resume();assert.equal(requests.length,3,'resume reuses sample loading');
   audio.play('bark');const source=audio.context.sources.at(-1);
   assert.equal(source.buffer,recordings[0]);assert.ok(Math.abs(source.stops[0]-source.startTime-.62)<1e-8,'sample duration controls stop, not old generated duration');
   for(const [type,recording,low,high] of [['sheep',recordings[1],.94,.965],['cow',recordings[2],1.10,1.14]]){
    const level={seed:34};
    for(let id=0;id<8;id++){
     const animal={id,type,x:0,z:0,wander:{bolting:true}};
     audio.updateLivestock(.01,{level,animals:[animal],listener:{x:0,z:0}});
     const call=audio.context.sources.at(-1),rate=call.playbackRate.value;
     assert.equal(call.buffer,recording);assert.ok(rate>=low&&rate<=high,`${type} rate ${rate} stays within its species bounds`);
     assert.ok(Math.abs(call.stops[0]-call.startTime-recording.duration/rate-.02)<1e-8,'sample stop follows actual assigned playback rate');
    }
   }

  });
 } finally {globalThis.fetch=oldFetch;if(oldDocument===undefined)delete globalThis.document;else globalThis.document=oldDocument;delete Context.prototype.decodeAudioData;}
});

test('failed recordings retain fallback and disposed decodes cannot repopulate released buffers', async () => {
 const oldFetch=globalThis.fetch,oldDocument=globalThis.document;
 globalThis.document={baseURI:'https://example.test/Flock/'};
 globalThis.fetch=async()=>({ok:false});Context.prototype.decodeAudioData=async()=>({duration:1});
 try {
  await withAudio(async audio=>{await audio.start();await audio.voiceLoad;assert.equal(audio.recordedVoices.size,0);audio.play('bark');assert.equal(audio.context.sources.at(-1).buffer,audio._voiceBuffer('bark'));});
  const decoders=[];globalThis.fetch=async()=>({ok:true,arrayBuffer:async()=>new ArrayBuffer(2)});
  Context.prototype.decodeAudioData=()=>new Promise(r=>{decoders.push(r);});
  await withAudio(async audio=>{
   await audio.start();await new Promise(r=>setImmediate(r));const load=audio.voiceLoad;
   audio.dispose();for(const resolve of decoders)resolve({duration:1});await load;
   assert.equal(audio.recordedVoices.size,0);
  });
 } finally {globalThis.fetch=oldFetch;if(oldDocument===undefined)delete globalThis.document;else globalThis.document=oldDocument;delete Context.prototype.decodeAudioData;}
});
