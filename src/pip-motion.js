// Presentation state only: simulation position, heading and collisions stay authoritative.
const clamp = (value, limit) => Math.max(-limit, Math.min(limit, value));
const radians = Math.PI / 180;
const approach = (from, to, dt, seconds) => from + (to - from) * -Math.expm1(-dt / seconds);
const hoverAt = time => .05 + Math.sin(time * Math.PI * 2 / 2.4) * .04;

export function createPipMotionState() {
  return {time:0, hover:hoverAt(0), headYaw:0, roll:0, pitch:0, turnRate:0, filteredSpeed:0, previous:null};
}

export function updatePipMotion(state, sample, dt) {
  const current = {x:sample.x, z:sample.z, heading:sample.heading ?? Math.PI / 2};
  const speed = Math.hypot(sample.vx || 0, sample.vz || 0);
  if (!state.previous) {
    state.previous = current;
    state.filteredSpeed = speed;
  }
  // Do not consume motion history while paused, including a heading change.
  if (!(dt > 0) || !Number.isFinite(dt)) return state;
  state.time += dt;
  state.hover = hoverAt(state.time);
  if (Math.hypot(current.x-state.previous.x, current.z-state.previous.z) > 3) {
    state.headYaw = state.roll = state.pitch = state.turnRate = 0;
    state.filteredSpeed = speed;
    state.previous = current;
    return state;
  }
  const delta = current.heading - state.previous.heading;
  const turnRate = Math.atan2(Math.sin(delta), Math.cos(delta)) / dt;
  state.turnRate = approach(state.turnRate, turnRate, dt, .12);
  // Curvature (heading change per metre) makes a tight turn bank more steeply.
  const bank = -clamp(state.turnRate / Math.max(1, speed) * Math.min(1, speed) * .28, 20*radians);
  state.roll = approach(state.roll, bank, dt, .2);
  state.headYaw = approach(state.headYaw, clamp(state.turnRate*.2, 30*radians), dt, .09);
  // Differentiate a smoothly measured speed. This preserves acceleration impulses
  // across frame rates instead of clamping a one-frame velocity jump first.
  const nextSpeed = approach(state.filteredSpeed, speed, dt, .18);
  const acceleration = (nextSpeed-state.filteredSpeed) / dt;
  state.filteredSpeed = nextSpeed;
  state.pitch = approach(state.pitch, -clamp(acceleration/6, 1)*10*radians, dt, .22);
  state.previous = current;
  return state;
}
