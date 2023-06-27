const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {

    sequelize.define('favourite', {
  
        favouriteId: {
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

    }, { timestamps: false });
};
