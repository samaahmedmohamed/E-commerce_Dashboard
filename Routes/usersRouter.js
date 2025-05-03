const express = require("express");
const router = express.Router();
const userValidation=require('../middleWares/userMiddelWares');
// const signup =require("../Controllers/authController")
const {
  createUser,
  getAllUsers,
  getUser,
  updateUser,
  deleteUser,
} = require("../Controllers/userController");

router.post("/", userValidation,createUser);
router.get("/", getAllUsers);
router.get("/:id", getUser);
router.patch("/:id",userValidation, updateUser);
router.delete("/:id", deleteUser);
// router.post("/" ,signup)
// router.post("/")
module.exports = router;
