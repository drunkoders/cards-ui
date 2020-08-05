import React from 'react';
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
  homePage: {
    background: '#1941e3',
    height: '100%',
    color: 'white',
  },
});

const HomePage: React.FC = () => {
  const classes = useStyles();

  return <div className={classes.homePage}>I am on homepage</div>;
};

export default HomePage;
