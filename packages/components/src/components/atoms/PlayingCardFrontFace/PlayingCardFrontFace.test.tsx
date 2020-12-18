import { cleanup, render } from '@testing-library/react';
import React from 'react';
import { PlayingCard } from '@models/PlayingCard';
import { PlayingCardFrontFace } from './PlayingCardFrontFace';

describe('PlayingCardFrontFace', () => {
  afterEach(() => {
    cleanup();
  });

  it('should render the front face of a given card', () => {
    const card: PlayingCard = {
      id: '1',
      type: 'PlayingCard',
      suit: 'hearts',
      name: '5',
    };

    const { getByTestId } = render(<PlayingCardFrontFace card={card} />);

    const frontFace = getByTestId('PlayingCardFrontFace');
    const [, useElement] = Array.from(frontFace.children);

    expect(useElement).toHaveAttribute('href', '#hearts_5');
  });
});
