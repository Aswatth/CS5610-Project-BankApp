import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { useEffect, useState } from "react";
import * as client from "../../clients/admin-client";
import * as employeeReducer from "../../reducers/employee-reducer";
import { Dropdown } from "primereact/dropdown";
import { Button } from "primereact/button";
import { useDispatch, useSelector } from "react-redux";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import { InputText } from "primereact/inputtext";
import { Dialog } from "primereact/dialog";
import { InputMask } from "primereact/inputmask";
import * as adminClient from "../../clients/admin-client";
import { useNavigate } from "react-router";

export default function ViewEmployees() {
  const dispatch = useDispatch();
  const employees = useSelector((state) => state.employeeReducer.employees);
  const [selectedEmployee, updateSelectedEmployee] = useState();

  const [branchList, setBranchList] = useState([]);

  const [isEditing, toggleEditing] = useState(false);

  const navigate = useNavigate();

  function refreshData() {
    client.getEmployees().then((response) => {
      if (response == null || response.status == 401) {
        navigate("/login");
        return;
      }
      client.getBranches().then((branchResponse) => {
        setBranchList(branchResponse.data.map((m) => m.branch));
      });
      dispatch(employeeReducer.setEmployees(response.data));
    });
  }

  useEffect(() => {
    try {
      refreshData();
    } catch (error) {
      console.log(error);
    }
  }, []);

  const showSelectedEmployeeOptions = (rowData) => {
    if (
      selectedEmployee &&
      rowData.employeeID === selectedEmployee.employeeID
    ) {
      return (
        <div className="d-flex">
          <Button
            icon="pi pi-pencil"
            severity="warning"
            className="border rounded"
            onClick={(e) => toggleEditing(true)}
          ></Button>
          <Button
            icon="pi pi-trash"
            severity="danger"
            className="border rounded"
            onClick={(e) => handleEmployeeDelete()}
          ></Button>
        </div>
      );
    }
    return <div></div>;
  };

  const handleEmployeeDelete = () => {
    confirmDialog({
      message: `Do you want to delete this employee id: ${selectedEmployee.employeeID}?`,
      header: "Delete Confirmation",
      icon: "pi pi-info-circle",
      acceptClassName: "p-button-danger",
      accept: () => {
        client.deleteEmployee(selectedEmployee).then(() => {
          dispatch(employeeReducer.deleteEmployee(selectedEmployee));
        });
      },
      reject: () => {},
    });
  };

  const branchFilterDropDown = (options) => {
    return (
      <Dropdown
        value={options.value}
        onChange={(e) => options.filterApplyCallback(e.value)}
        options={branchList}
        filter
        showClear
        placeholder="Select a Branch"
        className="p-column-filter"
        // itemTemplate={(option) => <div>{option}</div>}
      />
    );
  };

  function editEmployeeContent() {
    if (!selectedEmployee) return <div></div>;
    return (
      <div className="d-flex flex-column">
        <div>
          <label htmlFor="firstName" className="form-label">
            First name:
          </label>
          <input
            id="firstName"
            type="text"
            value={selectedEmployee.firstName}
            className="form-control"
            onChange={(e) =>
              updateSelectedEmployee({
                ...selectedEmployee,
                firstName: e.target.value,
              })
            }
          ></input>
        </div>
        <div>
          <label htmlFor="lastName" className="form-label">
            Last name:
          </label>
          <input
            id="lastName"
            type="text"
            value={selectedEmployee.lastName}
            className="form-control"
            onChange={(e) =>
              updateSelectedEmployee({
                ...selectedEmployee,
                lastName: e.target.value,
              })
            }
          ></input>
        </div>
        <div>
          <label htmlFor="email" className="form-label">
            Email:
          </label>
          <input
            id="email"
            type="email"
            value={selectedEmployee.email}
            className="form-control"
            onChange={(e) =>
              updateSelectedEmployee({
                ...selectedEmployee,
                email: e.target.value,
              })
            }
          ></input>
        </div>
        <div>
          <label htmlFor="phone" className="form-label">
            Phone:
          </label>
          <InputMask
            id="phone"
            className="form-control"
            mask="(999) 999-9999"
            placeholder="(999) 999-9999"
            value={selectedEmployee.phone}
            onChange={(e) => {
              updateSelectedEmployee({
                ...selectedEmployee,
                phone: e.target.value,
              });
            }}
          ></InputMask>
        </div>
        <div>
          <label htmlFor="branch" className="form-label d-block">
            Branch
          </label>
          <Dropdown
            value={selectedEmployee.branch}
            options={branchList}
            className="d-flex"
            onChange={(e) => {
              updateSelectedEmployee({
                ...selectedEmployee,
                branch: e.target.value,
              });
            }}
          />
        </div>
        <div className="d-flex justify-content-end mt-3">
          <div className="flex-fill d-flex justify-content-between">
            <Button
              label="Cancel"
              severity="danger"
              className="border rounded"
              onClick={() => toggleEditing(false)}
            ></Button>
            <Button
              label="Save"
              severity="success"
              className="border rounded"
              onClick={() => {
                adminClient
                  .updateEmployee(selectedEmployee)
                  .then((response) => {
                    if (response.status == 200) {
                      refreshData();
                      toggleEditing(false);
                    }
                  });
              }}
            ></Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div>
        <ConfirmDialog />
        <Dialog
          visible={isEditing}
          onHide={() => toggleEditing(false)}
          header="Edit employee personal info"
        >
          {editEmployeeContent()}
        </Dialog>
        <DataTable
          value={employees}
          filterDisplay="row"
          showGridlines
          paginator
          rows={5}
          rowsPerPageOptions={[5, 10, 15, 20]}
          scrollable
          scrollHeight="500px"
          selectionMode="radiobutton"
          selection={selectedEmployee}
          onSelectionChange={(e) => updateSelectedEmployee(e.value)}
        >
          <Column
            selectionMode="single"
            headerStyle={{ width: "3rem" }}
          ></Column>
          <Column field="employeeID" filter header="Employee Id"></Column>
          <Column field="firstName" filter header="First Name"></Column>
          <Column field="lastName" filter header="Last Name"></Column>
          <Column field="phone" filter header="Phone"></Column>
          <Column field="email" filter header="Email Id" />
          <Column
            field="branch"
            filter
            filterElement={branchFilterDropDown}
            showFilterMenu={false}
            header="Branch"
          ></Column>
          <Column field="role" filter header="Role"></Column>
          <Column
            field=""
            header=""
            body={showSelectedEmployeeOptions}
          ></Column>
        </DataTable>
      </div>
    </div>
  );
}
