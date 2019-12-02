# Interview Scheduler

Scheduler is a simple, single-page Interview Scheduling application using React.js.

This web based application allows users to book/edit/cancel an interview which will send the data to the back end server.

Upon success, client will get the values back from the database in the server and render the interviews in the appropriate slot of the day.

Please refer to attached gif files for demo.

## Final Product

!["demo of single page browser"](https://github.com/jusungchai/scheduler/blob/master/screenshots/SinglePage.gif)

!["demo of multi page browser"](https://github.com/jusungchai/scheduler/blob/master/screenshots/DualPage.gif)

## Getting Started

1. Download this repository.

2. Install dependencies with `npm install`.

3. Download/follow instructions for api server from https://github.com/jusungchai/scheduler-api

4. Run api server `npm start`

5. Run Webpack Development Server using `npm start`

6. Visit http://localhost:8000 on the browser

7. To checkout the application without downloading, please visit: 
  - https://lit-scheduler.herokuapp.com/api/days (must visit this link first to reload database from inactivity time out)
  - https://fervent-carson-75d1d8.netlify.com/ (visit this link second to launch application)

8. Enjoy!

## Dependencies
- babel/core 7.4.3 or above
- storybook/addon-actions 5.0.10 or above
- storybook/addon-backgrounds 5.0.10 or above
- storybook/addon-links 5.0.10 or above
- storybook/addons 5.0.10 or above
- storybook/react 5.0.10 or above
- testing-library/jest-dom 4.0.0 or above
- testing-library/react 8.0.7 or above
- testing-library/react-hooks 3.2.1 or above
- babel-loader 8.0.5 or above
- node-sass 4.11.0 or above
- prop-types 15.7.2 or above
- react-test-renderer 16.12.0 or above
