import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";
import { InputNumber } from "primereact/inputnumber";
import { InputText } from "primereact/inputtext";
import { useRef, useState } from "react";
import * as customerClient from "../../../clients/customer-client";
import { useNavigate } from "react-router";
import { Toast } from "primereact/toast";

export default function CustomerNewCardRequest() {
  const toast = useRef(null);
  const navigate = useNavigate();
  const creditCardTypes = ["Platinum", "Gold", "Silver"];
  const [cardRequestData, updateCardRequestData] = useState({
    cardType: "credit",
    cardNetwork: "VISA",
  });

  return (
    <div className="d-flex flex-column">
      <Toast ref={toast} />
      <label htmlFor="cardType">Card type:</label>
      <InputText id="cardType" value="Credit card" disabled />
      <label htmlFor="cardNetwork">Card type:</label>
      <InputText id="cardNetwork" value="VISA" disabled />
      <label htmlFor="cardName">Card name:</label>
      <Dropdown
        id="cardName"
        options={creditCardTypes}
        value={cardRequestData ? cardRequestData.cardName : null}
        onChange={(c) => {
          updateCardRequestData({ ...cardRequestData, cardName: c.value });
        }}
      />

      <label htmlFor="cardType">Card type:</label>
      <div className="p-inputgroup flex-1">
        <span className="p-inputgroup-addon">
          <i className="pi pi-dollar"></i>
        </span>
        <InputNumber
          id="cardType"
          placeholder="Card limit"
          onValueChange={(c) =>
            updateCardRequestData({ ...cardRequestData, cardLimit: c.value })
          }
        />
      </div>
      <Button
        label="Raise request"
        className="mt-2 color-2 border rounded"
        onClick={() => {
          customerClient
            .newCreditCardRequest(cardRequestData)
            .then((resposne) => {
              if (resposne.status == 200 || resposne.status == 201) {
                navigate(0);
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
