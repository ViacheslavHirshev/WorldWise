import { useNavigate, useSearchParams } from "react-router-dom";
import styles from "./Map.module.css";
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMap,
  useMapEvents,
} from "react-leaflet";
import { useEffect, useState } from "react";
import { useCities } from "../../context/CitiesContext";
import { useGeolocation } from "../../hooks/useGeolocation";
import { Button } from "../Button/Button";

export const Map = () => {
  const [mapPosition, setMapPosition] = useState<[number, number]>([40, 0]);
  const { cities } = useCities();
  const [queryParams] = useSearchParams();

  const mapLat = queryParams.get("lat");
  const mapLng = queryParams.get("lng");

  const {
    isLoading: isLoadingGeoPosition,
    position: geoPosition,
    getPosition: getGeoPosition,
  } = useGeolocation();

  useEffect(() => {
    if (mapLat && mapLng) {
      setMapPosition([+mapLat, +mapLng]);
    }
  }, [mapLat, mapLng]);

  useEffect(() => {
    if (geoPosition) setMapPosition([geoPosition.lat, geoPosition.lng]);
  }, [geoPosition]);

  return (
    <div className={styles.mapContainer}>
      {!geoPosition && (
        <Button type="position" onClick={getGeoPosition}>
          {isLoadingGeoPosition ? "Loading..." : "Show my position"}
        </Button>
      )}
      <MapContainer
        className={styles.mapContainer}
        center={mapPosition}
        zoom={6}
        scrollWheelZoom={true}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {cities.map((city) => (
          <Marker
            key={city.id}
            position={[city.position.lat, city.position.lng]}
          >
            <Popup>
              <span>{city.emoji}</span>
              <span>{city.cityName}</span>
            </Popup>
          </Marker>
        ))}

        <ChangeCenter position={mapPosition} />
        <DetectClick />
      </MapContainer>
    </div>
  );
};

const ChangeCenter = ({ position }: { position: [number, number] }) => {
  const map = useMap();
  map.setView(position);

  return null;
};

const DetectClick = () => {
  const navigate = useNavigate();

  useMapEvents({
    click: (e) => {
      navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`);
    },
  });

  return null;
};
