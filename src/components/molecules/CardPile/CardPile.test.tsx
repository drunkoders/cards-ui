/* eslint-disable max-lines */
import { BaseCard } from '@atoms/BaseCard';
import type { PlayingCardProps } from '@atoms/PlayingCard';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { shuffleArray } from '@utils/array-utils';
import { getFaceUse } from '@utils/testing-utils';
import React from 'react';
import { CardPile } from './CardPile';

jest.mock('@utils/array-utils');

const isClassPatternPresent = (el: HTMLElement, pattern: RegExp) => {
  const classAttribute = el.getAttribute('class') || '';
  return classAttribute
    .split(/\s+/)
    .filter((s) => s.length > 0)
    .some((c) => pattern.test(c));
};

describe('CardPile', () => {
  describe('Empty render', () => {
    let cardPile: HTMLElement;
    beforeEach(() => {
      render(<CardPile cards={[]} />);
      cardPile = screen.getByTestId('CardPile');
    });

    it('should render the pile', () => {
      expect(cardPile).toBeInTheDocument();
    });

    it('pile should not have multi-item', () => {
      expect(isClassPatternPresent(cardPile, /^multiItem/i)).not.toBeTruthy();
    });

    it('should not have cards', () => {
      expect(screen.queryAllByTestId('BaseCard')).toHaveLength(0);
    });
  });

  describe('when rendering one card', () => {
    let cardPile: HTMLElement;
    beforeEach(() => {
      const cardProp: PlayingCardProps = { card: 'heart_king' };
      const { getByTestId } = render(<CardPile cards={[cardProp]} />);
      cardPile = getByTestId('CardPile');
    });

    it('should have exactly one PlayingCard rendered', () => {
      expect(getFaceUse()).toBeInTheDocument();
    });

    it('should pass down the props to card', () => {
      expect(getFaceUse(true)).toHaveAttribute('xlink:href', expect.stringMatching(/#heart_king$/i));
    });

    it('pile should not have multi-item', () => {
      expect(isClassPatternPresent(cardPile, /^multiItem/i)).not.toBeTruthy();
    });

    it('should not render back card', () => {
      expect(screen.queryAllByTestId('CardPile-backface')).toHaveLength(0);
    });
  });

  describe('when rendering two cards', () => {
    let cardPile: HTMLElement;
    let renderedCards: HTMLElement[];
    beforeEach(() => {
      const { getAllByTestId, getByTestId } = render(<CardPile cards={[{}, {}]} />);
      renderedCards = getAllByTestId('CardPile_card');
      cardPile = getByTestId('CardPile');
    });

    it('pile should have multi-item style', () => {
      expect(isClassPatternPresent(cardPile, /^multiItem/i)).toBeTruthy();
    });

    it('should have exactly one rendered cards', () => {
      expect(renderedCards).toHaveLength(1);
    });

    it('should have first card visible', () => {
      expect(renderedCards[0]).toHaveStyle('z-index: 2');
    });

    it('should render back card', () => {
      expect(screen.queryAllByTestId('CardPile-backface')).toHaveLength(1);
    });

    it('should mark backFace as last item', () => {
      expect(screen.getByTestId('CardPile-backface')).toHaveStyle('z-index: 1');
    });
  });

  describe('when rendering other cards', () => {
    it('should render the custom cards', () => {
      const { getByTestId } = render(<CardPile cards={[{}]} component={BaseCard} />);
      expect(getByTestId('BaseCard')).toBeInTheDocument();
    });
  });

  describe('about the menu and overlay', () => {
    beforeEach(() => {
      render(<CardPile cards={[]} />);
    });

    it('should not display the overlay+menu', () => {
      expect(screen.queryByTestId('Overlay')).toBeNull();
      expect(screen.queryByRole('list')).toBeNull();
    });

    it('should display the overlay+menu when clicked', async () => {
      fireEvent.click(screen.getByTestId('CardPile'));
      expect(screen.getByTestId('Overlay')).toBeInTheDocument();
      expect(screen.getByRole('list')).toBeInTheDocument();
    });

    it('should display the overlay+menu when keydown', async () => {
      fireEvent.keyDown(screen.getByTestId('CardPile'), { key: 'Space', code: 'Space', keyCode: 32, charCode: 32 });
      expect(screen.getByTestId('Overlay')).toBeInTheDocument();
      expect(screen.getByRole('list')).toBeInTheDocument();
    });
  });

  describe('when working with the card pile menu', () => {
    let mockedShuffleArray: jest.Mock<typeof shuffleArray>;
    beforeEach(() => {
      mockedShuffleArray = (shuffleArray as unknown) as jest.Mock<typeof shuffleArray>;
      mockedShuffleArray.mockImplementation((arr) => arr);

      render(<CardPile cards={[{}]} />);
      fireEvent.click(screen.getByTestId('CardPile'));
    });

    it('should have the card face down', () => {
      expect(screen.getByTestId('BaseCard-flipper')).toHaveStyle('transform: rotateY(180deg)');
    });

    it('should turn the first card  when option is clicked', () => {
      fireEvent.click(screen.getByText('Turn first card'));
      expect(screen.getByTestId('BaseCard-flipper')).not.toHaveStyle('transform: rotateY(180deg)');
      expect(screen.getByTestId('Overlay')).toBeInTheDocument();
    });

    it('should call shuffleArray when Shuffle pile option is clicked', () => {
      fireEvent.click(screen.getByText('Shuffle pile'));
      expect(mockedShuffleArray).toHaveBeenCalled();
    });
  });

  afterEach(() => cleanup());
});
