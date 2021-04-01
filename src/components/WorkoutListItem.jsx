import React from 'react';

const WorkoutListItem = props => {
  return(
    <div>
      <div className="ListItem">
        <span className="itemName">{props.workout.exercise}</span>
        <span className="itemCals">{props.workout.caloriesout}</span>
      </div>
      <div className="divider"/>
    </div>
  )
}

export default WorkoutListItem;