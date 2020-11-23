/* eslint-disable max-lines */
import { render } from '@utils/testing-utils';
import React from 'react';
import * as cardDimensionsUtils from '@utils/card-dimensions';
import { fireEvent } from '@testing-library/react';
import * as reactRedux from 'react-redux';
import { PlayingCardSuit, PlayingCardName } from '@models/PlayingCard';
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

  it('should render cards with dimensions depending on table dimensions', () => {
    jest.spyOn(cardDimensionsUtils, 'calculateCardDimensions').mockReturnValue({ width: 53, height: 86 });
    const { getByTestId } = render(<Table height={400} width={600} />, {
      initialState: {
        table: {
          cards: {
            2: {
              card: { id: '2', suit: PlayingCardSuit.Spades, name: PlayingCardName.Two },
              isFaceUp: false,
              position: { x: 0, y: 0 },
            },
          },
        },
      },
    });

    const card = getByTestId('Draggable'); // TODO improve test id

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
              card: { id: '2', suit: PlayingCardSuit.Spades, name: PlayingCardName.Two },
              isFaceUp: false,
              position: { x: 0, y: 0 },
            },
          },
        },
      },
    });

    const card = getByTestId('Draggable'); // TODO improve test id

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
              card: { id: '2', suit: PlayingCardSuit.Spades, name: PlayingCardName.Two },
              isFaceUp: false,
              position: { x: 0, y: 0 },
            },
          },
        },
      },
    });

    const card = getByTestId('Draggable'); // TODO improve test id

    fireEvent.click(card);

    expect(dispatchSpy).toHaveBeenCalledWith({
      payload: { cardId: '2', isFaceUp: true },
      type: 'table/updateCardFaceUp',
    });
  });
});
