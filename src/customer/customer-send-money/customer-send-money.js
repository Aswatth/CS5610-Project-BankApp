import { Button } from "primereact/button";
import { Calendar } from "primereact/calendar";
import { Dropdown } from "primereact/dropdown";
import { InputNumber } from "primereact/inputnumber";
import { InputText } from "primereact/inputtext";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import * as customerClient from "../../clients/customer-client";
import { useNavigate } from "react-router";

export default function CustomerSendMoney() {
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
      <Dropdown
        className="flex-fill"
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
        className="form-control"
        placeholder={selectedAccount ? selectedAccount.accountNumber : null}
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
        onChange={(c) =>
          setTransferDetails({
            ...transferDetails,
            receiverAccount: c.target.value,
          })
        }
      />
      <div className="p-inputgroup flex-1">
        <span className="p-inputgroup-addon">
          <i className="pi pi-dollar"></i>
        </span>
        <InputNumber
          placeholder="Amount to transfer"
          onValueChange={(c) =>
            setTransferDetails({ ...transferDetails, amount: c.value })
          }
        />
      </div>
      <InputText
        placeholder="Message"
        onChange={(c) =>
          setTransferDetails({
            ...transferDetails,
            message: c.target.value,
          })
        }
      />
      <Calendar disabled value={new Date()} />
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
          // customerClient.sendMoney(transferDetails).then((resposne) => {
          //   if (resposne.status == 200) {
          //     navigate("/customer/home");
          //   }
          // });
        }}
      ></Button>
    </div>
  );
}
