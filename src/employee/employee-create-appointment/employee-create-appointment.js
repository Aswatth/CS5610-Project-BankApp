import { Button } from "primereact/button";
import { useState } from "react";
import * as employeeClient from "../../clients/employee-client";

export default function EmployeeCreateAppointment() {
  const [appointment, setAppointment] = useState({ intervalMins: 30 });

  const appointmentList = [];

  function formatDateToYYYYMMDD(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  }

  function formatTimeTo12HourFormat(date) {
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? "PM" : "AM";
    const formattedHours = hours % 12 || 12; // Convert 0 to 12 for midnight

    return `${formattedHours}:${String(minutes).padStart(2, "0")} ${ampm}`;
  }

  function createAppointments() {
    let currentDate = new Date(appointment.startDate);
    currentDate.setDate(currentDate.getDate() + 1);

    let endDate = new Date(appointment.endDate);
    endDate.setDate(endDate.getDate() + 1);

    while (currentDate <= endDate) {
      let formattedCurrentDate = formatDateToYYYYMMDD(currentDate);

      let currentTime = new Date(
        formattedCurrentDate + "T" + appointment.startTime + ":00"
      );

      const endTime = new Date(
        formattedCurrentDate + "T" + appointment.endTime + ":00"
      );

      while (currentTime < endTime) {
        let startTime = formatTimeTo12HourFormat(currentTime);
        currentTime.setMinutes(
          currentTime.getMinutes() + appointment.intervalMins
        );

        let newAppointment = {
          date: formattedCurrentDate,
          startTime: startTime,
          endTime: formatTimeTo12HourFormat(currentTime),
          status: "Available",
          branch: "ABC",
          id: 1,
          customer_id: null,
          employee_id: employeeClient.getEmployeeId(),
        };
        appointmentList.push(newAppointment);
      }
      currentDate.setDate(currentDate.getDate() + 1);
    }

    appointmentList.map((m) => {
      employeeClient.createNewAppointment(m);
    });
  }

  return (
    <div className="d-flex flex-column">
      <div>
        <label htmlFor="startDate" className="form-label">
          Start date:
        </label>
        <input
          id="startDate"
          className="form-control"
          type="date"
          onChange={(e) => {
            console.log(e.target.value);
            setAppointment({ ...appointment, startDate: e.target.value });
          }}
        ></input>
      </div>
      <div>
        <label htmlFor="endDate" className="form-label">
          End date:
        </label>
        <input
          id="endDate"
          className="form-control"
          type="date"
          onChange={(e) =>
            setAppointment({ ...appointment, endDate: e.target.value })
          }
        ></input>
      </div>
      <div>
        <label htmlFor="startTime" className="form-label">
          Start time:
        </label>
        <input
          id="startTime"
          className="form-control"
          type="time"
          onChange={(e) =>
            setAppointment({ ...appointment, startTime: e.target.value })
          }
        ></input>
      </div>
      <div>
        <label htmlFor="endTime" className="form-label">
          End time:
        </label>
        <input
          id="endTime"
          className="form-control"
          type="time"
          onChange={(e) =>
            setAppointment({ ...appointment, endTime: e.target.value })
          }
        ></input>
      </div>
      <div>
        <label htmlFor="interval" className="form-label">
          Interval
        </label>
        <select
          className="form-select"
          value={appointment.intervalMins}
          onChange={(e) => {
            setAppointment({ ...appointment, intervalMins: e.target.value });
          }}
        >
          <option value="30">Every 30 mins</option>
          <option value="60">Every 1 hour</option>
        </select>
        <div>
          <Button
            label="Create appointments"
            severity="success"
            onClick={() => createAppointments()}
          ></Button>
        </div>
      </div>
    </div>
  );
}
