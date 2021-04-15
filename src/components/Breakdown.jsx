import React from 'react';
import PropTypes from 'prop-types';

const Breakdown = ({ userInfo, changeDate, changeToToday }) => {
  const difference = (
    userInfo.maxcals - userInfo.currentIn + userInfo.currentOut
  ).toLocaleString();
  return (
    <div>
      <div id="breakdownTop">
        {userInfo.date === userInfo.displayDate
          ? (
            <>
              <button type="button" aria-label="back" className="back" onClick={() => { changeDate('back'); }} />
              <span id="caloriesToday">Calories Left Today: </span>
              {' '}
              {difference < 0
                ? <span style={{ color: 'red' }} id="caloriesLeft">{difference}</span>
                : <span id="caloriesLeft">{difference}</span>}
            </>
          )
          : (
            <>
              <button type="button" aria-label="back" className="back" onClick={() => { changeDate('back'); }} />
              <span id="caloriesToday">
                Calories Left on
                {' '}
                {userInfo.displayDate}
                :
                {' '}
              </span>
              {' '}
              {difference < 0
                ? <span style={{ color: 'red' }} id="caloriesLeft">{difference}</span>
                : <span id="caloriesLeft">{difference}</span>}
              <button type="button" aria-label="forward" className="forward" onClick={() => { changeDate('forward'); }} />
              <button type="button" aria-label="today" className="today" onClick={() => { changeToToday(); }}>
                Back to
                <br />
                Today
              </button>
            </>
          )}
      </div>
      <div id="counters">
        <div className="counter">
          Calories In:
          {' '}
          {userInfo.currentIn.toLocaleString()}
        </div>
        <div className="counter">
          Calories Out:
          {' '}
          {userInfo.currentOut.toLocaleString()}
        </div>
      </div>
    </div>
  );
};

export default Breakdown;
