import { Calendar } from "primereact/calendar";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import * as employeeClient from "../../clients/employee-client";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as bookAppointmentReducer from "../../reducers/book-appointment-reducer";
import { Dropdown } from "primereact/dropdown";

export default function PickDateTime() {
  const dispatch = useDispatch();
  const branch = useSelector(
    (state) => state.bookAppointmentReducer.selectedBranch
  );
  const [date, setDate] = useState(new Date());
  const [availableAppointments, setAvailableAppointments] = useState([]);
  const [selectedAppointment, setSelectedAppointment] = useState({});

  const purposes = ["Query", "New account"];
  const [selectedPurpose, setSelectedPurpose] = useState("");

  function formatDateYYYYMMDD(dateToFormat) {
    return (
      dateToFormat.getFullYear() +
      "-" +
      (dateToFormat.getMonth() + 1) +
      "-" +
      dateToFormat.getDate()
    );
  }

  useEffect(() => {
    employeeClient
      .getCreatedAppointments(formatDateYYYYMMDD(date))
      .then((response) => {
        dispatch(bookAppointmentReducer.setDate(formatDateYYYYMMDD(date)));

        setAvailableAppointments(response.data);
      });
  }, [date]);

  return (
    <div>
      <div className="d-flex justify-content-between">
        <Calendar
          value={date}
          onChange={(e) => {
            setDate(e.value);
          }}
          inline
          showWeek
          className="me-3"
        />
        <div className="flex-fill d-flex flex-column justify-content-start">
          <DataTable
            value={availableAppointments}
            selectionMode="row"
            selection={selectedAppointment}
            scrollHeight="200px"
            onSelectionChange={(e) => {
              dispatch(
                bookAppointmentReducer.setStartTime(e.value[0].startTime)
              );
              dispatch(bookAppointmentReducer.setEndTime(e.value[0].endTime));

              dispatch(
                bookAppointmentReducer.setAppointmentId(
                  availableAppointments.find(
                    (f) =>
                      f.date == formatDateYYYYMMDD(date) &&
                      f.startTime == e.value[0].startTime &&
                      f.endTime == e.value[0].endTime
                  ).id
                )
              );
              setSelectedAppointment(e.value[0]);
            }}
            dataKey="id"
            className="flex-fill me-3"
          >
            <Column field="date" header="Date"></Column>
            <Column field="startTime" header="Start time"></Column>
            <Column field="endTime" header="End time"></Column>
          </DataTable>

          <label htmlFor="purpose">Purpose:</label>
          <Dropdown
            id="purpose"
            options={purposes}
            value={selectedPurpose}
            onChange={(c) => {
              setSelectedPurpose(c.value);
              dispatch(bookAppointmentReducer.setPurpose(c.value));
            }}
          ></Dropdown>
        </div>
      </div>
    </div>
  );
}
