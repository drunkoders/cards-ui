import svgCards from '@assets/svg-cards-optimized.svg';
import type { PlayingCardType } from '@models/PlayingCardType';
import React, { FC } from 'react';
import { createUseStyles } from 'react-jss';

export interface PlayingCardFaceProps {
  card?: PlayingCardType;
  backColor?: string;
}

const useStyles = createUseStyles({
  svgStyle: {
    width: '100%',
  },
});

export const PlayingCardFace: FC<PlayingCardFaceProps> = ({ backColor = 'black', card }) => {
  const { svgStyle } = useStyles();

  const isCardFace = !!card;
  return (
    <svg role="img" viewBox="0 0 169.075 244.64" className={svgStyle}>
      <use xlinkHref={`${svgCards}#${isCardFace ? card : 'back'}`} fill={isCardFace ? '' : backColor} />
    </svg>
  );
};
