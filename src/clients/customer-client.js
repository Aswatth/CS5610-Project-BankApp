import axios from "axios";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { useState } from "react";

const API = process.env.REACT_APP_API;

export const login = async (credential) => {
  const response = await axios.post(API + "/login", credential);
  return response;
};

export const register = async (customerData) => {
  const response = await axios.post(API + "/register", customerData);
  return response.status;
};

export const getAccounts = async () => {
  let token = Cookies.get("bank-app-token");
  if (token) {
    const response = await axios.get(API + "/bankAccounts", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } else {
    return null;
  }
};

export const getTransactions = async () => {
  let token = Cookies.get("bank-app-token");
  if (token) {
    const response = await axios.get(API + "/customerTransactions", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } else {
    return null;
  }
};

export const getCards = async () => {
  let token = Cookies.get("bank-app-token");
  if (token) {
    const response = await axios.get(API + "/cards", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } else {
    return null;
  }
};

export const sendMoney = async (transactionData) => {
  let token = Cookies.get("bank-app-token");
  if (token) {
    const response = await axios.post(API + "/transferMoney", transactionData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } else {
    return null;
  }
};

export const newCreditCardRequest = async (requestData) => {
  let token = Cookies.get("bank-app-token");
  if (token) {
    const response = await axios.post(API + "/applyCreditCard", requestData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } else {
    return null;
  }
};

export const viewAppointments = async () => {
  let token = Cookies.get("bank-app-token");
  if (token) {
    const response = await axios.get(API + "/viewAppointments", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } else {
    return null;
  }
};

export const cancelAppointment = async (appointmentIdToDelete) => {
  let token = Cookies.get("bank-app-token");
  if (token) {
    const response = await axios.post(
      API + `/cancelAppointment?id=${appointmentIdToDelete}`,
      {},
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

export const rescheduleAppointment = async (
  oldAppointmentId,
  newAppointmentId
) => {
  let requestBody = {
    oldAppointmentId: oldAppointmentId,
    newAppointmentId: newAppointmentId,
  };
  console.log(requestBody);
  let token = Cookies.get("bank-app-token");
  if (token) {
    const response = await axios.post(
      API + `/rescheduleAppointment`,
      requestBody,
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

export const viewCardRequests = async () => {
  let token = Cookies.get("bank-app-token");
  if (token) {
    const response = await axios.get(API + "/viewCardRequests", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } else {
    return null;
  }
};

export const getProfile = async () => {
  let token = Cookies.get("bank-app-token");
  console(getCustomerId());
  if (token) {
    const response = await axios.get(
      API + `/customer?customerId=${getCustomerId()}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log(response.data);
    return response;
  } else {
    return null;
  }
};

export const getCustomerId = () => {
  let token = Cookies.get("bank-app-token");
  return jwtDecode(token)["user_type_id"];
};
export const isCustomer = () => {
  let token = Cookies.get("bank-app-token");
  return token ? jwtDecode(token)["user_type"] == "customer" : false;
};
