const userModel = require("../Models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

let login = async (req, res) => {
  let user = req.body;
  //   console.log(`user:${user}`);
  //   console.log(`actual pass:${user.password}`);

  let foundUser = await userModel
    .findOne({ email: user.email.toLowerCase() })
    .select("+password");
  //   console.log(`incomming pass:${foundUser.password}`);

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
    { email: foundUser.email, id: foundUser._id },
    "samasimooo"
  );
  console.log(token);
  res.header("x-auth-token", token);

  return res.status(200).json({ message: "LOGGED IN successfully" });
};

module.exports = login;
