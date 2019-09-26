const mongoose = require("mongoose");
const { Schema } = mongoose;

const SeatsSchema = new mongoose.Schema({
  flight: {
    type: Schema.Types.ObjectId,
    ref: "Flight"
  },
  seat: 
    {
      type: String,
      required: true
    }
  ,
  user: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },  
  date: {
    type: Date,
  }
});

const Seats = mongoose.model("Seats",SeatsSchema);

module.exports = { Seats };
