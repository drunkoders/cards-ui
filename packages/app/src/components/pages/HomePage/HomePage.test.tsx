import React, { ReactElement } from 'react';
import { HomePage } from './HomePage';
import { createStore } from '@cardz/components';
import type { RenderResult, RenderOptions } from '@testing-library/react';
import { render as reactTestingLibraryRender } from '@testing-library/react';
import type { Store } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';

interface CustomRenderOptions extends RenderOptions {
  initialState?: any;
  store?: Store;
}

export const render = (
  component: ReactElement,
  {
    initialState,
    store = createStore(initialState),
    ...renderOptions
  }: CustomRenderOptions = {} as CustomRenderOptions,
): RenderResult => {
  const Wrapper: React.FC = ({ children }) => (
    <Provider store={store}>{children}</Provider>
  );
  return reactTestingLibraryRender(component, {
    wrapper: Wrapper,
    ...renderOptions,
  });
};

describe('HomePage', () => {
  it('should render home page', () => {
    const { getByText } = render(<HomePage />, {
      initialState: { cards: { positions: {} } },
    });
    const divElement = getByText(/Card UI/i);
    expect(divElement).not.toBe(undefined);
  });
});
