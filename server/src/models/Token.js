const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const Token = sequelize.define(
    "token",
    {
      tokenId: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },

      tokenValue: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      tokenType: {
        type: DataTypes.ENUM("Auth0", "Google"),
        allowNull: false,
      },

      ipAddress: {
        type: DataTypes.STRING,
        allowNull: true,
      },

      expiresAt: {
        type: DataTypes.DATE,
        allowNull: true,
      },
    },
    { timestamps: true }
  );

  return Token;
};
