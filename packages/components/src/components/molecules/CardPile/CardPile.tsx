/* eslint-disable max-lines */
import { CardPileMenu } from '@atoms/CardPileMenu';
import { Overlay } from '@atoms/Overlay';
import { BaseCard } from '@atoms/BaseCard';
import { PlayingCardFace } from '@atoms/PlayingCardFace';
import { CardProps } from '@models/CardProps';
import { shuffleArray } from '@utils/array-utils';
import classnames from 'classnames';
import React, { FC, KeyboardEvent, useMemo, useState } from 'react';
import { createUseStyles } from 'react-jss';
import { v4 as uuid } from 'uuid';

/** Describes the properties for card pile */
export interface CardPileProps<T extends CardProps = CardProps> {
  /** The cards metadata */
  cards: T[];
  /** The component function to be used for rendering */
  component?: FC<T>;
  /** The component function to be used for back face rendering */
  backFace?: FC;
  /** Boolean indicating if first card of the pile is face up */
  isFaceUp?: boolean;
  /** Function called when first card of the pile flips */
  onCardFlipped?: (isFaceUp: boolean) => void;
}

const useStyles = createUseStyles({
  cardPile: {
    display: 'grid',
    gridTemplateColumns: '1fr',
    gridTemplateRows: '1fr',
    width: 171,
    margin: '0 auto',
    position: 'relative',
    cursor: 'pointer',
  },
  multiItem: {
    '&:before': {
      width: 90,
      height: '97%',
      content: '""',
      position: 'absolute',
      background: 'repeating-linear-gradient( to right, #a2a2a2, #808080 2px, #c5c5c5 4px, #c5c5c5 0px)',
      right: -8,
      border: 'solid 1px black',
      borderRadius: '12px',
    },
  },
  firstItem: { zIndex: 2 },
  lastItem: { zIndex: 1 },
  card: {
    gridArea: '1 / 1 / 1 / 1',
  },
  cardPileMenu: {
    position: 'absolute',
    left: '-100%',
  },
});

// eslint-disable-next-line import/prefer-default-export
export const CardPile: FC<CardPileProps> = ({
  cards,
  isFaceUp = false,
  component = BaseCard,
  backFace = PlayingCardFace,
  onCardFlipped = () => {},
}) => {
  const classes = useStyles();
  const [pileCards, setPileCards] = useState(cards);
  const [isSelected, setSelect] = useState(false);

  const thisCard: CardProps | undefined = pileCards[0];
  const displayedCard = useMemo(() => {
    const TagName = component;
    const cardProps: CardProps = {
      ...thisCard,
      disableNativeEvents: true,
    };
    return !thisCard ? undefined : (
      <div data-testid="CardPile_card" key={uuid()} className={classnames(classes.card, classes.firstItem)}>
        {/* eslint-disable-next-line react/jsx-props-no-spreading */}
        <TagName {...cardProps} />
      </div>
    );
  }, [thisCard, classes, component]);

  const backFaceComponent = useMemo(() => {
    const BackFaceTagName = backFace;
    return pileCards.length <= 1 ? undefined : (
      <div data-testid="CardPile-backface" className={classnames(classes.card, classes.lastItem)}>
        <BackFaceTagName />
      </div>
    );
  }, [pileCards.length, classes, backFace]);

  const toggleSelect = () => {
    setSelect(!isSelected);
  };
  const onPileClick = () => toggleSelect();
  const onPileKeyDown = (event: KeyboardEvent<HTMLDivElement>) => event.keyCode === 32 && toggleSelect();
  const onShuffle = () => {
    const newPile = shuffleArray(pileCards);
    setPileCards(newPile);
  };

  return (
    <div
      data-testid="CardPile"
      role="button"
      tabIndex={0}
      onClick={onPileClick}
      onKeyDown={onPileKeyDown}
      className={classnames(classes.cardPile, { [classes.multiItem]: pileCards.length > 1 })}
    >
      {isSelected && (
        <>
          <Overlay />
          <div className={classes.cardPileMenu}>
            <CardPileMenu onTurnFirstCard={() => onCardFlipped(!isFaceUp)} onShufflePile={onShuffle} />
          </div>
        </>
      )}
      {displayedCard}
      {backFaceComponent}
    </div>
  );
};
