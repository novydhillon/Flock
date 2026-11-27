import { mountDogPreview } from '../rendering/dog-preview.js';
import {
  KENNEL_CATALOG,
  assignKennelDog,
  buyKennelSlot,
  slotAvailability,
  validateKennel,
} from '../progression/kennel.js';
import { coatNames, kennelPortrait } from './kennel-ui.js';

const roleName = (position) => (position === 1 ? 'Player' : `Partner ${position - 1}`);
const bolts = (amount) => `${amount.toLocaleString()} ${amount === 1 ? 'bolt' : 'bolts'}`;

export function mountMeadowParty(root, { profile, onConfirm, onCancel, mountPreview = mountDogPreview }) {
  const draft = structuredClone(profile);
  draft.kennel = validateKennel(draft.kennel);
  const doc = root.ownerDocument;
  const element = (tag, className, text = '') => {
    const item = doc.createElement(tag);
    item.className = className;
    item.textContent = text;
    return item;
  };
  const action = (className, label, handler) => {
    const button = element('button', className, label);
    button.type = 'button';
    button.addEventListener('click', handler);
    return button;
  };
  const panel = element('section', 'meadow-party');
  const stage = element('div', 'dog-preview dog-preview-crew');
  const positions = element('div', 'party-positions');
  positions.setAttribute('role', 'group');
  positions.setAttribute('aria-label', 'Party positions');
  const wallet = element('div', 'party-balance');
  const picker = element('section', 'party-picker');
  const notice = element('div', 'party-notice');
  notice.setAttribute('role', 'status');
  const actions = element('div', 'party-actions');
  actions.append(
    action('secondary', 'Cancel', onCancel),
    action('primary', 'Enter meadow', () => onConfirm(draft)),
  );
  panel.append(stage, positions, wallet, picker, notice, actions);
  root.replaceChildren(panel);
  const preview = mountPreview(stage);
  let selected = null;

  function dogName(dog) {
    const dogs = draft.kennel.dogs;
    const copies = dogs.filter((other) => other.name === dog.name);
    return copies.length > 1 ? `${dog.name} · Dog ${dogs.indexOf(dog) + 1}` : dog.name;
  }

  function portrait(dog) {
    const type = KENNEL_CATALOG.find((entry) => entry.id === dog.catalogId);
    return kennelPortrait(doc, { model: type.model, coat: dog.coat });
  }

  function pickPosition(position) {
    selected = position;
    notice.textContent = '';
    render();
    const current = picker.querySelector('[aria-pressed="true"]');
    (current ?? picker.querySelector('button:not(:disabled)'))?.focus();
  }

  function assignDog(id) {
    if (!assignKennelDog(draft, selected, id).ok) return;
    const position = selected;
    selected = null;
    render();
    positions.children[position - 1].focus();
    notice.textContent = id === null ? `${roleName(position)} cleared.` : `${roleName(position)} updated.`;
  }

  function positionCard(id, index) {
    const position = index + 1;
    const role = roleName(position);
    const open = position <= draft.kennel.openedSlots;
    const card = action('party-position', '', () => {
      if (!open) {
        if (!buyKennelSlot(draft, position).ok) return;
        pickPosition(position);
        notice.textContent = position === 2 ? 'Buddy joined your party.' : `${role} opened.`;
      } else pickPosition(position);
    });
    card.dataset.partyPosition = String(position);
    card.append(element('strong', '', role));
    if (open) {
      const dog = draft.kennel.dogs.find((other) => other.id === id);
      card.setAttribute('aria-pressed', String(selected === position));
      if (dog) card.append(portrait(dog));
      card.append(element('span', '', dog ? dogName(dog) : 'Empty'));
    } else {
      const state = slotAvailability(draft, position);
      card.disabled = !state.available;
      const reason = {
        locked: `Meadow ${state.meadow}`,
        'previous-slot': `Open ${roleName(position - 1)} first`,
        points: `Need ${bolts(Math.max(0, state.cost - draft.points))} more`,
      }[state.reason];
      card.append(element('span', '', `Open for ${bolts(state.cost)}`));
      if (reason) card.append(element('small', '', reason));
      if (position === 2) card.append(element('small', '', 'Includes Buddy'));
    }
    return card;
  }

  function dogCard(dog) {
    const current = draft.kennel.lineup.indexOf(dog.id) + 1;
    const button = action('party-dog', '', () => assignDog(dog.id));
    button.dataset.partyDog = dog.id;
    const blocked = current === 1 && selected > 1 && !draft.kennel.lineup[selected - 1];
    button.disabled = blocked;
    button.setAttribute('aria-pressed', String(current === selected));
    button.append(
      portrait(dog),
      element('strong', '', dogName(dog)),
      element('small', '', coatNames.get(dog.coat)),
      element('small', '', blocked ? 'Choose a new Player first' : current ? roleName(current) : 'Available'),
    );
    return button;
  }

  function render() {
    const kennel = draft.kennel;
    const assigned = kennel.lineup.filter(Boolean).map((id) => {
      const dog = kennel.dogs.find((item) => item.id === id);
      const { model } = KENNEL_CATALOG.find((entry) => entry.id === dog.catalogId);
      return { id, model, coat: dog.coat };
    });
    preview.show(assigned);
    positions.replaceChildren(...kennel.lineup.map(positionCard));
    const cost = profile.points - draft.points;
    wallet.textContent =
      cost > 0 ? `Spend ${bolts(cost)} on entry · ${bolts(draft.points)} left` : `Balance · ${bolts(draft.points)}`;
    picker.replaceChildren();
    picker.hidden = selected === null;
    if (selected === null) return;
    const dogs = element('div', 'party-dogs');
    dogs.append(...kennel.dogs.map(dogCard));
    picker.append(element('h3', '', `Choose a dog for ${roleName(selected)}`), dogs);
    if (selected > 1 && kennel.lineup[selected - 1])
      picker.append(action('party-clear', `Clear ${roleName(selected)}`, () => assignDog(null)));
  }

  render();
  return preview.dispose;
}
