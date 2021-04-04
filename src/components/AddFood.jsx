import React from 'react';
import axios from 'axios';
import CoolButton from '../CoolButton.jsx';

class AddFood extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      food: '',
      warning: false,
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.clearState = this.clearState.bind(this);
    this.validate = this.validate.bind(this);
  }

  handleInputChange(event) {
    const { target } = event;
    const { name } = target;
    this.setState({
      [name]: target.value,
      warning: false,
    });
  }

  handleSubmit() {
    if (this.validate()) {
      const foodObj = {
        query: {
          query: this.state.food,
        },
        userid: this.props.userid,
        date: this.props.displayDate,
      };
      const options = {
        method: 'post',
        url: '/food',
        params: foodObj,
      };
      axios(options)
        .then((res) => {
          if (res.data === 'error') {
            this.setState({
              warning: 'invalid',
            });
          } else {
            this.props.updateIn(this.props.displayDate);
            this.clearState();
          }
        });
    } else {
      this.setState({
        warning: 'missingData',
      });
    }
  }

  validate() {
    const dataToCheck = this.state;
    delete dataToCheck.warning;
    let valid = true;
    if (this.state.food === '') {
      valid = false;
    }
    return valid;
  }

  clearState() {
    this.setState({
      food: '',
      warning: false,
    });
  }

  render() {
    return (
      <div>
        <form id="addFoodForm" onSubmit={this.handleSubmit}>
          <label>
            <h4 className="enter">Enter Food:</h4>
            <span className="example">For example: 4 oz steak</span>
            <br />
            <input type="text" name="food" value={this.state.food} onChange={this.handleInputChange} />
            <CoolButton name="Submit" func={this.handleSubmit} />
          </label>
        </form>
        {this.state.warning === 'invalid'
          ? (
            <div className="warning">
              Sorry we couldn't find that food, please try again
            </div>
          )
          : <></>}
        {this.state.warning === 'missingData'
          ? (
            <div className="warning">
              Please make sure all forms are completed
            </div>
          )
          : <></>}
      </div>
    );
  }
}

export default AddFood;
