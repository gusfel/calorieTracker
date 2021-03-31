import React from 'react';
import WorkoutListItem from './WorkoutListItem.jsx'

const WorkoutList = (props) => {
  return (
    <div>
      Today's Workouts
      {props.workouts.map(workout => <WorkoutListItem key={workout.id} workout={workout}/>)}
    </div>
  )
}

export default WorkoutList;
