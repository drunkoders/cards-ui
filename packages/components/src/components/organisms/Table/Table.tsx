import React, { FunctionComponent, useCallback, useEffect } from 'react';
import { createUseStyles } from 'react-jss';
import { Position } from '@models/Position';

import { useDispatch, useSelector } from 'react-redux';
import { initCards, updateCardFaceUp, updateCardPosition } from '@store/slices/table';
import { RootState } from '@store/index';
import { PlayingCardType } from '@models/PlayingCardType';
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

const initialCards: PlayingCardType[] = ['spades_1'];

// eslint-disable-next-line import/prefer-default-export
export const Table: FunctionComponent<TableProps> = ({ height, width }) => {
  const classes = useStyles({ height, width });

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initCards({ cards: initialCards }));
  }, [dispatch]);

  const handleDraggedCard = useCallback(
    (position: Position, cardId: PlayingCardType) => {
      dispatch(updateCardPosition({ position, cardId }));
    },
    [dispatch]
  );

  const handleFlippedCard = useCallback(
    (isFaceUp: boolean, cardId: PlayingCardType) => {
      dispatch(updateCardFaceUp({ isFaceUp, cardId }));
    },
    [dispatch]
  );

  const { width: cardWidth, height: cardHeight } = calculateCardDimensions(defaultCardDimensions, { width, height });

  const cards = useSelector((state: RootState) => state.table.cards);

  return (
    <div className={classes.table} data-testid="Table">
      {Object.values(cards).map((cardState) => (
        <BaseCard
          key={cardState.card}
          height={cardHeight}
          width={cardWidth}
          boundaries={{ width, height }}
          frontFace={<PlayingCardFrontFace card={cardState.card} />}
          backFace={<PlayingCardBackFace />}
          faceUp={cardState.isFaceUp}
          position={cardState.position}
          onPositionChanged={(e) => handleDraggedCard(e, cardState.card)}
          onFlipped={(isFaceUp) => handleFlippedCard(isFaceUp, cardState.card)}
        />
      ))}
    </div>
  );
};
