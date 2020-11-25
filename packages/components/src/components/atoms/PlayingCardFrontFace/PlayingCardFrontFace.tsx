import { PlayingCardType } from '@models/PlayingCardType';
import React, { FC } from 'react';
import { SvgPlayingCard } from '@atoms/SvgPlayingCard';

export interface PlayingCardFrontFaceProps {
  card: PlayingCardType;
}

export const PlayingCardFrontFace: FC<PlayingCardFrontFaceProps> = ({ card }) => {
  return <SvgPlayingCard card={card} />;
};
