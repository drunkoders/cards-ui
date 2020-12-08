/* eslint-disable max-lines */
import React, { FunctionComponent, useCallback, useEffect } from 'react';
import { createUseStyles } from 'react-jss';
import { Position } from '@models/Position';

import { useDispatch, useSelector } from 'react-redux';
import { setTableDimensions, shuffleCardDeck, updateCardFaceUp, updateCardPosition } from '@store/slices/table';
import { RootState } from '@store/index';
import { calculateCardDimensions } from '@utils/card-dimensions';
import { BaseCard } from '@atoms/BaseCard';
import { PlayingCardFrontFace } from '@atoms/PlayingCardFrontFace';
import { PlayingCardBackFace } from '@atoms/PlayingCardBackFace';
import { CardPile } from '@molecules/CardPile';
import { isPlayingCard } from '@models/PlayingCard';
import { CardRenderer } from '@models/CardRenderer';
import { Card } from '@models/Card';
import { isUnoCard } from '@models/UnoCard';
import { UnoCardFace, UNO_CARD_DIMENSIONS } from '@atoms/UnoCardFace';
import { PLAYING_CARD_DIMENSIONS } from '@atoms/SvgPlayingCard';
import { Dimensions } from '@models/Dimensions';

interface CardTypeStyle {
  /** Default card height - used to calculate card ratio */
  dimensions: Dimensions;
  /** Card border radius */
  borderRadius?: number;
}

interface TableProps {
  /** height of the table */
  height: number;
  /** width of the table */
  width: number;
  /** custom renderers for card types */
  customCardRenderer?: CardRenderer;
  /** custom style per card type */
  customCardStyle?: (card: Card, currentStyle?: CardTypeStyle) => CardTypeStyle;
}

const useStyles = createUseStyles({
  table: ({ height, width }) => ({
    height,
    width,
    background: 'green',
    display: 'flex',
    position: 'relative',
    overflow: 'hidden',
  }),
});

export const Table: FunctionComponent<TableProps> = ({ height, width, customCardRenderer, customCardStyle }) => {
  const classes = useStyles({ height, width });

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setTableDimensions({ width, height }));
  }, [dispatch, height, width]);

  const handleDraggedCard = useCallback(
    (position: Position, cardId: string) => {
      dispatch(updateCardPosition({ position, cardId }));
    },
    [dispatch]
  );

  const handleFlippedCard = useCallback(
    (isFaceUp: boolean, cardId: string) => {
      dispatch(updateCardFaceUp({ isFaceUp, cardId }));
    },
    [dispatch]
  );

  const handleShuffle = useCallback(
    (cardId: string) => {
      dispatch(shuffleCardDeck(cardId));
    },
    [dispatch]
  );

  const getCardStyle = useCallback(
    (cards: Card | Card[]): CardTypeStyle => {
      const thisCard: Card = Array.isArray(cards) ? cards[0] : cards;

      let cardStyle: CardTypeStyle;
      if (isPlayingCard(thisCard)) {
        cardStyle = {
          dimensions: PLAYING_CARD_DIMENSIONS,
        };
      } else if (isUnoCard(thisCard)) {
        cardStyle = {
          dimensions: UNO_CARD_DIMENSIONS,
          borderRadius: 12,
        };
      }

      if (customCardStyle) {
        cardStyle = customCardStyle(thisCard, cardStyle);
      }

      return {
        ...cardStyle,
        dimensions: calculateCardDimensions(cardStyle.dimensions, { width, height }),
      };
    },
    [customCardStyle, width, height]
  );

  const { cards } = useSelector((state: RootState) => state.table);

  const cardRenderer: CardRenderer = useCallback(
    (data) => {
      let elem: JSX.Element;
      if (isUnoCard(data.card)) {
        elem = data.isBack ? <UnoCardFace /> : <UnoCardFace card={data.card} />;
      } else if (isPlayingCard(data.card)) {
        elem = data.isBack ? <PlayingCardBackFace /> : <PlayingCardFrontFace card={data.card} />;
      }

      if (customCardRenderer) {
        elem = customCardRenderer({ ...data, currentElement: elem });
      }

      return elem;
    },
    [customCardRenderer]
  );

  return (
    <div className={classes.table} data-testid="Table">
      {Object.entries(cards)
        .filter(([_, cardState]) => !Array.isArray(cardState.cards) || cardState.cards.length > 0)
        .map(([cardId, cardState]) => {
          const cardStyle = getCardStyle(cardState.cards);

          return Array.isArray(cardState.cards) ? (
            <CardPile
              key={cardId}
              width={cardStyle.dimensions.width}
              height={cardStyle.dimensions.height}
              borderRadius={cardStyle.borderRadius}
              tableBoundaries={{ width, height }}
              frontFace={cardRenderer({ card: cardState.cards?.[0] })}
              backFace={cardRenderer({ card: cardState.cards?.[0], isBack: true })}
              cards={cardState.cards as Card[]}
              position={cardState.position}
              isFaceUp={cardState.isFaceUp}
              onCardFlipped={(e) => handleFlippedCard(e, cardId)}
              onShuffle={() => handleShuffle(cardId)}
              onPositionChanged={(e) => handleDraggedCard(e, cardId)}
            />
          ) : (
            <BaseCard
              key={cardId}
              height={cardStyle.dimensions.height}
              width={cardStyle.dimensions.width}
              tableBoundaries={{ width, height }}
              frontFace={cardRenderer({ card: cardState.cards })}
              backFace={cardRenderer({ card: cardState.cards, isBack: true })}
              faceUp={cardState.isFaceUp}
              position={cardState.position}
              onPositionChanged={(e) => handleDraggedCard(e, cardId)}
              onFlipped={(isFaceUp) => handleFlippedCard(isFaceUp, cardId)}
            />
          );
        })}
    </div>
  );
};
