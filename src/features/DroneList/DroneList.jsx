import React, { useState, useMemo, useCallback } from "react";
import { useDroneStore } from "../../state/droneStore";
import { CircleX } from "lucide-react";
import { DroneListItem } from "./DroneListItem";
import DroneListTab from "./DroneListTab";

const DroneList = React.memo(() => {
  const drones = useDroneStore((state) => state.drones);
  const droneCount = useDroneStore((state) => state.droneCount);
  const [selectedMenu, setSelectedMenu] = useState("Drones");

  const handleMenuSelect = useCallback((menu) => {
    setSelectedMenu(menu);
  }, []);

  const dronesToShow = useMemo(() => {
    return Object.values(drones);
  }, [drones]);

  return (
    <div
      id="drone-list"
      className="mobile-scrollbar absolute top-0 left-0 z-1 mt-2 ml-2 h-full w-1/3 overflow-y-auto bg-[#111] text-white shadow-lg xl:w-1/4"
    >
      {/* List Title */}
      <div className="mb-10 flex justify-between p-5">
        <h2 className="text-xl font-medium tracking-tight">
          DRONE FLYING ({droneCount})
        </h2>
        <CircleX
          size={30}
          fill="gray"
          className="cursor-pointer text-black transition-opacity hover:opacity-70"
        />
      </div>

      {/* Tabs */}
      <ul className="flex gap-8 border-b-2 border-black px-5 text-sm">
        <DroneListTab
          selected={selectedMenu}
          setSelectedMenu={handleMenuSelect}
          label={"Drones"}
        />
        <DroneListTab
          selected={selectedMenu}
          setSelectedMenu={handleMenuSelect}
          label={"Flight History"}
        />
      </ul>

      {/* Drone Items */}
      <ul>
        {dronesToShow.map((drone) => (
          <DroneListItem key={drone.serial} drone={drone} />
        ))}
      </ul>
    </div>
  );
});

export default DroneList;
