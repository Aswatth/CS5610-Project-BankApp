import { configureStore } from "@reduxjs/toolkit";
import employeeReducer from "../admin-homepage/employee-reducer";

const store = configureStore({
  reducer: {
    employeeReducer,
  },
});

export default store;
