import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  employeeID: "",
  accessList: [],
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
      if (accessIndex != -1) {
        state.accessList[accessIndex].accessGiven = action.payload;
      } else {
        let access = {
          accessName: "view_customer_details",
          accessGiven: action.payload,
        };
        state.accessList.push(access);
      }
    },
    setViewCustomerTransactionAccess: (state, action) => {
      let accessIndex = state.accessList.findIndex(
        (f) => f.accessName == "view_customer_transactions"
      );
      if (accessIndex != -1) {
        state.accessList[accessIndex].accessGiven = action.payload;
      } else {
        let access = {
          accessName: "view_customer_transactions",
          accessGiven: action.payload,
        };
        state.accessList.push(access);
      }
    },
    setCreateCustomerAccess: (state, action) => {
      let accessIndex = state.accessList.findIndex(
        (f) => f.accessName == "create_customer"
      );
      if (accessIndex != -1) {
        state.accessList[accessIndex].accessGiven = action.payload;
      } else {
        let access = {
          accessName: "create_customer",
          accessGiven: action.payload,
        };
        state.accessList.push(access);
      }
    },
    setApproveCardAccess: (state, action) => {
      let accessIndex = state.accessList.findIndex(
        (f) => f.accessName == "approve_card"
      );
      if (accessIndex != -1) {
        state.accessList[accessIndex].accessGiven = action.payload;
      } else {
        let access = {
          accessName: "approve_card",
          accessGiven: action.payload,
        };
        state.accessList.push(access);
      }
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
