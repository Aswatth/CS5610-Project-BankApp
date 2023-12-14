import { DataTable } from "primereact/datatable";
import { useEffect, useRef, useState } from "react";
import * as employeeClient from "../../clients/employee-client";
import { Column } from "primereact/column";
import { Calendar } from "primereact/calendar";
import { useNavigate } from "react-router";
import { Toast } from "primereact/toast";

export default function EmployeeCreatedAppointments() {
  const toast = useRef(null);
  const navigate = useNavigate();
  const [date, setDate] = useState(new Date());
  const [availableAppointments, setAvailableAppointments] = useState([]);

  useEffect(() => {
    if (!employeeClient.isEmployee()) {
      navigate("/login");
      return;
    }
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

  return (
    <div>
      <Toast ref={toast} />
      <h3>Created appointments</h3>
      <hr></hr>
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
          className="flex-fill"
          scrollable
          scrollHeight="400px"
        >
          <Column field="date" header="Date"></Column>
          <Column field="startTime" header="Start time"></Column>
          <Column field="endTime" header="End time"></Column>
        </DataTable>
      </div>
    </div>
  );
}
