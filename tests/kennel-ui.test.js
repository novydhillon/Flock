import test from 'node:test';
import assert from 'node:assert/strict';
import { JSDOM } from 'jsdom';
import { defaultProfile } from '../src/progression/profile.js';
import { adoptKennelDog, buyKennelSlot } from '../src/progression/kennel.js';
import { mountKennel } from '../src/ui/kennel-ui.js';

function kennelFixture(profile = defaultProfile()) {
  const { window } = new JSDOM('<main></main>');
  const root = window.document.querySelector('main');
  const changes = [];
  const previews = [];
  mountKennel(root, {
    profile,
    onChange: (changed) => changes.push(structuredClone(changed)),
    mountPreview: (stage, options) => ({
      show: (dogs) => previews.push({ stage, options, dogs }),
      dispose() {},
    }),
  });
  return { window, root, changes, previews };
}

test('kennel defaults to Buddy and keyboard browsing exposes unavailable dogs without changing the profile', () => {
  const { root, window, changes, previews } = kennelFixture();
  const cards = Array.from(root.querySelectorAll('[data-kennel-catalog]'));
  assert.equal(cards.length, 10);
  assert.equal(previews.at(-1).dogs[0].id, 'buddy');
  assert.equal(previews.at(-1).options.solo, true);
  assert.equal(cards[0].textContent, 'Buddy');
  assert.equal(root.querySelector('[data-kennel-dog="buddy"]').getAttribute('aria-pressed'), 'true');
  assert.equal(cards.at(-1).textContent, 'Rosie');
  assert.match(cards.at(-1).getAttribute('aria-label'), /locked/);
  assert.equal(cards.at(-1).querySelector('.kennel-portrait').dataset.coat, 'black-auburn-white');
  assert.equal(root.querySelector('select'), null);
  cards[0].focus();
  cards[0].dispatchEvent(new window.KeyboardEvent('keydown', { key: 'End', bubbles: true }));
  assert.equal(root.ownerDocument.activeElement, cards.at(-1));
  assert.deepEqual(previews.at(-1).dogs, [{ id: 'dog-10', model: 'buddy', coat: 'black-auburn-white' }]);
  assert.equal(cards.at(-1).getAttribute('aria-pressed'), 'true');
  assert.match(root.querySelector('.kennel-adoption-state').textContent, /Meadow 45/);
  assert.equal(root.querySelector('form').hidden, true);
  assert.deepEqual(changes, []);
});

test('Pip shows the meadow-three gate and can be adopted once for bones before buying a slot', () => {
  const locked = kennelFixture({ ...defaultProfile(), highestLevel: 1 }).root;
  locked.querySelector('[data-kennel-offer="pip"]').click();
  assert.match(locked.querySelector('.kennel-adoption-state').textContent, /Meadow 3/);
  assert.equal(locked.querySelector('form').hidden, true);

  const profile = { ...defaultProfile(), highestLevel: 2, points: 100 };
  const { root, changes } = kennelFixture(profile);
  root.querySelector('[data-kennel-offer="pip"]').click();
  const price = root.querySelector('.dog-preview .kennel-adoption-price');
  assert.equal(price.hidden, false);
  assert.equal(price.getAttribute('aria-label'), 'Adoption price: 100 bones');
  assert.ok(price.querySelector('.currency-bone'));
  assert.equal(root.querySelectorAll('.kennel-training-row').length, 4);
  assert.equal(root.querySelector('[data-kennel-train]'), null);
  root.querySelector('.kennel-adopt').click();
  assert.equal(profile.points, 0);
  assert.equal(profile.kennel.openedSlots, 1);
  assert.equal(root.querySelector('[data-kennel-offer="pip"]'), null);
  assert.equal(price.hidden, true);
  assert.equal(root.querySelectorAll('.kennel-training-row:first-child .is-base').length, 2);
  assert.equal(root.querySelector('[data-kennel-dog="pip"]').getAttribute('aria-pressed'), 'true');
  assert.equal(changes.length, 1);
});

test('legacy Pip saves show how Buddy joins without a standalone purchase', () => {
  const profile = {
    ...defaultProfile(),
    highestLevel: 19,
    points: 600,
    kennel: { dogs: [{ id: 'pip', catalogId: 'pip' }], lineup: ['pip'] },
  };
  const { root, changes } = kennelFixture(profile);
  root.querySelector('[data-kennel-catalog="buddy"]').click();
  assert.match(root.querySelector('.kennel-adoption-state').textContent, /second crew position.*Meadow 20/);
  assert.equal(root.querySelector('form').hidden, true);
  assert.equal(root.querySelectorAll('.kennel-training-row').length, 4);
  assert.equal(root.querySelector('[data-kennel-train]'), null);
  assert.equal(root.querySelector('[data-kennel-buy-slot], [data-kennel-assign-slot], [data-kennel-apply-slot]'), null);
  assert.deepEqual(changes, []);
});

test('the roster selects individual copies with their own coats and upgrades', () => {
  const profile = { ...defaultProfile(), highestLevel: 59, points: 3000 };
  buyKennelSlot(profile, 2);
  const { root, changes, previews } = kennelFixture(profile);
  const offer = () => root.querySelector('[data-kennel-offer="dog-3"]');
  const form = root.querySelector('form');
  const name = form.querySelector('input');
  const adopt = form.querySelector('[type="submit"]');
  offer().click();
  assert.equal(offer().textContent, 'Daisy');
  name.value = '<em>Fern</em>';
  form.querySelector('[aria-label="Auburn and white"]').click();
  assert.equal(previews.at(-1).dogs[0].coat, 'auburn-white');
  adopt.click();
  offer().click();
  assert.equal(previews.at(-1).dogs[0].coat, 'blonde-white');
  name.value = '<em>Fern</em>';
  adopt.click();
  assert.equal(profile.points, 1200);
  assert.equal(root.querySelector('.kennel-catalog em'), null);

  const [first, second] = profile.kennel.dogs.filter((dog) => dog.catalogId === 'dog-3');
  const card = (dog) => root.querySelector(`[data-kennel-dog="${dog.id}"]`);
  assert.equal(card(second).getAttribute('aria-pressed'), 'true');
  assert.equal(card(first).querySelector('.kennel-portrait').dataset.coat, 'auburn-white');
  assert.notEqual(card(first).textContent, card(second).textContent);
  card(first).click();
  assert.equal(form.hidden, true);
  assert.equal(previews.at(-1).dogs[0].coat, 'auburn-white');
  const purchase = root.querySelector('[data-kennel-train="influence"]');
  purchase.click();
  purchase.click();
  assert.equal(profile.points, 1080);
  assert.equal(profile.kennel.dogs.find((dog) => dog.id === first.id).training.influence, 1);
  assert.equal(profile.kennel.dogs.find((dog) => dog.id === second.id).training.influence, 0);
  assert.equal(card(first).getAttribute('aria-pressed'), 'true');
  assert.match(root.querySelector('[role="status"]').textContent, /Influence, 1 upgrade/);
  assert.deepEqual(changes.at(-1), profile);
  assert.equal(changes.length, 3);
});

test('training fills each paw and hides its price at max, with greyed out prices for gated upgrades', () => {
  const influence = (root) => root.querySelector('[data-kennel-train="influence"]');
  const gated = influence(kennelFixture().root);
  assert.equal(gated.disabled, true);
  assert.match(gated.getAttribute('aria-label'), /Reach meadow 7/);
  gated.parentElement.querySelector('.kennel-training-info').click();
  const tip = gated.parentElement.parentElement.querySelector('.kennel-stat-tip');
  assert.equal(tip.hidden, false);
  assert.match(tip.textContent, /Reach meadow 7/);
  gated.parentElement.querySelector('.kennel-training-info').click();
  assert.equal(tip.hidden, true);
  const profile = { ...defaultProfile(), highestLevel: 19, points: 119 };
  const unaffordable = influence(kennelFixture(profile).root);
  assert.equal(unaffordable.disabled, true);
  assert.match(unaffordable.getAttribute('aria-label'), /Need 1 more bone/);
  profile.points = 560;
  const { root } = kennelFixture(profile);
  const row = () => root.querySelector('[aria-label^="Influence,"]').parentElement;
  assert.equal(row().querySelectorAll('.kennel-paw').length, 4);
  assert.equal(row().querySelectorAll('.is-trained').length, 0);
  for (let level = 1; level <= 3; level++) {
    influence(root).click();
    assert.equal(row().querySelectorAll('.is-trained').length, level);
  }
  assert.equal(influence(root), null);
  assert.equal(profile.points, 0);
  assert.doesNotMatch(root.textContent, /Tier|Owned dog|Individual training|Black and white/);
});

test('same-name and same-coat dogs from different catalog entries have distinct roster cards', () => {
  const profile = { ...defaultProfile(), points: 3000, highestLevel: 59 };
  buyKennelSlot(profile, 2);
  const { dog: first } = adoptKennelDog(profile, 'dog-3', 'Fern', 'auburn-white');
  const { dog: second } = adoptKennelDog(profile, 'dog-5', 'Fern', 'auburn-white');
  const { root } = kennelFixture(profile);
  const card = (dog) => root.querySelector(`[data-kennel-dog="${dog.id}"]`);
  assert.equal(card(first).querySelector('.kennel-card-number').textContent, '1');
  assert.equal(card(second).querySelector('.kennel-card-number').textContent, '2');
  assert.notEqual(card(first).getAttribute('aria-label'), card(second).getAttribute('aria-label'));
});
