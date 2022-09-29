const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const { cloudinary } = require("../utils/cloudinary");

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
      process.env.ACCESS_TOKEN_EXPIRE
    );

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
  const user = await User.findById(req.user._id).select("-password");

  if (user) {
    res.status(200).json({ user });
  } else {
    res.status(400).json({ message: "User not found" });
  }
};

//Update user info
const updateUserInfo = async (req, res) => {
  const { fullName, address, fileString } = req.body;

  try {
    // upload avatar to cloud
    const uploadedResponse = await cloudinary.uploader.upload(fileString, {
      upload_preset: "isekai_avatar",
    });

    //update profile to db
    const user = await User.findOneAndUpdate(
      req.user._id,
      {
        fullName: fullName,
        address: address,
        avatar: uploadedResponse.url,
      },
      { new: true }
    );
    res.status(200).json({ user });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = { loginUser, signupUser, getUserInfo, updateUserInfo };
