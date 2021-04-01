import React from 'react';
import WorkoutListItem from './WorkoutListItem.jsx'

const WorkoutList = (props) => {
  
  return (
    <div>
      <p className="listHeader">Today's Workouts</p>
      <div className="listTitles">
        <span className="leftSubtitle">
          Workout
        </span>
        <span className="rightSubtitle">
          Calories Out
        </span>
      </div>
      <div className="lists">
        {props.workouts.map(workout => <WorkoutListItem key={workout.id} workout={workout}/>)}
      </div>
    </div>
  )
}

export default WorkoutList;
