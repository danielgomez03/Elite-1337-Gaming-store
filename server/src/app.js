const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const routes = require('./routes/index.js');
require('./database.js');
const jwt = require('jsonwebtoken');
const passport = require('passport');
require('./auth/google.js');

const server = express();

server.name = 'API';

server.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
server.use(bodyParser.json({ limit: '50mb' }));
server.use(cookieParser());
server.use(morgan('dev'));
server.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE, PATCH');

  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Headers', `${req.header('Access-Control-Request-Headers')}, Content-Type, Authorization`);
    res.sendStatus(204);
    return;
  }
  
  next();
});

server.use('/', routes);

server.use(passport.initialize());

// Middleware para capturar errores
server.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || err;
  console.error(err);
  res.status(status).send(message);
});

module.exports = server;
