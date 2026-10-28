import { UPGRADE_CATALOG, upgradeLevel, upgradeAvailability, activeUpgrades } from './progression.js';
import { createLevel } from './simulation.js';
import { canOccupy } from './world.js';

const escape=value=>String(value).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
export const MEADOW_PAGE_SIZE=20;
export function continuation(profile){
  const index=Math.max(0,Math.min(99,Math.floor(Number(profile.highestLevel)||0)));
  const returning=index>0||(profile.completedLevels||[]).length>0;
  return {index,label:returning?`Continue · Level ${index+1}`:'Start herding'};
}
export function meadowPage(profile,page=0){
  const current=continuation(profile).index,completed=new Set(profile.completedLevels||[]);
  page=Math.max(0,Math.min(4,Math.floor(Number(page)||0)));
  return {page,start:page*MEADOW_PAGE_SIZE+1,end:(page+1)*MEADOW_PAGE_SIZE,levels:Array.from({length:MEADOW_PAGE_SIZE},(_,offset)=>{
    const index=page*MEADOW_PAGE_SIZE+offset,locked=index>current;
    return {index,locked,completed:completed.has(index),current:index===current,label:`Level ${index+1}, ${locked?'locked':completed.has(index)?'completed':'unlocked'}${index===current?', campaign continuation':''}`};
  })};
}
export function meadowSelectorHTML(profile,page){
  const data=meadowPage(profile,page);
  return `<p id="meadow-range" role="status" aria-live="polite">Levels ${data.start}–${data.end} of 100</p><div class="meadow-key"><span>✓ Completed</span><span>● Current</span><span>🔒 Locked</span></div><div class="meadow-grid">${data.levels.map(item=>`<button data-level="${item.index}" class="${item.current?'current ':''}${item.completed?'completed':''}" aria-label="${item.label}" ${item.current?'aria-current="step"':''} ${item.locked?'disabled':''}>${item.index+1}<small aria-hidden="true">${item.locked?'🔒':item.completed?'✓':item.current?'●':'·'}</small></button>`).join('')}</div><nav class="meadow-pagination" aria-label="Meadow pages"><button id="meadows-prev" ${data.page===0?'disabled':''}>Previous</button><span>${data.page+1} / 5</span><button id="meadows-next" ${data.page===4?'disabled':''}>Next</button></nav>`;
}
const baseBenefits={speed:'Standard paw motors',flock:'Standard herding range',helper:'No Buddy companion',bark:'Standard bark · one bark before cooldown',cohesion:'Standard regrouping'};
export function workshopUpgrades(profile,levelNumber,qaSession=false){
  const active=activeUpgrades(profile.upgrades,levelNumber);
  return UPGRADE_CATALOG.filter(u=>u.id!=='drone').map(upgrade=>{
    const tier=upgradeLevel(profile.upgrades,upgrade.id),activeTier=upgradeLevel(active,upgrade.id);
    const status=upgradeAvailability(profile,upgrade.id,qaSession?levelNumber:undefined);
    return {upgrade,tier,activeTier,status,current:tier?upgrade.tierDescriptions[tier-1]:baseBenefits[upgrade.id],next:tier<upgrade.maxLevel?upgrade.tierDescriptions[tier]:null,
      inactive:tier>activeTier?`Active here: ${activeTier?upgrade.tierNames[activeTier-1]+': '+upgrade.tierDescriptions[activeTier-1]:baseBenefits[upgrade.id]}. ${upgrade.tierNames[activeTier]} activates from level ${upgrade.unlockLevels[activeTier]}.`:''};
  });
}
export function workshopHTML(profile,levelNumber,qaSession=false){
  return workshopUpgrades(profile,levelNumber,qaSession).map(({upgrade:u,tier,status,current,next,inactive})=>{
    const state=status.reason==='owned'?'All tiers owned':status.reason==='locked'?`Locked · reach level ${status.unlockLevel}`:status.reason==='points'?`Need ${status.cost-profile.points} more bolts`:'Ready to upgrade';
    const preview=['helper','bark'].includes(u.id)?`<div class="upgrade-preview ${u.id}" aria-hidden="true"><i class="preview-dog"></i><i class="preview-ring"></i><i class="preview-sheep"></i></div><button class="preview-button" data-preview="${u.id}" aria-label="Preview ${escape(u.name)}${next?' next tier':' owned tier'} animation">Preview motion</button><small class="preview-caption">Illustration only · ${escape(u.tierNames[Math.min(tier,u.maxLevel-1)])}</small>`:'';
    return `<article class="upgrade-detail ${status.reason||'available'}"><h3>${escape(u.name)} <small>${tier}/${u.maxLevel} owned</small></h3><dl><div><dt>Currently owned${tier?' · '+escape(u.tierNames[tier-1]):''}</dt><dd>${escape(current)}</dd></div><div><dt>${next?'Next · '+escape(u.tierNames[tier]):'Maximum tier'}</dt><dd>${escape(next||'All benefits owned')}</dd></div></dl>${inactive?`<p class="inactive-owned">${escape(inactive)}</p>`:''}${preview}<div class="upgrade-purchase"><p>${status.cost===null?'No further purchase':`${status.cost} bolts · unlocks at level ${status.unlockLevel}`}<strong>${state}</strong></p><button data-buy="${u.id}" ${!status.available?'disabled':''}>${status.cost===null?'Maxed':'Buy tier '+(tier+1)}</button></div></article>`;
  }).join('');
}
/** A separate decorative world: never step delivery, rewards or the campaign timer. */
export function createShowcase(profile){
  const level=createLevel(3);
  level.animals=level.animals.slice(0,8);
  const dog={...level.dog,heading:Math.PI/2};
  level.helpers=[];
  if(upgradeLevel(activeUpgrades(profile.upgrades,continuation(profile).index+1),'helper')){
    const point={x:dog.x,z:dog.z+2.3};
    if(canOccupy(level,point.x,point.z,.5))level.helpers.push({type:'helper',...point,heading:dog.heading,vx:0,vz:0,mode:'standby'});
  }
  return {level,dog};
}
