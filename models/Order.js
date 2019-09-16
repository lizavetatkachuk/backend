const mongoose = require("mongoose");
const { Schema } = mongoose;

const OrderSchema = new mongoose.Schema({
  flight: {
    type: Schema.Types.ObjectId,
    ref: "Flight"
  },
  seats: [
    {
      type: String,
      required: true
    }
  ],
  donation: {
    type: Boolean,
    default: false
  },
  luggage: {
    type: Number,
    default: 0
  },
  date: {
    type: Date,
    default: Date.now
  }
});

const Order = mongoose.model("Order", OrderSchema);

module.exports = { Order };
