/* eslint-disable max-lines */
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
import { isPlayingCard, PlayingCard } from '@models/PlayingCard';
import { CardRenderer } from '@models/CardRenderer';
import { Card } from '@models/Card';
import { isUnoCard, UnoCard } from '@models/UnoCard';
import { UnoCardFace } from '@atoms/UnoCardFace';

interface TableProps {
  /** height of the table */
  height: number;
  /** width of the table */
  width: number;
  /** custom renderers for card types */
  customRender?: CardRenderer;
  /** customer border per card type */
  customPileBorderFn?: (card: Card[]) => number | undefined;
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

export const Table: FunctionComponent<TableProps> = ({ height, width, customRender, customPileBorderFn }) => {
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

  const cardRenderer: CardRenderer = useCallback(
    (data) => {
      let elem: JSX.Element;
      if (isUnoCard(data.card)) {
        elem = data.isBack ? <UnoCardFace /> : <UnoCardFace card={data.card} />;
      } else if (isPlayingCard(data.card)) {
        elem = data.isBack ? <PlayingCardBackFace /> : <PlayingCardFrontFace card={data.card} />;
      }

      if (customRender) {
        elem = customRender({ ...data, currentElement: elem });
      }

      return elem;
    },
    [customRender]
  );

  const pileBorderFn = (cardsList: Card[]) => {
    let border: number | undefined;
    if (cardsList.length > 0 && isUnoCard(cardsList[0])) {
      border = 12;
    }
    return customPileBorderFn ? customPileBorderFn(cardsList) : border;
  };

  return (
    <div className={classes.table} data-testid="Table">
      {Object.entries(cards).map(([cardId, cardState]) => {
        return Array.isArray(cardState.cards) ? (
          <CardPile
            key={cardId}
            width={cardWidth}
            height={cardHeight}
            borderRadius={pileBorderFn(cardState.cards)}
            tableBoundaries={{ width, height }}
            frontFace={cardRenderer({ card: cardState.cards?.[0] })}
            backFace={cardRenderer({ card: cardState.cards?.[0], isBack: true })}
            cards={cardState.cards}
            position={cardState.position}
            isFaceUp={cardState.isFaceUp}
            onCardFlipped={(e) => handleFlippedCard(e, cardId)}
            onShuffle={() => handleShuffle(cardId)}
            onPositionChanged={(e) => handleDraggedCard(e, cardId)}
          />
        ) : (
          <BaseCard
            key={cardId}
            height={cardHeight}
            width={cardWidth}
            tableBoundaries={{ width, height }}
            frontFace={cardRenderer({ card: cardState.cards })}
            backFace={cardRenderer({ card: cardState.cards, isBack: true })}
            faceUp={cardState.isFaceUp}
            position={cardState.position}
            onPositionChanged={(e) => handleDraggedCard(e, cardId)}
            onFlipped={(isFaceUp) => handleFlippedCard(isFaceUp, cardId)}
          />
        );
      })}
    </div>
  );
};
