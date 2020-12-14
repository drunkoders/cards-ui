import { Card } from './Card';

export type CardRenderer = <T extends Card>(data: {
  card: T;
  isBack?: boolean;
  currentElement?: JSX.Element;
}) => JSX.Element;
