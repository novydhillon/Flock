import assert from 'node:assert/strict';
import test from 'node:test';
import { JSDOM } from 'jsdom';
import { defaultProfile } from '../src/progression/profile.js';
import { adoptKennelDog, buyKennelSlot } from '../src/progression/kennel.js';
import { mountMeadowParty } from '../src/ui/meadow-party.js';

function open(profile) {
  const root = new JSDOM('<main></main>').window.document.querySelector('main');
  const events = [];
  const previews = [];
  const dispose = mountMeadowParty(root, {
    profile,
    onConfirm: (draft) => events.push(draft),
    onCancel: () => events.push('cancel'),
    mountPreview: () => ({ show: (dogs) => previews.push(dogs), dispose: () => previews.push([]) }),
  });
  return {
    root,
    events,
    previews,
    dispose,
    position: (number) => root.querySelector(`[data-party-position="${number}"]`),
    dog: (id) => root.querySelector(`[data-party-dog="${id}"]`),
    clear: () => root.querySelector('.party-clear').click(),
    confirm: () => root.querySelector('.primary').click(),
    cancel: () => root.querySelector('.secondary').click(),
  };
}

test('opening a partner stages the price, Buddy and the lineup together until entering the meadow', () => {
  const profile = {
    ...defaultProfile(),
    highestLevel: 19,
    points: 600,
    kennel: { dogs: [{ id: 'pip', catalogId: 'pip' }], lineup: ['pip'] },
  };
  const original = structuredClone(profile);
  for (const finish of ['cancel', 'confirm']) {
    const ui = open(profile);
    assert.equal(ui.root.querySelector('select'), null);
    assert.equal(ui.dog('pip'), null);
    assert.doesNotMatch(ui.root.textContent, /slot/i);
    assert.match(ui.position(3).textContent, /Meadow 40/);
    assert.equal(ui.position(3).disabled, true);
    assert.deepEqual(
      ui.previews.at(-1).map((dog) => dog.id),
      ['pip'],
    );
    ui.position(2).click();
    assert.deepEqual(
      ui.previews.at(-1).map((dog) => dog.id),
      ['pip', 'buddy'],
    );
    assert.match(ui.position(2).textContent, /Buddy/);
    assert.match(ui.root.querySelector('.party-balance').textContent, /0 bolts/);
    assert.deepEqual(ui.events, []);
    ui[finish]();
    ui.dispose();
    assert.deepEqual(ui.previews.at(-1), []);
    assert.deepEqual(profile, original);
    if (finish === 'cancel') assert.deepEqual(ui.events, ['cancel']);
    else {
      const [draft] = ui.events;
      assert.equal(draft.points, 0);
      assert.deepEqual(draft.kennel.lineup, ['pip', 'buddy', null, null]);
    }
  }
});

test('same-name dogs stay distinct through assignment, swaps, and clearing an optional partner', () => {
  const profile = { ...defaultProfile(), highestLevel: 59, points: 7000 };
  for (const pos of [2, 3, 4]) buyKennelSlot(profile, pos);
  const { dog: first } = adoptKennelDog(profile, 'dog-3', 'Fern');
  const { dog: second } = adoptKennelDog(profile, 'dog-3', 'Fern');
  const ui = open(profile);
  ui.position(3).click();
  assert.equal(ui.dog('buddy').disabled, true);
  assert.notEqual(ui.dog(first.id).textContent, ui.dog(second.id).textContent);
  ui.dog(first.id).click();
  assert.equal(ui.root.ownerDocument.activeElement, ui.position(3));
  ui.position(4).click();
  ui.dog(second.id).click();
  ui.position(1).click();
  assert.equal(ui.root.querySelector('.party-clear'), null);
  ui.dog(first.id).click();
  assert.match(ui.position(3).textContent, /Buddy/);
  ui.position(3).click();
  ui.clear();
  ui.confirm();
  assert.deepEqual(ui.events[0].kennel.lineup, [first.id, null, null, second.id]);
  assert.deepEqual(profile.kennel.lineup, ['buddy', null, null, null]);
});

test('partner opening shows the missing balance and sequential purchase gate', () => {
  const profile = { ...defaultProfile(), highestLevel: 59, points: 599 };
  const ui = open(profile);
  assert.equal(ui.position(2).disabled, true);
  assert.match(ui.position(2).textContent, /Need 1 bolt more/);
  assert.match(ui.position(3).textContent, /Open Partner 1 first/);
  ui.position(2).click();
  ui.confirm();
  assert.deepEqual(ui.events[0], profile);
});
