import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import CoolButton from '../CoolButton';

class NewUserForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: '',
      password: '',
      height: '',
      weight: '',
      age: '',
      gender: '',
      fname: '',
      lname: '',
      maxcals: '',
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
    let { value } = target;
    if (name === 'height') {
      value *= 2.54;
    }
    if (name === 'weight') {
      value *= 0.454;
    }
    this.setState({
      [name]: value,
      warning: false,
    });
  }

  handleSubmit(event) {
    const { setUpUser } = this.props;
    if (this.validate()) {
      const options = {
        method: 'post',
        url: '/newUser',
        params: this.state,
      };
      axios(options)
        .then((res) => {
          if (res.data === 'error') {
            this.setState({
              warning: 'username',
            });
          } else {
            const userData = res.data;
            userData.appStatus = '';
            userData.userid = res.data.id;
            setUpUser(userData);
            this.clearState();
          }
        });
      event.preventDefault();
    } else {
      this.setState({
        warning: 'missingData',
      });
      event.preventDefault();
    }
  }

  clearState() {
    this.setState({
      userName: '',
      password: '',
      height: '',
      weight: '',
      age: '',
      gender: '',
      fname: '',
      lname: '',
      maxcals: '',
      warning: false,
    });
  }

  validate() {
    const dataToCheck = this.state;
    delete dataToCheck.warning;
    let valid = true;
    Object.keys(dataToCheck).forEach((key) => {
      if (dataToCheck[key] === '') {
        valid = false;
      }
    });
    return valid;
  }

  render() {
    const { logOut } = this.props;
    const {
      userName, password, fname, lname, age, gender, maxcals, warning,
    } = this.state;
    return (
      <div id="newUserPage">
        <div id="newUserHeader">
          <span className="pageTitle">Most Valuable Calorie Tracker</span>
          <div className="logOutBtn">
            <CoolButton id="goBack" func={logOut} name="Back" />
          </div>
        </div>
        <div id="newUserSubtitle">
          New User Sign Up
        </div>
        <div id="newUserForm">
          <form onSubmit={this.handleSubmit}>
            <div role="group">
              <label htmlFor="userName">
                Username:&nbsp;
                <input id="userName" type="text" name="userName" value={userName} onChange={this.handleInputChange} />
              </label>
              <label htmlFor="password">
                Password:&nbsp;
                <input id="password" type="password" name="password" value={password} onChange={this.handleInputChange} />
              </label>
            </div>
            <div className="divider" />
            <div role="group">
              <label htmlFor="fname">
                First Name:&nbsp;
                <input id="fname" type="text" name="fname" value={fname} onChange={this.handleInputChange} />
              </label>
              <label htmlFor="lname">
                Last Name:&nbsp;
                <input id="lname" type="text" name="lname" value={lname} onChange={this.handleInputChange} />
              </label>
            </div>
            <div className="divider" />
            <div role="group">
              <label htmlFor="age">
                Age:&nbsp;
                <input id="age" type="number" name="age" value={age} onChange={this.handleInputChange} />
              </label>
              <label htmlFor="gender">
                Gender:&nbsp;
                <select id="gender" name="gender" value={gender} onChange={this.handleInputChange}>
                  <option value="null"> </option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </label>
            </div>
            <div className="divider" />
            <div role="group">
              <label htmlFor="height">
                Height
                {' '}
                <span className="newUserMeasure">(inches)</span>
                :&nbsp;
                <input id="height" type="number" name="height" onChange={this.handleInputChange} />
              </label>
              <label htmlFor="weight">
                Weight
                {' '}
                <span className="newUserMeasure">(pounds)</span>
                :&nbsp;
                <input id="weight" type="number" name="weight" onChange={this.handleInputChange} />
              </label>
            </div>
            <div className="divider" />
            <div id="newUserMaxCals">
              <label htmlFor="maxcals">
                Max Daily Calories:&nbsp;
                <input id="maxcals" type="number" name="maxcals" value={maxcals} onChange={this.handleInputChange} />
              </label>
            </div>
            <CoolButton name="Submit" func={this.handleSubmit} />
          </form>
        </div>
        {warning === 'username'
          ? (
            <div className="warning">
              Sorry that username is already in use, please choose another
            </div>
          )
          : <></>}
        {warning === 'missingData'
          ? (
            <div className="warning">
              Please make sure all forms are completed before submitting
            </div>
          )
          : <></>}
      </div>
    );
  }
}

NewUserForm.propTypes = {
  setUpUser: PropTypes.func.isRequired,
  logOut: PropTypes.func.isRequired,
};

export default NewUserForm;
