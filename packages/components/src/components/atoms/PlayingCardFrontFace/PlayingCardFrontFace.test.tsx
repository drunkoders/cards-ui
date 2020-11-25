import { cleanup, render } from '@testing-library/react';
import React from 'react';
import { PlayingCardFrontFace } from './PlayingCardFrontFace';

describe('PlayingCardFrontFace', () => {
  afterEach(() => {
    cleanup();
  });

  describe('on default render', () => {
    let frontFace: HTMLElement;
    let useElement: Element;

    beforeEach(() => {
      const { getByTestId } = render(<PlayingCardFrontFace card="hearts_5" />);
      frontFace = getByTestId('SvgPlayingCard-front');
      [, useElement] = Array.from(frontFace.children);
    });

    it('should render a front face', () => {
      expect(frontFace).toBeInTheDocument();
    });

    it('should have a card displayed', () => {
      render(<PlayingCardFrontFace card="hearts_5" />);
      expect(useElement).toHaveAttribute('href', '#hearts_5');
    });
  });
});
