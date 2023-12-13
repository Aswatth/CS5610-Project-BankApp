import React, { useRef, useEffect, useState } from "react";
import * as maptilersdk from "@maptiler/sdk";
import "@maptiler/sdk/dist/maptiler-sdk.css";
import "./map.css";
import { getBranches } from "../../clients/admin-client";

export default function Map({ lat = null, lon = null, branchList = [] }) {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [zoom] = useState(14);
  maptilersdk.config.apiKey = process.env.REACT_APP_MAP_API_KEY;

  useEffect(() => {
    let bankBranches = [];
    let isMapSet = false;

    getBranches().then((response) => {
      response.data.map((branch) => {
        if (!isMapSet) {
          map.current = new maptilersdk.Map({
            container: mapContainer.current,
            style: maptilersdk.MapStyle.STREETS,
            center: [branch.longitude, branch.latitude],
            zoom: zoom,
          });
          isMapSet = true;
        }

        //Current location marker
        if (lat != null && lon != null) {
          new maptilersdk.Marker({ color: "#FF0000" })
            .setLngLat([lon, lat])
            .addTo(map.current);
        }

        //bank branches marker
        new maptilersdk.Marker({ color: "#0000FF" })
          .setLngLat([branch.longitude, branch.latitude])
          .addTo(map.current);
      });
    });

    // if (map.current) return; // stops map from intializing more than once
  }, []);

  return (
    <div className="map-wrap">
      <div ref={mapContainer} className="map" />
    </div>
  );
}
