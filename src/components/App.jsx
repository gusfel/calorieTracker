import React from 'react';
import WelcomeForm from './WelcomeForm.jsx'
import Breakdown from './Breakdown.jsx'
import axios from 'axios';
import FoodList from './FoodList.jsx'
import WorkoutList from './WorkoutList.jsx'
import NewUserForm from './NewUserForm.jsx'
import AddWorkout from './AddWorkout.jsx'
import AddFood from './AddFood.jsx'
import CoolButton from '../CoolButton.jsx'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userid: null,
      // userid: 1,
      username: '',
      height: null,
      weight: null,
      age: null,
      gender: '',
      fname: '',
      lname: '',
      maxcals: null,
      // appStatus: '',
      // appStatus: 'newUser',
      appStatus: 'welcome',
      currentIn: 0,
      currentOut: 0,
      workouts: [],
      food: [],
      date: '',
      displayDate: '',
    }
    this.changeStatus = this.changeStatus.bind(this);
    this.setUpUser = this.setUpUser.bind(this);
    this.updateIn = this.updateIn.bind(this);
    this.updateOut = this.updateOut.bind(this);
    this.logOut = this.logOut.bind(this);
    this.changeDate = this.changeDate.bind(this);
    this.changeToToday = this.changeToToday.bind(this);
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

  changeDate(direction) {
    let nextDate = new Date(this.state.displayDate);
    if (direction === 'back') {
      nextDate = nextDate.setDate(nextDate.getDate() - 1);
    } else {
      nextDate = nextDate.setDate(nextDate.getDate() + 1);
    }
    nextDate = new Date(nextDate)
    nextDate = nextDate.toLocaleDateString().slice(0, 10);
    this.setState({
      displayDate: nextDate
    })
    this.updateIn(nextDate)
    this.updateOut(nextDate)
  }

  changeToToday(){
    this.setState({
      displayDate: this.state.date,
    })
    this.updateIn(this.state.date)
    this.updateOut(this.state.date)
  }

  updateIn(date) {
    const options = {
      method: 'get',
      url: '/updateIn',
      params: {
        id: this.state.userid,
        date: date,
      }
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

  updateOut(date) {
    const options = {
      method: 'get',
      url: '/updateOut',
      params: {
        id: this.state.userid,
        date: date,
      }
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
    let date = new Date();
    date = date.toLocaleDateString().slice(0, 10);
    obj.date = date;
    obj.displayDate = date
    console.log(date)
    this.setState(obj)
    this.updateIn(date);
    this.updateOut(date);
    console.log(this.state)
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
        <div id="header">
          <span id="pageTitle">Most Valuable Calorie Tracker</span>
          <div id="logOutBtn">
            <CoolButton id="logout" func={this.logOut} name={'Log Out'} />
          </div>
        </div>
        <div id="mainApp">
          <div id="breakdown">
        <Breakdown userInfo={this.state}/>
        </div>
        <div id="fAndWLists">
          <div id="foodList">
            <FoodList foods={this.state.food}/>
            <AddFood userid={this.state.userid} displayDate={this.state.displayDate} updateIn={this.updateIn}/>
          </div>
          <div id="listDivider"/>
          <div id="workoutList">
            <WorkoutList workouts={this.state.workouts}/>
            <AddWorkout displayDate={this.state.displayDate} updateOut={this.updateOut} user={this.state}/>
          </div>
        </div>
        </div>
        <button onClick={() => {this.changeDate('back')}}>back</button>
        <button onClick={() => {this.changeDate('forward')}}>forward</button>
        <button onClick={() => {this.changeToToday()}}>today</button>
      </div>
    )
  }
}

export default App;
