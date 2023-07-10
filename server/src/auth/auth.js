const { Token } = require("../database");
const jwt = require("jsonwebtoken");
const { Op } = require("sequelize");

const jwtSecret = "pfhenry37bg12";

const generateAuthToken = (userId, email) => {
    const token = jwt.sign(
        {
            userId: userId,
            email: email,
        },
        jwtSecret,
        { expiresIn: "2h" }
    );
    return token;
};

module.exports = {
    generateAuthToken,
};
