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

WorkoutListItem.propTypes = {
  workout: PropTypes.shape({
    exercise: PropTypes.string,
    caloriesout: PropTypes.number,
  }),
};

WorkoutListItem.defaultProps = {
  workout: PropTypes.shape({
    exercise: '',
    caloriesout: '',
  }),
};

export default WorkoutListItem;
