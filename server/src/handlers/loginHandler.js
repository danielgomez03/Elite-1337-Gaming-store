const passport = require("passport");
const { Strategy: JwtStrategy, ExtractJwt } = require("passport-jwt");
const { User, Login, Token } = require("../database");
const jwt = require("jsonwebtoken");
const { Op } = require("sequelize");

const jwtSecret = "pfhenry37bg12"; // Replace with your own secret key

// Configure the JWT strategy
const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: jwtSecret,
};

const strategy = new JwtStrategy(jwtOptions, async (payload, done) => {
  try {
    // Here, you can verify the payload and find the user based on the token
    // For example, you can look up the user in your database and pass it to the 'done' callback
    const user = await User.findOne({
      where: { userId: payload.userId },
      include: [Login],
    });

    if (user) {
      return done(null, user);
    } else {
      return done(null, false);
    }
  } catch (err) {
    return done(err, false);
  }
});

passport.use(strategy);

// Login handler
async function login(req, res, next) {
  passport.authenticate(
    "jwt",
    { session: false },
    async (err, authenticatedUser, info) => {
      try {
        console.log("Error:", err); // Log the error, if any
        console.log("Authenticated User:", authenticatedUser); // Log the authenticated user object
        console.log("Info:", info); // Log the info object

        if (err) {
          console.error("Error during login:", err);
          return next(err);
        }

        if (authenticatedUser) {
          console.log("User is already logged in.");
          return res
            .status(403)
            .json({ message: "User is already logged in." });
        }

        const { email, password } = req.body;

        // Find the login record for the provided email
        const login = await Login.findOne({ where: { email } });

        if (!login) {
          console.log("Authentication failed");
          return res.status(401).json({ message: "Authentication failed" });
        }

        // Validate the password
        const isValidPassword = login.validatePassword(password);
        if (!isValidPassword) {
          console.log("Authentication failed");
          return res.status(401).json({ message: "Authentication failed" });
        }

        // Retrieve the associated user record
        const user = await User.findOne({ where: { userId: login.userId } });

        if (!user) {
          console.log("Authentication failed");
          return res.status(401).json({ message: "Authentication failed" });
        }

        // Generate the JWT token
        const token = jwt.sign(
          {
            userId: user.userId,
            email: login.email,
          },
          jwtSecret,
          { expiresIn: "2h" },
        );

        console.log("Generated Token:", token);

        const ipAddress = req.ip;

        // Calculate the expiration date
        const expiresIn = 2 * 60 * 60 * 1000; // 2 hours in milliseconds
        const expiresAt = new Date(Date.now() + expiresIn);

        // Delete all tokens except the new one
        await Token.destroy({
          where: {
            userId: user.userId,
            tokenValue: {
              [Op.not]: token,
            },
          },
        });

        // Insert token into the Token table
        const createdToken = await Token.create({
          tokenValue: token,
          tokenType: "Passport",
          userId: user.userId,
          loginId: login.loginId,
          ipAddress: ipAddress,
          expiresAt: expiresAt,
        });

        console.log("Login successful");

        // Include the generated token and created token in the response
        return res.json({
          message: "Login successful",
          generatedToken: token,
          createdToken,
        });
      } catch (error) {
        console.error("Error during login:", error);
        return next(error);
      }
    },
  )(req, res, next);
}

async function getAllTokens(req, res, next) {
  try {
    // Retrieve all generated tokens from the Token table
    const tokens = await Token.findAll();

    return res.json(tokens);
  } catch (error) {
    console.error("Error retrieving tokens:", error);
    return next(error);
  }
}

// Logout handler
async function logout(req, res, next) {
  try {
    const { userId } = req.body;

    // Delete all tokens associated with the user
    const result = await Token.destroy({ where: { userId } });

    if (result === 0) {
      // No tokens found for the user
      return res.status(403).json({ message: "User is already logged out" });
    }

    return res.json({ message: "Logout successful" });
  } catch (error) {
    console.error("Error during logout:", error);
    return next(error);
  }
}

module.exports = {
  login,
  getAllTokens,
  logout,
};
