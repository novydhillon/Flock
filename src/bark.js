/** Transient player bark state. Advance with gameplay time so modals freeze it. */
export const BARK_COOLDOWN = 2.1;
export const BARK_DURATION = .65;
const capacityOf = value => value === 2 ? 2 : 1;
export function createBarkState(capacity = 1) {
  return {capacity: capacityOf(capacity), charges: capacityOf(capacity), remaining: 0, burstRemaining: 0};
}
export function stepBark(state, dt, capacity = state.capacity) {
  const next = capacityOf(capacity);
  if (next !== state.capacity) {
    // Changing equipped tiers cannot refill a cooldown or spend an extra charge.
    state.charges = Math.min(next, state.charges + Math.max(0, next - state.capacity));
    state.capacity = next;
  }
  const step = Number.isFinite(dt) ? Math.max(0, dt) : 0;
  state.burstRemaining = Math.max(0, state.burstRemaining - step);
  if (state.remaining > 0) {
    state.remaining = Math.max(0, state.remaining - step);
    if (state.remaining <= 1e-8) { state.remaining = 0; state.charges = next; }
  }
  return state;
}
export function triggerBark(state, capacity = state.capacity) {
  stepBark(state, 0, capacity);
  if (state.remaining > 0 || state.charges <= 0) return false;
  state.charges--;
  state.burstRemaining = BARK_DURATION;
  if (!state.charges) state.remaining = BARK_COOLDOWN;
  return true;
}
