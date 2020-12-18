/* eslint-disable max-lines */
import React, { FunctionComponent } from 'react';
import { Draggable } from '@templates/Draggable';
import classNames from 'classnames';
import { createUseStyles } from 'react-jss';
import { Dimensions } from '@models/Dimensions';
import { Position } from '@models/Position';

/**
 * Properties for BaseCard component
 */
export interface BaseCardProps {
  /** Indicates if the card is face up or face down */
  faceUp?: boolean;
  /** Defines the card height */
  height?: number;
  /** Defines the card width */
  width?: number;
  /** Disables the events. Use this if you want to control the card soley via props */
  disableNativeEvents?: boolean;
  /** Function called when card position changes with the new position of the card */
  onPositionChanged?: (position: Position) => void;
  /** Function called when card flips with a boolean representing whether face is up or not */
  onFlipped?: (isFaceUp: boolean) => void;
  /** Indicates the position of the card */
  position?: Position;
  /** Table boundaries, used to ensure card position stays within them */
  tableBoundaries?: Dimensions;
  /** Element to show at card front face */
  frontFace?: JSX.Element;
  /** Element to show at card back face */
  backFace?: JSX.Element;
  /** Additionnal style to apply to the card */
  className?: string;
}

interface BaseCardStyleProps {
  /** Indicates if the card is face up or face down */
  faceUp?: boolean;
  /** Width of the card */
  width: number;
  /** Height of the card */
  height: number;
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
  card: ({ width, height }: BaseCardStyleProps) => ({
    width,
    height,
    position: 'absolute',
    overflow: 'hidden',
  }),
  flipped: ({ faceUp }: BaseCardStyleProps) => ({ transform: `rotateY(${faceUp ? 0 : 180}deg)` }),
  cardFlipper: ({ width, height }: BaseCardStyleProps) => ({
    width,
    height,
    transition: '0.6s',
    transformStyle: 'preserve-3d',
    position: 'relative',
  }),
  cardFront: ({ width, height }: BaseCardStyleProps) => ({
    width,
    height,
    extend: 'cardFace',
    transform: 'rotateY(0deg)',
  }),
  cardBack: ({ width, height }: BaseCardStyleProps) => ({
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
  className,
  frontFace,
  backFace,
  faceUp,
  width,
  height,
  tableBoundaries,
  disableNativeEvents,
  position = { x: 0, y: 0 },
  onPositionChanged,
  onFlipped,
  ...props
}) => {
  const styleProps: BaseCardStyleProps = { width, height, faceUp };
  const classes = useStyles(styleProps);

  return (
    <Draggable
      className={classNames(classes.card, className)}
      position={position}
      height={height}
      width={width}
      boundaries={tableBoundaries}
      onDragged={onPositionChanged}
      onClick={() => onFlipped && onFlipped(!faceUp)}
      disabled={disableNativeEvents}
      // eslint-disable-next-line react/destructuring-assignment
      data-testid={props['data-testid'] || 'BaseCard'}
    >
      <div data-testid="BaseCard-flipper" className={classNames(classes.cardFlipper, { [classes.flipped]: !faceUp })}>
        <div data-testid="BaseCard-front" className={classNames(classes.cardFront)}>
          {frontFace}
        </div>
        <div data-testid="BaseCard-back" className={classNames(classes.cardBack)}>
          {backFace}
        </div>
      </div>
    </Draggable>
  );
};
