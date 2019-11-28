import { useReducer, useEffect } from "react";
import axios from "axios";

export default function useApplicationData() {

  const SET_DAY = "SET_DAY";
  const SET_APPLICATION_DATA = "SET_APPLICATION_DATA";
  const SET_INTERVIEW = "SET_INTERVIEW";

  function reducer(state, action) {
    //console.log("state1", state)
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
          let arr = [];
      
      function spotCounter(updatedAppointments) {
        let count = 0;
        let counter = 0;
        for (let appointment of Object.values(updatedAppointments)) {
          console.log(appointment);
          if (!appointment.interview) {
            count++;
          }
          counter++;
          if (counter === 5) {
            arr.push(count);
            count = 0;
            counter = 0;
          }
        }
      }
      console.log("array before", arr);
      spotCounter(appointments);
      console.log("array after", arr);
      
      /* function spotCount(updatedAppointments) {
        let count = 0;
        for (let appointmentId of dayData[0].appointments) {          
          if (!updatedAppointments[appointmentId].interview) {
            count++;
          }          
        }
        return count;
      } */
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
    /* webSocket.onopen = function (event) {
      webSocket.send("ping"); 
    }; */
    webSocket.onmessage = function (event) {
      //console.log(event.data);
      const data = JSON.parse(event.data);
      if (data.type === "SET_INTERVIEW") {
        //console.log(data);
        dispatch({ type: SET_INTERVIEW, data })
      }
    }
  }, []);  

  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    
    return axios.put(`/api/appointments/${id}`, {interview})
    .then(() => {      
      const dayData = state.days.filter(d => d.name === state.day);
      console.log("state", state);
      console.log("day data", dayData);
      console.log("appointments", appointments);

      let arr = [];
      
      function spotCounter(updatedAppointments) {
        let count = 0;
        let counter = 0;
        for (let appointment of Object.values(updatedAppointments)) {
          console.log(appointment);
          if (!appointment.interview) {
            count++;
          }
          counter++;
          if (counter === 5) {
            arr.push(count);
            count = 0;
            counter = 0;
          }
        }
      }
      console.log("array before", arr);
      spotCounter(appointments);
      console.log("array after", arr);
      
      /* function spotCount(updatedAppointments) {
        let count = 0;
        for (let appointmentId of dayData[0].appointments) {          
          if (!updatedAppointments[appointmentId].interview) {
            count++;
          }          
        }
        return count;
      } */
      for (let i in arr) {
        state.days[i].spots = arr[i];
      }
      //state.days[dayData[0].id - 1].spots = spotCount(appointments);
      dispatch({
        type: SET_INTERVIEW,
        appointments
      })
    }
            
    );    
  }

  function cancelInterview(id) {
    const appointment = {
      ...state.appointments[id],
      interview: null
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    return axios.delete(`/api/appointments/${id}`)
    .then(() => {
      const dayData = state.days.filter(d => d.name === state.day);      
      let arr = [];
      
      function spotCounter(updatedAppointments) {
        let count = 0;
        let counter = 0;
        for (let appointment of Object.values(updatedAppointments)) {
          console.log(appointment);
          if (!appointment.interview) {
            count++;
          }
          counter++;
          if (counter === 5) {
            arr.push(count);
            count = 0;
            counter = 0;
          }
        }
      }
      console.log("array before", arr);
      spotCounter(appointments);
      console.log("array after", arr);
      
      /* function spotCount(updatedAppointments) {
        let count = 0;
        for (let appointmentId of dayData[0].appointments) {          
          if (!updatedAppointments[appointmentId].interview) {
            count++;
          }          
        }
        return count;
      } */
      for (let i in arr) {
        state.days[i].spots = arr[i];
      }
      dispatch({
        type: SET_INTERVIEW,
        appointments
      }) 
    }
      
    );
  }

  return { state, setDay, bookInterview, cancelInterview };

}