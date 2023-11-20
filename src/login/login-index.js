import React, { useState } from "react";
import logo from "../logo.svg";
import { Card } from "primereact/card";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact";
import "./login-index.css";
import { Link } from "react-router-dom";

export default function Login() {
  const [value, setValue] = useState("");
  return (
    <div className="p-2 color-1 vh-100 d-flex justify-content-center">
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
              value={value}
              onChange={(e) => setValue(e.target.value)}
              className="mb-3"
            />
            <label htmlFor="password">Password</label>
            <InputText
              id="password"
              value={value}
              onChange={(e) => setValue(e.target.value)}
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
