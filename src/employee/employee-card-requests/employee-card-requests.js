import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import { DataTable } from "primereact/datatable";
import { Tag } from "primereact/tag";
import { useState } from "react";

export default function EmployeeCardRequests() {
  const cardRequestList = [
    {
      id: 1,
      type: "Credit card",
      name: "Plantinum",
      requestedOn: "26-Dec-2023",
      stauts: "Pending",
    },
    {
      id: 2,
      type: "Debit card",
      name: "Debit card",
      requestedOn: "28-Dec-2023",
      stauts: "Approved",
    },
    {
      id: 3,
      type: "Credit card",
      name: "Gold",
      requestedOn: "28-Dec-2023",
      stauts: "Rejected",
    },
  ];

  const [selectedRequest, setSelectedRequest] = useState();
  const [requestList, setRequestList] = useState(cardRequestList);

  const handleApproveRejectClick = (id, isApproved) => {
    console.log(isApproved);
    let requestIndex = cardRequestList.findIndex((f) => f.id == id);
    cardRequestList[requestIndex].stauts = isApproved ? "Approved" : "Rejected";
    setRequestList(cardRequestList);
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
    const content = row.stauts;
    switch (content) {
      case "Pending":
        if (selectedRequest && selectedRequest.id == row.id) {
          return (
            <div>
              <Button
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
              ></Button>
            </div>
          );
        } else {
          return <Tag severity="warning">{content}</Tag>;
        }

      case "Approved":
        return <Tag severity="success">{content}</Tag>;
      case "Rejected":
        return <Tag severity="danger">{content}</Tag>;
    }
  };

  return (
    <div>
      <ConfirmDialog />
      <DataTable
        value={requestList}
        selectionMode="single"
        selection={selectedRequest}
        onSelectionChange={(e) => setSelectedRequest(e.value)}
      >
        <Column field="type" header="Card type"></Column>
        <Column field="name" header="Name"></Column>
        <Column field="requestedOn" header="Requested On"></Column>
        <Column field="status" header="Status" body={statusTemplate}></Column>
      </DataTable>
    </div>
  );
}
