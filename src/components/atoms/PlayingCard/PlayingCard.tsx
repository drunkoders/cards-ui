import { BaseCard } from '@atoms/BaseCard';
import { PlayingCardFace } from '@atoms/PlayingCardFace';
import type { CardHandle } from '@models/CardHandle';
import type { CardProps } from '@models/CardProps';
import type { PlayingCardType } from '@models/PlayingCardType';
import React, { forwardRef, useMemo } from 'react';

/**
 * Properties for PlayingCard
 */
export interface PlayingCardProps extends CardProps {
  /** Card to be rendered */
  card?: PlayingCardType;
  /** Color to be applied to back face */
  backColor?: string;
}

export const PlayingCard = forwardRef<CardHandle, PlayingCardProps>(function PlayingCard(
  { card = 'joker_black', backColor = 'black', width = 169.075, height = 244.64, faceUp, disableNativeEvents },
  ref
) {
  const baseCard = useMemo(
    () => (
      <BaseCard
        height={height}
        width={width}
        frontFace={<PlayingCardFace card={card} />}
        backFace={<PlayingCardFace backColor={backColor} />}
        faceUp={faceUp}
        disableNativeEvents={disableNativeEvents}
        ref={ref}
      />
    ),
    [height, width, faceUp, disableNativeEvents, ref, card, backColor]
  );

  return baseCard;
});
