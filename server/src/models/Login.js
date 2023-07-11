const { DataTypes } = require("sequelize");
const { genSaltSync, hashSync, compareSync } = require("bcrypt");

module.exports = (sequelize) => {
  const Login = sequelize.define(
    "login",
    {
      loginId: {
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
    },
    { timestamps: true },
  );

  // Instance method to validate the password
  Login.prototype.validatePassword = function (password) {
    return compareSync(password, this.password);
  };

  // Hash the password before saving
  Login.beforeCreate(async (login) => {
    const salt = genSaltSync(10);
    const hashedPassword = await hashSync(login.password, salt);
    login.password = hashedPassword;
  });

  Login.beforeUpdate(async (login) => {
    if (login.changed("password")) {
      const salt = genSaltSync(10);
      const hashedPassword = await hashSync(login.password, salt);
      login.password = hashedPassword;
    }
  });

  // Hook to prevent duplicate email registration
  Login.beforeValidate(async (login) => {
    if (login.changed("email")) {
      const existingLogin = await Login.findOne({
        where: { email: login.email },
      });

      if (existingLogin) {
        throw new Error("Email already exists");
      }
    }
  });

  return Login;
};
