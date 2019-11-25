function getAppointmentsForDay(state, day) {
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

function getInterview(state, interview) {
  console.log("int", interview);
  console.log("state", state);
  if (interview) {
    const result = {
      "student": interview.student,
      "interviewer": state.interviewers[interview.interviewer]
    }
    return result;
  }
  return null;  
}

module.exports = {getAppointmentsForDay, getInterview}