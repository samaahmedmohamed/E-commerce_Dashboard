const express = require("express");
const router = express.Router();
// const signup =require("../Controllers/authController")
const {
  createAdmin,
  getAllAdmins,
  getAdmin,
  updateAdmin,
  deleteAdmin,
} = require("../Controllers/adminControllers");

const authorize = require("../middleWares/authorize");
const authenticate = require("../middleWares/authinticate");

router.post("/", createAdmin);
router.get("/", authenticate, authorize("manger"), getAllAdmins);
router.get("/:id", authenticate, authorize("manger"), getAdmin);
router.patch("/:id", authenticate, authorize("manger"), updateAdmin);
router.delete("/:id", authenticate, authorize("manger"), deleteAdmin);
// router.post("/" ,signup)
// router.post("/")
module.exports = router;
