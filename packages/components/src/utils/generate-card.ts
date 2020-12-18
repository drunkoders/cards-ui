import { allPlayingCardNames, allPlayingCardSuits, PlayingCard } from '@models/PlayingCard';
import { AllUnoColors, AllUnoValues, UnoCard } from '@models/UnoCard';
import { v4 as uuid } from 'uuid';

export const generateRandomPlayingCard = (): PlayingCard => {
  const randomNameIndex = Math.round(Math.random() * 100) % allPlayingCardNames.length;
  const randomSuitIndex = Math.round(Math.random() * 100) % allPlayingCardSuits.length;

  const name = allPlayingCardNames[randomNameIndex];
  const suit = allPlayingCardSuits[randomSuitIndex];

  return { type: 'PlayingCard', name, suit, id: uuid() };
};

export const generateRandomUnoCard = (): UnoCard => {
  const randomValueIndex = Math.round(Math.random() * 100) % AllUnoValues.length;
  const randomColorsIndex = Math.round(Math.random() * 100) % AllUnoColors.length;

  const value = AllUnoValues[randomValueIndex];
  const color = AllUnoColors[randomColorsIndex];

  return { type: 'UnoCard', value, color, id: uuid() };
};
