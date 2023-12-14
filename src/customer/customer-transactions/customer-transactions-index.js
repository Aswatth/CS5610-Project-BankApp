import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { useEffect, useRef, useState } from "react";
import * as customerClient from "../../clients/customer-client";
import { useNavigate } from "react-router";
import { Tag } from "primereact/tag";
import { Toast } from "bootstrap";

export default function CustomerTransactions() {
  const toast = useRef(null);
  const navigate = useNavigate();
  const [transactionList, setTransactionList] = useState([]);

  const [accountList, setAccounts] = useState([]);

  useEffect(() => {
    customerClient
      .getTransactions()
      .then((response) => {
        if (!customerClient.isCustomer()) {
          navigate("/login");
          return;
        }
        if (response.status == 200 || response.status == 201) {
          setTransactionList(
            response.data.sort((a, b) => b.transactionId - a.transactionId)
          );

          customerClient.getAccounts().then((response) => {
            if (response.status == 200) {
              setAccounts(response.data);
            }
          });
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
  }, []);

  const amountTemplate = (row) => {
    if (accountList.find((f) => f.accountNumber == row.senderAccount)) {
      return <Tag severity="danger">- ${row.amount.toFixed(2)}</Tag>;
    } else {
      return <Tag severity="success">+ ${row.amount.toFixed(2)}</Tag>;
    }
  };
  const generatePDF = () => {
    import("jspdf").then((jsPDF) => {
      import("jspdf-autotable").then(() => {
        const doc = new jsPDF.default(0, 0);

        const exportColumns = [
          { title: "Date", dataKey: "transactionDate" },
          { title: "Sender account", dataKey: "senderAccount" },
          { title: "Receiver account", dataKey: "receiverAccount" },
          { title: "Amount", dataKey: "amount" },
        ];

        console.log(exportColumns);
        doc.autoTable(exportColumns, transactionList);
        doc.save("transactions.pdf");
      });
    });
  };

  return (
    <div>
      <Toast ref={toast} />
      <div className="d-flex mb-2">
        <div className="flex-fill d-flex justify-content-start">
          <h3>Transactions</h3>
        </div>
        <div className="flex-fill d-flex justify-content-end ">
          <Button
            icon="pi pi-file-pdf"
            severity="danger"
            className="border rounded"
            onClick={generatePDF}
          ></Button>
        </div>
      </div>
      <DataTable value={transactionList} scrollable scrollHeight="500px">
        <Column field="transactionDate" header="Date"></Column>
        <Column field="senderAccount" header="From"></Column>
        <Column field="receiverAccount" header="To"></Column>
        <Column field="amount" header="Amount" body={amountTemplate}></Column>
      </DataTable>
    </div>
  );
}
