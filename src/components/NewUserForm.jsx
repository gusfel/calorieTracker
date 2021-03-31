import React from 'react';
import axios from 'axios';

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

  handleSubmit(event) {
    // this.setState({
    //   warning: false,
    // })
    if (this.validate()) {
      const options = {
        method: 'post',
        url: '/newUser',
        params: this.state,
      }
      axios(options)
        .then(res => {
          if (res.data === 'error') {
            this.setState({
              warning: 'username',
            })
          } else {
            const userData = res.data;
            userData.appStatus = ''
            userData.userid = res.data.id
            this.props.setUpUser(userData)
            this.clearState();
          }
        })
      event.preventDefault();
    } else {
      this.setState({
        warning: 'missingData'
      })
      event.preventDefault();
    }
  }

  render() {
    return (
      <div>
          <form onSubmit={this.handleSubmit}>
            <label>
              Username:
              <input type="text" name="userName" value={this.state.userName} onChange={this.handleInputChange} />
            </label>
            <label>
              Password:
              <input type="text" name="password" value={this.state.password} onChange={this.handleInputChange} />
            </label>
            <label>
              First Name:
              <input type="text" name="fname" value={this.state.fname} onChange={this.handleInputChange} />
            </label>
            <label>
              Last Name:
              <input type="text" name="lname" value={this.state.lname} onChange={this.handleInputChange} />
            </label>
            <label>
              Age:
              <input type="number" name="age" value={this.state.age} onChange={this.handleInputChange} />
            </label>
            <label>
              Height:
              <input type="number" name="height" value={this.state.height} onChange={this.handleInputChange} />
            </label>
            <label>
              Weight:
              <input type="number" name="weight" value={this.state.weight} onChange={this.handleInputChange} />
            </label>
            <label>
              Gender:
              <select name="gender" value={this.state.gender} onChange={this.handleInputChange} >
              <option value=""></option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </label>
            <label>
              Max Daily Calories:
              <input type="number" name="maxcals" value={this.state.maxcals} onChange={this.handleInputChange} />
            </label>
            <input type="submit" value="Submit" />
          </form>
          {this.state.warning === 'username' ?
            <div>
              Sorry that username is already in use, please choose another
            </div>
            : <></>
          }
          {this.state.warning === 'missingData' ?
            <div>
              Please make sure all forms are completed
            </div>
            : <></>
          }
      </div>
    );
  }
}

export default NewUserForm;
