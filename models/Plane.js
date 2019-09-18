const mongoose = require("mongoose");
const { Schema } = mongoose;

const PlaneSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 8,
    unique: true
  },
  key: {
    type: String,
    required: true,
    minlength: 8,
    unique: true
  },
  business: {
    type: Number,
    required: true
  },
  economy: {
    type: Number,
    required: true
  },
  maxCargo: {
    type: Number,
    required: true
  }
});

const Plane = mongoose.model("Plane", PlaneSchema);

module.exports = { Plane };
