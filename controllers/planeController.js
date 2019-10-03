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

const editPlane = async (req, res) => {
  try {
    const plane = await Plane.findOneAndUpdate(
      {
        key: req.body.key
      },
      { ...req.body },
      { new: true }
    );
    res.status(201).send("Updated sucsessfully");
  } catch (err) {
    res.status(409).send("The plane doesn't exist");
  }
};
module.exports.editPlane = editPlane;

const postPlane = async (req, res) => {
  try {
    const plane = await new Plane({
      ...req.body
    }).save();
    res.status(201).send("Created sucsessfully");
  } catch (err) {
    res.status(500).send("Plane credentials are not unique");
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
