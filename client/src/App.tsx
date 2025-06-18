import { Route, Routes } from "react-router-dom";
import NavBar from "./components/NavBar";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Transactions from "./pages/Transactions";
import Profile from "./pages/Profile";
import SidePanel from "./components/SidePanel";
import dotenv from "dotenv";

dotenv.config();

function App() {
  return (
    <div className="flex flex-col h-screen">
      <NavBar />
      <div className="flex flex-col-reverse md:flex-row flex-1 overflow-hidden">
        <SidePanel />
        <main className="grow overflow-y-auto bg-gray-50">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/transactions" element={<Transactions />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}

export default App;
