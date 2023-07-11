const jwt = require("jsonwebtoken");

const jwtSecret = "pfhenry37bg12";

const generateAuthToken = (userId, email) => {
  const token = jwt.sign(
    {
      userId: userId,
      email: email,
    },
    jwtSecret,
    { expiresIn: "2h" },
  );
  return token;
};

module.exports = {
  generateAuthToken,
};
