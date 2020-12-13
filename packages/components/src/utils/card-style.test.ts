import * as cardDimensionsUtils from '@utils/card-dimensions';
import { UnoCard } from '@models/UnoCard';
import { Dimensions } from '@models/Dimensions';
import { UnoCardDimensions } from '@atoms/UnoCardFace';
import { PlayingCard, PlayingCardName, PlayingCardSuit } from '@models/PlayingCard';
import { PlayingCardDimensions } from '@atoms/SvgPlayingCard';
import { getCardStyleFn, CustomCardSytleFn } from './card-style';

describe('getCardStyleFn', () => {
  const unoCard: UnoCard = {
    type: 'UnoCard',
    id: '1',
    value: '0',
    color: 'blue',
  };
  const playingCard: PlayingCard = {
    type: 'PlayingCard',
    id: '1',
    name: PlayingCardName.Ace,
    suit: PlayingCardSuit.Clubs,
  };
  const tableDimensions: Dimensions = { width: 1, height: 2 };
  const mockDimensions: Dimensions = { width: 100, height: 200 };

  let spy;
  beforeEach(() => {
    spy = jest.spyOn(cardDimensionsUtils, 'calculateCardDimensions').mockReturnValue(mockDimensions);
  });

  it('should get style for UnoCard', () => {
    const result = getCardStyleFn(unoCard, tableDimensions);
    expect(result).toEqual({
      borderRadius: 16,
      dimensions: mockDimensions,
    });
  });

  it('should call the calculate with the correct dimensions', () => {
    getCardStyleFn(unoCard, tableDimensions);
    expect(spy).toHaveBeenCalledWith(UnoCardDimensions, tableDimensions);
  });

  it('should get style for UnoCard', () => {
    const result = getCardStyleFn(playingCard, tableDimensions);
    expect(result).toEqual({
      dimensions: mockDimensions,
    });
  });

  it('should call the calculate with the correct dimensions', () => {
    getCardStyleFn(playingCard, tableDimensions);
    expect(spy).toHaveBeenCalledWith(PlayingCardDimensions, tableDimensions);
  });

  it('should call the custom style fn', () => {
    const customStyleFn: CustomCardSytleFn = (_c, _s) => ({ dimensions: { width: 0, height: 1 }, borderRadius: 100 });
    const fnSpy = jest.fn(customStyleFn);
    getCardStyleFn(playingCard, tableDimensions, fnSpy);

    expect(fnSpy).toHaveBeenCalledWith(playingCard, { dimensions: PlayingCardDimensions });
    expect(spy).toHaveBeenCalledWith({ width: 0, height: 1 }, tableDimensions);
  });
});
