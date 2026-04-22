import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
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
          <Route path="/" element={<Layout><Dashboard /></Layout>} />
          <Route path="/guest" element={<Layout><Guest /></Layout>} />
          <Route path="/rooms" element={<Layout><Rooms /></Layout>} />
          <Route path="/deal" element={<Layout><Deal /></Layout>} />
          <Route path="/Ratings" element={<Layout><Ratings /></Layout>} />
          <Route path="/Settings" element={<Layout><Settings /></Layout>} />

        </Routes>
      </BrowserRouter>
  );
}

export default App;
