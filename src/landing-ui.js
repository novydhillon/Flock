import { UPGRADE_CATALOG, upgradeLevel, upgradeAvailability, activeUpgrades } from './progression.js';
import { createLevel } from './simulation.js';
import { canOccupy, hasClearGroundPath, containsTarget } from './world.js';
import { canGrazeAt, grazingFootprint } from './grazing.js';
import { animalRadius } from './animal-size.js';

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

/** Randomness belongs to this decorative scene, never to campaign simulation. */
function showcaseRandom(seed) {
  let state = seed >>> 0;
  return () => {
    state += 0x6d2b79f5;
    let value = Math.imul(state ^ state >>> 15, 1 | state);
    value ^= value + Math.imul(value ^ value >>> 7, 61 | value);
    return ((value ^ value >>> 14) >>> 0) / 4294967296;
  };
}

function grazingSpot(level, point, radius, animal) {
  if (!canOccupy(level, point.x, point.z, radius) || containsTarget(level.target, point, radius)) return false;
  return grazingFootprint({...animal, ...point}).every(foot => canGrazeAt(level, foot));
}

/** A complete generated flock, independent of campaign state and rewards. */
export function createShowcase(profile, seed = Math.floor(Math.random() * 0x100000000)) {
  const random = showcaseRandom(seed);
  const index = 2 + Math.floor(random() * 3);
  const level = createLevel(index, seed);
  const bounds = level.bounds;
  const placed = [];
  for (const animal of level.animals) {
    const radius = animalRadius(animal);
    animal.heading = random() * Math.PI * 2;
    let point;
    for (let attempt = 0; attempt < 6000; attempt++) {
      const candidate = {
        x: bounds.minX + 3 + random() * (bounds.maxX - bounds.minX - 6),
        z: bounds.minZ + 3 + random() * (bounds.maxZ - bounds.minZ - 6),
      };
      if (Math.hypot(candidate.x - level.dog.x, candidate.z - level.dog.z) > 6 &&
          grazingSpot(level, candidate, radius, animal) && placed.every(other =>
        Math.hypot(other.x - candidate.x, other.z - candidate.z) > radius + animalRadius(other) + 1.5)) {
        point = candidate;
        break;
      }
    }
    // Exhaustive bounded grid fallback obeys exactly the same placement contract.
    if (!point) {
      for (let x = bounds.minX + 3; x <= bounds.maxX - 3 && !point; x += 2) {
        for (let z = bounds.minZ + 3; z <= bounds.maxZ - 3; z += 2) {
          const candidate = {x, z};
          if (Math.hypot(x - level.dog.x, z - level.dog.z) > 6 && grazingSpot(level, candidate, radius, animal) &&
              placed.every(other => Math.hypot(other.x-x, other.z-z) > radius + animalRadius(other) + 1.5)) {
            point = candidate;
            break;
          }
        }
      }
    }
    if (!point) throw new Error('Could not find safe grazing space in the showcase meadow.');
    Object.assign(animal, point, {vx: 0, vz: 0, alert: 0, relaxation: 1});
    placed.push(animal);
  }
  const dog = {...level.dog, heading: random() * Math.PI * 2, vx: 0, vz: 0};
  level.showcase = {random, rest: 1 + random() * 2, target: null};
  level.helpers = [];
  if (upgradeLevel(activeUpgrades(profile.upgrades, continuation(profile).index + 1), 'helper')) {
    const point = {x: dog.x, z: dog.z + 2.3};
    if (canOccupy(level, point.x, point.z, .5)) level.helpers.push({type: 'helper', ...point, heading: dog.heading, vx: 0, vz: 0, mode: 'standby'});
  }
  return {level, dog};
}

/** Move only the decorative Pip; grazing livestock never receive herding pressure. */
export function stepShowcase(level, dog, dt) {
  if (!(dt > 0) || !Number.isFinite(dt) || !level.showcase) return;
  const state = level.showcase;
  dog.vx = dog.vz = 0;
  if (state.rest > 0) {
    state.rest = Math.max(0, state.rest - dt);
    return;
  }
  if (!state.target) {
    for (let attempt = 0; attempt < 24; attempt++) {
      const angle = state.random() * Math.PI * 2;
      const distance = 2 + state.random() * 5;
      const target = {x: dog.x + Math.sin(angle) * distance, z: dog.z + Math.cos(angle) * distance};
      if (canOccupy(level, target.x, target.z, .65) && hasClearGroundPath(level, dog, target, .65) &&
          level.animals.every(a => Math.hypot(a.x - target.x, a.z - target.z) > 4)) {
        state.target = target;
        break;
      }
    }
    if (!state.target) {state.rest = 2; return;}
  }
  const dx = state.target.x - dog.x, dz = state.target.z - dog.z;
  const distance = Math.hypot(dx, dz);
  const desired = Math.atan2(dx, dz);
  const turn = Math.atan2(Math.sin(desired - dog.heading), Math.cos(desired - dog.heading));
  dog.heading += Math.max(-dt * .8, Math.min(dt * .8, turn));
  if (Math.abs(turn) > .35) return;
  const step = Math.min(distance, .8 * Math.min(dt, .05));
  const next = {x: dog.x + dx / Math.max(distance, .001) * step, z: dog.z + dz / Math.max(distance, .001) * step};
  if (!canOccupy(level, next.x, next.z, .65) || level.animals.some(a => Math.hypot(a.x - next.x, a.z - next.z) < 3)) {
    state.target = null; state.rest = 2; return;
  }
  dog.vx = (next.x - dog.x) / dt; dog.vz = (next.z - dog.z) / dt;
  Object.assign(dog, next);
  if (distance < .15) {state.target = null; state.rest = 2 + state.random() * 4;}
}
