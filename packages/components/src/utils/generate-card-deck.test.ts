import { generateRandomCardDeck } from './generate-card-deck';

describe('generateRandomCardDeck', () => {
  it('should generate a random card deck with', () => {
    const randomCardDeck = generateRandomCardDeck();
    const uuidRegExp = new RegExp(/^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i);

    expect(randomCardDeck.id).toMatch(uuidRegExp);
    expect(randomCardDeck.cards).toHaveLength(52);
  });
});
