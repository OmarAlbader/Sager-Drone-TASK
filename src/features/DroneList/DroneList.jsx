import React, { useState, useMemo, useCallback } from "react";
import { useDroneStore } from "../../state/droneStore";
import { CircleX } from "lucide-react";
import { DroneListItem } from "./DroneListItem";

export const DroneList = React.memo(() => {
  const drones = useDroneStore((state) => state.drones);
  const droneCount = useDroneStore((state) => state.droneCount);

  const [selectedMenu, setSelectedMenu] = useState("drones");

  const dronesToShow = useMemo(() => {
    return Object.values(drones);
  }, [drones]);

  const handleMenuSelect = useCallback((menu) => {
    setSelectedMenu(menu);
  }, []);

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

      {/* Drone List Tabs */}
      <ul className="flex gap-8 border-b-2 border-black px-5 text-sm">
        <li
          className={`cursor-pointer border-red-600 transition-colors ${selectedMenu === "drones" ? "border-b-5 pb-2" : "text-gray-500"} `}
          onClick={() => handleMenuSelect("drones")}
        >
          Drones
        </li>
        <li
          className={`cursor-pointer border-red-600 transition-colors ${selectedMenu === "flight-history" ? "border-b-5 pb-2" : "text-gray-500"} `}
          onClick={() => handleMenuSelect("flight-history")}
        >
          Flight History
        </li>
      </ul>

      {/* Drone List Items */}
      <ul>
        {dronesToShow.map((drone) => (
          <DroneListItem key={drone.serial} drone={drone} />
        ))}
      </ul>
    </div>
  );
});
