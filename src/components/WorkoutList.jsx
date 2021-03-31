import React from 'react';
import WorkoutListItem from './WorkoutListItem.jsx'

const WorkoutList = (props) => {
  return (
    <div>
      Today's Workouts
      <div className="lists">
        {props.workouts.map(workout => <WorkoutListItem key={workout.id} workout={workout}/>)}
      </div>
    </div>
  )
}

export default WorkoutList;
