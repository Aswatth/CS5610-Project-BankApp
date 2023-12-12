import { useState } from "react";
import AddEmployee from "./add-employee/add-employee-index";
import { Button } from "primereact/button";

import * as client from "../../clients/admin-client";
import { useDispatch, useSelector } from "react-redux";
import * as employeeReducer from "../../reducers/employee-reducer";
import ViewEmployees from "./view-employees";
// import employeeAccessReducer from "../../reducers/employee-access-reducer";

export default function EmployeeIndex() {
  const dispatch = useDispatch();
  const [isAddingEmployee, toggleAddEmployee] = useState(false);
  const employee = useSelector((state) => state.employeeReducer.employee);
  const accessList = useSelector(
    (state) => state.employeeAccessReducer.accessList
  );

  const contentToDisplay = () => {
    if (isAddingEmployee) {
      return <AddEmployee></AddEmployee>;
    }
    return <ViewEmployees></ViewEmployees>;
  };

  const handleAddEmployee = () => {
    let employeeToAdd = { ...employee, accessList: accessList };
    client.addEmployee(employeeToAdd).then((e) => {
      client.getEmployees().then((data) => {
        dispatch(employeeReducer.setEmployees(data));
      });
      dispatch(employeeReducer.setEmployee({}));
    });
    toggleAddEmployee(!isAddingEmployee);
  };

  const buttonsToDisplay = () => {
    if (isAddingEmployee) {
      return (
        <div className="d-flex justify-content-between">
          <Button
            label="Cancel"
            icon="pi pi-times"
            className=" bounded rounded me-2"
            severity="danger"
            onClick={() => toggleAddEmployee(!isAddingEmployee)}
          ></Button>
          <Button
            label="Save"
            icon="pi pi-save"
            className=" bounded rounded"
            severity="success"
            onClick={() => handleAddEmployee()}
          ></Button>
        </div>
      );
    }
    return (
      <Button
        label="Add employee"
        icon="pi pi-plus"
        className="color-1 border rounded"
        onClick={() => toggleAddEmployee(!isAddingEmployee)}
      ></Button>
    );
  };

  return (
    <div>
      <div className="d-flex mb-2">
        <div className="d-flex justify-content-start flex-fill">
          <h2>{isAddingEmployee ? "Add employee" : "Employee list:"}</h2>
        </div>
        <div className="d-flex justify-content-end flex-fill">
          {buttonsToDisplay()}
        </div>
      </div>
      {contentToDisplay()}
    </div>
  );
}
