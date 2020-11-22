import type { Dimensions } from '@models/Dimensions';
import type { Position } from '@models/Position';

/**
 * Calculate item position so that it stays within the limits of its container
 *
 * @param position the current position of the item
 * @param dimensions the dimensions of the item
 * @param containerDimensions the dimensions of the item container
 *
 * @returns the new position within boundaries
 */
export const calculatePositionWithinBoundaries = (
  position: Position,
  dimensions: Dimensions,
  containerDimensions?: Dimensions
): Position => {
  if (!containerDimensions) {
    return position;
  }

  const containerPosition: Position = { x: 0, y: 0 };

  const minX = Math.round(containerPosition.x - dimensions.width);
  const minY = Math.round(containerPosition.y - dimensions.height);

  const maxX = Math.round(containerDimensions.width);
  const maxY = Math.round(containerDimensions.height);

  const x = Math.min(Math.max(minX, position.x), maxX);
  const y = Math.min(Math.max(minY, position.y), maxY);

  return { x, y };
};
