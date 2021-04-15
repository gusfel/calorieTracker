import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import WelcomeForm from './WelcomeForm';
import Breakdown from './Breakdown';
import FoodList from './FoodList';
import WorkoutList from './WorkoutList';
import NewUserForm from './NewUserForm';
import AddWorkout from './AddWorkout';
import AddFood from './AddFood';
import CoolButton from '../CoolButton';

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
      currentIn: 0,
      currentOut: 0,
      workouts: [],
      food: [],
      date: '',
      displayDate: '',
    };
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

  setUpUser(obj) {
    const newObj = obj;
    let date = new Date();
    date = date.toLocaleDateString().slice(0, 10);
    newObj.date = date;
    newObj.displayDate = date;
    this.setState(newObj);
    this.updateIn(date);
    this.updateOut(date);
  }

  updateIn(date) {
    const { userid } = this.state;
    const options = {
      method: 'get',
      url: '/updateIn',
      params: {
        id: userid,
        date,
      },
    };
    axios(options)
      .then((res) => {
        const todaysFood = res.data;
        let totalIn = 0;
        todaysFood.forEach((food) => {
          totalIn += food.caloriesin;
        });
        this.setState({
          food: todaysFood,
          currentIn: totalIn,
        });
      });
  }

  changeToToday() {
    const { date } = this.state;
    this.setState({
      displayDate: date,
    });
    this.updateIn(date);
    this.updateOut(date);
  }

  changeDate(direction) {
    const { displayDate } = this.state;
    let nextDate = new Date(displayDate);
    if (direction === 'back') {
      nextDate = nextDate.setDate(nextDate.getDate() - 1);
    } else {
      nextDate = nextDate.setDate(nextDate.getDate() + 1);
    }
    nextDate = new Date(nextDate);
    nextDate = nextDate.toLocaleDateString().slice(0, 10);
    this.setState({
      displayDate: nextDate,
    });
    this.updateIn(nextDate);
    this.updateOut(nextDate);
  }

  changeStatus(str) {
    this.setState({
      appStatus: str,
    });
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
      food: [],
    });
  }

  updateOut(date) {
    const { userid } = this.state;
    const options = {
      method: 'get',
      url: '/updateOut',
      params: {
        id: userid,
        date,
      },
    };
    axios(options)
      .then((res) => {
        const todaysWork = res.data;
        let totalOut = 0;
        todaysWork.forEach((workout) => {
          totalOut += workout.caloriesout;
        });
        this.setState({
          workouts: res.data,
          currentOut: totalOut,
        });
      });
  }

  render() {
    const {
      appStatus, food, displayDate, userid, workouts,
    } = this.state;
    if (appStatus === 'welcome') {
      return (
        <div>
          <WelcomeForm setUpUser={this.setUpUser} changeStatus={this.changeStatus} />
        </div>
      );
    } if (appStatus === 'newUser') {
      return (
        <div>
          <NewUserForm
            logOut={this.logOut}
            setUpUser={this.setUpUser}
            changeStatus={this.changeStatus}
          />
        </div>
      );
    }
    return (
      <div>
        <div id="header">
          <span className="pageTitle">Most Valuable Calorie Tracker</span>
          <div className="logOutBtn">
            <CoolButton id="logout" func={this.logOut} name="Log Out" />
          </div>
        </div>
        <div id="mainApp">
          <div id="breakdown">
            <Breakdown
              changeDate={this.changeDate}
              changeToToday={this.changeToToday}
              userInfo={this.state}
            />
          </div>
          <div id="fAndWLists">
            <div id="foodList">
              <FoodList foods={food} />
              <AddFood
                userid={userid}
                displayDate={displayDate}
                updateIn={this.updateIn}
              />
            </div>
            <div id="listDivider" />
            <div id="workoutList">
              <WorkoutList workouts={workouts} />
              <AddWorkout
                displayDate={displayDate}
                updateOut={this.updateOut}
                user={this.state}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
