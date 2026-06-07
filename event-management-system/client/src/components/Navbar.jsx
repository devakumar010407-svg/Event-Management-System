import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";

function Navbar() {

  const navigate = useNavigate();
  const role =
  localStorage.getItem("role");
  const handleLogout = () => {

    localStorage.removeItem("token");

    navigate("/login");

  };

  return (
    <nav className="navbar">

      <div className="logo">
        Event Manager
      </div>

      <div className="nav-links">

        <Link to="/events">
          Events
        </Link>

        <Link to="/bookings">
          My Bookings
        </Link>

        {role === "admin" && (
  <Link to="/dashboard">
    Dashboard
  </Link>
)}

        <Link to="/profile">
  Profile
</Link>


        <button
          className="logout-btn"
          onClick={handleLogout}
        >
          Logout
        </button>

      </div>

    </nav>
  );
}

export default Navbar;