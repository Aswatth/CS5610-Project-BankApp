import { Button } from "primereact/button";
import { Card } from "primereact/card";

export default function CustomerCurrentBalance() {
  function getCurrentDate() {
    let date = new Date();
    return (
      date.toLocaleString("default", { month: "long" }) +
      " " +
      date.getDate() +
      ", " +
      date.getFullYear() +
      "-" +
      date.getHours() +
      ":" +
      date.getMinutes()
    );
  }
  return (
    <div className="d-flex flex-column">
      <div className="d-flex justify-content-center fw-semibold">
        Your total balance
      </div>
      <div className="d-flex justify-content-center">
        <div className="fs-1" style={{ color: "var(--color-3)" }}>
          $ 80,000
        </div>
      </div>
      <div className="d-flex justify-content-center">{getCurrentDate()}</div>
      <Button label="Send money" icon="pi pi-send" className="color-2"></Button>
    </div>
  );
}
