import settings from '../config/kennel.json' with { type: 'json' };
import { progressionLevel } from './progression.js';

export const KENNEL_CATALOG = Object.freeze(settings.dogs.map(Object.freeze));
const catalog = new Map(KENNEL_CATALOG.map((entry) => [entry.id, entry]));
const slotMeadows = settings.slotMeadows;
const slotCount = slotMeadows.length;
const coatModels = new Map(KENNEL_CATALOG.map(({ coat, model }) => [coat, model]));
const validSlot = (number) => Number.isInteger(number) && number >= 1 && number <= slotCount;

function openedSlots(kennel) {
  return validSlot(kennel?.openedSlots) ? kennel.openedSlots : 1;
}

function createDog(id, entry, name, coat) {
  const cleanName = typeof name === 'string' ? name.trim().slice(0, 40).trim() : '';
  return {
    id,
    catalogId: entry.id,
    name: cleanName || entry.name || 'Dog',
    coat: coatModels.get(coat) === entry.model ? coat : entry.coat,
  };
}

export function defaultKennel() {
  return {
    openedSlots: 1,
    dogs: [createDog('pip', catalog.get('pip'))],
    lineup: ['pip', ...Array(slotCount - 1).fill(null)],
  };
}

export function validateKennel(raw) {
  const kennel = defaultKennel();
  if (!raw || typeof raw !== 'object') return kennel;
  kennel.openedSlots = openedSlots(raw);

  const dogs = new Map();
  for (const dog of Array.isArray(raw.dogs) ? raw.dogs : []) {
    const entry = catalog.get(dog?.catalogId);
    const id = dog?.id;
    if (
      !entry ||
      typeof id !== 'string' ||
      !id.trim() ||
      dogs.has(id) ||
      (id === 'pip' && entry.id !== 'pip') ||
      (id === 'buddy' && entry.id !== 'buddy') ||
      (kennel.openedSlots < 2 && entry.id !== 'pip')
    )
      continue;
    dogs.set(id, createDog(id, entry, dog.name, dog.coat));
  }
  if (!dogs.has('pip')) dogs.set('pip', kennel.dogs[0]);
  if (kennel.openedSlots >= 2 && !dogs.has('buddy')) dogs.set('buddy', createDog('buddy', catalog.get('buddy')));
  kennel.dogs = [...dogs.values()];

  if (!Array.isArray(raw.lineup)) {
    if (kennel.openedSlots >= 2) kennel.lineup[1] = 'buddy';
    return kennel;
  }
  const lead = dogs.has(raw.lineup[0]) ? raw.lineup[0] : 'pip';
  kennel.lineup[0] = lead;
  const assigned = new Set([lead]);
  for (let index = 1; index < kennel.openedSlots; index++) {
    const id = raw.lineup[index];
    if (dogs.has(id) && !assigned.has(id)) {
      kennel.lineup[index] = id;
      assigned.add(id);
    }
  }
  return kennel;
}

function priceReason(profile, cost) {
  if (!Number.isSafeInteger(cost) || cost < 0) return 'unpriced';
  if (!Number.isSafeInteger(profile?.points) || profile.points < cost) return 'points';
  return null;
}

/** Omit cost to query campaign eligibility alone. Purchases always require a price. */
export function slotAvailability(profile, slotNumber, cost) {
  const meadow = validSlot(slotNumber) ? slotMeadows[slotNumber - 1] : null;
  const opened = openedSlots(profile?.kennel);
  let reason = null;
  if (meadow === null) reason = 'unknown';
  else if (slotNumber <= opened) reason = 'owned';
  else if (progressionLevel(profile) < meadow) reason = 'locked';
  else if (slotNumber !== opened + 1) reason = 'previous-slot';
  else if (cost !== undefined) reason = priceReason(profile, cost);
  return { available: reason === null, reason, meadow, cost: cost ?? null };
}

export function buyKennelSlot(profile, slotNumber, cost) {
  const status = slotAvailability(profile, slotNumber, cost ?? null);
  if (!status.available) return { ok: false, reason: status.reason };

  const kennel = validateKennel(profile.kennel);
  kennel.openedSlots = slotNumber;
  if (slotNumber === 2) {
    kennel.dogs.push(createDog('buddy', catalog.get('buddy')));
    kennel.lineup[1] = 'buddy';
  }
  Object.assign(profile, { points: profile.points - cost, kennel });
  return { ok: true };
}

export function adoptionAvailability(profile, catalogId) {
  const entry = catalog.get(catalogId);
  const meadow = entry?.meadow ?? null;
  const cost = entry?.cost ?? null;
  let reason = null;
  if (!entry) reason = 'unknown';
  else if (progressionLevel(profile) < meadow || openedSlots(profile?.kennel) < 2) reason = 'locked';
  else reason = priceReason(profile, cost);
  return { available: reason === null, reason, meadow, cost };
}

export function adoptKennelDog(profile, catalogId, name, coat) {
  const status = adoptionAvailability(profile, catalogId);
  if (!status.available) return { ok: false, reason: status.reason };

  const kennel = validateKennel(profile.kennel);
  let sequence = kennel.dogs.length;
  const ids = new Set(kennel.dogs.map((dog) => dog.id));
  while (ids.has(`adoption-${sequence}`)) sequence++;
  const dog = createDog(`adoption-${sequence}`, catalog.get(catalogId), name, coat);
  kennel.dogs.push(dog);
  Object.assign(profile, { points: profile.points - status.cost, kennel });
  return { ok: true, dog };
}

export function assignKennelDog(profile, slotNumber, dogId) {
  if (!profile || typeof profile !== 'object' || !validSlot(slotNumber) || slotNumber > openedSlots(profile.kennel))
    return { ok: false, reason: 'slot' };

  const kennel = validateKennel(profile.kennel);
  const index = slotNumber - 1;
  if (dogId === null ? index === 0 : !kennel.dogs.some((dog) => dog.id === dogId)) return { ok: false, reason: 'dog' };

  const currentSlot = dogId === null ? -1 : kennel.lineup.indexOf(dogId);
  // Swap already-assigned dogs without leaving the lead slot empty.
  if (currentSlot === 0 && index !== 0 && kennel.lineup[index] === null) return { ok: false, reason: 'lead' };
  if (currentSlot >= 0) kennel.lineup[currentSlot] = kennel.lineup[index];
  kennel.lineup[index] = dogId;
  profile.kennel = kennel;
  return { ok: true };
}
