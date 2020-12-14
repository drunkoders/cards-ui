import type { Card } from '@models/Card';

export const AllUnoColors = ['red', 'blue', 'green', 'yellow'] as const;
export type UnoCardColor = typeof AllUnoColors[number];

export const AllUnoValues = [
  '0',
  '1',
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9',
  'plus2',
  'plus4',
  'jump',
  'reverse',
  'joker',
] as const;
export type UnoCardValue = typeof AllUnoValues[number];

const UNO_CARD_TYPE = 'UnoCard' as const;
export interface UnoCard extends Card {
  type: typeof UNO_CARD_TYPE;
  value: UnoCardValue;
  color: UnoCardColor;
}

export const isUnoCard = (card: Card): card is UnoCard => card.type === UNO_CARD_TYPE;
