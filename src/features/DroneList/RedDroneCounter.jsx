import { useDroneStore } from "../../state/droneStore";

export const RedDroneCounter = () => {
  const count = useDroneStore((state) => state.getRedDroneCount());

  return (
    <div
      className={`absolute right-4 bottom-4 z-1 flex items-center rounded-lg bg-gray-100 p-2 text-black shadow-2xl shadow-black`}
    >
      <div className="mr-2 ml-1 flex w-fit items-center justify-center rounded-full bg-black px-1.5 text-center font-bold text-white sm:px-2 sm:text-[1rem]">
        {count}
      </div>
      Red Drones
    </div>
  );
};
