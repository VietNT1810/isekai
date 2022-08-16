const Product = require("../models/productModel");
const mongoose = require('mongoose')

//get all product
const getProducts = async (req, res) => {
  const products = await Product.find({});
  res.status(200).json(products);
};

//get a single product
const getSingleProduct = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: "No such product here!"})
  }
  const product = await Product.findById(id);
  if (!product) {
    return res.status(404).json({error: "No such product here!"})
  }
  res.status(200).json(product);
};

//create new product
const createProduct = async (req, res) => {
  const {
    name,
    fabric,
    size,
    description,
    detail,
    rating,
    oldPrice,
    currentPrice,
    quantity,
  } = req.body;

  //add doc to db
  try {
    const product = await Product.create({
      name,
      fabric,
      size,
      description,
      detail,
      rating,
      oldPrice,
      currentPrice,
      quantity,
    });

    res.status(200).json(product);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//delete a product
const deleteProduct = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: "No such product here!"})
  }
  const product = await Product.findOneAndDelete({_id: id});
  if (!product) {
    return res.status(404).json({message: "No such product here!"})
  }
  res.status(200).json({message: "Delete product successful"});
};

//update a product
const updateProduct = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: "No such product here!"})
  }
  const product = await Product.findOneAndUpdate({_id: id}, {
    ...req.body
  });
  if (!product) {
    return res.status(404).json({message: "No such product here!"})
  }
  res.status(200).json({message: "Update product successful"});
};

module.exports = { createProduct, getProducts, getSingleProduct, deleteProduct, updateProduct };
