const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

const requireAuth = async (req, res, next) => {
  let token;
  const authHeader = req.headers.authorization;

  if (authHeader && authHeader.startsWith("Bearer")) {
    try {
      // extract token from header
      token = authHeader.split(" ")[1];

      //decode token
      const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

      //find user by id and sign to req.user
      req.user = await User.findById(decoded._id).select("-password"); //.select("--password"): get all field except password field
      next();
    } catch (error) {
      res.status(401).json({
        message: "Not authorized, invalid token",
        code: "ERR_EXPIRED_TOKEN",
      });
    }
  }

  if (!token) {
    res.status(401).json({
      message: "Not authorized, no token found",
      code: "ERR_REQUIRE_TOKEN",
    });
  }
};

module.exports = { requireAuth };
