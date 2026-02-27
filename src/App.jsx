import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/auth/Login";
// import Register from './pages/auth/Register'
import Dashboard from "./pages/Dashboard";
import TimeTracking from "./pages/TimeTracking/TimeTracking";
import TimeTrackingManagement from "./pages/TimeTracking/TimeTrackingManagement/TimeTrackingManagement";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Default → Login */}
        <Route path="/" element={<Navigate to="/login" replace />} />

        {/* Auth */}
        <Route path="/login" element={<Login />} />
        {/* <Route path="/register" element={<Register />} /> */}

        {/* App */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/time-tracking" element={<TimeTracking />} />
        <Route path="/time-tracking/management" element={<TimeTrackingManagement />} />

        {/* Catch-all */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
