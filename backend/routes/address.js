const express = require("express");
const {
  addAddress,
  getUserAddress,
  updateUserAddress,
  getSingleAddress,
  deleteUserAddress,
} = require("../controllers/addressController.js");

const { requireAuth } = require("../middleware/middleware.js");

const router = express.Router();

//add address
router.post("/add", requireAuth, addAddress);

//get user addresses
router.get("/address", requireAuth, getUserAddress);

//get user address
router.get("/address/:id", requireAuth, getSingleAddress);

//edit user address
router.patch("/edit/:id", requireAuth, updateUserAddress);

//delete user address
router.delete("/delete/:id", requireAuth, deleteUserAddress);

module.exports = router;
