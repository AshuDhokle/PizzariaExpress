import React, { useRef, useState } from 'react';
import 'leaflet/dist/leaflet.css';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import { mapUrlDetail } from '../utils/mapUtils';
import Leaflet from 'leaflet'

const markerIcon = new Leaflet.icon({
  iconUrl: '/images/placeholder.png',
  iconSize:[35,45],
  iconAnchor:[17,45],
  popupAnchor:[0,-46]
})

const Maps = () => {
  const [center, setCenter] = useState({ lat: 21.4, lon: 80.19 });
  const ZOOM_LEVEL = 12;
  const mapRef = useRef();

  return (
    <div className="m-10 felx felx-col items-center justify-center">
      <MapContainer
        center={[center.lat, center.lon]}
        zoom={ZOOM_LEVEL}
        ref={mapRef}
        style={{ height: "50vh", width: "50vh" }}
      >
        <TileLayer
          url={mapUrlDetail.maptiler.url}
          attribution={mapUrlDetail.maptiler.attribution}
        />
        <Marker position={[21.4,80.19]} icon={markerIcon}/>
        {/* <Popup><p>dsf</p></Popup> */}
      </MapContainer>
    </div>
  );
};

export default Maps;
