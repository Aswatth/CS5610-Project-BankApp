import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { Dialog } from "primereact/dialog";
import { Tag } from "primereact/tag";
import { useState } from "react";
import EmploayeeCreateCustomer from "../employee-create-customer/employee-create-customer";

export default function EmployeeViewAppointments({ hasCreateCusomterAccess }) {
  const appointments = [
    {
      id: 1,
      timeSlot: "Dec 3 2023 - 9:00 AM - 10:00 AM",
      firstName: "ABC",
      lastName: "PQR",
      email: "abc@gmail.com",
      mobile: "1234567890",
      branch: "AAA",
      purpose: "New account creation",
      completed: false,
    },
    {
      id: 2,
      timeSlot: "Dec 3 2023 - 9:00 AM - 10:00 AM",
      firstName: "ABC",
      lastName: "PQR",
      email: "abc@gmail.com",
      mobile: "1234567890",
      branch: "AAA",
      purpose: "Query",
      completed: false,
    },
    {
      id: 3,
      timeSlot: "Dec 5 2023 - 10:00 AM - 11:00 AM",
      firstName: "ABC",
      lastName: "PQR",
      email: "abc@gmail.com",
      mobile: "1234567890",
      branch: "AAA",
      purpose: "Query",
      completed: false,
    },
    {
      id: 4,
      timeSlot: "Dec 20 2023 - 04:00 PM - 05:00 PM",
      firstName: "ABC",
      lastName: "PQR",
      email: "abc@gmail.com",
      mobile: "1234567890",
      branch: "AAA",
      purpose: "Query",
      completed: false,
    },
    {
      id: 5,
      timeSlot: "Dec 21 2023 - 02:00 AM - 03:00 PM",
      firstName: "ABC",
      lastName: "PQR",
      email: "abc@gmail.com",
      mobile: "1234567890",
      branch: "AAA",
      purpose: "Query",
      completed: false,
    },
  ];

  const [appointmentsToDisplay, setApointmentsToDisplay] =
    useState(appointments);
  const [selectedAppointment, setSelectedAppointment] = useState();

  const [showCreateCustomer, setCreateCustomerVisibilty] = useState(false);

  const markAppointmentAsCompleted = () => {
    let appointmentIndex = appointmentsToDisplay.findIndex(
      (f) => f.id == selectedAppointment.id
    );
    appointmentsToDisplay[appointmentIndex].completed = true;
    setApointmentsToDisplay(appointmentsToDisplay);
    setSelectedAppointment(appointments[appointmentIndex]);
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

  const actionTemplate = (rowData) => {
    if (selectedAppointment && rowData.id == selectedAppointment.id) {
      if (!rowData.completed) {
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
      } else {
        return <Tag severity="success">Completed</Tag>;
      }
    } else if (rowData.completed) {
      return <Tag severity="success">Completed</Tag>;
    } else {
      return <Tag severity="warning">Pending</Tag>;
    }
  };
  return (
    <div>
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
        <Column field="timeSlot" header="Time slot"></Column>
        <Column field="firstName" header="First name"></Column>
        <Column field="lastName" header="Last name"></Column>
        <Column field="email" header="Email"></Column>
        <Column field="mobile" header="Mobile"></Column>
        <Column field="branch" header="Branch"></Column>
        <Column field="purpose" header="Purpose of appointment"></Column>
        <Column header="Action" body={actionTemplate}></Column>
      </DataTable>
    </div>
  );
}
