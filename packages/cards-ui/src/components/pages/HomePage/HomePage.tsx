import React from 'react';
import { createUseStyles } from 'react-jss';
import { Table } from '@organisms/Table';

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

  return (
    <div className={classes.homePage}>
      <h1>Card UI</h1>
      <Table width={900} height={600} />
    </div>
  );
};

export default HomePage;
