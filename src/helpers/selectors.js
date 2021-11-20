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