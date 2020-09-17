import cardsReducer, { initCardPositions, updateCardPosition } from '.';

describe('Cards reducer', () => {
  it('should handle initial state', () => {
    const expectedInitialState = { positions: {} };

    const initialState = cardsReducer(undefined, {});

    expect(initialState).toEqual(expectedInitialState);
  });

  it('should handle initCardPositions', () => {
    const expectedState = { positions: { spades_2: { x: 0, y: 0 }, hearts_3: { x: 0, y: 0 } } };

    const cards = ['spades_2', 'hearts_3'];

    const state = cardsReducer(undefined, initCardPositions({ cards }));

    expect(state).toEqual(expectedState);
  });

  it('should handle updateCardPosition', () => {
    const position = { x: 530, y: 244 };
    const payload = { cardId: 'spades_1', position };
    const expectedState = { positions: { spades_1: position } };

    const state = cardsReducer(undefined, updateCardPosition(payload));

    expect(state).toEqual(expectedState);
  });
});
