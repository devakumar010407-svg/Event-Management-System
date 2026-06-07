const User = require("../models/User");
const Event = require("../models/Event");
const Booking = require("../models/Booking");

exports.getDashboard = async (req, res) => {
  try {

    const totalUsers = await User.countDocuments();

    const totalEvents = await Event.countDocuments();

    const totalBookings = await Booking.countDocuments();

    const bookings = await Booking.find()
      .populate("event");

    let totalRevenue = 0;

    bookings.forEach((booking) => {
      totalRevenue += booking.quantity * booking.event.price;
    });

    res.json({
      totalUsers,
      totalEvents,
      totalBookings,
      totalRevenue
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }
};