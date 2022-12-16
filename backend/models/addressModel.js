const mongoose = require("mongoose");
const { Schema } = mongoose;

const addressSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
    address: {
      type: String,
      default: "",
    },
    ward: {
      type: String,
      default: "",
    },
    district: {
      type: String,
      default: "",
    },
    city: {
      type: String,
      default: "",
    },
    phone: {
      type: String,
      default: "",
    },
    defaultAddress: {
      type: Boolean,
      default: false,
    },
  },
  {
    collection: "addresses",
  }
);

module.exports = mongoose.model("Address", addressSchema);
