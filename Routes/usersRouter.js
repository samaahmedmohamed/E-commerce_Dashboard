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

router.post("/", createUser);
router.get("/", getAllUsers);
router.get("/:id", getUser);
router.patch("/:id", updateUser);
router.delete("/:id", deleteUser);
// router.post("/" ,signup)
// router.post("/")
module.exports = router;
