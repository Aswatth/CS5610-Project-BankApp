import { Button } from "primereact/button";

export default function ReviewAndSubmitAppoinment({
  branch,
  date,
  purpose,
  customerInfo,
}) {
  const uiComponent = () => {
    if (branch && date && customerInfo) {
      return (
        <div className="d-flex flex-column">
          <div>
            <label htmlFor="branch">Branch: {branch}</label>
          </div>
          <div>
            <label htmlFor="date">Date and time: {date}</label>
          </div>
          <div>
            <h3>Personal details</h3>
            <hr></hr>
            <div className="d-flex flex-column">
              <label htmlFor="firstName">
                First name: {customerInfo.firstName}
              </label>
              <label htmlFor="lastName">
                Last name: {customerInfo.lastName}
              </label>
              <label htmlFor="dob">
                Date of birth: {customerInfo.dateOfBirth}
              </label>
              <label htmlFor="address">Address: {customerInfo.address}</label>
              <label htmlFor="username">
                Username: {customerInfo.username}
              </label>
              <label htmlFor="password">
                Password: {customerInfo.password}
              </label>
              <label htmlFor="password">Purpose: {purpose}</label>
            </div>
          </div>
        </div>
      );
    } else {
      return <div></div>;
    }
  };

  return <div>{uiComponent()}</div>;
}
