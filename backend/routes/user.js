const express = require("express");
const {
  loginUser,
  signupUser,
  getUserInfo,
  updateUserInfo,
  loginByGoogle,
  forgotPassword,
  resetPassword,
  changePassword,
} = require("../controllers/userController.js");
const { requireAuth } = require("../middleware/middleware.js");

const router = express.Router();

//login
router.post("/login", loginUser);

//sign in by google
router.get("/google-auth", loginByGoogle);

//signup
router.post("/signup", signupUser);

//get user profile
router.get("/profile", requireAuth, getUserInfo);

//update user info
router.patch("/profile/update", requireAuth, updateUserInfo);

//forgot password
router.post("/forgot-password", forgotPassword);

//reset password
router.post("/reset-password", requireAuth, resetPassword);

//change password
router.post("/change-password", requireAuth, changePassword);

module.exports = router;
