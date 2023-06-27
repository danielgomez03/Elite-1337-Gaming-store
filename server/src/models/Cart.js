const { DataTypes } = require('sequelize');


module.exports = (sequelize) => {
 sequelize.define('Cart', {
  
    cartId: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
    },

    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },

},  { timestamps: true,
      createdAt: false,
      updatedAt: 'updatedAt',
    });
};