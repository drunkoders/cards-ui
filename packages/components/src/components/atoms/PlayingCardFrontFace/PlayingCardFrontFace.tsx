import React, { FC } from 'react';
import { SvgPlayingCard } from '@atoms/SvgPlayingCard';
import { PlayingCard } from '@models/PlayingCard';

export interface PlayingCardFrontFaceProps {
  card: PlayingCard;
}

export const PlayingCardFrontFace: FC<PlayingCardFrontFaceProps> = ({ card }) => {
  const cardString = `${card?.suit?.toLowerCase()}_${card?.name?.toLowerCase()}`;

  return <SvgPlayingCard card={cardString} data-testid="PlayingCardFrontFace" />;
};
