import React, { FC, KeyboardEvent, MouseEvent } from 'react';
import { createUseStyles } from 'react-jss';

/** Describes the props for the component */
export interface CardPileMenuProps {
  /** Event handler when turn first card is triggered */
  onTurnFirstCard?: () => void;
  /** Event handler when shuffle pile is triggered */
  onShufflePile?: () => void;
}

const useStyles = createUseStyles({
  menu: {
    listStyle: 'none',
  },
});

export const CardPileMenu: FC<CardPileMenuProps> = ({ onTurnFirstCard, onShufflePile }) => {
  const { menu } = useStyles();

  const onTurnFirstCardEvent = (e: MouseEvent | KeyboardEvent) => {
    e.stopPropagation();
    if (onTurnFirstCard) {
      onTurnFirstCard();
    }
  };

  const onShufflePileEvent = (e: MouseEvent | KeyboardEvent) => {
    e.stopPropagation();
    if (onShufflePile) {
      onShufflePile();
    }
  };

  return (
    <ul className={menu}>
      <li>
        <button type="button" onClick={onTurnFirstCardEvent} onKeyDown={onTurnFirstCardEvent}>
          Turn first card
        </button>
      </li>
      <li>
        <button type="button" onClick={onShufflePileEvent} onKeyDown={onShufflePileEvent}>
          Shuffle pile
        </button>
      </li>
    </ul>
  );
};
