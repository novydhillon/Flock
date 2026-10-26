import { FarmAudio } from '../src/audio.js';

class Param {
  constructor() { this.value = 0; this.targets = []; this.events = []; }
  setValueAtTime(value, time) { this.value = value; this.events.push(['set', value, time]); }
  linearRampToValueAtTime(value, time) { this.value = value; this.events.push(['linear', value, time]); }
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
export class Context {
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
export class DeferredContext extends Context {
  constructor() { super(); this.pendingResumes = []; }
  resume() {
    return new Promise((resolve) => this.pendingResumes.push(() => {
      if (this.state !== 'closed') this.state = 'running';
      resolve();
    }));
  }
}

export async function withAudio(fn, AudioContext = Context) {
  const originals = { AudioContext: globalThis.AudioContext, setInterval: globalThis.setInterval, clearInterval: globalThis.clearInterval };
  const timers = new Set();
  globalThis.AudioContext = AudioContext;
  globalThis.setInterval = (callback) => { const id = { callback }; timers.add(id); return id; };
  globalThis.clearInterval = (id) => timers.delete(id);
  const audio = new FarmAudio();
  try { await fn(audio, timers); }
  finally { audio.dispose(); Object.assign(globalThis, originals); }
}

