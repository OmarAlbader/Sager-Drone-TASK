import { useEffect } from "react";
import { useDroneStore } from "../state/droneStore";
import { io } from "socket.io-client";
import { SOCKET_URL } from "../utils/constants";

export const useSocketIO = () => {
  const updateDrones = useDroneStore((state) => state.updateDrones);

  useEffect(() => {
    const socket = io(SOCKET_URL);

    socket.on("message", (droneData) => {
      if (
        droneData.type === "FeatureCollection" &&
        Array.isArray(droneData.features)
      ) {
        let rawDroneData = {
          ...droneData.features.map((feature) => ({
            ...feature.properties,
            coordinates: feature.geometry.coordinates,
          }))[0],
        };

        updateDrones(rawDroneData);
      }
    });

    return () => socket.disconnect();
  }, [updateDrones]);
};
