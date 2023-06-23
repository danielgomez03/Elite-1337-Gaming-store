const { DataTypes } = require('sequelize');
const sequelize = require('../database');

module.exports = (sequelize) => {
    
    sequelize.define('user', {
  
        userId: { // naming it like this is less confusing when interacting with other id fields
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true,
        },

        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },

        surname: {
            type: DataTypes.STRING,
            allowNull: false,
        },

        country: {
            type: DataTypes.STRING,
        },

        region: { // region inside a country, like state or province
            type: DataTypes.STRING,
        },

        city: {
            type: DataTypes.STRING,
        },

        address: {
            type: DataTypes.STRING,
        },

        postalCode: { // not an integer because a postal code can include letters
            type: DataTypes.STRING,
        },

        birthDate: { // dates should be displayed in DD/MM/YYYY format
            type: DataTypes.DATEONLY,
        },

        phone: {
            type: DataTypes.INTEGER,
        },

        idNumber: { // forms of personal identification, like DNI or CUIL
            type: DataTypes.INTEGER,
        },

        userRole: { // the user can be a common user, an admin with limited privileges or a super admin with full control
            type: DataTypes.ENUM('common', 'admin', 'super'),
            defaultValue: 'common',
        },

        isActive: { // the user can be deactivated by an admin by setting this to false
            type: DataTypes.BOOLEAN,
            defaultValue: true,
        },

    }, { timestamps: false });
};