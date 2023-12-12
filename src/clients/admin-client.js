import axios from "axios";
import Cookies from "js-cookie";
import { useState } from "react";

const API = process.env.REACT_APP_API;

export const login = async (credential) => {
  const response = await axios.post(API + "/login", credential);
  return response;
};

export const getEmployees = async () => {
  const response = await axios.get(API + "/employees", {
    headers: {
      Authorization: `Bearer ${Cookies.get("bank-app-token")}`,
    },
  });
  console.log(response.data);
  return response.data;
};

export const addEmployee = async (employeeToAdd) => {
  // delete employeeToAdd.accessList;

  employeeToAdd = {
    ...employeeToAdd,
    username: `${employeeToAdd.firstName + employeeToAdd.lastName}`,
    password: "123",
  };

  console.log(employeeToAdd);

  const response = await axios.post(API + "/employees", employeeToAdd, {
    headers: {
      Authorization: `Bearer ${Cookies.get("bank-app-token")}`,
    },
  });
  return response.data;
};

export const deleteEmployee = async (employeeToDelete) => {
  const response = await axios.delete(
    API + "/employees/" + employeeToDelete.employeeID,
    {
      headers: {
        Authorization: `Bearer ${Cookies.get("bank-app-token")}`,
      },
    }
  );
  return response.data;
};

export const updateEmployee = async (employeeToUpdate) => {
  const response = await axios.put(
    API + "/employee/" + employeeToUpdate.employeeId,
    employeeToUpdate
  );
  return response.data;
};
