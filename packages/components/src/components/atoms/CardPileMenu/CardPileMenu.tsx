import React, { FC, KeyboardEvent, MouseEvent } from 'react';
import { createUseStyles } from 'react-jss';

/** Describes the props for the component */
export interface CardPileMenuProps {
  /** Event handler when turn first card is triggered */
  onTurnFirstCard?: () => void;
  /** Event handler when shuffle pile is triggered */
  onShufflePile?: () => void;
  /**
   * Event handler when removing the first card triggered
   * @param cardIndex the index the card to be removed starting on zero. If negative, the count is backwards (e.g. -1 corresponds to the last card).
   * */
  onRemoveCard?: (cardIndex: number) => void;
}

const useStyles = createUseStyles({
  menu: {
    listStyle: 'none',
  },
});

export const CardPileMenu: FC<CardPileMenuProps> = ({ onTurnFirstCard, onShufflePile, onRemoveCard }) => {
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

  const onRemoveFirstCardEvent = (e: MouseEvent | KeyboardEvent) => {
    e.stopPropagation();
    if (onRemoveCard) {
      onRemoveCard(0);
    }
  };

  const onRemoveLastCardEvent = (e: MouseEvent | KeyboardEvent) => {
    e.stopPropagation();
    if (onRemoveCard) {
      onRemoveCard(-1);
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
      <li>
        <button type="button" onClick={onRemoveFirstCardEvent} onKeyDown={onRemoveFirstCardEvent}>
          Remove first card
        </button>
      </li>
      <li>
        <button type="button" onClick={onRemoveLastCardEvent} onKeyDown={onRemoveLastCardEvent}>
          Remove last card
        </button>
      </li>
    </ul>
  );
};
