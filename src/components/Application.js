import React, { useState, useEffect } from "react";
import axios from "axios";
import "components/Application.scss";

import DayList from "./DayList";
import Appointment from "components/Appointment";
import {getAppointmentsForDay, getInterview, getInterviewersForDay} from "helpers/selectors";


export default function Application(props) {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });
  /* const [days, setDays] = useState([]);
  const [day, setDay] = useState("Monday");
  console.log(day); */
  const setDay = day => setState({ ...state, day });
  //const setDays = days => setState(prev => ({ ...prev, days }));;
  const interviewers = getInterviewersForDay(state, state.day);

  useEffect(() => {
    const daysData = axios.get("/api/days");
    const appointmentsData = axios.get("/api/appointments");
    const interviewersData = axios.get("/api/interviewers");
    Promise.all([daysData, appointmentsData, interviewersData])
      .then(all => {
        console.log("yo,", all);
        //setDays(response.data);
        setState(prev => ({ ...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data }));
      })
  }, []);

  console.log("interviewer state", state.interviewers);

  function bookInterview(id, interview) {
    console.log("Hello",id, interview);
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    /* setState({
      ...state,
      appointments
    }); */

    return axios.put(`/api/appointments/${id}`, {interview})
    .then(() =>
      setState({
        ...state,
        appointments
      })      
    );    
  }

  return (
    <main className="layout">
      <section className="sidebar">        
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList days={state.days} day={state.day} setDay={setDay} />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />        
      </section>
      <section className="schedule">
      {getAppointmentsForDay(state, state.day).map((appointment) => {
        const interview = getInterview(state, appointment.interview);
        return (
          <Appointment key={appointment.id} id={appointment.id} time={appointment.time} interview={interview} interviewers={interviewers} bookInterview={bookInterview}/>
        );
      })}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}
