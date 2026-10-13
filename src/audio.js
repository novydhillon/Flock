/** Cheerful, entirely synthesized farm soundtrack. Call start from a user gesture. */
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
    this.birdCountdown = 4 + Math.random() * 6;
    this.muted = false;
    this.paused = false;
    this.timer = null;
    this.step = 0;
    this.nextNoteTime = 0;
    this.active = new Set();
    this.disposed = false;
    this.tempo = 106;
  }

  async start() {
    if (this.disposed) return false;
    try {
      if (!this.context) {
        const AudioContext = globalThis.AudioContext || globalThis.webkitAudioContext;
        if (!AudioContext) return false;
        this.context = new AudioContext();
        this.master = this.context.createGain();
        this.music = this.context.createGain();
        this.effects = this.context.createGain();
        this.ambience = this.context.createGain();
        this.master.gain.value = this.muted ? 0 : 0.65;
        this.music.gain.value = 0.42;
        this.effects.gain.value = 0.6;
        this.ambience.gain.value = 0.38;
        this.music.connect(this.master);
        this.effects.connect(this.master);
        this.ambience.connect(this.master);
        this.master.connect(this.context.destination);
      }
      await this.context.resume();
      this.paused = false;
      this.music.gain.setTargetAtTime(0.42, this.context.currentTime, 0.025);
      this._begin();
      return true;
    } catch {
      // Restricted browsers can still play the game silently.
      return false;
    }
  }

  setMuted(muted) {
    this.muted = Boolean(muted);
    if (this.muted) this._stopAmbience();
    if (!this.context || !this.master) return;
    const now = this.context.currentTime;
    this.master.gain.cancelScheduledValues(now);
    this.master.gain.setTargetAtTime(this.muted ? 0 : 0.65, now, 0.025);
  }

  pause() {
    this.paused = true;
    this._stopScheduler();
    this._stopAmbience();
    if (this.context && this.context.state !== 'closed') this.music.gain.setTargetAtTime(0.0001, this.context.currentTime, 0.025);
  }

  async resume() {
    if (this.disposed) return false;
    if (!this.context) return this.start();
    try {
      await this.context.resume();
      this.paused = false;
      this.music.gain.setTargetAtTime(0.42, this.context.currentTime, 0.025);
      this._begin();
      return true;
    } catch { return false; }
  }

  _begin() {
    if (this.timer || this.paused || this.disposed) return;
    this.nextNoteTime = this.context.currentTime + 0.06;
    this._schedule();
    this.timer = globalThis.setInterval(() => this._schedule(), 100);
  }

  _stopScheduler() {
    if (this.timer !== null) globalThis.clearInterval(this.timer);
    this.timer = null;
  }

  _schedule() {
    if (!this.context || this.context.state !== 'running' || this.paused) return;
    const eighth = 60 / this.tempo / 2;
    while (this.nextNoteTime < this.context.currentTime + 0.25) {
      this._musicStep(this.step, this.nextNoteTime, eighth);
      this.step = (this.step + 1) % 128;
      this.nextNoteTime += eighth;
    }
  }

  _musicStep(step, time, eighth) {
    // Eight bars: C, F, C, G, Am, F, G, C. A small melody with breathing space.
    const roots = [48, 53, 48, 55, 57, 53, 55, 48];
    const melodies = [
      [72, 76, 79, null, 76, 74, 72, null],
      [77, 81, 79, null, 77, 76, 74, null],
      [72, 76, 79, 81, 79, null, 76, null],
      [74, 79, 83, null, 81, 79, 74, null],
      [76, 81, 84, null, 83, 81, 79, null],
      [77, null, 81, 79, 77, 76, 74, null],
      [74, 77, 79, null, 83, 81, 79, 74],
      [76, 74, 72, null, 79, null, 72, null],
    ];
    const bar = Math.floor(step / 16);
    const pos = step % 16;
    const root = roots[bar];
    const minor = bar === 4;
    if (pos % 4 === 0) {
      this._note(root + (pos === 8 ? 7 : 0), time, 0.32, 0.15, 'bass', this.music);
    }
    if (pos % 4 === 2) {
      this._note(root + 12, time, 0.22, 0.048, 'pluck', this.music);
      this._note(root + (minor ? 15 : 16), time + 0.018, 0.22, 0.042, 'pluck', this.music);
      this._note(root + 19, time + 0.035, 0.22, 0.036, 'pluck', this.music);
    }
    // The melody repeats its eight-note phrase at half time; the second half
    // becomes a delicate flute answer rather than a continuous busy loop.
    if (pos % 2 === 0) {
      const note = melodies[bar][pos / 2];
      if (note !== null) this._note(note, time, eighth * 1.5, 0.12, bar % 2 ? 'flute' : 'marimba', this.music);
    }
  }

  /** Driven by gameplay frames: never starts audio without a user gesture. */
  updateAmbience(dt, state = {}) {
    if (!this.context || this.context.state !== 'running' || this.paused || this.muted || this.disposed) return;
    const raw = state.weather || 'sun';
    const type = typeof raw === 'string' ? raw : raw.type || 'sun';
    const intensity = typeof raw === 'object' && Number.isFinite(raw.intensity)
      ? Math.max(0, Math.min(1, raw.intensity)) : 0.3;
    const kind = ['rain', 'wind', 'snow'].includes(type) ? type : 'sun';
    this._weather(kind, intensity);
    // Clamp frame gaps so resuming a hidden tab cannot emit a burst of birds.
    this.birdCountdown -= Number.isFinite(dt) ? Math.max(0, Math.min(dt, 0.25)) : 0;
    if (this.birdCountdown > 0) return;
    this.birdCountdown = kind === 'rain' ? 10 + Math.random() * 10 : 4 + Math.random() * 6;
    if (kind === 'rain' && intensity >= 0.7) return;
    this._chirp(kind === 'rain' ? 0.018 : 0.03);
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

  _weather(kind, intensity) {
    if (this.weatherKind !== kind) {
      this._stopWeather();
      this.weatherKind = kind;
      if (kind !== 'sun') {
        const context = this.context;
        if (!this.noiseBuffer) {
          this.noiseBuffer = context.createBuffer(1, context.sampleRate * 2, context.sampleRate);
          const samples = this.noiseBuffer.getChannelData(0);
          for (let i = 0; i < samples.length; i++) samples[i] = Math.random() * 2 - 1;
        }
        const source = context.createBufferSource();
        const filter = context.createBiquadFilter();
        const gain = context.createGain();
        source.buffer = this.noiseBuffer;
        source.loop = true;
        filter.type = 'lowpass';
        filter.frequency.value = kind === 'rain' ? 2200 : 500;
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
      const volume = (kind === 'rain' ? 0.032 : kind === 'snow' ? 0.012 : 0.024) * intensity;
      if (Math.abs(volume - this.weatherVolume) > 0.001) {
        this.weatherSource.gain.gain.setTargetAtTime(volume, this.context.currentTime, 0.8);
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

  _stopAmbience() {
    this._stopWeather();
    for (const source of [...this.ambientSources]) this._releaseAmbience(source);
    this.birdCountdown = 4 + Math.random() * 6;
  }

  _note(midi, time, duration, volume, voice = 'marimba', destination = this.effects) {
    if (!this.context || !destination || this.disposed) return;
    const context = this.context;
    const oscillator = context.createOscillator();
    const envelope = context.createGain();
    const frequency = 440 * 2 ** ((midi - 69) / 12);
    oscillator.type = voice === 'pluck' ? 'triangle' : 'sine';
    oscillator.frequency.setValueAtTime(frequency, time);
    envelope.gain.setValueAtTime(0.0001, time);
    envelope.gain.exponentialRampToValueAtTime(Math.max(0.001, volume), time + (voice === 'flute' ? 0.035 : 0.009));
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

  play(name) {
    if (!this.context || this.context.state !== 'running' || this.muted || this.disposed) return;
    const now = this.context.currentTime + 0.01;
    if (name === 'bark') {
      // Two short rounded electronic woofs, friendly and quieter than speech.
      [0, 0.14].forEach((offset) => {
        const osc = this.context.createOscillator();
        const gain = this.context.createGain();
        const t = now + offset;
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(330, t);
        osc.frequency.exponentialRampToValueAtTime(110, t + 0.095);
        gain.gain.setValueAtTime(0.0001, t);
        gain.gain.exponentialRampToValueAtTime(0.11, t + 0.012);
        gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.1);
        osc.connect(gain); gain.connect(this.effects);
        this.active.add(osc);
        osc.onended = () => { osc.disconnect(); gain.disconnect(); this.active.delete(osc); };
        osc.start(t); osc.stop(t + 0.12);
      });
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
    phrase.forEach((note, i) => this._note(note, now + i * 0.115, 0.28, 0.16, 'marimba'));
  }

  dispose() {
    if (this.disposed) return;
    this.disposed = true;
    this._stopScheduler();
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
  }
}
