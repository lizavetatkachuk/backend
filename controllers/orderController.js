const jwt = require("jsonwebtoken");
const { Order } = require("./../models/Order");
const { Flight } = require("./../models/Flight");
const { User } = require("./../models/User");
const CONFIG = require("../config/index");
require("../db/mongoose");

const getOrders = async (req, res) => {
  const token = req.headers["authorization"];
  const decoded = jwt.verify(token, CONFIG.jwt_encryption);

  try {
    const user = await User.findById(decoded.userId)
      .populate({ path: "orders", populate: { path: "flight" } })
      .exec((err, result) => {
        res.status(200).send(result);
      });
  } catch (err) {
    res.status(500).send(err);
  }
};

module.exports.getOrders = getOrders;

const postOrder = async (req, res) => {
  const token = req.headers["authorization"];
  const { seats } = req.body;

  const decoded = jwt.verify(token, CONFIG.jwt_encryption);
  try {
    const user = await User.findOne({ _id: decoded.userId });
    if (!user) res.status(401).send("Unauthorised");
  } catch (err) {
    res.status(401).send("Unauthorised");
  }
  try {
    const order = await new Order({
      ...req.body
    }).save(err => {
      res.status(501).send(err);
    });
  } catch (err) {
    res.status(501).send("Wrong data");
  }

  try {
    const updatedUser = await User.findOneAndUpdate(
      { _id: decoded.userId },
      { $push: { orders: order._id } },
      { new: true }
    );
    const updatedFlight = await Flight.findOneAndUpdate(
      { _id: req.body.flight },
      { $push: { booked: seats } },
      { new: true }
    );
    res.status(201).send("Created sucsessfully");
  } catch (err) {
    res.status(520).send("Failed to book");
  }
};

module.exports.postOrder = postOrder;
