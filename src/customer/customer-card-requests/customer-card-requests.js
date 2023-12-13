import { click } from "@testing-library/user-event/dist/click";
import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { Dialog } from "primereact/dialog";
import { Tag } from "primereact/tag";
import { useEffect, useState } from "react";
import CustomerNewCardRequest from "./customer-new-card-request/customer-new-card-request";
import * as customerClient from "../../clients/customer-client";

export default function CustomerCardRequests() {
  // const cardRequests = [
  //   {
  //     cardName: "Platinum",
  //     requestedOn: "5-Dec-2023",
  //     isApproved: -1,
  //     reason: "Does not meet the required criteria.",
  //   },
  //   {
  //     cardName: "Gold",
  //     requestedOn: "2-Nov-2023",
  //     isApproved: 0,
  //     reason: "",
  //   },
  //   {
  //     cardName: "Gold",
  //     requestedOn: "2-Nov-2023",
  //     isApproved: 1,
  //     reason: "",
  //   },
  // ];

  const [cardRequests, setCardRequests] = useState([]);

  useEffect(() => {
    customerClient.viewCardRequests().then((resposne) => {
      if (resposne.status == 200 || resposne.status == 201) {
        setCardRequests(resposne.data);
      }
    });
  }, [cardRequests]);

  const [cardRequestVisibility, updateCardRequestVisibility] = useState(false);

  const approvalTemplate = (rowData) => {
    switch (rowData.isApproved) {
      case 1:
        return <Tag severity="success">Approved</Tag>;
      case 0:
        return <Tag severity="warning">Pending approval</Tag>;
      case -1:
        return (
          <div>
            <Tag severity="danger">Rejected</Tag>
            {/* <div className="d-block">
              <i className="pi pi-info-circle me-2"></i>
              <i className="fw-light">{rowData.reason}</i>
            </div> */}
          </div>
        );
    }
  };

  return (
    <div>
      <div className="d-flex justify-content-end mb-2">
        <Button
          label="New card request"
          icon="pi pi-plus"
          className="color-2 border rounded"
          onClick={() => {
            updateCardRequestVisibility(true);
            // console.log("Clikking");
          }}
        ></Button>
        <Dialog
          header="New credit card request"
          visible={cardRequestVisibility}
          onHide={() => updateCardRequestVisibility(!cardRequestVisibility)}
        >
          <CustomerNewCardRequest />
        </Dialog>
      </div>
      <DataTable value={cardRequests}>
        <Column field="cardName" header="Card name"></Column>
        <Column field="requestedOn" header="Requested on"></Column>
        <Column
          field="isApproved"
          header="Approval status"
          body={approvalTemplate}
        ></Column>
      </DataTable>
    </div>
  );
}
