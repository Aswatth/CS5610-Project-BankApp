import { Calendar } from "primereact/calendar";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import * as employeeClient from "../../clients/employee-client";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as bookAppointmentReducer from "../../reducers/book-appointment-reducer";
import { isCustomer, getProfile } from "../../clients/customer-client";
import { Dropdown } from "primereact/dropdown";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { InputMask } from "primereact/inputmask";
import { Toast } from "primereact/toast";

export default function PickDateTime() {
  const toast = useRef(null);
  const dispatch = useDispatch();
  const [date, setDate] = useState(new Date());
  const [availableAppointments, setAvailableAppointments] = useState([]);
  const [selectedAppointment, setSelectedAppointment] = useState({});

  const [purposes, setPurposes] = useState(["Query", "New account"]);
  const [selectedPurpose, setSelectedPurpose] = useState("Query");

  //Joint account
  const [showJointAccountPopUp, toggleJointAccountPopUp] = useState(false);
  const [jointAccountUser, setJoinAccountUser] = useState({});
  const [jointAccountUsers, setJoinAccountUsers] = useState([]);

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
    dispatch(bookAppointmentReducer.setPurpose(selectedPurpose));
    employeeClient
      .getCreatedAppointments(formatDateYYYYMMDD(date))
      .then((response) => {
        dispatch(bookAppointmentReducer.setDate(formatDateYYYYMMDD(date)));

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

    if (isCustomer && !purposes.find((f) => "Joint account")) {
      setPurposes([...purposes, "Joint account"]);
    }

    if (!selectedAppointment) {
      toast.current.show({
        severity: "error",
        summary: "Error",
        detail: "Message Content",
        life: 3000,
      });
    }
  }, [date, selectedAppointment]);

  const jointAccountTemplate = () => {
    if (selectedPurpose == "Joint account")
      return (
        <div className="d-flex flex-column">
          <Button
            label="Add existing customer"
            icon="pi pi-plus"
            onClick={() => toggleJointAccountPopUp(true)}
          />
          <div>
            <DataTable value={jointAccountUsers}>
              <Column field="firstName" header="First name"></Column>
              <Column field="lastName" header="Last name"></Column>
              <Column field="email" header="Email"></Column>
              <Column field="phone" header="Phone"></Column>
            </DataTable>
          </div>
        </div>
      );
  };

  return (
    <div>
      <Toast ref={toast} />
      <Dialog
        visible={showJointAccountPopUp}
        onHide={() => toggleJointAccountPopUp(false)}
        header="Joint account customer"
      >
        <div className="d-flex flex-column">
          <label htmlFor="firstName">First name:</label>
          <InputText
            id="firstNaem"
            placeholder="First name"
            onChange={(c) =>
              setJoinAccountUser({
                ...jointAccountUser,
                firstName: c.target.value,
              })
            }
          />
          <label htmlFor="lastName">Last name:</label>
          <InputText
            id="lastName"
            placeholder="Last name"
            onChange={(c) =>
              setJoinAccountUser({
                ...jointAccountUser,
                lastName: c.target.value,
              })
            }
          />
          <label htmlFor="email">Email:</label>
          <InputText
            id="email"
            type="email"
            placeholder="Email"
            onChange={(c) =>
              setJoinAccountUser({
                ...jointAccountUser,
                email: c.target.value,
              })
            }
          />
          <label htmlFor="phone">Phone:</label>
          <InputMask
            id="phone"
            onChange={(c) =>
              setJoinAccountUser({ ...jointAccountUser, phone: c.target.value })
            }
            mask="(999)-999-999"
            placeholder="(###)-###-###"
          />
          <Button
            label="Add"
            onClick={() => {
              dispatch(
                bookAppointmentReducer.setJointCustomers([
                  ...jointAccountUsers,
                  jointAccountUser,
                ])
              );
              setJoinAccountUsers([...jointAccountUsers, jointAccountUser]);
              toggleJointAccountPopUp(false);
            }}
          />
        </div>
      </Dialog>
      <div className="d-flex flex-column justify-content-between">
        <label htmlFor="pick-date" className="form-label">
          Pick a date
        </label>
        <Calendar
          id="pick-date"
          value={date}
          onChange={(e) => {
            setDate(e.value);
          }}
          placeholder="Pick a date"
          showWeek
          className="me-3"
        />
        <div className="flex-fill d-flex flex-column justify-content-start">
          <label htmlFor="">Available appointments:</label>
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
            className="me-3"
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
          <div>{jointAccountTemplate()}</div>
        </div>
      </div>
    </div>
  );
}
