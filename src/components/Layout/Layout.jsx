import React, { Suspense } from "react";
import { RedDroneCounter } from "../../features/DroneList/RedDroneCounter";
import MapContainer from "../../features/MapTracing/MapContainer";

const DroneList = React.lazy(
  () => import("../../features/DroneList/DroneList"),
);
const MobileDroneList = React.lazy(
  () => import("../../features/DroneList/MobileDroneList"),
);

const useMediaQuery = (query) => {
  const [matches, setMatches] = React.useState(
    window.matchMedia(query).matches,
  );

  React.useEffect(() => {
    const media = window.matchMedia(query);
    const listener = () => setMatches(media.matches);
    media.addEventListener("change", listener);
    return () => media.removeEventListener("change", listener);
  }, [query]);

  return matches;
};

const Layout = () => {
  const isMobile = useMediaQuery("(max-width: 1000px)");

  return (
    <div className="relative flex grow">
      <MapContainer>
        <Suspense fallback={<div>Loading Drones List...</div>}>
          {isMobile ? <MobileDroneList /> : <DroneList />}
        </Suspense>
      </MapContainer>

      {/* red drones counter */}
      <RedDroneCounter />
    </div>
  );
};

export default Layout;
