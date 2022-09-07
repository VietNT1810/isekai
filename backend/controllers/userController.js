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
  const { username, email, password } = req.body;

  try {
    const user = await User.signup(username, email, password);

    //create token
    const accessToken = createToken(
      user._id,
      process.env.ACCESS_TOKEN_SECRET,
      process.env.ACCESS_TOKEN_EXPIRE
    );

    // const refreshToken = createToken(
    //   user._id,
    //   process.env.REFRESH_TOKEN_SECRET,
    //   "1h"
    // ); //expires in 1h

    res.status(200).json({ email, accessToken });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

//user info
const getUserInfo = async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    const { _id, username, email, avatar } = user;
    res.status(200).json({
      userInfo: {
        _id,
        avatar,
        username,
        email,
      },
    });
  } else {
    res.status(400).json({ message: "User not found" });
  }
};

module.exports = { loginUser, signupUser, getUserInfo };
