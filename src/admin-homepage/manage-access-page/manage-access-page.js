import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { useEffect, useRef, useState } from "react";
import * as client from "../../clients/admin-client";
import * as employeeReducer from "../../reducers/employee-reducer";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { Toast } from "primereact/toast";

export default function AdminAccessPage() {
  const toast = useRef(null);
  const dispatch = useDispatch();
  const employees = useSelector((state) => state.employeeReducer.employees);
  const [selectedEmployee, updateSelectedEmployee] = useState();
  const [isEditing, toggleEditing] = useState(false);

  const navigate = useNavigate();

  function refresh() {
    client
      .getEmployees()
      .then((response) => {
        dispatch(employeeReducer.setEmployees(response.data));
      })
      .catch((response) => {
        navigate("/login");
      });
  }

  useEffect(() => {
    refresh();
  }, [selectedEmployee]);

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

  const updateAccess = (accessName, accessStatus) => {
    if (selectedEmployee.accessList.length == 0) {
      updateSelectedEmployee({
        ...selectedEmployee,
        accessList: [{ accessName: accessName, accessGiven: accessStatus }],
      });
    } else {
      if (selectedEmployee.accessList.find((f) => f.accessName == accessName)) {
        const updatedAccess = selectedEmployee.accessList.map((item) =>
          item.accessName == accessName
            ? { ...item, accessGiven: accessStatus }
            : item
        );

        updateSelectedEmployee({
          ...selectedEmployee,
          accessList: updatedAccess,
        });
      } else {
        let newAccess = { accessName: accessName, accessGiven: accessStatus };

        updateSelectedEmployee({
          ...selectedEmployee,
          accessList: [...selectedEmployee.accessList, newAccess],
        });
      }

      // console.log({ ...selectedEmployee, accessList: updatedAccess });
    }
  };

  const viewCustomerAccessTemplate = (row) => {
    if (
      isEditing &&
      selectedEmployee &&
      selectedEmployee.employeeID == row.employeeID
    ) {
      let access = selectedEmployee.accessList.find(
        (f) => f.accessName == "view_customer_details"
      );
      access = access ? access.accessGiven : false;
      return (
        <div>
          <input
            type="checkbox"
            checked={access}
            onChange={(e) =>
              updateAccess("view_customer_details", e.target.checked)
            }
          ></input>
        </div>
      );
    } else {
      if (!row.accessList || row.accessList.length == 0) {
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
      let access = selectedEmployee.accessList.find(
        (f) => f.accessName == "view_customer_transactions"
      );
      access = access ? access.accessGiven : false;
      return (
        <div>
          <input
            type="checkbox"
            checked={access}
            onChange={(e) => {
              updateAccess("view_customer_transactions", e.target.checked);
            }}
          ></input>
        </div>
      );
    } else {
      if (!row.accessList || row.accessList.length == 0) {
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
      let access = selectedEmployee.accessList.find(
        (f) => f.accessName == "create_customer"
      );
      access = access ? access.accessGiven : false;
      return (
        <div>
          <input
            type="checkbox"
            checked={access}
            onChange={(e) => {
              updateAccess("create_customer", e.target.checked);
            }}
          ></input>
        </div>
      );
    } else {
      if (!row.accessList || row.accessList.length == 0) {
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
      let access = selectedEmployee.accessList.find(
        (f) => f.accessName == "approve_card"
      );
      access = access ? access.accessGiven : false;
      return (
        <div>
          <input
            type="checkbox"
            checked={access}
            onChange={(e) => {
              updateAccess("approve_card", e.target.checked);
            }}
          ></input>
        </div>
      );
    } else {
      if (!row.accessList || row.accessList.length == 0) {
        return accessTemplate(false);
      } else {
        let access = row.accessList.find((f) => f.accessName == "approve_card");
        return accessTemplate(access ? access.accessGiven : false);
      }
    }
  };

  function employeeSelectTemplate() {
    if (isEditing) {
      return (
        <div className="d-flex">
          <Button
            icon="pi pi-check"
            className="p-button-text"
            style={{ color: "var(--color-3)" }}
            onClick={confirmEdit}
          />
          <Button
            icon="pi pi-times"
            className="p-button-text"
            style={{ color: "var(--color-3)" }}
            onClick={() => toggleEditing(false)}
          />
        </div>
      );
    } else {
      return (
        <Button
          icon="pi pi-pencil"
          className="p-button-text"
          style={{ color: "var(--color-3)" }}
          onClick={() => toggleEditing(true)}
        />
      );
    }
  }

  const confirmEdit = () => {
    if (isEditing) {
      client
        .updateEmployeeAccess(
          selectedEmployee.employeeID,
          selectedEmployee.accessList
        )
        .then((response) => {
          if (response.status == 200) {
            refresh();
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

    toggleEditing(!isEditing);
  };

  return (
    <div>
      <Toast ref={toast} />
      <h3>Employee Accesses: </h3>
      <DataTable
        value={employees}
        showGridlines
        scrollable
        scrollHeight="350px"
        selectionMode={isEditing ? "" : "single"}
        // dataKey="id"
        selection={selectedEmployee}
        onSelectionChange={(e) => {
          updateSelectedEmployee(e.value);
        }}
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
              return employeeSelectTemplate();
            } else {
              return <div></div>;
            }
          }}
        ></Column>
      </DataTable>
    </div>
  );
}
