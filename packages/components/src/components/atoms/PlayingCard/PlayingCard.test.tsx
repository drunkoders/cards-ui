/* eslint-disable max-lines */
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { getFaceUse } from '@utils/testing-utils';
import React from 'react';
import { PlayingCard } from './PlayingCard';

describe('PlayingCard', () => {
  let cardFlipper: HTMLElement;

  afterEach(() => {
    cleanup();
  });

  it('should render correctly', () => {
    const { getByTestId } = render(<PlayingCard />);
    expect(getByTestId('Draggable')).toBeInTheDocument();
  });

  describe('on default rendering', () => {
    beforeEach(() => {
      render(<PlayingCard />);
    });

    it('should default front to joker_black', () => {
      expect(getFaceUse(true)).toHaveAttribute('xlink:href', expect.stringMatching(/#joker_black$/i));
    });

    it('should default back to back', () => {
      expect(getFaceUse()).toHaveAttribute('xlink:href', expect.stringMatching(/#back$/i));
    });

    it('should be flipped by default', () => {
      expect(screen.getByTestId('BaseCard-flipper')).toHaveStyle('transform: rotateY(180deg)');
    });
  });

  describe('on rendering', () => {
    beforeEach(() => {
      render(<PlayingCard card="spades_4" backColor="red" />);
    });

    it('should render the correct card', () => {
      expect(getFaceUse(true)).toHaveAttribute('xlink:href', expect.stringMatching(/#spades_4$/i));
    });

    it('should always show back as back', () => {
      expect(getFaceUse()).toHaveAttribute('xlink:href', expect.stringMatching(/#back$/i));
    });

    it('should render back as backColor property', () => {
      expect(getFaceUse()).toHaveAttribute('xlink:href', expect.stringMatching(/#back$/i));
    });
  });

  describe('on forwarding props', () => {
    beforeEach(() => {
      const { getByTestId } = render(<PlayingCard faceUp disableNativeEvents />);
      cardFlipper = getByTestId('BaseCard-flipper');
    });

    it('should forward the faceUp', () => {
      expect(cardFlipper).not.toHaveStyle('transform: rotateY(180deg)');
    });

    it('should forward disableNativeEvents', () => {
      fireEvent.click(cardFlipper);
      expect(cardFlipper).not.toHaveStyle('transform: rotateY(180deg)');
    });
  });
});
