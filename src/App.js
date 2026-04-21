import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Guest from "./pages/Guest";
import Rooms from "./pages/Rooms";
import Deal from "./pages/Deal";
import Ratings from "./pages/Rating";
import Settings from "./pages/Settings";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Dashboard />} />
        <Route path="/guest" element={<Guest />} />
        <Route path="/rooms" element={<Rooms />} />
        <Route path="/deal" element={<Deal />} />
        <Route path="/Ratings" element={<Ratings />} />
        <Route path="/Settings" element={<Settings />} />
      </Routes>
    </BrowserRouter>

  );
}

export default App;
