import { cleanup, render, screen } from '@testing-library/react';
import React from 'react';
import { PlayingCardFace } from './PlayingCardFace';

const getUseEl = (el?: HTMLElement) => {
  const svgEl = screen.getByRole('img');
  return (el || svgEl).querySelector('use');
};

describe('PlayingCardFace', () => {
  describe('on default render', () => {
    let svgEl: HTMLElement;
    beforeEach(() => {
      render(<PlayingCardFace />);
      svgEl = screen.getByRole('img');
    });

    it('should render a back face', () => {
      expect(svgEl).toBeInTheDocument();
    });

    describe('on svg use', () => {
      let svgUse: SVGUseElement | null;
      beforeEach(() => {
        svgUse = getUseEl(svgEl);
      });

      it('should contain use tag', () => {
        expect(svgUse).not.toBeNull();
      });

      it('should render a back face', () => {
        expect(svgUse).toHaveAttribute('xlink:href', expect.stringMatching(/#back$/i));
      });

      it('should default back to black color', () => {
        expect(svgUse).toHaveAttribute('fill', 'black');
      });
    });
  });

  describe('on different props', () => {
    it('should have a different back fill', () => {
      render(<PlayingCardFace backColor="red" />);
      expect(getUseEl()).toHaveAttribute('fill', 'red');
    });

    it('should have a card displayed', () => {
      render(<PlayingCardFace card="heart_5" />);
      expect(getUseEl()).toHaveAttribute('xlink:href', expect.stringMatching(/#heart_5$/));
    });
  });

  afterEach(() => {
    cleanup();
  });
});
