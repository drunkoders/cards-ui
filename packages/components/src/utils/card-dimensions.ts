import { Dimensions } from '@models/Dimensions';

/**
 * Calculate card dimensions according to its container's dimensions and the given ratio
 *
 * @param initialCardDimensions the initial dimensions of the card
 * @param containerDimensions the dimensions of its container
 * @param ratio the ratio
 *
 * @returns the new card dimensions
 */
export const calculateCardDimensions = (
  initialCardDimensions: Dimensions,
  containerDimensions: Dimensions,
  ratio = 0.1
): Dimensions => {
  const cardRatio = initialCardDimensions.height / initialCardDimensions.width;

  const width = containerDimensions.width * ratio;
  const height = Number((cardRatio * width).toFixed(2));

  return { width, height };
};
