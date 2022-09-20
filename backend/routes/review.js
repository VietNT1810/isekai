const express = require("express");
const {
  createReview,
  getReview,
} = require("../controllers/reviewController.js");

const router = express.Router();

//add review
router.post("/add", createReview);

//get review
router.get("/:slug", getReview);

module.exports = router;
