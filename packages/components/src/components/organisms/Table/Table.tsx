import React, { FunctionComponent, useEffect } from 'react';
import { createUseStyles } from 'react-jss';
import { Position } from '@models/Position';
import { PlayingCard as PlayingCardComponent } from '@atoms/PlayingCard';

import { useDispatch, useSelector } from 'react-redux';
import { initCards, updateCardPosition } from '@store/slices/table';
import { RootState } from '@store/index';
import { PlayingCardType } from '@models/PlayingCardType';

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

  const handleDraggedCard = (position: Position, cardId: PlayingCardType) => {
    dispatch(updateCardPosition({ position, cardId }));
  };

  const cards = useSelector((state: RootState) => state.table.cards);

  return (
    <div className={classes.table} data-testid="Table">
      {Object.values(cards).map((cardState) => (
        <PlayingCardComponent
          key={cardState.card}
          position={cardState.position}
          boundaries={{ width, height }}
          card={cardState.card}
          onPositionChanged={(e) => handleDraggedCard(e, cardState.card)}
        />
      ))}
    </div>
  );
};
