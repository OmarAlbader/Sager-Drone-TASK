import "./assets/styles/index.css";
import Layout from "./components/Layout/Layout";
import Navbar from "./components/Shared/Navbar";
import Sidebar from "./components/Shared/Sidebar";
import Dashboard from "./features/Dashboard/Dashboard";
import { useSidebarStore } from "./features/Dashboard/dashboardSlice";

function App() {
  const selectedTab = useSidebarStore((state) => state.selectedTab);

  return (
    <div className="flex h-screen flex-col overflow-hidden">
      <Navbar />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        {selectedTab === "dashboard" ? <Dashboard /> : <Layout />}
      </div>
    </div>
  );
}

export default App;
