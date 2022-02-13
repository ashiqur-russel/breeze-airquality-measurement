import React from "react";
import { Marker } from "react-map-gl";
import pink from "../../assets/pink.svg";
import green from "../../assets/green.svg";
import yellow from "../../assets/yellow.svg";


function isLatitude(lat) {
  return isFinite(lat) && Math.abs(lat) <= 90;
}


function isLongitude(lng) {
  return isFinite(lng) && Math.abs(lng) <= 180;
}


const Markers = ({ datas, handleMarkerClick }) =>
  datas.map((marker, idx) => (
    isLatitude(parseFloat(marker.lat)) && isLongitude(parseFloat(marker.lng)) &&
    <Marker key={idx} latitude={parseFloat(marker.lat)} longitude={parseFloat(marker.lng)}>
      <img
        src={marker.co2 <= 1000 ? green : marker.co2 > 1500 ? pink : yellow}
        alt="marker"
        onClick={(e) => {
          e.preventDefault();
          handleMarkerClick(idx);
        }}
      />
    </Marker>
  ));

export default React.memo(Markers);
