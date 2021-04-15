import React from 'react';
import axios from 'axios';
import CoolButton from '../CoolButton';

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
    const { target } = event;
    const { name } = target;
    this.setState({
      [name]: target.value,
    });
  }

  handleSubmit() {
    const { setUpUser } = this.props;
    const options = {
      method: 'get',
      url: '/login',
      params: this.state,
    };
    axios(options)
      .then((res) => {
        if (res.data) {
          const userData = res.data;
          userData.appStatus = '';
          userData.userid = res.data.id;
          setUpUser(userData);
        } else {
          console.log('sorry');
          this.setState({
            warning: true,
          });
        }
      });
  }

  render() {
    const { userName, password, warning } = this.state;
    const { changeStatus } = this.props;
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
              <input type="text" placeholder="Username" name="userName" value={userName} onChange={this.handleInputChange} />
              <br />
              <input type="password" placeholder="Password" name="password" value={password} onChange={this.handleInputChange} />
            </form>
            <CoolButton name="Enter" func={this.handleSubmit} />
            {warning
              ? (
                <div className="warning">
                  Sorry no users match that username or password, please try again
                </div>
              )
              : <></>}
          </div>
          <div id="welcomeDivider" />
          <div id="loginNewUserBtn">
            <CoolButton type="submit" name="New User?" func={() => { changeStatus('newUser'); }} />
          </div>
        </div>
      </div>
    );
  }
}

export default WelcomeForm;
