const Order = require("../models/orderModel");
const Cart = require("../models/cartModel");
const Address = require("../models/addressModel");

//create order
const createOrder = async (req, res) => {
  try {
    const { cartId, addressId, method } = req.body;
    const userId = req.user._id;
    const cartDoc = await Cart.findOne({ _id: cartId });
    const addressDoc = await Address.findOne({ _id: addressId }).select([
      "-_id",
      "-user",
      "-is_default",
    ]);

    // create order
    await Order.create({
      cart: cartId,
      user: userId,
      shipping: addressDoc,
      method: method,
      products: cartDoc.products,
      status: method === "cod" ? "shipping" : "awaiting_payment",
    });

    // update cart status
    await Cart.findOneAndUpdate(
      { _id: cartId },
      { $set: { status: "complete" } }
    );
    res.status(200).json({ message: "Tạo đơn hàng thành công" });
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

//get single order
const getSingleOrder = async (req, res) => {
  try {
    const { orderId } = req.params;
    const order = await Order.findOne({ _id: orderId }).populate({
      path: "products.productId",
      model: "Product",
      select: ["name", "price", "productImage", "slug"],
    });

    res.status(200).json({
      status: "SUCCESS",
      statusCode: 200,
      message: "Get order success",
      data: { content: order },
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
    const orderDoc = await Order.find(orderMatch).populate({
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

//cancel order
const cancelOrder = async (req, res) => {
  try {
    const { cartId } = req.body;
    const { orderId } = req.params;
    //update cart status
    await Cart.findOneAndUpdate(
      { _id: cartId },
      { $set: { status: "canceled" } }
    );
    await Order.findOneAndUpdate(
      { _id: orderId },
      { $set: { status: "canceled" } }
    );
    res.status(200).json({ message: "Hủy đơn hàng thành công" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  createOrder,
  getOrder,
  myOrder,
  cancelOrder,
  getSingleOrder,
};
