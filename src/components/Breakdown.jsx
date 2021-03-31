import React from 'react';

const Breakdown = (props) => {
  const difference = props.userInfo.maxcals - props.userInfo.currentIn + props.userInfo.currentOut;

  return (
    <div>
      <div>
        <h2>Calories Left Today</h2>
        <h3>{difference}</h3>
      </div>
      <h3>Calories In Today: {props.userInfo.currentIn}</h3>
      <h3>Calories Out Today: {props.userInfo.currentOut}</h3>
    </div>
  )
}

export default Breakdown;
