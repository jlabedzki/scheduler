# Interview Scheduler

Interview Scheduler is a single-page application where users can navigate through a list of days and book, edit, or cancel appointments with a list of available mentors. The app updates schedule information in real-time for concurrent users via WebSockets.

This project was made using:

- Front end:
  - React
  - SASS
  - WebPack
  - Babel
  - Axios
- Back end:
  - Node.js
  - Express
  - PostgreSQL
  - WebSockets
- Hosting/deployment:
  - Heroku (server API)
  - CircleCI (production app)
  - Netlify (production app)
- Testing/development:
  - Storybook
  - Jest
  - React testing library
  - WebPack Dev Server
  - Cypress

## Purpose

BEWARE: This project was built for learning purposes. It is not intended for use in production-grade software.

This project was created and published as part of my learnings at Lighthouse Labs.

## View Live Demo

NOTE: Loading the initial schedule may take a while as the app is hosted on free Heroku account, meaning the app will sleep after 30 minutes of idleness.

Head over to https://lhl-student-mentor-scheduler.netlify.app/ to get started!

## Final Product

!["Navigating list of days"](https://github.com/jlabedzki/scheduler/blob/master/docs/Navigate%20days.gif?raw=true)

!["Booking an appointment"](https://github.com/jlabedzki/scheduler/blob/master/docs/Book%20appointment.gif?raw=true)

!["Editing an appointment"](https://github.com/jlabedzki/scheduler/blob/master/docs/Edit%20appointment.gif?raw=true)

!["Cancelling an appointment"](https://github.com/jlabedzki/scheduler/blob/master/docs/Delete%20appointment.gif?raw=true)

!["WebSocket functionality"](https://github.com/jlabedzki/scheduler/blob/master/docs/WebSocket%20functionality.gif?raw=true)

## Setup

Clone both of the following repos via these commands:

- `git clone git@github.com:jlabedzki/scheduler.git`
- `git clone git@github.com:jlabedzki/scheduler-api.git`

Install dependencies with the command `npm install` for each of the repositories.

In the scheduler repo:

- `npm start` will start the WebPack development server
- `npm test` will start the Jest testing framework
- `npm run storybook` will launch Storybook
- `npm run cypress` will launch Cypress

In the scheduler-api repo:

- `npm start` will start the api server
- `npm run error` will start the api server in error mode, use this to test error handling in the project

Configuring the database:

- Follow the instructions in the scheduler-api's README file

## Dependencies

Scheduler:

- Production:
  - axios
  - classnames
  - normalize.css
  - react
  - react-dom
  - react-scripts
- Development:
  - @babel/core
  - @storybook/addon-actions
  - @storybook/addon-backgrounds
  - @storybook/addon-links
  - @storybook/addon
  - @storybook/react
  - @testing-library/jest-dom
  - @testing-library/react
  - @testing-library/react-hooks
  - babel-loader
  - cypress
  - node-sass
  - prop-types
  - react-test-renderer

Scheduler-api:

- Production:
  - body-parser
  - cors
  - dotenv
  - express
  - helmet
  - pg
  - socket.io
  - ws
- Development:
  - jest
  - supertest
