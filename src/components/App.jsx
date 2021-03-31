import React from 'react';
import WelcomeForm from './WelcomeForm.jsx'
import Breakdown from './Breakdown.jsx'
import axios from 'axios';
import FoodList from './FoodList.jsx'
import WorkoutList from './WorkoutList.jsx'
import NewUserForm from './NewUserForm.jsx'
import AddWorkout from './AddWorkout.jsx'
import AddFood from './AddFood.jsx'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // userid: null,
      userid: 1,
      username: '',
      height: null,
      weight: null,
      age: null,
      gender: '',
      fname: '',
      lname: '',
      maxcals: null,
      appStatus: '',
      // appStatus: 'welcome',
      currentIn: 0,
      currentOut: 0,
      workouts: [],
      food: []
    }
    this.changeStatus = this.changeStatus.bind(this);
    this.setUpUser = this.setUpUser.bind(this);
    this.updateIn = this.updateIn.bind(this);
    this.updateOut = this.updateOut.bind(this);
    this.logOut = this.logOut.bind(this);
  }

  componentDidMount() {
    this.updateIn();
    this.updateOut();
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
      params: {id: this.state.userid}
    }
    axios(options)
      .then(res => {
        const todaysFood = res.data
        let totalIn = 0;
        todaysFood.forEach(food => {
          totalIn += food.caloriesin
        })
        this.setState({
          food: todaysFood,
          currentIn: totalIn,
        })
      })
  }

  updateOut() {
    const options = {
      method: 'get',
      url: '/updateOut',
      params: {id: this.state.userid}
    }
    axios(options)
      .then(res => {
        const todaysWork = res.data
        let totalOut = 0;
        todaysWork.forEach(workout => {
          totalOut += workout.caloriesout
        })
        this.setState({
          workouts: res.data,
          currentOut: totalOut
        })
      })
  }

  setUpUser(obj) {
    this.setState(obj)
    this.updateIn();
    this.updateOut();
  }

  logOut() {
    this.setState({
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
      currentIn: 0,
      currentOut: 0,
      workouts: [],
      food: []
    })
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
        <div>
          <NewUserForm setUpUser={this.setUpUser} changeStatus={this.changeStatus}/>
        </div>
      )
    }
    return (
      <div>
        <div>
          <button onClick={this.logOut}>Log Out</button>
        </div>
        <Breakdown userInfo={this.state}/>
        <div>
          <FoodList foods={this.state.food}/>
          <AddFood userid={this.state.userid} updateIn={this.updateIn}/>
          <WorkoutList workouts={this.state.workouts}/>
          <AddWorkout updateOut={this.updateOut} user={this.state}/>
        </div>
      </div>
    )
  }
}

export default App;
