import { allPlayingCardNames, allPlayingCardSuits } from '@models/PlayingCard';
import { AllUnoColors, AllUnoValues } from '@models/UnoCard';
import { generateRandomPlayingCard, generateRandomUnoCard } from './generate-card';

describe('generateRandomPlayingCard', () => {
  it('should generate a random card', () => {
    const randomCard = generateRandomPlayingCard();
    const uuidRegExp = new RegExp(/^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i);

    expect(allPlayingCardNames).toContain(randomCard.name);
    expect(allPlayingCardSuits).toContain(randomCard.suit);
    expect(randomCard.id).toMatch(uuidRegExp);
  });
});

describe('generateRandomUnoCard', () => {
  it('should generate a random card', () => {
    const randomCard = generateRandomUnoCard();
    const uuidRegExp = new RegExp(/^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i);

    expect(AllUnoColors).toContain(randomCard.color);
    expect(AllUnoValues).toContain(randomCard.value);
    expect(randomCard.id).toMatch(uuidRegExp);
  });
});
