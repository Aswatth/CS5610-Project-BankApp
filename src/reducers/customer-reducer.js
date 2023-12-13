import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  customerId: 0,
  accountList: [],
};

const customerSlice = createSlice({
  name: "customerReducer",
  initialState,
  reducers: {
    setAccountList: (state, action) => {
      state.accountList = action.payload;
    },
  },
});

export const { setAccountList } = customerSlice.actions;
export default customerSlice.reducer;
