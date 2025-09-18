import { useEffect, useRef } from "react";
import { MapContainer, TileLayer, useMapEvents, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "leaflet-defaulticon-compatibility";
import "./address.css";

export const mapRef = { current: null };

export const resetToCurrentLocation = () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        if (mapRef.current) {
          mapRef.current.setView([latitude, longitude], 14);
        }
      },
      () => {
        if (mapRef.current) {
          mapRef.current.setView([26.9124, 75.7873], 13); // Jaipur fallback
        }
      }
    );
  }
};

const LocationMarker = ({ onSelect }) => {
  useMapEvents({
    click(e) {
      onSelect(e.latlng);
    },
  });
  return null;
};

const SetMapRef = () => {
  const map = useMap();
  mapRef.current = map;
  return null;
};

const MapPicker = ({ onLocationSelect }) => {
  useEffect(() => {
    resetToCurrentLocation();
  }, []);

  return (
    <MapContainer
      className="map"
      center={[26.9124, 75.7873]}
      zoom={13}
      style={{
        height: "392px",
        width: "52%",
        position:"relative",
        outlineStyle: "none",
      }}
    >
      <TileLayer
        attribution="&copy; OpenStreetMap contributors"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <SetMapRef />
      <LocationMarker onSelect={onLocationSelect} />
    </MapContainer>
  );
};

export default MapPicker;
