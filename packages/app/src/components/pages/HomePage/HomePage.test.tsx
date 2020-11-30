import React, { ReactElement } from 'react';
import { HomePage } from './HomePage';
import * as cards from '@cardz/components';
import { RenderResult, RenderOptions, fireEvent } from '@testing-library/react';
import { render as reactTestingLibraryRender } from '@testing-library/react';
import type { Store } from '@reduxjs/toolkit';
import * as reactRedux from 'react-redux';

const { Provider } = reactRedux;
const { createStore } = cards;

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
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should render home page with buttons', () => {
    const { getByText } = render(<HomePage />, {
      initialState: { table: { cards: {} } },
    });
    const addCardButton = getByText(/Add random card to table/i);
    const addCardDeckButton = getByText(/Add random card deck to table/i);

    expect(addCardButton).toBeDefined();
    expect(addCardDeckButton).toBeDefined();
  });

  it('should dispatch an action to add a random card when clicking on the button to add a random card', () => {
    const fakeAction = 'fake-add-random-card-action';
    const dispatchSpy = jest.fn();

    jest.spyOn(cards, 'addRandomCardToTable').mockReturnValue(fakeAction);
    jest.spyOn(reactRedux, 'useDispatch').mockReturnValue(dispatchSpy);

    const { getByText } = render(<HomePage />, {
      initialState: { table: { cards: {} } },
    });
    const addCardButton = getByText(/Add random card to table/i);

    fireEvent.click(addCardButton);

    expect(dispatchSpy).toHaveBeenLastCalledWith('fake-add-random-card-action');
  });

  it('should dispatch an action to add a random card deck when clicking on the button to add a random card deck', () => {
    const fakeAction = 'fake-add-random-card-deck-action';
    const dispatchSpy = jest.fn();

    jest.spyOn(cards, 'addRandomCardDeckToTable').mockReturnValue(fakeAction);
    jest.spyOn(reactRedux, 'useDispatch').mockReturnValue(dispatchSpy);

    const { getByText } = render(<HomePage />, {
      initialState: { table: { cards: {} } },
    });
    const addCardDeckButton = getByText(/Add random card deck to table/i);

    fireEvent.click(addCardDeckButton);

    expect(dispatchSpy).toHaveBeenLastCalledWith('fake-add-random-card-deck-action');
  });
});
