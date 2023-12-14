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
  customerId,
  purpose
) => {
  let dataToSend = {
    appointmentId: appointmentId,
    customerDetails: customerInfo,
    purpose: purpose,
    customerId: customerId,
  };
  const response = await axios.post(API + `/bookAppointment`, dataToSend);
  return response;
};
