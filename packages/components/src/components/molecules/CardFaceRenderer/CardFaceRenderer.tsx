import React, { FC, useMemo } from 'react';
import { Card } from '@models/Card';
import { isUnoCard } from '@models/UnoCard';
import { UnoCardFace } from '@atoms/UnoCardFace';
import { isPlayingCard } from '@models/PlayingCard';
import { PlayingCardBackFace } from '@atoms/PlayingCardBackFace';
import { PlayingCardFrontFace } from '@atoms/PlayingCardFrontFace';
import { CardRenderer } from '@models/CardRenderer';

interface CardFaceRendererProps {
  /** Card that defines the renderer type */
  card: Card;
  /** Indicates if it should render a back face */
  isBack?: boolean;
  /** custom renderers for card types */
  customCardRenderer?: CardRenderer;
}

export const CardFaceRenderer: FC<CardFaceRendererProps> = ({ card, isBack, customCardRenderer }) => {
  let elem: JSX.Element;
  if (isUnoCard(card)) {
    elem = isBack ? <UnoCardFace /> : <UnoCardFace card={card} />;
  } else if (isPlayingCard(card)) {
    elem = isBack ? <PlayingCardBackFace /> : <PlayingCardFrontFace card={card} />;
  }

  if (customCardRenderer) {
    elem = customCardRenderer({ card, isBack, currentElement: elem });
  }

  return elem;
};
