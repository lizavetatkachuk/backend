const express = require("express");
const router = express.Router();
const {
  getFlights,
  searchFlights
} = require("./../controllers/flightController");

router.get("/", getFlights);
router.post("/", searchFlights);

module.exports = router;
