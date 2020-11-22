/* eslint-disable max-lines */
import React, { KeyboardEvent, FunctionComponent, useCallback, useEffect, useState } from 'react';
import { createUseStyles } from 'react-jss';
import { Position } from '@models/Position';
import classNames from 'classnames';

interface DraggableProps {
  /** Additionnal class to apply to the item */
  className?: string;
  /** Position of the item */
  position: Position;
  /** Function called after item was dragged with the new position of the item */
  onDragged?: (position: Position) => void;
  /** Function called after item was clicked on */
  onClick?: () => void;
  /** Disabled the dragging mechanism */
  disabled?: boolean;
}

const useStyles = createUseStyles({
  draggable: ({ position }) => ({
    position: 'absolute',
    outline: 'none',
    transform: `translate(${position.x}px, ${position.y}px)`,
  }),
  grabbing: {
    cursor: 'grabbing',
  },
  grab: {
    cursor: 'grab',
  },
});

export const Draggable: FunctionComponent<DraggableProps> = ({
  className,
  position,
  onDragged = () => {},
  onClick = () => {},
  children,
  disabled = false,
}) => {
  const [isDragging, setIsDraging] = useState<boolean>(false);
  const [itemPosition, setItemPosition] = useState<Position>(position);
  const [previousItemPosition, setPreviousItemPosition] = useState<Position>(position);
  const [startPosition, setStartPosition] = useState<Position>(position);

  const classes = useStyles({ position: itemPosition });

  const handleMouseDown = useCallback(
    ({ clientX, clientY }) => {
      if (disabled) {
        return;
      }

      setStartPosition({ x: clientX, y: clientY });
      setPreviousItemPosition(itemPosition);
      setIsDraging(true);
    },
    [disabled, itemPosition]
  );

  const handleMouseMove = useCallback(
    ({ clientX, clientY }) => {
      const newPosition: Position = {
        x: Math.round(itemPosition.x + clientX - startPosition.x),
        y: Math.round(itemPosition.y + clientY - startPosition.y),
      };

      setPreviousItemPosition(itemPosition);
      setItemPosition(newPosition);
    },
    // ⚠️ TODO: figure out why by putting itemPosition in dependencies it behaves weirdly
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [startPosition.x, startPosition.y]
  );

  const handleMouseUp = useCallback(() => {
    setIsDraging(false);
  }, []);

  const handleClick = useCallback(() => {
    if (!disabled && itemPosition.x === previousItemPosition.x && itemPosition.y === previousItemPosition.y) {
      onClick();
    }
  }, [disabled, itemPosition.x, itemPosition.y, previousItemPosition.x, previousItemPosition.y, onClick]);

  const onKeyDown = useCallback(
    (event: KeyboardEvent<HTMLDivElement>) => {
      if (!disabled && event.key === ' ') {
        onClick();
      }
    },
    [disabled, onClick]
  );

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    } else {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);

      if (position.x !== itemPosition.x || position.y !== itemPosition.y) {
        onDragged(itemPosition);
      }
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, handleMouseMove, itemPosition, handleMouseUp, position, previousItemPosition, onDragged]);

  return (
    <div
      className={classNames(classes.draggable, className, {
        [classes.grabbing]: isDragging,
        [classes.grab]: !isDragging,
      })}
      data-testid="Draggable"
      onMouseDown={handleMouseDown}
      onKeyDown={onKeyDown}
      role="button"
      tabIndex={0}
      onClick={handleClick}
    >
      {children}
    </div>
  );
};
