const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
 
    sequelize.define('Contact', {
        
        contactId: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true,
        },

        firstName: {
            type: DataTypes.STRING,
            allowNull: false,
        },

        lastName: {
            type: DataTypes.STRING,
            allowNull: false,
        },

        email: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isEmail: true,
            },
        },

        phoneNumber: {
            type: DataTypes.STRING,
            allowNull: true,
        },

        message: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        
        createdAt: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
            allowNull: false,
        },
        
    }, { timestamps: false });
};
