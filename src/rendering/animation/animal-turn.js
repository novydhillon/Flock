// Presentation only: physical movement and steering remain simulation-owned.
export function updateAnimalTurn(pose, animal, dt) {
  if (!(dt > 0) || !Number.isFinite(dt)) return;
  const target = animal.heading ?? Math.PI / 2;
  const delta = Math.atan2(Math.sin(target - pose.rotation.y), Math.cos(target - pose.rotation.y));
  const rate = animal.type === 'cow' ? Math.PI / 1.5 : Math.PI;
  const step = Math.max(-rate * dt, Math.min(rate * dt, delta));
  pose.rotation.y += step;
  pose.userData.turnSpeed = Math.abs(step) / dt;
}

export function animalGaitSpeed(animal, turnSpeed = 0) {
  // A walking-sized stride while pivoting; no frozen legs at zero translation.
  return Math.max(Math.hypot(animal.vx, animal.vz), Math.min(2, turnSpeed));
}
