const Cart = require("../models/cartModel");
const Product = require("../models/productModel");

//Add to cart
const addToCart = async (req, res) => {
  const { userId, productId, quantity } = req.body;

  try {
    const stock = await Product.updateOne(
      {
        _id: productId,
        quantity: { $gte: quantity }, //kiem tra xem con hang khong
      },
      {
        $inc: {
          quantity: -quantity, //tru quantity
        },
      }
    );

    if (!stock.modifiedCount) {
      return res.status(404).json({ message: "Không còn hàng" });
    }

    const cart = await Cart.findOneAndUpdate(
      {
        userId,
      },
      {
        $push: {
          products: {
            productId,
            quantity,
          },
        },
      },
      {
        upsert: true,
        new: true,
      }
    );

    return res.status(200).json({ cart });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//Update cart
const updateCart = async (req, res) => {
  const { userId, productId, quantity } = req.body;
  try {
    var oldQuantity = 0;
    var newQuantity = quantity;
    const cart = await Cart.findOne({
      userId,
    });

    for (var i = 0; i < cart.products.length; i++) {
      if (cart.products[i].productId == productId) {
        oldQuantity = cart.products[i].quantity;
      }
    }

    let delta = newQuantity - oldQuantity;

    //update cart quantity
    await Cart.updateOne(
      {
        userId,
        "products.productId": productId,
      },
      {
        $set: {
          "products.$.quantity": newQuantity,
        },
      }
    );

    //update product quantity
    await Product.updateOne(
      {
        _id: productId,
        quantity: {
          $gte: delta,
        },
      },
      {
        $inc: { quantity: -delta },
      }
    );
    res
      .status(200)
      .json({ message: "update success", delta, oldQuantity, newQuantity });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//get cart
const getCart = async (req, res) => {
  const { userId } = req.body;
  try {
    const cart = await Cart.findOne({ userId }).populate({
      path: "products",
      populate: {
        path: "productId",
        model: "Product",
        select: ["name", "price", "productImage"],
      },
    });
    res.status(200).json({ cart });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { addToCart, updateCart, getCart };
