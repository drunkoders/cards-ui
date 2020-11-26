/**
 * Returns a new array with shuffled cards
 * @param cards card piles
 */
export const shuffleArray = <T>(cards: readonly T[]): T[] => {
  return cards.slice().sort(() => Math.random() - 0.5);
};
