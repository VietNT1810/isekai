const Product = require("../models/productModel");
const mongoose = require("mongoose");
const crypto = require("crypto");

//get all product
const getProducts = async (req, res) => {
  let { productType, min, max, rating } = req.query;
  rating = Number(rating);
  max = Number(max);
  min = Number(min);

  // let limit = Math.abs(req.query.limit) || 20;
  // let page = (Math.abs(req.query.page) || 1) - 1;

  //get database data
  // const products = await Product.find(filter)
  //   .limit(limit)
  //   .skip(page * limit);
  // const totalElement = await Product.find(filter).count();
  // const numberOfElements = await Product.find(filter).limit(limit).count();

  //check total page
  // let totalPage = Math.ceil(totalElement / limit);
  const priceFilter = min && max ? { $gte: min, $lte: max } : {};
  const ratingFilter = rating ? { $gte: rating } : { $gte: rating };

  const matchQuery = {
    price: priceFilter,
    averageRating: ratingFilter,
    productType,
  };

  if (!productType) {
    delete matchQuery.productType;
  }

  // console.log("matchQuery:", matchQuery);

  const products = await Product.aggregate([
    //calculate rating by review
    {
      $lookup: {
        from: "reviews",
        localField: "_id",
        foreignField: "product",
        as: "reviews",
      },
    },
    {
      $addFields: {
        totalRatings: { $sum: "$reviews.rating" },
        totalReviews: { $size: "$reviews" },
      },
    },
    {
      $addFields: {
        averageRating: {
          $cond: [
            { $eq: ["$totalReviews", 0] },
            0,
            { $round: [{ $divide: ["$totalRatings", "$totalReviews"] }, 1] },
          ],
        },
      },
    },
    { $unset: "reviews" },

    //query
    {
      $match: matchQuery,
    },
  ]);

  //response
  if (!products) {
    return res.status(404).json({ error: "No such product here!" });
  }

  res.status(200).json({
    status: "SUCCESS",
    statusCode: 200,
    message: "Get products success",
    data: {
      content: products,
      // pagination: {
      //   totalElement,
      //   totalPage,
      //   numberOfElements,
      // },
    },
  });
};

//get a single product
const getSingleProduct = async (req, res) => {
  const { slug } = req.params;
  const product = await Product.aggregate([
    //calculate rating by review
    {
      $lookup: {
        from: "reviews",
        localField: "_id",
        foreignField: "product",
        as: "reviews",
      },
    },
    {
      $addFields: {
        totalRatings: { $sum: "$reviews.rating" },
        totalReviews: { $size: "$reviews" },
      },
    },
    {
      $addFields: {
        averageRating: {
          $cond: [
            { $eq: ["$totalReviews", 0] },
            0,
            { $round: [{ $divide: ["$totalRatings", "$totalReviews"] }, 1] },
          ],
        },
      },
    },
    { $unset: "reviews" },

    //query
    {
      $match: { slug },
    },
  ]);

  if (!product) {
    return res.status(404).json({ error: "No such product here!" });
  }

  res.status(200).json({
    status: "SUCCESS",
    statusCode: 200,
    message: "Get product success",
    data: {
      content: product,
    },
  });
};

//create new product
const createProduct = async (req, res) => {
  const {
    productImage,
    name,
    fabric,
    size,
    description,
    detail,
    price,
    discount,
    quantity,
    productType,
  } = req.body;
  const slugUniqueId = crypto.randomBytes(5).toString("hex");

  //add doc to db
  try {
    const product = await Product.create({
      productImage,
      name,
      fabric,
      size,
      description,
      detail,
      price,
      discount,
      quantity,
      productType,
      slug: name.split(" ").concat(slugUniqueId).join("-"),
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
    return res.status(404).json({ error: "No such product here!" });
  }
  const product = await Product.findOneAndDelete({ _id: id });
  if (!product) {
    return res.status(404).json({ message: "No such product here!" });
  }
  res.status(200).json({ message: "Delete product successful" });
};

//update a product
const updateProduct = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such product here!" });
  }
  const product = await Product.findOneAndUpdate(
    { _id: id },
    {
      ...req.body,
    }
  );
  if (!product) {
    return res.status(404).json({ message: "No such product here!" });
  }
  res.status(200).json({ message: "Update product successful" });
};

module.exports = {
  createProduct,
  getProducts,
  getSingleProduct,
  deleteProduct,
  updateProduct,
};
