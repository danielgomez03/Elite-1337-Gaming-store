const { Router } = require('express');
const { getUsers, getUserByIdHandler, postCreateUser, } = require('../handlers/usersHandler');

const usersRoutes = Router();

usersRoutes.get('/', getUsers);
usersRoutes.get('/id/:userId', getUserByIdHandler);

usersRoutes.post('/register', postCreateUser);

module.exports = usersRoutes;