import { Calendar } from "primereact/calendar";
import { RadioButton } from "primereact/radiobutton";
import { useState } from "react";

export default function PickDateTime() {
  const [date, setDate] = useState(null);
  const [selectedTiming, setTiming] = useState(false);

  const timings = [
    { time: "9:00 AM", available: true },
    { time: "9:30 AM", available: true },
    { time: "10:00 AM", available: true },
    { time: "10:30 AM", available: true },
    { time: "11:00 AM", available: true },
    { time: "11:30 AM", available: true },
    { time: "12:00 PM", available: true },
    { time: "12:30 PM", available: true },
    { time: "1:00 PM", available: true },
    { time: "1:30 PM", available: true },
    { time: "2:00 PM", available: true },
    { time: "2:30 PM", available: true },
    { time: "3:00 PM", available: true },
    { time: "3:30 PM", available: true },
    { time: "4:00 PM", available: true },
    { time: "4:30 PM", available: true },
    { time: "5:00 PM", available: true },
  ];

  return (
    <div className="d-flex">
      <div className="me-5">
        <p>Available dates:</p>
        <Calendar
          value={date}
          onChange={(e) => setDate(e.value)}
          inline
          showWeek
        />
      </div>
      <div className="flex-fill">
        <p>Available time slots:</p>
        <div className="d-flex row row-cols-5">
          {timings.map((t) => {
            return (
              <div className="col mb-3">
                <RadioButton
                  inputId="timing"
                  name="timing"
                  value={t.time}
                  onChange={(e) => setTiming(e.value)}
                  checked={selectedTiming === t.time}
                />
                <label htmlFor="timing" className="ms-2 me-3">
                  {t.time}
                </label>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
