const jwt = require("jsonwebtoken");
const { Flight } = require("./../models/Flight");
const { Order } = require("./../models/Order");
const { User } = require("./../models/User");
require("../db/mongoose");

const getFlights = async (req, res) => {
  try {
    const flights = await Flight.find();
    res.status(200).send(flights);
  } catch (err) {
    res.status(500).send(err);
  }
};
module.exports.getFlights = getFlights;

const getFlight = async (req, res) => {
  const id = req.params.id;
  try {
    const flight = await Flight.findById(id);
    res.status(200).send(flight);
  } catch (err) {
    res.status(500).send(err);
  }
};
module.exports.getFlight = getFlight;

const editFlight = async (req, res) => {
  try {
    const flight = await Flight.findOneAndUpdate(
      {
        _id: req.body._id
      },
      { ...req.body },
      { new: true }
    );
    res.status(201).send("Updated sucsessfully");
  } catch (err) {
    res.status(409).send("The flight doesn't exist");
  }
};
module.exports.editFlight = editFlight;

const searchFlights = async (req, res) => {
  const { from, to, there } = req.body;
  try {
    const flights = await Flight.find({ from, to, time: there });
    res.status(200).send(flights);
  } catch (error) {
    res.status(500).send(err);
  }
};
module.exports.searchFlights = searchFlights;

const postFlight = async (req, res) => {
  try {
    const flight = await new Flight({
      ...req.body
    }).save();
    res.status(201).send("Created sucsessfully");
  } catch (err) {
    res.status(500).send(err);
  }
};
module.exports.postFlight = postFlight;

const deleteFlight = async (req, res) => {
  const id = req.params.id;
  try {
    const flight = await Flight.findByIdAndDelete({ _id: id });
    const orders = await Order.deleteMany({ flight: flight._id });
    if (orders.length > 0) {
      orders.forEach(async order => {
        const userOrders = await User.updateMany(
          { orders: { $in: order._id } },
          { $pull: { orders: order._id } }
        );
      });
    }
    res.status(204).send("Deleted sucsessfully");
  } catch (err) {
    res.status(500).send(err);
  }
};

module.exports.deleteFlight = deleteFlight;
