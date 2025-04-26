const express = require("express");
const router = express.Router();
// const getAllProduct = require("../Controllers/productController");
// const getProduct = require("../Controllers/productController");
const {
  getAllProduct,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
} = require("../Controllers/productController");

router.get("/", getAllProduct);
router.get("/:id", getProduct);
router.post("/", createProduct);
router.patch("/:id", updateProduct);
router.delete("/:id", deleteProduct);

module.exports = router;
