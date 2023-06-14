import React, { useMemo } from "react";
import { useSelector } from "react-redux";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import { useHistory } from "react-router-dom";
import "./style.css";

export default function StreetMap() {
  
  const { isLoaded, url, loadError } = useLoadScript({
    googleMapsApiKey:  process.env.REACT_APP_MOH_MAPS_API_KEY,
  });

  if (!isLoaded) return <div>Loading...</div>;
  if (loadError) return <div>Error loading maps, check your API key</div>;

  return (
    <div>
      <Map />;
    </div>
  );
}

function Map() {
  const center = useMemo(() => ({ lat: 40.7128, lng: -74.006 }), []);
  const openStreets = useSelector((state) => state.openStreet);
  const history = useHistory();

  const markerPositions = useMemo(
    () =>
      Array.isArray(openStreets)
        ? openStreets.map((openStreet) => ({
            lat: parseFloat(openStreet.location.latitude),
            lng: parseFloat(openStreet.location.longitude),
          }))
        : [],
    [openStreets]
  );

   const handleMarkerClick = (eventId) => {
    history.push(`/events/${eventId}`);
  };

  return (
    <div className="map-container">
      <GoogleMap zoom={10} center={center} mapContainerClassName="map-container">
        {markerPositions.map((position, index) => (
          <Marker
            key={index}
            position={position}
            icon={{
              url: require("./mapmarkers.png"),
              scaledSize: new window.google.maps.Size(80, 50),
            }}
            onClick={() => handleMarkerClick(openStreets[index]._id)}
          />
        ))}
      </GoogleMap>
    </div>
  );
}