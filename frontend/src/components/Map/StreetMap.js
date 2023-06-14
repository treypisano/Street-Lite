import React, { useMemo} from "react";
import { useSelector } from "react-redux";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import "./style.css";

export default function StreetMap() {
  
  const { isLoaded, url, loadError } = useLoadScript({
    // replace the below with your own API key
    googleMapsApiKey: process.env.REACT_APP_MOH_MAPS_API_KEY,
  });

  //shows loading screen while map is loading
  if (!isLoaded) return <div>Loading...</div>;
  if (loadError) return <div>Error loading maps, check your API key</div>;

  return (
    <div>
      <Map />;
    </div>
  );
}


function Map() {
  //sets the center of the map to NYC
  const center = useMemo(() => ({ lat: 40.7128, lng: -74.006 }), []);
  const openStreets = useSelector((state) => state.openStreet);

  const markerPositions = useMemo(() => (
    Array.isArray(openStreets) ? openStreets.map((openStreet) => ({
      lat: parseFloat(openStreet.location.latitude),
      lng: parseFloat(openStreet.location.longitude),
    })) : []
  ), [openStreets]);


  return (
    <div className="map-container">
      <GoogleMap
        zoom={10}
        center={center}
        mapContainerClassName="map-container"
      >
        {markerPositions.map((position, index) => (
          <Marker
            key={index} // Assign a unique key to each marker
            position={position}
            icon={{
              url: require("./mapmarkers.png"), // Replace with the path to your custom marker image
              scaledSize: new window.google.maps.Size(80, 50), // Adjust the size of the marker image
            }}
          />
        ))}
      </GoogleMap>
    </div>
  );
}
