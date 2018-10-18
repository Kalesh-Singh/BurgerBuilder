import React from 'react';
import {withRouter} from 'react-router-dom';

import classes from './Burger.module.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

const burger = (props) => {
    console.log(props);

  let transformedIngredients = Object.keys(props.ingredients)
    .map((ingredientKey) => {
      return [...Array(props.ingredients[ingredientKey])].map((_, i) => {
        return <BurgerIngredient key={ingredientKey + i} type={ingredientKey}/>
      });
    })
    .reduce((prev, curr) => {
      return prev.concat(curr);
    });

  if (transformedIngredients.length === 0) {
    transformedIngredients = <p>Please start adding ingredients!</p>;
  }

  console.log(transformedIngredients);

  return (
    <div className={classes.Burger}>
      <BurgerIngredient type='bread-top'/>
      {transformedIngredients}
      <BurgerIngredient type='bread-bottom'/>
    </div>
  );
};

export default withRouter(burger);