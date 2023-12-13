import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedBranch: "",
  selectedDate: "",
  selectedStartTime: "",
  selectedEndTime: "",
  customerInfo: {},
};

const bookAppointmentSlice = createSlice({
  name: "book-appointment",
  initialState,
  reducers: {
    setBranch: (state, action) => {
      console.log("Setting branch to: " + action.payload);
      state.selectedBranch = action.payload;
      console.log(state.selectedBranch);
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
    setCusomterInfo: (state, action) => {
      state.customerInfo = action.payload;
    },
  },
});

export const { setBranch, setDate, setStartTime, setEndTime, setCusomterInfo } =
  bookAppointmentSlice.actions;
export default bookAppointmentSlice.reducer;
