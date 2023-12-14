import { useEffect, useRef, useState } from "react";
import * as customerClient from "../../clients/customer-client";
import { InputText } from "primereact/inputtext";
import { Calendar } from "primereact/calendar";
import { useNavigate } from "react-router";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";

export default function CustomerProfile() {
  const toast = useRef(null);
  const navigate = useNavigate();
  const [customerData, setCustomerData] = useState({});
  const [disabled, setDisabled] = useState(true);

  useEffect(() => {
    if (!customerClient.isCustomer) {
      navigate("/login");
      return;
    }
    customerClient
      .getProfile()
      .then((response) => {
        let data = response.data;
        setCustomerData({
          customerId: data.customerId,
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          phone: data.phone,
          dateOfBirth: data.dateOfBirth,
          address: data.address,
          username: data.username,
          password: data.password,
        });
      })
      .catch((response) => {
        toast.current.show({
          severity: "error",
          summary: "Error",
          detail: `${response.response.data.error}`,
          life: 3000,
        });
      });
  }, []);

  return (
    <div className="d-flex flex-column">
      <Toast ref={toast} />
      <div className="d-flex mb-2">
        <div className="flex-fill d-flex justify-content-start">
          <h3>Profile</h3>
        </div>
        <div className="flex-fill d-flex justify-content-end">
          <Button
            icon={disabled ? "pi pi-pencil" : "pi pi-save"}
            className="color-2 border rounded"
            onClick={() => {
              if (!disabled) {
                customerClient
                  .updateProfile(customerData)
                  .then((response) => {
                    if (response.status == 200 || response.status == 201) {
                      navigate(0);
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
              }
              setDisabled(false);
            }}
          ></Button>
        </div>
      </div>
      <div className="d-flex">
        <label htmlFor="name">Name</label>
        <InputText
          className="flex-fill"
          value={customerData.firstName}
          disabled={disabled}
          onChange={(c) =>
            setCustomerData({ ...customerData, firstName: c.target.value })
          }
        ></InputText>
        <InputText
          className="flex-fill"
          value={customerData.lastName}
          disabled={disabled}
          onChange={(c) =>
            setCustomerData({ ...customerData, lastName: c.target.value })
          }
        ></InputText>
      </div>
      <label htmlFor="dob">Date of birth:</label>
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
