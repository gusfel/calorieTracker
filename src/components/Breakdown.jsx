import React from 'react';

const Breakdown = (props) => {
  const difference = props.userInfo.maxcals - props.userInfo.currentIn + props.userInfo.currentOut;

  return (
    <div>
      <div>
        <span id="caloriesToday">Calories Left Today: </span>
        <span id="caloriesLeft">{difference}</span>
      </div>
      <h3>Calories In: {props.userInfo.currentIn}</h3>
      <h3>Calories Out: {props.userInfo.currentOut}</h3>
    </div>
  )
}

export default Breakdown;
