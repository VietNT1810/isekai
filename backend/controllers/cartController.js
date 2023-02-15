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
        status: "active",
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
  const { userId, status } = req.body;
  try {
    const cart = await Cart.findOne({ userId, status }).populate({
      path: "products",
      populate: {
        path: "productId",
        model: "Product",
        select: ["name", "price", "productImage", "slug"],
      },
    });
    if (!cart) {
      return res.status(404).json({ error: "No such cart here!" });
    }
    res.status(200).json({ cart });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//remove cart
const removeCart = async (req, res) => {
  const { cartId, productId, quantity } = req.body;

  try {
    await Cart.findOneAndUpdate(
      { _id: cartId },
      {
        $pull: {
          products: {
            productId: productId,
          },
        },
      }
    );
    await Product.updateOne(
      {
        _id: productId,
      },
      {
        $inc: {
          quantity: quantity,
        },
      }
    );
    res.status(200).json({ message: "Remove successful" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { addToCart, updateCart, getCart, removeCart };
