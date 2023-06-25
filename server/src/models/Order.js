const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {

  const Order = sequelize.define('order', {
    
    orderId: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    
    // userId: {
    //   type: DataTypes.UUID,
    //   allowNull: false,
    //   references: {
    //     model: 'user',
    //     key: 'userId',
    //   },
    // },
    
    // loginId: {
    //   type: DataTypes.UUID,
    //   allowNull: false,
    //   references: {
    //     model: 'login',
    //     key: 'loginId',
    //   },
    // },
    
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true,
      },
    },
    
    subscribeToNewsletter: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    
    deliveryOption: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    
    country: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    
    idNumber: { // forms of personal identification, like DNI or CUIL
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    
    payerFirstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    
    payerLastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    
    payerPhone: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    
    isOtherPersonPickingUp: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    
    payerStreet: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    
    payerStreetNumber: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    
    payerCountry: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    
    payerRegion: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    
    payerCity: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    
    payerPostalCode: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    
    paymentMethod: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    
    orderNotes: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    
    orderStatus: {
      type: DataTypes.ENUM('Order placed', 'Payment confirmed', 'Ready for pickup / delivery'),
      allowNull: false,
      defaultValue: 'Order placed',
    },
    
    saveInfoForNextPurchase: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },

    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    
  }, { timestamps: false });

  return Order;
  
};
