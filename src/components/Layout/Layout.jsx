import { DroneList } from "../../features/DroneList/DroneList";
import { MobileDroneList } from "../../features/DroneList/MobileDroneList";
import { RedDroneCounter } from "../../features/DroneList/RedDroneCounter";
import MapContainer from "../../features/MapTracing/MapContainer";

const Layout = () => {
  return (
    <div className="relative flex grow">
      <MapContainer>
        <div className="h-full w-full bg-red-500">
          {/* drone list for large screens */}
          <DroneList />

          {/* drone list for small screen */}
          <MobileDroneList />
        </div>
      </MapContainer>

      {/* red drones counter */}
      <RedDroneCounter />
    </div>
  );
};

export default Layout;
