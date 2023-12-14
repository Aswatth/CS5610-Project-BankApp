import { useEffect, useState } from "react";
import { getBranches } from "../clients/admin-client";
import { DataTable } from "primereact/datatable";
import { Column } from "jspdf-autotable";
import { Card } from "primereact/card";
import { Button } from "primereact/button";
import { useNavigate } from "react-router";

export default function Branches() {
  const navigate = useNavigate();
  const [branchList, setBranchList] = useState([]);
  useEffect(() => {
    getBranches()
      .then((resposne) => {
        setBranchList(resposne.data);
      })
      .catch(() => {});
  }, []);

  return (
    <div className="vh-100 color-1 p-3">
      <Card className="mb-3">
        <div className="d-flex justify-content-start">
          <Button
            icon="pi pi-angle-left"
            className="color-2 border rounded"
            onClick={() => {
              navigate("/home");
            }}
          ></Button>
          <h3 className="flex-fill ms-3">Our branches</h3>
        </div>
      </Card>
      <DataTable value={branchList} scrollHeight="500px" scrollable>
        <Column field="branch" header="Branch"></Column>
        <Column field="address" header="Address"></Column>
      </DataTable>
    </div>
  );
}
