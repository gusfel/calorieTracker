import React from 'react';
import FoodListItem from './FoodListItem.jsx';

const FoodList = (props) => {
  return (
    <div>
      Today's Food
    {props.foods.map(food => <FoodListItem key={food.id} food={food}/>)}
    </div>
  )
}

export default FoodList;
