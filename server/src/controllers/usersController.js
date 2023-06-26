const { User, Image, Login } = require('../database');
const { Op } = require('sequelize');

const getAllUsers = async () => {
    try {
        const users = await User.findAll({
            include: [
              {
                model: Image,
                attributes: ['imageId', 'url'],
              },
              {
                model: Login,
                attributes: ['loginId', 'email', 'password', 'verify'],
              },
            ],
            order: [['firstName', 'asc']],
        });

        return users;

    } catch (error) {
        console.error('Error in getAllUsers:', error);
        throw new Error('An error occurred while retrieving the users');
    }
};

const getUsersByName = async (name) => {
    try {
        const users = await User.findAll({
        where: {
            firstName: {
            [Op.iLike]: `%${name}%`
            }
        },
        include: [
            {
              model: Image,
              attributes: ['imageId', 'url'],
            },
            {
              model: Login,
              attributes: ['loginId', 'email', 'password', 'verify'],
            },
          ],
          order: [['firstName', 'asc']],
        });

        return users;

    } catch (error) {
        console.error('Error en getUsersByName:', error);
        throw new Error('An error occurred while retrieving the users by name');
    }
};

const getUserById = async (userId) => {
    try {
      const user = await User.findOne({
        where: {
          userId: userId,
        },
        include: [
            {
              model: Image,
              attributes: ['imageId', 'url'],
            },
            {
              model: Login,
              attributes: ['loginId', 'email', 'password', 'verify'],
            },
        ],
      });
  
      if (!user) {
        throw new Error('User not found');
      };
  
      return user;

    } catch (error) {
      console.error('Error in getUserById:', error);
      throw new Error('An error occurred while retrieving the user by ID');
    };
};

module.exports = {
    getAllUsers,
    getUsersByName,
    getUserById,
};