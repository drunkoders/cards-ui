/* eslint-disable max-lines */
import { render } from '@utils/testing-utils';
import React from 'react';
import * as cardDimensionsUtils from '@utils/card-dimensions';
import { fireEvent, screen } from '@testing-library/react';
import * as reactRedux from 'react-redux';
import { PlayingCardSuit, PlayingCardName } from '@models/PlayingCard';
import { Table } from '.';

describe('Table', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should render a Table', () => {
    const { getByTestId } = render(<Table height={400} width={600} />, { initialState: { table: { cards: {} } } });
    const table = getByTestId('Table');
    expect(table).toBeInTheDocument();
  });

  it('should have an overflow hidden', () => {
    const { getByTestId } = render(<Table height={400} width={600} />, { initialState: { table: { cards: {} } } });
    const table = getByTestId('Table');
    expect(table).toHaveStyle('overflow: hidden');
  });

  it('should have a relative position', () => {
    const { getByTestId } = render(<Table height={400} width={600} />, { initialState: { table: { cards: {} } } });
    const table = getByTestId('Table');
    expect(table).toHaveStyle('position: relative');
  });

  it('should have a display flex', () => {
    const { getByTestId } = render(<Table height={400} width={600} />, { initialState: { table: { cards: {} } } });
    const table = getByTestId('Table');
    expect(table).toHaveStyle('display: flex');
  });

  it('should dispatch an action with table dimensions', () => {
    const dispatchSpy = jest.fn();
    jest.spyOn(reactRedux, 'useDispatch').mockReturnValue(dispatchSpy);

    const initialState = { initialState: { table: { cards: {} } } };
    render(<Table height={400} width={600} />, initialState);

    expect(dispatchSpy).toHaveBeenCalledWith({
      payload: { width: 600, height: 400 },
      type: 'table/setTableDimensions',
    });
  });

  it('should render cards with dimensions depending on table dimensions', () => {
    jest.spyOn(cardDimensionsUtils, 'calculateCardDimensions').mockReturnValue({ width: 53, height: 86 });
    const { getByTestId } = render(<Table height={400} width={600} />, {
      initialState: {
        table: {
          cards: {
            2: {
              card: { suit: PlayingCardSuit.Spades, name: PlayingCardName.Two },
              isFaceUp: false,
              position: { x: 0, y: 0 },
            },
          },
        },
      },
    });

    const card = getByTestId('BaseCard');

    expect(card).toHaveStyle('width: 53px');
    expect(card).toHaveStyle('height: 86px');
  });

  it('should update card position on table when it is dragged', () => {
    const dispatchSpy = jest.fn();
    jest.spyOn(reactRedux, 'useDispatch').mockReturnValue(dispatchSpy);

    const { getByTestId } = render(<Table height={400} width={600} />, {
      initialState: {
        table: {
          cards: {
            2: {
              card: { suit: PlayingCardSuit.Spades, name: PlayingCardName.Two },
              isFaceUp: false,
              position: { x: 0, y: 0 },
            },
          },
        },
      },
    });

    const card = getByTestId('BaseCard');

    fireEvent.mouseDown(card, { clientX: 34, clientY: 55 });
    fireEvent.mouseMove(card, { clientX: 54, clientY: 66 });
    fireEvent.mouseUp(card);

    expect(dispatchSpy).toHaveBeenCalledWith({
      payload: { cardId: '2', position: { x: 20, y: 11 } },
      type: 'table/updateCardPosition',
    });
  });

  it('should update card face up on table when it is flipped', () => {
    const dispatchSpy = jest.fn();
    jest.spyOn(reactRedux, 'useDispatch').mockReturnValue(dispatchSpy);

    const { getByTestId } = render(<Table height={400} width={600} />, {
      initialState: {
        table: {
          cards: {
            2: {
              card: { suit: PlayingCardSuit.Spades, name: PlayingCardName.Two },
              isFaceUp: false,
              position: { x: 0, y: 0 },
            },
          },
        },
      },
    });

    const card = getByTestId('BaseCard');

    fireEvent.click(card);

    expect(dispatchSpy).toHaveBeenCalledWith({
      payload: { cardId: '2', isFaceUp: true },
      type: 'table/updateCardFaceUp',
    });
  });

  describe('card pile', () => {
    it('should render a card pile', () => {
      jest.spyOn(cardDimensionsUtils, 'calculateCardDimensions').mockReturnValue({ width: 53, height: 86 });
      const { getByTestId } = render(<Table height={400} width={600} />, {
        initialState: {
          table: {
            cards: {
              2: {
                cards: [
                  { suit: PlayingCardSuit.Spades, name: PlayingCardName.Two },
                  { suit: PlayingCardSuit.Hearts, name: PlayingCardName.Three },
                  { suit: PlayingCardSuit.Diamonds, name: PlayingCardName.Four },
                ],
                isFaceUp: false,
                position: { x: 0, y: 0 },
              },
            },
          },
        },
      });

      const cardPile = getByTestId('CardPile');

      expect(cardPile).toBeInTheDocument();
      expect(cardPile).toHaveStyle('width: 53px');
      expect(cardPile).toHaveStyle('height: 86px');
    });

    it('should dispatch an action to shuffle the cards when onShuffle is triggered', () => {
      const dispatchSpy = jest.fn();
      jest.spyOn(reactRedux, 'useDispatch').mockReturnValue(dispatchSpy);

      const { getByTestId } = render(<Table height={400} width={600} />, {
        initialState: {
          table: {
            cards: {
              2: {
                cards: [
                  { suit: PlayingCardSuit.Spades, name: PlayingCardName.Two },
                  { suit: PlayingCardSuit.Hearts, name: PlayingCardName.Three },
                  { suit: PlayingCardSuit.Diamonds, name: PlayingCardName.Four },
                ],
                isFaceUp: false,
                position: { x: 0, y: 0 },
              },
            },
          },
        },
      });

      const cardPile = getByTestId('CardPile');

      fireEvent.click(cardPile);
      fireEvent.click(screen.getByText('Shuffle pile'));

      expect(dispatchSpy).toHaveBeenCalledWith({
        payload: '2',
        type: 'table/shuffleCardDeck',
      });
    });

    it('should dispatch an action to flip the first card when onCardFlipped is triggered', () => {
      const dispatchSpy = jest.fn();
      jest.spyOn(reactRedux, 'useDispatch').mockReturnValue(dispatchSpy);

      const { getByTestId } = render(<Table height={400} width={600} />, {
        initialState: {
          table: {
            cards: {
              2: {
                cards: [
                  { suit: PlayingCardSuit.Spades, name: PlayingCardName.Two },
                  { suit: PlayingCardSuit.Hearts, name: PlayingCardName.Three },
                  { suit: PlayingCardSuit.Diamonds, name: PlayingCardName.Four },
                ],
                isFaceUp: false,
                position: { x: 0, y: 0 },
              },
            },
          },
        },
      });

      const cardPile = getByTestId('CardPile');

      fireEvent.click(cardPile);
      fireEvent.click(screen.getByText('Turn first card'));

      expect(dispatchSpy).toHaveBeenCalledWith({
        payload: { cardId: '2', isFaceUp: true },
        type: 'table/updateCardFaceUp',
      });
    });
  });
});
