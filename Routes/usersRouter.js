const express = require("express");
const router = express.Router();
// const signup =require("../Controllers/authController")
const {
  createUser,
  getAllUsers,
  getUser,
  updateUser,
  deleteUser,
} = require("../Controllers/userController");

const authorize = require("../middleWares/authorize");
const authenticate = require("../middleWares/authinticate");

router.post("/", authenticate, authorize("manger"), createUser);
router.get("/", authenticate, authorize("admin", "manger"), getAllUsers);
router.get("/:id", authenticate, authorize("admin", "manger"), getUser);
router.patch("/:id", authenticate, authorize("manger"), updateUser);
router.delete("/:id", authenticate, authorize("manger"), deleteUser);
// router.post("/" ,signup)
// router.post("/")
module.exports = router;
