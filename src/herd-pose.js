const clamp = (value, low, high) => Math.max(low, Math.min(high, value));
const pulse = (time, period, duration, phase) => {
  const t = ((time + phase * period) % period + period) % period;
  return t < duration ? Math.sin(Math.PI * t / duration) : 0;
};

// Presentation clocks belong to each animal pose; they neither consume the
// world's random stream nor change an animal's velocity or wander schedule.
export function updateHerdPose(state, animal, dt, heading) {
  if (!(dt > 0) || !Number.isFinite(dt)) return;
  const phase = ((Math.imul((animal.id || 0) + 1, 1597334677) >>> 0) / 4294967296);
  const time = state.herdPoseTime = (state.herdPoseTime || 0) + dt;
  const speed = Math.hypot(animal.vx || 0, animal.vz || 0);
  const threat = (animal.alert || 0) >= .03 || Boolean(animal.wander?.bolting);
  const ordinary=threat?0:clamp(animal.ordinaryAnticipation||0,0,1);
  const active = threat || ordinary>0 || speed > .45 || (state.turnSpeed || 0) > .1;
  const previous = state.herdPose || {};
  const targetHeading = ordinary>0 ? animal.ordinaryAttentionHeading : (threat || (animal.relaxation ?? 1) < 1) && Number.isFinite(animal.attentionHeading) ? animal.attentionHeading : (animal.heading ?? heading);
  const delta = Math.atan2(Math.sin(targetHeading - heading), Math.cos(targetHeading - heading));
  const headYaw = clamp(delta, -.38, .38) * (1 - (state.graze || 0));
  const alert = threat ? 1 : clamp(1 - (animal.relaxation ?? 1), 0, 1);
  const anticipation = threat && !previous.threat ? .32 : Math.max(0, (previous.anticipation || 0) - dt);
  const rest = active ? 0 : clamp(animal.relaxation ?? 1, 0, 1);
  // Independent, short gestures separated by long restful gaps. A threat
  // suppresses the gestures immediately rather than finishing an idle cycle.
  state.herdPose = {
    threat, anticipation: ordinary>0?ordinary*.32:anticipation,
    headYaw: (previous.headYaw || 0) + (headYaw - (previous.headYaw || 0)) * (1 - Math.exp(-dt * 12)),
    headLift: Math.max(alert * .055,ordinary*.055),
    weightShift: ordinary>0?Math.sin(Math.PI*ordinary)*.035:anticipation > 0 ? Math.sin(Math.PI * anticipation / .32) * .035 : 0,
    ear: pulse(time, 6.2 + phase * 3, .42, phase) * .23 * rest,
    tail: pulse(time, 9.5 + phase * 4, 1.4, phase * 1.7) * Math.sin(time * 10 + phase * 17) * (animal.type === 'cow' ? .32 : .22) * rest,
    blink: pulse(time, 4 + phase * 3, .18, phase * 2.3) * .94 * rest,
    chew: (state.graze || 0) * pulse(time, 3 + phase, 1.7, phase * 1.3) * Math.sin(time * 7 + phase * 13) * .014 * rest,
  };
}
