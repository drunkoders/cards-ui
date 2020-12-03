import type { Card } from '@models/Card';

export enum PlayingCardSuit {
  Spades = 'Spades',
  Hearts = 'Hearts',
  Diamonds = 'Diamonds',
  Clubs = 'Clubs',
}

export enum PlayingCardName {
  Ace = '1',
  Two = '2',
  Three = '3',
  Four = '4',
  Five = '5',
  Six = '6',
  Seven = '7',
  Eight = '8',
  Nine = '9',
  Ten = '10',
  Jack = 'Jack',
  Queen = 'Queen',
  King = 'King',
}

const PLAYING_CARD_TYPE = 'PlayingCard' as const;
export interface PlayingCard extends Card {
  type: typeof PLAYING_CARD_TYPE;
  name: PlayingCardName;
  suit: PlayingCardSuit;
}

export const isPlayingCard = (card: Card): card is PlayingCard => card.type === PLAYING_CARD_TYPE;
