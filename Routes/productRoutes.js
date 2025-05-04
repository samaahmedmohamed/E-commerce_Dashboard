const express = require("express");
const router = express.Router();
const productMiddelWares=require('../middleWares/productMiddelWare')
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

router.get("/", getAllProduct);
router.get("/:id", getProduct);
router.post("/",upload.array("images", 5),productMiddelWares, createProduct);
router.patch("/:id",upload.array("images", 5), productMiddelWares,updateProduct);
router.delete("/:id", deleteProduct);

module.exports = router;
