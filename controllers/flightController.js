const jwt = require("jsonwebtoken");
const { Flight } = require("./../models/Flight");
require("../db/mongoose");

const getFlights = async (req, res) => {
  const flights = await Flight.find();
  res.send(flights);
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
  const flight = new Flight({
    ...req.body
  });
  res.status(200);
  console.log(flight);
  await flight.save(async function(err) {
    if (err) {
      console.log(err);
    }
  });
};
module.exports.postFlight = postFlight;

const deleteFlight = async (req, res) => {
  const id = req.params.id;
  const flight = await Flight.findByIdAndDelete({ _id: id });
  const flights = await Flight.find();
  res.send(flights);
};
module.exports.deleteFlight = deleteFlight;
