const express = require("express");
const router = express.Router();
const {
  getFlights,
  postFlight,
  deleteFlight
} = require("../controllers/flightController");

const {
  getAirports,
  postAirport,
  deleteAirport
} = require("../controllers/airportController");

const {
  getPlanes,
  postPlane,
  deletePlane
} = require("../controllers/planeController");

router.get("/airports", getAirports);
router.post("/airports", postAirport);
router.post("/airports/:id", deleteAirport);
router.get("/planes", getPlanes);
router.post("/planes", postPlane);
router.post("/planes/:id", deletePlane);
router.get("/flights", getFlights);
router.post("/flights/add", postFlight);
router.post("/flights/:id", deleteFlight);

module.exports = router;
