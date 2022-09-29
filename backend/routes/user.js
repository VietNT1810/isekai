const express = require("express");
const {
  loginUser,
  signupUser,
  getUserInfo,
  updateUserInfo,
} = require("../controllers/userController.js");
const { requireAuth } = require("../middleware/middleware.js");

const router = express.Router();

//login
router.post("/login", loginUser);

//signup
router.post("/signup", signupUser);

//get user profile
router.route("/profile").get(requireAuth, getUserInfo);

//update user info
router.route("/profile/update").patch(requireAuth, updateUserInfo);

module.exports = router;
