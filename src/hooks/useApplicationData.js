import { useReducer, useEffect } from "react";
import axios from "axios";

import reducer, { SET_DAY, SET_APPLICATION_DATA, SET_INTERVIEW } from "reducers/application";

export default function useApplicationData() {

  //set initial state
  const [state, dispatch] = useReducer(reducer, {
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  const setDay = day => dispatch({ type: SET_DAY, day });

  //happens only once on new render
  //when websocket server receives a message, dispatch the data holding interview data (booked or null for delete)
  useEffect(() => {
    const webSocket = new WebSocket(process.env.REACT_APP_WEBSOCKET_URL || '');
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