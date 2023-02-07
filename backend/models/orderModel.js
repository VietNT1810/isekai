const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const orderSchema = new Schema(
  {
    cart: {
      type: Schema.Types.ObjectId,
      ref: "Cart",
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    products: {
      type: Array,
      default: [],
    },
    shipping: {
      type: Schema.Types.ObjectId,
      ref: "Address",
    },
    method: {
      type: String,
      require: true,
      default: "",
    },
    status: {
      type: String,
      enum: ["awaiting_payment", "shipping", "completed", "canceled"],
    },
  },
  {
    collection: "orders",
    timestamps: true,
  }
);

module.exports = mongoose.model("Order", orderSchema);
