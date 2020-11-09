/**
 * Returns a new array with shuffled cards
 * @param cards card piles
 */
export function shuffleArray<T = unknown>(cards: readonly T[]): T[] {
  return cards.slice().sort(() => Math.random() - 0.5);
}

export default shuffleArray;
