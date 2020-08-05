import React from 'react';
import { render } from '@testing-library/react';
import HomePage from './HomePage';

describe('HomePage', () => {
  it('should render home page', () => {
    const { getByText } = render(<HomePage />);
    const divElement = getByText(/I am on homepage/i);
    expect(divElement).toBeInTheDocument();
  });
});
