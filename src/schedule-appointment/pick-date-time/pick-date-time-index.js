import { Calendar } from "primereact/calendar";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import * as employeeClient from "../../clients/employee-client";
import { useEffect, useState } from "react";

export default function PickDateTime() {
  const [date, setDate] = useState(new Date());
  const [availableAppointments, setAvailableAppointments] = useState([]);
  const [selectedAppointment, setSelectedAppointment] = useState();

  useEffect(() => {
    getAppointments(date);
  }, []);

  function getAppointments(selectedDate) {
    employeeClient
      .getCreatedAppointments(
        selectedDate.getFullYear() +
          "-" +
          (selectedDate.getMonth() + 1) +
          "-" +
          selectedDate.getDate()
      )
      .then((response) => {
        setAvailableAppointments(response.data);
      });
  }

  return (
    <div>
      <div className="d-flex justify-content-between">
        <Calendar
          value={date}
          onChange={(e) => {
            setDate(e.value);
            getAppointments(e.value);
          }}
          inline
          showWeek
          className="me-3"
        />
        <DataTable
          value={availableAppointments}
          selectionMode="row"
          selection={selectedAppointment}
          onSelectionChange={(e) => setSelectedAppointment(e.value)}
          dataKey="id"
          className="flex-fill me-3"
        >
          <Column field="date" header="Date"></Column>
          <Column field="startTime" header="Start time"></Column>
          <Column field="endTime" header="End time"></Column>
        </DataTable>
      </div>
    </div>
  );
}
