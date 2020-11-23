import React, { FC } from 'react';
import { SvgPlayingCard } from '@atoms/SvgPlayingCard';

export interface PlayingCardFrontFaceProps {
  card: string;
}

export const PlayingCardFrontFace: FC<PlayingCardFrontFaceProps> = ({ card }) => {
  return <SvgPlayingCard card={card} />;
};
