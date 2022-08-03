const mongoose = require("mongoose");
const { Schema } = mongoose;

const FlightSchema = new mongoose.Schema({
  from: {
    type: Schema.Types.ObjectId,
    ref: "Airport",
    required: true
  },
  to: {
    type: Schema.Types.ObjectId,
    ref: "Airport",
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
    type: Schema.Types.ObjectId,
    ref: "Plane",
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
