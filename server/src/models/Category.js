const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    
    sequelize.define('category', {
        
        categoryId: { // naming it like this is less confusing when interacting with other id fields
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true,
            unique: true,
        },

        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },

        isMainCategory: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },

        }, { timestamps: false });
};

// We can access the category of a product using product.getCategory() and retrieve all products belonging to a category using category.getProducts().