const Order = require("../models/orderModel");
const Cart = require("../models/cartModel");

//create order
const createOrder = async (req, res) => {
  try {
    const { cartId, userId } = req.body;
    const cartDoc = await Cart.findOne({ cartId });
    const order = await Order.create({
      cart: cartId,
      user: userId,
      products: cartDoc.products,
    });
    res.status(200).json({ order });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//get all order
const getOrder = async (req, res) => {
  try {
    const orders = await Order.find().populate({
      path: "cart",
      populate: {
        path: "products.productId",
        model: "Product",
        select: ["name", "price", "productImage", "slug"],
      },
    });
    res.status(200).json({
      status: "SUCCESS",
      statusCode: 200,
      message: "Get orders success",
      data: { content: orders },
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//get my order
const myOrder = async (req, res) => {
  try {
    const userId = req.user._id;
    const orderDoc = await Order.find({ user: userId }).populate({
      path: "products.productId",
      model: "Product",
      select: ["name", "price", "productImage", "slug"],
    });
    res.status(200).json({
      status: "SUCCESS",
      statusCode: 200,
      message: "Get my orders success",
      data: { content: orderDoc },
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { createOrder, getOrder, myOrder };
