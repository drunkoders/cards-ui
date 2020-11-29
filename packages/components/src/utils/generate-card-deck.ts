import { PlayingCard, PlayingCardName, PlayingCardSuit } from '@models/PlayingCard';
import { v4 as uuid } from 'uuid';
import { Deck } from '@models/Deck';
import { shuffleArray } from './array-utils';

export const generateRandomCardDeck = (): Deck<PlayingCard> => {
  const names = Object.values(PlayingCardName);
  const suits = Object.values(PlayingCardSuit);

  const cardDeck: PlayingCard[] = suits.flatMap((suit) => {
    return names.map((name) => {
      return { name, suit, id: uuid() };
    });
  });

  return { cards: shuffleArray(cardDeck), id: uuid() };
};
