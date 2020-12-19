/* eslint-disable max-lines */
import { CardPileMenu } from '@atoms/CardPileMenu';
import { Overlay } from '@atoms/Overlay';
import { BaseCard } from '@atoms/BaseCard';
import React, { FunctionComponent, useState } from 'react';
import { createUseStyles } from 'react-jss';
import { Card } from '@models/Card';
import { Dimensions } from '@models/Dimensions';
import { Position } from '@models/Position';
import { PlayingCardBackFace } from '@atoms/PlayingCardBackFace';
import { PlayingCardFrontFace } from '@atoms/PlayingCardFrontFace';
import { PlayingCard } from '@models/PlayingCard';
import { Draggable } from '@templates/Draggable';

/** Describes the properties for card pile */
export interface CardPileProps {
  /** The deck of cards */
  cards: Card[];
  /** Element to show at card front face */
  frontFace?: JSX.Element;
  /** Element to show at card back face */
  backFace?: JSX.Element;
  /** Boolean indicating if first card of the pile is face up */
  isFaceUp?: boolean;
  /** Position of the card deck */
  position: Position;
  /** Width of the cards of the card deck */
  width: number;
  /** Height of the cards of the card deck */
  height: number;
  /** Border radius for non-rectangle cards */
  borderRadius?: number;
  /** Table boundaries, used to ensure card pile position stays within them */
  tableBoundaries?: Dimensions;
  /** Function called when first card of the pile flips */
  onCardFlipped?: (isFaceUp: boolean) => void;
  /** Function called when deck is shuffled */
  onShuffle?: () => void;
  /** Function called when card position changes with the new position of the card */
  onPositionChanged?: (position: Position) => void;
  /** Functionall called when card is removal */
  onCardRemoved?: (index: number) => void;
}

interface CardPileStyleProps {
  /** Width of the cards of the card deck */
  width: number;
  /** Height of the cards of the card deck */
  height: number;
  /** Border radius for non-rectangle cards */
  borderRadius?: number;
}

const useStyles = createUseStyles({
  cardPile: ({ width, height }: CardPileStyleProps) => ({
    width,
    height,
    margin: '0 auto',
  }),
  firstItem: { zIndex: 2 },
  secondItem: { zIndex: 1 },
  cardPileMenu: {
    position: 'absolute',
    left: '-100%',
    zIndex: 3,
  },
  otherCard: ({ width, height, borderRadius = 5 }: CardPileStyleProps) => ({
    width,
    height,
    position: 'absolute',
    background: 'white',
    borderRadius,
    boxShadow: 'rgba(0, 0, 0, 0.05) 1px 2px 2px',
  }),
});

export const CardPile: FunctionComponent<CardPileProps> = ({
  cards,
  frontFace = <PlayingCardFrontFace card={cards?.[0] as PlayingCard} />,
  backFace = <PlayingCardBackFace />,
  isFaceUp = false,
  width,
  height,
  position,
  borderRadius,
  tableBoundaries,
  onCardFlipped = () => {},
  onShuffle = () => {},
  onPositionChanged = () => {},
  onCardRemoved,
}) => {
  const styleProps: CardPileStyleProps = { width, height, borderRadius };
  const classes = useStyles(styleProps);

  const [isSelected, setSelect] = useState(false);
  const [firstCard, secondCard, ...otherCards] = cards;

  const toggleSelect = () => {
    setSelect(!isSelected);
  };

  const onTurnFirstCard = () => {
    onCardFlipped(!isFaceUp);
    setSelect(false);
  };

  const onShufflePile = () => {
    onShuffle();
    setSelect(false);
  };

  // TODO: Write tests for it
  const onCardRemoval = (index: number) => {
    if (onCardRemoved) {
      onCardRemoved(index);
    }
    setSelect(false);
  };

  return (
    <Draggable
      className={classes.cardPile}
      position={position}
      height={height}
      width={width}
      boundaries={tableBoundaries}
      onDragged={onPositionChanged}
      onClick={toggleSelect}
      data-testid="CardPile"
    >
      {isSelected && (
        <>
          <Overlay borderRadius={borderRadius} />
          <div className={classes.cardPileMenu}>
            <CardPileMenu
              onTurnFirstCard={onTurnFirstCard}
              onShufflePile={onShufflePile}
              onRemoveCard={onCardRemoval}
            />
          </div>
        </>
      )}
      {firstCard && (
        <BaseCard
          data-testid="CardPile-firstCard"
          className={classes.firstItem}
          width={width}
          height={height}
          frontFace={frontFace}
          backFace={backFace}
          disableNativeEvents
          faceUp={isFaceUp}
        />
      )}
      {secondCard && (
        <BaseCard
          data-testid="CardPile-secondCard"
          className={classes.secondItem}
          width={width}
          height={height}
          backFace={backFace}
          disableNativeEvents
          faceUp={false}
        />
      )}
      {otherCards.map((card, index) => {
        const pos = (otherCards.length - (index + 1)) / 5;
        return (
          <div
            data-testid="OtherCard"
            // eslint-disable-next-line react/no-array-index-key
            key={`other-card-${index}`}
            className={classes.otherCard}
            style={{ transform: `translate(${pos}px, ${pos}px)` }}
          />
        );
      })}
    </Draggable>
  );
};
