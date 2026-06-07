import { useEffect, useState } from "react";
import API from "../services/api";
import "./Events.css";
import Navbar from "../components/Navbar";

function Events() {
  const [events, setEvents] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchEvents();
  }, []);
  const [quantity, setQuantity] = useState(1);

  const fetchEvents = async () => {
    try {
      const res = await API.get("/events");
      setEvents(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  const handleBooking = async (eventId) => {
  try {

    const token =
      localStorage.getItem("token");

    const res = await API.post(
      "/bookings",
      {
        eventId,
        quantity: quantity
      },
      {
        headers: {
          Authorization:
            `Bearer ${token}`
        }
      }
    );

    alert("Booking Successful");

    console.log(res.data);

    fetchEvents();

  } catch (error) {

    console.log(error);

    alert(
      error.response?.data?.message ||
      "Booking Failed"
    );

  }
};
const filteredEvents = events.filter((event) =>
  event.title
    .toLowerCase()
    .includes(searchTerm.toLowerCase())
);

  return (
  <>
    <Navbar />

    <div className="events-container">

      <h1 className="events-title">
        Available Events
      </h1>
      <div className="search-container">

  <input
    type="text"
    placeholder="Search Events..."
    value={searchTerm}
    onChange={(e) =>
      setSearchTerm(e.target.value)
    }
    className="search-input"
  />

</div>

      <div className="events-grid">

        {filteredEvents.map((event) =>  (
          <div
            className="event-card"
            key={event._id}
          >

            <h2 className="event-title">
              {event.title}
            </h2>

            <p className="event-info">
              📍 {event.location}
            </p>

            <p className="event-info">
              📅 {new Date(event.date).toLocaleDateString()}
            </p>

            <p className="price">
              ₹{event.price}
            </p>

         <p className="event-info">
  🎟 Seats Left: {event.availableSeats}
</p>

<div className="quantity-box">

  <button
    className="qty-btn"
    onClick={() =>
      quantity > 1 &&
      setQuantity(quantity - 1)
    }
  >
    -
  </button>

  <span>{quantity}</span>

  <button
    className="qty-btn"
    onClick={() =>
      setQuantity(quantity + 1)
    }
  >
    +
  </button>

</div>

<button
  className="book-btn"
  onClick={() =>
    handleBooking(event._id)
  }
>
  Book Now
</button>

          </div>
        ))}

      </div>

    </div>
  </>
);
}

export default Events;