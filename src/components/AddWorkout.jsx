import React from 'react';
import axios from 'axios';
import CoolButton from '../CoolButton.jsx';

class AddWorkout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      workout: '',
      // duration: '',
      warning: false,
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.clearState = this.clearState.bind(this);
    this.validate = this.validate.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const name = target.name;
    this.setState({
      [name]: target.value,
      warning: false,
    });
    console.log(this.state)
  }

  clearState() {
    this.setState({
      workout: '',
      // duration: '',
      warning: false,
    })
  }

  validate() {
    const dataToCheck = this.state;
    delete dataToCheck.warning;
    let valid = true;
    for (var key in dataToCheck) {
      if (dataToCheck[key] === '') {
        valid = false;
      }
    }

    return valid;
  }

  handleSubmit() {
    if (this.validate()) {
      const workoutObj = {
        workout: {
          query: this.state.workout,
          gender: this.props.user.gender,
          weight_kg: this.props.user.weight,
          height_cm: this.props.user.height,
          age: this.props.user.age,
        },
        userid: this.props.user.userid,
        date: this.props.displayDate,
      }
      const options = {
        method: 'post',
        url: '/exercise',
        params: workoutObj,
      }
      axios(options)
        .then(res => {
          if (res.data === 'error') {
            this.setState({
              warning: 'invalid',
            })
          } else {
            console.log(res.data)
            this.props.updateOut(this.props.displayDate);
            this.clearState();
          }
        })
    } else {
      this.setState({
        warning: 'missingData'
      })
    }
  }

  render() {
    return (
      <div>
          <form onSubmit={this.handleSubmit}>
            <label>
              <h4 className="enter">Enter Your Workout:</h4>
              <span className="example">For example: 4 mile run</span>
              <br />
              <input type="text" name="workout" value={this.state.workout} onChange={this.handleInputChange} />
            </label>
            <CoolButton name="Submit" func={this.handleSubmit}/>
          </form>
          {this.state.warning === 'invalid' ?
            <div className="warning">
              Sorry we couldn't find that exercise, please try again
            </div>
            : <></>
          }
          {this.state.warning === 'missingData' ?
            <div className="warning">
              Please make sure all forms are completed
            </div>
            : <></>
          }
      </div>
    );
  }
}

export default AddWorkout;
