const jwt = require("jsonwebtoken");
const { Airport } = require("../models/Airport");
require("../db/mongoose");

const getAirports = async (req, res) => {
  const airports = await Airport.find();
  res.send(airports);
};
module.exports.getAirports = getAirports;

const postAirport = async (req, res) => {
  try {
    const airport = await new Airport({
      ...req.body
    }).save(err => {
      if (err) res.status(409).send("The airport already exists");
      else res.status(201).send("Created sucsessfully");
    });
  } catch (err) {
    res.status(409).send("The airport already exists");
  }
};
module.exports.postAirport = postAirport;

const deleteAirport = async (req, res) => {
  const code = req.params.id;
  try {
    const airport = await Airport.findOneAndDelete({ code });
    res.status(200).send("Deleted sucsessfully");
  } catch (err) {
    res.status(500).send("Internal server error");
  }
};
module.exports.deleteAirport = deleteAirport;
