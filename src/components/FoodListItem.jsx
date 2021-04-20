import React from 'react';
import PropTypes from 'prop-types';

const FoodListItem = ({ food }) => (
  <div>
    <div className="ListItem">

      <span className="itemName">{food.foodname}</span>
      <span className="itemCals">{food.caloriesin.toLocaleString()}</span>
    </div>
    <div className="divider" />
  </div>
);

FoodListItem.propTypes = {
  food: PropTypes.shape({
    foodname: PropTypes.string,
    caloriesin: PropTypes.number,
  }),
};

FoodListItem.defaultProps = {
  food: PropTypes.shape({
    foodname: '',
    caloriesin: '',
  }),
};

export default FoodListItem;
