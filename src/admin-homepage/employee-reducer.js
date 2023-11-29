import { createSlice } from "@reduxjs/toolkit";
import * as client from "./client";

const initialState = {
  employees: [],
  employee: {
    firstname: "",
    lastname: "",
    role: "",
    branch: "",
    emailId: "",
    mobileNumber: "",
    employeeId: "",
    viewCustomer: false,
    viewCustomerTransactions: false,
    createCustomer: false,
    approveCardRequests: false,
  },
};

const employeeSlice = createSlice({
  name: "employee",
  initialState,
  reducers: {
    setFirstName: (state, action) => {
      state.employee = {
        ...state.employee,
        firstname: action.payload,
      };
      console.log(state.employee);
    },
    setLastName: (state, action) => {
      state.employee = {
        ...state.employee,
        lastname: action.payload,
      };
      console.log(state.employee);
    },
    setEmailId: (state, action) => {
      state.employee = { ...state.employee, emailId: action.payload };
      console.log(state.employee);
    },
    setMobileNumber: (state, action) => {
      state.employee = {
        ...state.employee,
        mobilenumber: action.payload,
      };
      console.log(state.employee);
    },
    setRole: (state, action) => {
      state.employee = { ...state.employee, role: action.payload };
      console.log(state.employee);
    },
    setBranch: (state, action) => {
      state.employee = { ...state.employee, branch: action.payload };
      console.log(state.employee);
    },

    //Access setting
    setViewCustomerAccess: (state, action) => {
      state.employee = {
        ...state.employee,
        viewCustomer: action.payload,
      };
    },
    setViewCustomerTransactionAccess: (state, action) => {
      state.employee = {
        ...state.employee,
        viewCustomerTransactions: action.payload,
      };
    },
    setCreateCustomerAccess: (state, action) => {
      state.employee = {
        ...state.employee,
        createCustomer: action.payload,
      };
    },
    setApproveCardAccess: (state, action) => {
      state.employee = {
        ...state.employee,
        approveCardRequests: action.payload,
      };
    },

    //CRUD operations
    setEmployees: (state, action) => {
      state.employees = [...action.payload];
    },
    setEmployee: (state, action) => {
      state.employee = action.payload;
    },
    addEmployee: (state, action) => {
      state.employees.push(action.payload);
    },
    deleteEmployee: (state, action) => {
      state.employees = state.employees.filter(
        (f) => f.employeeId !== action.payload.employeeId
      );
    },
    updateEmployee: (state, action) => {
      const index = state.employees.findIndex(
        (f) => f.employeeId == action.payload.employeeId
      );
      state.employees[index] = action.payload;
    },
  },
});

export const {
  setFirstName,
  setLastName,
  setEmailId,
  setMobileNumber,
  setRole,
  setBranch,
  setViewCustomerAccess,
  setViewCustomerTransactionAccess,
  setCreateCustomerAccess,
  setApproveCardAccess,
  setEmployees,
  setEmployee,
  addEmployee,
  deleteEmployee,
  updateEmployee,
} = employeeSlice.actions;
export default employeeSlice.reducer;
