require("../db/mongoose");
const jwt = require("jsonwebtoken");
const moment = require("moment");
const { Seats } = require("../models/Seats");
const { User } = require("../models/User");
const CONFIG = require("../config/index");

module.exports = async socket => {
  socket.join("seat booking room");

  socket.on("connected", async () => {
    try {
      const now = moment();
      const seats = await Seats.find();
      const currentSeats = seats.filter(seat => {
        return moment(seat.date)
          .add(15, "minutes")
          .isAfter(now);
      });
      socket.emit("seats:found", { seats: currentSeats });
    } catch (err) {
      socket.emit("seats:notfound:error");
    }
  });

  socket.on("seat:choose", async data => {
    const decoded = jwt.verify(data.token, CONFIG.jwt_encryption);
    try {
      const user = await User.findById(decoded.userId);
      const now = moment();
      if (!user) socket.emit("auth:error");
      else {
        const seats = await new Seats({
          flight: data.flight,
          user: user,
          seat: data.seat,
          date: now
        });
        seats.save();
        socket.broadcast
          .to("seat booking room")
          .emit("seat:frozen", { seat: seats.seat });
      }
    } catch (err) {
      socket.emit("seat:choose:error");
    }
  });
};
