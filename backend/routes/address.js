const express = require("express");
const {
  addAddress,
  getUserAddress,
  updateUserAddress,
  deleteUserAddress
} = require("../controllers/addressController.js");

const { requireAuth } = require("../middleware/middleware.js");

const router = express.Router();

//add address
router.post("/add", requireAuth, addAddress);

//get user address
router.get("/address", requireAuth, getUserAddress);

//update user address
router.patch("/update/:id", requireAuth, updateUserAddress);

//delete user address
router.delete("/delete/:id", requireAuth, deleteUserAddress)

module.exports = router;
