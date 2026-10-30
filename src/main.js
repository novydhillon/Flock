import { requireWebGL2 } from './loading.js';
import { CONFIG_CONTRACTS } from './config/contracts.js';
import settings from './config/controls.json' with { type: 'json' };
import presentationSettings from './config/presentation.json' with { type: 'json' };
import { resolveConfig } from './config/resolve.js';
const CONTROLS=resolveConfig(settings, 'controls', CONFIG_CONTRACTS.controls);
const PRESENTATION=resolveConfig(presentationSettings, 'presentation', CONFIG_CONTRACTS.presentation);

import './style.css';
import './landing-ui.css';
import { continuation, meadowSelectorHTML, workshopHTML, createShowcase, stepShowcase } from './landing-ui.js';
import '@fontsource/outfit/latin-600.css';
import '@fontsource/outfit/latin-700.css';
import '@fontsource/outfit/latin-900.css';
import '@fontsource/dm-sans/latin-400.css';
import '@fontsource/dm-sans/latin-600.css';
import '@fontsource/dm-sans/latin-700.css';
import { MeadowRenderer } from './render.js';
import { FarmAudio } from './audio.js';
import { createLevel, stepSimulation, stepSavedRoaming } from './simulation.js';
import { defaultProfile, loadProfile, saveProfile, applyLevelReward } from './profile.js';
import { purchaseUpgrade, UPGRADE_CATALOG, upgradeLevel, upgradeCost, upgradeAvailability, activeUpgrades, upgradeEffects } from './progression.js';
import { canOccupy } from './world.js';
import { createBarkState, stepBark, triggerBark, BARK_COOLDOWN } from './bark.js';

const $=id=>document.getElementById(id);
let renderer,level,dog,profile=loadProfile(),mode='intro',previousMode='playing',last=performance.now(),elapsed=0,barkState=createBarkState(),lastTouchBark=-Infinity,tipStep=0,tipDismissed=false,tipChangedAt=0,tipManual=false,toastTimer,modalFocus=null;
const audio=new FarmAudio(),input={x:0,z:0},keys=new Set();
let pageFocused=true, pageWasHidden=document.hidden;
audio.setMuted(!profile.music);audio.setGameplayPaused(true);
function activateMusic(gesture=false){return profile.music&&!document.hidden&&pageFocused?audio.start({gesture}):Promise.resolve(false);}
function activateFromGesture(event){if(document.hidden)return;pageFocused=true;if(!event.target?.closest?.('#sound, #menu-sound'))void activateMusic(true);}
const visible=(id,show)=>$(id).classList.toggle('hidden',!show);
let qaSession=false,campaignProfile=null;
const persist=()=>{if(qaSession)return;if(!saveProfile(profile))toast('Progress is kept for this session; browser storage is unavailable.');};
const escape=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
function toast(message){$('toast').textContent=message;visible('toast',true);clearTimeout(toastTimer);toastTimer=setTimeout(()=>visible('toast',false),CONTROLS.feedback.toastMs);}
function updateWallet(){
  $('play').textContent=continuation(profile).label;
  $('points').textContent=profile.points;$('sound').textContent=profile.music?'♫':'♪';$('sound').setAttribute('aria-label',profile.music?'Mute sound':'Enable sound');$('sound').style.opacity=profile.music?'1':'.55';
  if($('menu-sound')){$('menu-sound').textContent=`Sound: ${profile.music?'On':'Off'}`;$('menu-sound').setAttribute('aria-pressed',String(profile.music));}
}
async function toggleSound(){
  profile.music=!profile.music;audio.setMuted(!profile.music);persist();updateWallet();
  if(profile.music)await activateMusic(true);
}
let barkWasCooling=false,barkReadyUntil=0;
function updateBark(){
  const cooldown=barkState.remaining>0;
  if(barkWasCooling&&!cooldown&&mode==='playing'&&!document.hidden&&pageFocused){barkReadyUntil=elapsed+.8;if($('bark-ready'))$('bark-ready').textContent='Woof ready';}
  barkWasCooling=cooldown;
  $('bark').classList.toggle('ready-accent',!cooldown&&elapsed<barkReadyUntil&&mode==='playing'&&!document.hidden&&pageFocused);
  if(cooldown&&$('bark-ready'))$('bark-ready').textContent='';
  $('bark').classList.toggle('cooldown',cooldown);$('bark').disabled=cooldown;
  $('bark').style.setProperty('--bark-progress',String(Math.max(0,Math.min(1,1-barkState.remaining/BARK_COOLDOWN))));
  $('bark').setAttribute('aria-label',cooldown?'Woof recharging':`Woof · ${barkState.charges} ${barkState.charges===1?'bark':'barks'} ready`);
  $('bark').dataset.charges=String(barkState.charges);
}
function updateCountdown(started=false,remaining=0){
  visible('countdown',started);$('countdown').textContent=started?`${Math.ceil(remaining)}s`:'';
  $('countdown').setAttribute('aria-label',started?`${Math.ceil(remaining)} seconds remaining to deliver the flock`:'Delivery countdown has not started');
  $('countdown').classList.toggle('running',started);$('countdown').classList.toggle('urgent',started&&remaining<=CONTROLS.feedback.urgentCountdownSeconds);
}
function resetInput(){input.x=input.z=0;const capture=pointer;pointer=null;if(capture!==null)releaseMovementCapture(capture);pointerSurface=null;keys.clear();lastTap=-Infinity;lastTapPosition=null;$('stick').style.transform='translate(0,0)';$('joystick').style.left='';$('joystick').style.top='';barkReadyUntil=0;$('bark').classList.toggle('ready-accent',false);if($('bark-ready'))$('bark-ready').textContent='';}
function updateLevelIntroduction(){
  const progress=Math.max(0,Math.min(1,elapsed/PRESENTATION.introduction.durationSeconds));
  const opacity=Math.max(0,Math.min(1,elapsed/PRESENTATION.introduction.fadeInSeconds,(PRESENTATION.introduction.durationSeconds-elapsed)/PRESENTATION.introduction.fadeOutSeconds));
  $('level-introduction').style.opacity=String(opacity);
  $('level-introduction').style.setProperty('--level-scale',String(PRESENTATION.introduction.initialScale+PRESENTATION.introduction.scaleGrowth*(1-(1-progress)**2)));
  visible('level-introduction',mode==='playing'&&elapsed<PRESENTATION.introduction.durationSeconds);
}
async function begin(index=profile.highestLevel){
  index=Math.max(0,Math.min(99,Math.floor(Number(index)||0)));
  closeModal(false);level=createLevel(index);dog={...level.dog,heading:level.dog.heading??Math.atan2(level.spawn.x-level.dog.x,level.spawn.z-level.dog.z)};elapsed=0;tipStep=0;tipDismissed=false;barkState=createBarkState(upgradeEffects(profile.upgrades,index+1).barkCharges);barkWasCooling=false;lastTouchBark=-Infinity;audio.resetLivestock?.(level);resetInput();renderer.setLevel(level);mode='playing';document.body.classList.toggle('in-game',true);updateBark(performance.now());
  for(const id of ['intro','scene-tag'])visible(id,false);for(const id of ['mission','controls','map-box'])visible(id,true);
  $('level-number').textContent=`Level ${index+1}`;updateLevelIntroduction();$('mission').setAttribute('aria-label',`Level ${index+1} · Livestock delivery status`);$('total').textContent=level.animals.length;$('saved').textContent=0;
  updateCountdown();
  tipManual=false;visible('toggle-tip',false);$('toggle-tip').setAttribute('aria-expanded','false');visible('tip',true);setTip(tipsFor(index)[0]);
  audio.setGameplayPaused(false);audio.setMuted(!profile.music);await activateMusic();updateWallet();
}
const TIP_CYCLE=CONTROLS.tips.cycleSeconds;
function tipsFor(index){return index===0?[
  'Drag to move Pip.',
  'Move behind the flock to guide it.',
  'Double-tap to woof.',
]:[level.routes.length>1?'Choose a trail on the map.':'Gather stragglers before crossing.'];}
function hideTip(){tipDismissed=true;tipManual=false;visible('tip',false);visible('toggle-tip',true);$('toggle-tip').setAttribute('aria-expanded','false');$('toggle-tip').setAttribute('aria-label','Show tips');}
function setTip(text){tipChangedAt=elapsed;$('tip-text').textContent=text;$('tip').querySelector('.tip-number').textContent=`0${tipStep+1}`;}
function bark(){
  if(mode!=='playing'||!triggerBark(barkState,upgradeEffects(profile.upgrades,level.index+1).barkCharges))return;
  updateBark();audio.play('bark','pip');renderer.bark();if(navigator.vibrate)navigator.vibrate(CONTROLS.feedback.barkVibrationMs);
}
function openModal(html,newMode='paused'){
  previousMode=mode==='playing'?'playing':mode==='complete'?'complete':'intro';mode=newMode;updateLevelIntroduction();resetInput();audio.setGameplayPaused(true);if($('modal').classList.contains('hidden'))modalFocus=document.activeElement;$('modal-card').innerHTML=html;visible('modal',true);visible('controls',false);setTimeout(()=>$('modal-card').querySelector('button')?.focus(),CONTROLS.feedback.modalFocusDelayMs);
}
function closeModal(resume=true){visible('modal',false);if(resume){mode=previousMode;visible('controls',mode==='playing');audio.setGameplayPaused(mode!=='playing');void activateMusic();modalFocus?.focus();}updateLevelIntroduction();resetInput();}
let meadowBrowsePage;
function chooseMeadow(){
  const returnMode=mode==='paused'?previousMode:mode;
  if(meadowBrowsePage===undefined)meadowBrowsePage=Math.floor(continuation(profile).index/20);
  const draw=(focusId)=>{
    openModal(`<button class="close-modal" id="close" aria-label="Close meadow selector">×</button><div class="eyebrow">YOUR MEADOWS</div><h2>Choose a meadow.</h2><p>Replay a completed meadow, or explore your current one.</p>${meadowSelectorHTML(profile,meadowBrowsePage)}<button class="secondary" id="meadows-back">Back</button>`,'meadows');
    previousMode=returnMode;
    const back=()=>{closeModal();};$('close').onclick=back;$('meadows-back').onclick=back;
    const change=(delta,id)=>{meadowBrowsePage+=delta;draw(id);};
    $('meadows-prev').onclick=()=>change(-1,'meadows-prev');$('meadows-next').onclick=()=>change(1,'meadows-next');
    $('modal-card').querySelectorAll('[data-level]:not([disabled])').forEach(button=>button.onclick=()=>begin(Number(button.dataset.level)));
    if(focusId)setTimeout(()=>{const candidate=$(focusId);(candidate.disabled?$('meadows-back'):candidate).focus();},CONTROLS.feedback.modalFocusDelayMs);
  };
  draw();
}
function menu(){
  if(mode==='reset-confirm'){$('cancel-reset').onclick();return;}
  if(mode==='shop'){$('shop-back').onclick();return;}
  if(mode==='meadows'){$('meadows-back').onclick();return;}
  if(mode==='paused'){closeModal();return;}
  if(mode==='complete')return;
  openModal(`<button class="close-modal" id="close" aria-label="Close menu">×</button><div class="eyebrow">A BREATHER IN THE MEADOW</div><h2>${mode==='intro'?'Hello, shepherd.':'Paws for a moment.'}</h2><p>Move behind the flock to push it forward. Circle around stragglers. A woof gives a gentle burst of encouragement.</p><button class="primary" id="resume">${mode==='intro'?'Back to the meadow':'Keep herding'} <span>→</span></button><button class="secondary" id="upgrades-menu">Visit the workshop · ${profile.points} bolts</button><button class="secondary" id="choose-meadow-menu">Choose meadow</button>${mode==='playing'?'<button class="secondary" id="restart">Restart this meadow</button><button class="secondary" id="quit">Quit to landing page</button>':''}<button class="secondary" id="menu-sound" aria-pressed="${profile.music}">Sound: ${profile.music?'On':'Off'}</button><button class="secondary danger" id="restart-game-menu">Restart whole game</button>`);
  $('close').onclick=()=>closeModal();$('resume').onclick=()=>closeModal();$('menu-sound').onclick=toggleSound;$('upgrades-menu').onclick=shop;$('restart-game-menu').onclick=confirmRestart;$('choose-meadow-menu').onclick=chooseMeadow;if($('restart'))$('restart').onclick=()=>begin(level.index);if($('quit'))$('quit').onclick=quitToLanding;
}
function setupShowcase(){
  ({level,dog}=createShowcase(profile));renderer.setLevel(level);
}
function quitToLanding(){
  // Discard this meadow's transient run; the campaign profile is unchanged.
  closeModal(false);mode=previousMode='intro';resetInput();lastTap=-Infinity;lastTapPosition=null;
  if(qaSession&&campaignProfile){profile=campaignProfile;campaignProfile=null;qaSession=false;}
  barkState=createBarkState();lastTouchBark=-Infinity;audio.resetLivestock?.(null);elapsed=0;tipStep=0;tipDismissed=false;tipManual=false;lastReward=0;
  audio.setGameplayPaused(true);setupShowcase();
  document.body.classList.toggle('in-game',false);
  for(const id of ['mission','controls','map-box','tip','toggle-tip','countdown','level-introduction'])visible(id,false);
  for(const id of ['intro','scene-tag'])visible(id,true);
  updateWallet();audio.setMuted(!profile.music);void activateMusic();$('play').focus();
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
    profile={...defaultProfile(),music:profile.music};meadowBrowsePage=undefined;lastReward=0;lastTap=-Infinity;lastTapPosition=null;
    persist();updateWallet();await begin(0);if(mode==='playing')$('pause').focus();
  };
}
function shop(){
  const returnMode=mode==='complete'?'complete':mode==='paused'||mode==='shop'?previousMode:mode;
  const shopLevel=qaSession?level.index+1:undefined;
  const showcase=returnMode==='intro';
  const displayLevel=showcase?continuation(profile).index+1:level.index+1;
  openModal(`<button class="close-modal" id="close" aria-label="Close workshop">×</button><div class="eyebrow">PIP'S LITTLE WORKSHOP</div><h2>A few clever upgrades.</h2><p>New skills open as you explore.<br>You have <strong>${profile.points} bolts</strong> to spend.${showcase?' Benefits shown for your continuation meadow.':''}</p><div class="upgrade-grid">${workshopHTML(profile,displayLevel,qaSession)}</div><button class="primary" id="shop-back">${returnMode==='complete'?'Back to your reward':'Back to the meadow'} <span>→</span></button>`,'shop');
  previousMode=returnMode;
  const back=()=>{if(returnMode==='complete')complete(false);else {closeModal();if(showcase)setupShowcase();}};$('close').onclick=back;$('shop-back').onclick=back;
  $('modal-card').querySelectorAll('[data-preview]').forEach(button=>button.onclick=()=>{const preview=button.previousElementSibling;preview.classList.remove('preview-playing');void preview.offsetWidth;preview.classList.add('preview-playing');});
  $('modal-card').querySelectorAll('[data-buy]').forEach(button=>button.onclick=()=>{
    const result=purchaseUpgrade(profile,button.dataset.buy,shopLevel);
    if(result.ok){audio.play('purchase');persist();updateWallet();shop();previousMode=returnMode;toast(`${result.upgrade.tierNames[result.level-1]} purchased.`);}
  });
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
function releaseMovementCapture(id){try{pointerSurface?.releasePointerCapture?.(id);}catch{/* Browser may already have cancelled this pointer. */}}
let pointerSurface=null;
let pointer=null,origin={x:0,y:0},lastTap=-Infinity,lastTapPosition=null,moved=false;
function pointerStart(e){activateFromGesture(e);if(mode!=='playing'||pointer!==null||e.isPrimary===false||(e.button!==undefined&&e.button!==0)||e.target.closest('button,header,.map-box,.tip'))return;if(e.target!==$('world')&&!e.target.closest('#joystick'))return;e.preventDefault();pointer=e.pointerId;origin={x:e.clientX,y:e.clientY};moved=false;pointerSurface=e.target;$('joystick').style.left=`${e.clientX}px`;$('joystick').style.top=`${e.clientY}px`;e.target.setPointerCapture?.(pointer);}
function pointerMove(e) {
  if (e.pointerId !== pointer) return;
  const dx = e.clientX - origin.x;
  const dy = e.clientY - origin.y;
  const distance = Math.hypot(dx, dy);
  const { joystickRangePixels: radius, joystickFullSpeedFraction, joystickLogStrength } = CONTROLS.pointer;
  moved ||= distance > CONTROLS.pointer.tapMovementPixels;

  // Shape radial speed only, preserving direction and a finger-tracking thumb.
  // Saturating at 85% leaves the outer 15% at maximum speed in every direction.
  const travel = Math.min(1, distance / (radius * joystickFullSpeedFraction));
  const speed = Math.log1p(joystickLogStrength * travel) / Math.log1p(joystickLogStrength);
  const directionX = distance > 0 ? dx / distance : 0;
  const directionZ = distance > 0 ? dy / distance : 0;
  input.x = directionX * speed;
  input.z = directionZ * speed;
  const thumbDistance = Math.min(radius, distance);
  $('stick').style.transform = `translate(${directionX * thumbDistance}px,${directionZ * thumbDistance}px)`;
}
function pointerEnd(e){if(e.type==='pointerup')activateFromGesture(e);if(e.pointerId!==pointer)return;e.preventDefault();if(e.type==='pointerup'&&!moved){const now=performance.now(),near=lastTapPosition&&Math.hypot(e.clientX-lastTapPosition.x,e.clientY-lastTapPosition.y)<CONTROLS.pointer.doubleTapDistancePixels;if(near&&now-lastTap<CONTROLS.pointer.doubleTapMs){bark();lastTap=-Infinity;lastTapPosition=null;}else{lastTap=now;lastTapPosition={x:e.clientX,y:e.clientY};}}else{lastTap=-Infinity;lastTapPosition=null;}const capture=pointer;pointer=null;releaseMovementCapture(capture);pointerSurface=null;input.x=input.z=0;$('stick').style.transform='translate(0,0)';$('joystick').style.left='';$('joystick').style.top='';}
document.addEventListener('pointerdown',pointerStart,{passive:false});document.addEventListener('pointermove',pointerMove,{passive:false});document.addEventListener('pointerup',pointerEnd,{passive:false});document.addEventListener('pointercancel',pointerEnd,{passive:false});document.addEventListener('lostpointercapture',pointerEnd,{passive:false});
// Safari can turn a double tap into page zoom even when Pointer Events are
// captured. Block native gestures only on the play surface; menus stay scrollable.
const gameSurface=target=>target===$('world')||Boolean(target.closest('#controls'));
document.addEventListener('touchstart',e=>{if(mode==='playing'&&gameSurface(e.target))e.preventDefault();},{passive:false});
document.addEventListener('touchend',e=>{activateFromGesture(e);if(mode==='playing'&&gameSurface(e.target)){e.preventDefault();if(e.target.closest('#bark')){lastTouchBark=performance.now();bark();}}},{passive:false});
document.addEventListener('gesturestart',e=>{if(mode==='playing')e.preventDefault();},{passive:false});
document.addEventListener('gesturechange',e=>{if(mode==='playing')e.preventDefault();},{passive:false});
document.addEventListener('dblclick',e=>{if(mode==='playing'&&gameSurface(e.target))e.preventDefault();},{passive:false});
document.addEventListener('keydown',e=>{activateFromGesture(e);if(mode==='playing'&&['ArrowUp','ArrowDown','ArrowLeft','ArrowRight',' ','w','a','s','d','W','A','S','D'].includes(e.key)&&!e.target.closest('input,textarea,[contenteditable="true"]')&&!(e.key===' '&&e.target.closest('button'))){e.preventDefault();keys.add(e.key.toLowerCase());if(e.key===' '&&!e.repeat)bark();}if(e.key==='Escape'){e.preventDefault();menu();}if(e.key==='Tab'&&!$('modal').classList.contains('hidden')){const focusable=[...$('modal-card').querySelectorAll('button:not([disabled])')];const first=focusable[0],last=focusable.at(-1);if(e.shiftKey&&document.activeElement===first){e.preventDefault();last.focus();}else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first.focus();}}});
document.addEventListener('keyup',e=>keys.delete(e.key.toLowerCase()));
document.addEventListener('click',activateFromGesture,{capture:true});
window.addEventListener('blur',()=>{pageFocused=false;resetInput();pointer=null;if(mode==='playing')menu();audio.pause();});
window.addEventListener('focus',()=>{pageFocused=true;void activateMusic();});
document.addEventListener('visibilitychange',()=>{if(document.hidden){resetInput();pageWasHidden=true;if(mode==='playing')menu();audio.pause();}else{if(pageWasHidden)pageFocused=true;pageWasHidden=false;void activateMusic();}});
window.addEventListener('pagehide',()=>{pageWasHidden=true;pageFocused=false;resetInput();pointer=null;if(mode==='playing')menu();audio.pause();});
window.addEventListener('pageshow',()=>{if(!document.hidden){pageFocused=true;pageWasHidden=false;void activateMusic();}});
window.addEventListener('resize',()=>{resetInput();renderer?.resize();});
$('play').onclick=()=>begin();$('choose-meadow').onclick=chooseMeadow;$('bark').onclick=()=>{if(performance.now()-lastTouchBark>CONTROLS.pointer.compatibilityClickMs)bark();};$('pause').onclick=menu;$('home').onclick=e=>{e.preventDefault();menu();};$('wallet').onclick=shop;
$('sound').onclick=toggleSound;
$('dismiss-tip').onclick=hideTip;
$('toggle-tip').onclick=()=>{if(mode!=='playing')return;if(!$('tip').classList.contains('hidden')){hideTip();return;}tipDismissed=false;tipManual=true;tipStep=0;tipChangedAt=elapsed;setTip(tipsFor(level.index)[0]);visible('tip',true);$('toggle-tip').setAttribute('aria-expanded','true');$('toggle-tip').setAttribute('aria-label','Hide tips');};

let mapTick=0,qaFrame;
function frame(now){
  requestAnimationFrame(frame);const dt=Math.min((now-last)/1000,CONTROLS.frame.maxDeltaSeconds);last=now;if(!renderer||!level)return;
  if(mode==='playing'){
    elapsed+=dt;stepBark(barkState,dt,upgradeEffects(profile.upgrades,level.index+1).barkCharges);
    const ix=keys.has('arrowright')||keys.has('d')?1:keys.has('arrowleft')||keys.has('a')?-1:input.x;
    const iz=keys.has('arrowdown')||keys.has('s')?1:keys.has('arrowup')||keys.has('w')?-1:input.z;
    const result=stepSimulation(level,dog,{x:ix,z:iz,bark:barkState.burstRemaining>0},dt,profile.upgrades);
    $('saved').textContent=result.saved;
    updateCountdown(result.countdownStarted,result.remaining);
    for(const event of result.events){if(event.type==='animalSaved')audio.play('saved');else if(event.type==='buddyBark'){audio.play('bark','buddy');renderer.bark(event);}else if(event.type==='gateToggled')toast(event.open?'Gate open — guide the flock through.':'Gate closed.');else if(event.type==='gateBlocked')toast('Gate is occupied — let everyone clear it first.');}
    updateBark(now);
    if(!tipDismissed){
      const dwell=tipManual||level.index!==0||tipStep>0?TIP_CYCLE:CONTROLS.tips.initialSeconds;
      if(elapsed-tipChangedAt>=dwell){
        const tips=tipsFor(level.index);
        if(tipManual){tipStep=(tipStep+1)%tips.length;setTip(tips[tipStep]);}
        else if(tipStep+1<tips.length){tipStep++;setTip(tips[tipStep]);}
        else hideTip();
      }
    }
    if(result.justCompleted)complete();
  } else if(mode==='complete'&&!document.hidden) stepSavedRoaming(level,dt);
  if(mode==='intro'&&!document.hidden&&pageFocused) stepShowcase(level,dog,dt);
  updateLevelIntroduction();
  renderer.update(level,dog,!document.hidden&&(mode==='playing'||mode==='intro'&&pageFocused||mode==='complete')?dt:0,mode==='intro');
  if(typeof __FLOCK_QA__!=='undefined'&&__FLOCK_QA__)qaFrame?.();
  const weather=renderer.nature?.weather||level.weather;if(weather){const [icon,label]=({sun:['☀','Clear skies'],wind:['↝','Breezy'],rain:['☂','Light rain'],'heavy-rain':['☂','Heavy rain'],storm:['ϟ','Thunderstorm']})[weather.kind||weather.type||weather]||['☀','Clear skies'];$('weather-status').textContent=icon;$('weather-status').setAttribute('title',label);$('weather-status').setAttribute('aria-label',label);}
  if(mode==='playing')audio.updateLivestock?.(dt,{animals:level.animals,listener:dog,level});
  if(mode==='playing')audio.updateAmbience?.(dt,{weather:renderer.nature?.weather||level.weather||'sun',level:level.index+1,time:level.time,dog,animals:level.animals});
  mapTick+=dt;if(mapTick>CONTROLS.frame.mapIntervalSeconds){mapTick=0;renderer.drawMap($('map'),level,dog);}
}
export async function initializeMeadow(loading){
  const paint=()=>new Promise(resolve=>requestAnimationFrame(()=>requestAnimationFrame(resolve)));
  loading.stage('Opening the 3D meadow...');await paint();
  requireWebGL2($('world'));
  renderer=new MeadowRenderer($('world'));
  loading.stage('Preparing Pip and the flock...');await paint();
  setupShowcase();updateWallet();
  loading.stage('Drawing the first meadow view...');await paint();
  renderer.update(level,dog,0,true);renderer.drawMap($('map'),level,dog);
  // Keep input blocked until the first usable frame has painted and reveal finishes.
  await paint();await initializeDevelopmentQA();await loading.ready();
  last=performance.now();requestAnimationFrame(frame);void activateMusic();
}

// Vite removes this entire branch and its module from production builds.
async function initializeDevelopmentQA(){
if(typeof __FLOCK_QA__!=='undefined'&&__FLOCK_QA__){
  return import('./qa.js').then(({installQA})=>{
    const pause=()=>{mode='qa';resetInput();audio.setGameplayPaused(true);closeModal(false);visible('controls',false);};
    const jump=async index=>{const pending=begin(index);pause();await pending;pause();};
    const qa=installQA({
      getRenderer:()=>renderer,getMode:()=>mode,
      getState:()=>({level,dog,profile,elapsed}),
      enterSession:async()=>{if(!qaSession){campaignProfile=profile;qaSession=true;profile=defaultProfile();await jump(0);}},
      pause,isPaused:()=>mode==='qa',
      resume:()=>{if(level.completed){complete(false);return;}mode='playing';resetInput();visible('controls',true);audio.setGameplayPaused(false);void activateMusic();},
      jump,resetSession:async()=>{profile=defaultProfile();lastReward=0;await jump(0);},
      canOccupy,updateWallet
    });
    qaFrame=()=>qa.update();
  });
}
}

