import { Calendar } from "primereact/calendar";
import { InputText } from "primereact/inputtext";
import { InputMask } from "primereact/inputmask";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import * as bookAppointmentReducer from "../../reducers/book-appointment-reducer";

export default function PersonalInformation() {
  const dispatch = useDispatch();
  const [customerData, setCustomerData] = useState();
  const [address1, setAddress1] = useState();
  const [address2, setAddress2] = useState();
  const [city, setCity] = useState();
  const [state, setState] = useState();
  const [zip, setZip] = useState();

  useEffect(() => {
    if (customerData) {
      if (
        customerData.firstName &&
        customerData.firstName != "" &&
        customerData.lastName &&
        customerData.lastName != "" &&
        customerData.dateOfBirth &&
        customerData.dateOfBirth != "" &&
        customerData.email &&
        customerData.email != "" &&
        customerData.phone &&
        customerData.phone != ""
      ) {
        if (address1 && address2 && city && state && zip) {
          let address =
            address1 + ", " + address2 + ", " + city + ", " + state + "-" + zip;
          dispatch(
            bookAppointmentReducer.setCustomerInfo({
              ...customerData,
              address: address,
            })
          );
        } else {
          dispatch(bookAppointmentReducer.setCustomerInfo(null));
        }
      }
    } else {
      dispatch(bookAppointmentReducer.setCustomerInfo(null));
    }
  }, [customerData, address1, address2, city, state, zip]);

  return (
    <div>
      <div className="p-inputgroup mb-2">
        <span className="p-inputgroup-addon">
          <i className="pi pi-user"></i>
        </span>
        <InputText
          //value={customerData.firstName}
          placeholder="First name"
          required
          onChange={(c) =>
            setCustomerData({ ...customerData, firstName: c.target.value })
          }
        />
        <InputText
          //value={customerData.lastName}
          placeholder="Last name"
          required
          onChange={(c) =>
            setCustomerData({ ...customerData, lastName: c.target.value })
          }
        />
      </div>
      <div className="p-inputgroup mb-2">
        <span className="p-inputgroup-addon">
          <i className="pi pi-calendar"></i>
        </span>
        <Calendar
          //value={new Date(customerData.dateOfBirth)}
          placeholder="Date of birth"
          required
          onChange={(c) =>
            setCustomerData({
              ...customerData,
              dateOfBirth:
                c.value.getFullYear() +
                "-" +
                (c.value.getMonth() + 1) +
                "-" +
                c.value.getDate(),
            })
          }
          // inline
          showWeek
        />
      </div>

      <div className="p-inputgroup mb-2">
        <span className="p-inputgroup-addon">
          <i className="pi pi-home"></i>
        </span>
        <InputText
          //value={address1}
          required
          placeholder="Address line 1"
          onChange={(c) => setAddress1(c.target.value)}
        />
        <InputText
          //value={address2}
          required
          placeholder="Address line 2"
          onChange={(c) => setAddress2(c.target.value)}
        />
        <InputText
          //value={city}
          required
          placeholder="City"
          onChange={(c) => setCity(c.target.value)}
        />
        <InputText
          //value={state}
          required
          placeholder="State"
          onChange={(c) => setState(c.target.value)}
        />
        <InputText
          //value={zip}
          required
          placeholder="Zip code"
          onChange={(c) => setZip(c.target.value)}
        />
      </div>
      <div className="p-inputgroup mb-2">
        <span className="p-inputgroup-addon">@</span>
        <InputText
          //value={customerData.email}
          required
          placeholder="Emaild Id"
          onChange={(c) =>
            setCustomerData({ ...customerData, email: c.target.value })
          }
        />
      </div>
      <div className="p-inputgroup mb-2">
        <span className="p-inputgroup-addon">
          <i className="pi pi-phone"></i>
        </span>
        <InputMask
          //value={customerData.phone}
          required
          onChange={(c) =>
            setCustomerData({ ...customerData, phone: c.target.value })
          }
          mask="(999)-999-999"
          placeholder="(###)-###-###"
        />
      </div>
      <div className="p-inputgroup mb-2">
        <span className="p-inputgroup-addon">
          <i className="pi pi-user"></i>
        </span>
        <InputText
          //value={customerData.username}
          required
          placeholder="Username"
          onChange={(c) =>
            setCustomerData({ ...customerData, username: c.target.value })
          }
        />
        <InputText
          //value={customerData.password}
          required
          placeholder="Password"
          type="password"
          onChange={(c) =>
            setCustomerData({ ...customerData, password: c.target.value })
          }
        />
      </div>
      <p>
        <i>
          The username and password will be used to view and update
          appointments.
        </i>
      </p>
    </div>
  );
}
