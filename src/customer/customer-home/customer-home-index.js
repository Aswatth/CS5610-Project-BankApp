import { Card } from "primereact/card";
import "./customer-home-index.css";
import CustomerCard from "./customer-card/customer-card-index";
import { Button } from "primereact/button";
import { Carousel } from "primereact/carousel";
import { useEffect, useState } from "react";
import CustomerCurrentBalance from "./customer-current-balance/current-current-balance-index";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Tag } from "primereact/tag";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import * as customerClient from "../../clients/customer-client";
import * as customerReducer from "../../reducers/customer-reducer";

export default function CustomerHome() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [currentCardIndex, updateCurrentCardIndex] = useState(0);
  const cardList = [
    {
      name: "Platinum",
      last4Digits: "1234",
      holderName: "John Doe",
      expiresOn: "10/15",
      cvv: "000",
    },
    {
      name: "Gold",
      last4Digits: "1234",
      holderName: "John Doe",
      expiresOn: "10/15",
      cvv: "000",
    },
    {
      name: "Silver",
      last4Digits: "1234",
      holderName: "John Doe",
      expiresOn: "10/15",
      cvv: "000",
    },
    {
      name: "Bronze",
      last4Digits: "1234",
      holderName: "John Doe",
      expiresOn: "10/15",
      cvv: "000",
    },
  ];

  const accountList = useSelector((state) => state.customerReducer.accountList);

  useEffect(() => {
    customerClient.getAccounts().then((response) => {
      if (response.status == 200) {
        dispatch(customerReducer.setAccountList(response.data));
      }
    });
  }, [accountList]);

  const [selectedAccount, setSelectedAccount] = useState(null);

  const transactionList = [
    {
      transactionType: "CREDIT",
      to: "1111111111",
      from: "1234567890",
      amount: "100",
    },
    {
      transactionType: "DEBIT",
      to: "1111111111",
      from: "1234567890",
      amount: "50",
    },
    {
      transactionType: "DEBIT",
      to: "2222222222",
      from: "0987654321",
      amount: "50",
    },
    {
      transactionType: "CREDIT",
      to: "2222222222",
      from: "0987654321",
      amount: "500",
    },
  ];

  const amountTransferredTemplate = (rowData) => {
    console.log(rowData.transactionType);
    if (rowData.transactionType == "CREDIT")
      return <Tag severity="success">${rowData.amount}</Tag>;
    else {
      return <Tag severity="danger">${rowData.amount}</Tag>;
    }
  };

  const cardTemplate = (cardData) => {
    return (
      <CustomerCard cardWidth={300} cardHeight={200} cardData={cardData} />
    );
  };

  return (
    <div className="d-flex flex-column">
      <div className="flex-fill d-flex mb-1">
        <div className="card-transactions-section me-1 d-flex flex-column">
          <div className="border rounded p-3 flex-fill">
            <h2>Cards:</h2>
            <div className="d-flex justify-content-evenly">
              <div className="d-flex flex-fill">
                <Button
                  icon="pi pi-chevron-left"
                  //   rounded
                  style={{
                    backgroundColor: "transparent",
                    color: "black",
                    border: "none",
                  }}
                  onClick={() => {
                    updateCurrentCardIndex(
                      (currentCardIndex - 1) % cardList.length
                    );
                  }}
                ></Button>
                {cardTemplate(cardList[currentCardIndex])}
                <Button
                  icon="pi pi-chevron-right"
                  //   rounded
                  style={{
                    backgroundColor: "transparent",
                    color: "black",
                    border: "none",
                  }}
                  onClick={() => {
                    updateCurrentCardIndex(
                      (currentCardIndex + 1) % cardList.length
                    );
                  }}
                ></Button>
              </div>
              <div className="flex-fill">
                <div className="d-flex flex-column justify-content-evenly">
                  <Button
                    label="Card settings"
                    icon="pi pi-cog"
                    className="flex-fill color-2 mb-2"
                  ></Button>
                  <Button
                    label="Apply debit card"
                    icon="pi pi-cog"
                    className="flex-fill color-2 mb-2"
                  ></Button>
                  <Button
                    label="Apply credit card"
                    icon="pi pi-cog"
                    className="flex-fill color-2"
                  ></Button>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* <div className="expenses-balance-section ms-1 d-flex flex-column">
          <div className="flex-fill border rounded p-3 ">
            <CustomerCurrentBalance />
          </div>
        </div> */}
      </div>
      <div className="flex-fill d-flex mt-1">
        <div className="card-transactions-section me-1 d-flex flex-column">
          <div className="flex-fill border rounded p-3 ">
            <div className="d-flex">
              <h4 className="flex-fill d-flex justify-content-start">
                {selectedAccount ? selectedAccount.accountType + "-" : ""}{" "}
                Account transactions:
              </h4>
              <Button
                className="border rounded color-2"
                label="View all"
                onClick={(e) => {
                  navigate("/customer/view-transactions");
                }}
              ></Button>
            </div>
            {selectedAccount ? (
              <DataTable
                value={
                  selectedAccount
                    ? transactionList
                        .filter((f) => f.from == selectedAccount.number)
                        .slice(0, 2)
                    : null
                }
              >
                <Column
                  field="transactionType"
                  header="Transaction type"
                ></Column>
                <Column field="to" header="Receiver account number"></Column>
                <Column
                  field="amount"
                  header="Amount transferred"
                  body={amountTransferredTemplate}
                ></Column>
              </DataTable>
            ) : (
              <div>Select an account to view recent transactions</div>
            )}
          </div>
        </div>
        <div className="expenses-balance-section ms-1 d-flex flex-column">
          <div className="flex-fill border rounded p-3 ">
            <h4>Accounts:</h4>
            <DataTable
              value={accountList}
              selectionMode="single"
              selection={selectedAccount}
              onSelectionChange={(s) => setSelectedAccount(s.value)}
            >
              <Column field="accountType" header="Account type"></Column>
              <Column field="accountNumber" header="Account number"></Column>
              <Column field="accountBalance" header="Balance"></Column>
            </DataTable>
          </div>
        </div>
      </div>
    </div>
  );
}
