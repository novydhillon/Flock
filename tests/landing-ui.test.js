import test from 'node:test';
import assert from 'node:assert/strict';
import { JSDOM } from 'jsdom';
import { continuation, meadowPage, meadowSelectorHTML, workshopUpgrades, workshopHTML, createShowcase, stepShowcase } from '../src/landing-ui.js';
import { defaultProfile, applyLevelReward } from '../src/profile.js';
import { UPGRADE_CATALOG, purchaseUpgrade } from '../src/progression.js';
import { updateGrazing, canGrazeAt } from '../src/grazing.js';
import { canOccupy } from '../src/world.js';

test('landing continuation follows campaign highest unlocked index, including completed campaign and reset',()=>{
  const profile=defaultProfile();assert.deepEqual(continuation(profile),{index:0,label:'Start herding'});
  profile.highestLevel=16;profile.completedLevels=[0,15];assert.deepEqual(continuation(profile),{index:16,label:'Continue · Level 17'});
  profile.highestLevel=99;profile.completedLevels=Array.from({length:100},(_,i)=>i);assert.equal(continuation(profile).label,'Continue · Level 100');
  assert.equal(continuation(defaultProfile()).label,'Start herding');
});
test('selector pages all 100 meadows with completed/current/locked labels and no locked action',()=>{
  const profile={...defaultProfile(),highestLevel:27,completedLevels:[0,4,26]};
  const dom=new JSDOM(meadowSelectorHTML(profile,1)).window.document;
  assert.equal(dom.querySelectorAll('[data-level]').length,20);
  assert.match(dom.querySelector('[data-level="26"]').getAttribute('aria-label'),/completed/);
  assert.equal(dom.querySelector('[data-level="27"]').getAttribute('aria-current'),'step');
  assert.equal(dom.querySelector('[data-level="28"]').disabled,true);
  assert.equal(dom.querySelector('[data-level="27"]').disabled,false);
  assert.equal(meadowPage(profile,4).levels.at(-1).index,99);
  assert.equal(new JSDOM(meadowSelectorHTML(profile,4)).window.document.querySelector('#meadows-next').disabled,true);
  assert.equal(profile.highestLevel,27,'browsing cannot move campaign continuation');
});
test('workshop comparisons use real catalog tiers, prices, locks and affordability',()=>{
  const profile={...defaultProfile(),highestLevel:27,points:0,upgrades:{bark:1,helper:1}};
  const bark=workshopUpgrades(profile,28).find(row=>row.upgrade.id==='bark');
  const definition=UPGRADE_CATALOG.find(u=>u.id==='bark');
  assert.equal(bark.current,definition.tierDescriptions[0]);assert.equal(bark.next,definition.tierDescriptions[1]);assert.equal(bark.status.cost,definition.costs[1]);assert.equal(bark.status.reason,'points');
  profile.points=1000;profile.highestLevel=0;
  const locked=workshopUpgrades(profile,1).find(row=>row.upgrade.id==='bark');assert.equal(locked.status.reason,'locked');assert.equal(locked.activeTier,0);assert.match(locked.inactive,/level 4/);
  const qa=workshopUpgrades({...profile,highestLevel:99},1,true).find(row=>row.upgrade.id==='bark');assert.equal(qa.status.reason,'locked');
  profile.highestLevel=27;profile.upgrades.bark=3;
  const html=new JSDOM(workshopHTML(profile,28)).window.document;
  assert.equal(html.querySelector('[data-buy="bark"]').disabled,true);assert.match(html.querySelector('[data-buy="bark"]').textContent,/Maxed/);
  assert.equal(html.querySelector('[data-buy="drone"]'),null);
});
test('preview markup is inert and real atomic purchasing remains the only profile mutation',()=>{
  const profile={...defaultProfile(),highestLevel:19,points:600},before=JSON.stringify(profile);
  const doc=new JSDOM(workshopHTML(profile,20)).window.document;
  assert.equal(doc.querySelectorAll('[data-preview]').length,2);assert.match(doc.body.textContent,/Illustration only/);assert.equal(JSON.stringify(profile),before);
  assert.equal(purchaseUpgrade(profile,'helper').ok,true);assert.equal(profile.points,0);assert.equal(profile.upgrades.helper,1);
});
test('showcase is a small separate mixed meadow with owned eligible Buddy and no reward/timer changes',()=>{
  const profile={...defaultProfile(),points:100,highestLevel:19,upgrades:{helper:1}},before=JSON.stringify(profile);
  const {level,dog}=createShowcase(profile,1);
  assert.equal(level.animals.length,Math.min(5+level.index*3,65));if(level.index>=3)assert.ok(level.animals.some(a=>a.type==='cow'));assert.ok(level.animals.some(a=>a.type==='sheep'));
  assert.equal(level.helpers.length,1);assert.equal(canOccupy(level,level.helpers[0].x,level.helpers[0].z,.5),true);
  assert.equal(createShowcase(defaultProfile()).level.helpers.length,0);
  assert.equal(createShowcase({...profile,highestLevel:0}).level.helpers.length,0);
  const timer=JSON.stringify(level.delivery),time=level.time;
  for(const animal of level.animals){const pose={userData:{},rotation:{y:0}};for(let i=0;i<600;i++)updateGrazing(pose,animal,level,1/60);assert.equal(animal.saved,false);if(!canGrazeAt(level,animal))assert.equal(pose.userData.graze,0);}
  assert.equal(applyLevelReward(profile,level),0);assert.equal(JSON.stringify(profile),before);assert.equal(JSON.stringify(level.delivery),timer);assert.equal(level.time,time);assert.ok(Number.isFinite(dog.x));
});


test('randomized showcases keep the generated flock and spread grass-safe actors without changing progress', () => {
  const profile = defaultProfile(), before = JSON.stringify(profile);
  const sizes = new Set(), counts = new Set();
  for (let seed = 1; seed <= 200; seed++) {
    const {level} = createShowcase(profile, seed);
    sizes.add(JSON.stringify(level.bounds)); counts.add(level.animals.length);
    assert.equal(level.animals.length, Math.min(5 + level.index * 3, 65));
    const headings = new Set(level.animals.map(a => a.heading));
    assert.equal(headings.size, level.animals.length);
    for (const animal of level.animals) {
      assert.ok(canGrazeAt(level, animal));
      assert.ok(canOccupy(level, animal.x, animal.z, .5));
      assert.equal(animal.saved, false);
      const pose = {userData: {graze: 1, grazeWait: 12, grazeAnchor: {x: animal.x, z: animal.z}}, rotation: {y: animal.heading}};
      updateGrazing(pose, animal, level, 1/60);
      assert.equal(pose.userData.graze, 1, 'the actual muzzle and hoof envelope remains edible');
    }
    const xs = level.animals.map(a => a.x), zs = level.animals.map(a => a.z);
    assert.ok(Math.hypot(Math.max(...xs)-Math.min(...xs),Math.max(...zs)-Math.min(...zs)) > 15);
  }
  assert.ok(sizes.size >= 3); assert.ok(counts.size >= 3);
  assert.equal(JSON.stringify(profile), before);
});

test('resting Pip wanders gently without stepping the flock, delivery, or campaign clocks', () => {
  const profile = defaultProfile(), before = JSON.stringify(profile);
  const {level, dog} = createShowcase(profile, 725);
  const animals = JSON.stringify(level.animals), delivery = JSON.stringify(level.delivery), time = level.time;
  const start = {x: dog.x, z: dog.z}; let traveled = 0;
  for (let i = 0; i < 7200; i++) {
    const previous = {x: dog.x, z: dog.z};
    stepShowcase(level, dog, 1/60);
    const distance = Math.hypot(dog.x-previous.x,dog.z-previous.z);
    assert.ok(distance <= .8/60 + 1e-8);
    assert.ok(canOccupy(level,dog.x,dog.z,.5));
    traveled += distance;
  }
  assert.ok(traveled > 1);
  assert.equal(JSON.stringify(level.animals), animals);
  assert.equal(JSON.stringify(level.delivery), delivery); assert.equal(level.time,time);
  assert.equal(JSON.stringify(profile),before);
  const frozen = {...dog}; stepShowcase(level,dog,0); assert.deepEqual(dog,frozen);
});
