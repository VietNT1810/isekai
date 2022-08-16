const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const productSchema = new Schema(
  {
    name: {
      type: String,
      default: '',
      required: true,
    },
    fabric: {
      type: String,
      required: false,
    },
    size: {
      type: String,
      required: false,
    },
    description: {
      type: String,
      required: false,
    },
    detail: {
      type: String,
      required: false,
    },
    rating: {
      type: Number,
      required: false,
    },
    oldPrice: {
      type: Number,
      required: false,
    },
    currentPrice: {
      type: Number,
      required: false,
    },
    quantity: {
      type: Number,
      required: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('product', productSchema)