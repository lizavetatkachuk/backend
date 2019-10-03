const express = require("express");
const router = express.Router();
const {
  getFlights,
  postFlight,
  deleteFlight,
  editFlight
} = require("../controllers/flightController");

const {
  getAirports,
  postAirport,
  deleteAirport,
  editAirport
} = require("../controllers/airportController");

const {
  getPlanes,
  getPlane,
  postPlane,
  deletePlane,
  editPlane
} = require("../controllers/planeController");

router.get("/airports", getAirports);
router.post("/airports", postAirport);
router.patch("/airports", editAirport);
router.post("/airports/:id", deleteAirport);
router.get("/planes", getPlanes);
router.get("/planes/:id", getPlane);
router.post("/planes", postPlane);
router.patch("/planes", editPlane);
router.post("/planes/:id", deletePlane);
router.get("/flights", getFlights);
router.post("/flights/add", postFlight);
router.patch("/flights", editFlight);
router.post("/flights/:id", deleteFlight);

module.exports = router;
