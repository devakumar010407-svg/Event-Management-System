import { Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Events from "./pages/Events";
import MyBookings from "./pages/MyBookings";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";

function App() {
  return (
    <Routes>

      <Route path="/" element={<Events />} />

      <Route path="/login" element={<Login />} />

      <Route path="/register" element={<Register />} />

      <Route path="/bookings" element={<MyBookings />} />

      <Route path="/dashboard" element={<Dashboard />} />

      <Route path="/events" element={<Events />} />

      <Route
  path="/bookings"
  element={<MyBookings />}
/>

<Route
  path="/profile"
  element={<Profile />}
/>

    </Routes>
  );
}

export default App;