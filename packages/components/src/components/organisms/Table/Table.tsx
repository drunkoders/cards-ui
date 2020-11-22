import React, { FunctionComponent, useEffect } from 'react';
import { createUseStyles } from 'react-jss';
import { Position } from '@models/Position';
import { PlayingCard as PlayingCardComponent } from '@atoms/PlayingCard';

import { useDispatch, useSelector } from 'react-redux';
import { initCardPositions, updateCardPosition } from '@store/slices/cards';
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

const cards: PlayingCardType[] = ['spades_1'];

// eslint-disable-next-line import/prefer-default-export
export const Table: FunctionComponent<TableProps> = ({ height, width }) => {
  const classes = useStyles({ height, width });

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initCardPositions({ cards }));
  }, [dispatch]);

  const handleDraggedCard = (position: Position, cardId: PlayingCardType) => {
    dispatch(updateCardPosition({ position, cardId }));
  };

  const positions = useSelector((state: RootState) => state.cards.positions);

  return (
    <div className={classes.table} data-testid="Table">
      {cards.map((card) => (
        <PlayingCardComponent
          key={card}
          position={positions[card]}
          boundaries={{ width, height }}
          card={card}
          onPositionChanged={(e) => handleDraggedCard(e, card)}
        />
      ))}
    </div>
  );
};
