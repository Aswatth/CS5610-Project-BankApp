import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { useEffect, useState } from "react";
import * as employeeClient from "../../clients/employee-client";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";

export default function EmployeeViewCustomers() {
  const [customers, setCustomers] = useState([]);
  const [selectedCustomer, setCustomer] = useState(null);
  const [showMore, toggleShowMore] = useState(false);

  useEffect(() => {
    employeeClient.viewCustomers().then((response) => {
      if (response.status == 200) {
        setCustomers(response.data);
      }
    });
  }, []);

  // const accountNameTemplate = (rowData) => {
  //   return (
  //     <div className="d-flex flex-column">
  //       {rowData.accounts.map((m) => {
  //         return <div>{m.name}</div>;
  //       })}
  //     </div>
  //   );
  // };

  // const accountNumberTemplate = (rowData) => {
  //   return (
  //     <div className="d-flex flex-column">
  //       {rowData.accounts.map((m) => {
  //         return <div>{m.number}</div>;
  //       })}
  //     </div>
  //   );
  // };

  // const accountBalanceTemplate = (rowData) => {
  //   return (
  //     <div className="d-flex flex-column">
  //       {rowData.accounts.map((m) => {
  //         return <div>{m.balance}</div>;
  //       })}
  //     </div>
  //   );
  // };

  const viewMoreTemplate = (row) => {
    if (selectedCustomer && selectedCustomer.customerId == row.customerId) {
      return (
        <Button
          label="View more"
          icon="pi pi-info-circle"
          className="color-2 border rounded"
          onClick={() => toggleShowMore(true)}
        ></Button>
      );
    }
  };

  const accountsTemplate = () => {
    if (selectedCustomer && selectedCustomer.accounts) {
      return (
        <div>
          <h5>Accounts:</h5>
          <DataTable value={selectedCustomer.accounts}>
            <Column field="accountType" header="Account type"></Column>
            <Column field="accountNumber" header="Account number"></Column>
            <Column field="accountBalance" header="Account balance"></Column>
          </DataTable>
        </div>
      );
    } else {
      return <h5>No accounts</h5>;
    }
  };

  const cardsTemplate = () => {
    if (selectedCustomer && selectedCustomer.cards) {
      return (
        <div>
          <h5>Cards:</h5>
          <DataTable value={selectedCustomer.cards}>
            <Column field="cardNumber" header="Card number"></Column>
            <Column
              field="cardType"
              header="Card type"
              body={(row) => {
                return <div>{row.cardType.toUpperCase()}</div>;
              }}
            ></Column>
            <Column field="cardCvv" header="CVV"></Column>
            <Column field="cardExpiry" header="Expiry"></Column>
            <Column field="cardLinkedAccount" header="Linked account"></Column>
            <Column field="cardLimit" header="Limit"></Column>
          </DataTable>
        </div>
      );
    } else {
      return <h5>No cards</h5>;
    }
  };
  const moreInfoTemplate = () => {
    return (
      <div>
        {accountsTemplate()}
        {cardsTemplate()}
      </div>
    );
  };

  return (
    <div>
      <Dialog
        visible={showMore}
        onHide={() => toggleShowMore(false)}
        header="More info"
      >
        {moreInfoTemplate()}
      </Dialog>
      <DataTable
        value={customers}
        selection="row"
        selectionMode="single"
        onSelectionChange={(s) => {
          setCustomer(s.value);
        }}
      >
        <Column field="firstName" header="First name"></Column>
        <Column field="lastName" header="Last name"></Column>
        {/* <Column header="Account name" body={accountNameTemplate}></Column>
        <Column header="Account number" body={accountNumberTemplate}></Column>
        <Column header="Account balance" body={accountBalanceTemplate}></Column> */}
        <Column field="email" header="Email"></Column>
        <Column field="phone" header="Phone"></Column>
        <Column field="" header="" body={viewMoreTemplate}></Column>
      </DataTable>
    </div>
  );
}
