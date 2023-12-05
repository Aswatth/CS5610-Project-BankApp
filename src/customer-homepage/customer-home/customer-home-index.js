import { Card } from "primereact/card";
import "./customer-home-index.css";
import CustomerCard from "./customer-card/customer-card-index";
import { Button } from "primereact/button";
import { Carousel } from "primereact/carousel";
import { useState } from "react";

export default function CustomerHome() {
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

  const cardTemplate = (cardData) => {
    return (
      <CustomerCard cardWidth={300} cardHeight={200} cardData={cardData} />
    );
  };

  return (
    <div className="d-flex flex-column justify-content-evenly">
      <div className="flex-fill d-flex mb-1">
        <div className="card-transactions-section me-1">
          <div className="border rounded p-3">
            <h2>Cards:</h2>
            <div className="d-flex justify-content-evenly">
              <div className="d-flex flex-fill">
                {/* <Card>
                  <Carousel
                    value={cardList}
                    numVisible={1}
                    numScroll={1}
                    itemTemplate={cardTemplate}
                    circular
                  />
                </Card> */}
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
                  <Button label="Card settings" icon="pi pi-cog"></Button>
                  <div className="d-flex">
                    <Button
                      label="Apply debit card"
                      icon="pi pi-cog"
                      className="flex-fill"
                    ></Button>
                    <Button
                      label="Apply credit card"
                      icon="pi pi-cog"
                      className="flex-fill"
                    ></Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="expenses-balance-section color-4 ms-1">a</div>
      </div>
      <div className="flex-fill d-flex mt-1">
        <div className="card-transactions-section color-3 me-1"></div>
        <div className="expenses-balance-section color-4 ms-1">a</div>
      </div>
    </div>
  );
}
