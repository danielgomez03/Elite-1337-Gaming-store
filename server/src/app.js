const express = require("express");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const routes = require("./routes/index.js");
require("./database.js");

const server = express();

server.name = "API";

require("dotenv").config();

const baseURL = process.env.NODE_ENV === 'production'
  ? 'http://localhost:3000'
  : 'https://ft37b-pf-grupo12.vercel.app';

server.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));
server.use(bodyParser.json({ limit: "50mb" }));
server.use(cookieParser());
server.use(morgan("dev"));
server.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", baseURL);
  res.header("Access-Control-Allow-Credentials", "true");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization",
  );
  res.header(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, DELETE, PATCH",
  );

  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
    return res.status(200).end();
  }

  next();
});

server.use("/", routes);

// Middleware para capturar errores
server.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || err;
  console.error(err);
  res.status(status).send(message);
});

module.exports = server;
