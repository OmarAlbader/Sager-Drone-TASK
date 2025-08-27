import { useEffect, useState } from "react";
import { Popup } from "react-map-gl/mapbox";
import { useDroneStore } from "../../state/droneStore";
import { formatFlightTime } from "../../utils/helpers";

const PopUp = ({ hoveredDroneId }) => {
  const hoveredDrone = useDroneStore((state) => state.drones[hoveredDroneId]);

  const [_tick, setTick] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTick((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  if (!hoveredDrone || !hoveredDrone.coordinates) return null;

  return (
    <Popup
      longitude={hoveredDrone.coordinates.longitude}
      latitude={hoveredDrone.coordinates.latitude}
      closeButton={false}
      closeOnClick={false}
      anchor="bottom"
    >
      <div className="px-2.5 tracking-widest">
        <h3 className="mb-2 text-sm font-bold">{hoveredDrone.Name}</h3>

        <div className="flex justify-between gap-5">
          <div className="flex flex-col items-center">
            <p className="font-extralight opacity-70">Altitude</p>
            <p className="font-bold">{hoveredDrone.altitude} m</p>
          </div>

          <div className="flex flex-col items-center">
            <p className="font-extralight opacity-70">Flight Time</p>
            <p className="font-bold">
              {formatFlightTime(hoveredDrone.startTime)}
            </p>
          </div>
        </div>
      </div>
    </Popup>
  );
};

export default PopUp;
