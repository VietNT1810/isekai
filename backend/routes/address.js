const express = require("express");
const {
  addAddress,
  getUserAddress,
  updateUserAddress,
} = require("../controllers/addressController.js");

const { requireAuth } = require("../middleware/middleware.js");

const router = express.Router();

//add address
router.post("/add", requireAuth, addAddress);

//get user address
router.get("/address", requireAuth, getUserAddress);

//update user address
router.patch("/update", requireAuth, updateUserAddress);

module.exports = router;
