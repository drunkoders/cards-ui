import React, { FC } from 'react';
import { createUseStyles } from 'react-jss';

interface OverlayProps {
  borderRadius?: number;
}

interface OverlayStyleProps {
  borderRadius?: number;
}

const useStyles = createUseStyles({
  overlay: ({ borderRadius }: OverlayStyleProps) => ({
    position: 'absolute',
    width: '100%',
    height: '100%',
    borderRadius,
    zIndex: 3,
    background: 'rgba(0, 0, 0, 0.5)',
    '&:before': {
      content: '"x"',
      position: 'absolute',
      width: '1.5em',
      height: '1.5em',
      color: 'white',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      transform: 'translate(-50%, -50%)',
      top: '50%',
      left: '50%',
      fontSize: '2em',
      border: 'solid white 0.25rem',
      borderRadius: '50%',
    },
  }),
});

export const Overlay: FC<OverlayProps> = ({ borderRadius }) => {
  const classes = useStyles({ borderRadius });
  return <div data-testid="Overlay" className={classes.overlay} />;
};

export default Overlay;
