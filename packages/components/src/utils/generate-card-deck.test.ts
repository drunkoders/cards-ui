import { generateRandomPlayingCardDeck, generateRandomUnoCardDeck } from './generate-card-deck';

describe('generateRandomPlayingCardDeck', () => {
  it('should generate a random card deck with', () => {
    const randomCardDeck = generateRandomPlayingCardDeck();
    const uuidRegExp = new RegExp(/^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i);

    expect(randomCardDeck.id).toMatch(uuidRegExp);
    expect(randomCardDeck.cards).toHaveLength(52);
  });
});

describe('generateRandomUnoCardDeck', () => {
  it('should generate a random card deck with', () => {
    const randomCardDeck = generateRandomUnoCardDeck();
    const uuidRegExp = new RegExp(/^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i);

    expect(randomCardDeck.id).toMatch(uuidRegExp);
    expect(randomCardDeck.cards).toHaveLength(60);
  });
});
