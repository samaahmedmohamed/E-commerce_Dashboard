const express = require("express");
const router = express.Router();
const categoryMiddelWare = require("../middleWares/categoreyMiddelWare");
const {
  getAllCategory,
  getCategory,
  createCategory,
  updateCategory,
  deleteCategory,
} = require("../Controllers/categoryController");

const authorize = require("../middleWares/authorize");
const authenticate = require("../middleWares/authinticate");

router.get("/", authenticate, authorize(["manger", "admin"]), getAllCategory);
router.get("/:id", authenticate, authorize(["manger", "admin"]), getCategory);
router.post(
  "/",
  authenticate,
  authorize(["manger", "admin"]),
  categoryMiddelWare,
  createCategory
);
router.patch(
  "/:id",
  authenticate,
  authorize(["manger", "admin"]),
  categoryMiddelWare,
  updateCategory
);
router.delete(
  "/:id",
  authenticate,
  authorize(["manger", "admin"]),
  deleteCategory
);
module.exports = router;
