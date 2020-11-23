import { calculateCardDimensions } from './card-dimensions';

describe('Card dimensions utils', () => {
  describe('calculateCardDimensions', () => {
    it('should calculate card dimensions depending on its container dimensions', () => {
      const initialCardDimensions = { width: 20, height: 40 };
      const containerDimensions = { width: 300, height: 200 };

      const cardDimensions = calculateCardDimensions(initialCardDimensions, containerDimensions);

      expect(cardDimensions).toEqual({ width: 30, height: 60 });
    });

    it('should calculate card dimensions depending on its container dimensions and the given ratio', () => {
      const initialCardDimensions = { width: 20, height: 40 };
      const containerDimensions = { width: 300, height: 200 };
      const ratio = 0.25;

      const cardDimensions = calculateCardDimensions(initialCardDimensions, containerDimensions, ratio);

      expect(cardDimensions).toEqual({ width: 75, height: 150 });
    });
  });
});
