/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import PropTypes from 'prop-types';
import FoodListItem from './FoodListItem';

const FoodList = ({ foods }) => (
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
      {foods.map((food) => <FoodListItem key={food.id} food={food} />)}
    </div>
  </div>
);

// FoodList.propTypes = {
//   foods: PropTypes.arrayOf(PropTypes.object).isRequired,
// };

export default FoodList;
