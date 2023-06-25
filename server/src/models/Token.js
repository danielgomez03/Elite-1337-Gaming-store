const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  
  const Token = sequelize.define('token', {
    
    tokenId: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },

    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'user',
        key: 'userId',
      },
    },

    loginId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'login',
        key: 'loginId',
      },
    },

    tokenValue: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    tokenType: {
      type: DataTypes.ENUM('Auth0', 'Google'),
      allowNull: false,
    },

    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },

    expiresAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },

    ipAddress: {
      type: DataTypes.STRING,
      allowNull: true,
    },

  }, { timestamps: false });

  return Token;
};