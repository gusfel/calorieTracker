import React from 'react';

const Breakdown = (props) => {
  const difference = props.userInfo.maxcals - props.userInfo.currentIn + props.userInfo.currentOut;

  // <button onClick={() => {this.changeDate('back')}}>back</button>
  // <button onClick={() => {this.changeDate('forward')}}>forward</button>
  // <button onClick={() => {this.changeToToday()}}>today</button>

  return (
    <div>
      <div id="breakdownTop">
        {props.userInfo.date === props.userInfo.displayDate ?
        <>
        <button onClick={() => {props.changeDate('back')}}>back</button><span id="caloriesToday">Calories Left Today: </span>        {difference < 0 ?
          <span style={{color: 'red'}} id="caloriesLeft">{difference}</span>
          : <span id="caloriesLeft">{difference}</span>
        }
        </>
        :   <><button onClick={() => {props.changeDate('back')}}>back</button><span id="caloriesToday">Calories Left on {props.userInfo.displayDate}: </span>        {difference < 0 ?
          <span style={{color: 'red'}} id="caloriesLeft">{difference}</span>
          : <span id="caloriesLeft">{difference}</span>
        }<button onClick={() => {props.changeDate('forward')}}>forward</button>
        <button onClick={() => {props.changeToToday()}}>today</button>
        </>
        }
      </div>
      <div id="counters">
        <div className="counter">Calories In: {props.userInfo.currentIn}</div>
        <div className="counter">Calories Out: {props.userInfo.currentOut}</div>
      </div>
    </div>
  )
}

export default Breakdown;
