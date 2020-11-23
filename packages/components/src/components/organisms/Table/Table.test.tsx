import { render } from '@utils/testing-utils';
import React from 'react';
import * as cardDimensionsUtils from '@utils/card-dimensions';
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
});
