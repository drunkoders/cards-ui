import type { Card } from '@models/Card';

// eslint-disable-next-line no-shadow
export enum PlayingCardSuit {
  Spades = 'Spades',
  Hearts = 'Hearts',
  Diamonds = 'Diamonds',
  Clubs = 'Clubs',
}

// eslint-disable-next-line no-shadow
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

export interface PlayingCard extends Card {
  name: PlayingCardName;
  suit: PlayingCardSuit;
}