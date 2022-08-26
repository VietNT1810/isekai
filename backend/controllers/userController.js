const User = require("../models/userModel");
const mongoose = require("mongoose");

//login user
const loginUser = async (req, res) => {
  
};

//signup user
const signupUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.signup(email, password);
    res.status(200).json({ email, user });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = { loginUser, signupUser };
