import { render } from '@utils/testing-utils';
import React from 'react';
import { HomePage } from './HomePage';

describe('HomePage', () => {
  it('should render home page', () => {
    const { getByText } = render(<HomePage />, { initialState: { cards: { positions: {} } } });
    const divElement = getByText(/Card UI/i);
    expect(divElement).toBeInTheDocument();
  });
});
