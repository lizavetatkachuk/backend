const express = require("express");
const router = express.Router();
const {
  getFlights,
  searchFlights,
  getFlight
} = require("./../controllers/flightController");

router.get("/", getFlights);
router.get("/:id", getFlight);
router.post("/", searchFlights);

module.exports = router;
