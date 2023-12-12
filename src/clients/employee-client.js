import axios from "axios";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

const API = process.env.REACT_APP_API;

export const getCreatedAppointments = async (selectedDate) => {
  const response = await axios.get(
    API + `/availableAppointments?selectedDate=${selectedDate}`
  );
  return response;
};

export const createNewAppointment = async (appointmentData) => {
  const response = await axios.post(API + "/appointments", appointmentData, {
    headers: {
      Authorization: `Bearer ${Cookies.get("bank-app-token")}`,
    },
  });
  return response;
};

export const getAssignedAppointments = async () => {
  const response = await axios.get(API + "/employee/viewAppointments", {
    headers: {
      Authorization: `Bearer ${Cookies.get("bank-app-token")}`,
    },
  });
  return response;
};

export const getEmployeeId = () => {
  let token = Cookies.get("bank-app-token");
  return jwtDecode(token)["user_type_id"];
};
