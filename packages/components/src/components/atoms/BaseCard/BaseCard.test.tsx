/* eslint-disable max-lines */
import { fireEvent, render } from '@testing-library/react';
import React from 'react';
import { BaseCard } from './BaseCard';

describe('BaseCard', () => {
  let cardContainer: HTMLElement;
  let cardFlipper: HTMLElement;
  let frontFace: HTMLElement;
  let backFace: HTMLElement;

  const onFlippedSpy = jest.fn();

  afterEach(() => {
    onFlippedSpy.mockRestore();
  });

  it('should render the card', () => {
    const { getByTestId, getByRole } = render(<BaseCard />);
    expect(getByRole('button')).toBeInTheDocument();
    expect(getByTestId('BaseCard')).toBeInTheDocument();
  });

  describe('when rendered', () => {
    beforeEach(() => {
      const { getByTestId, getByRole } = render(
        <BaseCard
          onFlipped={onFlippedSpy}
          faceUp={false}
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

    it('should call onFlipped handler with true when clicked', () => {
      fireEvent.click(cardContainer);

      expect(onFlippedSpy).toHaveBeenCalledWith(true);
    });

    it('should unflip when spacebar pressed', () => {
      fireEvent.keyDown(cardContainer, { key: ' ', code: 'Space', keyCode: 32, charCode: 32 });

      expect(onFlippedSpy).toHaveBeenCalledWith(true);
    });

    it('should not unflip when something else is pressed', () => {
      fireEvent.keyDown(cardContainer, { key: 'Enter', code: 'Enter', keyCode: 13, charCode: 13 });

      expect(cardFlipper).toHaveStyle('transform: rotateY(180deg)');
    });

    it('should flip again when clicked again', () => {
      fireEvent.click(cardContainer);
      fireEvent.click(cardContainer);

      expect(cardFlipper).toHaveStyle('transform: rotateY(180deg)');
    });
  });

  describe('when rendered with faceUp', () => {
    beforeEach(() => {
      const { getByTestId, getByRole } = render(<BaseCard faceUp onFlipped={onFlippedSpy} />);
      cardFlipper = getByTestId('BaseCard-flipper');
      cardContainer = getByRole('button');
    });

    it('should not flip the card by default', () => {
      expect(cardFlipper).not.toHaveStyle('transform: rotateY(180deg)');
    });

    it('should call onFlipped handler with false when clicked', () => {
      fireEvent.click(cardContainer);

      expect(onFlippedSpy).toHaveBeenCalledWith(false);
    });
  });

  describe('when working with disableNativeEvents', () => {
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
      fireEvent.keyDown(cardContainer, { key: ' ', code: 'Space', keyCode: 32, charCode: 32 });
      expect(cardFlipper).toHaveStyle('transform: rotateY(180deg)');
    });
  });

  describe('when dragged', () => {
    it('should call onFlipped handler', () => {
      const onPositionChangedSpy = jest.fn();

      const { getByTestId } = render(
        <BaseCard faceUp position={{ x: 10, y: 15 }} onPositionChanged={onPositionChangedSpy} />
      );
      const baseCard = getByTestId('BaseCard');

      fireEvent.mouseDown(baseCard, { clientX: 34, clientY: 55 });
      fireEvent.mouseMove(baseCard, { clientX: 54, clientY: 66 });
      fireEvent.mouseUp(baseCard);

      expect(onPositionChangedSpy).toHaveBeenCalledWith({ x: 30, y: 26 });
    });
  });
});
