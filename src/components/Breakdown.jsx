import React from 'react';

const Breakdown = (props) => {
  const difference = props.userInfo.maxcals - props.userInfo.currentIn + props.userInfo.currentOut;

  return (
    <div>
      <div id="breakdownTop">
        <span id="caloriesToday">Calories Left Today: </span>
        {difference < 0 ?
          <span style={{color: 'red'}} id="caloriesLeft">{difference}</span>
          : <span id="caloriesLeft">{difference}</span>
        }
        {/* <span id="caloriesLeft">{difference}</span> */}
      </div>
      <div id="counters">
        <div className="counter">Calories In: {props.userInfo.currentIn}</div>
        <div className="counter">Calories Out: {props.userInfo.currentOut}</div>
      </div>
    </div>
  )
}

export default Breakdown;
