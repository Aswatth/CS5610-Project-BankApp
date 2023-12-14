import axios from "axios";
import Cookies from "js-cookie";

const API = process.env.REACT_APP_API;

export const getAppointments = async (selectedDate) => {
  const response = await axios.get(
    API + `/availableAppointments?selectedDate=${selectedDate}`
  );
  return response;
};

export const scheduleJointAppointment = async (appointmentId, customers) => {
  let token = Cookies.get("bank-app-token");
  let dataToSend = { appointmentId: appointmentId, customers: customers };
  if (token) {
    const response = await axios.post(
      API + "/bookJoinAccountAppointment",
      dataToSend,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response;
  } else {
    return null;
  }
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
