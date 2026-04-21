import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Guest from "./pages/Guest";
import Rooms from "./pages/Rooms";
import Deal from "./pages/Deal";

function App() {
  return (
    <BrowserRouter> 
        <Routes>
          <Route path="/dashboard" element={<Dashboard/>} />
          <Route path="/guest" element={<Guest/>} />
          <Route path="/rooms" element={<Rooms/>} />
          <Route path="/deal" element={<Deal/>} />
        </Routes>
    </BrowserRouter>

  );
}

export default App;
