const express = require("express");
const {
  createReview,
  getReview,
} = require("../controllers/reviewController.js");
const { requireAuth } = require("../middleware/middleware.js");

const router = express.Router();

//add review
router.post("/add", requireAuth, createReview);

//get review
router.get("/:slug", getReview);

module.exports = router;
