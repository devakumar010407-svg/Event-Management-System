const express = require("express");

const router = express.Router();

const protect = require("../middleware/authMiddleware");
const admin = require("../middleware/adminMiddleware");
const {
  createBooking,
  getMyBookings,
   verifyTicket,
   getAllBookings,
   getDashboardStats
} = require("../controllers/bookingController");
router.get(
  "/dashboard",
  protect,
  admin,
  getDashboardStats
);
router.get(
  "/verify/:bookingId",
  verifyTicket
);
router.get(
  "/all",
  protect,
  admin,
  getAllBookings
);
router.get("/my", protect, getMyBookings);
router.post("/", protect, createBooking);

module.exports = router;