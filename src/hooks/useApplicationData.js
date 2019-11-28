import { useReducer, useEffect } from "react";
import axios from "axios";
import spotsCounter from "helpers/spotsCounter";

export default function useApplicationData() {

  const SET_DAY = "SET_DAY";
  const SET_APPLICATION_DATA = "SET_APPLICATION_DATA";
  const SET_INTERVIEW = "SET_INTERVIEW";

  function reducer(state, action) {
    switch (action.type) {
      case SET_DAY:
        return { ...state, day: action.day }
      case SET_APPLICATION_DATA:
        return { ...state, days: action.days, appointments: action.appointments, interviewers: action.interviewers }
      case SET_INTERVIEW: {
        const appointment = action.data ? {
          ...state.appointments[action.data.id],
          interview: action.data.interview ? { ...action.data.interview } : null
        } : 0;
        const appointments = action.data ? {
          ...state.appointments,
          [action.data.id]: appointment
        } : 0;
        
        if (action.data) {
          const arr = spotsCounter(appointments);          
          for (let i in arr) {
            state.days[i].spots = arr[i];
          }
        }

        return { ...state, appointments: action.appointments ? action.appointments : appointments }            
      }
      default:
        throw new Error(
          `Tried to reduce with unsupported action type: ${action.type}`
        );
    }
  }

  const [state, dispatch] = useReducer(reducer, {
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  const setDay = day => dispatch({ type: SET_DAY, day });

  useEffect(() => {
    const webSocket = new WebSocket(process.env.REACT_APP_WEBSOCKET_URL);
    const daysData = axios.get("/api/days");
    const appointmentsData = axios.get("/api/appointments");
    const interviewersData = axios.get("/api/interviewers");
    Promise.all([daysData, appointmentsData, interviewersData])
      .then(all => {
        dispatch({ type: SET_APPLICATION_DATA, days: all[0].data, appointments: all[1].data, interviewers: all[2].data });
      })
    webSocket.onmessage = function (event) {
      const data = JSON.parse(event.data);
      if (data.type === "SET_INTERVIEW") {
        dispatch({ type: SET_INTERVIEW, data })
      }
    }
  }, []);  

  function bookInterview(id, interview) {   
    return axios.put(`/api/appointments/${id}`, {interview})      
  }

  function cancelInterview(id) {
    return axios.delete(`/api/appointments/${id}`)   
  }

  return { state, setDay, bookInterview, cancelInterview };

}