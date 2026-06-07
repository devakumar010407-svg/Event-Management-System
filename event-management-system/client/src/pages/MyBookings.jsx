import { useEffect, useState } from "react";
import API from "../services/api";
import Navbar from "../components/Navbar";
import "./MyBookings.css";


function MyBookings() {

  const [bookings, setBookings] = useState([]);
  const [selectedBooking, setSelectedBooking] =
  useState(null);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {

    try {

      const token =
        localStorage.getItem("token");

      const res = await API.get(
        "/bookings/my",
        {
          headers: {
            Authorization:
              `Bearer ${token}`
          }
        }
      );
      
      console.log(res.data);
      setBookings(res.data);

    } catch (error) {
      console.log(error);
    }
  };

 return (
  <>
    <Navbar />

    <div className="bookings-container">

      <h1 className="bookings-title">
        My Bookings
      </h1>

      <div className="bookings-grid">

        {bookings.map((booking) => (

          <div
            className="booking-card"
            key={booking._id}
          >

            <h2>
              {booking.event.title}
            </h2>

            <p>
              📍 {booking.event.location}
            </p>

            <p>
              📅 {new Date(
                booking.event.date
              ).toLocaleDateString()}
            </p>

            <p className="ticket-count">
              🎟 Tickets: {booking.quantity}
            </p>

            <button
  className="ticket-btn"
  onClick={() => {

    console.log(booking);

    setSelectedBooking(booking);

  }}
>
  View Ticket
</button>
           

          </div>
           
        ))}
        
      </div>

    </div>

    {selectedBooking && (

      <div className="modal-overlay">

        <div className="ticket-modal">

          <h2>
            {selectedBooking.event.title}
          </h2>

          <p>
            📍 {selectedBooking.event.location}
          </p>

          <p>
            📅 {new Date(
              selectedBooking.event.date
            ).toLocaleDateString()}
          </p>

          <p>
            🎟 Tickets: {selectedBooking.quantity}
          </p>

          <img
            src={selectedBooking.qrCode}
            alt="QR Code"
            className="qr-image"
          />

          <button
            className="close-btn"
            onClick={() =>
              setSelectedBooking(null)
            }
          >
            Close
          </button>

        </div>

      </div>

    )}

  </>
);
}
export default MyBookings;