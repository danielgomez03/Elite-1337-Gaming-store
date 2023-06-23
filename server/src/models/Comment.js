const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    
    sequelize.define('comment', {
        
        commentId: { // naming it like this is less confusing when interacting with other id fields
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true,
        },
    
        content: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    
        createdAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        },

    }, { timestamps: false });
};

// NOTE FOR FRONT-END IMPLEMENTATION OF COMMENTS
// By establishing the association between User and Comment using User.hasMany(Comment), Sequelize automatically provides methods to retrieve the associated comments for a user. The comments are accessed through the association, and you don't need to manually include a separate commentary property in the User model.

// You can use the provided methods to fetch and work with the associated comments for a user. Here's an example:

// const user = await User.findByPk(userId);
// const comments = await user.getComments();

// // Access and work with the comments
// console.log(comments);

// Similar case with Product comments