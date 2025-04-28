const jwt = require("jsonwebtoken");

const authenticate = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    res.status(400).json({ message: "authentication required !!!" });
  }
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      res.status(403).json({ message: "invalid /expired Token" });
    }
    req.user = decoded;
    next();
  });
};

module.exports = authenticate;
