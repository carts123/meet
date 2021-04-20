import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { debounce } from 'lodash';
import { ErrorAlert } from './Alert';

class NumberOfEvents extends Component {
  constructor() {
    super();
    this.throttleHandleInputChanged = debounce(this.throttleHandleInputChanged.bind(this), 500);
    this.handleInputChanged = this.handleInputChanged.bind(this);
  }

  state = {
    numberOfEvents: 32,
  };

  throttleHandleInputChanged(value) {
    this.props.updateEvents(null, value);
  }

  handleInputChanged = (event) => {
    const value = event.target.value;

    this.setState({
      numberOfEvents: value,
    });

    if (value < 1 || value > 32) {
      this.setState({
        infoText: 'Please enter a number between 1 and 32.',
      });
    } else {
      this.setState({
        infoText: '',
      });
      this.throttleHandleInputChanged(value);
    }
  };

  render() {
    return (
      <div className="number-of-events">
        <label className="number-of-events-label">Number of Events: </label>
        <input type="number" className="event-number" value={this.state.numberOfEvents} onChange={this.handleInputChanged}></input>
        <ErrorAlert text={this.state.infoText} />
      </div>
    );
  }
}

NumberOfEvents.propTypes = {
  updateEvents: PropTypes.func,
};
NumberOfEvents.defaultProps = {
  updateEvents: () => { },
};

export default NumberOfEvents;