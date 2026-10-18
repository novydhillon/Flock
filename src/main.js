import './style.css';
import './gates.css';
import { createGateControl } from './gates.js';
import '@fontsource/outfit/latin-600.css';
import '@fontsource/outfit/latin-700.css';
import '@fontsource/outfit/latin-900.css';
import '@fontsource/dm-sans/latin-400.css';
import '@fontsource/dm-sans/latin-600.css';
import '@fontsource/dm-sans/latin-700.css';
import { MeadowRenderer } from './render.js';
import { FarmAudio } from './audio.js';
import { createLevel, stepSimulation, stepSavedRoaming, defaultProfile, loadProfile, saveProfile, applyLevelReward, purchaseUpgrade, UPGRADE_CATALOG } from './simulation.js';
import { upgradeLevel, upgradeCost, upgradeAvailability, activeUpgrades } from './progression.js';
import { canOccupy } from './world.js';

const $=id=>document.getElementById(id);
let renderer,level,dog,profile=loadProfile(),mode='intro',previousMode='playing',last=performance.now(),elapsed=0,barkUntil=0,barkCooldown=0,tipStep=0,tipDismissed=false,tipChangedAt=0,tipManual=false,toastTimer,modalFocus=null;
const audio=new FarmAudio(),input={x:0,z:0},keys=new Set();
const gateControl=createGateControl({document,getState:()=>({level,dog,playing:mode==='playing'}),onOpen:()=>toast('Gate open — guide the flock through.')});
const visible=(id,show)=>$(id).classList.toggle('hidden',!show);
let qaSession=false;
const persist=()=>{if(qaSession)return;if(!saveProfile(profile))toast('Progress is kept for this session; browser storage is unavailable.');};
const escape=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
function toast(message){$('toast').textContent=message;visible('toast',true);clearTimeout(toastTimer);toastTimer=setTimeout(()=>visible('toast',false),2800);}
function updateWallet(){
  $('points').textContent=profile.points;$('sound').textContent=profile.music?'♫':'♪';$('sound').setAttribute('aria-label',profile.music?'Mute sound':'Enable sound');$('sound').style.opacity=profile.music?'1':'.55';
  if($('menu-sound')){$('menu-sound').textContent=`Sound: ${profile.music?'On':'Off'}`;$('menu-sound').setAttribute('aria-pressed',String(profile.music));}
}
async function toggleSound(){
  profile.music=!profile.music;audio.setMuted(!profile.music);persist();updateWallet();
  if(profile.music){await audio.start();if(mode!=='playing'||!profile.music)audio.pause();}
}
function updateBark(now){
  const cooldown=now<barkCooldown;$('bark').classList.toggle('cooldown',cooldown);$('bark').disabled=cooldown;
  $('bark').style.setProperty('--bark-progress',String(Math.max(0,Math.min(1,1-(barkCooldown-now)/2100))));
}
function updateCountdown(started=false,remaining=0){
  visible('countdown',started);$('countdown').textContent=started?`${Math.ceil(remaining)}s`:'';
  $('countdown').setAttribute('aria-label',started?`${Math.ceil(remaining)} seconds remaining to deliver the flock`:'Delivery countdown has not started');
  $('countdown').classList.toggle('running',started);$('countdown').classList.toggle('urgent',started&&remaining<=10);
}
function resetInput(){input.x=input.z=0;pointer=null;keys.clear();$('stick').style.transform='translate(0,0)';}
async function begin(index=profile.highestLevel){
  index=Math.max(0,Math.min(99,Math.floor(Number(index)||0)));
  closeModal(false);level=createLevel(index);dog={...level.dog,heading:level.dog.heading??Math.atan2(level.spawn.x-level.dog.x,level.spawn.z-level.dog.z)};elapsed=0;tipStep=0;tipDismissed=false;barkUntil=barkCooldown=0;resetInput();renderer.setLevel(level);mode='playing';document.body.classList.toggle('in-game',true);updateBark(performance.now());
  for(const id of ['intro','scene-tag'])visible(id,false);for(const id of ['mission','controls','map-box'])visible(id,true);
  $('level-name').textContent=`Level ${index+1} · ${{pen:'Sunny Pen',barn:'Home Barn',field:'Clover Field'}[level.target.type]||'Clover Field'}`;visible('objective',true);$('objective').textContent=level.target.type==='pen'?'Everyone into the pen':level.target.type==='barn'?'Bring the flock home':'Over to Clover Field';$('total').textContent=level.animals.length;$('saved').textContent=0;$('progress').style.width='0%';
  updateCountdown();$('mission-score').textContent=`0 / ${level.reward}`;
  tipManual=false;visible('toggle-tip',false);$('toggle-tip').setAttribute('aria-expanded','false');visible('tip',true);setTip(tipsFor(index)[0]);
  audio.setMuted(!profile.music);await audio.start();if(mode!=='playing'||!profile.music)audio.pause();updateWallet();
}
const TIP_CYCLE=14;
function tipsFor(index){return index===0?[
  'Drag to move Pip.',
  'Move behind the flock to guide it.',
  'Double-tap to woof.',
]:[level.routes.length>1?'Choose a trail on the map.':'Gather stragglers before crossing.'];}
function hideTip(){tipDismissed=true;tipManual=false;visible('tip',false);visible('toggle-tip',true);$('toggle-tip').setAttribute('aria-expanded','false');$('toggle-tip').setAttribute('aria-label','Show tips');}
function setTip(text){tipChangedAt=elapsed;$('tip-text').textContent=text;$('tip').querySelector('.tip-number').textContent=`0${tipStep+1}`;}
function bark(){if(mode!=='playing'||performance.now()<barkCooldown)return;barkUntil=performance.now()+650;barkCooldown=performance.now()+2100;updateBark(performance.now());audio.play('bark');renderer.bark();if(navigator.vibrate)navigator.vibrate(20);}
function openModal(html,newMode='paused'){
  previousMode=mode==='playing'?'playing':mode==='complete'?'complete':'intro';mode=newMode;resetInput();audio.pause();if($('modal').classList.contains('hidden'))modalFocus=document.activeElement;$('modal-card').innerHTML=html;visible('modal',true);visible('controls',false);setTimeout(()=>$('modal-card').querySelector('button')?.focus(),30);
}
function closeModal(resume=true){visible('modal',false);if(resume){mode=previousMode;visible('controls',mode==='playing');if(mode==='playing')audio.resume();modalFocus?.focus();}resetInput();}
function menu(){
  if(mode==='reset-confirm'){$('cancel-reset').onclick();return;}
  if(mode==='shop'){$('shop-back').onclick();return;}
  if(mode==='paused'){closeModal();return;}
  if(mode==='complete')return;
  openModal(`<button class="close-modal" id="close" aria-label="Close menu">×</button><div class="eyebrow">A BREATHER IN THE MEADOW</div><h2>${mode==='intro'?'Hello, shepherd.':'Paws for a moment.'}</h2><p>Move behind the flock to push it forward. Circle around stragglers. A woof gives a gentle burst of encouragement.</p><button class="primary" id="resume">${mode==='intro'?'Back to the meadow':'Keep herding'} <span>➜</span></button><button class="secondary" id="upgrades-menu">Visit the workshop · ${profile.points} bolts</button>${mode==='playing'?'<button class="secondary" id="restart">Restart this meadow</button>':''}<button class="secondary" id="menu-sound" aria-pressed="${profile.music}">Sound: ${profile.music?'On':'Off'}</button><button class="secondary danger" id="restart-game-menu">Restart Game</button><div class="eyebrow" style="margin-top:23px">YOUR MEADOWS</div><div class="level-picker">${Array.from({length:Math.min(100,profile.highestLevel+1)},(_,i)=>`<button class="${i===level.index?'current':''}" data-level="${i}" aria-label="Play level ${i+1}">${i+1}</button>`).join('')}</div>`);
  $('close').onclick=()=>closeModal();$('resume').onclick=()=>closeModal();$('menu-sound').onclick=toggleSound;$('upgrades-menu').onclick=shop;$('restart-game-menu').onclick=confirmRestart;if($('restart'))$('restart').onclick=()=>begin(level.index);$('modal-card').querySelectorAll('[data-level]').forEach(b=>b.onclick=()=>begin(Number(b.dataset.level)));
}
function confirmRestart(){
  const returnMode=mode,returnPrevious=previousMode;
  const cancel=()=>{
    mode=returnMode;previousMode=returnPrevious;
    if(returnMode==='paused'){mode=returnPrevious;menu();$('restart-game-menu').focus();}
    else{closeModal(false);modalFocus?.focus();}
  };
  openModal(`<button class="close-modal" id="close" aria-label="Cancel restart">×</button><div class="eyebrow">A FRESH START</div><h2>Restart the whole game?</h2><p>This clears all level progress, earned bolts, and purchased upgrades and helpers. You’ll start again at level 1. This cannot be undone.</p><button class="secondary" id="cancel-reset">Keep my progress</button><button class="primary" id="confirm-reset">Restart Game <span>↻</span></button>`,'reset-confirm');
  $('close').onclick=cancel;$('cancel-reset').onclick=cancel;
  $('confirm-reset').onclick=async()=>{
    profile={...defaultProfile(),music:profile.music};lastReward=0;lastTap=-Infinity;lastTapPosition=null;
    persist();updateWallet();await begin(0);if(mode==='playing')$('pause').focus();
  };
}
function shop(){
  const returnMode=mode==='complete'?'complete':mode==='paused'||mode==='shop'?previousMode:mode;
  const shopLevel=qaSession?level.index+1:undefined;
  const active=activeUpgrades(profile.upgrades,level.index+1);
  openModal(`<button class="close-modal" id="close" aria-label="Close workshop">×</button><div class="eyebrow">PIP’S LITTLE WORKSHOP</div><h2>A few clever upgrades.</h2><p>New skills open as you explore.<br>You have <strong>${profile.points} bolts</strong> to spend.</p><div class="upgrade-grid">${UPGRADE_CATALOG.filter(u=>u.id!=='drone').map(u=>{const tier=upgradeLevel(profile.upgrades,u.id),activeTier=upgradeLevel(active,u.id),status=upgradeAvailability(profile,u.id,shopLevel),cost=upgradeCost(profile.upgrades,u.id),locked=status.reason==='locked';const description=locked?`Next tier unlocks at level ${status.unlockLevel}`:cost===null?'All tiers owned':u.tierDescriptions[tier];const inactive=tier>activeTier?`<small class="inactive-upgrade">${activeTier?'Next owned tier activates':'Equipped'} from level ${u.unlockLevels[activeTier]}</small>`:'';return `<article class="upgrade ${locked?'locked':''}"><div class="upgrade-icon">${{speed:'ϟ',flock:'⌁',drone:'✥',helper:'♧',bark:'♪',cohesion:'❋'}[u.id]}</div><div><h3>${escape(u.name)} <small style="font-size:9px;color:#839277">${tier}/3</small></h3><p>${escape(description)}</p>${inactive}</div><button data-buy="${u.id}" ${!status.available?'disabled':''}>${cost===null?'Max tier':locked?`Level ${status.unlockLevel}`:`${cost} ✦`}</button></article>`;}).join('')}</div><button class="primary" id="shop-back">${returnMode==='complete'?'Back to your reward':'Back to the meadow'} <span>➜</span></button>`,'shop');
  previousMode=returnMode;
  const back=()=>{if(returnMode==='complete')complete(false);else closeModal();};$('close').onclick=back;$('shop-back').onclick=back;
  $('modal-card').querySelectorAll('[data-buy]').forEach(b=>b.onclick=()=>{const result=purchaseUpgrade(profile,b.dataset.buy,shopLevel);if(result.ok){audio.play('purchase');persist();updateWallet();shop();previousMode=returnMode;toast(`${result.upgrade.tierNames[result.level-1]} equipped!`);}});
}
let lastReward=0;
function complete(award=true){
  if(award){lastReward=applyLevelReward(profile,level);persist();updateWallet();audio.play('completed');renderer.celebrate(level.target.x,level.target.z);}
  mode='complete';
  const saved=level.result?.saved??level.animals.filter(a=>a.saved).length,total=level.animals.length,score=level.result?.score??0;
  openModal(`<div class="complete-seal">✦</div><div class="eyebrow">${saved===total?'A GOOD DAY’S HERDING':'DELIVERY TIME IS UP'}</div><h2>${saved===total?'Everyone’s home.':saved>0?'A flock brought home.':'Try this meadow again.'}</h2><p>${saved} / ${total} robots delivered.<br>Score ${score} / ${level.reward} · Best ${profile.bestScores[level.index]||0} / ${level.reward}<br>${Math.floor(elapsed/60)}m ${Math.floor(elapsed%60)}s in the countryside.</p><div class="reward">+${lastReward}<span style="font-size:20px"> ✦</span></div><p>${lastReward?'Bolts earned from your improved delivery score.':'No extra bolts this time. Deliver more robots to improve your best score.'}${saved>0&&saved<total?' The next meadow is open.':''}</p><button class="primary" id="next">${saved===0?'Try again':level.index>=99?'Return to the first meadow':'Next meadow'} <span>➜</span></button><button class="secondary" id="reward-shop">Visit the workshop</button><button class="secondary" id="replay">Roam this meadow again</button>`,'complete');
  $('next').onclick=()=>begin(saved===0?level.index:level.index>=99?0:level.index+1);$('reward-shop').onclick=shop;$('replay').onclick=()=>begin(level.index);
}

// Pointer capture means a single thumb can roam without lifting off the glass.
let pointer=null,origin={x:0,y:0},lastTap=-Infinity,lastTapPosition=null,moved=false;
function pointerStart(e){if(mode!=='playing'||pointer!==null||e.isPrimary===false||e.target.closest('button,header,.map-box,.tip'))return;if(e.target!==$('world')&&!e.target.closest('#joystick'))return;e.preventDefault();pointer=e.pointerId;origin={x:e.clientX,y:e.clientY};moved=false;e.target.setPointerCapture?.(pointer);}
function pointerMove(e){if(e.pointerId!==pointer)return;const dx=e.clientX-origin.x,dy=e.clientY-origin.y,len=Math.hypot(dx,dy),range=42;moved ||= len>9;input.x=dx/Math.max(range,len);input.z=dy/Math.max(range,len);$('stick').style.transform=`translate(${input.x*range}px,${input.z*range}px)`;}
function pointerEnd(e){if(e.pointerId!==pointer)return;e.preventDefault();if(e.type!=='pointercancel'&&!moved){const now=performance.now(),near=lastTapPosition&&Math.hypot(e.clientX-lastTapPosition.x,e.clientY-lastTapPosition.y)<42;if(near&&now-lastTap<330){bark();lastTap=-Infinity;lastTapPosition=null;}else{lastTap=now;lastTapPosition={x:e.clientX,y:e.clientY};}}else{lastTap=-Infinity;lastTapPosition=null;}pointer=null;input.x=input.z=0;$('stick').style.transform='translate(0,0)';}
document.addEventListener('pointerdown',pointerStart,{passive:false});document.addEventListener('pointermove',pointerMove,{passive:false});document.addEventListener('pointerup',pointerEnd,{passive:false});document.addEventListener('pointercancel',pointerEnd,{passive:false});
// Safari can turn a double tap into page zoom even when Pointer Events are
// captured. Block native gestures only on the play surface; menus stay scrollable.
const gameSurface=target=>target===$('world')||Boolean(target.closest('#controls'));
document.addEventListener('touchstart',e=>{if(mode==='playing'&&gameSurface(e.target))e.preventDefault();},{passive:false});
document.addEventListener('touchend',e=>{if(mode==='playing'&&gameSurface(e.target)){e.preventDefault();if(e.target.closest('#bark'))bark();}},{passive:false});
document.addEventListener('gesturestart',e=>{if(mode==='playing')e.preventDefault();},{passive:false});
document.addEventListener('gesturechange',e=>{if(mode==='playing')e.preventDefault();},{passive:false});
document.addEventListener('dblclick',e=>{if(mode==='playing'&&gameSurface(e.target))e.preventDefault();},{passive:false});
document.addEventListener('keydown',e=>{if(mode==='playing'&&['ArrowUp','ArrowDown','ArrowLeft','ArrowRight',' ','w','a','s','d','W','A','S','D'].includes(e.key)&&!e.target.closest('input,textarea,[contenteditable="true"]')&&!(e.key===' '&&e.target.closest('button'))){e.preventDefault();keys.add(e.key.toLowerCase());if(e.key===' ')bark();}if(e.key==='Escape'){e.preventDefault();menu();}if(e.key==='Tab'&&!$('modal').classList.contains('hidden')){const focusable=[...$('modal-card').querySelectorAll('button:not([disabled])')];const first=focusable[0],last=focusable.at(-1);if(e.shiftKey&&document.activeElement===first){e.preventDefault();last.focus();}else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first.focus();}}});
document.addEventListener('keyup',e=>keys.delete(e.key.toLowerCase()));
window.addEventListener('blur',()=>{resetInput();pointer=null;if(mode==='playing')menu();});
document.addEventListener('visibilitychange',()=>{if(document.hidden&&mode==='playing')menu();});
window.addEventListener('resize',()=>renderer?.resize());
$('play').onclick=()=>begin();$('restart-game-main').onclick=confirmRestart;$('bark').onclick=bark;$('pause').onclick=menu;$('home').onclick=e=>{e.preventDefault();menu();};$('wallet').onclick=shop;
$('sound').onclick=toggleSound;
$('dismiss-tip').onclick=hideTip;
$('toggle-tip').onclick=()=>{if(mode!=='playing')return;if(!$('tip').classList.contains('hidden')){hideTip();return;}tipDismissed=false;tipManual=true;tipStep=0;tipChangedAt=elapsed;setTip(tipsFor(level.index)[0]);visible('tip',true);$('toggle-tip').setAttribute('aria-expanded','true');$('toggle-tip').setAttribute('aria-label','Hide tips');};

let mapTick=0,qaFrame;
function frame(now){
  requestAnimationFrame(frame);const dt=Math.min((now-last)/1000,.05);last=now;if(!renderer||!level)return;
  if(mode==='playing'){
    elapsed+=dt;
    const ix=keys.has('arrowright')||keys.has('d')?1:keys.has('arrowleft')||keys.has('a')?-1:input.x;
    const iz=keys.has('arrowdown')||keys.has('s')?1:keys.has('arrowup')||keys.has('w')?-1:input.z;
    const result=stepSimulation(level,dog,{x:ix,z:iz,bark:now<barkUntil},dt,profile.upgrades);
    $('saved').textContent=result.saved;$('progress').style.width=`${result.total?result.saved/result.total*100:0}%`;
    updateCountdown(result.countdownStarted,result.remaining);$('mission-score').textContent=`${result.score} / ${result.possibleScore}`;
    if(elapsed>=4)visible('objective',false);
    for(const event of result.events){if(event.type==='animalSaved')audio.play('saved');else if(event.type==='buddyBark'){audio.play('bark');renderer.bark(event);}}
    updateBark(now);
    if(!tipDismissed){
      const dwell=tipManual||level.index!==0||tipStep>0?TIP_CYCLE:5;
      if(elapsed-tipChangedAt>=dwell){
        const tips=tipsFor(level.index);
        if(tipManual){tipStep=(tipStep+1)%tips.length;setTip(tips[tipStep]);}
        else if(tipStep+1<tips.length){tipStep++;setTip(tips[tipStep]);}
        else hideTip();
      }
    }
    if(result.justCompleted)complete();
  } else if(mode==='complete'&&!document.hidden) stepSavedRoaming(level,dt);
  gateControl.update();
  renderer.update(level,dog,!document.hidden&&(mode==='playing'||mode==='intro'||mode==='complete')?dt:0,mode==='intro');
  if(typeof __FLOCK_QA__!=='undefined'&&__FLOCK_QA__)qaFrame?.();
  const weather=renderer.nature?.weather||level.weather;if(weather){const [icon,label]=({sun:['☀','Clear skies'],wind:['↝','Breezy'],rain:['☂','Light rain'],'heavy-rain':['☂','Heavy rain'],storm:['ϟ','Thunderstorm']})[weather.kind||weather.type||weather]||['☀','Clear skies'];$('weather-status').textContent=icon;$('weather-status').setAttribute('title',label);$('weather-status').setAttribute('aria-label',label);}
  if(mode==='playing')audio.updateAmbience?.(dt,{weather:renderer.nature?.weather||level.weather||'sun',level:level.index+1,time:level.time,dog,animals:level.animals});
  mapTick+=dt;if(mapTick>.1){mapTick=0;renderer.drawMap($('map'),level,dog);}
}
try{
  renderer=new MeadowRenderer($('world'));level=createLevel(0);dog={...level.dog,heading:Math.PI/2};renderer.setLevel(level);updateWallet();visible('loading',false);requestAnimationFrame(frame);
}catch(error){visible('loading',false);visible('error',true);$('error-message').textContent=`This meadow needs WebGL 2. Try Safari, Chrome or Firefox with graphics enabled. ${error.message}`;console.error(error);}

// Vite removes this entire branch and its module from production builds.
if(typeof __FLOCK_QA__!=='undefined'&&__FLOCK_QA__){
  import('./qa.js').then(({installQA})=>{
    const pause=()=>{mode='qa';resetInput();audio.pause();closeModal(false);visible('controls',false);};
    const jump=async index=>{const pending=begin(index);pause();await pending;pause();};
    const qa=installQA({
      getRenderer:()=>renderer,getMode:()=>mode,
      getState:()=>({level,dog,profile,elapsed}),
      enterSession:async()=>{if(!qaSession){qaSession=true;profile=defaultProfile();await jump(0);}},
      pause,isPaused:()=>mode==='qa',
      resume:()=>{if(level.completed){complete(false);return;}mode='playing';resetInput();visible('controls',true);audio.resume();},
      jump,resetSession:async()=>{profile=defaultProfile();lastReward=0;await jump(0);},
      canOccupy,updateWallet
    });
    qaFrame=()=>qa.update();
  });
}
