import React from "react";
import Geocoder from "react-map-gl-geocoder";


//For Searching city,area,state,country
const GeoCoder = ({ mapRef, handleGeocoderViewportChange, MAPBOX_TOKEN, geocoderContainerRef }) =>
  <Geocoder
    mapRef={mapRef}
    onViewportChange={handleGeocoderViewportChange}
    mapboxApiAccessToken={MAPBOX_TOKEN}
    position="top-left"
    containerRef={geocoderContainerRef}
  />;

export default React.memo(GeoCoder);
