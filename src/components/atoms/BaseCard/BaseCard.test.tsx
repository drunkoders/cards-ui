/* eslint-disable max-lines */
import type { Handle } from '@models/Handle';
import { fireEvent, render } from '@testing-library/react';
import React from 'react';
import { act } from 'react-dom/test-utils';
import { BaseCard } from './BaseCard';

describe('BaseCard', () => {
  let cardContainer: HTMLElement;
  let cardFlipper: HTMLElement;
  let frontFace: HTMLElement;
  let backFace: HTMLElement;

  it('should render the card', () => {
    const { getByTestId, getByRole } = render(<BaseCard />);
    expect(getByRole('button')).toBeInTheDocument();
    expect(getByTestId('BaseCard')).toBeInTheDocument();
  });

  describe('when rendered', () => {
    beforeEach(() => {
      const { getByTestId, getByRole } = render(
        <BaseCard
          frontFace={<div data-testid="front-face">MY FRONT</div>}
          backFace={<div data-testid="back-face">MY BACK</div>}
        />
      );
      cardContainer = getByRole('button');
      cardFlipper = getByTestId('BaseCard-flipper');
      frontFace = getByTestId('front-face');
      backFace = getByTestId('back-face');
    });

    it('should render front face', () => {
      expect(frontFace).toBeInTheDocument();
    });

    it('should render back face', () => {
      expect(backFace).toBeInTheDocument();
    });

    it('should have the card flipped by default', () => {
      expect(cardFlipper).toHaveStyle('transform: rotateY(180deg)');
    });

    it('should unflip when clicked', async () => {
      fireEvent.click(cardContainer);
      expect(cardFlipper).not.toHaveStyle('transform: rotateY(180deg)');
    });

    it('should unflip when spacebar pressed', async () => {
      fireEvent.keyDown(cardContainer, { key: 'Space', code: 'Space', keyCode: 32, charCode: 32 });
      expect(cardFlipper).not.toHaveStyle('transform: rotateY(180deg)');
    });

    it('should not unflip when something else is pressed', async () => {
      fireEvent.keyDown(cardContainer, { key: 'Enter', code: 'Enter', keyCode: 13, charCode: 13 });
      expect(cardFlipper).toHaveStyle('transform: rotateY(180deg)');
    });

    it('should flip again when clicked again', async () => {
      fireEvent.click(cardContainer);
      fireEvent.click(cardContainer);
      expect(cardFlipper).toHaveStyle('transform: rotateY(180deg)');
    });
  });

  describe('when rendered with faceUp', () => {
    beforeEach(() => {
      const { getByTestId } = render(<BaseCard faceUp />);
      cardFlipper = getByTestId('BaseCard-flipper');
    });

    it('should not flip the card by default', () => {
      expect(cardFlipper).not.toHaveStyle('transform: rotateY(180deg)');
    });
  });

  describe('when working with references and disableNativeEvents', () => {
    beforeEach(() => {
      const { getByTestId, getByRole } = render(<BaseCard disableNativeEvents />);
      cardContainer = getByRole('button');
      cardFlipper = getByTestId('BaseCard-flipper');
    });

    it('should NOT unflip when clicked', async () => {
      fireEvent.click(cardContainer);
      expect(cardFlipper).toHaveStyle('transform: rotateY(180deg)');
    });

    it('should NOT unflip when spacebar pressed', async () => {
      fireEvent.keyDown(cardContainer, { key: 'Space', code: 'Space', keyCode: 32, charCode: 32 });
      expect(cardFlipper).toHaveStyle('transform: rotateY(180deg)');
    });
  });

  describe('when working with refs', () => {
    let cardHandle: Handle<typeof BaseCard> | null;
    beforeEach(() => {
      const { getByTestId } = render(
        <BaseCard
          ref={(c) => {
            cardHandle = c;
          }}
        />
      );
      cardFlipper = getByTestId('BaseCard-flipper');
    });

    it('should forward the correct ref', () => {
      expect(cardHandle).not.toBeNull();
    });

    it('should flip the card via ref call', () => {
      act(() => cardHandle?.flip());
      expect(cardFlipper).not.toHaveStyle('transform: rotateY(180deg)');
    });

    it('should double flip the card after two ref calls', () => {
      act(() => cardHandle?.flip());
      act(() => cardHandle?.flip());
      expect(cardFlipper).toHaveStyle('transform: rotateY(180deg)');
    });

    it('should force backface via ref call with param false', () => {
      act(() => cardHandle?.flip(false));
      expect(cardFlipper).toHaveStyle('transform: rotateY(180deg)');
    });

    it('should force faceUp via ref call with param true', () => {
      act(() => cardHandle?.flip(true));
      expect(cardFlipper).not.toHaveStyle('transform: rotateY(180deg)');
    });
  });
});
