import { configureStore } from "@reduxjs/toolkit";
import employeeReducer from "../reducers/employee-reducer";
import employeeAccessReducer from "../reducers/employee-access-reducer";
import bookAppointmentReducer from "../reducers/book-appointment-reducer";
import customerReducer from "../reducers/customer-reducer";

const store = configureStore({
  reducer: {
    employeeReducer,
    employeeAccessReducer,
    bookAppointmentReducer,
    customerReducer,
  },
});

export default store;
