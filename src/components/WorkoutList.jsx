import React from 'react';
import WorkoutListItem from './WorkoutListItem.jsx';

const WorkoutList = ({ workouts }) => (
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
      {workouts.map((workout) => <WorkoutListItem key={workout.id} workout={workout} />)}
    </div>
  </div>
);

export default WorkoutList;
