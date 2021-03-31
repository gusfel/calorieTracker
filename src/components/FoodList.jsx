import React from 'react';
import FoodListItem from './FoodListItem.jsx';

const FoodList = (props) => {
  return (
    <div>
    {props.foods.map(food => <FoodListItem key={food.id} food={food}/>)}
    </div>
  )
}

export default FoodList;
