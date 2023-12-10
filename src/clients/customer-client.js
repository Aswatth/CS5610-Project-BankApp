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

export const getEmployees = async () => {
  const response = await axios.get(API + "/employees", {
    headers: {
      Authorization: `Bearer ${token}`,
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
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const deleteEmployee = async (employeeToDelete) => {
  const response = await axios.delete(
    API + "/employees/" + employeeToDelete.employeeID,
    {
      headers: {
        Authorization: `Bearer ${token}`,
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
