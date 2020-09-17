import { render } from '@utils/testing-utils';
import React from 'react';
import { Table } from './Table';

describe('Table', () => {
  it('should render a Table', () => {
    const { getByTestId } = render(<Table height={400} width={600} />, { initialState: { cards: { positions: {} } } });
    const table = getByTestId('Table');
    expect(table).toBeInTheDocument();
  });
});
