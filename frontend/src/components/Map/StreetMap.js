import React, { useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { GoogleMap, useLoadScript, Marker, InfoWindow } from "@react-google-maps/api";
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
      <Map />
    </div>
  );
}

function Map() {
  const center = useMemo(() => ({ lat: 40.734344, lng: -73.922479 }), []);
  const openStreets = useSelector((state) => state.openStreet);
  const history = useHistory();
  const [selectedMarker, setSelectedMarker] = useState(null);

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

  const handleMarkerHover = (marker) => {
    setSelectedMarker(marker);
  };

  const handleMarkerHoverLeave = () => {
    setSelectedMarker(null);
  };

  return (
    <div className="map-container">
      <GoogleMap zoom={12} center={center} mapContainerClassName="map-container">
        {markerPositions.map((position, index) => (
          <Marker
            key={index}
            position={position}
            icon={{
              url: require("./mapmarkers.png"),
              scaledSize: new window.google.maps.Size(80, 50),
            }}
            onMouseOver={() => handleMarkerHover(openStreets[index])}
            onMouseOut={handleMarkerHoverLeave}
            onClick={() => handleMarkerClick(openStreets[index]._id)}
          >
            {selectedMarker === openStreets[index] && (
              <InfoWindow
                options={{
                  disableCloseButton: true,
                }}
              >
                <div>{openStreets[index].location.mainStreet}</div>
              </InfoWindow>
            )}
          </Marker>
        ))}
      </GoogleMap>
    </div>
  );
}
