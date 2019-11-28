export default function spotsCounter(updatedAppointments) {
  let arr = [];
  let count = 0;
  let counter = 0;
  for (let appointment of Object.values(updatedAppointments)) {
    if (!appointment.interview) {
      count++;
    }
    counter++;
    if (counter === 5) {
      arr.push(count);
      count = 0;
      counter = 0;
    }
  }
  return arr;
}
