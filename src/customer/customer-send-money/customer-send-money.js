import { Button } from "primereact/button";
import { InputNumber } from "primereact/inputnumber";
import { useState } from "react";

export default function CustomerSendMoney() {
  const [selectedAccount, setSelectedAccount] = useState();

  const accounts = [
    {
      name: "Checkings",
      number: "1234567890",
    },
    {
      name: "Savings",
      number: "0987654321",
    },
  ];
  return (
    <div className="d-flex flex-column">
      <div className="flex-fill">
        <select
          className="form-select"
          onChange={(s) => {
            console.log(accounts.filter((f) => f.name == s.target.value)[0]);
            setSelectedAccount(
              accounts.filter((f) => f.name == s.target.value)[0]
            );
          }}
        >
          {accounts.map((m) => {
            return <option value={m.name}>{m.name}</option>;
          })}
        </select>
        <input
          className="form-control"
          // placeholder={selectedAccount ? selectedAccount.number : null}
          value={selectedAccount ? selectedAccount.number : null}
          disabled
        ></input>
        <input
          className="form-control"
          placeholder="Receiving account number"
        ></input>
        <InputNumber className="form-control" />
        <Button label="Send" icon="pi pi-send" className="color-2"></Button>
      </div>
    </div>
  );
}
