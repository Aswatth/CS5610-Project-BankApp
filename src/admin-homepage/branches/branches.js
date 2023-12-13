import { useEffect, useState } from "react";
import { getBranches, addBranch } from "../../clients/admin-client";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import * as mapClient from "../../clients/map-client";
import { useNavigate } from "react-router";
import { InputText } from "primereact/inputtext";

export default function Branches() {
  const navigate = useNavigate();
  const [branchList, setBranchList] = useState([]);
  const [addBranchVisibility, setAddBranchVisibility] = useState(false);

  const [branchToAdd, setBranchToAdd] = useState({
    branch: "",
    address1: "",
    address2: "",
    city: "",
    state: "",
    zip: "",
  });

  useEffect(() => {
    getBranches().then((resposne) => {
      if (resposne == null || resposne.status == 401) {
        navigate("/login");
        return;
      }
      setBranchList(resposne.data);
    });
  }, []);

  return (
    <div>
      <div className="d-flex mb-3">
        <div className="flex-fill d-flex justify-content-start">
          <h3>Branches</h3>
        </div>
        <div className="flex-fill d-flex justify-content-end">
          <Button
            label="Add branch"
            icon="pi pi-plus"
            className="color-2 border rounded"
            onClick={() => setAddBranchVisibility(true)}
          ></Button>
        </div>
      </div>
      <Dialog
        visible={addBranchVisibility}
        onHide={() => setAddBranchVisibility(false)}
        header="Add new branch"
      >
        <div>
          <label htmlFor="branchName" className="form-label">
            Branch name
          </label>
          <input
            type="text"
            id="branchName"
            className="form-control"
            onChange={(c) =>
              setBranchToAdd({ ...branchToAdd, branch: c.target.value })
            }
          />
        </div>
        <div className="p-inputgroup mt-3">
          <span className="p-inputgroup-addon">
            <i className="pi pi-building"></i>
          </span>
          <div className="d-flex flex-column">
            <div className="d-flex">
              <InputText
                placeholder="Address line 1"
                onChange={(c) =>
                  setBranchToAdd({ ...branchToAdd, address1: c.target.value })
                }
              />
              <InputText
                placeholder="Address line 2"
                onChange={(c) =>
                  setBranchToAdd({ ...branchToAdd, address2: c.target.value })
                }
              />
            </div>
            <div className="d-flex">
              <InputText
                placeholder="City"
                onChange={(c) =>
                  setBranchToAdd({ ...branchToAdd, city: c.target.value })
                }
              />
              <InputText
                placeholder="State"
                onChange={(c) =>
                  setBranchToAdd({ ...branchToAdd, state: c.target.value })
                }
              />
              <InputText
                placeholder="Zip code"
                onChange={(c) =>
                  setBranchToAdd({ ...branchToAdd, zip: c.target.value })
                }
              />
            </div>
          </div>
        </div>
        <div className="d-flex justify-content-evenly mt-3">
          <Button
            label="Cancel"
            severity="danger"
            className="border rounded d-flex"
            onClick={() => setAddBranchVisibility(false)}
          ></Button>
          <Button
            label="Add"
            severity="success"
            className="border rounded"
            onClick={() => {
              {
                let address =
                  branchToAdd.address1 +
                  ", " +
                  branchToAdd.address2 +
                  ", " +
                  branchToAdd.city +
                  ", " +
                  branchToAdd.state +
                  ", " +
                  branchToAdd.zip;
                mapClient.LocationToCoord(address).then((data) => {
                  addBranch({
                    branch: branchToAdd.branch,
                    address: address,
                    latitude: +data.lat,
                    longitude: +data.lon,
                  }).then((response) => {
                    if (response == null || response.status == 401) {
                      navigate("/login");
                    } else if (response.status == 200) {
                      getBranches().then((resposne) => {
                        setBranchList(resposne.data);

                        setAddBranchVisibility(false);
                      });
                    }
                  });
                });
              }
            }}
          ></Button>
        </div>
      </Dialog>
      <DataTable value={branchList}>
        <Column field="branch" header="Branch"></Column>
        <Column field="address" header="Address"></Column>
      </DataTable>
    </div>
  );
}
