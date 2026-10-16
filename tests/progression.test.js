import test from 'node:test';
import assert from 'node:assert/strict';
import { UPGRADE_CATALOG, upgradeLevel, upgradeCost, purchaseUpgrade, validateUpgrades, upgradeEffects, upgradeAvailability, activeUpgrades, nextUnlockLevel } from '../src/progression.js';

const richProfile = highestLevel => ({ points: 10000, upgrades: {}, highestLevel, completedLevels: [] });

test('explicit test level gates every tier while preserving affordability and campaign progress', () => {
  for (const item of UPGRADE_CATALOG) for (let tier = 0; tier < item.costs.length; tier++) {
    const gate = item.unlockLevels[tier], cost = item.costs[tier];
    const profile = { ...richProfile(99), completedLevels:[98], upgrades:{[item.id]:tier}, points:cost };
    const before = structuredClone(profile);
    assert.equal(upgradeAvailability(profile,item.id,gate-1).reason,'locked');
    assert.equal(purchaseUpgrade(profile,item.id,gate-1).reason,'locked');
    assert.deepEqual(profile,before);
    profile.points=cost-1;
    assert.equal(upgradeAvailability(profile,item.id,gate).reason,'points');
    assert.equal(purchaseUpgrade(profile,item.id,gate).reason,'points');
    profile.points=cost;
    assert.equal(upgradeAvailability(profile,item.id,gate).available,true);
    assert.equal(purchaseUpgrade(profile,item.id,gate).level,tier+1);
    assert.equal(profile.points,0);
    assert.equal(profile.highestLevel,99);
    assert.deepEqual(profile.completedLevels,[98]);
  }
});

test('six skills have three progressively priced tiers with distinct unlock pacing', () => {
  assert.equal(UPGRADE_CATALOG.length, 6);
  for (const item of UPGRADE_CATALOG) {
    assert.equal(item.costs.length, 3);
    assert.ok(item.costs.every((cost, index) => cost > 0 && (!index || cost > item.costs[index - 1])));
    assert.equal(item.tierNames.length, 3);
    assert.equal(item.tierDescriptions.length, 3);
    assert.ok(Object.isFrozen(item.costs));
    assert.ok(Object.isFrozen(item.unlockLevels));
    assert.ok(item.unlockLevels.every((level, i) => level > 1 && (!i || level > item.unlockLevels[i - 1])));
  }
  const ordinary = UPGRADE_CATALOG.filter(item => !['drone', 'helper'].includes(item.id));
  assert.deepEqual(ordinary.map(item => item.unlockLevels[0]).sort((a,b) => a-b), [2,4,7,12]);
  assert.ok(ordinary.every(item => item.unlockLevels[2] <= 15));
  const drone = UPGRADE_CATALOG.find(item => item.id === 'drone');
  const buddy = UPGRADE_CATALOG.find(item => item.id === 'helper');
  assert.ok(buddy.costs.every((cost,i) => cost > drone.costs[i]));
});

test('tutorial reward buys Turbo paws on level two and later tiers wait for their gates', () => {
  const profile = { points: 80, upgrades: {}, highestLevel: 1 };
  assert.equal(purchaseUpgrade(profile, 'speed').level, 1);
  assert.equal(profile.points, 0);
  assert.equal(upgradeCost(profile.upgrades, 'speed'), 120);
  assert.equal(nextUnlockLevel(profile.upgrades, 'speed'), 6);
  const before = structuredClone(profile);
  assert.deepEqual(purchaseUpgrade(profile, 'speed'), { ok: false, reason: 'locked', unlockLevel: 6 });
  assert.deepEqual(profile, before);
  profile.highestLevel = 5;
  assert.equal(purchaseUpgrade(profile, 'speed').reason, 'points');
  profile.points += 120;
  assert.equal(purchaseUpgrade(profile, 'speed').level, 2);
  assert.equal(profile.points, 0);
  profile.highestLevel = 10;
  profile.points += 200;
  assert.equal(purchaseUpgrade(profile, 'speed').level, 3);
  assert.equal(upgradeCost(profile.upgrades, 'speed'), null);
  assert.equal(nextUnlockLevel(profile.upgrades, 'speed'), null);
  assert.equal(purchaseUpgrade(profile, 'speed').reason, 'owned');
});

test('drone and Buddy dog unlock at exact one-based levels 10 and 20 without spending while locked', () => {
  for (const [id, gate] of [['drone',10], ['helper',20]]) {
    const profile = richProfile(gate-2);
    const before = structuredClone(profile);
    assert.equal(upgradeAvailability(profile,id).reason, 'locked');
    assert.deepEqual(purchaseUpgrade(profile,id), {ok:false, reason:'locked', unlockLevel:gate});
    assert.deepEqual(profile,before);
    assert.equal(upgradeAvailability(gate-1,id).available,false);
    assert.equal(upgradeAvailability(gate,id).available,true);
    profile.highestLevel = gate-1;
    assert.equal(purchaseUpgrade(profile,id).level,1);
    assert.equal(profile.points,before.points-UPGRADE_CATALOG.find(item=>item.id===id).cost);
  }
});

test('every upgrade tier enforces its own gate and fully owned upgrades cap at three', () => {
  for (const item of UPGRADE_CATALOG) {
    const profile = richProfile(0);
    for (let tier=1; tier<=3; tier++) {
      const gate=item.unlockLevels[tier-1];
      profile.highestLevel=gate-2;
      const before=structuredClone(profile);
      assert.equal(purchaseUpgrade(profile,item.id).reason,'locked');
      assert.deepEqual(profile,before);
      profile.highestLevel=gate-1;
      const purchase=purchaseUpgrade(profile,item.id);
      assert.equal(purchase.level,tier);
      assert.equal(purchase.cost,item.costs[tier-1]);
    }
    const before=structuredClone(profile);
    assert.equal(purchaseUpgrade(profile,item.id).reason,'owned');
    assert.deepEqual(profile,before);
  }
});

test('Buddy dog is affordable by level twenty while full progression remains a longer journey', () => {
  const rewards = levels => Array.from({length:levels},(_,i)=>80+i*25).reduce((sum,value)=>sum+value,0);
  const totalCost=UPGRADE_CATALOG.flatMap(item=>item.costs).reduce((sum,value)=>sum+value,0);
  const earlyCosts=UPGRADE_CATALOG.filter(item=>item.id!=='helper').flatMap(item=>item.costs).reduce((sum,value)=>sum+value,0);
  assert.ok(totalCost>rewards(15));
  assert.ok(earlyCosts+600<=rewards(19),'even a fully equipped shepherd can afford Buddy on reaching level 20');
  assert.ok(totalCost<=rewards(27),'all tiers can be afforded when their final gate opens');
});

test('legacy saves migrate, keep paid ownership, and activate only allowed tiers in the selected level', () => {
  const legacy={speed:true,flock:2,helper:999,drone:true,bark:'3',cohesion:1.5,bogus:3};
  assert.deepEqual(validateUpgrades(legacy),{speed:1,flock:2,helper:3,drone:1});
  const original=structuredClone(legacy);
  assert.deepEqual(activeUpgrades(legacy,1),{});
  assert.equal(upgradeEffects(legacy,8).drone,false);
  assert.equal(upgradeEffects(legacy,8).helper,false);
  assert.equal(upgradeEffects(legacy,10).drone,true);
  assert.equal(upgradeEffects(legacy,19).helper,false);
  assert.equal(upgradeEffects(legacy,20).helperStrength,1);
  assert.equal(upgradeEffects(legacy,24).helperStrength,1.3);
  assert.equal(upgradeEffects(legacy,28).helperStrength,1.58);
  assert.equal(activeUpgrades({drone:3},10).drone,1);
  assert.equal(activeUpgrades({drone:3},14).drone,2);
  assert.equal(activeUpgrades({drone:3},18).drone,3);
  assert.deepEqual(legacy,original);
});

test('completed levels also establish progress and malformed values cannot bypass gates', () => {
  assert.equal(upgradeAvailability({points:500,completedLevels:[8]},'drone').available,true);
  assert.equal(upgradeAvailability({points:1000,completedLevels:[18]},'helper').available,true);
  for (const completedLevels of [[-1], [100], [NaN], ['18'], [Infinity]]) {
    assert.equal(upgradeAvailability({points:1000,completedLevels},'helper').reason,'locked');
  }
  for (const level of [undefined,NaN,Infinity,'20',-1,1.5]) {
    assert.deepEqual(activeUpgrades({drone:3,helper:3},level),{});
  }
});

test('malformed upgrade values cannot create benefits', () => {
  for (const raw of [undefined,null,12,'speed',[],{speed:NaN},{speed:Infinity},{speed:-1}]) {
    assert.equal(upgradeLevel(raw,'speed'),0);
    assert.deepEqual(validateUpgrades(raw),{});
  }
  assert.deepEqual(validateUpgrades(Object.create({speed:3})),{});
  assert.equal(upgradeLevel({unknown:3},'unknown'),0);
  assert.equal(upgradeCost({},'unknown'),null);
  assert.equal(upgradeAvailability(100,'unknown').reason,'unknown');
});

test('invalid balances and unknown purchases never deduct points', () => {
  for (const points of [-1,NaN,Infinity,'100',79]) {
    const profile={points,upgrades:{},highestLevel:1};
    assert.equal(purchaseUpgrade(profile,'speed').reason,'points');
    assert.ok(Object.is(profile.points,points));
    assert.deepEqual(profile.upgrades,{});
    assert.equal(upgradeAvailability(profile,'speed').available,false);
  }
  const profile={points:100,upgrades:null,highestLevel:1};
  assert.equal(purchaseUpgrade(profile,'unknown').reason,'unknown');
  assert.equal(profile.points,100);
  assert.equal(purchaseUpgrade(profile,'speed').ok,true);
  assert.deepEqual(profile.upgrades,{speed:1});
  assert.equal(purchaseUpgrade(null,'speed').reason,'points');
});

test('each permitted tier produces a stronger gameplay effect', () => {
  const fieldById={speed:'speedBoost',flock:'signalBoost',bark:'barkBoost',cohesion:'cohesionBoost',drone:'droneStrength',helper:'helperStrength'};
  for (const item of UPGRADE_CATALOG) {
    let previous=upgradeEffects({},100)[fieldById[item.id]];
    for (let tier=1;tier<=3;tier++) {
      const effect=upgradeEffects({[item.id]:tier},item.unlockLevels[tier-1])[fieldById[item.id]];
      assert.ok(effect>previous,`${item.id} tier ${tier} improves its gameplay stat`);
      previous=effect;
    }
  }
  assert.equal(upgradeEffects({}).drone,false);
  assert.equal(upgradeEffects({}).helper,false);
  assert.deepEqual(upgradeEffects({speed:true},2),upgradeEffects({speed:1},2));
});
