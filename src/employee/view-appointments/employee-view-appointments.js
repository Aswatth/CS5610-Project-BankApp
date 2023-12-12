import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { Dialog } from "primereact/dialog";
import { Tag } from "primereact/tag";
import { useEffect, useState } from "react";
import EmploayeeCreateCustomer from "../employee-create-customer/employee-create-customer";
import EmployeeCreateAppointment from "../employee-create-appointment/employee-create-appointment";
import * as employeeClient from "../../clients/employee-client";

export default function EmployeeViewAppointments({ hasCreateCusomterAccess }) {
  const [appointmentsToDisplay, setAppointmentsToDisplay] = useState([]);
  const [selectedAppointment, setSelectedAppointment] = useState();

  const [showCreateCustomer, setCreateCustomerVisibilty] = useState(false);

  const [showCreateAppointment, setCreateAppointmentVisibility] =
    useState(false);

  useEffect(() => {
    employeeClient.getAssignedAppointments().then((response) => {
      console.log(response.data);
      setAppointmentsToDisplay(response.data);
    });
  }, []);

  const markAppointmentAsCompleted = () => {
    let appointmentIndex = appointmentsToDisplay.findIndex(
      (f) => f.id == selectedAppointment.id
    );
    appointmentsToDisplay[appointmentIndex].completed = true;
    setAppointmentsToDisplay(appointmentsToDisplay);
    setSelectedAppointment(appointmentsToDisplay[appointmentIndex]);
  };

  const handleAppointment = () => {
    if (
      selectedAppointment.purpose.toLowerCase().replaceAll(" ", "-") ==
      "new-account-creation"
    ) {
      setCreateCustomerVisibilty(true);
    } else {
      markAppointmentAsCompleted();
    }
  };

  const createCustomerUI = () => {
    return (
      <div>
        <EmploayeeCreateCustomer />
      </div>
    );
  };

  function compareDate(d1, d2) {
    if (
      d1.getFullYear() == d2.getFullYear() &&
      d1.getMonth() == d2.getMonth() &&
      d1.getDate() == d2.getDate()
    )
      return true;
    return false;
  }
  const actionTemplate = (rowData) => {
    if (selectedAppointment && rowData.id == selectedAppointment.id) {
      if (rowData.status == "Pending") {
        return (
          <Button
            label={
              rowData.purpose.toLowerCase() == "query"
                ? "Address query"
                : "Create new customer account"
            }
            className="color-2 border rounded"
            onClick={handleAppointment}
          ></Button>
        );
      } else if (rowData.status.toLowerCase() == "completed") {
        return <Tag severity="success">Completed</Tag>;
      } else {
        return <Tag severity="info">Available</Tag>;
      }
    } else if (rowData.status.toLowerCase() == "completed") {
      return <Tag severity="success">Completed</Tag>;
    } else if (
      rowData.status.toLowerCase() == "scheduled" &&
      compareDate(new Date(rowData.date), new Date())
    ) {
      return <Tag severity="warning">Pending</Tag>;
    } else {
      return <Tag severity="info">Available</Tag>;
    }
  };
  return (
    <div>
      <div className="d-flex mb-2">
        <div className="flex-fill d-flex justify-content-start">
          <h3>Today's appointments</h3>
        </div>
        <div className="flex-fill d-flex justify-content-end">
          <Button
            label="Create new appointment slot(s)"
            icon="pi pi-plus"
            className="color-2 border rounded"
            onClick={() => setCreateAppointmentVisibility(true)}
          ></Button>
        </div>
      </div>
      <Dialog
        maximizable
        header="Create new appointment slot"
        visible={showCreateAppointment}
        onHide={() => setCreateAppointmentVisibility(false)}
      >
        <EmployeeCreateAppointment />
      </Dialog>
      <Dialog
        maximizable
        header="Create a new customer account"
        visible={showCreateCustomer}
        onHide={() => setCreateCustomerVisibilty(false)}
      >
        {createCustomerUI()}
      </Dialog>
      <DataTable
        value={appointmentsToDisplay}
        // scrollHeight="350px"
        selectionMode="single"
        selection={selectedAppointment}
        onSelectionChange={(e) => setSelectedAppointment(e.value)}
      >
        <Column field="startTime" header="Start Time"></Column>
        <Column field="endTime" header="End Time"></Column>
        <Column field="firstName" header="First name"></Column>
        <Column field="lastName" header="Last name"></Column>
        <Column field="email" header="Email"></Column>
        <Column field="mobile" header="Mobile"></Column>
        <Column field="branch" header="Branch"></Column>
        <Column field="description" header="Purpose"></Column>
        <Column header="Status" body={actionTemplate}></Column>
      </DataTable>
    </div>
  );
}
