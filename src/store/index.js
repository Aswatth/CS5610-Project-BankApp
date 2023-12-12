import { configureStore } from "@reduxjs/toolkit";
import employeeReducer from "../reducers/employee-reducer";
import employeeAccessReducer from "../reducers/employee-access-reducer";

const store = configureStore({
  reducer: {
    employeeReducer,
    employeeAccessReducer,
  },
});

export default store;
