const jwt = require("jsonwebtoken");
const CONFIG = require("../config/index");

const getUser = async (req, res, next) => {
  const token = req.headers["authorization"];
  if (!token) return res.status(401).send("Access denied. No token provided.");
  try {
    const decoded = jwt.verify(token, CONFIG.jwt_encryption);
    req.user = decoded.userId;
    next();
  } catch (err) {
    res.status(400).send("Invalid token.");
  }
};
module.exports.getUser = getUser;
