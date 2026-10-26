/** Original, quiet 16-bar score. All notes belong to C major / A minor. */
export const MUSIC_TEMPO = 70;
export const MUSIC_STEPS = 128;
const phrases = [
  { bass: 45, keys: [55, 59, 60, 64], melody: [71, 69, 64] }, // Am9
  { bass: 41, keys: [57, 60, 64, 67], melody: [69, 67, 64] }, // Fmaj9
  { bass: 48, keys: [55, 59, 62, 64], melody: [67, 64, 62] }, // Cmaj9
  { bass: 43, keys: [55, 57, 62, 64], melody: [69, 67, 62] }, // G6/9
  { bass: 50, keys: [53, 57, 60, 64], melody: [65, 64, 60] }, // Dm9
  { bass: 41, keys: [55, 57, 60, 64], melody: [67, 64, 60] }, // Fmaj9
  { bass: 48, keys: [55, 59, 62, 64], melody: [64, 62, 59] }, // Cmaj9
  { bass: 43, keys: [55, 57, 60, 64], melody: [62, 64, 67] }, // G13sus
];

/** Owns the score and music voices; FarmAudio owns activation, clock and mix. */
export class LoFiMusic {
  constructor(context, destination, active) {
    this.context = context;
    this.destination = destination;
    this.active = active;
    this.voices = new Map();
    this.disposed = false;
  }

  scheduleStep(step, time, eighth) {
    if (this.disposed) return;
    const phrase = Math.floor(step / 16) % phrases.length, pos = step % 16;
    const { bass, keys, melody } = phrases[phrase];
    const at = time + (pos % 2 ? eighth * .16 : 0);
    if (pos === 0 || pos === 8) {
      // Slow, overlapping voicings with a softer second chord and rolled attack.
      keys.forEach((note, i) => this._key(note, at + i * .018, eighth * 7.2, pos === 0 ? .033 : .025));
      this._tone(bass, at, eighth * 3.5, .085, 'bass');
    }
    if (pos === 6 || (pos === 14 && phrase % 2 === 0)) {
      this._tone(bass + (pos === 6 ? 7 : 0), at, eighth * 1.65, .045, 'bass');
    }
    // Two-bar call/answer shapes, with whole phrases left open for field sounds.
    const motif = phrase === 0 || phrase === 4 ? [5, 11] : phrase % 2 ? [3, 10, 13] : [];
    const index = motif.indexOf(pos);
    if (index !== -1) this._tone(melody[index], at, eighth * 3.2, .018, 'melody');
    if (pos === 0 || pos === 8 || (pos === 7 && phrase % 2 === 1)) {
      this._tone(40, at, .28, pos === 7 ? .035 : .075, 'kick');
    }
    // Rounded low taps replace hats/snare noise: no crackle or short noise bursts.
    if (pos === 4 || pos === 12) this._tone(50, at + .018, .22, .017, 'tap');
    if (pos === 11 && phrase % 2 === 1) this._tone(55, at, .19, .009, 'tap');
  }

  _key(midi, time, duration, volume) {
    this._tone(midi, time, duration, volume, 'keys');
    // A quiet, shorter second partial adds electric-piano warmth to the sine body.
    this._tone(midi + 12, time, duration * .55, volume * .14, 'keys');
  }

  _tone(midi, time, duration, volume, voice) {
    if (this.disposed || this.active.size >= 128) return;
    const context = this.context, oscillator = context.createOscillator();
    const envelope = context.createGain(), release = context.createGain(), filter = context.createBiquadFilter();
    release.gain.value = 1;
    const frequency = 440 * 2 ** ((midi - 69) / 12);
    const attack = voice === 'bass' ? .055 : voice === 'kick' || voice === 'tap' ? .03 : voice === 'melody' ? .08 : .055;
    oscillator.type = voice === 'melody' ? 'triangle' : 'sine';
    oscillator.frequency.setValueAtTime(frequency, time);
    if (voice === 'kick' || voice === 'tap') oscillator.frequency.exponentialRampToValueAtTime(voice === 'kick' ? 48 : frequency * .82, time + .16);
    // Tiny, slow pitch drift; never consume gameplay or ambient random sequences.
    if (voice === 'keys' || voice === 'melody') oscillator.frequency.setTargetAtTime(frequency * (1 + Math.sin(time * .63 + midi) * .0012), time + attack, .45);
    filter.type = 'lowpass';
    filter.frequency.value = voice === 'melody' ? 1050 : voice === 'keys' ? 1450 : 700;
    filter.Q.value = .45;
    envelope.gain.setValueAtTime(0, time);
    envelope.gain.linearRampToValueAtTime(volume, time + attack);
    envelope.gain.exponentialRampToValueAtTime(.0001, time + duration);
    envelope.gain.linearRampToValueAtTime(0, time + duration + .06);
    oscillator.connect(filter); filter.connect(envelope); envelope.connect(release); release.connect(this.destination);
    this.active.add(oscillator);
    this.voices.set(oscillator, { envelope, release, filter, time });
    oscillator.onended = () => this._release(oscillator);
    oscillator.start(time);
    oscillator.stop(time + duration + .07);
  }

  _release(source) {
    const nodes = this.voices.get(source);
    if (!nodes) return;
    source.disconnect(); nodes.filter.disconnect(); nodes.envelope.disconnect(); nodes.release.disconnect();
    source.onended = null;
    this.voices.delete(source); this.active.delete(source);
  }

  stop() {
    const now = this.context.currentTime;
    for (const [source, { envelope, release, time }] of this.voices) {
      const gain = envelope.gain;
      if (time > now) {
        gain.cancelScheduledValues(now);
        gain.setValueAtTime(0, now);
      }
      // A separate gate leaves the sounding envelope intact, including on
      // browsers without cancelAndHoldAtTime. Repeated stops remain continuous.
      release.gain.setTargetAtTime(0, now, .012);
      try { source.stop(now + .08); } catch { /* Already ended. */ }
    }
  }

  dispose() {
    if (this.disposed) return;
    this.disposed = true;
    for (const source of [...this.voices.keys()]) {
      try { source.stop(); } catch { /* Already ended. */ }
      this._release(source);
    }
  }
}
