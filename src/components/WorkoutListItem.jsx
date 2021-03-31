import React from 'react';

const WorkoutListItem = props => {
  return(
    <div>
      {props.workout.exercise}: Calories Out: {props.workout.caloriesout}
    </div>
  )
}

export default WorkoutListItem;