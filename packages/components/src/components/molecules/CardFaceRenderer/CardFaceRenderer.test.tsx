import React from 'react';
import { render } from '@testing-library/react';
import { UnoCard } from '@models/UnoCard';
import { PlayingCard, PlayingCardName, PlayingCardSuit } from '@models/PlayingCard';
import { Card } from '@models/Card';
import { CardRenderer } from '@models/CardRenderer';
import { CardFaceRenderer } from './CardFaceRenderer';

describe('CardFaceRenderer', () => {
  const unoCard: UnoCard = {
    id: '1',
    type: 'UnoCard',
    value: '0',
    color: 'blue',
  };
  const playingCard: PlayingCard = {
    id: '2',
    type: 'PlayingCard',
    name: PlayingCardName.Ace,
    suit: PlayingCardSuit.Clubs,
  };
  it('should display an UnoCardFace', () => {
    const { getByTestId } = render(<CardFaceRenderer card={unoCard} />);
    expect(getByTestId('UnoCard-0')).toBeInTheDocument();
  });

  it('should display an UnoBackFace', () => {
    const { getByTestId } = render(<CardFaceRenderer card={unoCard} isBack />);
    expect(getByTestId('UnoCard-Backface')).toBeInTheDocument();
  });

  it('should display a PlayingFrontFace', () => {
    const { getByTestId } = render(<CardFaceRenderer card={playingCard} />);
    expect(getByTestId('PlayingCardFrontFace')).toBeInTheDocument();
  });

  it('should display a PlayingBackFace', () => {
    const { getByTestId } = render(<CardFaceRenderer card={playingCard} isBack />);
    expect(getByTestId('PlayingCardBackFace')).toBeInTheDocument();
  });

  describe('when using custom card renderer', () => {
    const customRenderer: CardRenderer = () => <div data-testid="custom-render">Test</div>;

    it('should call customRenderer with the correct params', () => {
      const spy = jest.fn(customRenderer);
      render(<CardFaceRenderer card={unoCard} customCardRenderer={spy} />);
      expect(spy).toBeCalled();
    });

    it('should display customRenderer result', () => {
      const { getByTestId } = render(<CardFaceRenderer card={unoCard} customCardRenderer={customRenderer} />);
      expect(getByTestId('custom-render')).toBeInTheDocument();
    });
  });
});
