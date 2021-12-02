export function getAppointmentsForDay(state, day) {
  const selectedDay = state.days.filter(eachDay => eachDay.name === day);

  const appointments = [];

  if (selectedDay[0]) { 
    const selectedDayAppointments = selectedDay[0].appointments;

    for (const appointmentID of selectedDayAppointments) {
      appointments.push(state.appointments[appointmentID]) 
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
  const selectedDay = state.days.filter(eachDay => eachDay.name === day);

  const interviewers = [];

  if (selectedDay[0]) {
    const selectedDayInterviewers = selectedDay[0].interviewers;

    for (const interviewerID of selectedDayInterviewers) {
      interviewers.push(state.interviewers[interviewerID])
    }
  } 
  return interviewers;
  
}