import React from 'react';
import WelcomeForm from './WelcomeForm.jsx'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userid: null,
      username: '',
      height: null,
      weight: null,
      age: null,
      gender: '',
      fname: '',
      lname: '',
      maxcals: null,
      appStatus: 'welcome'
    }
    this.changeStatus = this.changeStatus.bind(this);
    this.setUpUser = this.setUpUser.bind(this);
  }

  changeStatus(str) {
    this.setState({
      appStatus: str,
    })
  }

  setUpUser(obj) {
    this.setState(obj)
  }


  render() {
    if (this.state.appStatus === 'welcome') {
      return (
        <div>
          <WelcomeForm setUpUser={this.setUpUser} changeStatus={this.changeStatus}/>
        </div>
        )
    } else if (this.state.appStatus === 'login') {
      return (
        <div>Login</div>
      )
    }
    return (
      <div>is this thing on??</div>
    )
  }
}

export default App;
