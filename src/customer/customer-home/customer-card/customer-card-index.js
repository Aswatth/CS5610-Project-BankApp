import { Card } from "primereact/card";
import "./customer-card-index.css";

export default function CustomerCard({ cardWidth, cardHeight, cardData }) {
  const cardFrontContent = () => {
    return (
      <div
        className="customer-card-background p-3 flex-fill d-flex flex-column"
        style={{ width: cardWidth, height: cardHeight }}
      >
        {/* Chip and Brand name */}
        <div className="d-flex flex-fill">
          <div className="d-flex justify-content-start flex-fill fs-4">
            <div className="customer-card-chip"></div>
            <i className="fw-bold">{cardData.cardNetwork}</i>
          </div>
          <div className="d-flex justify-content-end flex-fill fs-6">
            <i className="fw-semibold">{cardData.cardName}</i>
          </div>
        </div>
        {/* Card number */}
        <div className="d-flex justify-content-center flex-fill">
          <div className="flex-fill d-flex justify-content-center fs-4">
            ****
          </div>
          <div className="flex-fill d-flex justify-content-center fs-4">
            ****
          </div>
          <div className="flex-fill d-flex justify-content-center fs-4">
            ****
          </div>
          <div className="flex-fill d-flex justify-content-center fs-4">
            {cardData.cardNumber.slice(-4)}
          </div>
        </div>
        {/* Card holder and expiry info */}
        <div className="d-flex flex-fill">
          <div className="d-flex flex-fill justify-content-start">
            <div className="d-flex flex-column">
              <div>CARD HOLDER</div>
              <div className="fw-semibold">{cardData.cardHolderName}</div>
            </div>
          </div>
          <div className="d-flex flex-fill justify-content-end">
            <div className="d-flex flex-column">
              <div>EXPIRES</div>
              <div className="fw-semibold">{cardData.cardExpiry}</div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const cardBackContent = () => {
    return (
      <div className="d-flex flex-column justify-content-center">
        {/* Black magnetic label */}
        <div
          className="flex-fill mt-3"
          style={{ width: "100%", height: "40px", backgroundColor: "black" }}
        ></div>
        {/* CVV */}
        <div className="flex-fill d-flex justify-content-center mt-3">
          <div
            className="customer-card-back-label"
            style={{ width: "90%", backgroundColor: "white", height: "40px" }}
          >
            <div
              style={{ color: "black" }}
              className="flex-fill d-flex justify-content-end fw-bold"
            >
              {cardData.cardCvv}
            </div>
          </div>
        </div>
        {/* Chip and Brand name */}
        <div className="d-flex flex-fill p-3 mt-3">
          <div className="d-flex justiy-content-start flex-fill">
            <div className="customer-card-chip"></div>
          </div>
          <div className="d-flex justify-content-end flex-fill fs-4">
            <i className="fw-bold">{cardData.cardNetwork}</i>
          </div>
        </div>
      </div>
    );
  };
  return (
    <div>
      <div
        class="customer-card-container"
        style={{ width: cardWidth, height: cardHeight }}
      >
        <div class="customer-card">
          <div
            class="customer-card-front"
            style={{
              backgroundImage: `var(--${cardData.cardType.toLowerCase()}-card-front)`,
              color: `var(--${cardData.cardType.toLowerCase()}-card-text)`,
            }}
          >
            {cardFrontContent()}
          </div>
          <div
            class="customer-card-back"
            style={{
              backgroundImage: `var(--${cardData.cardType.toLowerCase()}-card-back)`,
              color: `var(--${cardData.cardType.toLowerCase()}-card-text)`,
            }}
          >
            {cardBackContent()}
          </div>
        </div>
      </div>
    </div>
  );
}
