const express = require("express");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const routes = require("./routes/index.js");
require("./database.js");

const passport = require("./auth/passport.js");
const session = require("express-session");
const SequelizeStore = require("connect-session-sequelize")(session.Store);
const { conn } = require("./database");

const server = express();

server.name = "API";

server.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));
server.use(bodyParser.json({ limit: "50mb" }));
server.use(cookieParser());
server.use(morgan("dev"));
server.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Credentials", "true");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept",
  );
  res.header(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, DELETE, PATCH",
  );
  next();
});

const sessionStore = new SequelizeStore({
  db: conn,
});

server.use(
  session({
    secret: "pfhenry37bg12",
    resave: false,
    saveUninitialized: false,
    store: sessionStore,
    cookie: {
      maxAge: 2 * 60 * 60 * 1000, // 2 hours in milliseconds
    },
  }),
);

server.use(passport.initialize());
server.use(passport.session());

sessionStore.sync();

// Check permissions of uploads directory
const fs = require("fs");
const path = require("path");
const directoryPath = path.join(__dirname, "uploads");

fs.access(directoryPath, fs.constants.W_OK, (error) => {
  if (error) {
    console.error("Uploads directory does not have write permissions.");
  } else {
    console.log("Uploads directory has write permissions.");
  }
});

server.use("/", routes);

// Error catching endware.
server.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || err;
  console.error(err);
  res.status(status).send(message);
});

module.exports = server;
