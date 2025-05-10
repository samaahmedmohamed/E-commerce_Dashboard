const userModel = require("../Models/userModel");
const adminModel = require("../Models/adminModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Admin = require("../Models/adminModel");
// const dotenv = require("dotenv").config();
const dotenv = require("dotenv").config();

let login = async (req, res) => {
  // try {
  let user = req.body;
  //   console.log(`user:${user}`);
  //   console.log(`actual pass:${user.password}`);

  let foundUser = await userModel
    .findOne({ email: user.email.toLowerCase() })
    .select("+password");
  //   console.log(`incomming pass:${foundUser.password}`);

  if (!foundUser) {
    foundUser = await adminModel
      .findOne({ email: user.email.toLowerCase() })
      .select("+password");
  }

  if (!foundUser)
    return res.status(400).json({ message: "Invalid E-mail/password" });

  let checkPass = await bcrypt.compare(user.password, foundUser.password);

  //   const check = user.password === foundUser.password ? "true" : "false";
  //   console.log(check);

  if (!checkPass)
    return res.status(400).json({ message: "Invalid E-mail/password" });

  //   console.log(user.password, " ,", foundUser.password);

  //   console.log(checkPass);

  let token = await jwt.sign(
    { email: foundUser.email, id: foundUser._id, role: foundUser.role },
    // "samasimooo"
    process.env.JWT_SECRET,

    { expiresIn: "48h" }
  );
  console.log(process.env.JWT_SECRET);

  console.log(token);

  res.status(200).json({
    status: "success",
    message: "LOGGED IN successfully",
    token: token,
    // role: foundUser.role,
    user: foundUser,
  });
  // } catch {
  //   res.status(500).json({
  //     status: "failed",
  //     message: "something went wrong",
  //   });
  // }
  // res.header("x-auth-token", token);

  // return res.status(200).json({ message: "LOGGED IN successfully" });
};

module.exports = login;
