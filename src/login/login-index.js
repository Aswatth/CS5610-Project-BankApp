import React, { useState } from "react";
import logo from "../logo.svg";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import "./login-index.css";
import { Link, useNavigate } from "react-router-dom";
import * as adminClient from "../clients/admin-client";
import * as customerClient from "../clients/customer-client";
import { Dialog } from "primereact/dialog";

export default function Login() {
  const navigate = useNavigate();
  const [credential, setCredential] = useState({ username: "", password: "" });

  const [registerVisibility, setRegisterVisibility] = useState(false);
  const [newCustomerData, setNewCustomerData] = useState({});

  const handleLogin = () => {
    // Admin
    // adminClient.login(credential).then((status) => {
    //   if (status == 200) {
    //     navigate("/admin/home");
    //   }
    // });

    handleCustomerLogin();
  };

  const handleCustomerLogin = () => {
    customerClient.login(credential).then((status) => {
      if (status == 200) {
        navigate("/customer/home");
      }
    });
  };

  const toggleRegisterUI = () => {
    setRegisterVisibility(true);
  };

  const handleRegister = () => {
    // console.log(newCustomerData);
    customerClient.register(newCustomerData).then((status) => {
      if (status == 201) {
        setRegisterVisibility(false);
        let cred = {
          username: newCustomerData["username"],
          password: newCustomerData["password"],
        };

        console.log(cred);
        setCredential(cred);

        handleCustomerLogin();
      } else if (status == 400) {
        console.log("User name already taken");
      } else {
        console.log("Error");
      }
    });
  };

  const registerContent = () => {
    return (
      <div className="d-flex flex-column w-100">
        <div>
          <label htmlFor="firstName" className="form-label">
            First name:
          </label>
          <input
            id="firstName"
            className="form-control"
            placeholder="First Name"
            type="text"
            value={newCustomerData.firstName}
            onChange={(e) =>
              setNewCustomerData({
                ...newCustomerData,
                firstName: e.target.value,
              })
            }
          />
        </div>
        <div>
          <label htmlFor="lastName" className="form-label">
            Last name:
          </label>
          <input
            id="lastName"
            className="form-control"
            placeholder="Last Name"
            type="text"
            value={newCustomerData.lastName}
            onChange={(e) =>
              setNewCustomerData({
                ...newCustomerData,
                lastName: e.target.value,
              })
            }
          />
        </div>

        <div>
          <label htmlFor="dob" className="form-label">
            Date of birth:
          </label>
          <input
            id="dob"
            type="date"
            className="form-control"
            placeholder="mm/dd/yyyy"
            value={newCustomerData.dateOfBirth}
            onChange={(e) =>
              setNewCustomerData({
                ...newCustomerData,
                dateOfBirth: e.target.value,
              })
            }
          />
        </div>
        <div>
          <label htmlFor="email" className="form-label">
            Email:
          </label>
          <input
            id="email"
            type="email"
            className="form-control"
            placeholder="exmaple@mail.com"
            value={newCustomerData.email}
            onChange={(e) =>
              setNewCustomerData({
                ...newCustomerData,
                email: e.target.value,
              })
            }
          />
        </div>
        <div>
          <label htmlFor="phone" className="form-label">
            Phone:
          </label>
          <input
            id="phone"
            type="number"
            className="form-control"
            placeholder="1111111111"
            value={newCustomerData.phone}
            onChange={(e) =>
              setNewCustomerData({
                ...newCustomerData,
                phone: e.target.value,
              })
            }
          />
        </div>
        <div>
          <label htmlFor="address" className="form-label">
            Address:
          </label>
          <input
            id="address"
            type="text"
            className="form-control"
            placeholder="Door No #, Street, City, State, ZIP"
            value={newCustomerData.address}
            onChange={(e) =>
              setNewCustomerData({
                ...newCustomerData,
                address: e.target.value,
              })
            }
          />
        </div>
        <div>
          <label htmlFor="username" className="form-label">
            Username:
          </label>
          <input
            id="username"
            type="text"
            className="form-control"
            placeholder="Username"
            value={newCustomerData.username}
            onChange={(e) =>
              setNewCustomerData({
                ...newCustomerData,
                username: e.target.value,
              })
            }
          />
        </div>
        <div>
          <label htmlFor="password" className="form-label">
            Password:
          </label>
          <input
            id="password"
            type="password"
            className="form-control"
            placeholder="Password"
            value={newCustomerData.password}
            onChange={(e) =>
              setNewCustomerData({
                ...newCustomerData,
                password: e.target.value,
              })
            }
          />
        </div>
        <Button
          label="Register"
          severity="success"
          onClick={handleRegister}
        ></Button>
      </div>
    );
  };

  return (
    <div className="p-2 color-1 vh-100 d-flex justify-content-center">
      <Dialog
        header="Register"
        visible={registerVisibility}
        onHide={() => setRegisterVisibility(false)}
      >
        {registerContent()}
      </Dialog>
      <div className="login-background d-flex flex-column border rounded">
        <div className="brand-logo m-0 p-0">
          <img src={logo} alt="logo" width={100} className="m-0 p-0" />
          <h3 className="ps-4">The project</h3>
        </div>
        <div className="login-element d-flex align-items-center p-3">
          <div className="flex-fill d-flex flex-column justify-content-evenly">
            <label htmlFor="username">Username</label>
            <InputText
              id="username"
              value={credential.username}
              onChange={(e) =>
                setCredential({ ...credential, username: e.target.value })
              }
              className="mb-3"
            />
            <label htmlFor="password">Password</label>
            <InputText
              id="password"
              type="password"
              value={credential.password}
              onChange={(e) =>
                setCredential({ ...credential, password: e.target.value })
              }
              className="mb-3"
            />
            <div className="d-flex flex-row">
              <Link
                to={"/book-appointment"}
                className="mb-3 fw-light fst-italic flex-fill"
              >
                New user? Book an appointment
              </Link>
              <Button
                label="Login"
                className="border rounded color-1 mb-3 flex-fill"
                onClick={handleLogin}
              ></Button>
              <Button
                label="Register"
                className="border rounded color-1 mb-3 flex-fill"
                onClick={toggleRegisterUI}
              ></Button>
            </div>
          </div>
        </div>
        <div className="fw-light fst-italic warning-message p-3">
          This is a sample text. Something meaningful will go here.
        </div>
      </div>
      <div className="brand-info">
        <div className="d-flex justify-content-center align-items-center">
          <img src={logo} alt="logo" className="m-0 p-0" />
        </div>
      </div>
    </div>
  );
}
