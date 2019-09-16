const mongoose = require("mongoose");

const FlightSchema = new mongoose.Schema({
  from: {
    trim: true,
    type: String,
    required: true
  },
  to: {
    type: String,
    required: true
  },
  time: {
    type: String,
    required: true
  },
  company: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  plane: {
    type: String,
    required: true
  },
  booked: [
    {
      type: String,
      required: true
    }
  ]
});

const Flight = mongoose.model("Flight", FlightSchema);

module.exports = { Flight };
