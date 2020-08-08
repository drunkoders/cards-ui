import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import { BaseCard } from './BaseCard';

describe('BaseCard', () => {
  it('should render the card', () => {
    const { getByTestId, getByRole } = render(<BaseCard />);
    expect(getByRole('button')).toBeInTheDocument();
    expect(getByTestId('BaseCard')).toBeInTheDocument();
  });

  describe('when rendered', () => {
    let cardContainer: HTMLElement;
    let frontFace: HTMLElement;
    let backFace: HTMLElement;
    beforeEach(() => {
      const { getByTestId, getByRole } = render(
        <BaseCard
          frontFace={<div data-testid="front-face">MY FRONT</div>}
          backFace={<div data-testid="back-face">MY BACK</div>}
        />,
      );
      cardContainer = getByRole('button');
      frontFace = getByTestId('front-face');
      backFace = getByTestId('back-face');
    });

    it('should display the front face by default', () => {
      expect(frontFace).toBeVisible();
    });

    it('should hide the back face by default', () => {
      expect(backFace).not.toBeVisible();
    });

    it('should flip when clicked', async () => {
      fireEvent.click(cardContainer);
      expect(backFace).toBeVisible();
      expect(frontFace).not.toBeVisible();
    });

    it('should flip again when clicked again', async () => {
      fireEvent.click(cardContainer);
      fireEvent.click(cardContainer);
      expect(backFace).not.toBeVisible();
      expect(frontFace).toBeVisible();
    });
  });
});
