const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {

    sequelize.define('favorite', {
  
        favouriteId: { // naming it like this is less confusing when interacting with other id fields
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
