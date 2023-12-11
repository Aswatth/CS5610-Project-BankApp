import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { useState } from "react";
import { useNavigate } from "react-router";

export default function CustomerAppoointments() {
  const navigate = useNavigate();
  const appointments = [
    { id: 1, date: "18-Dec", time: "9:00 AM - 10:00 PM", purpose: "Query" },
    { id: 2, date: "19-Dec", time: "4:00 PM - 4:30 PM", purpose: "Query" },
    {
      id: 3,
      date: "20-Dec",
      time: "1:00 AM - 2:00 PM",
      purpose: "New account creation",
    },
  ];

  const [appointmentsToDisplay, setAppointments] = useState(appointments);
  const [selectedAppointment, setSeletedAppointment] = useState();

  const selectedAppointmentOptions = (row) => {
    if (row.id == selectedAppointment.id) {
      return (
        <div className="d-flex justify-content-evenly">
          <Button icon="pi pi-pencil"></Button>
          <Button
            icon="pi pi-times"
            onClick={() => {
              let newAppts = appointmentsToDisplay;
              newAppts.splice(
                appointmentsToDisplay.findIndex(
                  (f) => f.id == selectedAppointment.id
                ),
                1
              );
              setAppointments(newAppts);
              setSeletedAppointment(null);
            }}
          ></Button>
        </div>
      );
    }
  };

  const handleAppointmentSelection = () => {
    if (selectedAppointment) {
      return (
        <Column field="" header="" body={selectedAppointmentOptions}></Column>
      );
    }
  };

  return (
    <div>
      <div className="d-flex justify-content-end">
        <Button
          label="New appointment"
          icon="pi pi-plus"
          className="color-2 border rounded mb-2"
          onClick={() => {
            navigate("/book-appointment");
          }}
        ></Button>
      </div>
      <DataTable
        value={appointmentsToDisplay}
        selectionMode="single"
        selection={selectedAppointment}
        onSelectionChange={(s) => setSeletedAppointment(s.value)}
        selec
      >
        <Column field="date" header="Date"></Column>
        <Column field="time" header="Time"></Column>
        <Column field="purpose" header="Purpose"></Column>
        {handleAppointmentSelection()}
      </DataTable>
    </div>
  );
}
