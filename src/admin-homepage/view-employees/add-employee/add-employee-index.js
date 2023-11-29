import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import { InputMask } from "primereact/inputmask";
import { useRef, useState } from "react";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";

import * as client from "../../client";
import * as employeeReducer from "../../employee-reducer";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import { useDispatch } from "react-redux";

export default function AddEmployee() {
  const dispatch = useDispatch();

  const roles = ["Employee", "Manager"];
  const [selectedRole, upadateSelectedRole] = useState(null);

  const branches = ["A1", "A2", "A3"];
  const [selectedBranch, updatedSelectedBranch] = useState(null);

  const access = [
    {
      viewCustomer: false,
      viewCustomerTransactions: false,
      createCustomer: false,
      approveCardRequests: false,
    },
  ];

  return (
    <div className="d-flex flex-column">
      <label htmlFor="firstname">First Name</label>
      <InputText
        id="firstname"
        placeholder="First name"
        onChange={(e) => {
          dispatch(employeeReducer.setFirstName(e.target.value));
        }}
      />
      <label htmlFor="lastname">Last Name</label>
      <InputText
        id="lastname"
        placeholder="Last name"
        onChange={(e) => {
          dispatch(employeeReducer.setLastName(e.target.value));
        }}
      />
      <label htmlFor="emailId">Email Id</label>
      <InputText
        id="emailId"
        placeholder="Email Id"
        onChange={(e) => {
          dispatch(employeeReducer.setEmailId(e.target.value));
        }}
      />
      <label htmlFor="role">Role</label>
      <Dropdown
        value={selectedRole}
        options={roles}
        onChange={(e) => {
          upadateSelectedRole(e.value);
          dispatch(employeeReducer.setRole(e.target.value));
        }}
      />
      <label htmlFor="branch">Branch</label>
      <Dropdown
        value={selectedBranch}
        options={branches}
        onChange={(e) => {
          updatedSelectedBranch(e.value);
          dispatch(employeeReducer.setBranch(e.target.value));
        }}
      />
      <label htmlFor="phone">Phone</label>
      <InputMask
        id="phone"
        mask="(999) 999-9999"
        placeholder="(999) 999-9999"
        onChange={(e) => {
          dispatch(employeeReducer.setMobileNumber(e.target.value));
        }}
      ></InputMask>
      <label htmlFor="access">Access:</label>

      <DataTable value={access}>
        <Column
          field="viewCustomer"
          header="View customer"
          body={(row) => {
            return (
              <div>
                <input
                  type="checkbox"
                  // checked={data}
                  onChange={(e) =>
                    dispatch(
                      employeeReducer.setViewCustomerAccess(e.target.value)
                    )
                  }
                />
              </div>
            );
          }}
        ></Column>
        <Column
          field="viewCustomerTransactions"
          header="View customer transactions"
          body={(row) => {
            return (
              <div>
                <input
                  type="checkbox"
                  // checked={data}
                  onChange={(e) =>
                    dispatch(
                      employeeReducer.setViewCustomerTransactionAccess(
                        e.target.value
                      )
                    )
                  }
                />
              </div>
            );
          }}
        ></Column>
        <Column
          field="createCustomer"
          header="Create customer"
          body={(row) => {
            return (
              <div>
                <input
                  type="checkbox"
                  // checked={data}
                  onChange={(e) =>
                    dispatch(
                      employeeReducer.setCreateCustomerAccess(e.target.value)
                    )
                  }
                />
              </div>
            );
          }}
        ></Column>
        <Column
          field="approveCardRequests"
          header="Approve card requests"
          body={(row) => {
            return (
              <div>
                <input
                  type="checkbox"
                  // checked={data}
                  onChange={(e) =>
                    dispatch(
                      employeeReducer.setApproveCardAccess(e.target.value)
                    )
                  }
                />
              </div>
            );
          }}
        ></Column>
      </DataTable>
      {/* <Toast ref={toast} /> */}
    </div>
  );
}
