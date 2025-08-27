import React, { useEffect, useState } from "react";
import { useDroneStore } from "../../state/droneStore";
import { ArrowUp, CircleX } from "lucide-react";
import { DroneListItem } from "./DroneListItem";

const MobileDroneList = React.memo(({ activeDroneId }) => {
  const { drones } = useDroneStore();
  const droneCount = useDroneStore((state) => state.droneCount);

  const [selectedMenu, setSelectedMenu] = useState("drones");
  const [dronesToShow, setDronesToShow] = useState([]);

  const [showList, setShowList] = useState(false);

  useEffect(() => {
    setDronesToShow(Object.values(drones));
  }, [drones]);

  return (
    <div id="mobile-drone-list-container">
      {/* button tape to show mobile drone list */}
      <div
        id="mobile-tape"
        className={`fixed ${showList ? "translate-y-full" : "delay-400"} -bottom-2 left-1/5 z-10 flex h-20 w-10 cursor-pointer justify-center rounded-t-full bg-[#111] py-3 transition-transform`}
        onClick={() => setShowList(true)}
      >
        <ArrowUp className="text-white" size={25} />
      </div>

      {/* black trasnparent backdrop */}
      <div
        className={`absolute inset-0 bg-black transition-opacity duration-500 ${showList ? "opacity-60" : "pointer-events-none opacity-0"}`}
        onClick={() => setShowList(false)}
      />

      {/* Drones List */}
      <div
        id="mobile-drone-list"
        className={`${!showList ? "translate-y-full" : ""} mobile-scrollbar absolute top-70 z-1 h-[67%] w-full overflow-y-auto bg-[#111] text-white opacity-95 shadow-lg transition-transform duration-500 sm:left-1/2 sm:w-3/4 sm:-translate-x-1/2`}
      >
        <div className="mb-2 flex justify-between p-5">
          <h2 className="text-xl font-medium tracking-tight">
            DRONE FLYING ({droneCount})
          </h2>
          <CircleX
            size={30}
            fill="white"
            className="cursor-pointer text-black transition-opacity hover:opacity-70"
            onClick={() => setShowList((prev) => !prev)}
          />
        </div>

        {/* Drone List Tabs */}
        <ul className="flex gap-8 border-b-2 border-black px-5 text-sm">
          <li
            className={`cursor-pointer border-red-600 transition-colors ${selectedMenu === "drones" ? "border-b-5 pb-2" : "text-gray-500"} `}
            onClick={() => setSelectedMenu("drones")}
          >
            Drones
          </li>
          <li
            className={`cursor-pointer border-red-600 transition-colors ${selectedMenu === "flight-history" ? "border-b-5 pb-2" : "text-gray-500"} `}
            onClick={() => setSelectedMenu("flight-history")}
          >
            Flight History
          </li>
        </ul>
        {/* Drone List Item */}
        <ul>
          {dronesToShow.map((drone) => {
            return (
              <DroneListItem
                key={drone.serial}
                drone={drone}
                isHighlighted={activeDroneId}
              />
            );
          })}
        </ul>
      </div>
    </div>
  );
});

export default MobileDroneList;
