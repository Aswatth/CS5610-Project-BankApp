import { Toast } from "primereact/toast";
import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { useRef, useState } from "react";
import { useNavigate } from "react-router";
import * as employeeClient from "../../clients/employee-client";
import { data } from "@maptiler/sdk";

export default function EmploayeeCreateCustomer({ customerData }) {
  const toast = useRef(null);
  const navigate = useNavigate();

  const [accounts, setAccounts] = useState([]);

  const accountTypes = ["Checking", "Savings"];
  const [selectedAccount, setSelectedAccount] = useState(accountTypes[0]);

  const [initialBalance, setInitialBalance] = useState(0);

  const [showAccountCreation, toggleAccountCreation] = useState(false);

  const [customerDataToSave, setCustomerDataToSave] = useState({});

  const accountCreationTemplate = () => {
    if (showAccountCreation)
      return (
        <div className="d-flex flex-column">
          <label htmlFor="accountType" className="form-label">
            Account type:
          </label>
          <select
            className="form-select mb-2"
            value={selectedAccount}
            onChange={(s) => setSelectedAccount(s.target.value)}
          >
            {accountTypes.map((m) => {
              return <option>{m}</option>;
            })}
          </select>
          <input
            type="number"
            className="form-control mb-2"
            value={initialBalance}
            onChange={(c) => setInitialBalance(c.target.value)}
          />
          <Button
            label="Add"
            severity="success"
            onClick={() => {
              if (
                accounts.findIndex((f) => f.accountType == selectedAccount) ==
                -1
              ) {
                setAccounts([
                  ...accounts,
                  {
                    accountType: selectedAccount,
                    accountBalance: +initialBalance,
                  },
                ]);

                setSelectedAccount(accountTypes[0]);
                toggleAccountCreation(false);
              } else {
                //Dispaly error
                toast.current.show({
                  severity: "error",
                  summary: "Error",
                  detail: `A ${selectedAccount} account is already added!`,
                });
              }
            }}
          />
        </div>
      );
    else {
      <div></div>;
    }
  };

  const accountTemplate = () => {
    if (accounts.length != 0) {
      return (
        <div>
          <DataTable value={accounts}>
            <Column field="accountType" header="Account type"></Column>
            <Column field="accountBalance" header="Starting balance"></Column>
          </DataTable>
        </div>
      );
    } else {
      <div></div>;
    }
  };

  return (
    <div className="d-flex flex-column justify-content-between">
      <Toast ref={toast} />
      <div className="d-fle mb-2">
        <Button
          label="Add an account"
          className="flex-fill border rounded"
          onClick={() => toggleAccountCreation(true)}
        ></Button>
      </div>
      {accountCreationTemplate()}
      {accountTemplate()}
      {/* <div className="mb-2">
        <label htmlFor="fname" className="form-label">
          First name
        </label>
        <input
          id="fname"
          type="text"
          value={customerData.firstName}
          className="form-control"
        ></input>
      </div>
      <div className="mb-2">
        <label htmlFor="lname" className="form-label">
          Last name
        </label>
        <input
          id="lname"
          type="text"
          value={customerData.lastName}
          className="form-control"
        ></input>
      </div>
      <div className="mb-2">
        <label htmlFor="email" className="form-label">
          Email
        </label>
        <input
          id="email"
          type="email"
          value={customerData.email}
          className="form-control"
        ></input>
      </div>
      <div className="mb-2">
        <label htmlFor="phone" className="form-label">
          Phone
        </label>
        <input
          id="phone"
          type="number"
          value={customerData.phone}
          className="form-control"
        ></input>
      </div>
      <div className="mb-2">
        <label htmlFor="address" className="form-label">
          Address
        </label>
        <input
          id="address"
          type="text"
          className="form-control"
          value={customerData.address}
        ></input>
      </div>
      <div className="mb-2">
        <label htmlFor="branch" className="form-label">
          Branch
        </label>
        <select className="form-select" disabled="true">
          <option value={customerData.branch}>{customerData.branch}</option>
        </select>
      </div>
      <div className="mb-2">
        <label htmlFor="username" className="form-label">
          Username
        </label>
        <input
          id="username"
          className="form-control"
          type="text"
          placeholder="This will be pre-filled and can be edited"
          value={customerData.username}
        ></input>
      </div>
      <div className="mb-2">
        <label htmlFor="password" className="form-label">
          Password
        </label>
        <input id="password" className="form-control" type="password"></input>
      </div> */}
      <Button
        label="Create"
        severity="primary"
        onClick={() => {
          if (accounts.length == 0) {
            toast.current.show({
              severity: "error",
              summary: "Error",
              detail: `Must have atleast one type of account setup`,
            });
          } else {
            let dataToSave = {
              appointmentId: customerData.appointmentId,
              customerId: customerData.customerId,
              accounts: accounts,
              cardNetwork: "VISA",
            };
            employeeClient
              .createCustomerAccount(dataToSave)
              .then((response) => {
                if (response.status == 200 || response.status == 201) {
                  navigate(0);
                }
              })
              .catch((response) => {
                toast.current.show({
                  severity: "error",
                  summary: "Error",
                  detail: `${response.response.data.error}`,
                  life: 3000,
                });
              });
          }
        }}
      ></Button>
    </div>
  );
}
