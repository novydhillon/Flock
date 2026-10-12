/** Tiny happy soundtrack synthesized on device after a user gesture. */
export class MeadowAudio {
  constructor(){this.ctx=null;this.enabled=true;this.interval=null;this.step=0;this.master=null;this.tempo=258;}
  init(){if(this.ctx)return;const A=window.AudioContext||window.webkitAudioContext;if(!A)return;this.ctx=new A();this.master=this.ctx.createGain();this.master.gain.value=.14;this.master.connect(this.ctx.destination);}
  async start(){if(!this.enabled)return;this.init();if(!this.ctx)return;try{await this.ctx.resume();}catch{}if(!this.interval){this.playBeat();this.interval=setInterval(()=>this.playBeat(),this.tempo);}}
  stop(){if(this.interval){clearInterval(this.interval);this.interval=null;}}
  toggle(){this.enabled=!this.enabled;if(this.enabled)this.start();else this.stop();return this.enabled;}
  tone(freq,duration=.18,style='pluck',volume=.12,delay=0){if(!this.ctx||this.ctx.state!=='running'||!this.enabled)return;const t=this.ctx.currentTime+delay;const oscillator=this.ctx.createOscillator(),gain=this.ctx.createGain();oscillator.type=style==='bass'?'sine':style==='bell'?'sine':'triangle';oscillator.frequency.setValueAtTime(freq,t);if(style==='bell') oscillator.frequency.exponentialRampToValueAtTime(freq*.995,t+duration);gain.gain.setValueAtTime(.0001,t);gain.gain.exponentialRampToValueAtTime(volume,t+.01);gain.gain.exponentialRampToValueAtTime(.0001,t+duration);oscillator.connect(gain);gain.connect(this.master);oscillator.start(t);oscillator.stop(t+duration+.02);}
  playBeat(){if(!this.ctx||!this.enabled)return;const notes=[392,440,523.25,587.33,659.25,523.25,440,349.23,392,523.25,587.33,698.46,659.25,587.33,523.25,440];const i=this.step++%32;const idx=i%16;const note=notes[idx]*(i>=16?.5:1);if(i%2===0)this.tone(note,.23,'pluck',.23);if(i%4===0)this.tone([196,174.61,146.83,174.61][Math.floor(i/8)],.42,'bass',.23);if(i%8===6)this.tone(notes[idx]*2,.14,'bell',.11);}
  whistle(){this.start();this.tone(784,.19,'bell',.28);this.tone(1046.5,.25,'bell',.24,.14);this.tone(1318.5,.34,'bell',.22,.28);}
  pickup(){this.tone(659.25,.11,'bell',.25);this.tone(987.77,.18,'bell',.22,.11);}
  completed(){this.start();[523.25,659.25,783.99,1046.5].forEach((n,i)=>this.tone(n,.45,'bell',.26,i*.13));}
  purchase(){[440,587.33,880].forEach((n,i)=>this.tone(n,.25,'bell',.2,i*.08));}
}
