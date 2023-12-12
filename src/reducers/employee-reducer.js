import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  employees: [],
  employee: {
    firstName: "",
    lastName: "",
    role: "",
    branch: "",
    email: "",
    phone: "",
  },
};

const employeeSlice = createSlice({
  name: "employee",
  initialState,
  reducers: {
    setFirstName: (state, action) => {
      state.employee = {
        ...state.employee,
        firstName: action.payload,
      };
      // console.log(state.employee);
    },
    setLastName: (state, action) => {
      state.employee = {
        ...state.employee,
        lastName: action.payload,
      };
      // console.log(state.employee);
    },
    setEmail: (state, action) => {
      state.employee = { ...state.employee, email: action.payload };
      // console.log(state.employee);
    },
    setPhone: (state, action) => {
      state.employee = {
        ...state.employee,
        phone: action.payload,
      };
      // console.log(state.employee);
    },
    setRole: (state, action) => {
      state.employee = { ...state.employee, role: action.payload };
      // console.log(state.employee);
    },
    setBranch: (state, action) => {
      state.employee = { ...state.employee, branch: action.payload };
      // console.log(state.employee);
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
        (f) => f.employeeID !== action.payload.employeeID
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
  setEmail,
  setPhone,
  setRole,
  setBranch,
  setEmployees,
  setEmployee,
  addEmployee,
  deleteEmployee,
  updateEmployee,
} = employeeSlice.actions;
export default employeeSlice.reducer;
