import { configureStore } from "@reduxjs/toolkit";
import employeeReducer from "../reducers/employee-reducer";

const store = configureStore({
  reducer: {
    employeeReducer,
  },
});

export default store;
