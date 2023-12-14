import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { Dialog } from "primereact/dialog";
import { Tag } from "primereact/tag";
import { useEffect, useRef, useState } from "react";
import EmploayeeCreateCustomer from "../employee-create-customer/employee-create-customer";
import EmployeeCreateAppointment from "../employee-create-appointment/employee-create-appointment";
import * as employeeClient from "../../clients/employee-client";
import { useNavigate } from "react-router";
import { Toast } from "primereact/toast";

export default function EmployeeViewAppointments({ hasCreateCusomterAccess }) {
  const toast = useRef(null);
  const navigate = useNavigate();
  const [appointmentsToDisplay, setAppointmentsToDisplay] = useState([]);
  const [selectedAppointment, setSelectedAppointment] = useState();

  const [showCreateCustomer, setCreateCustomerVisibilty] = useState(false);

  const [showCreateAppointment, setCreateAppointmentVisibility] =
    useState(false);

  const [appointmentResolutionType, setAppointmentResolutionType] =
    useState("");

  function getBookedAppointments() {
    employeeClient
      .getAssignedAppointments()
      .then((response) => {
        if (response.status == 200) {
          setAppointmentsToDisplay(response.data);
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

  useEffect(() => {
    if (!employeeClient.isEmployee()) {
      navigate("/login");
      return;
    }
    getBookedAppointments();
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
    setCreateCustomerVisibilty(true);
    markAppointmentAsCompleted();
  };

  const handleAppointmentResolution = (resolutionType) => {
    // markAppointmentAsCompleted();
    employeeClient
      .appointmentResolution(resolutionType, selectedAppointment.id)
      .then((response) => {
        if (response.status == 200 || response.status == 201) {
          // getBookedAppointments();
          navigate(0);
        }
      });
  };

  const createCustomerUI = () => {
    if (selectedAppointment) {
      let customerData = {
        customerId: selectedAppointment.customer.customerId,
        appointmentId: selectedAppointment.id,
        firstName: selectedAppointment.customer.firstName,
        lastName: selectedAppointment.customer.lastName,
        email: selectedAppointment.customer.email,
        phone: selectedAppointment.customer.phone,
        address: selectedAppointment.customer.address,
        username: selectedAppointment.customer.username,
        branch: selectedAppointment.branch,
      };
      return (
        <div>
          <EmploayeeCreateCustomer customerData={customerData} />
        </div>
      );
    }
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
      switch (selectedAppointment.status) {
        case "Scheduled":
          let date = new Date(selectedAppointment.date);
          date.setDate(date.getDate() + 1);
          if (compareDate(new Date(), date)) {
            let description = rowData.description.toLowerCase();

            if (description != "create new account") {
              setAppointmentResolutionType(description);
              return (
                <Button
                  label={description}
                  className="color-2 border rounded"
                  onClick={() => {
                    description == "query"
                      ? handleAppointmentResolution("Query")
                      : handleAppointmentResolution("jointAccountCreation");
                  }}
                ></Button>
              );
            } else {
              // setAppointmentResolutionType(description);
              return (
                <Button
                  label={"Create new account"}
                  className="color-2 border rounded"
                  onClick={handleAppointment}
                ></Button>
              );
            }
          } else {
            return <Tag severity="info">Scheduled</Tag>;
          }
        case "Completed":
          return <Tag severity="success">Completed</Tag>;
        case "Available":
          return <Tag severity="info">Available</Tag>;
      }
    } else if (rowData.id) {
      switch (rowData.status) {
        case "Scheduled": {
          if (selectedAppointment) {
            let date = new Date(selectedAppointment.date);
            date.setDate(date.getDate() + 1);
            if (compareDate(new Date(), date)) {
              return <Tag severity="info">Pending</Tag>;
            }
          }

          return <Tag severity="info">Scheduled</Tag>;
        }
        case "Completed":
          return <Tag severity="success">Completed</Tag>;
        case "Available":
          return <Tag severity="info">Available</Tag>;
      }
    }
  };
  return (
    <div>
      <Toast ref={toast} />
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
        value={
          appointmentsToDisplay
            ? appointmentsToDisplay.filter((f) => f.customer.customerId != 0)
                .length == 0
            : []
        }
        scrollHeight="500px"
        selectionMode="single"
        selection={selectedAppointment}
        onSelectionChange={(e) => setSelectedAppointment(e.value)}
      >
        <Column field="date" header="Date"></Column>
        <Column
          field=""
          header="Time"
          body={(row) => {
            return (
              <div>
                {row.startTime} <br></br> {row.endTime}
              </div>
            );
          }}
        ></Column>
        <Column field="customer.firstName" header="First name"></Column>
        <Column field="customer.lastName" header="Last name"></Column>
        <Column field="customer.email" header="Email"></Column>
        <Column field="customer.phone" header="Phone"></Column>
        <Column field="branch" header="Branch"></Column>
        <Column field="description" header="Purpose"></Column>
        <Column header="Status" body={actionTemplate}></Column>
      </DataTable>
    </div>
  );
}
