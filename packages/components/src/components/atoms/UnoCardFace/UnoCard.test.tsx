import React from 'react';
import { cleanup, render } from '@testing-library/react';
import { UnoCard, UnoCardValue } from '@models/UnoCard';
import { UnoCardFace } from './UnoCardFace';

describe('UnoCardFace', () => {
  let card: UnoCard;
  afterEach(() => {
    cleanup();

    card = { id: '1', type: 'UnoCard', value: '0', color: 'blue' };
  });

  it('should display back face', () => {
    const { getByTestId } = render(<UnoCardFace card={card} />);
    expect(getByTestId('UnoCard-Backface')).toBeInTheDocument();
  });

  it.each([
    ['joker', 'Joker'],
    ['plus4', 'Plus4'],
    ['plus2', 'Plus2'],
    ['reverse', 'Reverse'],
    ['jump', 'Jump'],
    ['0', '0'],
    ['1', '1'],
    ['2', '2'],
    ['3', '3'],
    ['4', '4'],
    ['5', '5'],
    ['6', '6'],
    ['7', '7'],
    ['8', '8'],
    ['9', '9'],
  ])('should display %s', (value: UnoCardValue, expected) => {
    const { getByTestId } = render(<UnoCardFace card={{ ...card, value }} />);
    expect(getByTestId(`UnoCard-${expected}`)).toBeInTheDocument();
  });
});
