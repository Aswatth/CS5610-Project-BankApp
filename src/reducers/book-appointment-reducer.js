import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  appointmentId: -1,
  selectedBranch: "",
  selectedDate: "",
  selectedStartTime: "",
  selectedEndTime: "",
  purpose: "",
  customerInfo: {},
};

const bookAppointmentSlice = createSlice({
  name: "book-appointment",
  initialState,
  reducers: {
    setBranch: (state, action) => {
      state.selectedBranch = action.payload;
    },
    setDate: (state, action) => {
      state.selectedDate = action.payload;
    },
    setStartTime: (state, action) => {
      state.selectedStartTime = action.payload;
    },
    setEndTime: (state, action) => {
      state.selectedEndTime = action.payload;
    },
    setCustomerInfo: (state, action) => {
      state.customerInfo = action.payload;
    },
    setAppointmentId: (state, action) => {
      state.appointmentId = action.payload;
      console.log(state.appointmentId);
    },
    setPurpose: (state, action) => {
      state.purpose = action.payload;
    },
  },
});

export const {
  setAppointmentId,
  setBranch,
  setDate,
  setStartTime,
  setEndTime,
  setCustomerInfo,
  setPurpose,
} = bookAppointmentSlice.actions;
export default bookAppointmentSlice.reducer;
