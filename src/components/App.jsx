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
      appStatus: 'welcome',
      currentIn: null,
      currentOut: null
    }
    this.changeStatus = this.changeStatus.bind(this);
    this.setUpUser = this.setUpUser.bind(this);
  }

  changeStatus(str) {
    this.setState({
      appStatus: str,
    })
  }

  updateIn() {
    const options = {
      method: 'get',
      url: '/updateIn',
      data: {id: this.state.userid}
    }
    axios(options)
      .then(res => {
        this.setState({
          currentIn: res,
        })
      })
  }

  updateOut() {
    const options = {
      method: 'get',
      url: '/updateOut',
      data: {id: this.state.userid}
    }
    axios(options)
      .then(res => {
        this.setState({
          currentOut: res,
        })
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
    } else if (this.state.appStatus === 'newUser') {
      return (
        <div>Enter Info</div>
      )
    }
    console.log(this.state)
    return (
      <div>is this thing on??</div>
    )
  }
}

export default App;
