/* eslint-disable max-lines */
import React, { FunctionComponent } from 'react';
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
    width,
    height,
    position: 'absolute',
    overflow: 'hidden',
  }),
  flipped: ({ faceUp }) => ({ transform: `rotateY(${faceUp ? 0 : 180}deg)` }),
  cardFlipper: ({ width, height }) => ({
    width,
    height,
    transition: '0.6s',
    transformStyle: 'preserve-3d',
    position: 'relative',
  }),
  cardFront: ({ width, height }) => ({
    width,
    height,
    extend: 'cardFace',
    transform: 'rotateY(0deg)',
  }),
  cardBack: ({ width, height }) => ({
    width,
    height,
    extend: 'cardFace',
    transform: 'rotateY(180deg)',
  }),
});

/**
 * Base card
 * @param props Card props
 */
export const BaseCard: FunctionComponent<BaseCardProps> = ({
  frontFace,
  backFace,
  faceUp,
  width,
  height,
  boundaries,
  disableNativeEvents,
  position = { x: 0, y: 0 },
  onPositionChanged = () => {},
  onFlipped = () => {},
}) => {
  const classes = useStyles({
    width,
    height,
    faceUp,
  });

  return (
    <Draggable
      className={classes.card}
      position={position}
      height={height}
      width={width}
      boundaries={boundaries}
      onDragged={onPositionChanged}
      onClick={() => onFlipped(!faceUp)}
      disabled={disableNativeEvents}
    >
      <div data-testid="BaseCard-flipper" className={classnames(classes.cardFlipper, { [classes.flipped]: !faceUp })}>
        <div data-testid="BaseCard-front" className={classnames(classes.cardFront)}>
          {frontFace}
        </div>
        <div data-testid="BaseCard-back" className={classnames(classes.cardBack)}>
          {backFace}
        </div>
      </div>
    </Draggable>
  );
};
