const express = require("express");
const {
  createProduct,
  getProducts,
  getSingleProduct,
  deleteProduct,
  updateProduct
} = require("../controllers/productController");

const router = express.Router();

//GET all products
router.get("/", getProducts);

//GET a single product
router.get("/detail/:id", getSingleProduct);

//POST a new product
router.post("/create", createProduct);

//DELETE a new product
router.delete("/delete/:id", deleteProduct);

//UPDATE a product
router.patch("/:id", updateProduct);

module.exports = router;