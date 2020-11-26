import React, { FunctionComponent, useCallback, useEffect } from 'react';
import { createUseStyles } from 'react-jss';
import { Position } from '@models/Position';

import { useDispatch, useSelector } from 'react-redux';
import { setTableDimensions, shuffleCardDeck, updateCardFaceUp, updateCardPosition } from '@store/slices/table';
import { RootState } from '@store/index';
import { calculateCardDimensions, defaultCardDimensions } from '@utils/card-dimensions';
import { BaseCard } from '@atoms/BaseCard';
import { PlayingCardFrontFace } from '@atoms/PlayingCardFrontFace';
import { PlayingCardBackFace } from '@atoms/PlayingCardBackFace';
import { CardPile } from '@molecules/CardPile';

interface TableProps {
  /** height of the table */
  height: number;
  /** width of the table */
  width: number;
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

export const Table: FunctionComponent<TableProps> = ({ height, width }) => {
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

  const { width: cardWidth, height: cardHeight } = calculateCardDimensions(defaultCardDimensions, { width, height });

  const { cards } = useSelector((state: RootState) => state.table);

  return (
    <div className={classes.table} data-testid="Table">
      {Object.entries(cards).map(([cardId, cardState]) => {
        return cardState.card ? (
          <BaseCard
            key={cardId}
            height={cardHeight}
            width={cardWidth}
            boundaries={{ width, height }}
            frontFace={<PlayingCardFrontFace card={cardState.card} />}
            backFace={<PlayingCardBackFace />}
            faceUp={cardState.isFaceUp}
            position={cardState.position}
            onPositionChanged={(e) => handleDraggedCard(e, cardId)}
            onFlipped={(isFaceUp) => handleFlippedCard(isFaceUp, cardId)}
          />
        ) : (
          <CardPile
            key={cardId}
            width={cardWidth}
            height={cardHeight}
            boundaries={{ width, height }}
            cards={cardState.cards}
            position={cardState.position}
            isFaceUp={cardState.isFaceUp}
            onCardFlipped={(e) => handleFlippedCard(e, cardId)}
            onShuffle={() => handleShuffle(cardId)}
          />
        );
      })}
    </div>
  );
};
