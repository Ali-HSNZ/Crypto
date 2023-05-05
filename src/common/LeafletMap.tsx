import React, { useState, useEffect } from "react";
import L from "leaflet";

const LeafletMap = () => {
  const [marker, setMarker] = useState(null);

  useEffect(() => {
    // Create the map
    const map = L.map("map").setView([35.6892, 51.3890], 12);

    // Add the tile layer
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
      maxZoom: 18,
    }).addTo(map);

    // Add a marker
    const marker = L.marker([35.6892, 51.3890]).addTo(map);
    setMarker(marker);
  }, []);

  const handleMarkerMove = () => {
    // Move the marker to a new location
    marker.setLatLng([35.7125, 51.3874]);

    // Get the new coordinates of the marker
    const latLng = marker.getLatLng();
    const x = latLng.lat;
    const y = latLng.lng;

    console.log("New coordinates of the marker:", x, y);
  };

  return (
    <div>
      <div id="map" style={{ height: "400px" }} />
      <button onClick={handleMarkerMove}>Move Marker</button>
    </div>
  );
};

export default LeafletMap;
