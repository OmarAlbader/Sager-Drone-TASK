import { useMemo } from "react";
import { Layer, Source } from "react-map-gl/mapbox";
import { useDroneStore } from "../../state/droneStore";

const DronesSource = () => {
  const drones = useDroneStore((state) => state.drones);

  const dronesGeoJSON = useMemo(
    () => ({
      type: "FeatureCollection",
      features: Object.values(drones).flatMap((drone) => {
        if (!drone.path || drone.path.length === 0) return [];

        const lastPos = drone.path[drone.path.length - 1];

        return [
          {
            type: "Feature",
            geometry: {
              type: "LineString",
              coordinates: drone.path.map((p) => [p.longitude, p.latitude]),
            },
            properties: {
              id: `${drone.serial}-path`,
              isAllowed: drone.isAllowed,
            },
          },
          {
            type: "Feature",
            geometry: {
              type: "Point",
              coordinates: [lastPos.longitude, lastPos.latitude],
            },
            properties: {
              id: `${drone.serial}`,
              registration: drone.registration,
              isAllowed: drone.isAllowed,
              yaw: drone.yaw,
            },
          },
        ];
      }),
    }),
    [drones],
  );

  return (
    <Source id="drones" type="geojson" data={dronesGeoJSON}>
      {/* Drone markers */}
      <Layer
        id="drones-layer"
        type="symbol"
        layout={{
          "icon-image": "drone-icon",
          "icon-size": 0.8,
          "icon-rotate": ["get", "yaw"],
          "icon-rotation-alignment": "map",
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
        filter={["==", ["geometry-type"], "Point"]}
      />

      {/* Drone paths */}
      <Layer
        id="drone-paths"
        type="line"
        paint={{
          "line-color": ["case", ["get", "isAllowed"], "#00A63E", "#E7000B"],
          "line-width": 2,
        }}
        filter={["==", ["geometry-type"], "LineString"]}
      />
    </Source>
  );
};

export default DronesSource;
