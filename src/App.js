import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import Guest from "./pages/Guest";
import Rooms from "./pages/Rooms";
import Deal from "./pages/Deal";
import Ratings from "./pages/Rating";
import Settings from "./pages/Settings";
import Register from "./pages/Register";
import Login from "./pages/Login";
import { ThemeProvider } from "./contexts/Theme";
import { AuthProvider } from "./contexts/Autherization";
import ProtectedRoute from "./routes/ProtectedRoute";

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <BrowserRouter>
        <Routes>

          {/*  Public Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/*  Protected Routes */}
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Layout><Dashboard /></Layout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/guest"
            element={
              <ProtectedRoute>
                <Layout><Guest /></Layout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/rooms"
            element={
              <ProtectedRoute>
                <Layout><Rooms /></Layout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/deal"
            element={
              <ProtectedRoute>
                <Layout><Deal /></Layout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/ratings"
            element={
              <ProtectedRoute>
                <Layout><Ratings /></Layout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/settings"
            element={
              <ProtectedRoute>
                <Layout><Settings /></Layout>
              </ProtectedRoute>
            }
          />

        </Routes>
      </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;