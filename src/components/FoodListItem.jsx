import React from 'react';

const FoodListItem = (props) => {
  return (
    <div>
      {props.food.foodname}: {props.food.amount} {props.food.unit}
      Total Calories: {props.food.caloriesin}
    </div>
  )
}

export default FoodListItem;
