import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import { DataTable } from "primereact/datatable";
import { Tag } from "primereact/tag";
import { useEffect, useState } from "react";
import * as employeeClient from "../../clients/employee-client";
import { useNavigate } from "react-router";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";

export default function EmployeeCardRequests() {
  const navigate = useNavigate();
  const [cardRequestList, setCardList] = useState([]);

  const [selectedRequest, setSelectedRequest] = useState({
    cardName: "",
    cardType: "",
    cardLimit: 0,
  });
  const [approveOrRejectData, setApproveOrRejectData] = useState({
    reason: "",
  });
  const [dialogVisibility, setDialogVisibility] = useState(false);

  useEffect(() => {
    employeeClient.viewCardRequests().then((response) => {
      if (!employeeClient.isEmployee()) {
        navigate("/login");
        return;
      }
      if (response.status == 200) {
        console.log(response.data);
        setCardList(response.data);
      }
    });
  }, []);

  const handleApproveRejectClick = (id, isApproved) => {
    if (isApproved) {
      employeeClient.approveOrRejectCardRequest({
        cardRequestId: selectedRequest.cardRequestId,
        decision: "",
      });
    }
  };

  const confirm = (id, isApproved) => {
    confirmDialog({
      message: `Do you want to ${
        isApproved ? "approve" : "reject"
      } this request?`,
      header: "Confirmation",
      icon: "pi pi-info-circle",
      // position,
      accept() {
        handleApproveRejectClick(id, isApproved);
      },
      //   reject() {
      //     // handleApproveRejectClick(id, false);
      //   },
    });
  };

  const statusTemplate = (row) => {
    const content = row.status;
    switch (content) {
      case "pending":
        if (
          selectedRequest &&
          selectedRequest.cardRequestId == row.cardRequestId
        ) {
          return (
            <div>
              {/* <Button
                label="Approve"
                severity="success"
                className="border rounded p-2"
                onClick={() => confirm(row.id, true)}
              ></Button>
              <Button
                label="Reject"
                severity="danger"
                className="border rounded p-2"
                onClick={() => confirm(row.id, false)}
              ></Button> */}
              <Button
                label="Take action"
                severity="info"
                className="border rounded p-2"
                onClick={() => setDialogVisibility(true)}
              ></Button>
            </div>
          );
        } else {
          return <Tag severity="warning">{content}</Tag>;
        }

      case "approved":
        return <Tag severity="success">{content}</Tag>;
      case "rejected":
        return <Tag severity="danger">{content}</Tag>;
    }
  };

  return (
    <div>
      <Dialog
        visible={dialogVisibility}
        onHide={() => setDialogVisibility(false)}
        header="Approve or reject request"
      >
        <div className="d-flex flex-column">
          <label>Card type:</label>
          <InputText value={selectedRequest.cardType.toUpperCase()} disabled />
          <label>Card name:</label>
          <InputText value={selectedRequest.cardName.toUpperCase()} disabled />
          <label>Card limit:</label>
          <InputText value={selectedRequest.cardLimit} disabled />
          <label>Reason for approval/reject:</label>
          <InputText
            // value={selectedRequest.cardLimit}
            onChange={(c) =>
              setApproveOrRejectData({
                ...approveOrRejectData,
                reason: c.target.value,
              })
            }
          />
          <div className="d-flex justify-content-evenly mt-2">
            <Button
              label="Reject"
              severity="danger"
              className="border rounded"
              onClick={() => {
                setApproveOrRejectData({
                  ...approveOrRejectData,
                  decision: "approved",
                  cardRequestId: selectedRequest.cardRequestId,
                });
              }}
            />
            <Button
              label="Approve"
              severity="success"
              className="border rounded"
              onClick={() => {
                let data = {
                  ...approveOrRejectData,
                  decision: "approved",
                  cardRequestId: selectedRequest.cardRequestId,
                };
                setApproveOrRejectData(data);
                employeeClient
                  .approveOrRejectCardRequest(data)
                  .then((response) => {
                    if (response.status == 200 || response.data == 201) {
                      navigate(0);
                    }
                  });
              }}
            />
          </div>
        </div>
      </Dialog>
      <DataTable
        value={cardRequestList}
        selectionMode="single"
        selection={selectedRequest}
        onSelectionChange={(e) => {
          console.log(e.value);
          setSelectedRequest(e.value);
        }}
      >
        <Column
          field="cardType"
          header="Card type"
          body={(row) => {
            return <div>{row.cardType.toUpperCase()}</div>;
          }}
        ></Column>
        <Column field="cardName" header="Name"></Column>
        <Column field="cardLimit" header="Card limit"></Column>
        <Column field="status" header="Status" body={statusTemplate}></Column>
      </DataTable>
    </div>
  );
}
