/* eslint-disable max-lines */
import { PlayingCard, PlayingCardSuit, PlayingCardName } from '@models/PlayingCard';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
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
  afterEach(() => cleanup());

  describe('Empty render', () => {
    let cardPile: HTMLElement;
    beforeEach(() => {
      render(<CardPile cards={[]} position={{ x: 0, y: 0 }} width={40} height={60} />);
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
    let faceElement: HTMLElement;

    beforeEach(() => {
      const card: PlayingCard = { id: '1', suit: PlayingCardSuit.Spades, name: PlayingCardName.Ace };
      const { getByTestId } = render(<CardPile cards={[card]} position={{ x: 0, y: 0 }} width={40} height={60} />);
      cardPile = getByTestId('CardPile');
      faceElement = getByTestId('PlayingCardFrontFace');
    });

    it('should have exactly one PlayingCard rendered', () => {
      expect(faceElement).toBeInTheDocument();
    });

    it('should pass down the props to card', () => {
      const [, useElement] = Array.from(faceElement.children);
      expect(useElement).toHaveAttribute('href', '#spades_1');
    });

    it('pile should not have multi-item', () => {
      expect(isClassPatternPresent(cardPile, /^multiItem/i)).not.toBeTruthy();
    });

    it('should not render back card', () => {
      expect(screen.queryAllByTestId('CardPile-secondCard')).toHaveLength(0);
    });
  });

  describe('when rendering two cards', () => {
    let cardPile: HTMLElement;
    let renderedCards: HTMLElement[];

    beforeEach(() => {
      const card: PlayingCard = { id: '1', suit: PlayingCardSuit.Spades, name: PlayingCardName.Ace };
      const otherCard: PlayingCard = { id: '1', suit: PlayingCardSuit.Hearts, name: PlayingCardName.Three };
      const { getAllByTestId, getByTestId } = render(
        <CardPile cards={[card, otherCard]} position={{ x: 0, y: 0 }} width={40} height={60} />
      );
      renderedCards = getAllByTestId('CardPile-firstCard');
      cardPile = getByTestId('CardPile');
    });

    it('pile should have card pile style', () => {
      expect(isClassPatternPresent(cardPile, /^cardPile/i)).toBeTruthy();
    });

    it('should have exactly one rendered cards', () => {
      expect(renderedCards).toHaveLength(1);
    });

    it('should have first card visible', () => {
      expect(renderedCards[0]).toHaveStyle('z-index: 2');
    });

    it('should render back card', () => {
      expect(screen.getAllByTestId('CardPile-secondCard')).toHaveLength(1);
    });

    it('should mark backFace as last item', () => {
      expect(screen.getByTestId('CardPile-secondCard')).toHaveStyle('z-index: 1');
    });
  });

  describe('when rendering more than two cards', () => {
    it('should render the custom cards', () => {
      const cards: PlayingCard[] = [
        { id: '2', suit: PlayingCardSuit.Spades, name: PlayingCardName.Ace },
        { id: '4', suit: PlayingCardSuit.Hearts, name: PlayingCardName.Ace },
        { id: '6', suit: PlayingCardSuit.Diamonds, name: PlayingCardName.Ace },
        { id: '8', suit: PlayingCardSuit.Clubs, name: PlayingCardName.Ace },
      ];

      const { getAllByTestId } = render(<CardPile cards={cards} position={{ x: 0, y: 0 }} width={40} height={60} />);

      expect(getAllByTestId('OtherCard')).toHaveLength(2);
    });
  });

  describe('about the menu and overlay', () => {
    beforeEach(() => {
      render(<CardPile cards={[]} position={{ x: 0, y: 0 }} width={40} height={60} />);
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
      fireEvent.keyDown(screen.getByTestId('CardPile'), { key: ' ', code: 'Space', keyCode: 32, charCode: 32 });
      expect(screen.getByTestId('Overlay')).toBeInTheDocument();
      expect(screen.getByRole('list')).toBeInTheDocument();
    });
  });

  describe('when working with the card pile menu', () => {
    let onCardFlippedSpy: jest.SpyInstance;
    let onShuffleSpy: jest.SpyInstance;

    beforeEach(() => {
      onCardFlippedSpy = jest.fn();
      onShuffleSpy = jest.fn();

      const card: PlayingCard = { id: '1', suit: PlayingCardSuit.Spades, name: PlayingCardName.Ace };

      render(
        <CardPile
          cards={[card]}
          isFaceUp={false}
          onCardFlipped={(onCardFlippedSpy as unknown) as (isFaceUp: boolean) => void}
          onShuffle={(onShuffleSpy as unknown) as () => void}
          position={{ x: 0, y: 0 }}
          width={40}
          height={60}
        />
      );
      fireEvent.click(screen.getByTestId('CardPile'));
    });

    it('should have the card face down', () => {
      expect(screen.getByTestId('BaseCard-flipper')).toHaveStyle('transform: rotateY(180deg)');
    });

    it('should call onCardFlipped when option is clicked', () => {
      fireEvent.click(screen.getByText('Turn first card'));
      expect(onCardFlippedSpy).toHaveBeenCalledWith(true);
    });

    it('should call onShuffle when Shuffle pile option is clicked', () => {
      fireEvent.click(screen.getByText('Shuffle pile'));
      expect(onShuffleSpy).toHaveBeenCalled();
    });
  });

  describe('when dragged', () => {
    it('should call onFlipped handler', () => {
      const onPositionChangedSpy = jest.fn();

      const card: PlayingCard = { id: '1', suit: PlayingCardSuit.Spades, name: PlayingCardName.Ace };

      render(
        <CardPile
          cards={[card]}
          isFaceUp={false}
          onPositionChanged={onPositionChangedSpy}
          position={{ x: 5, y: 7 }}
          width={40}
          height={60}
        />
      );

      const cardPile = screen.getByTestId('CardPile');

      fireEvent.mouseDown(cardPile, { clientX: 34, clientY: 55 });
      fireEvent.mouseMove(cardPile, { clientX: 54, clientY: 66 });
      fireEvent.mouseUp(cardPile);

      expect(onPositionChangedSpy).toHaveBeenCalledWith({ x: 25, y: 18 });
    });
  });
});
