const DroneListTab = ({ selected, label, setSelectedMenu }) => {
  return (
    <li
      className={`cursor-pointer border-red-600 transition-colors ${label === selected ? "border-b-5 pb-2" : "text-gray-500"} `}
      onClick={() => setSelectedMenu(label)}
    >
      {label}
    </li>
  );
};

export default DroneListTab;
