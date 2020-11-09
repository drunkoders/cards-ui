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
  });

  describe('when testing menu options', () => {
    it('should indicate that turn first card has been clicked on', (done) => {
      const { getByText } = render(<CardPileMenu onTurnFirstCard={() => done()} />);
      fireEvent.click(getByText(TURN_FIRST_LABEL));
    });

    it('should indicate that turn first card has been keydown on', (done) => {
      const { getByText } = render(<CardPileMenu onTurnFirstCard={() => done()} />);
      fireEvent.keyDown(getByText(TURN_FIRST_LABEL));
    });

    it('should indicate that shuffle pile has been clicked on', (done) => {
      const { getByText } = render(<CardPileMenu onShufflePile={() => done()} />);
      fireEvent.click(getByText(SHUFFLE_LABEL));
    });

    it('should indicate that shuffle pile has been keydown on', (done) => {
      const { getByText } = render(<CardPileMenu onShufflePile={() => done()} />);
      fireEvent.keyDown(getByText(SHUFFLE_LABEL));
    });
  });

  afterEach(() => {
    cleanup();
  });
});
