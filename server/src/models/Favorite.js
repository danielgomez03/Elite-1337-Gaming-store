const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const Favorite = sequelize.define(
    "favorite",
    {
      favoriteId: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      userId: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      productId: {
        type: DataTypes.UUID,
        allowNull: false,
      },
    },
    { timestamps: false },
  );

  return Favorite;
};
