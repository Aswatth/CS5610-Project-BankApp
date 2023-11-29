import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { useEffect, useState } from "react";
import * as client from "../client";
import * as employeeReducer from "../employee-reducer";
import { Dropdown } from "primereact/dropdown";
import { Button } from "primereact/button";
import { useDispatch, useSelector } from "react-redux";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import { InputText } from "primereact/inputtext";

export default function EmployeeData() {
  const dispatch = useDispatch();
  const employees = useSelector((state) => state.employeeReducer.employees);
  const [selectedEmployee, updateSelectedEmployee] = useState();

  const branchList = ["A1", "A2", "A3"];

  useEffect(() => {
    try {
      client.getEmployees().then((data) => {
        dispatch(employeeReducer.setEmployees(data));
      });
    } catch (error) {
      console.log(error);
    }
  });

  const showSelectedEmployeeOptions = (rowData) => {
    if (
      selectedEmployee &&
      rowData.employeeId === selectedEmployee.employeeId
    ) {
      return (
        <div className="d-flex">
          <Button
            icon="pi pi-pencil"
            severity="warning"
            className="border rounded"
            // onClick={(e) => handleEmployeeDelete()}
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

  const textEditor = (options) => {
    return (
      <InputText
        type="text"
        value={options.value}
        onChange={(e) => options.editorCallback(e.target.value)}
      />
    );
  };

  const onRowEditComplete = (e) => {
    dispatch(client.updateEmployee(e));
  };
  const handleEmployeeDelete = () => {
    confirmDialog({
      message: `Do you want to delete this employee: ${selectedEmployee.employeeId}?`,
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
  return (
    <div>
      <div>
        <ConfirmDialog />
        <DataTable
          value={employees}
          filterDisplay="row"
          showGridlines
          paginator
          rows={5}
          rowsPerPageOptions={[5, 10, 15, 20]}
          editMode="row"
          onRowEditComplete={onRowEditComplete}
          scrollable
          scrollHeight="500px"
          selectionMode="radiobutton"
          // dataKey="id"
          selection={selectedEmployee}
          onSelectionChange={(e) => updateSelectedEmployee(e.value)}
        >
          <Column
            selectionMode="single"
            headerStyle={{ width: "3rem" }}
          ></Column>
          <Column field="employeeId" filter header="Employee Id"></Column>
          <Column
            field="firstname"
            editor={(options) => {
              textEditor(options);
            }}
            filter
            header="First Name"
          ></Column>
          <Column field="lastname" filter header="Last Name"></Column>
          <Column field="mobileNumber" filter header="Phone"></Column>
          <Column field="emailId" filter header="Email Id" />
          <Column
            field="branch"
            filter
            filterElement={branchFilterDropDown}
            showFilterMenu={false}
            header="Branch"
          ></Column>
          <Column field="role" filter header="Role"></Column>
          <Column
            rowEditor
            headerStyle={{ width: "10%", minWidth: "8rem" }}
            bodyStyle={{ textAlign: "center" }}
          ></Column>
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
