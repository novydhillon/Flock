import test from 'node:test';
import assert from 'node:assert/strict';
import { Context, DeferredContext, withAudio } from './audio-fixture.js';
import { LoFiMusic, MUSIC_STEPS, MUSIC_TEMPO } from '../src/music.js';
import { createWeatherState, stepWeather } from '../src/weather.js';

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
    assert.equal(ordinary.connections[0].gain.value, .05775);
    assert.ok(audio.livestockSchedules.get(sheep).remaining >= 26 && audio.livestockSchedules.get(sheep).remaining <= 50);
    sheep.wander = {bolting:true};
    audio.updateLivestock(.01,{level,animals,listener});
    const bolt = [...audio.livestockSources].at(-1);
    assert.notEqual(ordinary, bolt);
    assert.equal(bolt.connections[0].gain.value, .05775 * 1.25);
    assert.ok(audio.livestockSchedules.get(sheep).remaining >= 60);
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
    assert.equal([...audio.livestockSources][0].connections[0].gain.value,.05775 * 1.25 / 2);
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
    assert.deepEqual(steps.map(({ step }) => step), [0, 1]);
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
    assert.equal(context.sources.filter(source=>source.loop).length, 1);
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
    assert.equal(audio.context.sources.filter(source=>source.loop).length, 2); assert.equal(timers.size, 1);
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
    assert.ok(audio.music.gain.events.some(([kind, value, at]) => kind === 'target' && value === .24 && at === 1));
    assert.ok(audio.music.gain.events.some(([kind, value, at]) => kind === 'target' && value === .63 && Math.abs(at - (1 + duration * .72)) < 1e-9));
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
    assert.deepEqual(audio.music.gain.events.slice(-2), [['cancel', .5], ['target', .63, .5]]);
    weather.lightningId = 'storm:next'; audio.updateAmbience(.1, { weather });
    audio.pause();
    assert.equal(audio.music.gain.value, .0001);
    assert.equal(audio.thunderSource, null);
    await audio.resume();
    assert.equal(audio.music.gain.value, .63);
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


test('Pip lowers the recorded bark while Buddy and legacy callers retain the current pitch',async()=>{
 await withAudio(async audio=>{
  await audio.start();const sample={duration:.8};audio.recordedVoices.set('bark',sample);
  for(const actor of ['pip','buddy',undefined]){
   audio.play('bark',actor);const source=audio.context.sources.at(-1),pitch=actor==='pip'?.78:1;
   assert.equal(source.buffer,sample);assert.equal(source.playbackRate.value,pitch);
   assert.ok(Math.abs(source.stops[0]-source.startTime-.8/pitch-.02)<1e-9);
  }
 });
});

test('independent music score renders evolving diatonic phrases with swing and no noise attacks',async()=>{
 await withAudio(async audio=>{
  await audio.start();assert.ok(audio.musicGenerator instanceof LoFiMusic);assert.equal(audio.tempo,MUSIC_TEMPO);
  audio._stopScheduler();for(const source of [...audio.active])source.end();
  const initialOscillators=audio.context.oscillators.length,notes=[],eighth=60/audio.tempo/2;
  const tone=audio.musicGenerator._tone.bind(audio.musicGenerator);
  audio.musicGenerator._tone=(...args)=>{notes.push(args);tone(...args);};
  for(let step=0;step<MUSIC_STEPS;step++){
   audio.context.currentTime=step*eighth;
   for(const source of [...audio.active])if(source.stops.some(time=>time<=audio.context.currentTime))source.end();
   audio._musicStep(step,step*eighth,eighth);
  }
  assert.equal(audio.context.oscillators.length-initialOscillators,notes.length,'no requested voice is dropped by the defensive cap');
  const pitched=notes.filter(n=>!['kick','tap'].includes(n[4]));
  assert.ok(pitched.every(n=>[0,2,4,5,7,9,11].includes(n[0]%12)),'chords and answers share one diatonic palette');
  const melodies=notes.filter(n=>n[4]==='melody');
  assert.ok(melodies.length>8&&melodies.length<24,'motifs leave space');
  assert.ok(new Set(melodies.map(n=>n[0])).size>=6,'answers vary over the whole progression');
  assert.ok(melodies.some(n=>Math.abs(n[1]/eighth-Math.round(n[1]/eighth)-.16)<1e-8),'offbeat melody swings late');
  assert.ok(notes.some(n=>n[4]==='bass')&&notes.some(n=>n[4]==='kick')&&notes.some(n=>n[4]==='tap'));
  assert.ok([...audio.musicGenerator.voices.values()].every(({release})=>release.connections[0]===audio.music));
  assert.equal(audio.context.sources.length,0,'a complete music cycle produces no noise-buffer attacks');
  for(const source of [...audio.active])source.end();assert.equal(audio.active.size,0);
  assert.equal(audio.musicGenerator.voices.size,0,'ended voices release the complete graph');
 });
});


test('lo-fi scheduling releases expired voices and maintains modest steady-state polyphony over two minutes',async()=>{
 await withAudio(async(audio,timers)=>{
  await audio.start();const context=audio.context,callback=[...timers][0].callback;let peak=audio.active.size,ended=0;
  for(let tick=1;tick<=2400;tick++){
   context.currentTime=tick*.05;
   for(const source of [...context.oscillators,...context.sources])if(!source.disconnected&&source.stops.some(time=>Number.isFinite(time)&&time<=context.currentTime)){source.end();ended++;}
   callback();peak=Math.max(peak,audio.active.size);
  }
  assert.ok(ended>200,'normal expiry releases generated music throughout the loop');
  assert.ok(peak>6&&peak<40,`steady-state peak ${peak} stays well below the defensive cap`);
  assert.ok(audio.active.size<40);audio.pause();assert.equal(timers.size,0);
  context.currentTime+=5;
  for(const source of [...context.oscillators,...context.sources])if(!source.disconnected&&source.stops.some(time=>Number.isFinite(time)&&time<=context.currentTime))source.end();
  assert.equal(audio.active.size,0,'all remaining finite music tails expire after pause');
  const nodes=[...context.oscillators,...context.sources];assert.ok(nodes.every(n=>n.disconnected));
 });
});


test('music envelopes reach zero at both ends and pause cancels scheduled voices before rapid resume',async()=>{
 await withAudio(async (audio,timers)=>{
  await audio.start();const generator=audio.musicGenerator;
  for(const voice of ['keys','melody','bass','kick','tap'])generator._tone(60,10,.5,.1,voice);
  const records=[...generator.voices.entries()];
  for(const [source,{envelope,filter}]of records){
   const events=envelope.gain.events;
   assert.deepEqual(events[0].slice(0,2),['set',0]);
   assert.equal(events[1][0],'linear');assert.ok(events[1][2]-source.startTime>=.029);
   assert.equal(events.at(-1)[0],'linear');assert.equal(events.at(-1)[1],0);
   assert.ok(source.stops[0]>events.at(-1)[2],'stop occurs after the zero tail');
   assert.equal(filter.type,'lowpass');assert.ok(filter.frequency.value<=1450);
  }
  audio.pause();assert.equal(timers.size,0);
  for(const [source,{envelope}]of records){
   assert.equal(source.stops.at(-1),.08,'future voices are stopped before their attack');
   assert.ok(envelope.gain.events.some(e=>e[0]==='cancel'&&e[1]===0));
   assert.ok(envelope.gain.events.some(e=>e[0]==='set'&&e[1]===0&&e[2]===0));
  }
  await audio.resume();assert.equal(timers.size,1);assert.equal(audio.musicGenerator,generator);
  for(const [source]of records)source.end();
  assert.ok(records.every(([source,{envelope,filter,release}])=>source.disconnected&&envelope.disconnected&&filter.disconnected&&release.disconnected));
  audio.dispose();assert.equal(generator.voices.size,0);assert.equal(audio.active.size,0);
  assert.equal(audio.musicGenerator,null);assert.equal(timers.size,0);
 });
});

test('music mute and thunder duck stay on their existing buses while effect voices remain independent',async()=>{
 await withAudio(async audio=>{
  await audio.start();const generator=audio.musicGenerator;
  assert.equal(audio.music.gain.value,.63,'music starts 50% above the previous .42 mix');
  assert.equal(audio.effects.gain.value,.6);assert.equal(audio.ambience.gain.value,.38);
  audio.context.currentTime=.2;
  audio.pause();
  assert.ok([...generator.voices.values()].some(({release})=>release.gain.events.some(e=>e[0]==='target'&&e[1]===0&&e[2]===.2)),'running notes fade through their independent release gate');
  await audio.resume();assert.equal(audio.music.gain.value,.63,'resume retains the louder music mix');
  audio.setMuted(true);assert.equal(audio.master.gain.value,0);
  audio.setMuted(false);assert.equal(audio.master.gain.value,.975);assert.equal(audio.music.gain.value,.63,'unmute restores the louder music mix');
  audio.recordedVoices.set('bark',{duration:.8});audio.play('bark','pip');assert.equal(audio.context.sources.at(-1).playbackRate.value,.78);
  audio.play('bark','buddy');assert.equal(audio.context.sources.at(-1).playbackRate.value,1);
  audio.play('click');const effect=audio.context.oscillators.at(-1);
  assert.ok(!generator.voices.has(effect));assert.equal(effect.connections[0].connections[0],audio.effects);
 });
});


test('pause during attack or decay preserves the live envelope without cancelAndHoldAtTime',async()=>{
 await withAudio(async audio=>{
  await audio.start();
  for(const elapsed of [.025,.4]){
   const start=audio.context.currentTime;
   audio.musicGenerator._tone(60,start,2,.1,'keys');
   const source=audio.context.oscillators.at(-1),{envelope,release}=audio.musicGenerator.voices.get(source);
   assert.equal(envelope.gain.cancelAndHoldAtTime,undefined,'exercise the older WebAudio API');
   const originalEnvelope=structuredClone(envelope.gain.events);
   for(const offset of [elapsed,elapsed+.01,elapsed+.02]){
    audio.context.currentTime=start+offset;audio.pause();
    assert.deepEqual(envelope.gain.events,originalEnvelope,'do not remove the ramp endpoint and jump back to its start');
    assert.deepEqual(release.gain.events.at(-1),['target',0,start+offset],'release targets zero from the continuously evolving gate value');
   }
   source.end();assert.ok(release.disconnected);
   await audio.resume();
  }
 });
});

test('gameplay pause stops scene voices and freezes livestock clocks while music keeps advancing',async()=>{
 await withAudio(async(audio,timers)=>{
  await audio.start();const timer=audio.timer,level={seed:4},animal={id:0,type:'cow',x:0,z:0,wander:{bolting:true}};
  audio.updateAmbience(.1,{weather:'rain'});audio.updateLivestock(.1,{level,animals:[animal]});
  const scene=[...audio.ambientSources],music=[...audio.musicGenerator.voices.keys()];
  const remaining=audio.livestockSchedules.get(animal).remaining;
  audio.setGameplayPaused(true);
  assert.equal(audio.timer,timer);assert.equal(timers.size,1);assert.equal(audio.paused,false);
  assert.ok(scene.every(source=>source.disconnected));assert.ok(music.every(source=>source.stops.length===1));
  audio.updateLivestock(.1,{level,animals:[animal]});audio.updateAmbience(.1,{weather:'rain'});
  assert.equal(audio.livestockSchedules.get(animal).remaining,remaining);assert.equal(audio.ambientSources.size,0);
  const step=audio.step;audio.context.currentTime=.3;timer.callback();assert.notEqual(audio.step,step);
  audio.setGameplayPaused(false);audio.updateLivestock(.1,{level,animals:[animal]});
  assert.ok(audio.livestockSchedules.get(animal).remaining<remaining);
 });
});

test('repeated activation leaves the running music clock and thunder duck automation unchanged',async()=>{
 await withAudio(async audio=>{
  await audio.start();audio.updateAmbience(.1,{weather:{type:'storm',lightningId:'same',lightningAge:0,thunderDelay:1}});
  const events=structuredClone(audio.music.gain.events),step=audio.step,next=audio.nextNoteTime,timer=audio.timer;
  for(let i=0;i<5;i++)assert.equal(await audio.start(),true);
  assert.deepEqual(audio.music.gain.events,events);assert.equal(audio.step,step);assert.equal(audio.nextNoteTime,next);assert.equal(audio.timer,timer);
 });
});
