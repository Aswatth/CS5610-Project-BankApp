import { useState } from "react";

export default function CustomerNewCardRequest() {
  const creditCardTypes = ["Platinum", "Gold", "Silver"];
  const cardTypes = ["Credit", "Debit"];
  const [selectedCardType, updateSelectedCardType] = useState();

  return (
    <div>
      <div>
        <label htmlFor="cardType">Card type:</label>
        <select
          id="cardType"
          className="form-select"
          onChange={(s) => {
            console.log(s.target.value);
            updateSelectedCardType(s.target.value);
          }}
        >
          {cardTypes.map((m) => {
            return <option value={m}>{m}</option>;
          })}
        </select>
      </div>
      <div>
        {selectedCardType == "Credit" ? (
          <div>
            <label htmlFor="cardCategory">Select a card:</label>
            <select
              id="cardCategory"
              className="form-select"
              onChange={(s) => {
                //   console.log(accounts.filter((f) => f.name == s.target.value));
                // updateSelectedCardType(s.target.value);
              }}
            >
              {creditCardTypes.map((m) => {
                return <option value={m}>{m}</option>;
              })}
            </select>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}
