import { Button } from "primereact/button";
import { Calendar } from "primereact/calendar";
import { Dropdown } from "primereact/dropdown";
import { InputNumber } from "primereact/inputnumber";
import { InputText } from "primereact/inputtext";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import * as customerClient from "../../clients/customer-client";
import { useNavigate } from "react-router";
import { Toast } from "primereact/toast";

export default function CustomerSendMoney() {
  const toast = useRef(null);
  const navigate = useNavigate();
  const [selectedAccount, setSelectedAccount] = useState();

  const accountList = useSelector((state) => state.customerReducer.accountList);

  const [transferDetails, setTransferDetails] = useState({});

  useEffect(() => {
    console.log(customerClient.isCustomer());
    if (!customerClient.isCustomer()) {
      navigate("/login");
      return;
    }
  }, []);
  return (
    <div className="d-flex flex-column">
      <Toast ref={toast} />
      <Dropdown
        className="flex-fill mb-2"
        options={accountList.map((m) => m.accountType)}
        value={selectedAccount ? selectedAccount.accountType : null}
        onChange={(c) => {
          console.log(c.target.value);
          setSelectedAccount(
            accountList.find((f) => f.accountType == c.target.value)
          );
        }}
      ></Dropdown>
      <InputText
        className="form-control mb-2"
        placeholder={
          selectedAccount ? selectedAccount.accountNumber : "Account number"
        }
        // value={
        //   selectedAccount
        //     ? selectedAccount.accountNumber
        //     : accountList[0].accountNumber
        // }
        disabled
      ></InputText>
      <InputText
        placeholder="Receiving account number"
        type="number"
        className="mb-2"
        onChange={(c) =>
          setTransferDetails({
            ...transferDetails,
            receiverAccount: c.target.value,
          })
        }
      />
      <div className="p-inputgroup flex-1 mb-2">
        <span className="p-inputgroup-addon">
          <i className="pi pi-dollar"></i>
        </span>
        <InputNumber
          placeholder="Amount to transfer"
          onValueChange={(c) => {
            if (c.value >= 1) {
              setTransferDetails({ ...transferDetails, amount: c.value });
            } else {
              toast.current.show({
                severity: "error",
                summary: "Error",
                detail: `Amount should be greater than 1`,
                life: 3000,
              });
            }
          }}
        />
      </div>
      <InputText
        placeholder="Message"
        className="mb-2"
        onChange={(c) =>
          setTransferDetails({
            ...transferDetails,
            message: c.target.value,
          })
        }
      />
      <Calendar disabled value={new Date()} className="mb-2" />
      <Button
        label="Send"
        icon="pi pi-send"
        className="color-2"
        onClick={() => {
          setTransferDetails({
            ...transferDetails,
            senderAccount: selectedAccount.accountNumber,
          });
          let date = new Date();
          setTransferDetails({
            ...transferDetails,
            transactionDate:
              date.getFullYear() +
              "-" +
              (date.getMonth() + 1) +
              "-" +
              date.getDate(),
          });
          let details = {
            ...transferDetails,
            senderAccount: selectedAccount.accountNumber,
            transactionDate:
              date.getFullYear() +
              "-" +
              (date.getMonth() + 1) +
              "-" +
              date.getDate(),
          };
          customerClient
            .sendMoney(details)
            .then((response) => {
              if (response.status == 200 || response.status == 201) {
                navigate("/customer/view-transactions");
              }
            })
            .catch((response) => {
              toast.current.show({
                severity: "error",
                summary: "Error",
                detail: `${response.response.data.error}`,
                life: 3000,
              });
            });
        }}
      ></Button>
    </div>
  );
}
