const jwt = require("jsonwebtoken");
const { Flight } = require("./../models/Flight");
require("../db/mongoose");

const getFlights = async (req, res) => {
  try {
    const flights = await Flight.find();
    res.status(200).send(flights);
  } catch (err) {
    res.status(500).send(error);
  }
};
module.exports.getFlights = getFlights;

const searchFlights = async (req, res) => {
  const { from, to, there } = req.body;
  try {
    const flights = await Flight.find({ from, to, time: there });
    res.status(201).send(flights);
  } catch (error) {
    res.status(500).send(error);
  }
};
module.exports.searchFlights = searchFlights;

const postFlight = async (req, res) => {
  try {
    const flight = new Flight({
      ...req.body
    }).save(err => {
      res.status(500).send(error);
    });
    res.status(200).send("Created sucsessfully");
  } catch (err) {
    res.status(500).send(error);
  }
};
module.exports.postFlight = postFlight;

const deleteFlight = async (req, res) => {
  const id = req.params.id;
  try {
    const flight = await Flight.findByIdAndDelete({ _id: id });
    res.status(204).send("Deleted sucsessfully");
  } catch (err) {
    res.status(500).send(error);
  }
};

module.exports.deleteFlight = deleteFlight;
