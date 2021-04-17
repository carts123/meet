import React from 'react';
import { loadFeature, defineFeature } from 'jest-cucumber';
import { mount } from 'enzyme';
import App from '../App';
import NumberOfEvents from '../NumberOfEvents';
import { mockData } from '../mock-data';

const feature = loadFeature('./src/features/specifyNumberOfEvents.feature');

defineFeature(feature, (test) => {
  test('If user hasn’t specified a number, 32 is the default number', ({ given, when, then }) => {
    let AppWrapper;

    given('the user did not specify a number of events', () => { });

    when('app is loaded', () => {
      AppWrapper = mount(<App />);
    });

    then('the default number of shown events is 32', () => {
      AppWrapper.update();
      expect(AppWrapper.find('.event').length).toBeLessThanOrEqual(32);
    });
  });

  test('User can change the number of events they want to see', ({ given, and, when, then }) => {
    let AppWrapper;

    given('app is loaded', () => {
      AppWrapper = mount(<App />);
    });

    and('the list of events has been loaded', () => {
      AppWrapper.update();
      expect(AppWrapper.find('.event')).toHaveLength(mockData.length);
    });

    when('the user specified a number', () => {
      const numberOfEvents = { target: { value: 1 } };
      AppWrapper.find('.number-of-events').simulate('change', numberOfEvents);
    });

    then('the app should load a maximum of the specified number of events', () => {
      const NumberOfEventsWrapper = AppWrapper.find(NumberOfEvents);
      NumberOfEventsWrapper.setState({ numberOfEvents: 1 });
      expect(NumberOfEventsWrapper.state('numberOfEvents')).toBe(1);
    });
  });
});