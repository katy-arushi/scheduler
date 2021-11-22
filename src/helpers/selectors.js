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

export function getInterviewer(state, interview) {

}

// This function will return an object that contains the interview data 
  // if it is passed an object that contains an interviewer.

// The function should return a new object containing the interview data when we pass it an object that contains the interviewer. 
  // Otherwise, the function should return null.
  // The object it returns should look like this:

    // {  
    //   "student": "Lydia Miller-Jones",
    //   "interviewer": {  
    //     "id": 1,
    //     "name": "Sylvia Palmer",
    //     "avatar": "https://i.imgur.com/LpaY82x.png"
    //   }
    // }

// need to transform an interview object with an id representing the interviewer to an object containing a nested object. 