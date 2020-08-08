import React, { useState, KeyboardEvent } from 'react';
import { createUseStyles } from 'react-jss';

/**
 * Properties for BaseCard component
 */
export interface BaseCardProps {
  /** Element to show at card front face */
  frontFace?: JSX.Element;
  /** Element to show at card back face */
  backFace?: JSX.Element;
  /** Defines the card height */
  height?: number;
  /** Defines the card width */
  width?: number;
}

const useStyles = createUseStyles({
  // Generic classes
  cardFace: {
    backfaceVisibility: 'hidden',
    position: 'absolute',
    top: 0,
    left: 0,
    color: 'cornSilk',
    textAlign: 'center',
    font: `3em/240px 'Helvetica Neue', Helvetica, sans-serif`,
    boxShadow: '-5px 5px 5px #aaa',
    transition: '0.6s',
  },
  // Modal classes
  backVisible: {},
  frontVisible: {},
  // Style classes
  card: ({ width, height }) => ({
    width: width || 600,
    height: height || 400,
    perspective: 1000,
    cursor: 'pointer',
    '&$backVisible $cardFlipper': { transform: 'rotateY(180deg)' },
    '&$backVisible $cardFront': { opacity: 0 },
    '&$backVisible $cardBack': { opacity: 1 },
    '&$frontVisible $cardFront': { opacity: 1 },
    '&$frontVisible $cardBack': { opacity: 0 },
    outline: 'none',
    overflow: 'hidden',
  }),
  cardFlipper: {
    transition: '0.6s',
    transformStyle: 'preserve-3d',
    position: 'relative',
  },
  cardFront: {
    extend: 'cardFace',
    zIndex: 2,
    transform: 'rotateY(0deg)',
  },
  cardBack: {
    extend: 'cardFace',
    transform: 'rotateY(180deg)',
  },
});

/**
 * Base card molecule
 * @param props Card props
 */
export const BaseCard: React.FC<BaseCardProps> = ({
  frontFace,
  backFace,
  width = undefined,
  height = undefined,
} = {}) => {
  const { backVisible, frontVisible, card, cardFlipper, cardFront, cardBack } = useStyles({ width, height });
  const [visibleFace, setVisibleFace] = useState<'front' | 'back'>('front');

  const turnCard = (): void => setVisibleFace(visibleFace === 'front' ? 'back' : 'front');
  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => event.keyCode === 32 && turnCard();

  return (
    <div
      data-testid="BaseCard"
      role="button"
      onClick={turnCard}
      onKeyDown={onKeyDown}
      className={`${card} ${visibleFace === 'back' ? backVisible : frontVisible}`}
      tabIndex={0}
    >
      <div className={cardFlipper}>
        <div className={cardFront}>{frontFace}</div>
        <div className={cardBack}>{backFace}</div>
      </div>
    </div>
  );
};
