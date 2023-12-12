import axios from "axios";
import { useState } from "react";

const API = process.env.REACT_APP_API;

let token = "";

export const login = async (credential) => {
  console.log(credential);
  const response = await axios.post(API + "/login", credential);
  console.log(response.data);
  token = response.data.token;
  return response.status;
};

export const register = async (customerData) => {
  const response = await axios.post(API + "/register", customerData);
  return response.status;
};
