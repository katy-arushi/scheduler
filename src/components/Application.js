import React, { useState, useEffect } from "react";
import "components/Application.scss";
import axios from "axios";

// components
import DayList from "./DayList";
import Appointment from "./Appointment";

export default function Application(props) {
  // states
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    // you may put the line below, but will have to remove/comment hardcoded appointments variable
    appointments: {}
  });

  const setDay = day => setState({ ...state, day });

  const setDays = (days) => {
    setState((prev) => {
      return { ...prev, days }
    });
  }

  useEffect(() => {
    axios.get("/api/days")
    .then((response) => (setDays([...response.data])))
  }, []);

  const appointmentsArray = Object.values(state.appointments).map(appointment => {
    return (
      <Appointment
        key={appointment.id} 
        {...appointment} 
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