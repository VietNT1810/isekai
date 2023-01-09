const mongoose = require("mongoose");
const { Schema } = mongoose;

const addressSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
    fullName: {
      type: String,
      default: "",
    },
    ward: {
      type: String,
      default: "",
    },
    ward_id: {
      type: String,
      default: "",
    },
    district: {
      type: String,
      default: "",
    },
    district_id: {
      type: String,
      default: "",
    },
    city: {
      type: String,
      default: "",
    },
    city_id: {
      type: String,
      default: "",
    },
    telephone: {
      type: String,
      default: "",
    },
    street: {
      type: String,
      default: "",
    },
    is_default: {
      type: Boolean,
      default: false,
    },
  },
  {
    collection: "addresses",
  }
);

module.exports = mongoose.model("Address", addressSchema);
