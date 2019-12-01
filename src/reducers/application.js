import spotsCounter from "helpers/spotsCounter";

const SET_DAY = "SET_DAY";
const SET_APPLICATION_DATA = "SET_APPLICATION_DATA";
const SET_INTERVIEW = "SET_INTERVIEW";

export default function reducer(state, action) {
switch (action.type) {
  case SET_DAY:
    return { ...state, day: action.day }
  case SET_APPLICATION_DATA:
    return { ...state, days: action.days, appointments: action.appointments, interviewers: action.interviewers }
  case SET_INTERVIEW: {
    //main logic to set interview
    //check if websocket message has interview value and save accordingly
    const appointment = {
      ...state.appointments[action.data.id],
      interview: action.data.interview ? { ...action.data.interview } : null
    };
    const appointments = {
      ...state.appointments,
      [action.data.id]: appointment
    };
    //update the spots remaining. (this is update all the days)
    //adding more days to the week, ie. weekends, is scaleable
    //adding more interview slots per day is not. constraint in function will only allow 5 slots per day
    const arr = spotsCounter(appointments);          
    for (let i in arr) {
      state.days[i].spots = arr[i];
    }
    return { ...state, appointments: action.appointments ? action.appointments : appointments }            
  }
  default:
    throw new Error(
      `Tried to reduce with unsupported action type: ${action.type}`
    );
  }
}

export { SET_DAY, SET_APPLICATION_DATA, SET_INTERVIEW }