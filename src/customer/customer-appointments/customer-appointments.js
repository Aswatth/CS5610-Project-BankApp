import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";
import * as customerClient from "../../clients/customer-client";
import * as appointmentClient from "../../clients/appointment-client";
import { Tag } from "primereact/tag";
import { Dialog } from "primereact/dialog";
import { Calendar } from "primereact/calendar";
import { Toast } from "primereact/toast";

export default function CustomerAppoointments() {
  const toast = useRef(null);
  const navigate = useNavigate();

  const [appointmentsToDisplay, setAppointments] = useState([]);
  const [selectedAppointment, setSeletedAppointment] = useState();

  //Edit
  const [showEditAppointment, toggleEditAppointment] = useState(false);
  const [selectedDate, setSelectedDate] = useState([]);
  const [otherAvailableAppointments, setOtherAVailableAppointments] =
    useState();
  const [newAppointment, setNewAppointment] = useState(null);

  const getAppointments = () => {
    customerClient.viewAppointments().then((response) => {
      if (response.status == 200) {
        setAppointments(response.data);
      }
    });
  };

  function YYYYMMDDToDate(formattedDate) {
    const dateArray = formattedDate.split("-").map(Number);
    const dateObject = new Date(dateArray[0], dateArray[1] - 1, dateArray[2]);
    return dateObject;
  }

  useEffect(() => {
    if (!customerClient.isCustomer()) {
      navigate("/login");
      return;
    } else {
      getAppointments();
    }
  }, []);

  const selectedAppointmentOptions = (row) => {
    if (row.id == selectedAppointment.id) {
      return (
        <div className="d-flex justify-content-evenly">
          <Button
            icon="pi pi-pencil"
            onClick={() => {
              setSelectedDate(YYYYMMDDToDate(selectedAppointment.date));
              getOtherAppointmentsByDate(
                YYYYMMDDToDate(selectedAppointment.date)
              );
              toggleEditAppointment(true);
            }}
          ></Button>
          <Button
            icon="pi pi-times"
            onClick={() => {
              customerClient
                .cancelAppointment(selectedAppointment.id)
                .then((response) => {
                  if (response.status == 200) {
                    getAppointments();
                  }
                });
            }}
          ></Button>
        </div>
      );
    }
  };

  const handleAppointmentSelection = () => {
    if (
      selectedAppointment &&
      selectedAppointment.status.toLowerCase() != "completed"
    ) {
      return (
        <Column field="" header="" body={selectedAppointmentOptions}></Column>
      );
    }
  };

  function getOtherAppointmentsByDate(date) {
    if (date) {
      appointmentClient
        .getAppointments(
          date.getFullYear() +
            "-" +
            (date.getMonth() + 1) +
            "-" +
            date.getDate()
        )
        .then((response) => {
          if (response.status == 200) {
            setOtherAVailableAppointments(response.data);
          }
        });
    } else {
      setOtherAVailableAppointments([]);
    }
  }

  return (
    <div>
      <Toast ref={toast} />
      <Dialog
        visible={showEditAppointment}
        onHide={() => toggleEditAppointment(false)}
        header="Edit appointment"
      >
        <div>
          <Calendar
            value={selectedDate}
            onChange={(c) => {
              setSelectedDate(c.value);
              getOtherAppointmentsByDate(c.value);
              setNewAppointment(null);
            }}
          />
          <DataTable
            value={otherAvailableAppointments}
            selectionMode="row"
            selection={newAppointment}
            onSelectionChange={(s) => {
              setNewAppointment(s.value[0]);
            }}
          >
            <Column field="date" header="Date"></Column>
            <Column field="startTime" header="Start time"></Column>
            <Column field="endTime" header="End time"></Column>
          </DataTable>
          <Button
            label="Update appointment"
            disabled={
              otherAvailableAppointments
                ? otherAvailableAppointments.length == 0 ||
                  newAppointment == null
                : true
            }
            onClick={() => {
              customerClient
                .rescheduleAppointment(
                  selectedAppointment.id,
                  newAppointment.id
                )
                .then((response) => {
                  if (response.status == 200 || response.status == 201) {
                    getAppointments();
                    toggleEditAppointment(false);
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
            }}
          ></Button>
        </div>
      </Dialog>
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
        <Column field="branch" header="Branch"></Column>
        <Column field="startTime" header="Start Time"></Column>
        <Column field="endTime" header="End Time"></Column>
        <Column
          field="status"
          header="Status"
          body={(row) => {
            switch (row.status) {
              case "Completed":
                return <Tag severity="success">Completed</Tag>;
              case "Scheduled":
                return <Tag severity="info">Scheduled</Tag>;
            }
          }}
        ></Column>
        {handleAppointmentSelection()}
      </DataTable>
    </div>
  );
}
