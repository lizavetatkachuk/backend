const mongoose = require("mongoose");

const AirportSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  code: {
    unique: true,
    type: String,
    required: true
  }
});

const Airport = mongoose.model("Airport", AirportSchema);
module.exports = { Airport };
