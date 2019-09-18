const { compare } = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { User } = require("../models/User");
const CONFIG = require("../config/index");
require("../db/mongoose");

const registerController = async (req, res) => {
  const { email, password, name } = req.body;
  try {
    const user = await new User({
      email,
      password,
      name,
      role: "client"
    }).save(err => {
      if (err) res.status(406).send("Email already in use");
      else res.status(201).send("Created sucsessfully");
    });
  } catch (err) {
    res.status(500).send(err);
  }
};

module.exports.registerController = registerController;

const loginController = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      res.status(401).send("The user is not registered");
    } else {
      const msg = await compare(password, user.password);
      if (msg) {
        const token = jwt.sign(
          { userId: user._id.toString(), userRole: user.role },
          CONFIG.jwt_encryption
        );
        res.status(200).send({ token, user: { name: user.name } });
      } else res.status(401).send("Wrong password");
    }
  } catch (err) {
    res.status(500).send("Internal server error");
  }
};

module.exports.loginController = loginController;
