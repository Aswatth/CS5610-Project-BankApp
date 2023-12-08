import { Button } from "primereact/button";
import { Card } from "primereact/card";
import {
  Navigate,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router";
import EmployeeViewAppointments from "./view-appointments/employee-view-appointments";
import { useEffect } from "react";
import EmployeeViewCustomers from "./view-customers/employee-view-customers";
import EmployeeCardRequests from "./employee-card-requests/employee-card-requests";

export default function Employee({ employeeAccess }) {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const options = createOptions();

  function createOptions() {
    let initialOptions = [
      {
        name: "Profile",
        icon: "pi pi-user",
        component: (
          <Card className="flex-fill">
            View profile. Contains name, email, phone num, address, accounts.
            Provides ability to update each of them after an email confirmation.
          </Card>
        ),
      },
      {
        name: "Home",
        icon: "pi pi-home",
        component: (
          <Card className="flex-fill">
            <EmployeeViewAppointments
              hasCreateCusomterAccess={employeeAccess.createCustomer}
            />
          </Card>
        ),
      },
    ];

    if (employeeAccess.viewCustomerAccess) {
      initialOptions.push({
        name: "View customer details",
        icon: "pi pi-info-circle",
        component: (
          <Card className="flex-fill">
            <EmployeeViewCustomers />
          </Card>
        ),
      });
    }

    if (employeeAccess.approveCardRequests) {
      initialOptions.push({
        name: "Card requests",
        icon: "pi pi-credit-card",
        component: (
          <Card className="flex-fill">
            <EmployeeCardRequests />
          </Card>
        ),
      });
      // {
      //   name: "View customer info",
      //   icon: "pi pi-info-circle",
      //   component: (
      //     <Card className="flex-fill">
      //       View performed transactions and clicking out will display more
      //       information along with the ability to repeat the transaction with
      //       updated amount.
      //     </Card>
      //   ),
      // },
      //
    }

    initialOptions.push({
      name: "Log out",
      icon: "pi pi-sign-out",
      component: <Card className="flex-fill">Logout</Card>,
    });

    return initialOptions;
  }

  function getSelectedOption() {
    let option = options.find((f) =>
      pathname.includes(f.name.toLowerCase().replaceAll(" ", "-"))
    );
    return option ? option : options[1];
  }
  const selectedOption = getSelectedOption();

  const handleSidePanelClick = (option) => {
    // console.log(option.name.toLowerCase().replaceAll(" ", "-"));
    if (!pathname.includes("log-out")) {
      if (selectedOption.name != option.name) {
        let formattedOptionName = option.name
          .toLowerCase()
          .replaceAll(" ", "-");
        // console.log(selectedOption);
        navigate(`${formattedOptionName}`);
      }
    } else {
      navigate("/login");
    }
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
        </div>
      </div>
      <div className="content d-flex flex-column ms-3">
        <Routes>
          <Route path="/" element={<Navigate to="home" />} />\
          {options
            .filter(
              (f) => f.name.toLowerCase().replaceAll(" ", "-") != "log-out"
            )
            .map((m) => {
              //   console.log(m);
              return (
                <Route
                  path={"/" + m.name.toLowerCase().replaceAll(" ", "-")}
                  element={m.component}
                ></Route>
              );
            })}
        </Routes>
      </div>
    </div>
  );
}
