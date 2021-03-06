import React, { Component } from 'react';
import './App.css';
import './nprogress.css';
import EventList from './EventList';
import CitySearch from './CitySearch';
import NumberOfEvents from './NumberOfEvents';
import EventGenre from './EventGenre';
import { getEvents } from './api';
import { OfflineAlert } from './Alert';
import {
  ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';


class App extends Component {
  state = {
    events: [],
    locations: [],
    numberOfEvents: 32,
    currentLocation: 'all',
    alertText: '',
  };

  updateEvents = (location, eventCount) => {
    if (!navigator.onLine) {
      this.setState({
        alertText: 'You are currently offline and viewing cached data from your last visit.',
      });
    } else {
      this.setState({
        alertText: '',
      });
    }

    const { currentLocation, numberOfEvents } = this.state;
    if (location) {
      getEvents().then((data) => {
        const locationEvents = location === 'all' ? data.events : data.events.filter((event) => event.location === location);
        const filteredEvents = locationEvents.slice(0, numberOfEvents);
        return this.setState({
          events: filteredEvents,
          currentLocation: location,
        });
      });
    } else {
      getEvents().then((data) => {
        const locationEvents = currentLocation === 'all' ? data.events : data.events.filter((event) => event.location === currentLocation);
        const filteredEvents = locationEvents.slice(0, eventCount);
        if (this.mounted) {
          return this.setState({
            events: filteredEvents,
            numberOfEvents: eventCount
          });
        }
      });
    }
  };

  componentDidMount() {
    this.mounted = true;
    getEvents().then((data) => {
      if (this.mounted) {
        this.setState({
          events: data.events,
          locations: data.locations
        });
      }
    });
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  getData() {
    const { locations, events } = this.state;
    const data = locations.map((location) => {
      const number = events.filter((event) => event.location === location).length;
      const city = location.split(',').shift();
      return { city, number };
    })
    return data;
  };

  render() {
    const { locations, numberOfEvents, events } = this.state;
    return (
      <div className="App">
        <h1>Meet App</h1>
        <CitySearch locations={locations} updateEvents={this.updateEvents} />
        <NumberOfEvents numberOfEvents={numberOfEvents} updateEvents={this.updateEvents} />
        <OfflineAlert text={this.state.alertText} />
        <h4>Events in each city</h4>

        <div className="data-vis-wrapper">
          <EventGenre events={events} />
          <ResponsiveContainer height={400} >
            <ScatterChart margin={{ top: 20, right: 20, bottom: 10, left: 10 }}>

              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="category" dataKey="city" name="City" />
              <YAxis type="number" dataKey="number" name="Number of events" allowDecimals={false} />
              <Tooltip cursor={{ strokeDasharray: '3 3' }} />
              <Legend />
              <Scatter data={this.getData()} fill="#8884d8" />
            </ScatterChart>
          </ResponsiveContainer>
        </div>
        <EventList events={events} />

      </div>

    );
  }
}

export default App;
