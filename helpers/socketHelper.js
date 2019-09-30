require("../db/mongoose");
const jwt = require("jsonwebtoken");
const moment = require("moment");
const { Seats } = require("../models/Seats");
const { User } = require("../models/User");
const CONFIG = require("../config/index");

const removeOutdated = async data => {
  const decoded = jwt.verify(data.token, CONFIG.jwt_encryption);
  try {
    const user = await User.findById(decoded.userId);
    const now = moment();
    const seats = await Seats.find({ user, flight: data.flight });
    const currentSeats = seats.map(async seat => {
      if (
        moment(seat.date)
          .add(10, "minutes")
          .isAfter(now) === false
      ) {
        const outdated = await Seats.findByIdAndDelete(seat._id);
      }
    });
    return currentSeats;
  } catch (error) {
    return null;
  }
};
module.exports.removeOutdated = removeOutdated;
