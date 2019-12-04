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
  - https://fervent-carson-75d1d8.netlify.com/ (if slots do not load instantly, please wait as server is performing a get request to heroku's database from inactivity)

8. Enjoy!

## Dependencies
- axios 0.19.0 or above
- classnames 2.2.6 or above
- normalize.css 8.0.1 or above
- react 16.12.0 or above
- react-dom 16.9.0 or above
- react-scripts 3.0.0 or above
