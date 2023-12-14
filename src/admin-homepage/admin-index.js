import { Card } from "primereact/card";
import AdminAccessPage from "./manage-access-page/manage-access-page";
import "./admin-homepage-index.css";
import {
  Navigate,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router";
import { Button } from "primereact/button";
import EmployeeIndex from "./view-employees/employee-data-index";
import Cookies from "js-cookie";
import { isAdmin } from "../clients/admin-client";
import { useEffect } from "react";
import Branches from "./branches/branches";

export default function AdminPage() {
  const options = [
    {
      name: "Home",
      icon: "pi pi-users",
      component: (
        <Card className="flex-fill">
          <EmployeeIndex></EmployeeIndex>
        </Card>
      ),
    },
    {
      name: "Manage access",
      icon: "pi pi-sliders-h",
      component: (
        <Card className="flex-fill">
          <AdminAccessPage></AdminAccessPage>
        </Card>
      ),
    },
    {
      name: "Branches",
      icon: "pi pi-building",
      component: (
        <Card className="flex-fill">
          <Branches />
        </Card>
      ),
    },
    {
      name: "Log out",
      icon: "pi pi-sign-out",
    },
  ];

  const navigate = useNavigate();
  const { pathname } = useLocation();

  const selectedOption = options.find((f) =>
    pathname.includes(f.name.toLowerCase().replace(" ", "-"))
  );

  const handleSidePanelClick = (option) => {
    if (selectedOption.name != option.name) {
      if (isAdmin) {
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
    }
  };
  return (
    <div className="vh-100 color-1 d-flex p-3">
      <div className="flex-fill d-flex">
        <div
          className="side-panel border rounded"
          style={{ backgroundColor: "white" }}
        >
          <div className="d-flex flex-column justify-content-start">
            <div className="color-2 broder rounded">
              <h3 className="p-2">Welcome admin</h3>
            </div>
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
    </div>
  );
}
