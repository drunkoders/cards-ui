import { PlayingCardName, PlayingCardSuit } from '@models/PlayingCard';
import { generateRandomCard } from './generate-card';

describe('generateRandomCard', () => {
  it('should generate a random card', () => {
    const randomCard = generateRandomCard();
    const uuidRegExp = new RegExp(/^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i);

    expect(Object.values(PlayingCardName)).toContain(randomCard.name);
    expect(Object.values(PlayingCardSuit)).toContain(randomCard.suit);
    expect(randomCard.id).toMatch(uuidRegExp);
  });
});
