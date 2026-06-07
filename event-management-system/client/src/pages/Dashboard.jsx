import { useEffect, useState } from "react";
import API from "../services/api";
import Navbar from "../components/Navbar";
import "./Dashboard.css"
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();
  const [stats, setStats] =
    useState({});

 useEffect(() => {

  const role =
    localStorage.getItem("role");

  if (role !== "admin") {
    navigate("/events");
    return;
  }

  fetchStats();

}, []);
  const [showModal, setShowModal] =
  useState(false);

const [formData, setFormData] =
  useState({
    title: "",
    description: "",
    location: "",
    date: "",
    price: "",
    availableSeats: ""
  });
  const handleChange = (e) => {

  setFormData({
    ...formData,
    [e.target.name]:
      e.target.value
  });

};

  const fetchStats = async () => {

    const token =
      localStorage.getItem("token");

    const res = await API.get(
      "/bookings/dashboard",
      {
        headers: {
          Authorization:
            `Bearer ${token}`
        }
      }
    );

    setStats(res.data);
  };
  const handleCreateEvent =
async (e) => {

  e.preventDefault();

  try {

    const token =
      localStorage.getItem("token");

    await API.post(
      "/events",
      formData,
      {
        headers: {
          Authorization:
            `Bearer ${token}`
        }
      }
    );

    alert(
      "Event Created Successfully"
    );

    setShowModal(false);

    fetchStats();

  } catch (error) {

    console.log(error);

    alert(
      error.response?.data?.message ||
      "Failed to create event"
    );

  }

};

  return (
    <>
      <Navbar />

      <div className="dashboard">

        <h1 className="dsh">
          Admin Dashboard
        </h1>

      <div className="stats-grid">

  <div className="stat-card">
    <div className="stat-label">
      📅 Total Events
    </div>

    <div className="stat-value">
      {stats.totalEvents || 0}
    </div>

    <button
      className="add-event-btn"
      onClick={() => setShowModal(true)}
    >
      + Add Event
    </button>
  </div>

  <div className="stat-card">
    <div className="stat-label">
      🎟 Total Bookings
    </div>

    <div className="stat-value">
      {stats.totalBookings || 0}
    </div>
  </div>

  <div className="stat-card">
    <div className="stat-label">
      👥 Total Users
    </div>

    <div className="stat-value">
      {stats.totalUsers || 0}
    </div>
  </div>

  <div className="stat-card">
    <div className="stat-label">
      💰 Revenue
    </div>

    <div className="stat-value">
      ₹{stats.totalRevenue || 0}
    </div>
  </div>

</div>
      </div>
      {showModal && (

<div className="modal-overlay">

  <div className="event-modal">

    <h2 className="addbutton">Add Event</h2>

    <form
      onSubmit={
        handleCreateEvent
      }
    >

      <input
        type="text"
        name="title"
        placeholder="Title"
        onChange={handleChange}
      />

      <input
        type="text"
        name="description"
        placeholder="Description"
        onChange={handleChange}
      />

      <input
        type="text"
        name="location"
        placeholder="Location"
        onChange={handleChange}
      />

      <input
        type="date"
        name="date"
        onChange={handleChange}
      />

      <input
        type="number"
        name="price"
        placeholder="Price"
        onChange={handleChange}
      />

      <input
        type="number"
        name="availableSeats"
        placeholder="Available Seats"
        onChange={handleChange}
      />

     <div className="modal-buttons">

  <button
    type="submit"
    className="create-btn"
  >
    Create Event
  </button>

  <button
    type="button"
    className="cancel-btn"
    onClick={() => setShowModal(false)}
  >
    Cancel
  </button>

</div>
    </form>

  </div>

</div>

)}
    </>
  );
}

export default Dashboard;