import { shuffleArray } from './array-utils';

describe('ArrayUtils', () => {
  describe('shuffleArray', () => {
    it('should not change input array', () => {
      const inputArray: readonly number[] = Object.freeze([]);
      expect(() => shuffleArray(inputArray)).not.toThrow();
    });

    it('should shuffle array', () => {
      const inputArray: readonly number[] = Object.freeze(new Array(10).fill(undefined).map((_, index) => index));
      const newArray = shuffleArray(inputArray);
      expect(newArray).not.toEqual(inputArray);
    });
  });
});
