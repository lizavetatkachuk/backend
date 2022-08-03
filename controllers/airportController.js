const jwt = require("jsonwebtoken");
const { Airport } = require("../models/Airport");
const { Flight } = require("../models/Flight");
require("../db/mongoose");

const getAirports = async (req, res) => {
  const airports = await Airport.find();
  res.send(airports);
};
module.exports.getAirports = getAirports;

const editAirport = async (req, res) => {
  const { name, code, _id } = req.body;
  try {
    const airport = await Airport.findByIdAndUpdate(
      _id,
      { name, code },
      { upsert: false }
    );
    res.status(201).send("Updated sucsessfully");
  } catch (err) {
    res.status(409).send("The airport doesn't exist");
  }
};
module.exports.editAirport = editAirport;

const postAirport = async (req, res) => {
  try {
    const airport = await new Airport({
      ...req.body
    }).save();
    res.status(201).send("Created sucsessfully");
  } catch (err) {
    res.status(409).send("The airport already exists");
  }
};
module.exports.postAirport = postAirport;

const deleteAirport = async (req, res) => {
  const code = req.params.id;
  try {
    const airport = await Airport.findOneAndDelete({ code });
    const flights = await Flight.deleteMany({})
      .populate({ path: "from", match: { _id: airport._id } })
      .populate({ path: "to", match: { _id: airport._id } });
    res.status(204).send("Deleted sucsessfully");
  } catch (err) {
    res.status(500).send("Internal server error");
  }
};
module.exports.deleteAirport = deleteAirport;
