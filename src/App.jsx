import "./assets/styles/index.css";
import Layout from "./components/Layout/Layout";
import Navbar from "./components/Shared/Navbar";
import Sidebar from "./components/Shared/Sidebar";

function App() {
  return (
    <div className="flex h-screen flex-col overflow-hidden">
      <Navbar />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <Layout />
      </div>
    </div>
  );
}

export default App;
