const jwt = require("jsonwebtoken");
const { Order } = require("./../models/Order");
const { Flight } = require("./../models/Flight");
const { User } = require("./../models/User");
const CONFIG = require("../config/index");
require("../db/mongoose");

const getOrders = async (req, res) => {
  const token = req.headers["authorization"];
  const decoded = jwt.verify(token, CONFIG.jwt_encryption);
  const user = await User.findById(decoded.userId)
    .populate({ path: "orders", populate: { path: "flight" } })
    .exec((err, result) => {
      if (err) {
        res.send(err);
      } else {
        console.log(result);
        res.send(result);
      }
    });
};

module.exports.getOrders = getOrders;

const postOrder = async (req, res) => {
  const token = req.headers["authorization"];
  const { seats } = req.body;
  const order = new Order({
    ...req.body
  });
  const decoded = jwt.verify(token, CONFIG.jwt_encryption);
  const user = await User.findOne({ _id: decoded.userId });

  if (!user) res.status(401).send("Unauthorised");
  else {
    await order.save(async function(err) {
      if (err) {
        res.status(520).send("Failed to book");
      } else {
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
      }
    });
  }
};
module.exports.postOrder = postOrder;
