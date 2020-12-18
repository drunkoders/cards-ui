import { allPlayingCardNames, allPlayingCardSuits, PlayingCard } from '@models/PlayingCard';
import { v4 as uuid } from 'uuid';
import { Deck } from '@models/Deck';
import { AllUnoColors, AllUnoValues, UnoCard, UnoCardColor } from '@models/UnoCard';
import { shuffleArray } from './array-utils';

export const generateRandomPlayingCardDeck = (): Deck<PlayingCard> => {
  const cardDeck: PlayingCard[] = allPlayingCardSuits.flatMap((suit) => {
    return allPlayingCardNames.map((name) => {
      return { type: 'PlayingCard', name, suit, id: uuid() };
    });
  });

  return { cards: shuffleArray(cardDeck), id: uuid() };
};

export const generateRandomUnoCardDeck = (): Deck<UnoCard> => {
  const cardDeck: UnoCard[] = AllUnoColors.flatMap((color: UnoCardColor) => {
    return AllUnoValues.map((value) => {
      return { type: 'UnoCard', value, color, id: uuid() };
    });
  });

  return { cards: shuffleArray(cardDeck), id: uuid() };
};
