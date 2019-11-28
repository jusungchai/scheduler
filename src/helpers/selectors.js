function getAppointmentsForDay(state, day) {
  const appointmentsForDay = [];
  const dayData = state.days.filter(d => d.name === day);
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
  if (interview) {
    const result = {
      "student": interview.student,
      "interviewer": state.interviewers[interview.interviewer]
    }
    return result;
  }
  return null;  
}

function getInterviewersForDay(state, day) {
  const interviewersForDay = [];
  const dayData = state.days.filter(d => d.name === day);
  if (dayData.length === 0) {
    return interviewersForDay;
  } else {
    for (let interviewer of dayData[0].interviewers) {
      interviewersForDay.push(state.interviewers[interviewer]);
    }
  }
  return interviewersForDay;
}

module.exports = {getAppointmentsForDay, getInterview, getInterviewersForDay}