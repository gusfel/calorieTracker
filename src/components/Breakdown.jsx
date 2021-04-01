import React from 'react';

const Breakdown = (props) => {
  const difference = (props.userInfo.maxcals - props.userInfo.currentIn + props.userInfo.currentOut).toLocaleString();
  return (
    <div>
      <div id="breakdownTop">
        {props.userInfo.date === props.userInfo.displayDate
          ? (
            <>
              <button className="back" onClick={() => { props.changeDate('back'); }} />
              <span id="caloriesToday">Calories Left Today: </span>
              {' '}
              {difference < 0
                ? <span style={{ color: 'red' }} id="caloriesLeft">{difference}</span>
                : <span id="caloriesLeft">{difference}</span>}
            </>
          )
          : (
            <>
              <button className="back" onClick={() => { props.changeDate('back'); }} />
              <span id="caloriesToday">
                Calories Left on
                {' '}
                {props.userInfo.displayDate}
                :
                {' '}
              </span>
              {' '}
              {difference < 0
                ? <span style={{ color: 'red' }} id="caloriesLeft">{difference}</span>
                : <span id="caloriesLeft">{difference}</span>}
              <button className="forward" onClick={() => { props.changeDate('forward'); }} />
              <button className="today" onClick={() => { props.changeToToday(); }}>Back to<br />Today</button>
            </>
          )}
      </div>
      <div id="counters">
        <div className="counter">
          Calories In:
          {props.userInfo.currentIn}
        </div>
        <div className="counter">
          Calories Out:
          {props.userInfo.currentOut}
        </div>
      </div>
    </div>
  );
};

export default Breakdown;
