import { CONFIG_CONTRACTS } from './config/contracts.js';
import settings from './config/audio.json' with { type: 'json' };
import { resolveConfig } from './config/resolve.js';
const AUDIO=resolveConfig(settings, 'audio', CONFIG_CONTRACTS.audio);

import { LoFiMusic, MUSIC_TEMPO, MUSIC_STEPS } from './music.js';

const callHash = value => {
  let x = value >>> 0;
  x ^= x >>> 16; x = Math.imul(x, 0x7feb352d); x ^= x >>> 15;
  return (x >>> 0) / 4294967296;
};

/** Farm soundtrack with cached recorded animal voices and a synthesis fallback. Call start from a user gesture. */
export class FarmAudio {
  constructor() {
    this.context = null;
    this.master = null;
    this.music = null;
    this.effects = null;
    this.ambience = null;
    this.ambientSources = new Set();
    this.weatherSource = null;
    this.weatherKind = null;
    this.weatherVolume = -1;
    this.noiseBuffer = null;
    this.thunderSource = null;
    this.thunderEvent = null;
    this.weatherState = null;
    this.birdCountdown = AUDIO.birds.clearDelaySeconds + Math.random() * AUDIO.birds.clearJitterSeconds;
    this.muted = false;
    this.paused = false;
    this.gameplayPaused = false;
    this.timer = null;
    this.step = 0;
    this.nextNoteTime = 0;
    this.active = new Set();
    this.disposed = false;
    this.activationGeneration = 0;
    this.unlockSource = null;
    this.tempo = MUSIC_TEMPO;
    this.musicGenerator = null;
    this.voiceBuffers = new Map();
    this.recordedVoices = new Map();this.voiceLoad = null;this.voiceGeneration = 0;
    this.livestockSchedules = new Map();
    this.livestockSources = new Set();
    this.livestockLevel = null;
  }

  async start({ gesture = false } = {}) {
    if (this.disposed) return false;
    // UI transitions and user gestures reuse the same transport and ducking.
    if (this.context?.state === 'running' && !this.paused && this.timer !== null) return true;
    const generation = ++this.activationGeneration;
    let unlock;
    try {
      if (!this.context) {
        const AudioContext = globalThis.AudioContext || globalThis.webkitAudioContext;
        if (!AudioContext) return false;
        this.context = new AudioContext();
        this.master = this.context.createGain();
        this.music = this.context.createGain();
        this.effects = this.context.createGain();
        this.ambience = this.context.createGain();
        this.master.gain.value = this.muted ? 0 : AUDIO.mix.masterGain;
        this.music.gain.value = AUDIO.mix.musicGain;
        this.effects.gain.value = AUDIO.mix.effectsGain;
        this.ambience.gain.value = AUDIO.mix.ambienceGain;
        this.music.connect(this.master);
        this.effects.connect(this.master);
        this.ambience.connect(this.master);
        this.master.connect(this.context.destination);
        this.musicGenerator = new LoFiMusic(this.context, this.music, this.active);
      }
      const context = this.context;
      // WebKit can require a source to be started inside the touch/click stack.
      // Do this before awaiting resume; an earlier autoplay resume may never settle.
      if (gesture && context.state !== 'running') {
        this._releaseUnlock();
        unlock = context.createBufferSource();
        this.unlockSource = unlock;
        unlock.buffer = context.createBuffer(1, 1, context.sampleRate);
        unlock.connect(context.destination);
        unlock.onended = () => { unlock.disconnect(); this.active.delete(unlock); if(this.unlockSource===unlock)this.unlockSource=null; };
        this.active.add(unlock);
        unlock.start();
      }
      await context.resume();
      // A later pause, activation, or disposal owns the playback intent.
      if (this.disposed || generation !== this.activationGeneration || this.context !== context || context.state !== 'running') {
        if(this.unlockSource===unlock)this._releaseUnlock();
        return false;
      }
      this.paused = false;
      this.music.gain.cancelScheduledValues(this.context.currentTime);
      this.music.gain.setTargetAtTime(AUDIO.mix.musicGain, this.context.currentTime, AUDIO.mix.smoothingSeconds);
      this._begin();
      this._loadVoices();
      return true;
    } catch {
      if(this.unlockSource===unlock)this._releaseUnlock();
      // Restricted browsers can still play the game silently.
      return false;
    }
  }

  _releaseUnlock() {
    const source=this.unlockSource;
    if(!source)return;
    try { source.stop(); } catch { /* Already ended. */ }
    source.onended=null;source.disconnect();this.active.delete(source);this.unlockSource=null;
  }

  setMuted(muted) {
    this.muted = Boolean(muted);
    if (this.muted) this._stopAmbience();
    if (!this.context || !this.master) return;
    const now = this.context.currentTime;
    this.master.gain.cancelScheduledValues(now);
    this.master.gain.setTargetAtTime(this.muted ? 0 : AUDIO.mix.masterGain, now, AUDIO.mix.smoothingSeconds);
  }

  /** Pause scene sounds and clocks without interrupting the soundtrack. */
  setGameplayPaused(paused) {
    this.gameplayPaused = Boolean(paused);
    if (this.gameplayPaused) this._stopAmbience();
  }

  /** Full page/background suspension; menus use setGameplayPaused instead. */
  pause() {
    this.activationGeneration++;
    this.paused = true;
    this._releaseUnlock();
    this._stopScheduler();
    this._stopAmbience();
    if (this.context && this.context.state !== 'closed') this.music.gain.setTargetAtTime(0.0001, this.context.currentTime, AUDIO.mix.smoothingSeconds);
  }

  async resume() {
    return this.start();
  }

  _begin() {
    if (this.timer || this.paused || this.disposed) return;
    this.nextNoteTime = this.context.currentTime + AUDIO.scheduler.startLeadSeconds;
    this._schedule();
    this.timer = globalThis.setInterval(() => this._schedule(), AUDIO.scheduler.intervalMs);
  }

  _stopScheduler() {
    if (this.timer !== null) globalThis.clearInterval(this.timer);
    this.timer = null;
    this.musicGenerator?.stop();
  }

  _schedule() {
    if (!this.context || this.context.state !== 'running' || this.paused || this.disposed) return;
    const eighth = 60 / this.tempo / 2;
    if (!Number.isFinite(eighth) || eighth <= 0) return;
    const now = this.context.currentTime;
    if (this.nextNoteTime < now) {
      // Hidden tabs can miss minutes of callbacks. Skip those beats without
      // creating overdue oscillators, keeping the phrase at its elapsed step.
      const skipped = Math.ceil((now - this.nextNoteTime) / eighth);
      this.step = (this.step + skipped) % MUSIC_STEPS;
      this.nextNoteTime = Math.max(now, this.nextNoteTime + skipped * eighth);
    }
    for (let scheduled = 0; scheduled < AUDIO.scheduler.maxStepsPerTick && this.nextNoteTime < now + AUDIO.scheduler.lookAheadSeconds; scheduled++) {
      this._musicStep(this.step, this.nextNoteTime, eighth);
      this.step = (this.step + 1) % MUSIC_STEPS;
      this.nextNoteTime += eighth;
    }
  }

  _musicStep(step, time, eighth) {
    this.musicGenerator?.scheduleStep(step, time, eighth);
  }

  /** Driven by gameplay frames: never starts audio without a user gesture. */
  updateAmbience(dt, state = {}) {
    const raw = state.weather || 'sun';
    const available = this.context && this.context.state === 'running' && !this.paused && !this.gameplayPaused && !this.muted && !this.disposed;
    this._updateThunder(typeof raw === 'object' ? raw : null, available);
    if (!available) return;
    const type = typeof raw === 'string' ? raw : raw.type || 'sun';
    const intensity = typeof raw === 'object' && Number.isFinite(raw.intensity)
      ? Math.max(0, Math.min(1, raw.intensity)) : AUDIO.weather.defaultIntensity;
    const kind = ['rain', 'light-rain', 'heavy-rain', 'storm'].includes(type) ? 'rain' : type === 'wind' ? 'wind' : 'sun';
    const tier = typeof raw === 'object' ? (raw.storm ? 'storm' : raw.kind || type) : type;
    const rainScale = tier === 'storm' ? AUDIO.weather.stormRainScale : tier === 'heavy-rain' ? AUDIO.weather.heavyRainScale : AUDIO.weather.lightRainScale;
    this._weather(kind, intensity, rainScale);
    // Clamp frame gaps so resuming a hidden tab cannot emit a burst of birds.
    this.birdCountdown -= Number.isFinite(dt) ? Math.max(0, Math.min(dt, AUDIO.birds.frameCapSeconds)) : 0;
    if (this.birdCountdown > 0) return;
    this.birdCountdown = kind === 'rain' ? AUDIO.birds.rainDelaySeconds + Math.random() * AUDIO.birds.rainJitterSeconds : AUDIO.birds.clearDelaySeconds + Math.random() * AUDIO.birds.clearJitterSeconds;
    if ((typeof raw === 'object' && (raw.storm || raw.kind === 'storm')) || type === 'storm' || (kind === 'rain' && intensity >= AUDIO.birds.rainSuppressionIntensity)) return;
    this._chirp(kind === 'rain' ? AUDIO.birds.rainGain : AUDIO.birds.clearGain);
  }

  _noise() {
    if (!this.noiseBuffer) {
      const context = this.context;
      this.noiseBuffer = context.createBuffer(1, context.sampleRate * AUDIO.voices.noiseBufferSeconds, context.sampleRate);
      const samples = this.noiseBuffer.getChannelData(0);
      for (let i = 0; i < samples.length; i++) samples[i] = Math.random() * 2 - 1;
    }
    return this.noiseBuffer;
  }

  resetLivestock(level = null) {
    for (const source of [...this.livestockSources]) this._releaseAmbience(source);
    this.livestockSources.clear();
    this.livestockSchedules.clear();
    this.livestockLevel = level;
  }

  /** One independent clock per animal, driven by simulation frames, not timers. */
  updateLivestock(dt, {animals = [], listener, level = null} = {}) {
    if (level !== this.livestockLevel) this.resetLivestock(level);
    const available = this.context && this.context.state === 'running' && !this.paused && !this.gameplayPaused && !this.muted && !this.disposed;
    const step = Number.isFinite(dt) ? Math.max(0, Math.min(AUDIO.livestock.frameCapSeconds, dt)) : 0;
    if (!step || this.paused || this.gameplayPaused || this.disposed) return;
    const present = new Set(animals);
    for (const animal of this.livestockSchedules.keys()) if (!present.has(animal)) this.livestockSchedules.delete(animal);
    let emitted = 0;
    for (const animal of animals) {
      if (animal.type !== 'sheep' && animal.type !== 'cow') continue;
      const bolting = Boolean(animal.wander?.bolting);
      const herded = bolting || Boolean(animal.pushed) || animal.alert > AUDIO.livestock.alertThreshold;
      let schedule = this.livestockSchedules.get(animal);
      if (!schedule) {
        schedule = {remaining: (AUDIO.livestock.initialDelaySeconds + callHash((level?.seed || 0) ^ Math.imul(animal.id + 1, 137)) * AUDIO.livestock.initialJitterSeconds) * (animal.type==='sheep'?AUDIO.livestock.sheepIntervalScale:1), sequence: 0, bolting: false};
        this.livestockSchedules.set(animal, schedule);
      }
      const immediate = bolting && !schedule.bolting;
      schedule.bolting = bolting;
      schedule.remaining -= step;
      if (!immediate && schedule.remaining > 0) continue;
      const roll = callHash((level?.seed || 0) ^ Math.imul(animal.id + 1, 137) ^ Math.imul(++schedule.sequence, 7919));
      schedule.remaining = (herded ? AUDIO.livestock.herdedDelaySeconds + roll * AUDIO.livestock.herdedJitterSeconds : AUDIO.livestock.calmDelaySeconds + roll * AUDIO.livestock.calmJitterSeconds) * (animal.type==='sheep'?AUDIO.livestock.sheepIntervalScale:1);
      // Observe calls while muted too: unmuting never replays a missed bolt.
      if (!available || (!immediate && (emitted >= AUDIO.livestock.maxStartsPerFrame || this.livestockSources.size >= AUDIO.livestock.maxVoices))) continue;
      const distance = listener ? Math.hypot(animal.x - listener.x, animal.z - listener.z) : 0;
      if (!Number.isFinite(distance) || distance > AUDIO.livestock.maxDistance) continue;
      // A newly bolting animal takes a voice immediately, replacing the oldest
      // call when necessary rather than losing its one-shot state transition.
      if (immediate && this.livestockSources.size >= AUDIO.livestock.maxVoices) this._releaseAmbience(this.livestockSources.values().next().value);
      const attenuation = 1 / (1 + (distance / AUDIO.livestock.attenuationDistance) ** 2);
      const identity=(level?.seed||0)^Math.imul(animal.id+1,0x45d9f3b);
      const tone=callHash(identity^0x71c4),length=callHash(identity^0x16f3);
      const variation=callHash(identity^Math.imul(schedule.sequence,0x27d4eb2d));
      const pitch=animal.type==='cow'?AUDIO.livestock.cowPitchBase+tone*AUDIO.livestock.cowPitchSpread+(variation-.5)*AUDIO.livestock.cowPitchVariation:AUDIO.livestock.sheepPitchBase+tone*AUDIO.livestock.sheepPitchSpread+(variation-.5)*AUDIO.livestock.sheepPitchVariation;
      const durationScale=Math.max(AUDIO.livestock.durationMinScale,Math.min(AUDIO.livestock.durationMaxScale,AUDIO.livestock.durationBaseScale+length*AUDIO.livestock.durationSpread+(variation-.5)*AUDIO.livestock.durationVariation));
      this._voice(animal.type, AUDIO.livestock.gain * (herded ? AUDIO.livestock.herdedGainScale : 1) * attenuation, 0, pitch, true, durationScale);
      emitted++;
    }
  }

  _loadVoices() {
    if(this.voiceLoad || !this.context?.decodeAudioData || typeof document==='undefined' || !document.baseURI || typeof fetch!=='function')return this.voiceLoad;
    const context=this.context,generation=this.voiceGeneration;
    this.voiceLoad=Promise.allSettled(['bark','sheep','cow'].map(async kind=>{
      const response=await fetch(new URL(`audio/${kind}.mp3`,document.baseURI),{signal:AbortSignal.timeout(AUDIO.voices.loadTimeoutMs)});
      if(!response.ok)throw Error('Animal recording unavailable');
      const buffer=await context.decodeAudioData(await response.arrayBuffer());
      if(!this.disposed && this.context===context && this.voiceGeneration===generation)this.recordedVoices.set(kind,buffer);
    }));
    return this.voiceLoad;
  }

  _voiceBuffer(kind) {
    if (this.voiceBuffers.has(kind)) return this.voiceBuffers.get(kind);
    const rate = this.context.sampleRate;
    const duration = kind === 'bark' ? AUDIO.voices.barkDurationSeconds : kind === 'cow' ? AUDIO.voices.cowDurationSeconds : AUDIO.voices.sheepDurationSeconds;
    const buffer = this.context.createBuffer(1, Math.ceil(rate * duration), rate);
    const samples = buffer.getChannelData(0);
    let phase = 0, peak = .001;
    for (let i = 0; i < samples.length; i++) {
      const t = i / rate, fraction = t / duration;
      const base = kind === 'bark' ? 155 - 55 * fraction : kind === 'cow' ? 112 + 10 * Math.sin(fraction * Math.PI) : 205 + 14 * Math.sin(t * 2 * Math.PI * 8);
      phase += 2 * Math.PI * base / rate;
      let voiced = 0;
      const formants = kind === 'bark' ? [650, 1250] : kind === 'cow' ? [340 + 100 * Math.sin(fraction * Math.PI), 780] : [750, 1450];
      for (let harmonic = 1; harmonic <= 18; harmonic++) {
        const frequency = base * harmonic;
        const resonance = formants.reduce((sum, center) => sum + Math.exp(-(((frequency - center) / (kind === 'bark' ? 360 : 190)) ** 2)), 0);
        voiced += Math.sin(phase * harmonic) * (.1 + resonance) / harmonic;
      }
      const noise = (callHash(i * 131 + 17) * 2 - 1) * (kind === 'bark' ? .32 * (1 - fraction) : .015);
      const envelope = Math.min(1, t / (kind === 'bark' ? .009 : .065)) * (1 - fraction) ** (kind === 'bark' ? 1.8 : .7) * Math.min(1, (duration - t) / .05);
      const tremolo = kind === 'sheep' ? .7 + .3 * Math.sin(t * 2 * Math.PI * 9) : 1;
      samples[i] = (voiced + noise) * envelope * tremolo;
      peak = Math.max(peak, Math.abs(samples[i]));
    }
    for (let i = 0; i < samples.length; i++) samples[i] = samples[i] / peak * .85;
    this.voiceBuffers.set(kind, buffer);
    return buffer;
  }

  _voice(kind, volume, offset = 0, pitch = 1, livestock = false, durationScale = 1) {
    const source = this.context.createBufferSource(), envelope = this.context.createGain();
    source.buffer = this.recordedVoices.get(kind) || this._voiceBuffer(kind);
    if (source.playbackRate) source.playbackRate.value = pitch;
    envelope.gain.value = volume;
    source.connect(envelope); envelope.connect(this.effects);
    this._trackAmbience(source, [envelope]);
    if (livestock) this.livestockSources.add(source);
    const ended = source.onended;
    source.onended = () => { ended(); this.livestockSources.delete(source); };
    const now = this.context.currentTime + AUDIO.voices.startLeadSeconds + offset;
    const duration=(source.buffer.duration || (kind === 'bark' ? AUDIO.voices.barkDurationSeconds : kind === 'cow' ? AUDIO.voices.cowDurationSeconds : AUDIO.voices.sheepDurationSeconds)) / pitch * durationScale;
    if(livestock){
      const fade=Math.min(AUDIO.voices.livestockFadeSeconds,duration*AUDIO.voices.livestockFadeFraction);
      envelope.gain.setValueAtTime(.0001,now);
      envelope.gain.exponentialRampToValueAtTime(Math.max(.0001,volume),now+Math.min(AUDIO.voices.livestockAttackSeconds,duration*AUDIO.voices.livestockAttackFraction));
      envelope.gain.setValueAtTime(volume,now+duration-fade);
      envelope.gain.exponentialRampToValueAtTime(.0001,now+duration);
    }
    source.start(now);
    source.stop(now + duration + AUDIO.voices.stopPaddingSeconds);
    return source;
  }

  _updateThunder(weather, available) {
    if (weather !== this.weatherState) {
      if (this.thunderSource) this._releaseAmbience(this.thunderSource);
      this.thunderSource = null; this.thunderEvent = null; this.weatherState = weather;
      this._restoreMusicMix();
    }
    const id = weather?.lightningId;
    if (!id || id === this.thunderEvent) return;
    // Observe muted/paused events too, preventing delayed playback on unmute.
    this.thunderEvent = id;
    const age = weather.lightningAge, delay = weather.thunderDelay;
    if (!available || !Number.isFinite(age) || !Number.isFinite(delay) || age < 0 || delay < 0 || age > delay + AUDIO.thunder.eventToleranceSeconds) return;
    if (this.thunderSource) this._releaseAmbience(this.thunderSource);
    const context = this.context, source = context.createBufferSource();
    const filter = context.createBiquadFilter(), gain = context.createGain();
    const at = context.currentTime + Math.max(AUDIO.thunder.startLeadSeconds, delay - age);
    const duration = AUDIO.thunder.durationSeconds + Math.random() * AUDIO.thunder.durationJitterSeconds;
    // Suppress the bright metallic crack; a soft onset and nonresonant lowpass
    // leave a deep rolling rumble. Each strike gets its own bounded decay.
    source.buffer = this._noise(); source.loop = true; filter.type = 'lowpass'; filter.Q.value = .35;
    filter.frequency.setValueAtTime(400, at);
    filter.frequency.exponentialRampToValueAtTime(85, at + duration * .65);
    gain.gain.setValueAtTime(.0001, at);
    gain.gain.exponentialRampToValueAtTime(.65, at + .12);
    gain.gain.exponentialRampToValueAtTime(.32, at + duration * .23);
    gain.gain.exponentialRampToValueAtTime(.035, at + duration * .56);
    gain.gain.exponentialRampToValueAtTime(.0001, at + duration * .76);
    source.connect(filter); filter.connect(gain); gain.connect(this.effects);
    // Finite, irregular early reflections give the rumble space without an
    // unbounded feedback loop. The last reflection decays before cleanup.
    const reflections = [];
    for (const [fraction, level] of [[.035,.24],[.073,.18],[.119,.13],[.167,.09],[.22,.06]]) {
      const delayNode = context.createDelay(1.2), wet = context.createGain();
      delayNode.delayTime.value = duration * fraction; wet.gain.value = level;
      gain.connect(delayNode); delayNode.connect(wet); wet.connect(this.effects);
      reflections.push(delayNode, wet);
    }
    // Preserve the music, with brief room for thunder in the shared mix.
    this.music.gain.cancelScheduledValues(context.currentTime);
    this.music.gain.setValueAtTime(AUDIO.mix.musicGain, context.currentTime);
    this.music.gain.setTargetAtTime(AUDIO.thunder.duckMusicGain, at, AUDIO.thunder.duckSeconds);
    this.music.gain.setTargetAtTime(AUDIO.mix.musicGain, at + duration * AUDIO.thunder.recoveryFraction, AUDIO.thunder.recoverySeconds);
    this._trackAmbience(source, [filter, gain, ...reflections]); this.thunderSource = source;
    const ended = source.onended;
    source.onended = () => { ended(); if (this.thunderSource === source) this.thunderSource = null; };
    source.start(at); source.stop(at + duration);
  }

  _chirp(volume) {
    const now = this.context.currentTime + 0.015;
    const base = 1600 + Math.random() * 1100;
    const notes = 2 + Math.floor(Math.random() * 2);
    for (let i = 0; i < notes; i++) {
      const oscillator = this.context.createOscillator();
      const envelope = this.context.createGain();
      const time = now + i * (0.14 + Math.random() * 0.035);
      oscillator.type = 'sine';
      oscillator.frequency.setValueAtTime(base * (1 + i * 0.1), time);
      oscillator.frequency.exponentialRampToValueAtTime(base * (i % 2 ? 0.9 : 1.28), time + 0.07);
      oscillator.frequency.exponentialRampToValueAtTime(base * 0.95, time + 0.13);
      envelope.gain.setValueAtTime(0.0001, time);
      envelope.gain.exponentialRampToValueAtTime(volume, time + 0.025);
      envelope.gain.exponentialRampToValueAtTime(0.0001, time + 0.15);
      oscillator.connect(envelope);
      envelope.connect(this.ambience);
      this._trackAmbience(oscillator, [envelope]);
      oscillator.start(time);
      oscillator.stop(time + 0.17);
    }
  }

  _trackAmbience(source, nodes) {
    this.active.add(source);
    this.ambientSources.add(source);
    source.onended = () => {
      source.disconnect();
      for (const node of nodes) node.disconnect();
      this.active.delete(source);
      this.ambientSources.delete(source);
    };
  }

  _weather(kind, intensity, rainScale = 1) {
    if (this.weatherKind !== kind) {
      this._stopWeather();
      this.weatherKind = kind;
      if (kind !== 'sun') {
        const context = this.context;
        this._noise();
        const source = context.createBufferSource();
        const filter = context.createBiquadFilter();
        const gain = context.createGain();
        source.buffer = this.noiseBuffer;
        source.loop = true;
        filter.type = 'lowpass';
        filter.frequency.value = kind === 'rain' ? AUDIO.weather.rainLowpassHz : AUDIO.weather.windLowpassHz;
        filter.Q.value = 0.3;
        gain.gain.value = 0.0001;
        source.connect(filter);
        filter.connect(gain);
        gain.connect(this.ambience);
        this._trackAmbience(source, [filter, gain]);
        this.weatherSource = { source, gain, filter };
        source.start();
      }
    }
    if (this.weatherSource) {
      const volume = (kind === 'rain' ? AUDIO.weather.rainGain * rainScale : AUDIO.weather.windGain) * intensity;
      if (Math.abs(volume - this.weatherVolume) > AUDIO.weather.gainChangeThreshold) {
        this.weatherSource.gain.gain.setTargetAtTime(volume, this.context.currentTime, AUDIO.weather.smoothingSeconds);
        this.weatherVolume = volume;
      }
    }
  }

  _stopWeather() {
    if (this.weatherSource) this._releaseAmbience(this.weatherSource.source);
    this.weatherSource = null;
    this.weatherKind = null;
    this.weatherVolume = -1;
  }

  _releaseAmbience(source) {
    try { source.stop(); } catch { /* Already ended. */ }
    // Disconnect synchronously too: browsers dispatch onended asynchronously.
    source.onended?.();
    source.onended = null;
  }

  _restoreMusicMix() {
    if (!this.context || !this.music || this.context.state === 'closed') return;
    const now = this.context.currentTime;
    this.music.gain.cancelScheduledValues(now);
    this.music.gain.setTargetAtTime(this.paused ? .0001 : AUDIO.mix.musicGain, now, AUDIO.mix.smoothingSeconds);
  }

  _stopAmbience() {
    this._restoreMusicMix();
    this._stopWeather();
    this.thunderSource = null;
    for (const source of [...this.ambientSources]) this._releaseAmbience(source);
    this.birdCountdown = AUDIO.birds.clearDelaySeconds + Math.random() * AUDIO.birds.clearJitterSeconds;
    this.livestockSources.clear();
  }

  _note(midi, time, duration, volume, voice = 'marimba', destination = this.effects) {
    if (!this.context || !destination || this.disposed || this.active.size>=AUDIO.effects.maxVoices) return;
    const context = this.context;
    const oscillator = context.createOscillator();
    const envelope = context.createGain();
    const frequency = 440 * 2 ** ((midi - 69) / 12);
    oscillator.type = voice === 'pluck' ? 'triangle' : 'sine';
    oscillator.frequency.setValueAtTime(frequency, time);
    envelope.gain.setValueAtTime(0.0001, time);
    envelope.gain.exponentialRampToValueAtTime(Math.max(0.001, volume), time + (voice === 'flute' ? .035 : .009));
    envelope.gain.exponentialRampToValueAtTime(0.0001, time + duration);
    oscillator.connect(envelope);
    envelope.connect(destination);
    this.active.add(oscillator);
    oscillator.onended = () => {
      oscillator.disconnect();
      envelope.disconnect();
      this.active.delete(oscillator);
    };
    oscillator.start(time);
    oscillator.stop(time + duration + 0.03);
    if (voice === 'marimba') {
      // Soft upper partial gives the sine note its wooden mallet sound.
      this._note(midi + 19, time, duration * 0.35, volume * 0.12, 'partial', destination);
    }
  }

  play(name, actor = 'buddy') {
    if (!this.context || this.context.state !== 'running' || this.muted || this.disposed) return;
    const now = this.context.currentTime + 0.01;
    if (name === 'bark') {
      this._voice('bark', AUDIO.effects.barkGain, 0, actor==='pip'?AUDIO.effects.pipPitch:1);
      return;
    }
    const phrases = {
      saved: [79, 84], animal: [79, 84], rescue: [79, 84],
      purchase: [72, 76, 79, 84], unlock: [72, 76, 79, 84],
      completed: [72, 76, 79, 84, 79, 84], complete: [72, 76, 79, 84, 79, 84], win: [72, 76, 79, 84, 79, 84],
      click: [79],
    };
    const phrase = phrases[name];
    if (!phrase) return;
    phrase.forEach((note, i) => this._note(note, now + i * AUDIO.effects.phraseSpacingSeconds, AUDIO.effects.noteDurationSeconds, AUDIO.effects.noteGain, 'marimba'));
  }

  dispose() {
    if (this.disposed) return;
    this.activationGeneration++;
    this.disposed = true;
    this._releaseUnlock();
    this._stopScheduler();
    this.musicGenerator?.dispose();
    this.musicGenerator = null;
    this._stopAmbience();
    for (const source of this.active) {
      try { source.stop(); } catch { /* Already ended. */ }
      source.disconnect();
    }
    this.active.clear();
    if (this.context && this.context.state !== 'closed') this.context.close().catch(() => {});
    this.context = null;
    this.master = this.music = this.effects = this.ambience = null;
    this.noiseBuffer = null;
    this.voiceGeneration++;this.recordedVoices.clear();this.voiceLoad=null;
    this.voiceBuffers.clear(); this.livestockSchedules.clear(); this.livestockLevel = null;
  }
}

