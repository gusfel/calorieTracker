import React from 'react';
import axios from 'axios';
import CoolButton from '../CoolButton.jsx'

class AddFood extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      food: '',
      // duration: '',
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
      food: '',
      // duration: '',
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

  handleSubmit() {
    if (this.validate()) {
      const foodObj = {
        query: {
          query: this.state.food,
        },
        userid: this.props.userid,
        date: this.props.displayDate,
        }
      const options = {
        method: 'post',
        url: '/food',
        params: foodObj,
      }
      axios(options)
        .then(res => {
          if (res.data === 'error') {
            this.setState({
              warning: 'invalid',
            })
          } else {
            this.props.updateIn(this.props.displayDate);
            this.clearState();
          }
        })
      // event.preventDefault();
    } else {
      this.setState({
        warning: 'missingData'
      })
      // event.preventDefault();
    }
  }

  render() {
    return (
      <div>
          <form onSubmit={this.handleSubmit}>
            <label>
              <h4 className="enter">Enter Food:</h4>
              <span className="example">For example: 4 oz steak</span>
              <br />
              <input type="text" name="food" value={this.state.food} onChange={this.handleInputChange} />
          <CoolButton name="Submit" func={this.handleSubmit}/>
            </label>
          </form>
          {this.state.warning === 'invalid' ?
            <div className="warning">
              Sorry we couldn't find that food, please try again
            </div>
            : <></>
          }
          {this.state.warning === 'missingData' ?
            <div className="warning">
              Please make sure all forms are completed
            </div>
            : <></>
          }
      </div>
    );
  }
}

export default AddFood;