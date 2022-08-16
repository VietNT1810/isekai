const express = require("express");

const router = express.Router();

//GET all products
router.get("/", (req, res) => {
  res.json({ message: "get all products" });
});

//GET a single product
router.get("/:id", (req, res) => {
  res.json({ mess: "get a single product" });
});

//POST a new product
router.post("/", (req, res) => {
  res.json({ mess: "post a new product" });
});

//DELETE a new product
router.delete("/:id", (req, res) => {
  res.json({ mess: "delete a new product" });
});

//UPDATE a product
router.put("/:id", (req, res) => {
  res.json({ mess: "update a new product" });
});

module.exports = router;
