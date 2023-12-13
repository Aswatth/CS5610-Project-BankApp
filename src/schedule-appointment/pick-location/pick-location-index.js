import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { InputText } from "primereact/inputtext";
import { Tag } from "primereact/tag";
import { useEffect, useState } from "react";

import * as mapClient from "../../clients/map-client";
import { getNearestBranches } from "../../clients/admin-client";
import Map from "./map-index";

import * as bookAppointmentReducer from "../../reducers/book-appointment-reducer";
import { getBranches } from "../../clients/admin-client";
import { useDispatch } from "react-redux";

export default function PickLocation() {
  const dispatch = useDispatch();
  const [branchList, setBranchList] = useState([]);

  const [selectedBranch, updateSelectedLocation] = useState();
  const [currentLocation, setCurrentLocation] = useState("");

  function calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 3958.8; // Radius of the Earth in miles
    const dLat = toRadians(lat2 - lat1);
    const dLon = toRadians(lon2 - lon1);

    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRadians(lat1)) *
        Math.cos(toRadians(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    const distance = R * c; // Distance in miles

    return distance;
  }

  function toRadians(degrees) {
    return (degrees * Math.PI) / 180;
  }

  function getBranches(latitude, longitude) {
    getNearestBranches(latitude, longitude).then((response) => {
      setBranchList(
        response.data.map((m) => {
          return {
            ...m,
            isSelected: false,
            distance: calculateDistance(
              latitude,
              longitude,
              m.latitude,
              m.longitude
            ),
          };
        })
      );
    });
  }

  const content = () => {
    if (branchList.length > 0) {
      return (
        <div>
          <DataTable
            value={branchList}
            showGridlines
            scrollable
            scrollHeight="350px"
            className="mb-0"
          >
            <Column field="branch" header="Branch"></Column>
            <Column field="address" header="Address"></Column>
            <Column
              field="distance"
              header="Distance"
              body={(row) => {
                return <div>{Math.round(row.distance * 100) / 100}</div>;
              }}
            ></Column>
            <Column body={selectTemplate}></Column>
          </DataTable>
          {/* <div className="flex-fill d-flex justify-content-center align-items-center">
            <Map
              lat={selectedBranch.latitude}
              lon={selectedBranch.longitude}
            ></Map>
          </div> */}
        </div>
      );
    } else {
      return <div></div>;
    }
  };

  useEffect(() => {
    // navigator.geolocation.getCurrentPosition((position) => {
    //   //if permission granted
    //   setLatitude(position.coords.latitude);
    //   setLongitude(position.coords.longitude);
    // });
    // getNearestBranches();
  }, []);

  const selectTemplate = (rowData) => {
    if (selectedBranch && rowData.branch === selectedBranch.branch) {
      return <Tag value="Selected" severity="success"></Tag>;
    }
    if (!rowData.isSelected) {
      return (
        <Button
          label="Select"
          className="color-1 border rounded"
          onClick={() => {
            updateSelectedLocation({ ...rowData, isSelected: true });
            dispatch(bookAppointmentReducer.setBranch(rowData.branch));
          }}
        ></Button>
      );
    }
  };

  return (
    <div className="d-flex">
      <div className="flex-fill">
        <div className="p-inputgroup mb-3">
          <label htmlFor="current-location" className="mt-2 me-2">
            Enter ZIP code or city and state:
          </label>
          <InputText
            value={currentLocation}
            onChange={(e) => setCurrentLocation(e.target.value)}
            placeholder="Your location"
            id="current-location"
          />
          <Button
            icon="pi pi-search"
            className="color-1 border"
            onClick={() => {
              mapClient.LocationToCoord(currentLocation).then((data) => {
                // setLatitude(data.lat);
                // setLongitude(data.lon);
                getBranches(data.lat, data.lon);
              });
            }}
          />
        </div>

        <div>{content()}</div>
      </div>
    </div>
  );
}
