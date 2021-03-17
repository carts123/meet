# Meet App

To build a serverless, progressive web application (PWA) with React using a test-driven development (TDD) technique. The application uses the Google Calendar API to fetch upcoming events.

** ** Feature 1: Select a city

User Story

As a user,
I should be able to filter events by city
So that I can see the list of events that take place in that city.

Scenarios

Scenario 1: When the user hasn’t searched for a city, show upcoming events from all cities.
Given the user hasn’t searched for any city
When the user opens the app
Then the user should see a list of all upcoming events

Scenario 2: User should see a list of suggestions when they search for a city.
Given the main page is open
When the user starts typing in the city textbox
Then the user should see a list of cities (suggestions) that match what they’ve typed.

Scenario 3: User can select a city from the suggested list.
Given the user was typing “Berlin” in the city textbox and the list of suggested cities is showing
When the user selects a city (e.g. “Berlin, Germany”) from the list
Then their city should be changed to that city (i.e. “Berlin, Germany”) and the user should receive a list of upcoming events in that city.

** ** Feature 2: Show/Hide an event’s details

User Story

As a user,
I should be able to show/hide event details
So that I can expand or collapse the details of that event

Scenarios

Scenario 1: An event element is collapsed by default
Given an event element is collapsed
When the user opens the event element
Then the user can expand the event for more details

Scenario 2: User can expand an event to see its details 
Given the user can see a list of events
When the user clicks on an event
Then the user should see further details of that event 

Scenario 3: User can collapse an event to hide its details 
Given an event element is open
When a user clicks on the collapse button
Then the event element will collapse along with the event details

** ** Feature 3: Specify number of events

User Story

As a user,
I should be able to specify the number of events
So that I have the choice to choose from the number of events displayed

Scenarios

Scenario 1: When a user hasn’t specified a number, 32 is default number
Given the main page lists events
When the user doesn’t specify the amount of events
Then 32 events are loaded by default

Scenario 2: User can change the number of events they want to see
Given the main page lists events
When the user specifies the amount of events they want to see
Then the number of events they specified will be returned to the page

** ** Feature 4: Use the app when offline

User Story

As a user,
I should be able to use the app when offline
So that I can access the application without internet

Scenarios

Scenario 1: Show cached data when there’s no internet connection
Given the user is not connected to the internet
When the user opens the app
Then the app will show cached data 

Scenario 2: Show error when user changes the settings (city, time range)
Given the user is not connected to the internet
When the user attempts to change the settings (city, time range)
Then the app will show an error that the user must reconnect to the internet if they would like to make changes to the settings

** ** Feature 5: Data visualisation

User Story

As a user,
I should be able to visualise event data
So that I can gain a clearer picture of the events and decide which ones I should attend

Scenarios

Scenario 1: Show a chart with the number of upcoming events in each city 
Given the user wants to compare cities with the most relevant events
When the user views the data 
Then the app will display data allowing for the user to compare cities and their number of relevant events
