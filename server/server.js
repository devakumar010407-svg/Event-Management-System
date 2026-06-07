const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");


dotenv.config();

const connectDB = require("./config/db");
const app = express();
app.use(cors());
app.use(express.json());
const adminRoutes = require("./routes/adminRoutes");
const authRoutes = require("./routes/authRoutes");


connectDB();
app.use("/api/admin", adminRoutes);
app.use("/api/auth", authRoutes);


app.get("/", (req, res) => {
  res.send("Server is running");
});

app.use("/api/bookings", require("./routes/bookingRoutes"));

app.use(
  "/api/auth",
  require("./routes/authRoutes")
);

app.use("/api/events", require("./routes/eventRoutes"));

const PORT =
  process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(
    `Server running on ${PORT}`
  );
});