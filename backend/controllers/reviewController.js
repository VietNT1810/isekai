const Review = require("../models/reviewModel");
const Product = require("../models/productModel");

//add review
const createReview = async (req, res) => {
  const { product, review, rating } = req.body;
  const userId = req.user._id;

  try {
    const reviewDoc = await Review.create({
      product,
      user: userId,
      review,
      rating,
    });

    res.status(200).json(reviewDoc);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//get review info
const getReview = async (req, res) => {
  const { slug } = req.params;

  try {
    const productDoc = await Product.findOne({ slug });

    if (!productDoc) {
      return res.status(404).json({
        message: "No product found.",
      });
    }

    const reviews = await Review.find({ product: productDoc._id }).populate({
      path: "user",
      select: ["username", "avatar"],
    });

    res.status(200).json({
      status: "SUCCESS",
      statusCode: 200,
      message: "Get product success",
      data: {
        content: reviews,
      },
    });
  } catch (error) {}
};

module.exports = { createReview, getReview };
