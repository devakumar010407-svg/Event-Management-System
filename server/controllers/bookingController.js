const Event = require("../models/Event");
const QRCode = require("qrcode");

exports.createBooking = async (req, res) => {
  try {
    const { eventId, quantity } = req.body;

    const event = await Event.findById(eventId);

    if (!event) {
      return res.status(404).json({
        message: "Event not found",
      });
    }

    if (event.availableSeats < quantity) {
      return res.status(400).json({
        message: "Not enough seats available",
      });
    }

    const booking = await Booking.create({
      user: req.user.id,
      event: eventId,
      quantity,
    });
    const qrData = JSON.stringify({
  bookingId: booking._id,
  userId: req.user.id,
  eventId: eventId,
  quantity: quantity
});
const qrCode = await QRCode.toDataURL(qrData);

booking.qrCode = qrCode;

await booking.save();
    event.availableSeats -= quantity;

    await event.save();

    res.status(201).json(booking);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
const Booking = require("../models/Booking");

exports.getMyBookings = async (req, res) => {
  try {

    const bookings = await Booking.find({
      user: req.user.id
    }).populate("event");

    res.status(200).json(bookings);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }
};
exports.verifyTicket = async (req, res) => {
  try {

    const booking = await Booking.findById(
      req.params.bookingId
    ).populate("event");

    if (!booking) {
      return res.status(404).json({
        valid: false,
        message: "Ticket not found"
      });
    }

    res.status(200).json({
      valid: true,
      booking
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }
};
exports.getAllBookings = async (req, res) => {
  try {

    const bookings = await Booking.find()
      .populate("user")
      .populate("event");

    res.json(bookings);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }
};
exports.getDashboardStats = async (req, res) => {
  try {

    const Booking = require("../models/Booking");
    const Event = require("../models/Event");
    const User = require("../models/User");

    const totalBookings =
      await Booking.countDocuments();

    const totalEvents =
      await Event.countDocuments();

    const totalUsers =
      await User.countDocuments();

    const bookings =
      await Booking.find().populate("event");

    let revenue = 0;

    bookings.forEach((booking) => {
      revenue +=
        booking.quantity *
        booking.event.price;
    });

    res.json({
      totalBookings,
      totalEvents,
      totalUsers,
      revenue
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }
};