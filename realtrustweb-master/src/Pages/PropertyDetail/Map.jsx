import React from "react";
import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";
import EnvVars from "../../config/env.conf";


const MapComponent = ({lat,lng}) => {
  const containerStyle = {
    width: "100%",
    height: "400px",
  };

  const center = {
    lat: parseInt(lat),
    lng: parseInt(lng),
  };

  const { isLoaded, loadError } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: EnvVars.GOOGLE_API_KEY, // Replace with your actual API key
  });

  const [map, setMap] = React.useState(null);

  const onLoad = React.useCallback((map) => {
    const bounds = new window.google.maps.LatLngBounds(center);
    map.fitBounds(bounds);
    setMap(map);
  }, []);

  const onUnmount = React.useCallback(() => {
    setMap(null);
  }, []);

  if (loadError) {
    return <div>Error loading Google Maps</div>;
  }

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={10}
      onLoad={onLoad}
      onUnmount={onUnmount}
    >
      {/* Child components like markers, info windows, etc. */}
    </GoogleMap>
  ) : (
    <div>Loading...</div>
  );
};

export default MapComponent;
