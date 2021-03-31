import React from 'react';
import axios from 'axios';

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

  handleSubmit(event) {
    if (this.validate()) {
      const foodObj = {
        query: {
          query: this.state.food,
        },
        userid: this.props.userid
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
            console.log(res.data)
            this.props.updateIn();
            this.clearState();
          }
        })
      event.preventDefault();
    } else {
      this.setState({
        warning: 'missingData'
      })
      event.preventDefault();
    }
  }

  render() {
    return (
      <div>
          <form onSubmit={this.handleSubmit}>
            <label>
              Food:
              <input type="text" name="food" value={this.state.food} onChange={this.handleInputChange} />
            </label>
            {/* <label>
              Duration (min):
              <input type="number" name="duration" value={this.state.duration} onChange={this.handleInputChange} />
            </label> */}
            <input type="submit" value="Submit" />
          </form>
          {this.state.warning === 'invalid' ?
            <div>
              Sorry we couldn't find that food, please try again
            </div>
            : <></>
          }
          {this.state.warning === 'missingData' ?
            <div>
              Please make sure all forms are completed
            </div>
            : <></>
          }
      </div>
    );
  }
}

export default AddFood;