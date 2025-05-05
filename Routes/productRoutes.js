const express = require("express");
const router = express.Router();
const productMiddelWares = require("../middleWares/productMiddelWare");
// const getAllProduct = require("../Controllers/productController");
// const getProduct = require("../Controllers/productController");
const upload = require("../middleWares/uploadImages");
const {
  getAllProduct,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
} = require("../Controllers/productController");

const authorize = require("../middleWares/authorize");
const authenticate = require("../middleWares/authinticate");

router.get("/", getAllProduct);
router.get("/:id", getProduct);
router.post(
  "/",
  authenticate,
  authorize(["manger", "admin"]),
  upload.array("images", 5),
  productMiddelWares,
  createProduct
);
router.patch(
  "/:id",
  authenticate,
  authorize(["manger", "admin"]),
  upload.array("images", 5),
  productMiddelWares,
  updateProduct
);
router.delete(
  "/:id",
  authenticate,
  authorize(["manger", "admin"]),
  deleteProduct
);

module.exports = router;
