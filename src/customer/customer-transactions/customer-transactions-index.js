import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { useEffect, useState } from "react";
import * as customerClient from "../../clients/customer-client";
import { useNavigate } from "react-router";

export default function CustomerTransactions() {
  const navigate = useNavigate();
  const [transactionList, setTransactionList] = useState([]);

  useEffect(() => {
    customerClient.getTransactions().then((response) => {
      if (!customerClient.isCustomer()) {
        navigate("/login");
        return;
      }
      if (response.status == 200 || response.status == 201) {
        setTransactionList(response.data);
      }
    });
  }, [transactionList]);

  const generatePDF = () => {
    import("jspdf").then((jsPDF) => {
      import("jspdf-autotable").then(() => {
        const doc = new jsPDF.default(0, 0);

        const exportColumns = [
          { title: "Transaction type", dataKey: "transactionType" },
          { title: "Receiver account", dataKey: "to" },
          { title: "Account name", dataKey: "from[name]" },
          {
            title: "Account number",
            dataKey: "number",
          },
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
      <DataTable value={transactionList}>
        <Column field="transactionType" header="Transaction type"></Column>
        <Column field="from.name" header="Account name"></Column>
        <Column field="from.number" header="Account number"></Column>
        <Column field="to" header="Receiving account number"></Column>
        <Column field="amount" header="Amount"></Column>
      </DataTable>
    </div>
  );
}
