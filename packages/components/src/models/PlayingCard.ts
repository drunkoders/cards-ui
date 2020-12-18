import type { Card } from '@models/Card';

export const allPlayingCardSuits = ['spades', 'hearts', 'diamonds', 'clubs'] as const;
export type PlayingCardSuit = typeof allPlayingCardSuits[number];

export const allPlayingCardNames = [
  '1',
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9',
  '10',
  'jack',
  'queen',
  'king',
] as const;
export type PlayingCardName = typeof allPlayingCardNames[number];

const PLAYING_CARD_TYPE = 'PlayingCard' as const;
export interface PlayingCard extends Card {
  type: typeof PLAYING_CARD_TYPE;
  name: PlayingCardName;
  suit: PlayingCardSuit;
}

export const isPlayingCard = (card: Card): card is PlayingCard => card.type === PLAYING_CARD_TYPE;
