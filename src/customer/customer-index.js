import { Card } from "primereact/card";
import { ListBox } from "primereact/listbox";
import { useEffect, useState } from "react";
import CustomerHome from "./customer-home/customer-home-index";
import {
  Navigate,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { Button } from "primereact/button";
import CustomerTransactions from "./customer-transactions/customer-transactions-index";
import CustomerCardRequests from "./customer-card-requests/customer-card-requests";
import CustomerSendMoney from "./customer-send-money/customer-send-money";
import CustomerAppoointments from "./customer-appointments/customer-appointments";
import Cookies from "js-cookie";
import CustomerProfile from "./customer-profile/customer-profile";

export default function CustomerPage() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const options = [
    {
      name: "Profile",
      icon: "pi pi-user",
      component: (
        <Card className="flex-fill">
          <CustomerProfile />
        </Card>
      ),
    },
    {
      name: "Home",
      icon: "pi pi-home",
      component: (
        <Card className="flex-fill">
          <CustomerHome />
        </Card>
      ),
    },
    {
      name: "Send money",
      icon: "pi pi-send",
      component: (
        <Card className="flex-fill">
          <CustomerSendMoney />
        </Card>
      ),
    },
    {
      name: "View transactions",
      icon: "pi pi-arrow-right-arrow-left",
      component: (
        <Card className="flex-fill">
          <CustomerTransactions />
        </Card>
      ),
    },
    {
      name: "Card requests",
      icon: "pi pi-credit-card",
      component: (
        <Card className="flex-fill">
          <CustomerCardRequests />
        </Card>
      ),
    },
    {
      name: "Appointments",
      icon: "pi pi-calendar",
      component: (
        <Card className="flex-fill">
          <CustomerAppoointments />
        </Card>
      ),
    },
    {
      name: "Log out",
      icon: "pi pi-sign-out",
      component: <Card className="flex-fill">Logout</Card>,
    },
  ];

  const selectedOption = options.find((f) =>
    pathname.includes(f.name.toLowerCase().replace(" ", "-"))
  );

  const handleSidePanelClick = (option) => {
    if (selectedOption.name != option.name) {
      let formattedOptionName = option.name.toLowerCase().replace(" ", "-");
      if (formattedOptionName == "log-out") {
        Cookies.remove("bank-app-token");
        navigate("/login");
        return;
      }
      navigate(`${formattedOptionName}`);
      return;
    } else {
      navigate("/login");
      return;
    }
  };

  const optionsTemplate = (option) => {
    return (
      <div className="d-flex">
        <i className={option.icon + " me-5"}></i>
        <div>{option.name}</div>
      </div>
    );
  };
  return (
    <div className="vh-100 color-1 d-flex p-3">
      <div
        className="side-panel border rounded"
        style={{ backgroundColor: "white" }}
      >
        <div className="d-flex flex-column justify-content-start">
          {options.map((m) => {
            return (
              <Button
                icon={m.icon}
                className={`border rounded ${
                  selectedOption.name == m.name ? "color-2" : "color-3"
                }`}
                onClick={() => handleSidePanelClick(m)}
              >
                <span className="ms-3">{m.name}</span>
              </Button>
            );
          })}
          {/* <ListBox
          value={selectedOption}
          onChange={(e) => {
            if (e.value) {
              updateSelectedOption(e.value);
              let path = e.value.name.toLowerCase().replace(" ", "-");
              if (path != "log-out") {
                navigate(`${e.value.name.toLowerCase().replace(" ", "-")}`);
              } else {
                navigate("/login");
              }
            }
          }}
          options={options}
          optionLabel="name"
          className="flex-fill"
          itemTemplate={optionsTemplate}
        /> */}
        </div>
      </div>
      <div className="content d-flex flex-column ms-3">
        <Routes>
          <Route path="/" element={<Navigate to="home" />} />\
          {options
            .filter((f) => f.name.toLowerCase().replace(" ", "-") != "log-out")
            .map((m) => {
              // console.log(m.component);
              return (
                <Route
                  path={"/" + m.name.toLowerCase().replace(" ", "-")}
                  element={m.component}
                ></Route>
              );
            })}
        </Routes>
      </div>

      {/* <div className="ms-3 content d-flex flex-column">
        {selectedOption.component}
      </div> */}
    </div>
  );
}
