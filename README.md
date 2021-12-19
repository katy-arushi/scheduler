# Interview Scheduler

This single page client app has been built with React, and allows users to book, edit, and delete interview appointments. Users can save appointments and view the entire schedule of appointments happening from Monday to Friday.

The app makes requests to an API to fetch and update appointment data from a database.

As with all modern React apps, the Scheduler app features dynamic rendering of components, updating as the state of the data changes.

## Purpose
This project was created and published by [Arushi Katyal](https://github.com/katy-arushi) as part of the Web Development Program at [Lighthouse Labs](https://www.lighthouselabs.ca/).

## Screenshots
## App Overview
!["scheduler overview gif"]()

### App Homepage
!["scheduler homepage"](https://github.com/katy-arushi/scheduler/blob/master/public/images/screenshots/homepage.png?raw=true)
### Delete Appointment Confirmation
!["scheduler delete appointment"](https://github.com/katy-arushi/scheduler/blob/master/public/images/screenshots/delete_apt.png?raw=true)

## Setup

- Install dependencies with `npm install`.
- Fork and clone the [Scheduler API](https://github.com/lighthouse-labs/scheduler-api) project outside of the Scheduler project directory.

### Dependencies
- axios: ^0.24.0
- classnames: ^2.2.6
- normalize.css: ^8.0.1
- react: ^16.9.0
- react-dom: ^16.9.0
- react-hooks-testing-library: ^0.6.0
- react-scripts: 3.0.0

## Running Webpack Development Server

```sh
npm start
```
## Running Jest Test Framework

```sh
npm test
```
## Running Storybook Visual Testbed

```sh
npm run storybook
```