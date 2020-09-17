/* eslint-disable max-lines */
import type { CardHandle } from '@models/CardHandle';
import type { CardProps } from '@models/CardProps';
import type { Position } from '@models/Position';
import classnames from 'classnames';
import React, { forwardRef, KeyboardEvent, useImperativeHandle, useState, useEffect, useCallback } from 'react';
import { createUseStyles } from 'react-jss';

/**
 * Properties for BaseCard component
 */
export interface BaseCardProps extends CardProps {
  /** Element to show at card front face */
  frontFace?: JSX.Element;
  /** Element to show at card back face */
  backFace?: JSX.Element;
  onDragEnd?: (p: Position) => void;
  position?: Position;
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
  card: ({ width, height, cardPosition }) => ({
    width: width || 600,
    height: height || 400,
    perspective: 1000,
    outline: 'none',
    overflow: 'hidden',
    transform: `translate(${cardPosition.x}px, ${cardPosition.y}px)`,
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
  cardGrabbing: {
    cursor: 'grabbing',
  },
  cardGrab: {
    cursor: 'grab',
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
      onDragEnd = () => {},
    },
    ref
  ) => {
    const [isDragging, setIsDraging] = useState<boolean>(false);
    const [cardPosition, setCardPosition] = useState<Position>(position);
    const [startPosition, setStartPosition] = useState<Position>(position);
    const [startDate, setStartDate] = useState<number>(Date.now());

    const classes = useStyles({
      width,
      height,
      cardPosition,
    });

    const [isFrontVisible, setIsFrontVisible] = useState<boolean>(!!faceUp);
    const turnCard = (forceFaceUp?: boolean): void =>
      setIsFrontVisible(forceFaceUp !== undefined ? forceFaceUp : !isFrontVisible);

    useImperativeHandle(ref, () => ({
      flip: (forceFaceUp?: boolean) => turnCard(forceFaceUp),
    }));

    const onClick = () => !disableNativeEvents && !isDragging && Date.now() - startDate < 200 && turnCard();

    const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) =>
      !disableNativeEvents && event.keyCode === 32 && turnCard();

    const handleMouseDown = useCallback(
      ({ clientX, clientY }) => {
        if (!disableNativeEvents) {
          setStartDate(Date.now());
          setStartPosition({ x: clientX, y: clientY });
          setIsDraging(true);
        }
      },
      [disableNativeEvents]
    );

    const handleMouseMove = useCallback(
      ({ clientX, clientY }) => {
        const newCardPosition: Position = {
          x: Math.round(cardPosition.x + clientX - startPosition.x),
          y: Math.round(cardPosition.y + clientY - startPosition.y),
        };
        setCardPosition(newCardPosition);
      },
      // eslint-disable-next-line react-hooks/exhaustive-deps
      [startPosition]
    );

    const handleMouseUp = useCallback(() => {
      setIsDraging(false);
    }, []);

    useEffect(() => {
      if (isDragging) {
        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseup', handleMouseUp);
      } else {
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('mouseup', handleMouseUp);

        onDragEnd(cardPosition);
      }
    }, [isDragging, handleMouseMove, handleMouseUp, cardPosition, onDragEnd]);

    return (
      <div
        data-testid="BaseCard"
        role="button"
        onClick={onClick}
        onKeyDown={onKeyDown}
        onMouseDown={handleMouseDown}
        className={classnames(classes.card, { [classes.cardGrabbing]: isDragging, [classes.cardGrab]: !isDragging })}
        tabIndex={0}
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
      </div>
    );
  }
);
