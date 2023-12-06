import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";

export default function CustomerTransactions() {
  const transactionList = [
    {
      transactionType: "CREDIT",
      to: "1111111111",
      from: {
        name: "Checkings",
        number: "1234567890",
      },
      amount: "100",
    },
    {
      transactionType: "DEBIT",
      to: "1111111111",
      from: {
        name: "Checkings",
        number: "1234567890",
      },
      amount: "50",
    },
    {
      transactionType: "DEBIT",
      to: "2222222222",
      from: {
        name: "Savings",
        number: "0987654321",
      },
      amount: "50",
    },
    {
      transactionType: "CREDIT",
      to: "2222222222",
      from: {
        name: "Savings",
        number: "0987654321",
      },
      amount: "500",
    },
  ];

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
