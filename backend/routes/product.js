const express = require("express");
const {
  createProduct,
  getProducts,
  getSingleProduct,
  deleteProduct,
  updateProduct,
  getSearchProduct,
  getTabsProducts,
} = require("../controllers/productController");

const router = express.Router();

//GET all products
router.get("/", getProducts);

//GET all search product
router.get("/search/:name", getSearchProduct);

//GET tabs product
router.get("/tabs", getTabsProducts);

//GET a single product
router.get("/detail/:slug", getSingleProduct);

//POST a new product
router.post("/create", createProduct);

//DELETE a new product
router.delete("/delete/:id", deleteProduct);

//UPDATE a product
router.patch("/:id", updateProduct);

module.exports = router;
