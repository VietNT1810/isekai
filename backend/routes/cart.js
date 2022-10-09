const express = require("express");
const {
  addToCart,
  updateCart,
  getCart,
  removeCart,
} = require("../controllers/cartController");

const router = express.Router();

//add to cart
router.post("/add-to-cart", addToCart);

//update cart
router.put("/update", updateCart);

//get cart info
router.post("/get-cart", getCart);

//remove cart
router.delete("/remove", removeCart);

module.exports = router;
