import React, { FunctionComponent } from 'react';
import { SvgPlayingCard } from '@atoms/SvgPlayingCard';

export interface PlayingCardBackFaceProps {
  color?: string;
}

export const PlayingCardBackFace: FunctionComponent<PlayingCardBackFaceProps> = ({ color = 'black' }) => {
  return <SvgPlayingCard card="back" fill={color} />;
};
