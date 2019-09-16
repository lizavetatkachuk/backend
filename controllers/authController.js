const { compare } = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { User } = require("../models/User");
const CONFIG = require("../config/index");
require("../db/mongoose");

const registerController = async (req, res) => {
  const { email, password, name } = req.body;
  const user = new User({
    email,
    password,
    name,
    role: "client"
  });
  await user.save(function(err) {
    if (err) {
      console.log(err);
      res.status(409).send("Email already in use");
    } else {
      res.send("");
    }
  });
};
module.exports.registerController = registerController;
const loginController = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    res.status(401).send("The user is not registered");
  } else {
    const msg = await compare(password, user.password);
    if (msg === true) {
      const token = jwt.sign(
        { userId: user._id.toString(), userRole: user.role },
        CONFIG.jwt_encryption
      );
      res.send({ token, user: { name: user.name } });
    } else res.status(401).send("Wrong password");
  }
};
module.exports.loginController = loginController;
