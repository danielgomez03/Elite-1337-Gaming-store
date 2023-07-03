const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const Newsletter = sequelize.define(
    "newsletter",
    {
      newsletterId: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      newsletterEmail: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      userId: {
        type: DataTypes.UUID,
        allowNull: true,
      },
    },
    { timestamps: false },
  );

  return Newsletter;
};
