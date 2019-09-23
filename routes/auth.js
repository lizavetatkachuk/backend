const express = require("express");
const router = express.Router();
const {
  registerController,
  loginController
} = require("./../controllers/authController");

router.post("/register", registerController);
router.post("/login", loginController);
router.get("/getUser", async function(req, res, next) {
  const token = req.headers["Authorisation"];
});
module.exports = router;
