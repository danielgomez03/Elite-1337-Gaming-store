const { Router } = require("express");
const passport = require("passport");

const loginRoutes = Router();

loginRoutes.post("/login", (req, res, next) => {
  console.log("Login request received"); // Add this console log

  passport.authenticate("local", (err, user, info) => {
    console.log("Passport authentication callback"); // Add this console log

    if (err) {
      console.error("Passport authentication error:", err);
      return next(err);
    }

    if (!user) {
      console.log("Authentication failed:", info.message);
      return res.status(401).json({ message: "Authentication failed" });
    }

    req.login(user, (err) => {
      if (err) {
        console.error("Error during login:", err);
        return next(err);
      }

      console.log("Login successful"); // Add this console log
      return res.json({ message: "Login successful" });
    });
  })(req, res, next);
});

module.exports = loginRoutes;
