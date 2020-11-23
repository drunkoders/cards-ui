import { render } from '@utils/testing-utils';
import React from 'react';
import * as cardDimensionsUtils from '@utils/card-dimensions';
import { fireEvent } from '@testing-library/react';
import * as reactRedux from 'react-redux';
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

  it('should render cards with dimensions depending on table dimensions', () => {
    jest.spyOn(cardDimensionsUtils, 'calculateCardDimensions').mockReturnValue({ width: 53, height: 86 });
    const { getByTestId } = render(<Table height={400} width={600} />, { initialState: { table: { cards: {} } } });

    const card = getByTestId('Draggable'); // TODO improve test id

    expect(card).toHaveStyle('width: 53px');
    expect(card).toHaveStyle('height: 86px');
  });

  it('should update card position on table when it is dragged', () => {
    const dispatchSpy = jest.fn();
    jest.spyOn(reactRedux, 'useDispatch').mockReturnValue(dispatchSpy);

    const { getByTestId } = render(<Table height={400} width={600} />, {
      initialState: { table: { cards: { spades_2: { card: 'spades_2', isFaceUp: false, position: { x: 0, y: 0 } } } } },
    });

    const card = getByTestId('Draggable'); // TODO improve test id

    fireEvent.mouseDown(card, { clientX: 34, clientY: 55 });
    fireEvent.mouseMove(card, { clientX: 54, clientY: 66 });
    fireEvent.mouseUp(card);

    expect(dispatchSpy).toHaveBeenCalledWith({
      payload: { cardId: 'spades_2', position: { x: 20, y: 11 } },
      type: 'table/updateCardPosition',
    });
  });

  it('should update card face up on table when it is flipped', () => {
    const dispatchSpy = jest.fn();
    jest.spyOn(reactRedux, 'useDispatch').mockReturnValue(dispatchSpy);

    const { getByTestId } = render(<Table height={400} width={600} />, {
      initialState: { table: { cards: { spades_2: { card: 'spades_2', isFaceUp: false, position: { x: 0, y: 0 } } } } },
    });

    const card = getByTestId('Draggable'); // TODO improve test id

    fireEvent.click(card);

    expect(dispatchSpy).toHaveBeenCalledWith({
      payload: { cardId: 'spades_2', isFaceUp: true },
      type: 'table/updateCardFaceUp',
    });
  });
});
