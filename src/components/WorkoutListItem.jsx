import React from 'react';

const WorkoutListItem = props => {
  return(
    <div>
      {props.workout.exercise}: {props.workout.duration} min. Calories: {props.workout.caloriesout}
    </div>
  )
}

export default WorkoutListItem;