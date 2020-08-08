import React from 'react';
import { createUseStyles } from 'react-jss';
import { BaseCard } from '../../atoms/BaseCard/BaseCard';

const useStyles = createUseStyles({
  homePage: {
    background: '#cccccc',
    height: '100%',
    color: 'white',
  },
});

const HomePage: React.FC = () => {
  const classes = useStyles();

  return (
    <div className={classes.homePage}>
      I am on homepage
      <BaseCard frontFace={<div>MY FRONT</div>} backFace={<div>MY BACK</div>} />
    </div>
  );
};

export default HomePage;
