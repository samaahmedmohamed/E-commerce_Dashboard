const express = require("express");
const router = express.Router();
const categoryMiddelWare=require('../middleWares/categoreyMiddelWare');
const {
  getAllCategory,
  getCategory,
  createCategory,
  updateCategory,
  deleteCategory,
} = require("../Controllers/categoryController");

router.get("/", getAllCategory);
router.get("/:id", getCategory);
router.post("/", categoryMiddelWare,createCategory);
router.patch("/:id",categoryMiddelWare, updateCategory);
router.delete("/:id", deleteCategory);
module.exports = router;
