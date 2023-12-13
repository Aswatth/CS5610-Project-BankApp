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
          placeholder="First name"
          onChange={(c) =>
            setCustomerData({ ...customerData, firstName: c.target.value })
          }
        />
        <InputText
          placeholder="Last name"
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
          //   value={date}
          placeholder="Date of birth"
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
          placeholder="Address line 1"
          onChange={(c) => setAddress1(c.target.value)}
        />
        <InputText
          placeholder="Address line 2"
          onChange={(c) => setAddress2(c.target.value)}
        />
        <InputText
          placeholder="City"
          onChange={(c) => setCity(c.target.value)}
        />
        <InputText
          placeholder="State"
          onChange={(c) => setState(c.target.value)}
        />
        <InputText
          placeholder="Zip code"
          onChange={(c) => setZip(c.target.value)}
        />
      </div>
      <div className="p-inputgroup mb-2">
        <span className="p-inputgroup-addon">@</span>
        <InputText
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
          placeholder="Username"
          onChange={(c) =>
            setCustomerData({ ...customerData, username: c.target.value })
          }
        />
        <InputText
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
