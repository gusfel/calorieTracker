import React from 'react';
import axios from 'axios';
import CoolButton from '../CoolButton.jsx'

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
        <div id="newUserTitle">
          Most Valuable Calorie Tracker
        </div>
        <div id="welcomeSubtitle">
          Welcome Back!
        </div>
        <div id="loginSections">
          <div id="loginDiv">
            <form onSubmit={this.handleSubmit}>
              {/* <label> */}
                <input type="text" placeholder="Username" name="userName" value={this.state.userName} onChange={this.handleInputChange} />
              {/* </label> */}
              <br />
              {/* <label> */}
                <input type="password" placeholder="Password" name="password" value={this.state.password} onChange={this.handleInputChange} />
              {/* </label> */}
            </form>
            <CoolButton name={'Enter'} func={this.handleSubmit}/>
            {this.state.warning ?
              <div className="warning">
                Sorry no users match that username or password, please try again
              </div>
              : <></>
            }
          </div>
          <div id="welcomeDivider"/>
          <div id="loginNewUserBtn">
            <CoolButton name={'New User?'} func={() => {this.props.changeStatus('newUser')}}/>
          </div>
        </div>
      </div>
    );
  }
}

export default WelcomeForm;