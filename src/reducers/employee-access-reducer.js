import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  employeeID: "",
  accessList: [
    { accessName: "view_customer_details", accessGiven: false },
    { accessName: "view_customer_transactions", accessGiven: false },
    { accessName: "create_customer", accessGiven: false },
    { accessName: "approve_card", accessGiven: false },
  ],
};

const accessSlice = createSlice({
  name: "employee-access",
  initialState,
  reducers: {
    setEmployeeId: (state, action) => {
      state.employeeID = action.payload;
    },
    //Access setting
    setViewCustomerAccess: (state, action) => {
      let accessIndex = state.accessList.findIndex(
        (f) => f.accessName == "view_customer_details"
      );
      state.accessList[accessIndex].accessGiven = action.payload;
    },
    setViewCustomerTransactionAccess: (state, action) => {
      let accessIndex = state.accessList.findIndex(
        (f) => f.accessName == "view_customer_transactions"
      );
      state.accessList[accessIndex].accessGiven = action.payload;
    },
    setCreateCustomerAccess: (state, action) => {
      let accessIndex = state.accessList.findIndex(
        (f) => f.accessName == "create_customer"
      );
      state.accessList[accessIndex].accessGiven = action.payload;
    },
    setApproveCardAccess: (state, action) => {
      let accessIndex = state.accessList.findIndex(
        (f) => f.accessName == "approve_card"
      );
      state.accessList[accessIndex].accessGiven = action.payload;
    },
  },
});

export const {
  setEmployeeId,
  setViewCustomerAccess,
  setViewCustomerTransactionAccess,
  setCreateCustomerAccess,
  setApproveCardAccess,
} = accessSlice.actions;
export default accessSlice.reducer;
