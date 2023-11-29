import { useState } from "react";
import AddEmployee from "./add-employee/add-employee-index";
import EmployeeData from "./view-employee-index";
import { Button } from "primereact/button";

import * as client from "../client";
import { useDispatch, useSelector } from "react-redux";
import * as employeeReducer from "../employee-reducer";

export default function ViewEmployees() {
  const dispatch = useDispatch();
  const [isAddingEmployee, toggleAddEmployee] = useState(false);
  const employee = useSelector((state) => state.employeeReducer.employee);

  const contentToDisplay = () => {
    if (isAddingEmployee) {
      return <AddEmployee></AddEmployee>;
    }
    return <EmployeeData></EmployeeData>;
  };

  const handleSave = () => {
    client.addEmployee(employee).then((e) => {
      dispatch(employeeReducer.addEmployee(e));
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
            onClick={() => handleSave()}
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
