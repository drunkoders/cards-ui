import { BaseCard } from '@atoms/BaseCard';
import { PlayingCardFace } from '@atoms/PlayingCardFace';
import { CardProps } from '@models/CardProps';
import React, { FunctionComponent } from 'react';
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

export const PlayingCard: FunctionComponent<PlayingCardProps> = ({
  card = 'joker_black',
  backColor = 'black',
  width,
  height,
  boundaries,
  faceUp,
  disableNativeEvents,
  onPositionChanged,
  onFlipped,
  position,
}) => {
  return (
    <BaseCard
      height={height}
      width={width}
      boundaries={boundaries}
      frontFace={<PlayingCardFace card={card} />}
      backFace={<PlayingCardFace backColor={backColor} />}
      faceUp={faceUp}
      disableNativeEvents={disableNativeEvents}
      onPositionChanged={onPositionChanged}
      onFlipped={onFlipped}
      position={position}
    />
  );
};
