import { Card } from "primereact/card";
import AdminAccessPage from "./manage-access-page/manage-access-page";
import { useState } from "react";
import { ListBox } from "primereact/listbox";
import "./admin-homepage-index.css";
import ViewEmployees from "./view-employees/employeeData-index";

export default function AdminHomePage() {
  const options = [
    {
      name: "View employees",
      icon: "pi pi-users",
      component: (
        <Card className="flex-fill">
          <ViewEmployees></ViewEmployees>
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

  const [selectedOption, updateSelectedOption] = useState(options[0]);

  const optionsTemplate = (option) => {
    return (
      <div className="d-flex">
        <i className={option.icon + " me-5"}></i>
        <div>{option.name}</div>
      </div>
    );
  };
  return (
    <div className="d-flex vh-100 color-1 p-3">
      <div className="side-panel d-flex flex-column">
        <ListBox
          value={selectedOption}
          onChange={(e) => {
            if (e.value) updateSelectedOption(e.value);
          }}
          options={options}
          optionLabel="name"
          className="flex-fill"
          itemTemplate={optionsTemplate}
        />
      </div>
      <div className="ms-3 content d-flex flex-column">
        {selectedOption.component}
      </div>
    </div>
  );
}
