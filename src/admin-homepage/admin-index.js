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
import employeeReducer from "../reducers/employee-reducer";
import EmployeeIndex from "./view-employees/employee-data-index";

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
      name: "View access requests",
      icon: "pi pi-key",
      component: <Card className="flex-fill">View requests</Card>,
    },
    {
      name: "Update password",
      icon: "pi pi-lock",
      component: <Card>Update password</Card>,
    },
  ];

  const navigate = useNavigate();
  const { pathname } = useLocation();
  // console.log(pathname);

  const selectedOption = options.find((f) =>
    pathname.includes(f.name.toLowerCase().replace(" ", "-"))
  );

  const handleSidePanelClick = (option) => {
    if (!pathname.includes("log-out")) {
      if (selectedOption.name != option.name) {
        let formattedOptionName = option.name.toLowerCase().replace(" ", "-");
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
