import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { useEffect, useState } from "react";
import * as client from "../../clients/admin-client";
import * as employeeReducer from "../../reducers/employee-reducer";
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
      selectedEmployee.employeeID == row.employeeID
    ) {
      let access = false;
      if (selectedEmployee.accessList.length != 0) {
        access = selectedEmployee.accessList.find(
          (f) => f.accessName == "view_customer_details"
        );
        access = access ? access.accessGiven : false;
      }
      return (
        <div>
          <input
            type="checkbox"
            checked={access}
            onChange={(e) => {
              updateSelectedEmployee({
                ...selectedEmployee,
                view_customer_details: e.target.checked,
              });
            }}
          ></input>
        </div>
      );
    } else {
      if (row.accessList.length == 0) {
        return accessTemplate(false);
      } else {
        let access = row.accessList.find(
          (f) => f.accessName == "view_customer_details"
        );
        return accessTemplate(access ? access.accessGiven : false);
      }
    }
  };

  const viewCustomerTransactionsAccessTemplate = (row) => {
    if (
      isEditing &&
      selectedEmployee &&
      selectedEmployee.employeeID == row.employeeID
    ) {
      let access = false;
      if (selectedEmployee.accessList.length != 0) {
        access = selectedEmployee.accessList.find(
          (f) => f.accessName == "view_customer_transactions"
        ).accessGiven;
        access = access ? access.accessGiven : false;
      }
      return (
        <div>
          <input
            type="checkbox"
            checked={access}
            onChange={(e) => {
              updateSelectedEmployee({
                ...selectedEmployee,
                view_customer_transactions: e.target.checked,
              });
            }}
          ></input>
        </div>
      );
    } else {
      if (row.accessList.length == 0) {
        return accessTemplate(false);
      } else {
        let access = row.accessList.find(
          (f) => f.accessName == "view_customer_transactions"
        );
        return accessTemplate(access ? access.accessGiven : false);
      }
    }
  };

  const createCustomerAccessTemplate = (row) => {
    if (
      isEditing &&
      selectedEmployee &&
      selectedEmployee.employeeID == row.employeeID
    ) {
      let access = false;
      if (selectedEmployee.accessList.length != 0) {
        access = selectedEmployee.accessList.find(
          (f) => f.accessName == "create_customer"
        );
        access = access ? access.accessGiven : false;
      }
      return (
        <div>
          <input
            type="checkbox"
            checked={access}
            onChange={(e) => {
              updateSelectedEmployee({
                ...selectedEmployee,
                create_customer: e.target.checked,
              });
            }}
          ></input>
        </div>
      );
    } else {
      if (row.accessList.length == 0) {
        return accessTemplate(false);
      } else {
        let access = row.accessList.find(
          (f) => f.accessName == "create_customer"
        );
        return accessTemplate(access ? access.accessGiven : false);
      }
    }
  };

  const approveCardRequestsAccessTemplate = (row) => {
    if (
      isEditing &&
      selectedEmployee &&
      selectedEmployee.employeeID == row.employeeID
    ) {
      let access = false;
      if (selectedEmployee.accessList.length != 0) {
        access = selectedEmployee.accessList.find(
          (f) => f.accessName == "approve_card"
        );
        access = access ? access.accessGiven : false;
      }
      return (
        <div>
          <input
            type="checkbox"
            checked={access}
            onChange={(e) => {
              updateSelectedEmployee({
                ...selectedEmployee,
                approve_card: e.target.checked,
              });
            }}
          ></input>
        </div>
      );
    } else {
      if (row.accessList.length == 0) {
        return accessTemplate(false);
      } else {
        let access = row.accessList.find((f) => f.accessName == "approve_card");
        return accessTemplate(access ? access.accessGiven : false);
      }
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
        <Column field="employeeID" header="Employee Id"></Column>
        <Column field="firstName" header="First Name"></Column>
        <Column field="lastName" header="Last Name"></Column>
        <Column field="branch" header="Branch"></Column>
        <Column field="role" header="Role"></Column>
        <Column field="email" header="Email Id" />
        <Column
          field="viewCustomer"
          header="View Customer"
          body={viewCustomerAccessTemplate}
        ></Column>
        <Column
          field="viewCustomerTransactions"
          header="View Customer Transactions"
          body={viewCustomerTransactionsAccessTemplate}
        ></Column>
        <Column
          field="createCustomer"
          header="Create Customer"
          body={createCustomerAccessTemplate}
        ></Column>
        <Column
          field="approveCardRequests"
          header="Approve Card Requests"
          body={approveCardRequestsAccessTemplate}
        ></Column>
        <Column
          field=""
          header=""
          body={(rowData) => {
            if (
              selectedEmployee &&
              selectedEmployee.employeeID == rowData.employeeID
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
