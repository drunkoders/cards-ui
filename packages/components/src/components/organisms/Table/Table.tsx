/* eslint-disable max-lines */
import { BaseCard } from '@atoms/BaseCard';
import { Card } from '@models/Card';
import { CardRenderer } from '@models/CardRenderer';
import { Position } from '@models/Position';
import { CardFaceRenderer } from '@molecules/CardFaceRenderer';
import { CardPile } from '@molecules/CardPile';
import { RootState } from '@store/index';
import { setTableDimensions, shuffleCardDeck, updateCardFaceUp, updateCardPosition } from '@store/slices/table';
import React, { FunctionComponent, useCallback, useEffect } from 'react';
import { createUseStyles } from 'react-jss';
import { useDispatch, useSelector } from 'react-redux';
import { CustomCardSytleFn, CardTypeStyle, getCardStyleFn } from '@utils/card-style';

interface TableProps {
  /** height of the table */
  height: number;
  /** width of the table */
  width: number;
  /** custom renderers for card types */
  customCardRenderer?: CardRenderer;
  /** custom style per card type */
  customCardStyle?: CustomCardSytleFn;
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
    (cards: Card | Card[]): CardTypeStyle => getCardStyleFn(cards, { width, height }, customCardStyle),
    [customCardStyle, width, height]
  );

  const { cards } = useSelector((state: RootState) => state.table);

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
              frontFace={<CardFaceRenderer card={cardState.cards?.[0]} customCardRenderer={customCardRenderer} />}
              backFace={<CardFaceRenderer card={cardState.cards?.[0]} isBack customCardRenderer={customCardRenderer} />}
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
              frontFace={<CardFaceRenderer card={cardState.cards} customCardRenderer={customCardRenderer} />}
              backFace={<CardFaceRenderer card={cardState.cards} isBack customCardRenderer={customCardRenderer} />}
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
