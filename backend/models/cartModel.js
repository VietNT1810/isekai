const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const cartSchema = new Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    products: {
      type: Array,
      required: true,
      default: [],
    },
    status: {
      type: String,
      default: "active",
      enum: ["active", "complete", "canceled", "deleted"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Cart", cartSchema);
