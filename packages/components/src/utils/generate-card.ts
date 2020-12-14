import { PlayingCard, PlayingCardName, PlayingCardSuit } from '@models/PlayingCard';
import { AllUnoColors, AllUnoValues, UnoCard } from '@models/UnoCard';
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
  const randomValueIndex = Math.round(Math.random() * 100) % AllUnoValues.length;
  const randomColorsIndex = Math.round(Math.random() * 100) % AllUnoColors.length;

  const value = AllUnoValues[randomValueIndex];
  const color = AllUnoColors[randomColorsIndex];

  return { type: 'UnoCard', value, color, id: uuid() };
};
