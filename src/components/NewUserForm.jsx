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
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const name = target.name;
    this.setState({
      [name]: target.value,
    });
    console.log(this.state)
  }

  handleSubmit(event) {
    // const newState = {};
    // Object.keys(this.state).forEach(key => {
    //   newState[key] = this.state[key]
    // })
    const options = {
      method: 'post',
      url: '/newUser',
      params: this.state,
    }
    axios(options)
      .then(res => {
        const userData = res.data;
          userData.appStatus = ''
          userData.userid = res.data.id
          this.props.setUpUser(userData)
      })
    event.preventDefault();
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
              <input type="text" name="height" value={this.state.height} onChange={this.handleInputChange} />
            </label>
            <label>
              Weight:
              <input type="number" name="weight" value={this.state.weight} onChange={this.handleInputChange} />
            </label>
            <label>
              Gender:
              <input type="text" name="gender" value={this.state.gender} onChange={this.handleInputChange} />
            </label>
            <label>
              Max Daily Calories:
              <input type="number" name="maxcals" value={this.state.maxcals} onChange={this.handleInputChange} />
            </label>
            <input type="submit" value="Submit" />
          </form>
      </div>
    );
  }
}

export default NewUserForm;
