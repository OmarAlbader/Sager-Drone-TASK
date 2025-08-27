import { useState } from "react";

const Sidebar = () => {
  const [selectedTab, setSelectedTab] = useState("map");

  return (
    <div id="sidebar" className="h-full w-20 bg-[#111] py-5 text-white sm:w-25">
      <ul className="flex flex-col items-center gap-2 text-[0.65rem]">
        <li
          className={`flex w-full cursor-pointer flex-col items-center gap-1.5 py-4 transition-all ${selectedTab === "dashboard" ? "border-l-5 border-l-red-600 bg-white/5 pr-1 text-white" : "text-gray-500 hover:bg-white/5"}`}
          onClick={() => setSelectedTab("dashboard")}
        >
          <img src="/Icon/dashboard-svgrepo-com-2.svg" alt="dashboard" />
          DASHBOARD
        </li>

        <hr className="w-2/5 border text-gray-500" />

        <li
          className={`flex w-full cursor-pointer flex-col items-center gap-1.5 py-4 transition-all ${selectedTab === "map" ? "border-l-5 border-l-red-600 bg-white/5 pr-1 text-white" : "text-gray-500 hover:bg-white/5"}`}
          onClick={() => setSelectedTab("map")}
        >
          <img src="/Icon/location-svgrepo-com-2.svg" alt="map" />
          MAP
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
