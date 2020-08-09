import React, { useState, KeyboardEvent } from 'react';
import { createUseStyles } from 'react-jss';
import classnames from 'classnames';

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
    transition: '0.6s',
  },
  // Style classes
  card: ({ width, height }) => ({
    width: width || 600,
    height: height || 400,
    perspective: 1000,
    cursor: 'pointer',
    outline: 'none',
    overflow: 'hidden',
  }),
  faceVisible: { opacity: 1 },
  faceHidden: { opacity: 0 },
  flipped: { transform: 'rotateY(180deg)' },
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
 * Base card
 * @param props Card props
 */
export const BaseCard: React.FC<BaseCardProps> = ({
  frontFace,
  backFace,
  width = undefined,
  height = undefined,
} = {}) => {
  const { card, faceVisible, faceHidden, flipped, cardFlipper, cardFront, cardBack } = useStyles({
    width,
    height,
  });
  const [isBackVisible, setIsBackVisible] = useState<boolean>(false);

  const turnCard = (): void => setIsBackVisible(!isBackVisible);
  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => event.keyCode === 32 && turnCard();

  return (
    <div data-testid="BaseCard" role="button" onClick={turnCard} onKeyDown={onKeyDown} className={card} tabIndex={0}>
      <div className={classnames(cardFlipper, { [flipped]: isBackVisible })}>
        <div className={classnames(cardFront, { [faceHidden]: isBackVisible, [faceVisible]: !isBackVisible })}>
          {frontFace}
        </div>
        <div className={classnames(cardBack, { [faceHidden]: !isBackVisible, [faceVisible]: isBackVisible })}>
          {backFace}
        </div>
      </div>
    </div>
  );
};
