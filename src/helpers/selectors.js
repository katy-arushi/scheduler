export function getAppointmentsForDay(state, day) {
  const selectedDay = state.days.filter(eachDay => eachDay.name === day); //    [ { id: 1, name: 'Monday', appointments: [ 1, 2, 3 ] } ]

  const appointments = [];

  if (selectedDay[0]) { // { id: 1, name: 'Monday', appointments: [ 1, 2, 3 ] }
    const selectedDayAppointments = selectedDay[0].appointments; // [1, 2, 3]

    for (const appointmentID of selectedDayAppointments) { // 1
      appointments.push(state.appointments[appointmentID]) // { id: 1, time: "12pm", interview: null }
    }
  } 
  return appointments;
}

export function getInterview(state, interview) {
  if (!interview) {
    return null;
  }

  // get the interviewerID from the object passed as argument
  const interviewerID = interview.interviewer;

  // format the return object and get the data from the state object
  const returnObject = {  
    "student": interview.student,
    "interviewer": {  
      "id": state.interviewers[interviewerID].id,
      "name": state.interviewers[interviewerID].name,
      "avatar": state.interviewers[interviewerID].avatar
    }
  }

  return returnObject;
}

export function getInterviewersForDay(state, day) {
  const selectedDay = state.days.filter(eachDay => eachDay.name === day); //    [ { id: 1, name: 'Monday', appointments: [ 1, 2, 3 ] } ]

  const interviewers = [];

  if (selectedDay[0]) { // { id: 1, name: 'Monday', appointments: [ 1, 2, 3 ] }
    const selectedDayInterviewers = selectedDay[0].interviewers; // [1, 2, 3]

    for (const interviewerID of selectedDayInterviewers) { // 1
      interviewers.push(state.interviewers[interviewerID]) // { id: 1, time: "12pm", interview: null }
    }
  } 
  return interviewers;
  
}