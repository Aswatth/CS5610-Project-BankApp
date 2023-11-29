import axios from "axios";

const API = "http://localhost:4000/api/admin";

export const getEmployees = async () => {
  const response = await axios.get(API + "/employees");
  return response.data;
};

export const addEmployee = async (employeeToAdd) => {
  const response = await axios.post(API + "/employees", employeeToAdd);
  return response.data;
};

export const deleteEmployee = async (employeeToDelete) => {
  const response = await axios.delete(
    API + "/employee/" + employeeToDelete.employeeId
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
