/**
 * Returns a new array with shuffled cards
 * @param cards card piles
 */
export const shuffleArray = <T>(cards: readonly T[]): T[] => {
  return cards.slice().sort(() => Math.random() - 0.5);
};

export const removeFromArray = <T>(cards: readonly T[], index: number): { item: T | undefined; rest: T[] } => {
  const normalizedIndex = index < 0 ? cards.length + index : index;
  const item = cards[normalizedIndex];
  const rest = cards.filter((_, currIndex) => currIndex !== normalizedIndex);
  return { item, rest };
};
