import React from 'react';
import { render } from '@testing-library/react';
import { PlayingCard } from './PlayingCard';

const testCardSvg = (el: HTMLElement, pattern: string | RegExp) =>
  expect(el).toHaveAttribute('xlink:href', expect.stringMatching(pattern));

describe('PlayingCard', () => {
  it('should render correctly', () => {
    const { getByTestId } = render(<PlayingCard />);
    expect(getByTestId('BaseCard')).toBeInTheDocument();
  });

  describe('on default rendering', () => {
    let frontFace: HTMLElement;
    let backFace: HTMLElement;
    beforeEach(() => {
      const { getByTestId } = render(<PlayingCard />);
      frontFace = getByTestId('PlayingCard_front_use');
      backFace = getByTestId('PlayingCard_back_use');
    });

    it('should default front to joker_black', () => {
      testCardSvg(frontFace, /#joker_black$/i);
    });

    it('should default front to no fill', () => {
      expect(frontFace).toHaveAttribute('fill', '');
    });

    it('should default back to back', () => {
      testCardSvg(backFace, /#back$/i);
    });

    it('should default back to black color', () => {
      expect(backFace).toHaveAttribute('fill', 'black');
    });
  });

  describe('on rendering', () => {
    let frontFace: HTMLElement;
    let backFace: HTMLElement;
    beforeEach(() => {
      const { getByTestId } = render(<PlayingCard card="spade_4" backColor="red" />);
      frontFace = getByTestId('PlayingCard_front_use');
      backFace = getByTestId('PlayingCard_back_use');
    });

    it('should render the correct card', () => {
      testCardSvg(frontFace, /#spade_4$/i);
    });

    it('should always show back as back', () => {
      testCardSvg(backFace, /#back$/i);
    });

    it('should render back as backColor property', () => {
      expect(backFace).toHaveAttribute('fill', 'red');
    });
  });
});
