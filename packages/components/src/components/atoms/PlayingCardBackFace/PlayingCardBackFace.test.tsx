import { cleanup, render } from '@testing-library/react';
import React from 'react';
import { PlayingCardBackFace } from './PlayingCardBackFace';

describe('PlayingCardBackFace', () => {
  let backFace: HTMLElement;
  let useElement: Element;

  afterEach(() => {
    cleanup();
  });

  describe('on default render', () => {
    beforeEach(() => {
      const { getByTestId } = render(<PlayingCardBackFace />);
      backFace = getByTestId('PlayingCardBackFace');
      [, useElement] = Array.from(backFace.children);
    });

    it('should render a back face', () => {
      expect(backFace).toBeInTheDocument();
    });

    it('should have a <use> child', () => {
      expect(useElement).not.toBeNull();
    });

    it('should have a <use> child with back face url', () => {
      expect(useElement).toHaveAttribute('href', '#back');
    });
  });

  describe('on different props', () => {
    it('should have a different back fill', () => {
      const { getByTestId } = render(<PlayingCardBackFace color="red" />);

      backFace = getByTestId('PlayingCardBackFace');
      [, useElement] = Array.from(backFace.children);

      expect(useElement).toHaveAttribute('fill', 'red');
    });
  });
});
