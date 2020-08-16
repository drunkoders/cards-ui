/* eslint-disable import/no-extraneous-dependencies */
import { screen } from '@testing-library/react';

export const getFaceUse = (front?: boolean): SVGUseElement | null => {
  const face = front ? 'front' : 'back';
  return screen.getByTestId(`BaseCard-${face}`).querySelector('use');
};

export default getFaceUse;
