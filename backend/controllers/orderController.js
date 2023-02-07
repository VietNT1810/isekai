const Order = require("../models/orderModel");
const Cart = require("../models/cartModel");

//create order
const createOrder = async (req, res) => {
  try {
    const { cartId, addressId, method } = req.body;
    const userId = req.user._id;
    const cartDoc = await Cart.findOne({ cartId });

    const order = await Order.create({
      cart: cartId,
      user: userId,
      shipping: addressId,
      method: method,
      products: cartDoc.products,
      status: method === "cod" ? "shipping" : "awaiting_payment",
    });
    const cartUpdate = await Cart.findOneAndUpdate(
      { cartId },
      { $set: { status: "complete" } }
    );
    res.status(200).json({ message: "Tạo order thành công" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//get all order
const getOrder = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate({
        path: "cart",
        populate: {
          path: "products.productId",
          model: "Product",
          select: ["name", "price", "productImage", "slug"],
        },
      })
      .populate({
        path: "shipping",
        model: "Address",
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
    const orderStatus = req.query.status;
    const orderMatch = {
      user: userId,
      status: orderStatus,
    };
    if (orderStatus == "all") delete orderMatch.status;
    const orderDoc = await Order.find(orderMatch)
      .populate({
        path: "products.productId",
        model: "Product",
        select: ["name", "price", "productImage", "slug"],
      })
      .populate({
        path: "shipping",
        model: "Address",
        select: ["fullName", "city", "district", "ward", "telephone", "street"],
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
