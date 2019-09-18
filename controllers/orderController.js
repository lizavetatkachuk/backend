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

    const order = await new Order({
      ...req.body
    });
    order.save(err => {
      if (err) res.status(501).send(err);
    });

    const updatedUser = await User.findOneAndUpdate(
      { _id: decoded.userId },
      { $push: { orders: order._id } },
      { new: true }
    );
    if (!updatedUser) res.status(520).send("Failed update user info");
    const updatedFlight = await Flight.findOneAndUpdate(
      { _id: req.body.flight },
      { $push: { booked: seats } },
      { new: true }
    );
    if (updatedFlight && updatedUser)
      res.status(201).send("Created sucsessfully");
    else res.status(520).send("Failed update seats in the flight");
  } catch (err) {
    res.status(500).send("Internal server error");
  }
};

module.exports.postOrder = postOrder;
