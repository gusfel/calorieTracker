import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import CoolButton from '../CoolButton';

class AddWorkout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      workout: '',
      warning: false,
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.clearState = this.clearState.bind(this);
    this.validate = this.validate.bind(this);
  }

  handleInputChange(event) {
    const { target } = event;
    const { name } = target;
    this.setState({
      [name]: target.value,
      warning: false,
    });
  }

  handleSubmit() {
    const { workout } = this.state;
    const { user, displayDate, updateOut } = this.props;
    if (this.validate()) {
      const workoutObj = {
        workout: {
          query: workout,
          gender: user.gender,
          weight_kg: user.weight,
          height_cm: user.height,
          age: user.age,
        },
        userid: user.userid,
        date: displayDate,
      };
      const options = {
        method: 'post',
        url: '/exercise',
        params: workoutObj,
      };
      axios(options)
        .then((res) => {
          if (res.data === 'error') {
            this.setState({
              warning: 'invalid',
            });
          } else {
            updateOut(displayDate);
            this.clearState();
          }
        });
    } else {
      this.setState({
        warning: 'missingData',
      });
    }
  }

  clearState() {
    this.setState({
      workout: '',
      warning: false,
    });
  }

  validate() {
    const { workout } = this.state;
    const dataToCheck = this.state;
    delete dataToCheck.warning;
    let valid = true;
    if (workout === '') {
      valid = false;
    }
    return valid;
  }

  render() {
    const { workout, warning } = this.state;
    return (
      <div>
        <form id="addWorkoutForm" onSubmit={this.handleSubmit}>
          <label htmlFor="workoutInput">
            <h4 className="enter">Enter Your Workout:</h4>
            <span className="example">For example: 4 mile run</span>
            <br />
            <input id="workoutInput" type="text" name="workout" value={workout} onChange={this.handleInputChange} />
          </label>
          <CoolButton name="Submit" func={this.handleSubmit} />
        </form>
        {warning === 'invalid'
          ? (
            <div className="warning">
              Sorry we couldn&apos;t find that exercise, please try again
            </div>
          )
          : <></>}
        {warning === 'missingData'
          ? (
            <div className="warning">
              Please make sure all forms are completed
            </div>
          )
          : <></>}
      </div>
    );
  }
}

AddWorkout.propTypes = {
  displayDate: PropTypes.string.isRequired,
  updateOut: PropTypes.func.isRequired,
  user: PropTypes.shape({
    gender: PropTypes.string,
    weight: PropTypes.number,
    height: PropTypes.number,
    age: PropTypes.number,
    userid: PropTypes.number,
  }).isRequired,
};

export default AddWorkout;
