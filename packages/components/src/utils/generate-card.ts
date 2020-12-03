import { PlayingCard, PlayingCardName, PlayingCardSuit } from '@models/PlayingCard';
import { ALL_UNO_COLORS, ALL_UNO_VALUES, UnoCard } from '@models/UnoCard';
import { v4 as uuid } from 'uuid';

export const generateRandomPlayingCard = (): PlayingCard => {
  const names = Object.values(PlayingCardName);
  const randomNameIndex = Math.round(Math.random() * 100) % names.length;

  const suits = Object.values(PlayingCardSuit);
  const randomSuitIndex = Math.round(Math.random() * 100) % suits.length;

  const name = names[randomNameIndex];
  const suit = suits[randomSuitIndex];

  return { type: 'PlayingCard', name, suit, id: uuid() };
};

export const generateRandomUnoCard = (): UnoCard => {
  const randomValueIndex = Math.round(Math.random() * 100) % ALL_UNO_VALUES.length;
  const randomColorsIndex = Math.round(Math.random() * 100) % ALL_UNO_COLORS.length;

  const value = ALL_UNO_VALUES[randomValueIndex];
  const color = ALL_UNO_COLORS[randomColorsIndex];

  return { type: 'UnoCard', value, color, id: uuid() };
};
