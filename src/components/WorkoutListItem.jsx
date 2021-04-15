import React from 'react';
import PropTypes from 'prop-types';

const WorkoutListItem = ({ workout }) => (
  <div>
    <div className="ListItem">
      <span className="itemName">{workout.exercise}</span>
      <span className="itemCals">{workout.caloriesout.toLocaleString()}</span>
    </div>
    <div className="divider" />
  </div>
);

export default WorkoutListItem;
