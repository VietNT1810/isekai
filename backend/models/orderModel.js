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
    shipping: {
      type: Object,
      default: "Đang vận chuyển",
    },
    // total: {
    //   type: Number,
    //   default: 0,
    // },
    products: {
      type: Array,
      default: [],
    },
  },
  {
    collection: "orders",
    timestamps: true,
  }
);

module.exports = mongoose.model("Order", orderSchema);
