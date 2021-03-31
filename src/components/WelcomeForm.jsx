import React from 'react';
import axios from 'axios';

class WelcomeForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: '',
      password: '',
      warning: false,
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
  }

  handleSubmit(event) {
    const options = {
      method: 'get',
      url: '/login',
      params: this.state
    }
    axios(options)
      .then(res => {
        if (res.data) {
          const userData = res.data;
          userData.appStatus = ''
          userData.userid = res.data.id
          this.props.setUpUser(userData)
        } else {
          //show warning
          console.log('sorry')
          this.setState({
            warning: true,
          })
        }
      })
    event.preventDefault();
  }

  render() {
    return (
      <div>
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
            <input type="submit" value="Submit" />
          </form>
          {this.state.warning ?
            <div>
              Sorry no users match that username or password, please try again
            </div>
            : <></>
          }
        </div>
        <br />
        <div>
          <button onClick={() => {this.props.changeStatus('newUser')}}>New User?</button>
        </div>
      </div>
    );
  }
}

export default WelcomeForm;