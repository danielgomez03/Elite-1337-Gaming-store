const jwt = require("jsonwebtoken");
const { User } = require("../database");

const jwtSecret = "pfhenry37bg12";

const jwtAuth = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "No token provided." });
  }

  try {
    const decoded = jwt.verify(token, jwtSecret);
    User.findByPk(decoded.userId).then((user) => {
      if (!user) {
        return res.status(401).json({ message: "User not found." });
      }
      req.user = user;
      next();
    });
  } catch (err) {
    return res.status(401).json({ message: "Invalid token." });
  }
};

module.exports = jwtAuth;
