import { CONFIG_CONTRACTS } from './config/contracts.js';
import settings from './config/music.json' with { type: 'json' };
import { resolveConfig } from './config/resolve.js';
const MUSIC=resolveConfig(settings, 'music', CONFIG_CONTRACTS.music);

/** Original, quiet 16-bar score. All notes belong to C major / A minor. */
export const MUSIC_TEMPO = MUSIC.transport.tempo;
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
    const at = time + (pos % 2 ? eighth * MUSIC.score.swing : 0);
    if (pos === 0 || pos === 8) {
      // Slow, overlapping voicings with a softer second chord and rolled attack.
      keys.forEach((note, i) => this._key(note, at + i * MUSIC.score.chordRollSeconds, eighth * MUSIC.score.chordDurationEighths, pos === 0 ? MUSIC.score.chordGain : MUSIC.score.answerChordGain));
      this._tone(bass, at, eighth * MUSIC.score.bassDurationEighths, MUSIC.score.bassGain, 'bass');
    }
    if (pos === 6 || (pos === 14 && phrase % 2 === 0)) {
      this._tone(bass + (pos === 6 ? 7 : 0), at, eighth * MUSIC.score.bassFillDurationEighths, MUSIC.score.bassFillGain, 'bass');
    }
    // Two-bar call/answer shapes, with whole phrases left open for field sounds.
    const motif = phrase === 0 || phrase === 4 ? [5, 11] : phrase % 2 ? [3, 10, 13] : [];
    const index = motif.indexOf(pos);
    if (index !== -1) this._tone(melody[index], at, eighth * MUSIC.score.melodyDurationEighths, MUSIC.score.melodyGain, 'melody');
    if (pos === 0 || pos === 8 || (pos === 7 && phrase % 2 === 1)) {
      this._tone(40, at, MUSIC.score.kickDurationSeconds, pos === 7 ? MUSIC.score.pickupKickGain : MUSIC.score.kickGain, 'kick');
    }
    // Rounded low taps replace hats/snare noise: no crackle or short noise bursts.
    if (pos === 4 || pos === 12) this._tone(50, at + MUSIC.score.tapDelaySeconds, MUSIC.score.tapDurationSeconds, MUSIC.score.tapGain, 'tap');
    if (pos === 11 && phrase % 2 === 1) this._tone(55, at, MUSIC.score.answerTapDurationSeconds, MUSIC.score.answerTapGain, 'tap');
  }

  _key(midi, time, duration, volume) {
    this._tone(midi, time, duration, volume, 'keys');
    // A quiet, shorter second partial adds electric-piano warmth to the sine body.
    this._tone(midi + 12, time, duration * MUSIC.score.keyPartialDurationScale, volume * MUSIC.score.keyPartialGainScale, 'keys');
  }

  _tone(midi, time, duration, volume, voice) {
    if (this.disposed || this.active.size >= MUSIC.voices.maxActive) return;
    const context = this.context, oscillator = context.createOscillator();
    const envelope = context.createGain(), release = context.createGain(), filter = context.createBiquadFilter();
    release.gain.value = 1;
    const frequency = 440 * 2 ** ((midi - 69) / 12);
    const attack = voice === 'bass' ? MUSIC.voices.bassAttackSeconds : voice === 'kick' || voice === 'tap' ? MUSIC.voices.percussionAttackSeconds : voice === 'melody' ? MUSIC.voices.melodyAttackSeconds : MUSIC.voices.keysAttackSeconds;
    oscillator.type = voice === 'melody' ? 'triangle' : 'sine';
    oscillator.frequency.setValueAtTime(frequency, time);
    if (voice === 'kick' || voice === 'tap') oscillator.frequency.exponentialRampToValueAtTime(voice === 'kick' ? 48 : frequency * .82, time + .16);
    // Tiny, slow pitch drift; never consume gameplay or ambient random sequences.
    if (voice === 'keys' || voice === 'melody') oscillator.frequency.setTargetAtTime(frequency * (1 + Math.sin(time * .63 + midi) * .0012), time + attack, .45);
    filter.type = 'lowpass';
    filter.frequency.value = voice === 'melody' ? MUSIC.voices.melodyLowpassHz : voice === 'keys' ? MUSIC.voices.keysLowpassHz : MUSIC.voices.bassLowpassHz;
    filter.Q.value = .45;
    envelope.gain.setValueAtTime(0, time);
    envelope.gain.linearRampToValueAtTime(volume, time + attack);
    envelope.gain.exponentialRampToValueAtTime(.0001, time + duration);
    envelope.gain.linearRampToValueAtTime(0, time + duration + MUSIC.voices.releaseSeconds);
    oscillator.connect(filter); filter.connect(envelope); envelope.connect(release); release.connect(this.destination);
    this.active.add(oscillator);
    this.voices.set(oscillator, { envelope, release, filter, time });
    oscillator.onended = () => this._release(oscillator);
    oscillator.start(time);
    oscillator.stop(time + duration + MUSIC.voices.stopPaddingSeconds);
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
      release.gain.setTargetAtTime(0, now, MUSIC.voices.pauseReleaseSeconds);
      try { source.stop(now + MUSIC.voices.pauseStopSeconds); } catch { /* Already ended. */ }
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
