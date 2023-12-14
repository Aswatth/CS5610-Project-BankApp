import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import { InputMask } from "primereact/inputmask";
import { useEffect, useRef, useState } from "react";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";

import * as client from "../../../clients/admin-client";
import * as employeeReducer from "../../../reducers/employee-reducer";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import { useDispatch, useSelector } from "react-redux";
import * as employeeAccessReducer from "../../../reducers/employee-access-reducer";

export default function AddEmployee() {
  const dispatch = useDispatch();

  const roles = ["employee"];
  const [selectedRole, upadateSelectedRole] = useState(null);

  const [branches, setBranches] = useState([]);
  const [selectedBranch, updatedSelectedBranch] = useState(null);

  const access = [
    {
      viewCustomer: false,
      viewCustomerTransactions: false,
      createCustomer: false,
      approveCardRequests: false,
    },
  ];

  useEffect(() => {
    client.getBranches().then((response) => {
      if (response.status == 200) {
        setBranches(response.data.map((m) => m.branch));
      }
    });
  }, []);

  return (
    <div className="d-flex flex-column flex-fill">
      <div>
        <label htmlFor="firstname" className="form-label">
          Name
        </label>
        <div className="d-flex">
          <InputText
            id="firstname"
            placeholder="First name"
            className="flex-fill"
            onChange={(e) => {
              dispatch(employeeReducer.setFirstName(e.target.value));
            }}
          />
          <InputText
            id="lastname"
            placeholder="Last name"
            className="flex-fill"
            onChange={(e) => {
              dispatch(employeeReducer.setLastName(e.target.value));
            }}
          />
        </div>
      </div>
      <label htmlFor="emailId">Email Id</label>
      <InputText
        id="emailId"
        placeholder="Email Id"
        onChange={(e) => {
          dispatch(employeeReducer.setEmail(e.target.value));
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
          dispatch(employeeReducer.setPhone(e.target.value));
        }}
      ></InputMask>

      <label htmlFor="username">Username</label>
      <InputText
        id="username"
        placeholder="Username"
        onChange={(e) => {
          dispatch(employeeReducer.setUsername(e.target.value));
        }}
      />

      <label htmlFor="password">Password</label>
      <InputText
        id="password"
        type="password"
        placeholder="Password"
        onChange={(e) => {
          dispatch(employeeReducer.setPassword(e.target.value));
        }}
      />

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
                      employeeAccessReducer.setViewCustomerAccess(
                        e.target.checked
                      )
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
                      employeeAccessReducer.setViewCustomerTransactionAccess(
                        e.target.checked
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
                      employeeAccessReducer.setCreateCustomerAccess(
                        e.target.checked
                      )
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
                      employeeAccessReducer.setApproveCardAccess(
                        e.target.checked
                      )
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
