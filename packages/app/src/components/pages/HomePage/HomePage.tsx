import React from 'react';
import { createUseStyles } from 'react-jss';
import { Table, addRandomPlayingCard, addRandomPlayingCardDeck, addRandomUnoCard, addRandomUnoCardDeck } from '@cardz/components';
import { useDispatch } from 'react-redux';

const useStyles = createUseStyles({
  homePage: {
    background: '#cccccc',
    height: '100%',
    color: 'white',
    overflow: 'auto',
    padding: '0 20px',
  },
  button: {
    margin: '10px 10px 10px 0',
    padding: 10,
    cursor: 'pointer',
  },
});

export const HomePage: React.FC = () => {
  const classes = useStyles();

  const dispatch = useDispatch();

  const onAddPlayingCard = () => {
    dispatch(addRandomPlayingCard())
  };

  const onAddUnoCard = () => {
    dispatch(addRandomUnoCard())
  };

  const onAddPlayingCardDeck = () => {
    dispatch(addRandomPlayingCardDeck())
  };

  const onAddUnoCardDeck = () => {
    dispatch(addRandomUnoCardDeck())
  };

  return (
    <div className={classes.homePage}>
      <button className={classes.button} type="button" onClick={onAddPlayingCard} >
        Add random playing card to table
      </button>
      <button className={classes.button} type="button" onClick={onAddUnoCard} >
        Add random uno card to table
      </button>
      <button className={classes.button} type="button" onClick={onAddPlayingCardDeck} >
        Add random playing card deck to table
      </button>
      <button className={classes.button} type="button" onClick={onAddUnoCardDeck} >
        Add random uno card deck to table
      </button>
      <Table width={900} height={600} />
    </div>
  );
};

export default HomePage;
