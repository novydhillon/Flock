/** Discrete herd variation shared by rendering and physical clearance. */
export const COW_SCALES = Object.freeze([1, 13 / 12, 7 / 6, 1.25]);
export function animalScale(animal) {
  if (animal?.type !== 'cow' || !Number.isFinite(animal.scale)) return 1;
  return COW_SCALES.reduce((best, scale) => Math.abs(scale - animal.scale) < Math.abs(best - animal.scale) ? scale : best, 1);
}
export const animalRadius = animal => animal?.type === 'cow' ? .78 * animalScale(animal) : .55;
