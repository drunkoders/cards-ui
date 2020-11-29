import React, { FunctionComponent } from 'react';
import { SvgPlayingCard } from '@atoms/SvgPlayingCard';

export interface PlayingCardBackFaceProps {
  /** The color of the back face */
  color?: string;
  /** Additionnal style to apply to the back face */
  className?: string;
}

export const PlayingCardBackFace: FunctionComponent<PlayingCardBackFaceProps> = ({
  color = 'black',
  className,
  ...props
}) => {
  return (
    <SvgPlayingCard
      className={className}
      card="back"
      fill={color}
      // eslint-disable-next-line react/destructuring-assignment
      data-testid={props['data-testid'] || 'PlayingCardBackFace'}
    />
  );
};
