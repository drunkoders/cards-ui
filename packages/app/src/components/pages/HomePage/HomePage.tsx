import React from 'react';
import { createUseStyles } from 'react-jss';
import { Table, addRandomCardToTable, addRandomCardDeckToTable } from '@cardz/components';
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

  const onAddCardToTable = () => {
    dispatch(addRandomCardToTable())
  };

  const onAddCardDeckToTable = () => {
    dispatch(addRandomCardDeckToTable())
  };

  return (
    <div className={classes.homePage}>
      <button className={classes.button} type="button" onClick={onAddCardToTable} >
        Add random card to table
      </button>
      <button className={classes.button} type="button" onClick={onAddCardDeckToTable} >
        Add random card deck to table
      </button>
      <Table width={900} height={600} />
    </div>
  );
};

export default HomePage;
