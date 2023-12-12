import axios from "axios";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { useState } from "react";

const API = process.env.REACT_APP_API;

export const login = async (credential) => {
  const response = await axios.post(API + "/login", credential);
  return response;
};

export const getEmployees = async () => {
  let token = Cookies.get("bank-app-token");
  if (token) {
    const response = await axios.get(API + "/employees", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } else {
    return null;
  }
};

export const addEmployee = async (employeeToAdd) => {
  let token = Cookies.get("bank-app-token");

  console.log("To add: " + JSON.stringify(employeeToAdd));
  if (token) {
    const response = await axios.post(API + "/employees", employeeToAdd, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } else {
    return null;
  }
};

export const updateEmployeeAccess = async (employeeId, accessToUpdate) => {
  let token = Cookies.get("bank-app-token");

  if (token) {
    const response = await axios.put(
      API + `/employees/${employeeId}/access`,
      { accessList: [...accessToUpdate] },
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

export const deleteEmployee = async (employeeToDelete) => {
  let token = Cookies.get("bank-app-token");
  if (token) {
    const response = await axios.delete(
      API + "/employees/" + employeeToDelete.employeeID,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response;
  }
};

export const updateEmployee = async (employeeToUpdate) => {
  let token = Cookies.get("bank-app-token");
  if (token) {
    const response = await axios.put(API + "/employees", employeeToUpdate, {
      headers: {
        Authorization: `Bearer ${Cookies.get("bank-app-token")}`,
      },
    });
    return response;
  } else {
    return null;
  }
};

export const isAdmin = async () => {
  let token = Cookies.get("bank-app-token");
  return token ? jwtDecode(token)["user_type"] == "admin" : false;
};
