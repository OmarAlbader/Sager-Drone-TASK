import "mapbox-gl/dist/mapbox-gl.css";
import { useState } from "react";
import Map, { MapProvider, NavigationControl } from "react-map-gl/mapbox";
import PopUp from "../../components/Shared/PopUp";
import { useSocketIO } from "../../hooks/useSocketIO";
import { useDroneStore } from "../../state/droneStore";
import { MAPBOX_TOKEN } from "../../utils/constants";
import DronesSource from "./DronesSource";

const MapContainer = ({ children }) => {
  useSocketIO();

  const drones = useDroneStore((state) => state.drones);
  const hoveredDroneId = useDroneStore((state) => state.hoveredDroneId);
  const setHoveredDrone = useDroneStore((state) => state.setHoveredDrone);
  const clearHoveredDrone = useDroneStore((state) => state.clearHoveredDrone);
  const setHighlightedDrone = useDroneStore(
    (state) => state.setHighlightedDrone,
  );

  const [mapLoaded, setMapLoaded] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleMapOnLoad = (event) => {
    const map = event.target;

    map.loadImage("/Icon/drone.png", (error, image) => {
      if (error) throw error;

      if (!map.hasImage("drone-icon") && image) {
        map.addImage("drone-icon", image, { sdf: true });
        setImageLoaded(true);
      }
    });

    setMapLoaded(true);
  };

  const handleDroneClick = (event) => {
    const features = event.target.queryRenderedFeatures(event.point, {
      layers: ["drones-layer"],
    });

    if (features.length) {
      const droneId = features[0].properties?.id;
      setHighlightedDrone(droneId);
    }
  };

  const handleMouseMove = (event) => {
    const map = event.target;

    // Check if the layer exists
    if (!map.getLayer("drones-layer")) return;

    const features = map.queryRenderedFeatures(event.point, {
      layers: ["drones-layer"],
    });

    if (features.length) {
      const droneId = features[0].properties?.id;
      setHoveredDrone(droneId);
    } else {
      clearHoveredDrone();
    }
  };

  return (
    <MapProvider>
      <Map
        id="mainMap"
        initialViewState={{
          longitude: 35.86,
          latitude: 31.95,
          zoom: 11,
        }}
        style={{ width: "100%", height: "100%" }}
        mapStyle="mapbox://styles/mapbox/streets-v12"
        mapboxAccessToken={MAPBOX_TOKEN}
        onLoad={handleMapOnLoad}
        onClick={handleDroneClick}
        onMouseMove={handleMouseMove}
      >
        {mapLoaded && imageLoaded && <DronesSource />}
        <NavigationControl />
        {children}

        {/* Popup on markers hover */}
        {hoveredDroneId && drones[hoveredDroneId] && (
          <PopUp hoveredDroneId={hoveredDroneId} />
        )}
      </Map>
    </MapProvider>
  );
};

export default MapContainer;
