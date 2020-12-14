/* eslint-disable max-lines */
import { render } from '@utils/testing-utils';
import React from 'react';
import * as cardStyleUtils from '@utils/card-style';
import { fireEvent, screen } from '@testing-library/react';
import * as reactRedux from 'react-redux';
import { PlayingCardSuit, PlayingCardName, PlayingCard } from '@models/PlayingCard';
import { UnoCard } from '@models/UnoCard';
import { Card } from '@models/Card';
import { CardTypeStyle } from '@utils/card-style';
import { Table } from './Table';

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

  describe('on Rendering Playing cards', () => {
    let getByTestId;
    beforeEach(() => {
      jest.spyOn(cardStyleUtils, 'defaultCardStyleFactory').mockReturnValue({ dimensions: { width: 53, height: 86 } });

      const playingCard: PlayingCard = {
        id: '2',
        type: 'PlayingCard',
        suit: PlayingCardSuit.Spades,
        name: PlayingCardName.Two,
      };
      const renderRoot = render(<Table height={400} width={600} />, {
        initialState: {
          table: {
            cards: {
              2: {
                cards: playingCard,
                isFaceUp: false,
                position: { x: 0, y: 0 },
              },
            },
          },
        },
      });
      getByTestId = renderRoot.getByTestId;
    });

    it('should render cards with dimensions depending on table dimensions', () => {
      const card = getByTestId('BaseCard');
      expect(card).toHaveStyle('width: 53px');
      expect(card).toHaveStyle('height: 86px');
    });

    it('should render PlayingCardFace', () => {
      const card = getByTestId('PlayingCardFrontFace');
      expect(card).toBeInTheDocument();
    });
  });

  it('should render UNO cards', () => {
    jest.spyOn(cardStyleUtils, 'defaultCardStyleFactory').mockReturnValue({ dimensions: { width: 53, height: 86 } });

    const unoCard: UnoCard = { id: '1', type: 'UnoCard', value: '0', color: 'green' };
    const { getByTestId } = render(<Table height={400} width={600} />, {
      initialState: {
        table: {
          cards: {
            2: {
              cards: unoCard,
              isFaceUp: false,
              position: { x: 0, y: 0 },
            },
          },
        },
      },
    });

    const card = getByTestId('UnoCard-Backface');
    expect(card).toBeInTheDocument();
  });

  it('should update card position on table when it is dragged', () => {
    const dispatchSpy = jest.fn();
    jest.spyOn(reactRedux, 'useDispatch').mockReturnValue(dispatchSpy);

    const { getByTestId } = render(<Table height={400} width={600} />, {
      initialState: {
        table: {
          cards: {
            2: {
              cards: { id: '2', type: 'PlayingCard', suit: PlayingCardSuit.Spades, name: PlayingCardName.Two },
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
              cards: { id: '2', type: 'PlayingCard', suit: PlayingCardSuit.Spades, name: PlayingCardName.Two },
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
    const customCardStyleFn = jest.fn((a: Card, b?: CardTypeStyle) => b as CardTypeStyle);
    describe('on rendering PlayingCards', () => {
      let getByTestId;
      let getAllByTestId;
      const cards: PlayingCard[] = [
        { id: '1', type: 'PlayingCard', suit: PlayingCardSuit.Spades, name: PlayingCardName.Two },
      ];
      beforeEach(() => {
        customCardStyleFn.mockReset();
        customCardStyleFn.mockReturnValue({
          dimensions: { width: 2, height: 2 },
        });
        jest
          .spyOn(cardStyleUtils, 'defaultCardStyleFactory')
          .mockReturnValue({ dimensions: { width: 53, height: 86 } });
        const rootRender = render(<Table height={400} width={600} customCardStyle={customCardStyleFn} />, {
          initialState: {
            table: {
              cards: {
                2: {
                  cards,
                  isFaceUp: false,
                  position: { x: 0, y: 0 },
                },
              },
            },
          },
        });
        getByTestId = rootRender.getByTestId;
        getAllByTestId = rootRender.getAllByTestId;
      });

      it('should render a card pile', () => {
        const cardPile = getByTestId('CardPile');
        expect(cardPile).toBeInTheDocument();
        expect(cardPile).toHaveStyle('width: 53px');
        expect(cardPile).toHaveStyle('height: 86px');
      });

      it('should render PlayingCards', () => {
        const playingCards = getAllByTestId('PlayingCardFrontFace');
        expect(playingCards).not.toHaveLength(0);
      });
    });

    it('should render UNO card pile', () => {
      const cards: UnoCard[] = [{ id: '1', type: 'UnoCard', value: '0', color: 'blue' }];
      const { getAllByTestId } = render(<Table height={400} width={600} />, {
        initialState: {
          table: {
            cards: {
              2: {
                cards,
                isFaceUp: false,
                position: { x: 0, y: 0 },
              },
            },
          },
        },
      });
      const unoCards = getAllByTestId('UnoCard-Backface');
      expect(unoCards).not.toHaveLength(0);
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
                  { id: '5', type: 'PlayingCard', suit: PlayingCardSuit.Spades, name: PlayingCardName.Two },
                  { id: '7', type: 'PlayingCard', suit: PlayingCardSuit.Hearts, name: PlayingCardName.Three },
                  { id: '14', type: 'PlayingCard', suit: PlayingCardSuit.Diamonds, name: PlayingCardName.Four },
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
                  { id: '31', type: 'PlayingCard', suit: PlayingCardSuit.Spades, name: PlayingCardName.Two },
                  { id: '41', type: 'PlayingCard', suit: PlayingCardSuit.Hearts, name: PlayingCardName.Three },
                  { id: '61', type: 'PlayingCard', suit: PlayingCardSuit.Diamonds, name: PlayingCardName.Four },
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

    it('should dispatch an action to update card deck position on table when it is dragged', () => {
      const dispatchSpy = jest.fn();
      jest.spyOn(reactRedux, 'useDispatch').mockReturnValue(dispatchSpy);

      const { getByTestId } = render(<Table height={400} width={600} />, {
        initialState: {
          table: {
            cards: {
              5: {
                cards: [{ id: '1', type: 'PlayingCard', suit: PlayingCardSuit.Spades, name: PlayingCardName.Two }],
                isFaceUp: false,
                position: { x: 0, y: 0 },
              },
            },
          },
        },
      });

      const cardPile = getByTestId('CardPile');

      fireEvent.mouseDown(cardPile, { clientX: 34, clientY: 55 });
      fireEvent.mouseMove(cardPile, { clientX: 54, clientY: 66 });
      fireEvent.mouseUp(cardPile);

      expect(dispatchSpy).toHaveBeenCalledWith({
        payload: { cardId: '5', position: { x: 20, y: 11 } },
        type: 'table/updateCardPosition',
      });
    });
  });

  describe('when using customRenderers', () => {
    const customRenderFnSpy = jest.fn((_a: { card: Card; isBack?: boolean; currentElement?: JSX.Element }) => (
      <div data-testid="SPY-FACE" />
    ));
    const cards: PlayingCard[] = [
      { id: '1', type: 'PlayingCard', suit: PlayingCardSuit.Spades, name: PlayingCardName.Two },
    ];
    let getAllByTestId;

    beforeEach(() => {
      jest.spyOn(cardStyleUtils, 'defaultCardStyleFactory').mockReturnValue({ dimensions: { width: 53, height: 86 } });
      customRenderFnSpy.mockReset();
      customRenderFnSpy.mockReturnValue(<div data-testid="SPY-FACE" />);
      const rootRender = render(<Table height={400} width={600} customCardRenderer={customRenderFnSpy} />, {
        initialState: {
          table: {
            cards: {
              2: {
                cards,
                isFaceUp: false,
                position: { x: 0, y: 0 },
              },
            },
          },
        },
      });
      getAllByTestId = rootRender.getAllByTestId;
    });

    it('should call custom renderer with correct parameters', () => {
      const firstCall = customRenderFnSpy.mock.calls[0];
      expect(firstCall[0].card).toBe(cards[0]);
      expect(firstCall[0].currentElement).toBeDefined();
    });

    it('should render return from customRenderer', () => {
      expect(getAllByTestId('SPY-FACE')).not.toHaveLength(0);
    });
  });
});
