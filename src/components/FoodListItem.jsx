import React from 'react';

const FoodListItem = ({ food }) => (
  <div>
    <div className="ListItem">

      <span className="itemName">{food.foodname}</span>
      <span className="itemCals">{food.caloriesin.toLocaleString()}</span>
    </div>
    <div className="divider" />
  </div>
);

export default FoodListItem;
