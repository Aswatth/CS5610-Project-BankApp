import axios from "axios";
import Cookies from "js-cookie";
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
