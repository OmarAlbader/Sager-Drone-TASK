import { create } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";

export const useDroneStore = create(
  subscribeWithSelector((set, get) => ({
    drones: {},
    droneCount: 0,
    redDroneCount: 0,
    hoveredDroneId: null,
    highlightedDroneId: null,

    updateDrones: (newDrone) => {
      set((state) => {
        const isAllowed = newDrone.registration.split("-")[1].startsWith("B");
        const [longitude, latitude] = newDrone.coordinates;

        const existingDrone = state.drones[newDrone.serial];

        const updatedPath = existingDrone
          ? [...existingDrone.path, { longitude, latitude }]
          : [{ longitude, latitude }];

        const droneObject = {
          ...newDrone,
          isAllowed,
          path: updatedPath,
          coordinates: {
            longitude,
            latitude,
          },
          startTime: state.drones[newDrone.serial]?.startTime || Date.now(), // Keep existing startTime or set new one
        };

        const newDrones = {
          ...state.drones,
          [newDrone.serial]: droneObject,
        };

        // Calculate counts efficiently
        const allDrones = Object.values(newDrones);
        const redCount = allDrones.filter((drone) => !drone.isAllowed).length;

        return {
          drones: newDrones,
          droneCount: allDrones.length,
          redDroneCount: redCount,
        };
      });
    },

    // Hover actions
    setHoveredDrone: (droneId) => set({ hoveredDroneId: droneId }),
    clearHoveredDrone: () => set({ hoveredDroneId: null }),

    // Highlight Drone
    setHighlightedDrone: (droneId) => set({ highlightedDroneId: droneId }),
    clearHighlightedDrone: () => set({ highlightedDroneId: null }),

    getDroneById: (id) => get().drones[id],
    getAllDrones: () => Object.values(get().drones),
    getRedDroneCount: () => get().redDroneCount,
    getHoveredDrone: () => {
      const hoveredId = get().hoveredDroneId;
      return hoveredId ? get().drones[hoveredId] : null;
    },
    getHighlightedDrone: () => {
      const highlightedId = get().highlightedDroneId;
      return highlightedId ? get().drones[highlightedId] : null;
    },
  })),
);
