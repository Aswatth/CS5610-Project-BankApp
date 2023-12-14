import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { useEffect, useState } from "react";
import * as employeeClient from "../../clients/employee-client";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { Tag } from "primereact/tag";

export default function EmployeeViewCustomers() {
  const [customers, setCustomers] = useState([]);
  const [selectedCustomer, setCustomer] = useState(null);
  const [showMore, toggleShowMore] = useState(false);

  //Transactions
  const [showTransactions, toggleTransactions] = useState(false);
  const [transactionList, setTransactionList] = useState([]);

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
        <div>
          <Button
            label="Account info"
            icon="pi pi-info-circle"
            className="color-2 border rounded"
            onClick={() => toggleShowMore(true)}
          ></Button>
          <Button
            label="Transactions"
            icon="pi pi-info-circle"
            className="color-2 border rounded"
            onClick={() => {
              toggleTransactions(true);
              getTransactions();
            }}
          ></Button>
        </div>
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

  const getTransactions = () => {
    employeeClient
      .viewCustomerTransactions(selectedCustomer.customerId)
      .then((response) => {
        if (response.status == 200) {
          setTransactionList(response.data);
        }
      });
  };

  const transactionsTemplate = () => {
    if (selectedCustomer) {
      return (
        <div>
          <DataTable value={transactionList}>
            <Column field="transactionDate" header="Date"></Column>
            <Column field="senderAccount" header="From"></Column>
            <Column field="receiverAccount" header="To"></Column>
            <Column
              field="amount"
              header="Amount"
              body={(row) => {
                if (
                  selectedCustomer.accounts.find(
                    (f) => f.accountNumber == row.senderAccount
                  )
                ) {
                  return (
                    <Tag severity="danger">- ${row.amount.toFixed(2)}</Tag>
                  );
                } else {
                  return (
                    <Tag severity="success">+ ${row.amount.toFixed(2)}</Tag>
                  );
                }
              }}
            ></Column>
          </DataTable>
        </div>
      );
    }

    return <div>No transactions</div>;
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
      <Dialog
        visible={showTransactions}
        onHide={() => toggleTransactions(false)}
        header="Transactions"
      >
        {transactionsTemplate()}
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
