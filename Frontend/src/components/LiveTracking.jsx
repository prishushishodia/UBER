import React, { useState, useEffect, useMemo } from "react";
import { MapContainer, TileLayer, Marker, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

const defaultPosition = { lat: 28.6139, lng: 77.209 }; // New Delhi fallback

// Clean CARTO basemaps — light for riders, dark for captains
const TILE_URLS = {
  light: "https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png",
  dark: "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png",
};

function RecenterMap({ position }) {
  const map = useMap();
  useEffect(() => {
    map.setView([position.lat, position.lng]);
  }, [position, map]);
  return null;
}

const LiveTracking = ({ variant = "light" }) => {
  const [currentPosition, setCurrentPosition] = useState(defaultPosition);

  // Pulsing dot instead of the default Leaflet pin
  const liveIcon = useMemo(
    () =>
      L.divIcon({
        className: "",
        html: `<div class="live-marker ${variant === "dark" ? "live-marker--gold" : ""}">
                 <span class="live-marker__ring"></span>
                 <span class="live-marker__dot"></span>
               </div>`,
        iconSize: [36, 36],
        iconAnchor: [18, 18],
      }),
    [variant]
  );

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;
      setCurrentPosition({ lat: latitude, lng: longitude });
    });

    const watchId = navigator.geolocation.watchPosition((position) => {
      const { latitude, longitude } = position.coords;
      setCurrentPosition({ lat: latitude, lng: longitude });
    });

    return () => navigator.geolocation.clearWatch(watchId);
  }, []);

  return (
    <MapContainer
      center={[currentPosition.lat, currentPosition.lng]}
      zoom={15}
      zoomControl={false}
      style={{ width: "100%", height: "100%" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a> &copy; <a href="https://carto.com/attributions">CARTO</a>'
        url={TILE_URLS[variant] || TILE_URLS.light}
      />
      <Marker position={[currentPosition.lat, currentPosition.lng]} icon={liveIcon} />
      <RecenterMap position={currentPosition} />
    </MapContainer>
  );
};

export default LiveTracking;
