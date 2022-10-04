const express = require("express");
const {
  addToCart,
  updateCart,
  getCart,
} = require("../controllers/cartController");

const router = express.Router();

//add to cart
router.post("/add-to-cart", addToCart);

//update cart
router.put("/update", updateCart);

//get cart info
router.get("/get-cart", getCart);

module.exports = router;
