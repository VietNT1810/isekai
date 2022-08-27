const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

const createToken = (_id, secret, expiresIn) => {
  return jwt.sign({ _id }, secret, { expiresIn: expiresIn });
};

//login user
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.login(email, password);

    //create token
    const accessToken = createToken(
      user._id,
      process.env.ACCESS_TOKEN_SECRET,
      "20s"
    ); //expires in 20s

    res.status(200).json({ email, accessToken });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

//signup user
const signupUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.signup(email, password);

    //create token
    const accessToken = createToken(
      user._id,
      process.env.ACCESS_TOKEN_SECRET,
      "20s"
    ); //expires in 20s
    const refreshToken = createToken(
      user._id,
      process.env.REFRESH_TOKEN_SECRET,
      "1h"
    ); //expires in 1h

    res.status(200).json({ email, accessToken, refreshToken });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = { loginUser, signupUser };
