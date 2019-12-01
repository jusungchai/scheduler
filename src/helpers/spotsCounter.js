export default function spotsCounter(updatedAppointments) {
  let spotsRemainingPerDay = [];
  let spotsLeftInDay = 0;
  let appointmentSlotsCounter = 0;
  
  //loop through each appointment slot to count empty slots (null)
  for (let appointment of Object.values(updatedAppointments)) {
    if (!appointment.interview) {
      spotsLeftInDay++;
    }
    appointmentSlotsCounter++;
    //when day is finished, reset counters to check next day
    if (appointmentSlotsCounter === 5) {
      spotsRemainingPerDay.push(spotsLeftInDay);
      spotsLeftInDay = 0;
      appointmentSlotsCounter = 0;
    }
  }
  return spotsRemainingPerDay;
}
