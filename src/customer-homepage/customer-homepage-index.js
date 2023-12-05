import { Card } from "primereact/card";
import { ListBox } from "primereact/listbox";
import { useState } from "react";
import CustomerHome from "./customer-home/customer-home-index";

export default function CustomerHomePage() {
  const options = [
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
          <CustomerHome />
        </Card>
      ),
    },
    {
      name: "View transactions",
      icon: "pi pi-arrow-right-arrow-left",
      component: (
        <Card className="flex-fill">
          View performed transactions and clicking out will display more
          information along with the ability to repeat the transaction with
          updated amount.
        </Card>
      ),
    },
    {
      name: "Card requests",
      icon: "pi pi-key",
      component: <Card className="flex-fill">View requests</Card>,
    },
    {
      name: "Reports",
      icon: "pi pi-file",
      component: (
        <Card className="flex-fill">
          Settings where users can update card limits, set up notification
          emails when balance runs below a threshold, transaction alerts.
        </Card>
      ),
    },
    {
      name: "Settings",
      icon: "pi pi-cog",
      component: (
        <Card className="flex-fill">
          Reports. Select an account and user can view available reports and
          download them as PDFs
        </Card>
      ),
    },
    {
      name: "Log out",
      icon: "pi pi-sign-out",
      component: <Card className="flex-fill">Logout</Card>,
    },
  ];

  const [selectedOption, updateSelectedOption] = useState(options[1]);

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
