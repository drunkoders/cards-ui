/* eslint-disable max-lines */
import React, { forwardRef, useImperativeHandle, useState, useCallback } from 'react';
import { CardHandle } from '@models/CardHandle';
import { CardProps } from '@models/CardProps';
import { Draggable } from '@templates/Draggable';
import classnames from 'classnames';
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
  (
    {
      frontFace,
      backFace,
      faceUp,
      width,
      height,
      disableNativeEvents,
      position = { x: 0, y: 0 },
      onPositionChanged = () => {},
    },
    ref
  ) => {
    const classes = useStyles({
      width,
      height,
    });

    const [isFrontVisible, setIsFrontVisible] = useState<boolean>(!!faceUp);

    const turnCard = useCallback(
      (forceFaceUp?: boolean): void => {
        setIsFrontVisible(forceFaceUp !== undefined ? forceFaceUp : !isFrontVisible);
      },
      [isFrontVisible]
    );

    useImperativeHandle(ref, () => ({
      flip: (forceFaceUp?: boolean) => turnCard(forceFaceUp),
    }));

    return (
      <div data-testid="BaseCard">
        <Draggable
          className={classes.card}
          position={position}
          onDragged={onPositionChanged}
          onClick={turnCard}
          disabled={disableNativeEvents}
        >
          <div
            data-testid="BaseCard-flipper"
            className={classnames(classes.cardFlipper, { [classes.flipped]: !isFrontVisible })}
          >
            <div data-testid="BaseCard-front" className={classnames(classes.cardFront)}>
              {frontFace}
            </div>
            <div data-testid="BaseCard-back" className={classnames(classes.cardBack)}>
              {backFace}
            </div>
          </div>
        </Draggable>
      </div>
    );
  }
);
