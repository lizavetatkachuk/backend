const mongoose = require("mongoose");
const { Schema } = mongoose;

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    minlength: 8,
    trim: true,
    unique: true
  },
  password: {
    type: String,
    require: true,
    minlength: 8
  },
  name: {
    type: String,
    required: true,
    minlength: 2,
    trim: true
  },
  role: {
    type: String,
    required: true
  },
  orders: [
    {
      type: Schema.Types.ObjectId,
      ref: "Order"
    }
  ]
});

const User = mongoose.model("User", UserSchema);

module.exports = { User };
