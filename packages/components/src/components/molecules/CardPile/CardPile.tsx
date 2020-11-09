/* eslint-disable max-lines */
import { CardPileMenu } from '@atoms/CardPileMenu';
import { Overlay } from '@atoms/Overlay';
import { PlayingCard } from '@atoms/PlayingCard';
import { PlayingCardFace } from '@atoms/PlayingCardFace';
import { CardHandle } from '@models/CardHandle';
import { CardProps } from '@models/CardProps';
import { shuffleArray } from '@utils/array-utils';
import classnames from 'classnames';
import React, { FC, KeyboardEvent, useMemo, useRef, useState } from 'react';
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
export const CardPile: FC<CardPileProps> = ({ cards, component = PlayingCard, backFace = PlayingCardFace }) => {
  const classes = useStyles();
  const [pileCards, setPileCards] = useState(cards);
  const [isSelected, setSelect] = useState(false);

  const firstCardRef = useRef<CardHandle>(null);
  const TagName = component;
  const BackFaceTagName = backFace;

  const thisCard: CardProps | undefined = pileCards[0];
  const displayedCard = useMemo(() => {
    const cardProps: CardProps = {
      ...thisCard,
      disableNativeEvents: true,
    };
    return !thisCard ? undefined : (
      <div data-testid="CardPile_card" key={uuid()} className={classnames(classes.card, classes.firstItem)}>
        {/* eslint-disable-next-line react/jsx-props-no-spreading */}
        <TagName {...cardProps} ref={firstCardRef} />
      </div>
    );
  }, [thisCard, classes]);

  const backFaceComponent = useMemo(() => {
    return pileCards.length <= 1 ? undefined : (
      <div data-testid="CardPile-backface" className={classnames(classes.card, classes.lastItem)}>
        <BackFaceTagName />
      </div>
    );
  }, [pileCards.length, classes]);

  const toggleSelect = () => {
    setSelect(!isSelected);
  };
  const onPileClick = () => toggleSelect();
  const onPileKeyDown = (event: KeyboardEvent<HTMLDivElement>) => event.keyCode === 32 && toggleSelect();
  const onTurnFirstCard = () => firstCardRef.current?.flip();
  const onShuffle = () => {
    firstCardRef.current?.flip(false);
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
            <CardPileMenu onTurnFirstCard={onTurnFirstCard} onShufflePile={onShuffle} />
          </div>
        </>
      )}
      {displayedCard}
      {backFaceComponent}
    </div>
  );
};
