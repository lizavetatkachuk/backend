const jwt = require("jsonwebtoken");
const { Plane } = require("./../models/Plane");
require("../db/mongoose");

const getPlanes = async (req, res) => {
  try {
    const planes = await Plane.find();
    res.status(200).send(planes);
  } catch (err) {
    res.status(500).send(err);
  }
};
module.exports.getPlanes = getPlanes;

const getPlane = async (req, res) => {
  const id = req.params.id;
  try {
    const plane = await Plane.findOne({ key: id });
    res.status(200).send(plane);
  } catch (err) {
    res.status(500).send(err);
  }
};
module.exports.getPlane = getPlane;

const postPlane = async (req, res) => {
  try {
    const plane = new Plane({
      ...req.body
    }).save(err => {
      if (err) res.status(500).send("Plane credentials are not unique");
      else res.status(201).send("Created sucsessfully");
    });
  } catch (err) {
    res.status(500).send(err);
  }
};
module.exports.postPlane = postPlane;

const deletePlane = async (req, res) => {
  const id = req.params.id;
  try {
    const plane = await Plane.findOneAndDelete({ key: id });
    res.status(204).send("Deleted sucsessfully");
  } catch (err) {
    res.status(500).send(err);
  }
};
module.exports.deletePlane = deletePlane;
