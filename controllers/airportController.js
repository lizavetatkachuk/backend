const jwt = require("jsonwebtoken");
const { Airport } = require("../models/Airport");
require("../db/mongoose");

const getAirports = async (req, res) => {
  const airports = await Airport.find();
  res.send(airports);
};
module.exports.getAirports = getAirports;

const postAirport = async (req, res) => {
  const airport = new Airport({
    ...req.body
  });
  await airport.save(async function(err) {
    if (err) {
      res.status(409).send("The airport already exists");
    } else {
      const airports = await Airport.find();
      res.send(airports);
    }
  });
};
module.exports.postAirport = postAirport;

const deleteAirport = async (req, res) => {
  const code = req.params.id;
  const airport = await Airport.findOneAndDelete({ code });
  const airports = await Airport.find();
  res.send(airports);
};
module.exports.deleteAirport = deleteAirport;
