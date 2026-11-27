import {
  KENNEL_CATALOG,
  adoptKennelDog,
  adoptionAvailability,
  assignKennelDog,
  buyKennelSlot,
  slotAvailability,
  validateKennel,
} from '../progression/kennel.js';

const coatNames = new Map([
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

export function mountKennel(root, { profile, onChange }) {
  const doc = root.ownerDocument;
  function node(tag, className = '', text = '') {
    const element = doc.createElement(tag);
    element.className = className;
    element.textContent = text;
    return element;
  }
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
  function portrait(entry, className) {
    const graphic = node('span', `kennel-portrait ${className}`);
    graphic.dataset.coat = entry.coat;
    graphic.dataset.model = entry.model;
    graphic.setAttribute('aria-hidden', 'true');
    const head = node('span', 'kennel-portrait-head');
    head.append(
      node('i', 'kennel-portrait-ear'),
      node('i', 'kennel-portrait-ear'),
      node('i', 'kennel-portrait-muzzle'),
    );
    graphic.append(head);
    return graphic;
  }

  let selected = KENNEL_CATALOG[0];
  let kennel = validateKennel(profile.kennel);

  const panel = node('div', 'kennel-management');
  const wallet = node('div', 'kennel-wallet');
  const notice = node('div', 'kennel-notice');
  notice.setAttribute('role', 'status');
  const content = node('div', 'kennel-content');
  const detail = node('section', 'kennel-detail');
  const selectedArt = portrait(selected, 'kennel-portrait-featured');
  const detailHeading = node('div', 'kennel-detail-heading');
  const selectedTitle = node('h3', 'kennel-heading');
  const adoptionState = node('p', 'kennel-adoption-state');
  const headingText = node('div');
  headingText.append(selectedTitle, adoptionState);
  detailHeading.append(selectedArt, headingText);

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
  adoption.append(labeled('Name (optional)', name), labeled('Coat', coat), adopt);
  const owned = node('ul', 'kennel-owned');
  owned.setAttribute('aria-label', 'Owned dogs of the selected type');
  detail.append(detailHeading, adoption, owned);

  const lineup = node('section', 'kennel-lineup');
  const slots = node('ol', 'kennel-slots');
  const slotRows = kennel.lineup.map((_, index) => {
    const slot = index + 1;
    const row = node('li', 'kennel-slot');
    const title = node('strong', '', slot === 1 ? 'Slot 1 · Player' : `Slot ${slot} · CPU`);
    const controls = node('div', 'kennel-slot-controls');
    row.append(title, controls);
    slots.append(row);
    return controls;
  });
  lineup.append(
    node('h3', 'kennel-heading', 'Meadow lineup'),
    node(
      'p',
      'kennel-slot-status',
      'Saved kennel lineups will take effect when meadow support is added. Slot prices are provisional.',
    ),
    slots,
  );
  content.append(detail, lineup);

  const catalog = node('div', 'kennel-catalog');
  catalog.setAttribute('role', 'group');
  catalog.setAttribute('aria-label', 'Dog catalog');
  const cards = KENNEL_CATALOG.map((entry) => {
    const card = button('kennel-catalog-card', '');
    card.dataset.kennelCatalog = entry.id;
    const status = node('span', 'kennel-card-status');
    card.append(portrait(entry, ''), node('span', 'kennel-card-label', catalogLabel(entry)), status);
    card.addEventListener('click', () => select(entry));
    catalog.append(card);
    return { card, entry, status };
  });
  panel.append(wallet, notice, content, catalog);
  root.replaceChildren(panel);

  function availabilityText(entry, state) {
    if (entry.id === 'pip') return 'Starter dog';
    if (entry.id === 'buddy') return kennel.openedSlots >= 2 ? 'Slot 2 companion' : 'Included with Slot 2 at meadow 20';
    if (kennel.openedSlots < 2) return `Open Slot 2 and reach meadow ${state.meadow}`;
    if (state.reason === 'locked') return `Reach meadow ${state.meadow}`;
    if (state.reason === 'points') return boltShortfall(state.cost - profile.points);
    return 'Available to adopt';
  }

  function select(entry) {
    if (selected !== entry) name.value = '';
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
    selectedArt.dataset.coat = coat.value || selected.coat;
    selectedArt.dataset.model = selected.model;
    adoptionState.textContent = availabilityText(selected, availability);
    adoption.hidden = selected.cost === null;
    name.disabled = coat.disabled = adopt.disabled = !availability.available;
    if (!adoption.hidden) adopt.textContent = `Adopt for ${boltPrice(availability.cost)}`;
    owned.replaceChildren(
      ...kennel.dogs
        .filter((dog) => dog.catalogId === selected.id)
        .map((dog) => {
          const slot = kennel.lineup.indexOf(dog.id) + 1;
          const row = node('li');
          row.append(
            node('strong', '', dog.name),
            node('span', '', `${coatNames.get(dog.coat)} · ${slot ? `Slot ${slot}` : 'Unassigned'}`),
          );
          return row;
        }),
    );
  }

  function renderSlot(controls, slot) {
    const index = slot - 1;
    if (slot <= kennel.openedSlots) {
      const picker = node('select', 'kennel-slot-picker');
      picker.dataset.kennelAssignSlot = String(slot);
      picker.setAttribute('aria-label', `Dog for Slot ${slot}`);
      if (slot > 1) picker.append(option('', 'Empty'));
      const nameCounts = new Map();
      for (const dog of kennel.dogs) nameCounts.set(dog.name, (nameCounts.get(dog.name) ?? 0) + 1);
      for (const [rosterIndex, dog] of kennel.dogs.entries()) {
        const assigned = kennel.lineup.indexOf(dog.id) + 1;
        const label = nameCounts.get(dog.name) > 1 ? `${dog.name} (dog ${rosterIndex + 1})` : dog.name;
        picker.append(option(dog.id, assigned && assigned !== slot ? `${label} · Slot ${assigned}` : label));
      }
      picker.value = kennel.lineup[index] ?? '';
      const apply = button('kennel-action', 'Apply');
      apply.dataset.kennelApplySlot = String(slot);
      apply.setAttribute('aria-label', `Apply Slot ${slot} assignment`);
      apply.disabled = true;
      picker.addEventListener('change', () => {
        apply.disabled = (picker.value || null) === kennel.lineup[index];
      });
      apply.addEventListener('click', () => {
        const id = picker.value || null;
        const result = assignKennelDog(profile, slot, id);
        if (!result.ok) {
          picker.value = kennel.lineup[index] ?? '';
          apply.disabled = true;
          picker.focus({ preventScroll: true });
          notice.textContent =
            result.reason === 'lead' ? 'Choose a replacement lead dog first.' : 'Could not change this slot.';
          return;
        }
        commit(id ? `Slot ${slot} updated.` : `Slot ${slot} cleared.`, slot);
      });
      controls.replaceChildren(picker, apply);
      return;
    }

    const state = slotAvailability(profile, slot);
    const purchase = button('kennel-action', `Open for ${boltPrice(state.cost)}`);
    purchase.dataset.kennelBuySlot = String(slot);
    purchase.setAttribute('aria-label', `Open Slot ${slot} for ${boltPrice(state.cost)}`);
    purchase.disabled = !state.available;
    const explanation =
      state.reason === 'locked'
        ? `Meadow ${state.meadow}`
        : state.reason === 'previous-slot'
          ? `Open Slot ${slot - 1} first`
          : state.reason === 'points'
            ? boltShortfall(state.cost - profile.points)
            : '';
    const status = node(
      'span',
      'kennel-slot-status',
      [explanation, slot === 2 ? 'Includes Buddy' : ''].filter(Boolean).join(' · '),
    );
    purchase.addEventListener('click', () => {
      if (buyKennelSlot(profile, slot).ok)
        commit(slot === 2 ? 'Slot 2 opened. Buddy joined your lineup.' : `Slot ${slot} opened.`, slot);
    });
    controls.replaceChildren(purchase, status);
  }

  function refresh() {
    wallet.textContent = boltPrice(profile.points);
    renderCatalog();
    renderSelected();
    slotRows.forEach((controls, index) => renderSlot(controls, index + 1));
  }

  function commit(message, focusedSlot) {
    kennel = validateKennel(profile.kennel);
    refresh();
    notice.textContent = message;
    if (focusedSlot) slotRows[focusedSlot - 1].querySelector('select').focus({ preventScroll: true });
    onChange?.(profile);
  }

  adoption.addEventListener('submit', (event) => {
    event.preventDefault();
    const result = adoptKennelDog(profile, selected.id, name.value, coat.value);
    if (!result.ok) return;
    name.value = '';
    commit(`${result.dog.name} joined your kennel.`);
    if (name.disabled) cards.find(({ entry }) => entry === selected).card.focus({ preventScroll: true });
    else name.focus({ preventScroll: true });
  });
  coat.addEventListener('change', () => {
    selectedArt.dataset.coat = coat.value;
  });
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
}
