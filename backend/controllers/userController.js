const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { cloudinary } = require("../utils/cloudinary");
const { OAuth2Client } = require("google-auth-library");
const { sendEmailReset } = require("../helpers/sendMail");

const createToken = (_id, secret, expiresIn) => {
  return jwt.sign({ _id }, secret, { expiresIn: expiresIn });
};

//verify google token
const verifyGoogleToken = async (token, client) => {
  const ticket = await client.verifyIdToken({
    idToken: token,
    requiredAudience : process.env.G_CLIENT_ID,
    // Specify the CLIENT_ID of the app that accesses the backend
    // Or, if multiple clients access the backend:
    //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
  });
  return ticket.getPayload();
  // If request specified a G Suite domain:
  // const domain = payload['hd'];
};

//login by google
const loginByGoogle = async (req, res) => {
  const token = req.query.id_token;
  const client = new OAuth2Client(process.env.G_CLIENT_ID);
  const googleProfile = await verifyGoogleToken(token, client).catch(
    console.log
  );
  if (googleProfile?.email_verified) {
    User.find({ email: googleProfile.email })
      .exec()
      .then(async (result) => {
        if (result.length < 1) {
          const salt = await bcrypt.genSalt(10);
          const hash = await bcrypt.hash(googleProfile.sub, salt);
          await User.create({
            username: googleProfile.name,
            email: googleProfile.email,
            password: hash,
            avatar: googleProfile.picture,
          });
          const user = await User.findOne({ email: googleProfile.email });
          const accessToken = createToken(
            user._id,
            process.env.ACCESS_TOKEN_SECRET,
            process.env.ACCESS_TOKEN_EXPIRE
          );
          res.status(200).json({
            email: user.email,
            accessToken,
            userId: user._id,
          });
        } else {
          const accessToken = createToken(
            result[0]._id,
            process.env.ACCESS_TOKEN_SECRET,
            process.env.ACCESS_TOKEN_EXPIRE
          );
          res.status(200).json({
            email: result[0].email,
            accessToken,
            userId: result[0]._id,
          });
        }
      })
      .catch((err) => {
        throw err;
      });
  } else {
    res.status(401).json({ auth: false, message: "Unauthorized" });
  }
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
    const userId = user._id;

    res.status(200).json({ email, accessToken, userId });
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

//Forgot  password
const forgotPassword = async (req, res) => {
  //get email
  const { email } = req.body;

  //check email exist
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(404).json({ message: "Địa chỉ email không tồn tại" });
  }

  //create access token
  const accessToken = createToken(
    user._id,
    process.env.ACCESS_TOKEN_SECRET,
    process.env.ACCESS_TOKEN_EXPIRE
  );

  //send mail
  const url = `${process.env.ISEKAI_BASE_URL}/reset-password/${accessToken}`;
  const name = user.username;
  sendEmailReset(email, url, "Thay đổi mật khẩu", name);

  //success
  res.status(200).json({
    message: "Đã gửi mail, vui lòng kiểm tra tài khoản email của bạn",
  });
};

module.exports = {
  loginUser,
  signupUser,
  getUserInfo,
  updateUserInfo,
  loginByGoogle,
  forgotPassword,
};
