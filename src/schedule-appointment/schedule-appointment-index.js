import { Steps } from "primereact/steps";
import { Card } from "primereact/card";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import "./schedule-appointment-index.css";
import PickLocation from "./pick-location/pick-location-index";
import { useState } from "react";
import PickDateTime from "./pick-date-time/pick-date-time-index";
import PersonalInformation from "./personal-information/personal-information";

export default function ScheduleAppointment() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [scheduleContent, setScheduleContent] = useState();

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
    { label: "Review and confirm" },
  ];

  return (
    <div className="color-1 vh-100 d-flex flex-column p-3">
      <h1 className="p-3">Schedule an appointment</h1>
      <Card className="schedule-step mb-2">
        <Steps model={steps} activeIndex={activeIndex}></Steps>
      </Card>
      <Card className="schedule-step-content flex-fill">
        <Button
          label="Next"
          className="color-2 border rounded mt-2 mb-2 float-end"
          onClick={() => setActiveIndex((activeIndex + 1) % steps.length)}
        ></Button>
        {steps[activeIndex].component}
      </Card>
    </div>
  );
}
