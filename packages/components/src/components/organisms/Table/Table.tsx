import React, { FunctionComponent, useCallback, useEffect } from 'react';
import { createUseStyles } from 'react-jss';
import { Position } from '@models/Position';

import { useDispatch, useSelector } from 'react-redux';
import { setTableDimensions, updateCardFaceUp, updateCardPosition } from '@store/slices/table';
import { RootState } from '@store/index';
import { calculateCardDimensions, defaultCardDimensions } from '@utils/card-dimensions';
import { BaseCard } from '@atoms/BaseCard';
import { PlayingCardFrontFace } from '@atoms/PlayingCardFrontFace';
import { PlayingCardBackFace } from '@atoms/PlayingCardBackFace';

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

  const { width: cardWidth, height: cardHeight } = calculateCardDimensions(defaultCardDimensions, { width, height });

  const { cards } = useSelector((state: RootState) => state.table);
  const tableCards = Object.values(cards);

  return (
    <div className={classes.table} data-testid="Table">
      {tableCards.map((cardState) => {
        return (
          <BaseCard
            key={cardState.card.id}
            height={cardHeight}
            width={cardWidth}
            boundaries={{ width, height }}
            frontFace={
              <PlayingCardFrontFace
                card={`${cardState.card.suit.toLowerCase()}_${cardState.card.name.toLowerCase()}`}
              />
            }
            backFace={<PlayingCardBackFace />}
            faceUp={cardState.isFaceUp}
            position={cardState.position}
            onPositionChanged={(e) => handleDraggedCard(e, cardState.card.id)}
            onFlipped={(isFaceUp) => handleFlippedCard(isFaceUp, cardState.card.id)}
          />
        );
      })}
    </div>
  );
};
