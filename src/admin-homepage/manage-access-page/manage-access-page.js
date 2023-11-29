import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { useEffect, useState } from "react";
import * as client from "../client";
import * as employeeReducer from "../employee-reducer";
import { useDispatch, useSelector } from "react-redux";

export default function AdminAccessPage() {
  const dispatch = useDispatch();
  const employees = useSelector((state) => state.employeeReducer.employees);
  const [selectedEmployee, updateSelectedEmployee] = useState();
  const [isEditing, updateEditing] = useState(false);

  const accessTemplate = (value) => {
    if (value == true) {
      return (
        <div>
          <i className="pi pi-check" style={{ color: "green" }}></i>
        </div>
      );
    } else if (value == false) {
      return (
        <div>
          <i className="pi pi-times" style={{ color: "red" }}></i>
        </div>
      );
    } else {
      return <div></div>;
    }
  };

  const viewCustomerAccessTemplate = (row) => {
    if (
      isEditing &&
      selectedEmployee &&
      selectedEmployee.employeeId == row.employeeId
    ) {
      return (
        <div>
          <input
            type="checkbox"
            checked={selectedEmployee.viewCustomer}
            onChange={(e) => {
              updateSelectedEmployee({
                ...selectedEmployee,
                viewCustomer: e.target.checked,
              });
            }}
          ></input>
        </div>
      );
    } else {
      return accessTemplate(row.viewCustomer);
    }
  };

  const viewCustomerTransactionsAccessTemplate = (row) => {
    if (
      isEditing &&
      selectedEmployee &&
      selectedEmployee.employeeId == row.employeeId
    ) {
      return (
        <div>
          <input
            type="checkbox"
            checked={selectedEmployee.viewCustomerTransactions}
            onChange={(e) => {
              updateSelectedEmployee({
                ...selectedEmployee,
                viewCustomerTransactions: e.target.checked,
              });
            }}
          ></input>
        </div>
      );
    } else {
      return accessTemplate(row.viewCustomerTransactions);
    }
  };

  const createCustomerAccessTemplate = (row) => {
    if (
      isEditing &&
      selectedEmployee &&
      selectedEmployee.employeeId == row.employeeId
    ) {
      return (
        <div>
          <input
            type="checkbox"
            checked={selectedEmployee.createCustomer}
            onChange={(e) => {
              updateSelectedEmployee({
                ...selectedEmployee,
                createCustomer: e.target.checked,
              });
            }}
          ></input>
        </div>
      );
    } else {
      return accessTemplate(row.createCustomer);
    }
  };

  const approveCardRequestsAccessTemplate = (row) => {
    if (
      isEditing &&
      selectedEmployee &&
      selectedEmployee.employeeId == row.employeeId
    ) {
      return (
        <div>
          <input
            type="checkbox"
            checked={selectedEmployee.approveCardRequests}
            onChange={(e) => {
              updateSelectedEmployee({
                ...selectedEmployee,
                approveCardRequests: e.target.checked,
              });
            }}
          ></input>
        </div>
      );
    } else {
      return accessTemplate(row.approveCardRequests);
    }
  };

  const handleEdit = () => {
    if (isEditing) {
      client.updateEmployee(selectedEmployee).then((status) => {
        dispatch(employeeReducer.updateEmployee(selectedEmployee));
      });
    }

    updateEditing(!isEditing);
  };

  return (
    <div>
      <h3>Employee Accesses: </h3>
      <DataTable
        value={employees}
        showGridlines
        scrollable
        scrollHeight="350px"
        selectionMode={isEditing ? "" : "single"}
        // dataKey="id"
        selection={selectedEmployee}
        onSelectionChange={(e) => updateSelectedEmployee(e.value)}
      >
        {/* <Column selectionMode="single" headerStyle={{ width: "3rem" }}></Column> */}
        <Column field="employeeId" header="Employee Id"></Column>
        <Column field="firstname" header="First Name"></Column>
        <Column field="lastname" header="Last Name"></Column>
        <Column field="branch" header="Branch"></Column>
        <Column field="role" header="Role"></Column>
        <Column field="emailId" header="Email Id" />
        <Column
          field="viewCustomer"
          header="View Customer"
          body={(rowData) => viewCustomerAccessTemplate(rowData)}
        ></Column>
        <Column
          field="viewCustomerTransactions"
          header="View Customer Transactions"
          body={(rowData) => viewCustomerTransactionsAccessTemplate(rowData)}
        ></Column>
        <Column
          field="createCustomer"
          header="Create Customer"
          body={(rowData) => createCustomerAccessTemplate(rowData)}
        ></Column>
        <Column
          field="approveCardRequests"
          header="Approve Card Requests"
          body={(rowData) => approveCardRequestsAccessTemplate(rowData)}
        ></Column>
        <Column
          field=""
          header=""
          body={(rowData) => {
            if (
              selectedEmployee &&
              selectedEmployee.employeeId == rowData.employeeId
            ) {
              return (
                <Button
                  icon={isEditing ? "pi pi-check" : "pi pi-pencil"}
                  className="p-button-text"
                  style={{ color: "var(--color-3)" }}
                  onClick={handleEdit}
                />
              );
            } else {
              return <div></div>;
            }
          }}
        ></Column>
      </DataTable>
    </div>
  );
}
