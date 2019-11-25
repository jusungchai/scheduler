export function getAppointmentsForDay(state, day) {
  const appointmentsForDay = [];
  const dayData = state.days.filter(d => d.name === day);
  console.log(dayData);
  if (dayData.length === 0) {
    return appointmentsForDay;
  } else {
    for (let appointment of dayData[0].appointments) {
      appointmentsForDay.push(state.appointments[appointment]);
    }
  }
  return appointmentsForDay;
}