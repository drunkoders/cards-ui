import { PlayingCard, PlayingCardName, PlayingCardSuit } from '@models/PlayingCard';
import { v4 as uuid } from 'uuid';
import { Deck } from '@models/Deck';
import { ALL_UNO_COLORS, ALL_UNO_VALUES, UnoCard, UnoCardColor } from '@models/UnoCard';
import { shuffleArray } from './array-utils';

export const generateRandomPlayingCardDeck = (): Deck<PlayingCard> => {
  const names = Object.values(PlayingCardName);
  const suits = Object.values(PlayingCardSuit);

  const cardDeck: PlayingCard[] = suits.flatMap((suit) => {
    return names.map((name) => {
      return { type: 'PlayingCard', name, suit, id: uuid() };
    });
  });

  return { cards: shuffleArray(cardDeck), id: uuid() };
};

export const generateRandomUnoCardDeck = (): Deck<UnoCard> => {
  const cardDeck: UnoCard[] = ALL_UNO_COLORS.flatMap((color: UnoCardColor) => {
    return ALL_UNO_VALUES.map((value) => {
      return { type: 'UnoCard', value, color, id: uuid() };
    });
  });

  return { cards: shuffleArray(cardDeck), id: uuid() };
};
