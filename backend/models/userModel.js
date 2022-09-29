const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require("validator");

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
      required: false,
    },
    fullName: {
      type: String,
      required: false,
      default: "",
    },
    address: {
      type: String,
      required: false,
      default: "",
    },
    gender: {
      type: String,
      required: false,
      default: "",
    },
  },
  { timestamps: true }
);

// static signup method
userSchema.statics.signup = async function (username, email, password) {
  const exists = await this.findOne({ email });

  //validate
  if (!username || !email || !password) {
    throw Error("All field is required");
  }

  if (!validator.isEmail(email)) {
    throw Error("Invalid email");
  }

  if (!validator.isStrongPassword(password)) {
    throw Error("Password not strong enough");
  }

  if (exists) {
    throw Error("Email already in use");
  }

  //hash password
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);
  const user = this.create({ username, email, password: hash });
  return user;
};

//static login method
userSchema.statics.login = async function (email, password) {
  const user = await this.findOne({ email });
  //validate
  if (!email || !password) {
    throw Error("All field is required");
  }
  if (!user) {
    throw Error("Invalid email address");
  }
  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    throw Error("Invalid password");
  }
  return user;
};

module.exports = mongoose.model("User", userSchema);
