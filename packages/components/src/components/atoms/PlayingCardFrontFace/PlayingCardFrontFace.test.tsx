import { cleanup, render } from '@testing-library/react';
import React from 'react';
import { PlayingCard, PlayingCardSuit, PlayingCardName } from '@models/PlayingCard';
import { PlayingCardFrontFace } from './PlayingCardFrontFace';

describe('PlayingCardFrontFace', () => {
  afterEach(() => {
    cleanup();
  });

  describe('on default render', () => {
    let frontFace: HTMLElement;
    let useElement: Element;
    const card: PlayingCard = { suit: PlayingCardSuit.Hearts, name: PlayingCardName.Five };

    beforeEach(() => {
      const { getByTestId } = render(<PlayingCardFrontFace card={card} />);
      frontFace = getByTestId('SvgPlayingCard-front');
      [, useElement] = Array.from(frontFace.children);
    });

    it('should render a front face', () => {
      expect(frontFace).toBeInTheDocument();
    });

    it('should have a card displayed', () => {
      render(<PlayingCardFrontFace card={card} />);
      expect(useElement).toHaveAttribute('href', '#hearts_5');
    });
  });
});
