import React, { useState, useEffect } from "react";
import "components/Application.scss";
import axios from "axios";
import { getAppointmentsForDay, getInterview } from "helpers/selectors";

// components
import DayList from "./DayList";
import Appointment from "./Appointment";

export default function Application(props) {
  // states
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  useEffect(() => {
    const appointmentsURL = '/api/appointments'
    const daysURL = '/api/days'
    const interviewURL = '/api/interviewers'

    const daysPromise = axios.get(daysURL)
    const appointmentsPromise = axios.get(appointmentsURL)
    const interviewsPromise = axios.get(interviewURL)

    Promise.all([
      daysPromise,
      appointmentsPromise,
      interviewsPromise
    ]).then((response) => {
      setState(prev => ({
        ...prev,
        days: response[0].data,
        appointments: response[1].data,
        interviewers: response[2].data
      }))
    })
  }, [])
  
  const setDay = day => setState({ ...state, day });
  
  const dailyAppointments = getAppointmentsForDay(state, state.day);
  const appointmentsArray = dailyAppointments.map(appointment => {
    const interview = getInterview(state, appointment.interview);

    return (
      <Appointment
        key={appointment.id}
        id={appointment.id}
        time={appointment.time}
        interview={interview}
      />
    );
  });

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
          <DayList
            days={state.days}
            value={state.day}
            onChange={setDay}
          />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {appointmentsArray}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}