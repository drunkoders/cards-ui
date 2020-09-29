/* eslint-disable import/no-extraneous-dependencies */
import React, { ReactElement } from 'react';
import { RenderResult, screen, render as reactTestingLibraryRender, RenderOptions } from '@testing-library/react';

import createStore, { RootState } from '@store/index';
import { Provider } from 'react-redux';
import type { Store } from '@reduxjs/toolkit';

export const getFaceUse = (front?: boolean): SVGUseElement | null => {
  const face = front ? 'front' : 'back';
  return screen.getByTestId(`BaseCard-${face}`).querySelector('use');
};

interface CustomRenderOptions extends RenderOptions {
  initialState?: RootState;
  store?: Store;
}

export const render = (
  component: ReactElement,
  { initialState, store = createStore(initialState), ...renderOptions }: CustomRenderOptions = {} as CustomRenderOptions
): RenderResult => {
  const Wrapper: React.FC = ({ children }) => <Provider store={store}>{children}</Provider>;
  return reactTestingLibraryRender(component, { wrapper: Wrapper, ...renderOptions });
};
