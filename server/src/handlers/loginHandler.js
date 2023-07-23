const { generateAuthToken } = require("../config/jwt");
const { Login, User, Token } = require("../database");
const { Op } = require("sequelize");
const { sendPasswordResetEmailHandler } = require("../handlers/mailingHandler");

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const login = await Login.findOne({ where: { email } });

    if (!login) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    const isValidPassword = login.validatePassword(password);
    if (!isValidPassword) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    const user = await User.findOne({ where: { userId: login.userId } });

    if (!user) {
      return res.status(401).json({ error: "User not found" });
    }

    const token = generateAuthToken(user.userId, login.email);

    const expiresIn = 2 * 60 * 60 * 1000;
    const expiresAt = new Date(Date.now() + expiresIn);

    await Token.destroy({
      where: {
        userId: user.userId,
        tokenValue: {
          [Op.not]: token,
        },
      },
    });

    const createdToken = await Token.create({
      tokenValue: token,
      tokenType: "Passport",
      userId: user.userId,
      loginId: login.loginId,
      expiresAt: expiresAt,
    });

    return res.json({
      message: "Login successful",
      generatedToken: token,
      createdToken,
      userId: user.userId,
    });
  } catch (error) {
    console.error("Error during login:", error);
    return next(error);
  }
};

const persistSession = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];

    // Verificar si el token existe y aún no ha expirado
    const existingToken = await Token.findOne({
      where: {
        tokenValue: token,
        expiresAt: {
          [Op.gte]: new Date(), // Fecha de vencimiento debe ser mayor o igual a la fecha actual
        },
      },
    });

    if (!existingToken) {
      return res.status(401).json({ message: "Session expired" });
    }

    // Actualizar la fecha de vencimiento del token
    existingToken.expiresAt = new Date(
      Date.now() + 2 * 60 * 60 * 1000, // Extender la fecha de vencimiento por 2 horas más
    );
    await existingToken.save();

    return res.json({ message: "Session persisted" });
  } catch (error) {
    console.error("Error during session persistence:", error);
    return next(error);
  }
};

const logout = async (req, res, next) => {
  try {
    const { userId } = req.body;

    // Eliminar todos los tokens asociados al usuario
    await Token.destroy({ where: { userId } });

    return res.json({ message: "Logout successful" });
  } catch (error) {
    console.error("Error during logout:", error);
    return next(error);
  }
};

const generateRandomPassword = (length = 8) => {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let password = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    password += characters.charAt(randomIndex);
  }
  return password;
};

const passwordReset = async (req, res, next) => {
  try {
    const { email, confirmEmail, firstName, lastName } = req.body;

    if (email !== confirmEmail) {
      return res.status(400).json({ error: "Emails do not match" });
    }

    const login = await Login.findOne({ where: { email } });

    if (!login) {
      return res.status(400).json({ error: "Invalid email" });
    }

    const user = await User.findOne({ where: { userId: login.userId } });

    if (!user) {
      return res.status(400).json({ error: "User not found" });
    }

    // Check if the entered first name and last name match the associated user
    if (user.firstName !== firstName || user.lastName !== lastName) {
      return res.status(400).json({ error: "Invalid user information" });
    }

    const randomPassword = generateRandomPassword();
    login.password = randomPassword;

    await sendPasswordResetEmailHandler(email, firstName, randomPassword);

    await login.save();

    return res.json({ message: "Password reset email sent" });
  } catch (error) {
    console.error("Error during password reset:", error);
    return next(error);
  }
};

module.exports = {
  login,
  persistSession,
  logout,
  passwordReset,
};
