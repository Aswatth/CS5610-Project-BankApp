import { Steps } from "primereact/steps";
import { Card } from "primereact/card";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import "./schedule-appointment-index.css";
import PickLocation from "./pick-location/pick-location-index";
import { useEffect, useState } from "react";
import PickDateTime from "./pick-date-time/pick-date-time-index";
import PersonalInformation from "./personal-information/personal-information";
import { useSelector } from "react-redux";
import ReviewAndSubmitAppoinment from "./review-submit/review-submit";
import * as appointmentClient from "../clients/appointment-client";
import * as customerClient from "../clients/customer-client";

export default function ScheduleAppointment() {
  const [activeIndex, setActiveIndex] = useState(0);
  // const [scheduleContent, setScheduleContent] = useState();

  //appointment data
  //Appointment Id
  const appointmentId = useSelector(
    (state) => state.bookAppointmentReducer.appointmentId
  );

  //Branch
  const branch = useSelector(
    (state) => state.bookAppointmentReducer.selectedBranch
  );
  //Appointment data
  const date = useSelector(
    (state) => state.bookAppointmentReducer.selectedDate
  );
  const startTime = useSelector(
    (state) => state.bookAppointmentReducer.selectedStartTime
  );
  const endTime = useSelector(
    (state) => state.bookAppointmentReducer.selectedEndTime
  );

  const purpose = useSelector((state) => state.bookAppointmentReducer.purpose);

  //Customer data
  const customerInfo = useSelector(
    (state) => state.bookAppointmentReducer.customerInfo
  );

  const steps = [
    {
      label: "Pick a location",
      component: (
        <div>
          <PickLocation></PickLocation>
        </div>
      ),
    },
    {
      label: "Pick date and time",
      component: (
        <div>
          <PickDateTime></PickDateTime>
        </div>
      ),
    },
    {
      label: "Personal information",
      component: <PersonalInformation></PersonalInformation>,
    },
    {
      label: "Review and submit",
      component: "",
    },
  ];
  const [stepsToDisplay, setSteps] = useState(steps);

  const [isNextDisabled, setNextDisable] = useState(true);

  useEffect(() => {
    if (customerClient.isCustomer()) {
      let temp = stepsToDisplay;
      temp = temp.filter((f) => f.label != "Personal information");
      setSteps(temp);
    }

    switch (stepsToDisplay[activeIndex].label) {
      case "Pick a location":
        if (branch) {
          let tempSteps = stepsToDisplay;
          tempSteps[activeIndex].label = branch;
          setSteps(tempSteps);
          setNextDisable(false);
          return;
        }
        break;
      case "Pick date and time":
        if (date && startTime && endTime) {
          let tempSteps = stepsToDisplay;
          tempSteps[activeIndex].label =
            date +
            (startTime && endTime ? " | " + startTime + " - " + endTime : "");
          setSteps(tempSteps);
          setNextDisable(false);
          return;
        }
        break;
      case "Personal information":
        if (customerInfo) {
          setNextDisable(false);
          return;
        }
      case "Review and submit": {
        console.log("Review");
        let tempSteps = stepsToDisplay;
        tempSteps[activeIndex].component = (
          <ReviewAndSubmitAppoinment
            branch={branch}
            date={
              date +
              (startTime && endTime ? " | " + startTime + " - " + endTime : "")
            }
            customerInfo={customerInfo}
            purpose={purpose}
          />
        );
        setSteps(tempSteps);
        setNextDisable(false);
        return;
      }
    }
  }, [branch, date, startTime, endTime, activeIndex]);

  const previousButtonTemplate = () => {
    if (activeIndex > 0) {
      return (
        <div className="flex-fill d-flex justify-content-start">
          <Button
            label={"Previous"}
            className={"color-2 border rounded"}
            onClick={() => {
              if (activeIndex > 0) {
                setNextDisable(true);
                setActiveIndex(activeIndex - 1);
              }
            }}
          ></Button>
        </div>
      );
    }
  };

  return (
    <div className="color-1 vh-100 d-flex flex-column p-2">
      <Card className="schedule-step mb-2">
        <h3 className="">Schedule an appointment</h3>
        <Steps model={stepsToDisplay} activeIndex={activeIndex}></Steps>
      </Card>
      <Card className="schedule-step-content flex-fill">
        <div className="d-flex">
          {previousButtonTemplate()}
          <div className="flex-fill d-flex justify-content-end">
            <Button
              label={
                stepsToDisplay[activeIndex].label == "Review and submit"
                  ? "Submit"
                  : "Next"
              }
              className={
                (stepsToDisplay[activeIndex].label != "Review and submit"
                  ? "color-2 "
                  : "") + "border rounded "
              }
              severity={
                stepsToDisplay[activeIndex].label == "Review and submit"
                  ? "success"
                  : ""
              }
              disabled={isNextDisabled}
              onClick={() => {
                if (stepsToDisplay[activeIndex].label != "Review and submit") {
                  setNextDisable(true);
                  setActiveIndex((activeIndex + 1) % steps.length);
                } else {
                  if (customerClient.isCustomer()) {
                    appointmentClient
                      .ScheduleAppointment(
                        appointmentId,
                        null,
                        customerClient.getCustomerId(),
                        purpose
                      )
                      .then((response) => {
                        if (response.status == 200 || response.status == 201) {
                          console.log("appointment booked");
                        }
                      });
                  } else {
                    appointmentClient
                      .ScheduleAppointment(
                        appointmentId,
                        customerInfo,
                        null,
                        purpose
                      )
                      .then((response) => {
                        if (response.status == 200 || response.status == 201) {
                          console.log("appointment booked");
                        }
                      });
                  }

                  // setNextDisable(false);
                }
              }}
            ></Button>
          </div>
        </div>
        {stepsToDisplay[activeIndex].component}
      </Card>
    </div>
  );
}
