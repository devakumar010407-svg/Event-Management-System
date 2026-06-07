const Event = require("../models/Event");

exports.createEvent = async (req, res) => {
  try {

    const {
      title,
      description,
      location,
      date,
      price,
      availableSeats
    } = req.body;

    const event =
      await Event.create({
        title,
        description,
        location,
        date,
        price,
        availableSeats
      });

    res.status(201).json(event);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }
};

exports.getEvents = async (req, res) => {
  try {

    const events =
      await Event.find();

    res.json(events);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }
};
