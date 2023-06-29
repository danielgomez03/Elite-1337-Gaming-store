const { DataTypes } = require("sequelize");
const { hashSync, genSaltSync } = require("bcrypt");

module.exports = (sequelize) => {
  const Login = sequelize.define(
    "login",
    {
      loginId: {
        // naming it like this is less confusing when interacting with other id fields
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },

      email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
        validate: {
          isEmail: true,
        },
      },

      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      verify: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    },
    { timestamps: true },
  );

  // password hashing to encrypt data through bcrypt library
  const hashPassword = async (login) => {
    try {
      const hashedPassword = await hashSync(login.password, genSaltSync(10));
      login.password = hashedPassword;
    } catch (error) {
      console.error("Error hashing password:", error);
      throw new Error("Failed to hash password");
    }
  };
  // hashes password on create and on modification
  Login.beforeCreate(hashPassword);
  Login.beforeUpdate(hashPassword);

  return Login;
};
