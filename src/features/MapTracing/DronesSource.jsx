import { useMemo } from "react";
import { Layer, Source } from "react-map-gl/mapbox";
import { useDroneStore } from "../../state/droneStore";

const DronesSource = () => {
  const drones = useDroneStore((state) => state.drones);

  const dronesGeoJSON = useMemo(
    () => ({
      type: "FeatureCollection",
      features: Object.values(drones).map((drone) => ({
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [
            drone.coordinates.longitude,
            drone.coordinates.latitude,
          ],
        },
        properties: {
          id: drone.serial,
          isAllowed: drone.isAllowed,
          yaw: drone.yaw,
        },
      })),
    }),
    [drones],
  );

  return (
    <Source id="drones" type="geojson" data={dronesGeoJSON}>
      <Layer
        id="drones-layer"
        type="symbol"
        layout={{
          "icon-image": "drone-icon",
          "icon-size": 0.8,
          "icon-rotate": ["get", "yaw"],
          "text-size": 10,
          "text-offset": [0, 2],
        }}
        paint={{
          "icon-color": [
            "case",
            ["get", "isAllowed"],
            "#00A63E", // allowed drones color
            "#E7000B", // not allowed drones color
          ],
          "text-color": "#000",
        }}
      />
    </Source>
  );
};

export default DronesSource;
