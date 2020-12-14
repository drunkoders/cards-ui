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
    const addPlayingCardButton = getByText(/Add random playing card to table/i);
    const addPlayingCardDeckButton = getByText(/Add random playing card deck to table/i);
    const addUnoCardButton = getByText(/Add random uno card to table/i);
    const addUnoCardDeckButton = getByText(/Add random uno card deck to table/i);

    expect(addPlayingCardButton).toBeDefined();
    expect(addPlayingCardDeckButton).toBeDefined();
    expect(addUnoCardButton).toBeDefined();
    expect(addUnoCardDeckButton).toBeDefined();
  });

  it('should dispatch an action to add a random Playing card when clicking on the button to add a random card', () => {
    const fakeAction = 'fake-add-random-card-action';
    const dispatchSpy = jest.fn();

    jest.spyOn(cards, 'addRandomPlayingCard').mockReturnValue(fakeAction);
    jest.spyOn(reactRedux, 'useDispatch').mockReturnValue(dispatchSpy);

    const { getByText } = render(<HomePage />, {
      initialState: { table: { cards: {} } },
    });
    const addPlayingCardButton = getByText(/Add random playing card to table/i);

    fireEvent.click(addPlayingCardButton);

    expect(dispatchSpy).toHaveBeenLastCalledWith('fake-add-random-card-action');
  });

  it('should dispatch an action to add a random Playing card deck when clicking on the button to add a random card deck', () => {
    const fakeAction = 'fake-add-random-card-deck-action';
    const dispatchSpy = jest.fn();

    jest.spyOn(cards, 'addRandomPlayingCardDeck').mockReturnValue(fakeAction);
    jest.spyOn(reactRedux, 'useDispatch').mockReturnValue(dispatchSpy);

    const { getByText } = render(<HomePage />, {
      initialState: { table: { cards: {} } },
    });
    const addPlayingCardDeckButton = getByText(/Add random playing card deck to table/i);

    fireEvent.click(addPlayingCardDeckButton);

    expect(dispatchSpy).toHaveBeenLastCalledWith('fake-add-random-card-deck-action');
  });

  it('should dispatch an action to add a random Uno card when clicking on the button to add a random card', () => {
    const fakeAction = 'fake-add-random-card-action';
    const dispatchSpy = jest.fn();

    jest.spyOn(cards, 'addRandomUnoCard').mockReturnValue(fakeAction);
    jest.spyOn(reactRedux, 'useDispatch').mockReturnValue(dispatchSpy);

    const { getByText } = render(<HomePage />, {
      initialState: { table: { cards: {} } },
    });
    const addUnoCardButton = getByText(/Add random uno card to table/i);

    fireEvent.click(addUnoCardButton);

    expect(dispatchSpy).toHaveBeenLastCalledWith('fake-add-random-card-action');
  });

  it('should dispatch an action to add a random uno card deck when clicking on the button to add a random card deck', () => {
    const fakeAction = 'fake-add-random-card-deck-action';
    const dispatchSpy = jest.fn();

    jest.spyOn(cards, 'addRandomUnoCardDeck').mockReturnValue(fakeAction);
    jest.spyOn(reactRedux, 'useDispatch').mockReturnValue(dispatchSpy);

    const { getByText } = render(<HomePage />, {
      initialState: { table: { cards: {} } },
    });
    const addUnoCardDeckButton = getByText(/Add random uno card deck to table/i);

    fireEvent.click(addUnoCardDeckButton);

    expect(dispatchSpy).toHaveBeenLastCalledWith('fake-add-random-card-deck-action');
  });
});
