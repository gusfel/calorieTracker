import React from 'react';
import FoodListItem from './FoodListItem.jsx';

const FoodList = (props) => {
  return (
    <div>
      <p className="listHeader">Today's Food</p>
      <div className="listTitles">
        <span className="leftSubtitle">
          Food Name
        </span>
        <span className="rightSubtitle">
          Calories In
        </span>
      </div>
      <div className="lists">
        {props.foods.map(food => <FoodListItem key={food.id} food={food}/>)}
    </div>
    </div>
  )
}

export default FoodList;
