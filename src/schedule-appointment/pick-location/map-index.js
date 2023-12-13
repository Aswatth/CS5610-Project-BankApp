import React, { useRef, useEffect, useState } from "react";
import * as maptilersdk from "@maptiler/sdk";
import "@maptiler/sdk/dist/maptiler-sdk.css";
import "./map.css";

export default function Map({ lat = null, lon = null }) {
  console.log(lat, lon);
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [zoom] = useState(14);
  maptilersdk.config.apiKey = process.env.REACT_APP_MAP_API_KEY;

  const bankBranches = [
    { lat: 42.34688795097765, lon: -71.08984695865922 },
    { lat: 42.36065680302789, lon: -71.06664821752987 },
  ];

  useEffect(() => {
    // if (map.current) return; // stops map from intializing more than once

    map.current = new maptilersdk.Map({
      container: mapContainer.current,
      style: maptilersdk.MapStyle.STREETS,
      center: [bankBranches[0].lon, bankBranches[0].lat],
      zoom: zoom,
    });

    //Current location marker
    if (lat != null && lon != null) {
      new maptilersdk.Marker({ color: "#FF0000" })
        .setLngLat([lon, lat])
        .addTo(map.current);
    }

    // bankBranches.push({ lat: lat, lon: lon });

    // console.log("Adding branches");
    //bank branches marker
    bankBranches.map((m) => {
      new maptilersdk.Marker({ color: "#0000FF" })
        .setLngLat([m.lon, m.lat])
        .addTo(map.current);
    });
  }, [lat ? lat : bankBranches[0].lat, lon ? lon : bankBranches[0].lon, zoom]);

  return (
    <div className="map-wrap">
      <div ref={mapContainer} className="map" />
    </div>
  );
}
