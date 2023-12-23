import React, { useState, useRef, useMemo, useCallback } from "react";
import { render } from "react-dom";
import { useHistory, useLocation } from "react-router";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import "leaflet/dist/leaflet.css";
import "../App.css";
import useGeoLocation from "../hooks/useGeoLocation";
import image from "../images/map.png";

const center = {
  lat: 35.699992,
  lng: 51.337886,
};

const ParkingLocation = () => {
  const history = useHistory();
  const [draggable, setDraggable] = useState(false);
  const [position, setPosition] = useState(center);
  const markerRef = useRef(null);

  // history.push("/RegisterParking", {
  //   lat: position.lat,
  //   lng: position.lng,
  // });

  const eventHandlers = useMemo(
    () => ({
      dragend() {
        const marker = markerRef.current;
        if (marker != null) {
          setPosition(marker.getLatLng());
          console.log("position", marker.getLatLng());
          history.push("/RegisterParking", {
            lat: marker.getLatLng().lat,
            lng: marker.getLatLng().lng,
          });
        }
      },
    }),
    []
  );
  // const markerIconConst = L.icon({
  //   iconUrl: markerIcon,
  //   iconRetinaUrl: markerIcon,
  //   iconAnchor: [5, 55],
  //   popupAnchor: [10, -44],
  //   iconSize: [25, 55],
  // });
  let markerIcon = new L.icon({
    // html: `<span style="${markerHtmlStyles}" />`,
    iconUrl: image,

    iconSize: [25, 41],
    iconAnchor: [10, 41],
    popupAnchor: [2, -40],
  });

  const toggleDraggable = useCallback(() => {
    setDraggable((d) => !d);
  }, []);

  return (
    <div style={{ margin: "5%" }}>
      <MapContainer
        center={center}
        zoom={13}
        scrollWheelZoom={false}
        style={{ height: "200px" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker
          draggable={draggable}
          eventHandlers={eventHandlers}
          position={position}
          ref={markerRef}
          icon={markerIcon}
        >
          <Popup minWidth={90}>
            <span onClick={toggleDraggable}>
              {draggable
                ? "نشانگر قابل حرکت میباشد."
                : "برای حرکت نشانگر کلیک کنید."}
            </span>
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};
export default ParkingLocation;
