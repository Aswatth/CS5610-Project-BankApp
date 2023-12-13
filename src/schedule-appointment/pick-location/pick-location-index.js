import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { InputText } from "primereact/inputtext";
import { Tag } from "primereact/tag";
import { useEffect, useState } from "react";

import * as mapClient from "../../clients/map-client";
import Map from "./map-index";

import * as bookAppointmentReducer from "../../reducers/book-appointment-reducer";

export default function PickLocation() {
  const locations = [
    {
      location: "A1",
      distance: 0.1,
      hours: "Mon-Fri 10AM-4PM",
      selected: false,
    },
    {
      location: "A2",
      distance: 0.2,
      hours: "Mon-Fri 10AM-4PM",
      selected: false,
    },
    {
      location: "A3",
      distance: 0.3,
      hours: "Mon-Fri 10AM-4PM",
      selected: false,
    },
    {
      location: "A4",
      distance: 0.4,
      hours: "Mon-Fri 10AM-4PM",
      selected: false,
    },
    {
      location: "A5",
      distance: 0.5,
      hours: "Mon-Fri 10AM-4PM",
      selected: false,
    },
  ];

  const [selectedLocation, updateSelectedLocation] = useState();
  const [currentLocation, setCurrentLocation] = useState("");

  const [latitude, setLatitude] = useState();
  const [longitude, setLongitude] = useState();

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      //if permission granted
      setLatitude(position.coords.latitude);
      setLongitude(position.coords.longitude);
    });
  });

  const selectTemplate = (rowData) => {
    if (selectedLocation && rowData.location === selectedLocation.location) {
      return <Tag value="Selected" severity="success"></Tag>;
    }
    if (!rowData.selected) {
      return (
        <Button
          label="Select"
          className="color-1 border rounded"
          onClick={() => {
            bookAppointmentReducer.setBranch(rowData.location);
            updateSelectedLocation({ ...rowData, selected: true });
          }}
        ></Button>
      );
    }
  };

  const searchNearestBranches = () => {
    // console.log(currentLocation);
    // console.log("Nearest branches");
    mapClient.LocationToCoord(currentLocation).then((data) => {
      setLatitude(data.lat);
      setLongitude(data.lon);
    });
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
            onClick={searchNearestBranches}
          />
        </div>
        <DataTable
          value={locations}
          showGridlines
          scrollable
          scrollHeight="350px"
          className="mb-0"
        >
          <Column field="location" header="Location"></Column>
          <Column field="distance" header="Distance"></Column>
          <Column field="hours" header="Hours"></Column>
          <Column body={selectTemplate}></Column>
        </DataTable>
      </div>
      <div className="flex-fill d-flex justify-content-center align-items-center">
        <Map lat={latitude} lon={longitude}></Map>
      </div>
    </div>
  );
}
