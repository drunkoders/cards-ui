import type { CardHandle } from '@models/CardHandle';
import type { CardProps } from '@models/CardProps';
import classnames from 'classnames';
import React, { forwardRef, KeyboardEvent, useImperativeHandle, useState } from 'react';
import { createUseStyles } from 'react-jss';

/**
 * Properties for BaseCard component
 */
export interface BaseCardProps extends CardProps {
  /** Element to show at card front face */
  frontFace?: JSX.Element;
  /** Element to show at card back face */
  backFace?: JSX.Element;
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
export const BaseCard = forwardRef<CardHandle, BaseCardProps>(
  ({ frontFace, backFace, faceUp, width, height, disableNativeEvents }, ref) => {
    const { card, flipped, cardFlipper, cardFront, cardBack } = useStyles({
      width,
      height,
    });
    const [isFrontVisible, setIsFrontVisible] = useState<boolean>(!!faceUp);
    const turnCard = (forceFaceUp?: boolean): void =>
      setIsFrontVisible(forceFaceUp !== undefined ? forceFaceUp : !isFrontVisible);

    useImperativeHandle(ref, () => ({
      flip: (forceFaceUp?: boolean) => turnCard(forceFaceUp),
    }));

    const onClick = () => !disableNativeEvents && turnCard();
    const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) =>
      !disableNativeEvents && event.keyCode === 32 && turnCard();

    return (
      <div data-testid="BaseCard" role="button" onClick={onClick} onKeyDown={onKeyDown} className={card} tabIndex={0}>
        <div data-testid="BaseCard-flipper" className={classnames(cardFlipper, { [flipped]: !isFrontVisible })}>
          <div data-testid="BaseCard-front" className={classnames(cardFront)}>
            {frontFace}
          </div>
          <div data-testid="BaseCard-back" className={classnames(cardBack)}>
            {backFace}
          </div>
        </div>
      </div>
    );
  }
);
