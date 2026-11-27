import test from 'node:test';
import assert from 'node:assert/strict';
import { JSDOM } from 'jsdom';
import { defaultProfile } from '../src/progression/profile.js';
import { mountKennel } from '../src/ui/kennel-ui.js';

function kennelFixture(profile = defaultProfile()) {
  const { window } = new JSDOM('<main></main>');
  const root = window.document.querySelector('main');
  const changes = [];
  mountKennel(root, { profile, onChange: (changed) => changes.push(structuredClone(changed)) });
  return { window, root, changes };
}

test('kennel defaults to Pip and keyboard browsing exposes unavailable dogs without changing the profile', () => {
  const { root, window, changes } = kennelFixture();
  const cards = Array.from(root.querySelectorAll('[data-kennel-catalog]'));
  assert.equal(cards.length, 10);
  assert.equal(cards[0].textContent, 'Pip1 owned');
  assert.equal(cards[0].getAttribute('aria-pressed'), 'true');
  assert.equal(cards.at(-1).classList.contains('kennel-unavailable'), true);
  cards[0].focus();
  cards[0].dispatchEvent(new window.KeyboardEvent('keydown', { key: 'End', bubbles: true }));
  assert.equal(root.ownerDocument.activeElement, cards.at(-1));
  assert.equal(cards.at(-1).getAttribute('aria-pressed'), 'true');
  assert.match(root.querySelector('.kennel-adoption-state').textContent, /Open Slot 2 and reach meadow 60/);
  assert.equal(root.querySelector('form button').disabled, true);
  assert.deepEqual(changes, []);
});

test('slot controls explain gates and affordability and announce a successful Buddy purchase', () => {
  const unavailable = kennelFixture({ ...defaultProfile(), highestLevel: 19, points: 599 });
  const missingBolt = unavailable.root.querySelector('[data-kennel-buy-slot="2"]');
  assert.equal(missingBolt.disabled, true);
  assert.match(missingBolt.parentElement.textContent, /Need 1 more bolt\b/);
  missingBolt.click();
  assert.deepEqual(unavailable.changes, []);

  const profile = { ...defaultProfile(), highestLevel: 19, points: 600 };
  const { root, changes } = kennelFixture(profile);
  const slotTwo = root.querySelector('[data-kennel-buy-slot="2"]');
  assert.equal(slotTwo.disabled, false);
  assert.match(root.querySelector('[data-kennel-buy-slot="3"]').parentElement.textContent, /Meadow 40/);
  slotTwo.click();
  assert.equal(profile.points, 0);
  assert.equal(changes.length, 1);
  const picker = root.querySelector('[data-kennel-assign-slot="2"]');
  assert.equal(picker.value, profile.kennel.dogs.find((dog) => dog.catalogId === 'buddy').id);
  assert.equal(root.ownerDocument.activeElement, picker);
  assert.match(root.querySelector('[role="status"]').textContent, /Buddy joined/);
});

test('adoption preserves distinct names and coats as text and owned copies can be assigned and cleared', () => {
  const profile = { ...defaultProfile(), highestLevel: 24, points: 1_900 };
  const { root, window, changes } = kennelFixture(profile);
  root.querySelector('[data-kennel-buy-slot="2"]').click();
  root.querySelector('[data-kennel-catalog="dog-3"]').click();
  const form = root.querySelector('form');
  const name = form.querySelector('input');
  const coat = form.querySelector('select');
  const adopt = form.querySelector('button');
  name.value = '<em>Fern</em>';
  coat.value = 'auburn-white';
  adopt.click();
  name.value = 'Juniper';
  coat.value = 'blonde-white';
  adopt.click();
  assert.equal(profile.points, 100);
  assert.equal(adopt.disabled, true);
  assert.equal(root.querySelector('.kennel-owned em'), null);
  assert.match(root.querySelector('.kennel-owned').textContent, /<em>Fern<\/em>Auburn and white/);
  const [fern, juniper] = profile.kennel.dogs.filter((dog) => dog.catalogId === 'dog-3');
  assert.notEqual(fern.id, juniper.id);
  assert.equal(fern.coat, 'auburn-white');
  assert.match(root.querySelector('[data-kennel-catalog="dog-3"]').textContent, /2 owned/);

  function selectDog(slot, id) {
    const control = root.querySelector(`[data-kennel-assign-slot="${slot}"]`);
    control.value = id;
    const previous = [...profile.kennel.lineup];
    control.dispatchEvent(new window.Event('change', { bubbles: true }));
    assert.deepEqual(profile.kennel.lineup, previous);
    root.querySelector(`[data-kennel-apply-slot="${slot}"]`).click();
  }
  selectDog(1, fern.id);
  selectDog(2, juniper.id);
  assert.deepEqual(profile.kennel.lineup, [fern.id, juniper.id, null, null]);
  selectDog(2, '');
  assert.deepEqual(profile.kennel.lineup, [fern.id, null, null, null]);
  assert.equal(changes.length, 6);
  assert.deepEqual(changes.at(-1), profile);
});
