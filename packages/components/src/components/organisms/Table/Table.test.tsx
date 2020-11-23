import { render } from '@utils/testing-utils';
import React from 'react';
import { Table } from './Table';

describe('Table', () => {
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
});
