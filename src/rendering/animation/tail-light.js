const IDLE_COLOR = '#9ceeff';
const IDLE_EMISSIVE = '#39bfe8';
const BARK_COLOR = '#ff7062';
const BARK_EMISSIVE = '#ff241b';

/** Set one dog's dedicated tail light from simulation-time bark state. */
export function setTailLightBarking(dogOrParts, barking) {
  const parts = dogOrParts?.userData?.parts || dogOrParts;
  const material = parts?.tailLight?.material;
  if (!material) return false;
  const color = barking ? BARK_COLOR : IDLE_COLOR;
  const emissive = barking ? BARK_EMISSIVE : IDLE_EMISSIVE;
  if (material.color?.set) material.color.set(color);
  if (material.emissive?.set) material.emissive.set(emissive);
  material.emissiveIntensity = barking ? 1.9 : 1.25;
  return true;
}
