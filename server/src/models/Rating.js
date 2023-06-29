const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "rating",
    {
      ratingId: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },

      value: {
        // a 0 to 5 stars rating system
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          min: 0,
          max: 5,
        },
      },

      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
    },
    { timestamps: false },
  );
};
