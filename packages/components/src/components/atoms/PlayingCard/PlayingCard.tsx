import { BaseCard } from '@atoms/BaseCard';
import { PlayingCardFace } from '@atoms/PlayingCardFace';
import { CardHandle } from '@models/CardHandle';
import { CardProps } from '@models/CardProps';
import React, { forwardRef } from 'react';
import { PlayingCardType } from '@models/PlayingCardType';

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
  {
    card = 'joker_black',
    backColor = 'black',
    width = 169.075,
    height = 244.64,
    faceUp,
    disableNativeEvents,
    onPositionChanged,
    position,
  },
  ref
) {
  return (
    <BaseCard
      height={height}
      width={width}
      frontFace={<PlayingCardFace card={card} />}
      backFace={<PlayingCardFace backColor={backColor} />}
      faceUp={faceUp}
      disableNativeEvents={disableNativeEvents}
      ref={ref}
      onPositionChanged={onPositionChanged}
      position={position}
    />
  );
});
