import { removeFromArray, shuffleArray } from './array-utils';

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

  describe('removeFromArray', () => {
    it('should remove first item of array', () => {
      const array = Object.freeze([0, 1, 2, 3]);
      const { item, rest } = removeFromArray(array, 0);
      expect(item).toBe(0);
      expect(rest).toEqual([1, 2, 3]);
    });
    it('should remove last item of array', () => {
      const array = Object.freeze([0, 1, 2, 3]);
      const { item, rest } = removeFromArray(array, -1);
      expect(item).toBe(3);
      expect(rest).toEqual([0, 1, 2]);
    });
    it('should handle out of limits index', () => {
      const array = Object.freeze([0, 1, 2, 3]);
      const { item, rest } = removeFromArray(array, 10);
      expect(item).toBe(undefined);
      expect(rest).toEqual([0, 1, 2, 3]);
    });
    it('should handle empty arrays', () => {
      const array = Object.freeze([]);
      const { item, rest } = removeFromArray(array, 0);
      expect(item).toBe(undefined);
      expect(rest).toEqual([]);
    });
    it('should handle single item arrays', () => {
      const array = Object.freeze([1]);
      const { item, rest } = removeFromArray(array, 0);
      expect(item).toBe(1);
      expect(rest).toEqual([]);
    });
  });
});
