const { generateAuthToken } = require("../config/jwt");
const { Login, User, Token } = require("../database");
const { Op } = require("sequelize");

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Buscar el registro de inicio de sesión según el correo electrónico proporcionado
    const login = await Login.findOne({ where: { email } });

    if (!login) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    // Validar la contraseña
    const isValidPassword = login.validatePassword(password);
    if (!isValidPassword) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    // Recuperar el registro de usuario asociado
    const user = await User.findOne({ where: { userId: login.userId } });

    if (!user) {
      return res.status(401).json({ error: "User not found" });
    }

    // Generar el token de autenticación
    const token = generateAuthToken(user.userId, login.email);

    // Calcular la fecha de vencimiento
    const expiresIn = 2 * 60 * 60 * 1000; // 2 horas en milisegundos
    const expiresAt = new Date(Date.now() + expiresIn);

    // Eliminar todos los tokens excepto el nuevo
    await Token.destroy({
      where: {
        userId: user.userId,
        tokenValue: {
          [Op.not]: token,
        },
      },
    });

    // Insertar el token en la tabla de tokens
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

module.exports = {
  login,
  persistSession,
  logout,
};
