import React, { useCallback, useMemo, useRef } from "react";
import { useMap } from "react-map-gl/mapbox";
import { useDroneStore } from "../../state/droneStore";

export const DroneListItem = React.memo(
  ({ drone }) => {
    const { mainMap } = useMap();
    const itemRef = useRef(null);

    const highlightedDroneId = useDroneStore(
      (state) => state.highlightedDroneId,
    );
    const setHighlightedDrone = useDroneStore(
      (state) => state.setHighlightedDrone,
    );

    const centerMapToDrone = useCallback(() => {
      if (!mainMap) return;

      // center the map to clicked drone list item
      setHighlightedDrone(drone.serial);
      const offsetX =
        window.innerWidth >= 1000
          ? window.innerWidth / 6
          : window.innerWidth / 50;

      mainMap.flyTo({
        center: [drone.coordinates.longitude, drone.coordinates.latitude],
        zoom: 11.5,
        speed: 0.7,
        curve: 1.5,
        essential: true,
        offset: [offsetX, 0], //* offset to right to account left sidebar
      });
    }, [
      mainMap,
      setHighlightedDrone,
      drone.serial,
      drone.coordinates.longitude,
      drone.coordinates.latitude,
    ]);

    // to prevent recalculation drone values
    const memoizedValues = useMemo(
      () => ({
        isItemHighlighted: highlightedDroneId === drone.serial,
        statusBgColor: drone.isAllowed ? "bg-green-500" : "bg-red-500",
        itemBgColor:
          highlightedDroneId === drone.serial
            ? "bg-[#272727]"
            : "hover:bg-[#272727]",
      }),
      [highlightedDroneId, drone.serial, drone.isAllowed],
    );

    return (
      <li
        ref={itemRef}
        className={`flex cursor-pointer flex-col gap-3 border-t-2 border-black p-5 transition-colors ${memoizedValues.itemBgColor}`}
        onClick={centerMapToDrone}
      >
        <h3 className="text-xs font-bold">{drone.Name}</h3>

        <div
          className="grid grid-cols-3 grid-rows-2 gap-y-3 text-[0.5rem]"
          style={{
            gridTemplateColumns: "1fr 1fr 0.5fr",
          }}
        >
          <div>
            <p className="opacity-50">Serial #</p>
            <p className="font-medium">{drone.serial}</p>
          </div>
          <div className="place-self-center">
            <p className="opacity-50">Registration #</p>
            <p className="font-medium">{drone.registration}</p>
          </div>

          <div className="row-span-2 flex items-center justify-center">
            <span
              className={`h-5 w-5 -translate-y-4 rounded-full border-2 border-white/80 ${memoizedValues.statusBgColor}`}
            />
          </div>

          <div>
            <p className="opacity-50">Pilot</p>
            <p className="font-medium">{drone.pilot}</p>
          </div>
          <div className="place-self-center">
            <p className="opacity-50">Organization</p>
            <p className="font-medium">{drone.organization}</p>
          </div>
        </div>
      </li>
    );
  },
  (prevProps, nextProps) => {
    const sameSerial = prevProps.drone.serial === nextProps.drone.serial;
    const sameCoordinates =
      prevProps.drone.coordinates.longitude ===
        nextProps.drone.coordinates.longitude &&
      prevProps.drone.coordinates.latitude ===
        nextProps.drone.coordinates.latitude;

    const sameHighlight = prevProps.isHighlighted === nextProps.isHighlighted;

    return sameSerial && sameCoordinates && sameHighlight;
  },
);

DroneListItem.displayName = "DroneListItem";
