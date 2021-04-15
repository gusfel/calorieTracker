import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import CoolButton from '../CoolButton';

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
    const { food } = this.state;
    const { userid, displayDate, updateIn } = this.props;
    if (this.validate()) {
      const foodObj = {
        query: {
          query: food,
        },
        userid,
        date: displayDate,
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
            updateIn(displayDate);
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
    if (dataToCheck.food === '') {
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
    const { food, warning } = this.state;
    return (
      <div>
        <form id="addFoodForm" onSubmit={this.handleSubmit}>
          <label htmlFor="foodInput">
            <h4 className="enter">Enter Food:</h4>
            <span className="example">For example: 4 oz steak</span>
            <br />
            <input id="foodInput" type="text" name="food" value={food} onChange={this.handleInputChange} />
            <CoolButton name="Submit" func={this.handleSubmit} />
          </label>
        </form>
        {warning === 'invalid'
          ? (
            <div className="warning">
              Sorry we couldn&apos;t find that food, please try again
            </div>
          )
          : <></>}
        {warning === 'missingData'
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

AddFood.propTypes = {
  userid: PropTypes.number.isRequired,
  displayDate: PropTypes.string.isRequired,
  updateIn: PropTypes.func.isRequired,
};

export default AddFood;
