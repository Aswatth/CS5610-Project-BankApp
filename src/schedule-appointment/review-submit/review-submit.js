import { Button } from "primereact/button";
import * as customerClient from "../../clients/customer-client";

export default function ReviewAndSubmitAppoinment({
  branch,
  date,
  purpose,
  customerInfo,
}) {
  const uiComponent = () => {
    console.log(customerClient.isCustomer());
    console.log();
    if (
      branch &&
      date &&
      (JSON.stringify(customerInfo).length != 2 || customerClient.isCustomer())
    ) {
      return (
        <div className="d-flex flex-column">
          <div>
            <label htmlFor="branch">Branch: {branch}</label>
          </div>
          <div>
            <label htmlFor="date">Date and time: {date}</label>
          </div>
          <div>
            {() => {
              if (customerInfo) {
                return (
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
                      <label htmlFor="address">
                        Address: {customerInfo.address}
                      </label>
                      <label htmlFor="username">
                        Username: {customerInfo.username}
                      </label>
                      <label htmlFor="password">
                        Password: {customerInfo.password}
                      </label>
                      <label htmlFor="password">Purpose: {purpose}</label>
                    </div>
                  </div>
                );
              }
            }}
          </div>
        </div>
      );
    } else {
      return <div></div>;
    }
  };

  return <div>{uiComponent()}</div>;
}
