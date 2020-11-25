/* eslint-disable import/no-extraneous-dependencies */
import React, { ReactElement } from 'react';
import { RenderResult, render as reactTestingLibraryRender, RenderOptions } from '@testing-library/react';

import createStore, { RootState } from '@store/index';
import { Provider } from 'react-redux';
import { Store } from '@reduxjs/toolkit';

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
