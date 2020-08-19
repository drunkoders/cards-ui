import React from 'react';
import { createUseStyles } from 'react-jss';
import { BaseCard } from '@atoms/BaseCard';

import svgCards from '@assets/svg-cards-optimized.svg';
import type { PlayingCardType } from '@models/PlayingCardType';

/**
 * Properties for PlayingCard
 */
export interface PlayingCardProps {
  /** Card to be rendered */
  card?: PlayingCardType;
  /** Color to be applied to back face */
  backColor?: string;
}

const useStyles = createUseStyles({
  svgStyle: {
    width: '100%',
  },
});

export const PlayingCard: React.FC<PlayingCardProps> = ({ card = 'joker_black', backColor = 'black' }) => {
  const classes = useStyles();

  const generateSvg = (isFront: boolean) => {
    const testId = `PlayingCard_${isFront ? 'front' : 'back'}`;
    return (
      <svg data-testid={testId} viewBox="0 0 171 251" className={classes.svgStyle}>
        <use
          data-testid={`${testId}_use`}
          xlinkHref={`${svgCards}#${isFront ? card : 'back'}`}
          fill={isFront ? '' : backColor}
        />
      </svg>
    );
  };

  return <BaseCard height={251} width={171} frontFace={generateSvg(true)} backFace={generateSvg(false)} />;
};
