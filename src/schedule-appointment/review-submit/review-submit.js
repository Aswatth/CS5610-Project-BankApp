import { Button } from "primereact/button";
import * as customerClient from "../../clients/customer-client";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";

export default function ReviewAndSubmitAppoinment({
  branch,
  date,
  purpose,
  customerInfo,
  jointAccountUsers,
}) {
  const personalInfoComponent = () => {
    if (!customerClient.isCustomer()) {
      return (
        <div>
          <h3>Personal details</h3>
          <hr></hr>
          <div className="d-flex flex-column">
            <label htmlFor="firstName">
              First name: {customerInfo.firstName}
            </label>
            <label htmlFor="lastName">Last name: {customerInfo.lastName}</label>
            <label htmlFor="dob">
              Date of birth: {customerInfo.dateOfBirth}
            </label>
            <label htmlFor="address">Address: {customerInfo.address}</label>
            <label htmlFor="username">Username: {customerInfo.username}</label>
            <label htmlFor="password">Password: {customerInfo.password}</label>
            <label htmlFor="password">Purpose: {purpose}</label>
          </div>
        </div>
      );
    }
  };
  const jointCustomersCompoenent = () => {
    if (jointAccountUsers) {
      return (
        <DataTable value={jointAccountUsers}>
          <Column field="firstName" header="First name"></Column>
          <Column field="lastName" header="Last name"></Column>
          <Column field="email" header="Email"></Column>
          <Column field="phone" header="Phone"></Column>
        </DataTable>
      );
    }
  };
  const uiComponent = () => {
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
            {personalInfoComponent()}
            {jointCustomersCompoenent()}
          </div>
        </div>
      );
    } else {
      return <div></div>;
    }
  };

  return <div>{uiComponent()}</div>;
}
