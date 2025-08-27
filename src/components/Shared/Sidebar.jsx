import { useSidebarStore } from "../../features/Dashboard/dashboardSlice";

const Sidebar = () => {
  const selectedTab = useSidebarStore((state) => state.selectedTab);
  const selectSidebarTab = useSidebarStore((state) => state.selectSidebarTab);

  const tabs = [
    {
      id: "dashboard",
      label: "DASHBOARD",
      icon: "/Icon/dashboard-svgrepo-com-2.svg",
    },
    { id: "map", label: "MAP", icon: "/Icon/location-svgrepo-com-2.svg" },
  ];

  return (
    <div
      id="sidebar"
      className="h-full min-w-20 bg-[#111] py-5 text-white sm:min-w-24"
    >
      <ul className="flex flex-col items-center gap-2 text-[0.65rem]">
        {tabs.map((tab) => (
          <li
            key={tab.id}
            className={`flex w-full cursor-pointer flex-col items-center gap-1.5 py-4 transition-all ${
              selectedTab === tab.id
                ? "border-l-4 border-l-red-600 bg-white/5 pr-1 text-white"
                : "text-gray-500 hover:bg-white/5"
            }`}
            onClick={() => selectSidebarTab(tab.id)}
          >
            <img src={tab.icon} alt={tab.label.toLowerCase()} />
            {tab.label}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
