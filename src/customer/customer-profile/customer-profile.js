import { useEffect, useState } from "react";
import * as customerClient from "../../clients/customer-client";
import { InputText } from "primereact/inputtext";
import { Calendar } from "primereact/calendar";
import { useNavigate } from "react-router";
import { Button } from "primereact/button";

export default function CustomerProfile() {
  const navigate = useNavigate();
  const [customerData, setCustomerData] = useState({});
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
      <Button icon="pi pi-pencil" onClick={() => setDisabled(false)}></Button>
      <label htmlFor="firstName">First name:</label>
      <InputText
        value={customerData.firstName}
        disabled={disabled}
        onChange={(c) =>
          setCustomerData({ ...customerData, firstName: c.target.value })
        }
      ></InputText>
      <label htmlFor="lastName">Last name:</label>
      <InputText
        value={customerData.lastName}
        disabled={disabled}
        onChange={(c) =>
          setCustomerData({ ...customerData, lastName: c.target.value })
        }
      ></InputText>
      <label htmlFor="lastName">Date of birth:</label>
      <Calendar
        value={new Date(customerData.dateOfBirth)}
        disabled={disabled}
      />
      <label htmlFor="address">Address:</label>
      <InputText
        value={customerData.address}
        disabled={disabled}
        onChange={(c) =>
          setCustomerData({ ...customerData, address: c.target.value })
        }
      ></InputText>
      <label htmlFor="email">Email:</label>
      <InputText
        value={customerData.email}
        disabled={disabled}
        onChange={(c) =>
          setCustomerData({ ...customerData, email: c.target.value })
        }
      ></InputText>

      <label htmlFor="phone">Phone:</label>
      <InputText
        value={customerData.phone}
        disabled={disabled}
        onChange={(c) =>
          setCustomerData({ ...customerData, phone: c.target.value })
        }
      ></InputText>
      <label htmlFor="username">Username:</label>
      <InputText
        value={customerData.username}
        disabled={disabled}
        onChange={(c) =>
          setCustomerData({ ...customerData, username: c.target.value })
        }
      ></InputText>
      <label htmlFor="password">Password:</label>
      <InputText
        value={customerData.password}
        type="password"
        disabled={disabled}
        onChange={(c) =>
          setCustomerData({ ...customerData, password: c.target.value })
        }
      ></InputText>
    </div>
  );
}
