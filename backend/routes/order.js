const express = require("express");
const {
  createOrder,
  getOrder,
  myOrder,
} = require("../controllers/orderController");
const { requireAuth } = require("../middleware/middleware");

const router = express.Router();

//create order
router.post("/create", requireAuth, createOrder);

//get all order
router.get("/", requireAuth, getOrder);

//get my order
router.get("/me", requireAuth, myOrder);

module.exports = router;
