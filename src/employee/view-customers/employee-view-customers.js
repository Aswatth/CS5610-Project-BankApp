import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";

export default function EmployeeViewCustomers() {
  const customers = [
    {
      firstName: "ABC",
      lastName: "DEF",
      //   branch: "Branch 1",
      accounts: [
        { name: "Checkings", number: "1234567890", balance: "$500" },
        { name: "Savings", number: "0987654321", balance: "$1,000" },
      ],
      email: "abc@gmail.com",
      phone: "1111111111",
    },
    {
      firstName: "ABC",
      lastName: "DEF",
      //   branch: "Branch 1",
      accounts: [{ name: "Savings", number: "0987654321", balance: "$1,000" }],
      email: "abc@gmail.com",
      phone: "1111111111",
    },
    {
      firstName: "ABC",
      lastName: "DEF",
      //   branch: "Branch 1",
      accounts: [{ name: "Checkings", number: "1234567890", balance: "$500" }],
      email: "abc@gmail.com",
      phone: "1111111111",
    },
  ];

  const accountNameTemplate = (rowData) => {
    return (
      <div className="d-flex flex-column">
        {rowData.accounts.map((m) => {
          return <div>{m.name}</div>;
        })}
      </div>
    );
  };

  const accountNumberTemplate = (rowData) => {
    return (
      <div className="d-flex flex-column">
        {rowData.accounts.map((m) => {
          return <div>{m.number}</div>;
        })}
      </div>
    );
  };

  const accountBalanceTemplate = (rowData) => {
    return (
      <div className="d-flex flex-column">
        {rowData.accounts.map((m) => {
          return <div>{m.balance}</div>;
        })}
      </div>
    );
  };

  return (
    <div>
      <DataTable value={customers}>
        <Column field="firstName" header="First name"></Column>
        <Column field="lastName" header="Last name"></Column>
        <Column header="Account name" body={accountNameTemplate}></Column>
        <Column header="Account number" body={accountNumberTemplate}></Column>
        <Column header="Account balance" body={accountBalanceTemplate}></Column>
        <Column field="email" header="Email"></Column>
        <Column field="phone" header="Phone"></Column>
      </DataTable>
    </div>
  );
}
