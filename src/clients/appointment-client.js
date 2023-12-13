import axios from "axios";

const API = process.env.REACT_APP_API;

export const getAppointments = async (selectedDate) => {
  const response = await axios.get(
    API + `/availableAppointments?selectedDate=${selectedDate}`
  );
  return response;
};

export const ScheduleAppointment = async (
  appointmentId,
  customerInfo,
  purpose
) => {
  let dataToSend = {
    appointmentId: appointmentId,
    firstName: customerInfo.firstName,
    lastName: customerInfo.lastName,
    dateOfBirth: customerInfo.dateOfBirth,
    username: customerInfo.username,
    password: customerInfo.password,
    address: customerInfo.address,
    email: customerInfo.email,
    phone: customerInfo.phone,
    purpose: purpose,
    // customerId: "",
  };
  const response = await axios.post(API + `/bookAppointment`, dataToSend);
  return response;
};
