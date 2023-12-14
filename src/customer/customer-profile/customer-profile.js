import { useEffect, useState } from "react";
import * as customerClient from "../../clients/customer-client";
import { InputText } from "primereact/inputtext";
import { Calendar } from "primereact/calendar";
import { useNavigate } from "react-router";
import { Button } from "primereact/button";

export default function CustomerProfile() {
  const navigate = useNavigate();
  const [customerData, setCustomerData] = useState();
  const [disabled, setDisabled] = useState(true);

  useEffect(() => {
    if (!customerClient.isCustomer) {
      navigate("/login");
      return;
    }
    customerClient.getProfile().then((response) => {
      setCustomerData(response.data);
    });
  }, [customerData]);

  return (
    <div className="d-flex flex-column">
      <Button icon="pi pi-pencil"></Button>
      <label htmlFor="firstName">First name:</label>
      <InputText value={customerData.firstName} disabled={disabled}></InputText>
      <label htmlFor="lastName">Last name:</label>
      <InputText value={customerData.lastName} disabled={disabled}></InputText>
      <label htmlFor="lastName">Date of birth:</label>
      <Calendar
        value={new Date(customerData.dateOfBirth)}
        disabled={disabled}
      />
      <label htmlFor="email">Email:</label>
      <InputText value={customerData.email} disabled={disabled}></InputText>
      <label htmlFor="address">Address:</label>
      <InputText value={customerData.address} disabled={disabled}></InputText>
      <label htmlFor="username">Username:</label>
      <InputText value={customerData.username} disabled={disabled}></InputText>
      <label htmlFor="phone">Phone:</label>
      <InputText value={customerData.phone} disabled={disabled}></InputText>
    </div>
  );
}
