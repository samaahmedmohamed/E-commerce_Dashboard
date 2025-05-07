const express = require("express");
const router = express.Router();
const userValidation = require("../middleWares/userMiddelWares");
const authorize = require("../middleWares/authorize");
const authenticate = require("../middleWares/authinticate");
// const signup =require("../Controllers/authController")
const {
  createUser,
  getAllUsers,
  getUser,
  updateUser,
  deleteUser,
} = require("../Controllers/userController");

router.post(
  "/",
  authenticate,
  authorize(["manger"]),
  userValidation,
  createUser
);
router.get("/", authenticate, authorize(["manger", "admin"]), getAllUsers);
router.get("/:id", authenticate, authorize(["admin", "manger"]), getUser);
router.patch(
  "/:id",
  authenticate,
  authorize(["manger"]),
  userValidation,
  updateUser
);
router.delete("/:id", authenticate, authorize(["manger"]), deleteUser);

module.exports = router;
