const jwt = require("jsonwebtoken");

const authenticate = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  console.log("token:", token);

  if (!token) {
    return res.status(400).json({ message: "authentication required !!!" });
  }
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({
        message: "invalid /expired Token",
        tok: token,
        JWT_SECRET: process.env.JWT_SECRET,
        Decoded: decoded,
      });
    }
    req.user = decoded;
    next();
  });
};

module.exports = authenticate;
