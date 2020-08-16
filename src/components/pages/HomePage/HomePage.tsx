import type { PlayingCardProps } from '@atoms/PlayingCard';
import type { PlayingCardType } from '@models/PlayingCardType';
import { CardPile } from '@molecules/CardPile';
import React from 'react';
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
  homePage: {
    background: '#cccccc',
    height: '100%',
    color: 'white',
    overflow: 'auto',
  },
});

export const HomePage: React.FC = () => {
  const classes = useStyles();
  const allCards: PlayingCardType[] = [
    'club_1',
    'club_2',
    'club_3',
    'club_4',
    'club_5',
    'club_6',
    'club_7',
    'club_8',
    'club_9',
    'club_10',
    'club_jack',
    'club_queen',
    'club_king',
    'diamond_1',
    'diamond_2',
    'diamond_3',
    'diamond_4',
    'diamond_5',
    'diamond_6',
    'diamond_7',
    'diamond_8',
    'diamond_9',
    'diamond_10',
    'diamond_jack',
    'diamond_queen',
    'diamond_king',
    'heart_1',
    'heart_2',
    'heart_3',
    'heart_4',
    'heart_5',
    'heart_6',
    'heart_7',
    'heart_8',
    'heart_9',
    'heart_10',
    'heart_jack',
    'heart_queen',
    'heart_king',
    'spade_1',
    'spade_2',
    'spade_3',
    'spade_4',
    'spade_5',
    'spade_6',
    'spade_7',
    'spade_8',
    'spade_9',
    'spade_10',
    'spade_jack',
    'spade_queen',
    'spade_king',
    'joker_black',
    'joker_red',
  ];
  const cards: PlayingCardProps[] = allCards.map((card) => ({ card }));
  return (
    <div className={classes.homePage}>
      <h1>Card UI</h1>
      <CardPile cards={cards} />
    </div>
  );
};

export default HomePage;
