const express = require("express");
const router = express.Router();
const { getUser } = require("./../middlewares/authMiddleware");
const { getOrders, postOrder } = require("./../controllers/orderController");

router.get("/", getUser, getOrders);
router.post("/", postOrder);

module.exports = router;
