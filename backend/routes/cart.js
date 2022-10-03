const express = require("express");
const { addToCart, updateCart } = require("../controllers/cartController");

const router = express.Router();

//add to cart
router.post("/add-to-cart", addToCart);

//update cart
router.put("/update", updateCart);

module.exports = router;
