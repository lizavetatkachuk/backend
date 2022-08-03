const createError = require("http-errors");
const express = require("express");
const logger = require("morgan");
const CONFIG = require("./config/index");

const io = require("socket.io")();

const flightRouter = require("./routes/flight");
const authRouter = require("./routes/auth");
const orderRouter = require("./routes/order");
const adminRouter = require("./routes/admin");

const socket = require("./socket/socket");

const app = express();

io.listen("8000");
io.on("connection", socket);

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/auth", authRouter);
app.use("/flight", flightRouter);
app.use("/order", orderRouter);
app.use("/admin", adminRouter);

app.use(function(req, res, next) {
  next(createError(404));
});

app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};
  res.status(err.status || 500);
});
app.listen(CONFIG.port, () => console.log(`App started on ${CONFIG.port}`));

module.exports = app;
