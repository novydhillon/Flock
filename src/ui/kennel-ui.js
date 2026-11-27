import { mountDogPreview } from '../rendering/dog-preview.js';
import { KENNEL_CATALOG, adoptKennelDog, adoptionAvailability, validateKennel } from '../progression/kennel.js';

import { DOG_TRAINING_CATALOG, buyDogTraining, trainingAvailability } from '../progression/dog-training.js';

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

const catalogLabel = (entry) => entry.name ?? coatNames.get(entry.coat);
const boltLabel = (amount) => (amount === 1 ? 'bolt' : 'bolts');
const boltPrice = (amount) => `${amount.toLocaleString()} ${boltLabel(amount)}`;
const boltShortfall = (amount) => `Need ${amount.toLocaleString()} more ${boltLabel(amount)}`;

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
  function button(className, text) {
    const element = node('button', className, text);
    element.type = 'button';
    return element;
  }
  function option(value, text) {
    const element = node('option', '', text);
    element.value = value;
    return element;
  }
  function labeled(text, control) {
    const label = node('label', 'kennel-field');
    label.append(node('span', '', text), control);
    return label;
  }
  let selected = KENNEL_CATALOG[0];
  let previewOwned = true;
  let kennel = validateKennel(profile.kennel);

  const panel = node('div', 'kennel-management');
  const wallet = node('div', 'kennel-wallet');
  const notice = node('div', 'kennel-notice');
  notice.setAttribute('role', 'status');
  const content = node('div', 'kennel-content');
  const detail = node('section', 'kennel-detail');
  const selectedArt = kennelPortrait(doc, selected, 'kennel-portrait-featured');
  const detailHeading = node('div', 'kennel-detail-heading');
  const selectedTitle = node('h3', 'kennel-heading');
  const adoptionState = node('p', 'kennel-adoption-state');
  const headingText = node('div');
  headingText.append(selectedTitle, adoptionState);
  detailHeading.append(selectedArt, headingText);
  const stage = node('div', 'dog-preview dog-preview-solo');
  const subject = node('p', 'dog-preview-subject');
  stage.append(subject);

  const adoption = node('form', 'kennel-adoption');
  const name = node('input');
  name.type = 'text';
  name.name = 'dog-name';
  name.maxLength = 40;
  name.autocomplete = 'off';
  const coat = node('select');
  coat.name = 'dog-coat';
  const adopt = button('kennel-action', 'Adopt');
  adopt.type = 'submit';
  adoption.append(labeled('Name (optional)', name), labeled('Adoption coat', coat), adopt);
  detail.append(detailHeading, stage, adoption);
  const training = node('section', 'kennel-training');
  const dogPicker = node('select', 'kennel-owned');
  const dogField = labeled('Owned dog', dogPicker);
  const dogCoat = node('p', 'kennel-owned-coat');
  const trainingRows = node('div', 'kennel-training-rows');
  training.append(node('h3', 'kennel-heading', 'Individual training'), dogField, dogCoat, trainingRows);
  content.append(detail, training);

  const catalog = node('div', 'kennel-catalog');
  catalog.setAttribute('role', 'group');
  catalog.setAttribute('aria-label', 'Dog catalog');
  const cards = KENNEL_CATALOG.map((entry) => {
    const card = button('kennel-catalog-card', '');
    card.dataset.kennelCatalog = entry.id;
    const status = node('span', 'kennel-card-status');
    card.append(kennelPortrait(doc, entry, ''), node('span', 'kennel-card-label', catalogLabel(entry)), status);
    card.addEventListener('click', () => select(entry));
    catalog.append(card);
    return { card, entry, status };
  });
  panel.append(wallet, notice, content, catalog);
  root.replaceChildren(panel);
  const preview = mountPreview(stage, { solo: true });

  function availabilityText(entry, state) {
    if (entry.id === 'pip') return 'Starter dog';
    if (entry.id === 'buddy')
      return kennel.openedSlots >= 2
        ? 'Included with the second party position'
        : 'Buddy joins when you open the second position at meadow entry, available from meadow 20';
    if (kennel.openedSlots < 2) return `Open the second position at meadow entry and reach meadow ${state.meadow}`;
    if (state.reason === 'locked') return `Reach meadow ${state.meadow}`;
    if (state.reason === 'points') return boltShortfall(state.cost - profile.points);
    return 'Available to adopt';
  }

  function select(entry) {
    if (selected !== entry) {
      name.value = '';
      dogPicker.value = '';
    }
    previewOwned = entry.cost === null;
    selected = entry;
    coat.replaceChildren(
      ...KENNEL_CATALOG.filter((candidate) => candidate.model === entry.model).map((candidate) =>
        option(candidate.coat, coatNames.get(candidate.coat)),
      ),
    );
    coat.value = entry.coat;
    renderCatalog();
    renderSelected();
  }

  function renderCatalog() {
    for (const { card, entry, status } of cards) {
      const count = kennel.dogs.filter((dog) => dog.catalogId === entry.id).length;
      const availability = adoptionAvailability(profile, entry.id);
      card.setAttribute('aria-pressed', String(entry === selected));
      card.classList.toggle('kennel-unavailable', count === 0 && !availability.available);
      status.textContent = count ? `${count} owned` : availabilityText(entry, availability);
    }
  }

  function renderSelected() {
    const availability = adoptionAvailability(profile, selected.id);
    selectedTitle.textContent = catalogLabel(selected);
    adoptionState.textContent = availabilityText(selected, availability);
    adoption.hidden = selected.cost === null;
    name.disabled = coat.disabled = adopt.disabled = !availability.available;
    if (!adoption.hidden) adopt.textContent = `Adopt for ${boltPrice(availability.cost)}`;
    const copies = kennel.dogs.filter((dog) => dog.catalogId === selected.id);
    training.hidden = !copies.length;
    const previousId = dogPicker.value;
    const nameCounts = new Map();
    for (const dog of copies) nameCounts.set(dog.name, (nameCounts.get(dog.name) ?? 0) + 1);
    dogPicker.replaceChildren(
      ...copies.map((dog, i) => option(dog.id, nameCounts.get(dog.name) > 1 ? `${dog.name} (dog ${i + 1})` : dog.name)),
    );
    dogPicker.value = copies.find((dog) => dog.id === previousId)?.id ?? copies[0]?.id ?? '';
    renderTraining();
  }

  function showDog(dog, coatChoice = dog?.coat ?? selected.coat) {
    subject.textContent = `${dog?.name ?? 'Adoption preview'} · ${coatNames.get(coatChoice)}`;
    selectedArt.dataset.coat = coatChoice;
    selectedArt.dataset.model = selected.model;
    preview.show([{ id: dog?.id ?? selected.id, model: selected.model, coat: coatChoice }]);
  }

  function renderTraining() {
    const dog = kennel.dogs.find((dog) => dog.id === dogPicker.value);
    showDog(previewOwned ? dog : null, previewOwned && dog ? dog.coat : coat.value || selected.coat);
    trainingRows.replaceChildren();
    if (!dog) return;
    dogCoat.textContent = coatNames.get(dog.coat);
    for (const skill of DOG_TRAINING_CATALOG) {
      const state = trainingAvailability(profile, dog.id, skill.id);
      const row = node('div', 'kennel-training-row');
      const title = node('strong', '', skill.name);
      const level = node('span', '', `Tier ${state.level} of ${skill.costs.length}`);
      const description = node(
        'span',
        'kennel-training-description',
        state.reason === 'max' ? 'Fully trained' : skill.tierDescriptions[state.level],
      );
      const action = button('kennel-action', state.reason === 'max' ? 'Maximum tier' : `+ ${boltPrice(state.cost)}`);
      action.dataset.kennelTrain = skill.id;
      action.setAttribute('aria-label', `Train ${dog.name} in ${skill.name}, ${action.textContent}`);
      action.disabled = !state.available;
      const reason =
        state.reason === 'locked'
          ? `Reach meadow ${state.meadow}`
          : state.reason === 'points'
            ? boltShortfall(state.cost - profile.points)
            : '';
      const info = node('div', 'kennel-training-info');
      const icon = node('span', 'kennel-training-icon', skill.icon);
      icon.setAttribute('aria-hidden', 'true');
      title.prepend(icon);
      info.append(title, level, description);
      if (reason) info.append(node('span', 'kennel-training-reason', reason));
      action.addEventListener('click', () => {
        if (!buyDogTraining(profile, dog.id, skill.id, state.level).ok) return;
        previewOwned = true;
        commit(`${dog.name} reached tier ${state.level + 1} in ${skill.name}.`);
        const next = trainingRows.querySelector(`[data-kennel-train="${skill.id}"]`);
        (next.disabled ? dogPicker : next).focus({ preventScroll: true });
      });
      row.append(info, action);
      trainingRows.append(row);
    }
  }
  function showOwnedDog() {
    previewOwned = true;
    showDog(kennel.dogs.find((dog) => dog.id === dogPicker.value));
  }
  dogPicker.addEventListener('focus', showOwnedDog);
  dogPicker.addEventListener('change', () => {
    showOwnedDog();
    renderTraining();
  });

  function refresh() {
    wallet.textContent = boltPrice(profile.points);
    renderCatalog();
    renderSelected();
  }

  function commit(message) {
    kennel = validateKennel(profile.kennel);
    refresh();
    notice.textContent = message;
    onChange?.(profile);
  }

  adoption.addEventListener('submit', (event) => {
    event.preventDefault();
    const result = adoptKennelDog(profile, selected.id, name.value, coat.value);
    if (!result.ok) return;
    name.value = '';
    commit(`${result.dog.name} joined your kennel.`);
    dogPicker.value = result.dog.id;
    previewOwned = true;
    renderTraining();
    if (name.disabled) cards.find(({ entry }) => entry === selected).card.focus({ preventScroll: true });
    else name.focus({ preventScroll: true });
  });
  function showAdoptionCoat() {
    previewOwned = false;
    showDog(null, coat.value);
  }
  coat.addEventListener('focus', showAdoptionCoat);
  coat.addEventListener('change', showAdoptionCoat);
  catalog.addEventListener('keydown', (event) => {
    const position = cards.findIndex(({ card }) => card === event.target);
    if (position < 0) return;
    let next;
    switch (event.key) {
      case 'ArrowLeft':
        next = Math.max(0, position - 1);
        break;
      case 'ArrowRight':
        next = Math.min(cards.length - 1, position + 1);
        break;
      case 'Home':
        next = 0;
        break;
      case 'End':
        next = cards.length - 1;
        break;
      default:
        return;
    }
    event.preventDefault();
    select(cards[next].entry);
    cards[next].card.focus();
  });

  select(selected);
  refresh();
  return preview.dispose;
}
