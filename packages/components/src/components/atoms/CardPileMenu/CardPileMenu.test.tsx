/* eslint-disable max-lines */
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import { CardPileMenu } from './CardPileMenu';

describe('CardPileMenu', () => {
  it('should render', () => {
    const { getByRole } = render(<CardPileMenu />);
    expect(getByRole('list')).toBeInTheDocument();
  });

  const TURN_FIRST_LABEL = 'Turn first card';
  const SHUFFLE_LABEL = 'Shuffle pile';
  const REMOVE_FIRSTCARD_LABEL = 'Remove first card';
  const REMOVE_LASTCARD_LABEL = 'Remove last card';

  describe('testing option items presence', () => {
    beforeEach(() => {
      render(<CardPileMenu />);
    });

    it('should have an option to turn the first card', () => {
      fireEvent.click(screen.getByText(TURN_FIRST_LABEL));
      expect(screen.getByText(TURN_FIRST_LABEL)).toBeInTheDocument();
    });

    it('should have an option to shuffle', () => {
      fireEvent.click(screen.getByText(SHUFFLE_LABEL));
      expect(screen.getByText(SHUFFLE_LABEL)).toBeInTheDocument();
    });

    it('should have an option to remove first card', () => {
      fireEvent.click(screen.getByText(REMOVE_FIRSTCARD_LABEL));
      expect(screen.getByText(REMOVE_FIRSTCARD_LABEL)).toBeInTheDocument();
    });

    it('should have an option to remove last card', () => {
      fireEvent.click(screen.getByText(REMOVE_LASTCARD_LABEL));
      expect(screen.getByText(REMOVE_LASTCARD_LABEL)).toBeInTheDocument();
    });
  });

  describe('when testing menu options', () => {
    it('should indicate that turn first card has been clicked on', () => {
      const spy = jest.fn();
      const { getByText } = render(<CardPileMenu onTurnFirstCard={spy} />);
      fireEvent.click(getByText(TURN_FIRST_LABEL));
      expect(spy).toHaveBeenCalled();
    });

    it('should indicate that turn first card has been keydown on', () => {
      const spy = jest.fn();
      const { getByText } = render(<CardPileMenu onTurnFirstCard={spy} />);
      fireEvent.keyDown(getByText(TURN_FIRST_LABEL));
      expect(spy).toHaveBeenCalled();
    });

    it('should indicate that shuffle pile has been clicked on', () => {
      const spy = jest.fn();
      const { getByText } = render(<CardPileMenu onShufflePile={spy} />);
      fireEvent.click(getByText(SHUFFLE_LABEL));
      expect(spy).toHaveBeenCalled();
    });

    it('should indicate that shuffle pile has been keydown on', () => {
      const spy = jest.fn();
      const { getByText } = render(<CardPileMenu onShufflePile={spy} />);
      fireEvent.keyDown(getByText(SHUFFLE_LABEL));
      expect(spy).toHaveBeenCalled();
    });

    it('should indicate that remove first card has been clicked on', () => {
      const spy = jest.fn();
      const { getByText } = render(<CardPileMenu onRemoveCard={spy} />);
      fireEvent.click(getByText(REMOVE_FIRSTCARD_LABEL));
      expect(spy).toHaveBeenCalledWith(0);
    });

    it('should indicate that remove first card has been keydown on', () => {
      const spy = jest.fn();
      const { getByText } = render(<CardPileMenu onRemoveCard={spy} />);
      fireEvent.keyDown(getByText(REMOVE_FIRSTCARD_LABEL));
      expect(spy).toHaveBeenCalledWith(0);
    });

    it('should indicate that remove last card has been clicked on', () => {
      const spy = jest.fn();
      const { getByText } = render(<CardPileMenu onRemoveCard={spy} />);
      fireEvent.click(getByText(REMOVE_LASTCARD_LABEL));
      expect(spy).toHaveBeenCalledWith(-1);
    });

    it('should indicate that remove last card has been keydown on', () => {
      const spy = jest.fn();
      const { getByText } = render(<CardPileMenu onRemoveCard={spy} />);
      fireEvent.keyDown(getByText(REMOVE_LASTCARD_LABEL));
      expect(spy).toHaveBeenCalledWith(-1);
    });
  });

  afterEach(() => {
    cleanup();
  });
});
