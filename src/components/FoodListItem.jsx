import React from 'react';

const FoodListItem = (props) => (
  <div>
    <div className="ListItem">

      <span className="itemName">{props.food.foodname}</span>
      <span className="itemCals">{props.food.caloriesin}</span>
    </div>
    <div className="divider" />
  </div>
);

export default FoodListItem;
