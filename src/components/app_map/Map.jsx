import { useNavigate } from "react-router-dom";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  useMapEvent,
} from "react-leaflet";
import styles from "./Map.module.css";
import { useEffect, useState } from "react";
import { useCities } from "../../contexts/CitiesContext";
import PropTypes from "prop-types";
import { useGeolocation } from "../shared/hooks/useGeolocation";
import Button from "../shared/Button";
import { useUrlPosition } from "../shared/hooks/useUrlPosition";

ChangeCenter.propTypes = {
  position: PropTypes.array,
};

/* exported render */

// Right side panel
function Map() {
  // return a function tp move to any URL
  const { cities } = useCities();
  const [mapPosition, setMapPosition] = useState([35.6, 139.8]);
  const {
    isLoading: isLoadingPosition,
    position: geoLocationPosition,
    getPosition,
  } = useGeolocation();

  const [lat, lng] = useUrlPosition();

  useEffect(() => {
    if (lat && lng) setMapPosition([lat, lng]);
  }, [lat, lng]);

  useEffect(() => {
    if (geoLocationPosition.lat && geoLocationPosition.lng) {
      setMapPosition([geoLocationPosition.lat, geoLocationPosition.lng]);
    }
  }, [geoLocationPosition]);

  return (
    <div className={styles.mapContainer}>
      {/* {(!geoLocationPosition.lat || !geoLocationPosition.lng) && ( */}
      <Button type="position" onClick={getPosition}>
        {isLoadingPosition ? "Loading" : "Use your location"}
      </Button>
      {/* )} */}

      {/* Source: React Leaflet (https://react-leaflet.js.org/) */}
      <MapContainer
        className={styles.map}
        center={mapPosition}
        zoom={17}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
        />
        {cities.map((city) => (
          <Marker
            position={[city.position.lat, city.position.lng]}
            key={city.id}
          >
            <Popup>
              <span className="flags">{city.emoji}</span>{" "}
              <span>{city.cityName}</span>
            </Popup>
          </Marker>
        ))}

        <ChangeCenter position={mapPosition} />
        <DetectClick />
      </MapContainer>
    </div>
  );
}

// Make change center reactive
// When choose a city, center will move there
function ChangeCenter({ position }) {
  // Get the current instance of the map being displayed
  const map = useMap();
  const zoomLevel = 10;
  map.setView(position, zoomLevel);
  return null;
}

function DetectClick() {
  const navigate = useNavigate();

  useMapEvent({
    click: (event) => {
      navigate(`form?lat=${event.latlng.lat}&lng=${event.latlng.lng}`);
    },
  });
}

export default Map;
