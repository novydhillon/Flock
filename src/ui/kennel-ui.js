import { kennelIcon } from './kennel-icons.js';
import { mountDogPreview } from '../rendering/dog-preview.js';
import { KENNEL_CATALOG, adoptKennelDog, adoptionAvailability, validateKennel } from '../progression/kennel.js';

import {
  DOG_TRAINING_CATALOG,
  buyDogTraining,
  dogStatRange,
  trainingAvailability,
} from '../progression/dog-training.js';

export const coatNames = new Map([
  ['black-white', 'Black and white'],
  ['buddy-original', 'Original Buddy coat'],
  ['blonde-white', 'Blonde and white'],
  ['brown-white', 'Brown and white'],
  ['auburn-white', 'Auburn and white'],
  ['black-blonde', 'Black and blonde'],
  ['black-brown-white', 'Black, brown and white'],
  ['blonde-auburn', 'Blonde and auburn'],
  ['brown-auburn', 'Brown and auburn'],
  ['black-auburn-white', 'Black, auburn and white'],
]);

const boneLabel = (amount) => (amount === 1 ? 'bone' : 'bones');
const bonePrice = (amount) => `${amount.toLocaleString()} ${boneLabel(amount)}`;
const boneShortfall = (amount) => `Need ${amount.toLocaleString()} more ${boneLabel(amount)}`;

function createNode(doc, tag, className = '', text = '') {
  const element = doc.createElement(tag);
  element.className = className;
  element.textContent = text;
  return element;
}
export function kennelPortrait(doc, entry, className = '') {
  const node = (tag, classes) => createNode(doc, tag, classes);
  const graphic = node('span', `kennel-portrait ${className}`);
  graphic.dataset.coat = entry.coat;
  graphic.dataset.model = entry.model;
  graphic.setAttribute('aria-hidden', 'true');
  const head = node('span', 'kennel-portrait-head');
  head.append(node('i', 'kennel-portrait-ear'), node('i', 'kennel-portrait-ear'), node('i', 'kennel-portrait-muzzle'));
  graphic.append(head);
  return graphic;
}

export function mountKennel(root, { profile, onChange, mountPreview = mountDogPreview }) {
  const doc = root.ownerDocument;
  const node = (tag, className, text) => createNode(doc, tag, className, text);
  const icon = (id, classes) => kennelIcon(doc, id, classes);
  function button(className, label) {
    const element = node('button', className);
    element.type = 'button';
    element.setAttribute('aria-label', label);
    return element;
  }

  let kennel = validateKennel(profile.kennel);
  const lead = kennel.dogs.find((dog) => dog.id === kennel.lineup[0]);
  let selection = { entry: KENNEL_CATALOG.find((entry) => entry.id === lead.catalogId), dog: lead };
  let chosenCoat = selection.dog.coat;

  const panel = node('div', 'kennel-management');
  const wallet = node('div', 'kennel-wallet');
  wallet.setAttribute('role', 'img');
  const balance = node('span');
  wallet.append(icon('bone'), balance);
  const notice = node('div', 'kennel-sr-only');
  notice.setAttribute('role', 'status');
  const content = node('div', 'kennel-content');
  const detail = node('section', 'kennel-detail');
  const heading = node('div', 'kennel-detail-heading');
  const selectedArt = kennelPortrait(doc, selection.dog, 'kennel-portrait-featured');
  const selectedTitle = node('h3', 'kennel-heading');
  heading.append(selectedArt, selectedTitle);
  const stage = node('div', 'dog-preview dog-preview-solo');
  const priceBadge = node('div', 'kennel-adoption-price');
  priceBadge.setAttribute('role', 'img');
  const priceAmount = node('span');
  priceBadge.append(icon('bone'), priceAmount);
  stage.append(priceBadge);
  detail.append(heading, stage);

  const actions = node('div', 'kennel-actions');
  const adoptionState = node('p', 'kennel-adoption-state');
  const adoptAnother = button('kennel-action kennel-adopt-another', 'Adopt another dog');
  adoptAnother.append(icon('add'), node('span', '', 'Adopt another'));
  adoptAnother.addEventListener('click', () => choose(selection.entry, null));
  const adoption = node('form', 'kennel-adoption');
  const name = node('input');
  name.type = 'text';
  name.name = 'dog-name';
  name.maxLength = 40;
  name.autocomplete = 'off';
  name.setAttribute('aria-label', 'Name (optional)');
  const coats = node('div', 'kennel-coats');
  coats.setAttribute('role', 'group');
  coats.setAttribute('aria-label', 'Adoption coat');
  const adopt = button('kennel-action kennel-adopt', 'Adopt');
  adopt.type = 'submit';
  adopt.append(icon('add'), node('span', '', 'Adopt'));
  adoption.append(name, coats, adopt);
  const training = node('section', 'kennel-training');
  training.setAttribute('aria-label', 'Training');
  actions.append(adoptionState, adoptAnother, adoption, training);
  content.append(detail, actions);

  const catalog = node('div', 'kennel-catalog');
  catalog.setAttribute('role', 'group');
  catalog.setAttribute('aria-label', 'Dog roster');
  panel.append(wallet, notice, content, catalog);
  root.replaceChildren(panel);
  const preview = mountPreview(stage, { solo: true });

  function currentCard() {
    return catalog.querySelector('[aria-pressed="true"]');
  }

  function choose(entry, dog) {
    selection = { entry, dog };
    chosenCoat = dog?.coat ?? entry.coat;
    name.value = '';
    renderSelection();
    for (const card of catalog.children) {
      const selected = dog ? card.dataset.kennelDog === dog.id : card.dataset.kennelOffer === entry.id;
      card.setAttribute('aria-pressed', String(selected));
    }
  }

  function renderCatalog() {
    catalog.replaceChildren();
    const dogsByName = new Map();
    for (const dog of kennel.dogs) {
      if (!dogsByName.has(dog.name)) dogsByName.set(dog.name, []);
      dogsByName.get(dog.name).push(dog.id);
    }
    for (const entry of KENNEL_CATALOG) {
      const copies = kennel.dogs.filter((dog) => dog.catalogId === entry.id);
      const cards = copies.map((dog) => ({ dog, label: dog.name }));
      if (!copies.length) cards.push({ label: entry.name });
      const availability = adoptionAvailability(profile, entry.id);
      for (const { dog, label } of cards) {
        const locked = !dog && (entry.cost === null || availability.reason === 'locked');
        const matches = dogsByName.get(label);
        const copy = dog && matches.length > 1 ? matches.indexOf(dog.id) + 1 : null;
        const ownedLabel = copy === null ? label : `${label}, dog ${copy}`;
        const card = button('kennel-catalog-card', dog ? ownedLabel : locked ? `${label}, locked` : `Adopt ${label}`);
        card.dataset.kennelCatalog = entry.id;
        if (dog) card.dataset.kennelDog = dog.id;
        else card.dataset.kennelOffer = entry.id;
        const portrait = kennelPortrait(doc, { model: entry.model, coat: dog?.coat ?? entry.coat });
        if (!dog) portrait.append(icon(locked ? 'lock' : 'add', 'kennel-roster-badge'));
        const cardLabel = node('span', 'kennel-card-label');
        cardLabel.append(node('span', 'kennel-card-name', label));
        if (copy !== null) cardLabel.append(node('span', 'kennel-card-number', String(copy)));
        card.append(portrait, cardLabel);
        card.setAttribute(
          'aria-pressed',
          String(dog ? selection.dog?.id === dog.id : !selection.dog && selection.entry === entry),
        );
        card.addEventListener('click', () => choose(entry, dog));
        catalog.append(card);
      }
    }
  }

  function showDog() {
    const { entry, dog } = selection;
    selectedArt.dataset.coat = chosenCoat;
    selectedArt.dataset.model = entry.model;
    preview.show([{ id: dog?.id ?? entry.id, model: entry.model, coat: chosenCoat }]);
  }

  function renderSelection() {
    const { entry, dog } = selection;
    selectedTitle.textContent = dog?.name ?? entry.name;
    showDog();
    priceBadge.hidden = Boolean(dog) || entry.cost === null;
    if (!priceBadge.hidden) {
      priceAmount.textContent = entry.cost.toLocaleString();
      priceBadge.setAttribute('aria-label', `Adoption price: ${bonePrice(entry.cost)}`);
    }
    adoptionState.hidden = true;
    adoption.hidden = true;
    const canAdoptAnother =
      dog && entry.cost !== null && !entry.once && adoptionAvailability(profile, entry.id).reason !== 'locked';
    adoptAnother.hidden = !canAdoptAnother;
    renderTraining();
    if (dog) return;
    const state = adoptionAvailability(profile, entry.id);
    if (entry.id === 'buddy' || state.reason === 'locked') {
      adoptionState.hidden = false;
      adoptionState.textContent =
        entry.id === 'buddy' ? 'Joins with the second crew position · Meadow 20' : `Meadow ${state.meadow}`;
      return;
    }

    adoption.hidden = false;
    name.placeholder = entry.name;
    adopt.disabled = !state.available;
    adopt.setAttribute('aria-label', `Adopt ${entry.name} for ${bonePrice(state.cost)}`);
    adopt.title = adopt.getAttribute('aria-label');
    if (state.reason === 'points') {
      adoptionState.textContent = boneShortfall(state.cost - profile.points);
      adoptionState.hidden = false;
    }
    coats.replaceChildren();
    for (const candidate of KENNEL_CATALOG.filter((candidate) => candidate.model === entry.model)) {
      const swatch = button('kennel-coat', coatNames.get(candidate.coat));
      swatch.setAttribute('aria-pressed', String(chosenCoat === candidate.coat));
      swatch.append(kennelPortrait(doc, candidate));
      swatch.addEventListener('click', () => {
        chosenCoat = candidate.coat;
        for (const other of coats.children) other.setAttribute('aria-pressed', String(other === swatch));
        showDog();
      });
      coats.append(swatch);
    }
  }

  function renderTraining() {
    const { dog, entry } = selection;
    training.replaceChildren();
    const tip = node('p', 'kennel-stat-tip');
    tip.setAttribute('role', 'status');
    tip.id = 'kennel-stat-tip';
    tip.hidden = true;
    let activeHelp;
    for (const skill of DOG_TRAINING_CATALOG) {
      const state = dog
        ? trainingAvailability(profile, dog.id, skill.id)
        : { ...dogStatRange(entry.id, skill.id), level: 0, cost: null };
      const row = node('div', 'kennel-training-row');
      const progress = `${skill.name}, ${state.base} base paws, ${state.level} of ${state.upgrades} upgrades`;
      const currentTier = skill.describe(state.base - 1 + state.level);
      const nextTier = state.cost === null ? null : skill.describe(state.base + state.level);
      const reason =
        state.reason === 'locked'
          ? `Reach meadow ${state.meadow}`
          : state.reason === 'points'
            ? boneShortfall(state.cost - profile.points)
            : '';
      const info = button('kennel-training-info', progress);
      info.setAttribute('aria-controls', tip.id);
      info.setAttribute('aria-expanded', 'false');
      info.title = skill.name;
      info.addEventListener('click', () => {
        const willShow = activeHelp !== info;
        activeHelp?.setAttribute('aria-expanded', 'false');
        activeHelp = willShow ? info : null;
        info.setAttribute('aria-expanded', String(willShow));
        tip.hidden = !willShow;
        tip.textContent = `${skill.name} · ${dog ? reason || nextTier || 'Fully trained' : currentTier}`;
      });
      info.append(icon(skill.id, 'kennel-stat-icon'));
      const meter = node('span', 'kennel-paw-meter');
      for (let tier = 0; tier < state.base; tier++) meter.append(icon('paw', 'kennel-paw is-base'));
      for (let tier = 0; tier < state.upgrades; tier++)
        meter.append(icon('paw', tier < state.level ? 'kennel-paw is-trained' : 'kennel-paw'));
      info.append(meter);
      row.append(info);
      if (dog && state.cost !== null) {
        const label = [`Train ${dog.name} in ${skill.name} for ${bonePrice(state.cost)}`, nextTier, reason]
          .filter(Boolean)
          .join('. ');
        const action = button('kennel-action', label);
        action.title = label;
        action.dataset.kennelTrain = skill.id;
        action.disabled = !state.available;
        action.append(icon('bone'), node('span', '', state.cost.toLocaleString()));
        action.addEventListener('click', () => {
          if (!buyDogTraining(profile, dog.id, skill.id, state.level).ok) return;
          save(`${skill.name}, ${state.level + 1} upgrades`);
          renderTraining();
          const next = training.querySelector(`[data-kennel-train="${skill.id}"]:not(:disabled)`);
          (next ?? currentCard())?.focus({ preventScroll: true });
        });
        row.append(action);
      }
      training.append(row);
    }
    training.append(tip);
  }

  function save(message) {
    balance.textContent = profile.points.toLocaleString();
    wallet.setAttribute('aria-label', bonePrice(profile.points));
    notice.textContent = message;
    onChange?.(profile);
  }

  adoption.addEventListener('submit', (event) => {
    event.preventDefault();
    if (selection.dog) return;
    const { entry } = selection;
    const result = adoptKennelDog(profile, entry.id, name.value, chosenCoat);
    if (!result.ok) return;
    kennel = validateKennel(profile.kennel);
    selection = { entry, dog: result.dog };
    chosenCoat = result.dog.coat;
    save(`${result.dog.name} joined your kennel.`);
    renderCatalog();
    renderSelection();
    currentCard()?.focus();
  });
  catalog.addEventListener('keydown', (event) => {
    const cards = [...catalog.children];
    const position = cards.indexOf(event.target);
    if (position < 0) return;
    const next = { ArrowLeft: position - 1, ArrowRight: position + 1, Home: 0, End: cards.length - 1 }[event.key];
    if (next === undefined) return;
    event.preventDefault();
    const card = cards[Math.max(0, Math.min(cards.length - 1, next))];
    card.click();
    card.focus();
  });

  balance.textContent = profile.points.toLocaleString();
  wallet.setAttribute('aria-label', bonePrice(profile.points));
  renderCatalog();
  renderSelection();
  return preview.dispose;
}
