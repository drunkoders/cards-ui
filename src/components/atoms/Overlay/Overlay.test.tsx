import React from 'react';
import { render } from '@testing-library/react';
import { Overlay } from './Overlay';

describe('Overlay', () => {
  it('should render', () => {
    expect(() => render(<Overlay />)).not.toThrow();
  });
});
