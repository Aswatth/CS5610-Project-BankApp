import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { Dialog } from "primereact/dialog";
import { Tag } from "primereact/tag";
import { useEffect, useState } from "react";
import CustomerNewCardRequest from "./customer-new-card-request/customer-new-card-request";
import * as customerClient from "../../clients/customer-client";
import { useNavigate } from "react-router";

export default function CustomerCardRequests() {
  const navigate = useNavigate();

  const [cardRequests, setCardRequests] = useState([]);

  useEffect(() => {
    customerClient.viewCardRequests().then((response) => {
      if (!customerClient.isCustomer()) {
        navigate("/login");
        return;
      }
      if (response.status == 200 || response.status == 201) {
        console.log(response.data);
        setCardRequests(response.data);
      }
    });
  }, []);

  const [cardRequestVisibility, updateCardRequestVisibility] = useState(false);

  const approvalTemplate = (rowData) => {
    switch (rowData.status) {
      case "approved":
        return <Tag severity="success">Approved</Tag>;
      case "pending":
        return <Tag severity="warning">Pending approval</Tag>;
      case "rejected":
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
        <Column field="cardLimit" header="Limit"></Column>
        <Column
          field="status"
          header="Approval status"
          body={approvalTemplate}
        ></Column>
      </DataTable>
    </div>
  );
}
