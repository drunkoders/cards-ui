import { Card } from '@models/Card';
import { isPlayingCard } from '@models/PlayingCard';
import { isUnoCard } from '@models/UnoCard';
import { PlayingCardDimensions } from '@atoms/SvgPlayingCard';
import { UnoCardDimensions } from '@atoms/UnoCardFace';
import { Dimensions } from '@models/Dimensions';
import { calculateCardDimensions } from './card-dimensions';

export interface CardTypeStyle {
  /** Default card height - used to calculate card ratio */
  dimensions: Dimensions;
  /** Card border radius */
  borderRadius?: number;
}

export type CustomCardSytleFn = (card: Card, currentStyle?: CardTypeStyle) => CardTypeStyle;

/**
 * Returns the style for a given card type
 * @param cards the card that configures the type
 * @param tableDimentions the dimensions of the table
 * @param customCardStyle a custom fn for style
 */
export const getCardStyleFn = (
  cards: Card | Card[],
  tableDimentions: Dimensions,
  customCardStyle?: CustomCardSytleFn
): CardTypeStyle => {
  const thisCard: Card = Array.isArray(cards) ? cards[0] : cards;

  let cardStyle: CardTypeStyle;
  if (isPlayingCard(thisCard)) {
    cardStyle = {
      dimensions: PlayingCardDimensions,
    };
  } else if (isUnoCard(thisCard)) {
    cardStyle = {
      dimensions: UnoCardDimensions,
      borderRadius: 16,
    };
  }

  if (customCardStyle) {
    cardStyle = customCardStyle(thisCard, cardStyle);
  }

  return {
    ...cardStyle,
    dimensions: calculateCardDimensions(cardStyle.dimensions, tableDimentions),
  };
};
