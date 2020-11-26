import { PlayingCard, PlayingCardName, PlayingCardSuit } from '@models/PlayingCard';
import { v4 as uuid } from 'uuid';

type RandomCard = PlayingCard & { id: string };

export const generateRandomCard = (): RandomCard => {
  const names = Object.values(PlayingCardName);
  const randomNameIndex = Math.round(Math.random() * 100) % names.length;

  const suits = Object.values(PlayingCardSuit);
  const randomSuitIndex = Math.round(Math.random() * 100) % suits.length;

  const name = names[randomNameIndex];
  const suit = suits[randomSuitIndex];

  return { name, suit, id: uuid() };
};
