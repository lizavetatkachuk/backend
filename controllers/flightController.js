const jwt = require("jsonwebtoken");
const { Flight } = require("./../models/Flight");
require("../db/mongoose");

const getFlights = async (req, res) => {
  try {
    const flights = await Flight.find();
    res.send(flights);
  } catch (err) {
    res.status(500).send(error);
  }
};
module.exports.getFlights = getFlights;

const searchFlights = async (req, res) => {
  const { from, to, there } = req.body;
  console.log(from, to, there);
  try {
    const flights = await Flight.find({ from, to, time: there });
    res.send(flights);
  } catch (error) {
    res.status(500).send(error);
  }
};
module.exports.searchFlights = searchFlights;

const postFlight = async (req, res) => {
  try {
    const flight = new Flight({
      ...req.body
    }).save();
    res.status(200);
  } catch (err) {
    res.status(500).send(error);
  }
};
module.exports.postFlight = postFlight;

const deleteFlight = async (req, res) => {
  const id = req.params.id;
  try {
    const flight = await Flight.findByIdAndDelete({ _id: id });
    const flights = await Flight.find();
    res.send(flights);
  } catch (err) {
    res.status(500).send(error);
  }
};

module.exports.deleteFlight = deleteFlight;
