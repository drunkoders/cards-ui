import createStore from '@store/index';

export { createStore };

export { addRandomCardToTable, addRandomCardDeckToTable } from '@store/slices/table';

export { BaseCard } from '@atoms/BaseCard';
export { CardPile } from '@molecules/CardPile';
export { Table } from '@organisms/Table';

export type { Card } from '@models/Card';
export type { PlayingCard } from '@models/PlayingCard';
