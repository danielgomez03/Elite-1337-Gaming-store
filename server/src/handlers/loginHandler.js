const passport = require("passport");
const { Login } = require("../database");

// Login handler
async function login(req, res, next) {
  if (req.isAuthenticated()) {
    return res.status(403).json({ message: "User is already logged in." });
  }

  console.log("Login request received");

  passport.authenticate("local", async (err, user, info) => {
    console.log("Passport authentication callback");

    if (err) {
      console.error("Passport authentication error:", err);
      return next(err);
    }

    if (!user) {
      console.log("Authentication failed:", info.message);
      return res.status(401).json({ message: "Authentication failed" });
    }

    req.login(user, async (err) => {
      if (err) {
        console.error("Error during login:", err);
        return next(err);
      }

      // Update the verify field to true for the logged-in user
      try {
        await Login.update(
          { verify: true },
          { where: { userId: user.userId } },
        );
      } catch (error) {
        console.error("Error updating login:", error);
        return res.status(500).json("Error updating login");
      }

      console.log("Login successful");

      return res.json({ message: "Login successful" });
    });
  })(req, res, next);
}

// Logout handler
async function logout(req, res) {
  const userId = req.user && req.user.userId;

  // Check if the user is logged in
  if (!userId) {
    return res.status(401).json("Unauthorized");
  }

  // Update the verify field to false for users logging out
  try {
    await Login.update({ verify: false }, { where: { userId } });
  } catch (error) {
    console.error("Error updating login:", error);
    return res.status(500).json("Error updating login");
  }

  // Destroy the session
  req.session.destroy((err) => {
    if (err) {
      console.error("Error destroying session:", err);
      return res.status(500).json("Error destroying session");
    }

    res.clearCookie("connect.sid"); // Clear the session cookie
    console.log("Logout successful");
    res.json("Logout successful");
  });
}

// Get session handler
function getSession(req, res) {
  console.log(req.session);
  res.json("Session information logged");
}

module.exports = {
  login,
  logout,
  getSession,
};
