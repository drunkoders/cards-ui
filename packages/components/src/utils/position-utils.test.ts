import { calculatePositionWithinBoundaries } from './position-utils';

describe('Position utils', () => {
  describe('calculatePositionWithinBoundaries', () => {
    it('should not calculate a new position if no boundaries are specified', () => {
      const position = { x: -550, y: 740 };
      const dimensions = { width: 20, height: 40 };

      const newPosition = calculatePositionWithinBoundaries(position, dimensions);

      expect(newPosition).toEqual(position);
    });

    it('should not calculate a new position if current position is within the limits of its container', () => {
      const position = { x: 50, y: 70 };
      const dimensions = { width: 20, height: 40 };

      const containerDimensions = { width: 300, height: 200 };

      const newPosition = calculatePositionWithinBoundaries(position, dimensions, containerDimensions);

      expect(newPosition).toEqual(position);
    });

    it('should calculate a new position if current position is beyond the top-right corner of its container', () => {
      const position = { x: 301, y: -41 };
      const dimensions = { width: 20, height: 40 };

      const containerDimensions = { width: 300, height: 200 };

      const newPosition = calculatePositionWithinBoundaries(position, dimensions, containerDimensions);

      expect(newPosition).toEqual({ x: 300, y: -40 });
    });

    it('should calculate a new position if current position is beyond the bottom-right corner of its container', () => {
      const position = { x: 301, y: 201 };
      const dimensions = { width: 20, height: 40 };

      const containerDimensions = { width: 300, height: 200 };

      const newPosition = calculatePositionWithinBoundaries(position, dimensions, containerDimensions);

      expect(newPosition).toEqual({ x: 300, y: 200 });
    });

    it('should calculate a new position if current position is beyond the top-left corner of its container', () => {
      const position = { x: -21, y: -41 };
      const dimensions = { width: 20, height: 40 };

      const containerDimensions = { width: 300, height: 200 };

      const newPosition = calculatePositionWithinBoundaries(position, dimensions, containerDimensions);

      expect(newPosition).toEqual({ x: -20, y: -40 });
    });

    it('should calculate a new position if current position is beyond the bottom-left corner of its container', () => {
      const position = { x: -21, y: 201 };
      const dimensions = { width: 20, height: 40 };

      const containerDimensions = { width: 300, height: 200 };

      const newPosition = calculatePositionWithinBoundaries(position, dimensions, containerDimensions);

      expect(newPosition).toEqual({ x: -20, y: 200 });
    });
  });
});
