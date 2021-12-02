import React, { useState, useEffect } from "react";
import axios from "axios";

export default function useApplicationData(props) {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });
  
  const setDay = day => setState({ ...state, day });

  useEffect(() => {
    const appointmentsURL = '/api/appointments'
    const daysURL = '/api/days'
    const interviewersURL = '/api/interviewers'
  
    const daysPromise = axios.get(daysURL)
    const appointmentsPromise = axios.get(appointmentsURL)
    const interviewersPromise = axios.get(interviewersURL)
  
    Promise.all([
      daysPromise,
      appointmentsPromise,
      interviewersPromise
    ]).then((response) => {
      setState(prev => ({
        ...prev,
        days: response[0].data,
        appointments: response[1].data,
        interviewers: response[2].data
      }))
    })
  }, [])

  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    return axios.put(`/api/appointments/${id}`, appointment)
      .then(() => {
        setState(prev => ({
          ...prev,
          appointments
        }))
      })
  }

  function cancelInterview(id) {
    return axios.delete(`/api/appointments/${id}`)
      .then(() => {
        setState((prev) => {
          const newAppointment = {
            ...prev.appointments[id],
            interview: null
          }
          return {
            ...prev,
            appointments:
            {
              ...prev.appointments,
              [id]: newAppointment
            }
          }
        })
      })
  }
  
  return { state, setDay, bookInterview, cancelInterview };

}

